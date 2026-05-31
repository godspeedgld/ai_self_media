"""SSE 实时推送端点 — 流式推送 Agent 运行进度。"""

import asyncio
import json

from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse

from core.events import EventBus, event_bus

router = APIRouter(tags=["stream"])


@router.get("/projects/{project_id}/stream")
async def stream_project_events(project_id: str, request: Request):
    """SSE 端点 — 实时推送项目 Agent 运行事件。

    事件类型:
    - agent_status: Agent 状态变化
    - content_chunk: 内容生成片段
    - image_ready: 图片生成完成
    - publish_status: 发布状态更新
    - error: 错误信息
    """

    async def event_generator():
        queue = event_bus.subscribe(project_id)
        try:
            while True:
                # 检查客户端是否断开
                if await request.is_disconnected():
                    break

                try:
                    event = await asyncio.wait_for(queue.get(), timeout=30)
                    if event is None:
                        break
                    yield {
                        "event": event.type,
                        "data": json.dumps(
                            {"timestamp": event.timestamp, **event.data},
                            ensure_ascii=False,
                        ),
                    }
                except asyncio.TimeoutError:
                    # 心跳保活
                    yield {"event": "ping", "data": ""}
        finally:
            event_bus.unsubscribe(project_id, queue)

    return EventSourceResponse(event_generator())
