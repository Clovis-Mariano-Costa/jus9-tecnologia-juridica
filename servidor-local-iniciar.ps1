param(
  [int]$Porta = 8099,
  [switch]$RedeLocal
)

$ErrorActionPreference = "Stop"

$Raiz = $PSScriptRoot
$Bind = if ($RedeLocal) { "0.0.0.0" } else { "127.0.0.1" }
$PidFile = Join-Path $Raiz ".servidor-local.pid"
$LogOut = Join-Path $Raiz ".servidor-local.out.log"
$LogErr = Join-Path $Raiz ".servidor-local.err.log"

if (Test-Path -LiteralPath $PidFile) {
  $PidAntigo = (Get-Content -Raw -LiteralPath $PidFile).Trim()
  if ($PidAntigo -and (Get-Process -Id ([int]$PidAntigo) -ErrorAction SilentlyContinue)) {
    Write-Host "Servidor local ja esta ativo. PID: $PidAntigo"
    Write-Host "URL local: http://127.0.0.1:$Porta/app.html"
    if ($RedeLocal) {
      $Ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "169.254*" -and $_.IPAddress -ne "127.0.0.1" } | Select-Object -First 1 -ExpandProperty IPAddress)
      if ($Ip) { Write-Host "URL na rede Wi-Fi: http://$Ip`:$Porta/app.html" }
    }
    exit 0
  }
}

$Python = Get-Command python -ErrorAction SilentlyContinue
$Args = @("-m", "http.server", "$Porta", "--bind", $Bind, "--directory", $Raiz)

if (-not $Python) {
  $Python = Get-Command py -ErrorAction SilentlyContinue
  $Args = @("-3", "-m", "http.server", "$Porta", "--bind", $Bind, "--directory", $Raiz)
}

if (-not $Python) {
  throw "Python nao encontrado. Instale Python 3 ou use o servidor estatico equivalente."
}

$Processo = Start-Process -FilePath $Python.Source -ArgumentList $Args -WorkingDirectory $Raiz -WindowStyle Hidden -RedirectStandardOutput $LogOut -RedirectStandardError $LogErr -PassThru
Set-Content -LiteralPath $PidFile -Value $Processo.Id -Encoding ASCII

Write-Host "Servidor local Jus 9 iniciado. PID: $($Processo.Id)"
Write-Host "URL local: http://127.0.0.1:$Porta/app.html"

if ($RedeLocal) {
  $Ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "169.254*" -and $_.IPAddress -ne "127.0.0.1" } | Select-Object -First 1 -ExpandProperty IPAddress)
  if ($Ip) {
    Write-Host "URL na rede Wi-Fi: http://$Ip`:$Porta/app.html"
    Write-Host "Use apenas para teste local. Nao inserir dados reais sem HTTPS, login e cofre."
  }
}
