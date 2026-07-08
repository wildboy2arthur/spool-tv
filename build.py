from __future__ import annotations

import asyncio
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

from config import CONTACT_EMAIL, CONTACT_FACEBOOK
from youtube import fetch_channel_payload

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
STATIC = ROOT / "static"


async def main() -> None:
    print("正在從 YouTube 同步播放清單...")
    payload = await fetch_channel_payload()
    payload["builtAt"] = datetime.now(timezone.utc).isoformat()
    payload["contact"] = {
        "facebook": CONTACT_FACEBOOK,
        "email": CONTACT_EMAIL,
    }

    def remove_readonly(func, path, _):
        import stat
        import os
        try:
            os.chmod(path, stat.S_IWRITE)
            func(path)
        except Exception:
            pass

    if DIST.exists():
        shutil.rmtree(DIST, onerror=remove_readonly)

    DIST.mkdir(parents=True)
    (DIST / "data").mkdir()
    shutil.copytree(STATIC, DIST / "static")
    shutil.copy2(STATIC / "index.html", DIST / "index.html")

    # 複製作品集專案到 dist/portfolio (忽略 git 與快取資料夾)
    portfolio_src = Path("D:/Desktop/20260628")
    portfolio_dist = DIST / "portfolio"
    if portfolio_src.exists():
        portfolio_dist.mkdir(parents=True, exist_ok=True)
        for item in portfolio_src.iterdir():
            if item.is_dir() and item.name != "menu" and not item.name.startswith("."):
                print(f"正在複製作品集專案：{item.name}...")
                shutil.copytree(
                    item, 
                    portfolio_dist / item.name,
                    ignore=shutil.ignore_patterns('.git', 'node_modules', '.netlify')
                )

    json_path = DIST / "data" / "channel.json"
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"完成：{payload['count']} 部影片 -> {json_path}")


if __name__ == "__main__":
    asyncio.run(main())