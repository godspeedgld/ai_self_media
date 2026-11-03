# Whisper 本地转写环境恢复指南

whisper.cpp 运行时和模型**不进 git**（2GB+ 二进制，GitHub 单文件 100MB 硬限制），clone 后按本文恢复。

## 工程内的位置

```
.hf-cache/hyperframes/whisper/
├── bin/whisper-cli.exe        ← whisper.cpp 1.9.5 CPU 预编译（含全部 DLL）
└── models/ggml-small.bin      ← 466MB（草稿用）
└── models/ggml-medium.bin     ← 1.5GB（正式用：错字少、能转语气词、时间戳准）
```

`.claude/settings.json` 已配好两个环境变量（只在本工程生效）：

- `HYPERFRAMES_WHISPER_PATH` → 指向 `bin/whisper-cli.exe`
- `HYPERFRAMES_CACHE_DIR` → 指向 `.hf-cache/hyperframes`（模型扫描目录）

## 恢复步骤（新机器）

1. 下载 **whisper-bin-x64.zip**（CPU 版，~9MB）：
   https://github.com/ggml-org/whisper.cpp/releases
   解压，把 `Release/` 整个目录放到 `.hf-cache/hyperframes/whisper/bin/`

2. 下载模型（放 `.hf-cache/hyperframes/whisper/models/`，文件名不能改）：
   - https://huggingface.co/ggml-org/whisper.cpp/tree/main
   - 中文推荐 `ggml-medium.bin`；**不要下 `.en` 结尾的**（会把中文翻成英文）

3. 验证：

   ```bash
   ./.hf-cache/hyperframes/whisper/bin/whisper-cli.exe --version
   # 期望输出: whisper.cpp version: 1.9.5
   ```

4. 转写用法（ffmpeg 需在 PATH）：

   ```bash
   npx hyperframes transcribe 录音.m4a --model medium --language zh --json
   ```

> 网络提示：GitHub/HuggingFace 在部分网络不可直连，需手动浏览器下载。
> GPU：CPU 版够用；如需 GPU 加速需 CUDA 12.8+ 本地编译（RTX 50 系 Blackwell 不兼容官方 12.4 包）。
