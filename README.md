# AI 自媒体智能体

基于 [deepagents](https://github.com/langchain-ai/deepagents) 框架的 AI 自媒体内容生成与发布平台。

## 功能

- 📝 输入要点，AI 自动生成文章和配图
- 🔄 支持多轮反馈迭代，直到用户满意
- 📤 一键发布到知乎、小红书等自媒体平台
- 🧩 Skill 驱动的发布系统，轻松扩展新平台

## 技术栈

- **Agent 框架**: deepagents (LangGraph 运行时)
- **AI 模型**: 通义千问 / DeepSeek / 智谱 GLM (国内模型)
- **图片生成**: 通义万相 (DashScope)
- **后端**: FastAPI + SQLAlchemy
- **前端**: Next.js + shadcn/ui
- **浏览器自动化**: Playwright (平台发布)

## 项目结构

```
backend/
├── agent/           # deepagents Agent 核心
│   ├── skills/      # Skills (内容生成、各平台发布)
│   └── tools/       # 自定义工具
├── api/             # FastAPI Web 层
├── models/          # 数据库模型
└── core/            # 基础设施

frontend/            # Next.js 前端
```

## 快速开始

```bash
# 1. 安装后端依赖
cd backend
uv sync

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入 API Key

# 3. 启动后端
uv run python -m agent "写一篇关于AI的文章"

# 4. 启动前端 (Phase 2)
cd ../frontend
pnpm install && pnpm dev
```

## License

MIT
