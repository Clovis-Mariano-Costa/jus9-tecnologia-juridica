---
id: GOV-CHARLIE-README-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: rascunho-operacional
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-documento-base
---

# Governanca Charlie Echo

Estado operacional corrente: G6C3 publica um retrato minimizado e somente leitura em `/api/governance/charlie/capabilities`; o cronograma vigente e `CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v2.0.0.md`. A rota descreve limites, nao concede autoridade. CNJ segue sem resposta e PDPJ permanece `READINESS_ONLY`.

Esta pasta e a raiz da governanca modular, versionada e auditavel da Charlie Echo.

Objetivo: preservar a logica de negocio existente e criar trilhos para versionar regras, memoria, prompts, documentacao, APIs, modelos, logs, testes, releases, historico e itens obsoletos.

Ordem operacional adotada:

1. Prioritario.
2. Principios e clausulas petreas.
3. Constituicao.
4. Leis internas.
5. Regimentos.
6. Protocolos.

Regras de base:

- Nao modificar dados permanentes sem aprovacao humana registrada.
- Nao promover memoria temporaria para permanente de forma automatica.
- Toda mudanca deve ter metadados, justificativa, versao e trilha de auditoria.
- Versoes aprovadas nao devem ser sobrescritas; novas alteracoes devem gerar nova versao.
- O Google Drive pode ser memoria operacional documental, mas segredos, estado transacional critico e automacoes sensiveis exigem backend/API governado.
