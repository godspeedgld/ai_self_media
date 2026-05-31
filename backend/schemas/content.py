"""内容相关 Schema。"""

from datetime import datetime

from pydantic import BaseModel, Field


class ContentGenerateRequest(BaseModel):
    """内容生成请求。"""

    topic: str | None = Field(None, description="覆盖主题（可选）")
    platform: str | None = Field(None, description="目标平台: zhihu | xiaohongshu")


class ContentFeedbackRequest(BaseModel):
    """内容反馈请求。"""

    feedback: str = Field(..., min_length=1, description="用户反馈内容")


class ContentApproveRequest(BaseModel):
    """内容确认请求。"""

    platform: str | None = Field(None, description="目标平台确认")


class ContentVersionResponse(BaseModel):
    """内容版本响应。"""

    id: str
    project_id: str
    version: int
    title: str | None
    body: str | None
    summary: str | None
    tags: list[str] | None
    platform_variant: str | None
    feedback: str | None
    model_used: str | None
    is_current: bool
    created_at: datetime

    model_config = {"from_attributes": True}
