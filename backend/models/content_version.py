"""内容版本模型 — 支持迭代。"""

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from models import Base, TimestampMixin, UUIDMixin


class ContentVersion(UUIDMixin, TimestampMixin, Base):
    """内容版本，每次迭代生成新版本。"""

    __tablename__ = "content_versions"

    project_id: Mapped[str] = mapped_column(String, index=True, comment="所属项目 ID")
    version: Mapped[int] = mapped_column(Integer, comment="版本号（递增）")
    title: Mapped[str | None] = mapped_column(String(500), comment="AI 生成标题")
    body: Mapped[str | None] = mapped_column(Text, comment="文章正文（Markdown）")
    summary: Mapped[str | None] = mapped_column(Text, comment="AI 生成摘要")
    tags: Mapped[str | None] = mapped_column(Text, comment='JSON 数组: ["tag1","tag2"]')
    platform_variant: Mapped[str | None] = mapped_column(
        String(50), comment="平台变体: NULL(通用) | zhihu | xiaohongshu"
    )
    feedback: Mapped[str | None] = mapped_column(Text, comment="导致此版本的用户反馈")
    model_used: Mapped[str | None] = mapped_column(String(100), comment="使用的模型")
    is_current: Mapped[bool] = mapped_column(Boolean, default=True, comment="是否为当前版本")
