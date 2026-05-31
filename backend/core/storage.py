"""文件存储抽象 — 支持本地文件系统和 MinIO。"""

import shutil
from pathlib import Path

from core.config import settings


class Storage:
    """文件存储管理。"""

    def __init__(self):
        self.backend = settings.storage_backend
        self.base_path = Path(settings.local_storage_path)
        self.base_path.mkdir(parents=True, exist_ok=True)

    def save(self, filename: str, data: bytes) -> str:
        """保存文件，返回相对路径。"""
        file_path = self.base_path / filename
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_bytes(data)
        return filename

    def get_path(self, filename: str) -> Path:
        """获取文件完整路径。"""
        return self.base_path / filename

    def delete(self, filename: str) -> bool:
        """删除文件。"""
        file_path = self.base_path / filename
        if file_path.exists():
            file_path.unlink()
            return True
        return False

    def exists(self, filename: str) -> bool:
        """检查文件是否存在。"""
        return (self.base_path / filename).exists()


# 全局单例
storage = Storage()
