# Servidor local no computador pessoal

Este repertorio pode rodar como um servidor local pequeno para teste do APP/PWA da Jus 9.

## Iniciar no proprio computador

```powershell
.\servidor-local-iniciar.ps1
```

Abrir:

```text
http://127.0.0.1:8099/app.html
```

## Testar no celular pela mesma rede Wi-Fi

```powershell
.\servidor-local-iniciar.ps1 -RedeLocal
```

O script mostra o IP da maquina. No celular, abrir o endereco informado, por exemplo:

```text
http://SEU-IP:8099/app.html
```

## Parar

```powershell
.\servidor-local-parar.ps1
```

## Regras de seguranca

- Este modo e apenas para MVP, demonstracao e teste visual.
- Nao inserir dados reais, sensiveis, sigilosos ou conversas reais do WhatsApp.
- Para uso real, exigir HTTPS, autenticacao, controle de permissao, logs e cofre criptografico.
- O modo `-RedeLocal` abre acesso para outros aparelhos na mesma rede; usar apenas em Wi-Fi confiavel.
