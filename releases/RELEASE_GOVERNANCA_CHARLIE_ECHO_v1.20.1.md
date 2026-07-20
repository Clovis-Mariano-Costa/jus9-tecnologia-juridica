---
id: REL-CHARLIE-ECHO-1-20-1
versao: 1.20.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.20.1 - Onda 2 DEE + DEJI + DPJ

## Escopo

Publicar o pacote de prova de valor da Onda 2 dos MVPs gerais, concentrado em DEE, DEJI e DPJ.

## Entregas

- Painel executivo ganha `data-onda2-dee-deji-dpj-proof` com roteiro de 35 minutos.
- DEE ganha `data-dee-proof-runbook` e criterio `CONCLUIR_DEMO_DEE`.
- DEJI ganha `data-deji-proof-runbook` e criterio `CONCLUIR_DEMO_DEJI`.
- DPJ ganha `data-dpj-proof-runbook` e criterio `CONCLUIR_DEMO_DPJ`.
- Documento governado `PACOTE_ONDA2_DEE_DEJI_DPJ_PROVA_VALOR_2026-07-19_v1.0.0.md`.
- Auditor `scripts/audit-onda2-dee-deji-dpj-proof-package.mjs` integrado ao CI local.
- Versionamento publico sobe para v5.10 e cache PWA para `jus9-pwa-v45-2026-07-19-onda2-dee-deji-dpj`.

## Limites

- Nao conclui Pacote 2 DAJ.
- Nao ativa Drive real, memoria real, reindexacao real ou dados reais.
- Nao amplia o contrato Charlie Core `1.2.0`; apenas publica a prova de MVPs gerais.
- Nao substitui o ultimo pacote de revisao geral.
- Video e ZIP permanecem como fechamento obrigatorio do Mao na Massa.

## Rollback

Restaurar a release `1.20.0` DataJud governado e o cache `jus9-pwa-v44-2026-07-19-charlie-pipeline`, preservando KVs, segredos, tombstones e trilhas de auditoria.
