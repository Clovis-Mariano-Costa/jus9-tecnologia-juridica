---
id: REL-CHARLIE-ECHO-1-18-1
versao: 1.18.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.18.1 - Onda 1 DED + DIC

## Escopo

Publicar o pacote de prova de valor da Onda 1 dos MVPs gerais, concentrado em DED e DIC.

## Entregas

- Painel executivo ganha `data-onda1-ded-dic-proof` com roteiro de 30 minutos.
- DED ganha `data-ded-proof-runbook` e criterio `CONCLUIR_DEMO_DED`.
- DIC ganha `data-dic-proof-runbook` e criterio `CONCLUIR_DEMO_DIC`.
- Documento governado `PACOTE_ONDA1_DED_DIC_PROVA_VALOR_2026-07-19_v1.0.0.md`.
- Auditor `scripts/audit-onda1-ded-dic-proof-package.mjs` integrado ao CI local.
- Versionamento publico sobe para v5.9 e cache PWA para `jus9-pwa-v43-2026-07-19-onda1-ded-dic`.

## Limites

- Nao conclui Pacote 2 DAJ.
- Nao ativa Drive real, memoria real, reindexacao real ou dados reais.
- Nao substitui o ultimo pacote de revisao geral.
- Video e ZIP permanecem como fechamento obrigatorio do Mao na Massa.

## Rollback

Restaurar a release `1.18.0` e o cache `jus9-pwa-v42-2026-07-19-charlie-proveniencia`, preservando KVs, segredos, tombstones e trilhas de auditoria.
