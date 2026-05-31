.PHONY: help dev up down backend frontend agent test

help: ## 显示帮助
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## 启动基础设施 (Postgres, Redis, MinIO)
	docker-compose up -d

down: ## 停止基础设施
	docker-compose down

backend-install: ## 安装后端依赖
	cd backend && uv sync

backend: ## 启动后端 API 服务
	cd backend && uv run uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

frontend-install: ## 安装前端依赖
	cd frontend && pnpm install

frontend: ## 启动前端开发服务器
	cd frontend && pnpm dev

agent: ## CLI 方式运行 Agent (需传参数, 如: make agent MSG="写一篇关于AI的文章")
	cd backend && uv run python -m agent "$(MSG)"

dev: up ## 启动全部开发环境
	@echo "基础设施已启动，请分别在终端运行:"
	@echo "  make backend"
	@echo "  make frontend"

test: ## 运行测试
	cd backend && uv run pytest -v
