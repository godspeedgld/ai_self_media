"""发布端点。"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from models.project import Project
from schemas.publish import PublishRequest, PublishRecordResponse

router = APIRouter(prefix="/projects/{project_id}/publish", tags=["publishing"])


@router.post("")
async def publish_content(
    project_id: str,
    req: PublishRequest,
    db: AsyncSession = Depends(get_db),
):
    """发布内容到指定平台。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")

    if project.status != "APPROVED":
        raise HTTPException(status_code=400, detail="内容尚未确认，请先确认内容")

    # 验证平台
    valid_platforms = {"zhihu", "xiaohongshu"}
    invalid = set(req.platforms) - valid_platforms
    if invalid:
        raise HTTPException(status_code=400, detail=f"不支持的平台: {invalid}")

    project.status = "PUBLISHING"
    await db.flush()

    # TODO: 通过 Celery 异步执行发布（Phase 3）
    return {
        "message": f"发布已启动，目标平台: {req.platforms}",
        "status": "PUBLISHING",
        "platforms": req.platforms,
    }


@router.get("/records")
async def get_publish_records(
    project_id: str,
    db: AsyncSession = Depends(get_db),
):
    """获取发布记录。"""
    from models.publish_record import PublishRecord
    from sqlalchemy import select

    result = await db.execute(
        select(PublishRecord).where(PublishRecord.project_id == project_id)
    )
    return result.scalars().all()
