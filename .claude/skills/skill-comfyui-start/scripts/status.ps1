# Read-only chain status overview
$py       = "C:\Anaconda\envs\quant_env_311\python.exe"
$comfyExe = "C:\Anaconda\envs\quant_env_311\Scripts\comfy.exe"
$mcpExe   = "C:\Anaconda\envs\quant_env_311\Scripts\comfy-mcp.exe"
$mcpJson  = "C:\ai_world\ai_self_media\.mcp.json"

try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:8188/system_stats" -UseBasicParsing -TimeoutSec 3
    Write-Output "[1] ComfyUI server : RUNNING (http://127.0.0.1:8188)"
} catch { Write-Output "[1] ComfyUI server : NOT RUNNING -> run start-comfyui.ps1" }

if (Test-Path $py) { Write-Output "[2] host python    : OK ($py)" } else { Write-Output "[2] host python    : MISSING $py" }
if (Test-Path $comfyExe) { Write-Output "[3] comfy-cli      : OK" } else { Write-Output "[3] comfy-cli      : not installed -> run setup-mcp.ps1" }
if (Test-Path $mcpExe)   { Write-Output "[4] comfy-mcp      : OK" } else { Write-Output "[4] comfy-mcp      : not installed -> run setup-mcp.ps1" }

if (Test-Path $mcpJson) {
    $ok = Select-String -Path $mcpJson -Pattern "comfy-mcp" -Quiet
    if ($ok) { Write-Output "[5] .mcp.json      : comfy-mcp registered" }
    else { Write-Output "[5] .mcp.json      : exists but no comfy-mcp -> run setup-mcp.ps1" }
} else { Write-Output "[5] .mcp.json      : missing -> run setup-mcp.ps1" }

$m = Get-ChildItem "C:\ai_world\ai_self_media\ComfyUI_windows_portable\ComfyUI\models" -Recurse -Include *.safetensors,*.ckpt,*.gguf -File -ErrorAction SilentlyContinue |
     Where-Object { $_.DirectoryName -notmatch "vae_approx" } | Measure-Object -Property Length -Sum
Write-Output ("[6] models         : {0} files / {1:N1} GB (excluding bundled preview VAEs)" -f $m.Count, ($m.Sum / 1GB))
