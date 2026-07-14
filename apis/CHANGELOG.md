---
id: API-CHARLIE-CHANGELOG-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: ativo
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-changelog
---

# Changelog - APIs

## 1.10.1 - 2026-07-14

- Frontend do DAJ consulta `/api/auth/permissions` antes de habilitar a criacao.
- Falha, sessao ausente ou perfil sem `dajs:write` mantem a gravacao bloqueada.

## 1.10.0 - 2026-07-13

- Adicionada `DELETE /api/dajs?dajId=...` exclusivamente para DAJ ficticio de homologacao.
- Incluidos tombstone sem dados da parte, auditoria e bloqueio de replay da chave idempotente apagada.
- `GET /api/dajs?dajId=...` sustenta retomada segura depois do login sem recarregar CPF integral.

## 1.9.0 - 2026-07-13

- Adicionadas rotas autenticadas `GET/POST /api/dajs` e `GET /api/dajs/readiness`.
- Cadastro DAJ passa a alimentar o indice de nome e CPF HMAC antes do vinculo processual.
- Criacao recebe idempotencia obrigatoria; detalhe sigiloso permanece separado do indice pesquisavel.
- Vinculo posterior preserva identidade, HMAC e classificacao originados no atendimento.

## 1.3.0 - 2026-07-12

- Adicionado contrato de backend governado com rotas, eventos, bloqueios e regras de Drive/memoria.
- Adicionadas feature flags de capacidades com estados de maturidade.

## 1.0.0 - 2026-07-12

- Criada area de contratos de API.
- Registradas rotas minimas recomendadas para backend governado.
