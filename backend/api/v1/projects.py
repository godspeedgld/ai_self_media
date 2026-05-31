"""项目 CRUD 端点。"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from models.project import Project
from schemas.project import ProjectCreate, ProjectResponse, ProjectListResponse

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=ProjectResponse, status_code=201)
async def create_project(req: ProjectCreate, db: AsyncSession = Depends(get_db)):
    """创建新项目。"""
    project = Project(
        title=req.title,
        outline=req.outline,
        target_platforms=req.target_platforms,
        status="TOPIC_SUBMITTED",
    )
    db.add(project)
    await db.flush()
    await db.refresh(project)
    return project


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    offset: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """获取项目列表。"""
    total = (await db.execute(select(func.count()).select_from(Project))).scalar() or 0
    result = await db.execute(select(Project).offset(offset).limit(limit).order_by(Project.created_at.desc()))
    items = result.scalars().all()
    return ProjectListResponse(items=items, total=total)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, db: AsyncSession = Depends(get_db)):
    """获取项目详情。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")
    return project


@router.delete("/{project_id}", status_code=204)
async def delete_project(project_id: str, db: AsyncSession = Depends(get_db)):
    """删除项目。"""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="项目不存在")
    await db.delete(project)
