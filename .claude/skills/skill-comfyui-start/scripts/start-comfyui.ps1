# Start local ComfyUI (idempotent): returns READY if running; otherwise launches bat and polls
param([int]$TimeoutSec = 120)

$root = "C:\ai_world\ai_self_media\ComfyUI_windows_portable"
$port = 8188

function Test-Comfy {
    try {
        $r = Invoke-WebRequest -Uri "http://127.0.0.1:$port/system_stats" -UseBasicParsing -TimeoutSec 3
        return ($r.StatusCode -eq 200)
    } catch { return $false }
}

if (Test-Comfy) {
    Write-Output "READY: ComfyUI already running (http://127.0.0.1:$port)"
    exit 0
}

if (-not (Test-Path "$root\run_nvidia_gpu.bat")) {
    Write-Output "ERROR: launcher not found: $root\run_nvidia_gpu.bat"
    exit 1
}

Write-Output "LAUNCH: starting ComfyUI (minimized window)..."
Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "`"$root\run_nvidia_gpu.bat`"" -WorkingDirectory $root -WindowStyle Minimized

$deadline = (Get-Date).AddSeconds($TimeoutSec)
while ((Get-Date) -lt $deadline) {
    Start-Sleep -Seconds 3
    if (Test-Comfy) {
        Write-Output "READY: ComfyUI is up (http://127.0.0.1:$port)"
        exit 0
    }
}

Write-Output "TIMEOUT: not ready within ${TimeoutSec}s - first launch may take longer, check the ComfyUI window log and retry"
exit 2
