param(
  [Parameter(Mandatory = $true)]
  [string]$ConfirmTarget
)

$ErrorActionPreference = "Stop"

if ($ConfirmTarget -ne "jus9-homologacao") {
  throw "Confirmacao invalida. Use exatamente: -ConfirmTarget jus9-homologacao"
}

$databaseUrl = [Environment]::GetEnvironmentVariable("DATABASE_URL")
if (-not $databaseUrl) {
  throw "DATABASE_URL ausente. Configure a URL segura do banco de homologacao fora do GitHub."
}

$uri = [Uri]$databaseUrl
$databaseName = $uri.AbsolutePath.Trim("/")
if ($databaseName -notmatch "(?i)(hml|homolog|staging|test)") {
  throw "Banco recusado: o nome precisa indicar homologacao, staging ou test."
}

$psql = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psql) {
  throw "psql ausente. Instale o cliente PostgreSQL antes de aplicar o pacote."
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$files = @(
  "database\migrations\001_initial_schema.sql",
  "database\migrations\002_office_groups_and_attendance_media.sql",
  "database\migrations\003_adapted_dossiers.sql",
  "database\migrations\004_expand_user_profiles.sql",
  "database\migrations\005_rls_titularidade_e_auditoria.sql",
  "database\homologation\001_seed_controlled_daj_deji.sql",
  "database\homologation\002_verify_rls_controlled_accounts.sql"
)

foreach ($relativePath in $files) {
  $path = Join-Path $repoRoot $relativePath
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Arquivo ausente: $relativePath"
  }
  Write-Host "Aplicando $relativePath"
  & $psql.Source $databaseUrl "-v" "ON_ERROR_STOP=1" "-f" $path
  if ($LASTEXITCODE -ne 0) {
    throw "Falha ao aplicar $relativePath"
  }
}

Write-Host "HOMOLOGACAO_RLS_DAJ_DEJI_OK"
