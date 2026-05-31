"""
CLI 入口 — 直接运行 Agent

用法:
    cd backend
    uv run python -m agent "写一篇关于AI的文章"
    uv run python -m agent "写一篇关于AI的文章" --platform zhihu
"""

import sys

from dotenv import load_dotenv
from langchain.messages import HumanMessage
from rich.console import Console
from rich.panel import Panel

# 加载 .env
load_dotenv()

console = Console()


def main():
    # 解析参数
    args = sys.argv[1:]
    platform = None

    if "--platform" in args:
        idx = args.index("--platform")
        platform = args[idx + 1] if idx + 1 < len(args) else None
        args = args[:idx] + args[idx + 2 :]

    prompt = " ".join(args) if args else "写一篇关于 AI 如何改变日常生活的科普文章"

    if platform:
        prompt += f"\n\n目标平台: {platform}"

    console.print(Panel(f"[bold blue]{prompt}[/bold blue]", title="📝 任务", border_style="blue"))

    # 创建 Agent
    from agent.app import create_media_agent

    console.print("[dim]正在初始化 Agent...[/dim]")
    agent = create_media_agent()

    # 运行
    console.print("[dim]Agent 运行中，请稍候...[/dim]\n")
    result = agent.invoke(
        {"messages": [HumanMessage(content=prompt)]},
        config={"configurable": {"thread_id": "cli-demo"}},
    )

    # 输出结果
    for msg in result.get("messages", []):
        if hasattr(msg, "content") and msg.content and hasattr(msg, "type"):
            if msg.type == "ai":
                console.print(Panel(msg.content, title="🤖 AI 回复", border_style="green"))

    console.print("\n[bold green]✅ 完成！[/bold green]")


if __name__ == "__main__":
    main()
