"""API v1 路由聚合。"""

from fastapi import APIRouter

from api.v1.content import router as content_router
from api.v1.projects import router as projects_router
from api.v1.publishing import router as publishing_router
from api.v1.stream import router as stream_router

v1_router = APIRouter(prefix="/api/v1")
v1_router.include_router(projects_router)
v1_router.include_router(content_router)
v1_router.include_router(publishing_router)
v1_router.include_router(stream_router)
