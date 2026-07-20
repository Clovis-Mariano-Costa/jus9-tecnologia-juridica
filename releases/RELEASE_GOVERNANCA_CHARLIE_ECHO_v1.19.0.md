---
id: REL-CHARLIE-ECHO-1-19-0
versao: 1.19.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.19.0 - Pipeline governado de respostas

## Escopo

Concluir o G2 interno do cronograma focado, fazendo cada resposta da Charlie passar pelo mesmo envelope de contrato, classificacao, risco, citacoes, limites, revisao humana, efeitos bloqueados, proveniencia e auditoria.

## Entregas

- Charlie Core contrato `1.2.0`.
- Modulo `response-pipeline.js` independente e testavel.
- Cabecalhos governados para classificacao, risco, revisao, citacoes, limites e bloqueio de efeitos.
- Corpo DAJ recebe o mesmo envelope validado.
- Frontend considera o Worker fonte autoritativa dos metadados de governanca.
- Evento estruturado `charlie.response.governed`, validado como `AuditEvent` antes do log.
- Leitura do corpo upstream DAJ limitada a 500 kB; respostas maiores sao rejeitadas e substituidas pelo fallback governado.
- Auditor dedicado integrado ao CI local.

## Minimizacao da auditoria

O evento registra somente `auditId`, contrato, origem, MVP, rota controlada, classificacao, risco, revisao, estado de citacoes, contagens, status upstream e duracao. Nao registra pergunta, resposta, nome, e-mail, hash de e-mail, CPF, numero de processo, cookie, token ou segredo.

## Limites

- Workers Logs fornecem persistencia operacional conforme a retencao configurada na Cloudflare; nao constituem arquivo juridico permanente.
- Citacoes vindas do upstream permanecem `provided_unverified` ate conferencia humana/por fonte oficial.
- Nenhum novo binding, KV, segredo ou conector foi criado.
- DataJud permanece somente leitura; PDPJ permanece readiness-only; Drive e memoria nao foram ampliados.

## Publicacao e verificacao

- Worker: `705e6178-49ca-45a3-a572-fb4a1f4eb384`.
- Health: `ready`, release `governanca-1.19.0-charlie-pipeline-governado-1.0`, contrato `1.2.0`.
- Smoke governado: HTTP 200, origem `upstream`, classificacao `JURIDICO_SIGILOSO`, risco `high`, revisao `required`, citacoes `required_unverified`, limites e `auditId` presentes.
- Tail confirmou `charlie.response.governed` com somente metadados e contagens minimizados; nenhuma pergunta ou resposta foi registrada.
- Inicio da observacao: 2026-07-20T00:02:04Z.

## Rollback

Restaurar a release `1.18.1` do Worker e dos assets, preservando todos os KVs, segredos, tombstones e logs existentes.
