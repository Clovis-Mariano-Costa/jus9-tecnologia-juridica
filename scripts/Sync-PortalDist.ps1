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
  '_headers',
  'versionamento.html',
  'saiba-mais.html',
  'nossa-historia.html',
  'mvp.html',
  'app-demo-advogar.html',
  'app-demo-autor-editor.html',
  'demo-14-autor-editor.html',
  'app-ia-profissional.html',
  'app-agenda.html',
  'service-worker.js',
  'assets\js\daj-intake.js',
  'data-publica\mvp-perfis.json',
  'assets\clovis-founder-portrait.png',
  'assets\clovis-founder-context.png'
)

$files += Get-ChildItem -LiteralPath $Root -Filter '*.html' -File | ForEach-Object { $_.Name }
$files += Get-ChildItem -LiteralPath (Join-Path $Root 'documentos') -Filter '*.html' -File | ForEach-Object {
  Join-Path 'documentos' $_.Name
}
$files = $files | Select-Object -Unique

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
