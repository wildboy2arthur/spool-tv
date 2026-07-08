from __future__ import annotations

import asyncio
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import feedparser
import httpx

from config import CHANNEL_ID, CHANNEL_URL, PLAYLIST_ID, PLAYLIST_URL, RSS_URL, VIDEO_LIMIT

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
}


def _parse_initial_data(html: str) -> dict[str, Any] | None:
    match = re.search(r"var ytInitialData = (\{.*?\});</script>", html, re.DOTALL)
    if not match:
        return None
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError:
        return None


def _find_text(node: Any) -> str | None:
    if node is None:
        return None
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        if "simpleText" in node:
            return node["simpleText"]
        if "content" in node:
            return node["content"]
        runs = node.get("runs")
        if isinstance(runs, list):
            return "".join(part.get("text", "") for part in runs if isinstance(part, dict))
    return None


def _find_avatar(data: dict[str, Any]) -> str | None:
    stack: list[Any] = [data]
    while stack:
        current = stack.pop()
        if isinstance(current, dict):
            if "avatar" in current and isinstance(current["avatar"], dict):
                thumbs = current["avatar"].get("thumbnails") or []
                if thumbs:
                    return thumbs[-1].get("url")
            for value in current.values():
                if isinstance(value, (dict, list)):
                    stack.append(value)
        elif isinstance(current, list):
            stack.extend(current)
    return None


def _find_banner(data: dict[str, Any]) -> str | None:
    stack: list[Any] = [data]
    while stack:
        current = stack.pop()
        if isinstance(current, dict):
            if current.get("style") == "CHANNEL_BANNER":
                thumbs = current.get("image", {}).get("thumbnails") or []
                if thumbs:
                    return thumbs[-1].get("url")
            for value in current.values():
                if isinstance(value, (dict, list)):
                    stack.append(value)
        elif isinstance(current, list):
            stack.extend(current)
    return None


def _relative_time(published: datetime) -> str:
    now = datetime.now(timezone.utc)
    delta = now - published
    seconds = int(delta.total_seconds())
    if seconds < 60:
        return "剛剛"
    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes} 分鐘前"
    hours = minutes // 60
    if hours < 24:
        return f"{hours} 小時前"
    days = hours // 24
    if days < 7:
        return f"{days} 天前"
    weeks = days // 7
    if weeks < 5:
        return f"{weeks} 週前"
    months = days // 30
    if months < 12:
        return f"{months} 個月前"
    years = days // 365
    return f"{years} 年前"


def _video_id_from_link(link: str) -> str | None:
    match = re.search(r"(?:v=|youtu\.be/|/shorts/)([A-Za-z0-9_-]{11})", link)
    return match.group(1) if match else None


async def fetch_channel_info(client: httpx.AsyncClient) -> dict[str, Any]:
    response = await client.get(f"{CHANNEL_URL}/about", headers=HEADERS, follow_redirects=True)
    response.raise_for_status()
    data = _parse_initial_data(response.text) or {}

    metadata = data.get("metadata", {}).get("channelMetadataRenderer", {})
    header = (
        data.get("header", {})
        .get("pageHeaderRenderer", {})
        .get("content", {})
        .get("pageHeaderViewModel", {})
    )
    description = metadata.get("description") or _find_text(
        header.get("description", {}).get("descriptionPreviewViewModel", {}).get("description", {})
    )

    avatar = metadata.get("avatar", {}).get("thumbnails", [])
    avatar_url = avatar[-1]["url"] if avatar else _find_avatar(data)
    banner_url = _find_banner(data)

    subscriber_text = _find_text(
        header.get("metadata", {})
        .get("contentMetadataViewModel", {})
        .get("metadataRows", [{}])[0]
        .get("metadataParts", [{}])[0]
        .get("text", {})
    )

    return {
        "id": CHANNEL_ID,
        "handle": metadata.get("vanityChannelUrl", CHANNEL_URL).split("/@")[-1],
        "title": metadata.get("title") or "陳文舟",
        "description": description or "",
        "avatar": avatar_url,
        "banner": banner_url,
        "subscriberText": subscriber_text or "",
        "url": CHANNEL_URL,
    }


def _embed_url(video_id: str) -> str:
    params = ["cc_load_policy=0"]
    if PLAYLIST_ID:
        params.append(f"list={PLAYLIST_ID}")
    return f"https://www.youtube.com/embed/{video_id}?{'&'.join(params)}"


def _build_video(
    video_id: str,
    title: str,
    *,
    description: str = "",
    url: str | None = None,
    thumbnail: str | None = None,
    published: datetime | None = None,
) -> dict[str, Any]:
    published_label = published.strftime("%Y年%m月%d日") if published else ""
    relative = _relative_time(published) if published else ""
    return {
        "id": video_id,
        "title": title or "未命名影片",
        "description": description,
        "url": url or f"https://www.youtube.com/watch?v={video_id}",
        "embedUrl": _embed_url(video_id),
        "thumbnail": thumbnail or f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
        "publishedAt": published.isoformat() if published else None,
        "publishedLabel": published_label,
        "relativeTime": relative,
    }


async def _fetch_videos_rss(client: httpx.AsyncClient) -> list[dict[str, Any]]:
    response = await client.get(RSS_URL, headers=HEADERS, follow_redirects=True)
    response.raise_for_status()
    feed = feedparser.parse(response.text)
    videos: list[dict[str, Any]] = []

    for entry in feed.entries:
        link = entry.get("link", "")
        video_id = entry.get("yt_videoid") or _video_id_from_link(link)
        if not video_id:
            continue

        published_raw = entry.get("published_parsed") or entry.get("updated_parsed")
        published = (
            datetime(*published_raw[:6], tzinfo=timezone.utc) if published_raw else None
        )
        media = entry.get("media_thumbnail") or []
        thumbnail = media[0].get("url") if media else None

        videos.append(
            _build_video(
                video_id,
                entry.get("title", "未命名影片"),
                description=entry.get("summary", ""),
                url=link,
                thumbnail=thumbnail,
                published=published,
            )
        )

    return _apply_video_limit(videos)


def _apply_video_limit(videos: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if VIDEO_LIMIT and VIDEO_LIMIT > 0:
        return videos[:VIDEO_LIMIT]
    return videos


def _find_yt_dlp() -> str:
    candidates = [
        shutil.which("yt-dlp"),
        shutil.which("yt-dlp.exe"),
        Path(sys.executable).with_name("yt-dlp.exe"),
        Path(sys.executable).parent / "Scripts" / "yt-dlp.exe",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return str(Path(candidate))
    raise RuntimeError("找不到 yt-dlp，無法同步影片")


def _parse_ytdlp_entries(stdout: str) -> tuple[dict[str, Any] | None, list[dict[str, Any]]]:
    playlist_meta: dict[str, Any] | None = None
    raw_entries: list[dict[str, Any]] = []

    for line in stdout.splitlines():
        if not line.strip():
            continue
        payload = json.loads(line)
        if isinstance(payload.get("entries"), list):
            if playlist_meta is None:
                playlist_meta = payload
            raw_entries.extend(item for item in payload["entries"] if isinstance(item, dict))
        elif isinstance(payload, dict):
            raw_entries.append(payload)

    return playlist_meta, raw_entries


def _entries_to_videos(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    videos: list[dict[str, Any]] = []
    for entry in entries:
        video_id = entry.get("id")
        if not video_id or len(video_id) != 11:
            continue

        thumbs = entry.get("thumbnails") or []
        thumbnail = thumbs[-1].get("url") if thumbs else None
        published = None
        upload_date = entry.get("upload_date")
        if upload_date and len(upload_date) == 8:
            published = datetime.strptime(upload_date, "%Y%m%d").replace(tzinfo=timezone.utc)

        videos.append(
            _build_video(
                video_id,
                entry.get("title", "未命名影片"),
                description=entry.get("description", "") or "",
                url=entry.get("url") or entry.get("webpage_url"),
                thumbnail=thumbnail,
                published=published,
            )
        )
    return videos


async def _run_ytdlp_flat_playlist(target_url: str) -> tuple[dict[str, Any] | None, list[dict[str, Any]]]:
    yt_dlp = _find_yt_dlp()
    command = [yt_dlp, "--no-update", "--flat-playlist"]
    if VIDEO_LIMIT and VIDEO_LIMIT > 0:
        command.extend(["--playlist-end", str(VIDEO_LIMIT)])
    command.extend(["-J", target_url])

    proc = await asyncio.create_subprocess_exec(
        *command,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        message = stderr.decode("utf-8", errors="ignore").strip() or "yt-dlp 執行失敗"
        raise RuntimeError(message)

    return _parse_ytdlp_entries(stdout.decode("utf-8", errors="ignore"))


async def _fetch_playlist_payload(client: httpx.AsyncClient) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    playlist = {
        "id": PLAYLIST_ID,
        "title": "自訂播放清單",
        "url": PLAYLIST_URL,
    }
    videos = []
    try:
        playlist_meta, raw_entries = await _run_ytdlp_flat_playlist(PLAYLIST_URL)
        if playlist_meta:
            playlist["title"] = playlist_meta.get("title") or playlist["title"]
        videos = _apply_video_limit(_entries_to_videos(raw_entries))
    except Exception as exc:
        print(f"警告：yt-dlp 執行失敗，將自動降級使用 RSS 抓取影片。錯誤資訊：{exc}")
        try:
            videos = await _fetch_videos_rss(client)
        except Exception as rss_exc:
            print(f"錯誤：降級 RSS 抓取也失敗了：{rss_exc}")
            videos = []
    return playlist, videos


async def fetch_channel_payload() -> dict[str, Any]:
    async with httpx.AsyncClient(timeout=30.0) as client:
        channel, playlist_bundle = await asyncio.gather(
            fetch_channel_info(client),
            _fetch_playlist_payload(client),
        )
    playlist, videos = playlist_bundle
    return {"channel": channel, "playlist": playlist, "videos": videos, "count": len(videos)}