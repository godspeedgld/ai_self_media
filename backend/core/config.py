"""应用配置 — 使用 Pydantic BaseSettings 管理环境变量。"""

from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    """应用配置，从 .env 文件和环境变量加载。"""

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Application
    app_env: Literal["development", "staging", "production"] = "development"
    app_secret_key: str = "change-me"
    app_debug: bool = True

    # Database
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/ai_self_media"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Storage
    storage_backend: Literal["local", "minio"] = "local"
    local_storage_path: str = str(BASE_DIR / "data" / "uploads")

    # AI Models
    dashscope_api_key: str = ""
    dashscope_base_url: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    deepseek_api_key: str = ""
    deepseek_base_url: str = "https://api.deepseek.com/v1"
    zhipu_api_key: str = ""
    zhipu_base_url: str = "https://open.bigmodel.cn/api/paas/v4"
    default_text_model: str = "openai:qwen-max"
    default_image_model: str = "dashscope:wanx-v2"

    # Web Search
    tavily_api_key: str = ""

    # Browser
    browser_headless: bool = True
    browser_session_dir: str = str(BASE_DIR / "data" / "browser_sessions")

    @property
    def is_dev(self) -> bool:
        return self.app_env == "development"


# 全局单例
settings = Settings()
