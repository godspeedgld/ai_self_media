"""FastAPI 应用入口。"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.router import v1_router
from core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理。"""
    # Startup
    print(f"🚀 AI 自媒体平台启动中... (环境: {settings.app_env})")
    yield
    # Shutdown
    print("👋 AI 自媒体平台已关闭")


app = FastAPI(
    title="AI 自媒体平台",
    description="AI 驱动的内容生成与发布 API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — 允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(v1_router)


@app.get("/health")
async def health_check():
    """健康检查。"""
    return {"status": "ok", "env": settings.app_env}
