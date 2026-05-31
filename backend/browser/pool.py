"""浏览器池管理 — Playwright 实例复用。"""

import asyncio
from pathlib import Path

from playwright.async_api import Browser, BrowserContext, async_playwright

from core.config import settings


class BrowserPool:
    """管理 Playwright 浏览器实例池。"""

    def __init__(self, pool_size: int = 2):
        self.pool_size = pool_size
        self._playwright = None
        self._browser: Browser | None = None
        self._contexts: list[BrowserContext] = []
        self._available = asyncio.Queue(maxsize=pool_size)
        self._session_dir = Path(settings.browser_session_dir)
        self._session_dir.mkdir(parents=True, exist_ok=True)

    async def start(self):
        """启动浏览器池。"""
        self._playwright = await async_playwright().start()
        self._browser = await self._playwright.chromium.launch(
            headless=settings.browser_headless,
        )
        for _ in range(self.pool_size):
            context = await self._browser.new_context()
            self._contexts.append(context)
            await self._available.put(context)

    async def acquire(self) -> BrowserContext:
        """获取一个浏览器上下文。"""
        return await self._available.get()

    async def release(self, context: BrowserContext):
        """归还浏览器上下文。"""
        await self._available.put(context)

    async def close(self):
        """关闭浏览器池。"""
        for ctx in self._contexts:
            await ctx.close()
        if self._browser:
            await self._browser.close()
        if self._playwright:
            await self._playwright.stop()


# 全局单例
browser_pool = BrowserPool()
