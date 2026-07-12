---
id: REL-CHARLIE-GOVERNANCA-003
versao: 1.2.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: release-candidato
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-release-candidato
---

# Release - Governanca Charlie Echo v1.2.0

## Escopo

Pacote 2: governanca testavel para riscos sensiveis.

## Inclui

- Politica de riscos para dados pessoais, segredos, fontes fracas, minutas, autoridade publica, links duvidosos, urgencia social, memoria, Drive e investimentos.
- Suite de regressao com dez casos de risco.
- Protocolo de regressao antes de publicar prompt ou fluxo sensivel.
- Auditor dedicado `scripts/audit-charlie-governance-risk-suite.mjs`.
- Atualizacao do auditor estrutural para exigir artefatos v1.2.0.

## Nao inclui

- Alteracao de logica de negocio ativa.
- Alteracao de prompt ativo em producao.
- Alteracao de frontend publico.
- Persistencia de dado real, segredo ou token.
