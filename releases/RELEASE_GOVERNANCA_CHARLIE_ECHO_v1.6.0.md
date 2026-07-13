---
id: JUS9-RELEASE-CHARLIE-GOV-1.6.0
versao: 1.6.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: homologacao-tecnica
classificacao: INTERNO
hash: pendente-apos-commit
---

# Release Governanca Charlie Echo v1.6.0

## DataJud

- Rotas canônicas de processo, pesquisa, tribunais e readiness.
- KV exclusivo com cache de cinco minutos e limite operacional por minuto.
- Timeout, uma repeticao curta e erro governado sem resposta bruta.
- Auditoria por hash parcial, tribunal, resultado, duracao e total; numero do processo e partes nao sao gravados no evento.
- DTO declara `official-public-metadata`, `rawAvailable=false` e impede partes brutas.

## PDPJ-Br

- Readiness de credenciais e teste OAuth2 `client_credentials`.
- O access token nunca retorna ao cliente nem e persistido.
- MNI, Domicilio Judicial, peticionamento e ciencia permanecem desabilitados.

## Dependencias externas preservadas

- Nome e CPF continuam recusados pela API Publica DataJud ate existir conector autorizado de partes.
- Credenciais PDPJ devem ser obtidas institucionalmente e configuradas somente no provedor seguro.
