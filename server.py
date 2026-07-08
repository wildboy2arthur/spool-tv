from __future__ import annotations

import time
from pathlib import Path

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from config import CONTACT_EMAIL, CONTACT_FACEBOOK, SITE_NAME
from youtube import fetch_channel_payload

ROOT = Path(__file__).resolve().parent
STATIC = ROOT / "static"

_cache: dict[str, object] = {"payload": None, "expires": 0.0}
CACHE_TTL = 300


def _clear_cache() -> None:
    _cache["payload"] = None
    _cache["expires"] = 0.0


async def _bg_fetch_and_cache() -> None:
    try:
        print("背景任務：開始同步播放清單影片...")
        payload = await fetch_channel_payload()
        payload["contact"] = {
            "facebook": CONTACT_FACEBOOK,
            "email": CONTACT_EMAIL,
        }
        _cache["payload"] = payload
        _cache["expires"] = time.time() + CACHE_TTL
        print("背景任務：播放清單影片同步完成！")
    except Exception as exc:
        print(f"背景任務錯誤：無法取得 YouTube 資料：{exc}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    _clear_cache()
    yield


app = FastAPI(title=SITE_NAME, lifespan=lifespan)
app.mount("/static", StaticFiles(directory=STATIC), name="static")


@app.get("/")
async def index() -> FileResponse:
    return FileResponse(STATIC / "index.html")


@app.get("/api/channel")
async def channel_api(background_tasks: BackgroundTasks, refresh: bool = False) -> dict:
    now = time.time()
    
    # 判斷是否需要更新
    need_update = _cache["payload"] is None or now >= float(_cache["expires"]) or refresh
    
    # 1. 如果完全沒有快取，必須同步阻塞載入（首次執行）
    if _cache["payload"] is None:
        try:
            print("首次載入影片，執行同步阻塞取得...")
            payload = await fetch_channel_payload()
            payload["contact"] = {
                "facebook": CONTACT_FACEBOOK,
                "email": CONTACT_EMAIL,
            }
            _cache["payload"] = payload
            _cache["expires"] = now + CACHE_TTL
        except Exception as exc:  # noqa: BLE001
            raise HTTPException(status_code=502, detail=f"無法取得 YouTube 資料：{exc}") from exc
        
        response_data = dict(_cache["payload"]) # type: ignore
        response_data["updating"] = False
        return response_data

    # 2. 如果已有快取且需要更新，則使用背景任務非同步處理
    if need_update:
        # 將到期時間暫時往後推 60 秒，避免多個同時到達的請求重複排入背景任務
        _cache["expires"] = now + 60.0
        background_tasks.add_task(_bg_fetch_and_cache)

    response_data = dict(_cache["payload"]) # type: ignore
    response_data["updating"] = need_update
    return response_data


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server:app", host="127.0.0.1", port=8080, reload=False)