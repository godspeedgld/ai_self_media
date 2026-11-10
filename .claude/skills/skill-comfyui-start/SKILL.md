---
name: comfyui-start
description: 启动本地 ComfyUI 并建立 comfy-mcp 连接（自动装依赖、set-default、注册 .mcp.json），让 Claude 可以直接驱动 ComfyUI 出图出视频。触发场景：用户说"启动 comfyui / 连接 comfy / 配置 comfy mcp / 让 Claude 操作 ComfyUI"。
---

# ComfyUI 启动与 MCP 连接（一键链路）

完成整条链路：**ComfyUI 服务启动 → comfy-cli/comfy-mcp 依赖就绪 → .mcp.json 注册 → Claude 可驱动**。

## 环境事实（本机固定值，勿改）

- ComfyUI 便携版：`C:\ai_world\ai_self_media\ComfyUI_windows_portable\`（`run_nvidia_gpu.bat` 启动，端口 **8188**）
- ComfyUI 版本：v0.44.0（已内置 MiniMax H3 全套节点）
- comfy-cli / comfy-mcp 宿主 Python：`C:\Anaconda\envs\quant_env_311\python.exe`（3.11）
- exe 位置：`C:\Anaconda\envs\quant_env_311\Scripts\comfy.exe`、`...\comfy-mcp.exe`

## 执行流程（按序，全部幂等可重复跑）

脚本目录：本技能目录下 `scripts/`。统一调用方式：

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File "<skill目录>\scripts\<脚本>.ps1"
```

1. **状态总览**（可选先跑）：`status.ps1` — 报告链路各环节状态
2. **启动 ComfyUI**：`start-comfyui.ps1` — 幂等；已在运行直接返回 READY；未运行则最小化窗口拉起 bat 并轮询 8188 直到就绪（默认 120s 超时，首次启动可加 `-TimeoutSec 240`）
3. **MCP 依赖与注册**：`setup-mcp.ps1` — 幂等；缺啥装啥（comfy-cli≥1.14.0、comfy-mcp 装进 quant_env_311），执行 `comfy set-default` 指向便携版 ComfyUI，并把 `comfy-mcp` 注册合并进仓库根 **`.mcp.json`**（含 `COMFY_BIN` 绝对路径）
4. **验证**：`curl http://127.0.0.1:8188/system_stats` 返回 200 即服务就绪

## 完成后必做的提醒

MCP 服务在**会话启动时**加载——`.mcp.json` 新写入后，需要**新开 Claude Code 会话**（或在 VSCode 里重启会话并批准该 MCP server），之后 `/mcp` 里出现 `comfy-mcp`，先调 `server_info` 验证，再正常使用 `run_workflow` / `search_nodes` 等工具。

## 回退方案（comfy-cli 与便携版不合拍时）

comfy-cli 对 python_embeded 便携版的 `launch` 类命令可能不兼容（依赖都在 embedded python 里）。**保底**：手动/脚本用 bat 启动后，直接调 ComfyUI HTTP API，不依赖 comfy-cli：

```bash
# 提交（prompt 为 API 格式 workflow JSON）
curl -X POST http://127.0.0.1:8188/prompt -H "Content-Type: application/json" -d "{\"prompt\": <workflow>}"
# 轮询状态 /history/<prompt_id>；产物在 ComfyUI/output/ 或经 /view 取回
```

## 注意

- ComfyUI 运行窗口是最小化的 cmd——关闭它就是停止服务
- `.mcp.json` 里是本机绝对路径，换机器需按实际路径改
- 模型未下载时 workflow 会报缺模型；H3 模型清单见 HF 仓库 Comfy-Org/MiniMax-H3（42.5GB 起步，详见会话记录）
