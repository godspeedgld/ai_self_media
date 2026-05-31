"""内容生成与反馈端点。"""

from fastapi import APIRouter, Depends, HTTPException
from langchain.messages import HumanMessage
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.events import event_bus
from models.content_version import ContentVersion
from models.project import Project
from schemas.content import ContentFeedbackRequest, ContentVersionResponse

router = APIRouter(prefix="/projects/{project_id}/content", tags=["content"])


@router.post("/generate")
async def generate_content(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """触发 AI 内容生成（异步）。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")

    # 更新状态
    project.status = "DRAFTING"
    await db.flush()

    # 构造 Agent 提示
    prompt = f"请根据以下主题和要点生成自媒体文章：\n\n主题：{project.title}"
    if project.outline:
        prompt += f"\n\n要点：{project.outline}"
    if project.target_platforms:
        prompt += f"\n\n目标平台：{', '.join(project.target_platforms)}"

    # TODO: 通过 Celery 异步执行 Agent（Phase 4）
    # 目前先返回提示信息
    await event_bus.emit(project_id, "agent_status", {"status": "drafting", "message": "开始生成内容..."})

    return {"message": "内容生成已启动", "status": "DRAFTING"}


@router.post("/feedback")
async def submit_feedback(
    project_id: str,
    req: ContentFeedbackRequest,
    db: AsyncSession = Depends(get_db),
):
    """提交用户反馈，触发内容迭代。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")

    project.status = "REVISING"
    await db.flush()

    await event_bus.emit(project_id, "agent_status", {"status": "revising", "message": "正在根据反馈修改..."})

    return {"message": "反馈已提交，正在修改", "feedback": req.feedback}


@router.post("/approve")
async def approve_content(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """用户确认满意当前内容。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")

    project.status = "APPROVED"
    await db.flush()

    return {"message": "内容已确认", "status": "APPROVED"}


@router.get("/versions", response_model=list[ContentVersionResponse])
async def list_versions(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取所有内容版本。"""
    result = await db.execute(
        select(ContentVersion)
        .where(ContentVersion.project_id == project_id)
        .order_by(ContentVersion.version)
    )
    return result.scalars().all()
