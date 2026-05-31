"""发布记录模型。"""

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from models import Base, TimestampMixin, UUIDMixin


class PublishRecord(UUIDMixin, TimestampMixin, Base):
    """平台发布记录。"""

    __tablename__ = "publish_records"

    project_id: Mapped[str] = mapped_column(String, index=True)
    content_version_id: Mapped[str] = mapped_column(String)
    platform: Mapped[str] = mapped_column(String(50), comment="平台: zhihu | xiaohongshu")
    status: Mapped[str] = mapped_column(
        String(50), default="PENDING", comment="PENDING | PUBLISHING | PUBLISHED | FAILED"
    )
    platform_url: Mapped[str | None] = mapped_column(String(1000), comment="发布后的文章 URL")
    error_message: Mapped[str | None] = mapped_column(Text, comment="错误信息")
    screenshot_path: Mapped[str | None] = mapped_column(String(500), comment="发布结果截图路径")
