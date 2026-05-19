$ErrorActionPreference = "Stop"

$Raiz = $PSScriptRoot
$PidFile = Join-Path $Raiz ".servidor-local.pid"

if (-not (Test-Path -LiteralPath $PidFile)) {
  Write-Host "Nenhum servidor local registrado para este repertorio."
  exit 0
}

$PidServidor = (Get-Content -Raw -LiteralPath $PidFile).Trim()

if ($PidServidor -and (Get-Process -Id ([int]$PidServidor) -ErrorAction SilentlyContinue)) {
  Stop-Process -Id ([int]$PidServidor) -Force
  Write-Host "Servidor local encerrado. PID: $PidServidor"
} else {
  Write-Host "PID registrado nao esta mais ativo."
}

Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
