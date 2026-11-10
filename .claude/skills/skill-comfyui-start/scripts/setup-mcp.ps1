# Install/verify comfy-cli + comfy-mcp, set-default to portable ComfyUI, register .mcp.json (idempotent, merge-write)
$ErrorActionPreference = "Continue"

$py         = "C:\Anaconda\envs\quant_env_311\python.exe"
$scripts    = "C:\Anaconda\envs\quant_env_311\Scripts"
$comfyuiDir = "C:\ai_world\ai_self_media\ComfyUI_windows_portable\ComfyUI"
$repoRoot   = "C:\ai_world\ai_self_media"
$mcpJson    = "$repoRoot\.mcp.json"
$comfyExe   = "$scripts\comfy.exe"
$mcpExe     = "$scripts\comfy-mcp.exe"

if (-not (Test-Path $py)) { Write-Output "ERROR: python not found: $py"; exit 1 }

# 1. install deps only if missing
& $py -m pip show comfy-cli 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Output "INSTALL: comfy-cli ..."
    & $py -m pip install --quiet "comfy-cli>=1.14.0"
} else { Write-Output "OK: comfy-cli installed" }

& $py -m pip show comfy-mcp 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Output "INSTALL: comfy-mcp ..."
    & $py -m pip install --quiet comfy-mcp
} else { Write-Output "OK: comfy-mcp installed" }

if (-not (Test-Path $comfyExe)) { Write-Output "ERROR: not found: $comfyExe"; exit 1 }
if (-not (Test-Path $mcpExe))   { Write-Output "ERROR: not found: $mcpExe";   exit 1 }

# 2. set-default to portable ComfyUI
Write-Output "SET-DEFAULT: $comfyuiDir"
& $comfyExe set-default $comfyuiDir 2>&1 | Out-Null

# 3. register .mcp.json (merge: keep other servers, update comfy-mcp only)
$server = [ordered]@{
    command = $mcpExe
    env     = [ordered]@{ COMFY_BIN = $comfyExe }
}
$cfg = $null
if (Test-Path $mcpJson) {
    try { $cfg = Get-Content $mcpJson -Raw | ConvertFrom-Json } catch { $cfg = $null }
}
if (-not $cfg -or -not ($cfg.PSObject.Properties.Name -contains "mcpServers")) {
    $cfg = New-Object PSObject
    $cfg | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value (New-Object PSObject)
}
$hasComfy = $cfg.mcpServers.PSObject.Properties.Name -contains "comfy-mcp"
if ($hasComfy) { $cfg.mcpServers."comfy-mcp" = $server }
else { $cfg.mcpServers | Add-Member -MemberType NoteProperty -Name "comfy-mcp" -Value $server }
[System.IO.File]::WriteAllText($mcpJson, ($cfg | ConvertTo-Json -Depth 6), (New-Object System.Text.UTF8Encoding($false)))
Write-Output "OK: comfy-mcp registered in $mcpJson"

Write-Output "DONE: chain ready. MCP loads in a NEW Claude Code session - reopen session, check /mcp for comfy-mcp, call server_info first"
