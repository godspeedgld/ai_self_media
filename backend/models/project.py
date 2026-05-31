"""项目模型。"""

from sqlalchemy import JSON, String
from sqlalchemy.orm import Mapped, mapped_column

from models import Base, TimestampMixin, UUIDMixin


class Project(UUIDMixin, TimestampMixin, Base):
    """自媒体内容项目。"""

    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(500), comment="用户主题/标题")
    outline: Mapped[str | None] = mapped_column(comment="用户大纲/要点")
    status: Mapped[str] = mapped_column(
        String(50),
        default="TOPIC_SUBMITTED",
        comment="状态: TOPIC_SUBMITTED | DRAFTING | AWAITING_REVIEW | PUBLISHED",
    )
    target_platforms: Mapped[list | None] = mapped_column(JSON, comment='["zhihu", "xiaohongshu"]')
