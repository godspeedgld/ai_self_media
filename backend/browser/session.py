"""登录态持久化 — 保存和恢复平台登录状态。"""

import json
from pathlib import Path

from core.config import settings


class SessionManager:
    """管理各平台的登录状态（cookies、localStorage）。"""

    def __init__(self):
        self.session_dir = Path(settings.browser_session_dir)
        self.session_dir.mkdir(parents=True, exist_ok=True)

    def get_session_path(self, platform: str) -> Path:
        """获取平台会话文件路径。"""
        return self.session_dir / f"{platform}_session.json"

    async def save_session(self, platform: str, storage_state: dict):
        """保存平台登录状态。"""
        path = self.get_session_path(platform)
        path.write_text(json.dumps(storage_state, ensure_ascii=False, indent=2), encoding="utf-8")

    async def load_session(self, platform: str) -> dict | None:
        """加载平台登录状态。"""
        path = self.get_session_path(platform)
        if path.exists():
            return json.loads(path.read_text(encoding="utf-8"))
        return None

    async def has_session(self, platform: str) -> bool:
        """检查是否有有效的登录状态。"""
        return self.get_session_path(platform).exists()

    async def clear_session(self, platform: str):
        """清除登录状态。"""
        path = self.get_session_path(platform)
        if path.exists():
            path.unlink()


# 全局单例
session_manager = SessionManager()
