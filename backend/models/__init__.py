"""ORM 模型基类。"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """SQLAlchemy 声明式基类。"""

    pass


class TimestampMixin:
    """创建/更新时间混入。"""

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())


class UUIDMixin:
    """UUID 主键混入。"""

    id: Mapped[str] = mapped_column(primary_key=True, default=lambda: str(uuid.uuid4()))
