param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'

$dist = Join-Path $Root 'dist'
if (-not (Test-Path -LiteralPath $dist)) {
  throw "Pasta dist nao encontrada: $dist"
}

$files = @(
  'index.html',
  'script.js',
  'style.css',
  'versionamento.html',
  'saiba-mais.html',
  'assets\clovis-founder-portrait.png',
  'assets\clovis-founder-context.png'
)

foreach ($file in $files) {
  $source = Join-Path $Root $file
  $target = Join-Path $dist $file
  if (-not (Test-Path -LiteralPath $source)) {
    throw "Arquivo fonte nao encontrado: $source"
  }
  $targetDir = Split-Path -Parent $target
  if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
  }
  Copy-Item -LiteralPath $source -Destination $target -Force
}

Write-Output "Portal sincronizado para dist: $dist"
