"""事件总线 — 用于 SSE 实时推送 Agent 进度。"""

import asyncio
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any


@dataclass
class Event:
    """Agent 事件。"""

    type: str  # agent_status | content_chunk | image_ready | publish_status | error
    data: dict[str, Any]
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())


class EventBus:
    """简单的进程内事件总线，支持 SSE 订阅。"""

    def __init__(self):
        self._subscribers: dict[str, list[asyncio.Queue]] = defaultdict(list)

    def subscribe(self, project_id: str) -> asyncio.Queue:
        """订阅项目事件，返回一个 Queue 用于 SSE 推送。"""
        queue: asyncio.Queue[Event | None] = asyncio.Queue(maxsize=100)
        self._subscribers[project_id].append(queue)
        return queue

    def unsubscribe(self, project_id: str, queue: asyncio.Queue) -> None:
        """取消订阅。"""
        if project_id in self._subscribers:
            self._subscribers[project_id] = [q for q in self._subscribers[project_id] if q is not queue]

    async def emit(self, project_id: str, event_type: str, data: dict[str, Any]) -> None:
        """发布事件到所有订阅者。"""
        event = Event(type=event_type, data=data)
        for queue in self._subscribers.get(project_id, []):
            try:
                queue.put_nowait(event)
            except asyncio.QueueFull:
                pass  # 丢弃旧事件


# 全局单例
event_bus = EventBus()
