"""发布相关 Schema。"""

from datetime import datetime

from pydantic import BaseModel, Field


class PublishRequest(BaseModel):
    """发布请求。"""

    platforms: list[str] = Field(..., min_length=1, description='目标平台列表 ["zhihu","xiaohongshu"]')
    content_version_id: str | None = Field(None, description="指定版本 ID（默认当前版本）")


class PublishRecordResponse(BaseModel):
    """发布记录响应。"""

    id: str
    project_id: str
    content_version_id: str
    platform: str
    status: str
    platform_url: str | None
    error_message: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
