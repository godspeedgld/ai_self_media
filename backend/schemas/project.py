"""项目相关 Schema。"""

from datetime import datetime

from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    """创建项目请求。"""

    title: str = Field(..., min_length=1, max_length=500, description="主题/标题")
    outline: str | None = Field(None, description="大纲/要点")
    target_platforms: list[str] | None = Field(None, description='目标平台 ["zhihu","xiaohongshu"]')


class ProjectResponse(BaseModel):
    """项目响应。"""

    id: str
    title: str
    outline: str | None
    status: str
    target_platforms: list[str] | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    """项目列表响应。"""

    items: list[ProjectResponse]
    total: int
