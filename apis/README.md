---
id: API-CHARLIE-README-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: rascunho-operacional
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-documento-base
---

# APIs Charlie Echo

## Estado publico da governanca Charlie - G6C3

O contrato `CONTRATO_API_ESTADO_GOVERNADO_CHARLIE_v1.0.0.yaml` descreve `GET /api/governance/charlie/capabilities`. A rota e publica A0, somente leitura, minimizada, sem segredos e sem efeito externo. Ela declara DataJud read-only, PDPJ `READINESS_ONLY`, efeitos judiciais bloqueados e o canal CNJ ainda aguardando resposta.

Esta pasta registra contratos de API e integracoes governadas. Ela nao deve conter segredo, token ou chave.

Rotas planejadas pela auditoria:

- `/chat`
- `/rooms`
- `/summaries`
- `/sources`
- `/exports`
- `/health`
- `/governance-events`
