"""图片模型。"""

from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from models import Base, TimestampMixin, UUIDMixin


class Image(UUIDMixin, TimestampMixin, Base):
    """AI 生成的配图。"""

    __tablename__ = "images"

    project_id: Mapped[str] = mapped_column(String, index=True, comment="所属项目 ID")
    content_version_id: Mapped[str | None] = mapped_column(String, comment="关联内容版本 ID")
    storage_path: Mapped[str] = mapped_column(String(500), comment="存储路径")
    prompt: Mapped[str | None] = mapped_column(Text, comment="生成 Prompt")
    width: Mapped[int | None] = mapped_column(Integer)
    height: Mapped[int | None] = mapped_column(Integer)
    file_size: Mapped[int | None] = mapped_column(Integer, comment="文件大小(字节)")
    is_selected: Mapped[bool] = mapped_column(Boolean, default=False, comment="用户选中用于发布")
