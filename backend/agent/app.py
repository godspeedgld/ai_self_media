"""
AI 自媒体 Agent — 基于 deepagents 框架

参考 content-builder-agent 示例，使用:
- AGENTS.md 作为品牌记忆
- subagents.yaml 定义子 Agent
- skills/ 目录存放 Skills
- 自定义 tools 提供搜索/图片生成/发布能力
"""

import os
from pathlib import Path
from typing import Literal

import yaml
from langchain.tools import tool

AGENT_DIR = Path(__file__).parent


# ============================================================
# Tools — 自定义工具
# ============================================================

@tool
def web_search(
    query: str,
    max_results: int = 5,
    topic: Literal["general", "news"] = "general",
) -> dict:
    """搜索网络获取最新信息。

    Args:
        query: 搜索关键词（尽量具体）
        max_results: 返回结果数量（默认5）
        topic: "general" 通用搜索, "news" 新闻搜索

    Returns:
        搜索结果，包含标题、URL 和摘要。
    """
    try:
        from tavily import TavilyClient

        api_key = os.environ.get("TAVILY_API_KEY")
        if not api_key:
            return {"error": "TAVILY_API_KEY 未设置，请在 .env 中配置"}

        client = TavilyClient(api_key=api_key)
        return client.search(query, max_results=max_results, topic=topic)
    except Exception as e:
        return {"error": f"搜索失败: {e}"}


@tool
def generate_image(prompt: str, output_path: str, width: int = 1024, height: int = 1024) -> str:
    """使用通义万相生成图片。

    Args:
        prompt: 图片描述（中文或英文）
        output_path: 图片保存路径（相对于项目目录）
        width: 图片宽度（默认1024）
        height: 图片高度（默认1024）

    Returns:
        图片保存路径或错误信息。
    """
    try:
        import dashscope
        from dashscope import ImageSynthesis

        api_key = os.environ.get("DASHSCOPE_API_KEY")
        if not api_key:
            return "错误: DASHSCOPE_API_KEY 未设置"

        dashscope.api_key = api_key

        # 计算合理的尺寸
        size = f"{width}*{height}"

        response = ImageSynthesis.call(
            model="wanx-v2",
            prompt=prompt,
            size=size,
            n=1,
        )

        if response.status_code == 200:
            # 下载图片到本地
            result = response.output.results[0]
            image_url = result.url

            # 使用 httpx 下载
            import httpx

            full_path = AGENT_DIR / output_path
            full_path.parent.mkdir(parents=True, exist_ok=True)

            img_data = httpx.get(image_url).content
            full_path.write_bytes(img_data)

            return f"图片已保存到 {output_path}"
        else:
            return f"错误: {response.message}"

    except Exception as e:
        return f"错误: {e}"


@tool
def publish_to_zhihu(title: str, content: str, image_paths: list[str] | None = None) -> str:
    """发布内容到知乎专栏。

    Args:
        title: 文章标题（≤50字）
        content: 文章正文（Markdown格式）
        image_paths: 配图路径列表（可选）

    Returns:
        发布结果（成功返回文章URL，失败返回错误信息）。
    """
    # TODO: Phase 3 — 使用 Playwright 实现
    return (
        f"[模拟发布] 知乎文章已创建:\n"
        f"  标题: {title}\n"
        f"  正文长度: {len(content)} 字\n"
        f"  配图数量: {len(image_paths) if image_paths else 0}\n"
        f"  状态: 模拟模式，未实际发布"
    )


@tool
def publish_to_xiaohongshu(title: str, content: str, image_paths: list[str] | None = None) -> str:
    """发布内容到小红书。

    Args:
        title: 笔记标题（≤20字）
        content: 笔记正文
        image_paths: 配图路径列表（最多9张）

    Returns:
        发布结果（成功返回笔记URL，失败返回错误信息）。
    """
    # TODO: Phase 3 — 使用 Playwright 实现
    return (
        f"[模拟发布] 小红书笔记已创建:\n"
        f"  标题: {title}\n"
        f"  正文长度: {len(content)} 字\n"
        f"  配图数量: {len(image_paths) if image_paths else 0}\n"
        f"  状态: 模拟模式，未实际发布"
    )


# ============================================================
# Subagent Loader — 从 YAML 加载子 Agent
# ============================================================

def load_subagents(config_path: Path) -> list:
    """从 subagents.yaml 加载子 Agent 定义，并绑定工具。"""
    available_tools = {
        "web_search": web_search,
        "generate_image": generate_image,
        "publish_to_zhihu": publish_to_zhihu,
        "publish_to_xiaohongshu": publish_to_xiaohongshu,
    }

    with open(config_path, encoding="utf-8") as f:
        config = yaml.safe_load(f)

    subagents = []
    for name, spec in config.items():
        subagent = {
            "name": name,
            "description": spec["description"],
            "system_prompt": spec["system_prompt"],
        }
        if "model" in spec:
            subagent["model"] = spec["model"]
        if "tools" in spec:
            subagent["tools"] = [available_tools[t] for t in spec["tools"]]
        subagents.append(subagent)

    return subagents


# ============================================================
# Agent Factory — 创建 Agent
# ============================================================

def create_media_agent(checkpointer=None):
    """创建自媒体内容生成 Agent。"""
    from deepagents import create_deep_agent
    from deepagents.backends import FilesystemBackend

    return create_deep_agent(
        # 默认模型（通义千问），通过 OpenAI 兼容协议接入
        model="openai:qwen-max",
        # 品牌记忆
        memory=[str(AGENT_DIR / "AGENTS.md")],
        # Skills 目录
        skills=[str(AGENT_DIR / "skills")],
        # 全局工具
        tools=[
            web_search,
            generate_image,
            publish_to_zhihu,
            publish_to_xiaohongshu,
        ],
        # 子 Agent
        subagents=load_subagents(AGENT_DIR / "subagents.yaml"),
        # 文件系统后端
        backend=FilesystemBackend(root_dir=AGENT_DIR),
        # 持久化（可选）
        checkpointer=checkpointer,
    )
