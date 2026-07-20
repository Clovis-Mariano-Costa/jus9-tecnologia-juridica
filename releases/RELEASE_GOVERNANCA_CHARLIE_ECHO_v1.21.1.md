---
id: REL-CHARLIE-ECHO-1-21-1
versao: 1.21.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.1 - Onda 3 DIP + DAA + DEJ

## Escopo

Publicar o pacote de prova de valor da Onda 3 dos MVPs gerais, concentrado em DIP, DAA e DEJ.

## Entregas

- Painel executivo ganha `data-onda3-dip-daa-dej-proof` com roteiro de 33 minutos.
- DIP ganha `data-dip-proof-runbook` e criterio `CONCLUIR_DEMO_DIP`.
- DAA ganha `data-daa-proof-runbook` e criterio `CONCLUIR_DEMO_DAA`.
- DEJ ganha `data-dej-proof-runbook` e criterio `CONCLUIR_DEMO_DEJ`.
- Documento governado `PACOTE_ONDA3_DIP_DAA_DEJ_PROVA_VALOR_2026-07-19_v1.0.0.md`.
- Auditor `scripts/audit-onda3-dip-daa-dej-proof-package.mjs` integrado ao CI local.
- Versionamento publico sobe para v5.11 e cache PWA para `jus9-pwa-v46-2026-07-19-onda3-dip-daa-dej`.

## Limites

- Nao conclui Pacote 2 DAJ.
- Nao ativa Drive real, memoria real, reindexacao real ou dados reais.
- Nao amplia o contrato Charlie Core `1.2.0`.
- Nao altera o guard PDPJ-Br `1.21.0`; readiness segue bloqueado por onboarding institucional.
- Nao substitui o ultimo pacote de revisao geral.
- Video e ZIP permanecem como fechamento obrigatorio do Mao na Massa.

## Rollback

Restaurar a release `1.21.0` PDPJ onboarding guard e o cache `jus9-pwa-v45-2026-07-19-onda2-dee-deji-dpj`, preservando KVs, segredos, tombstones, DataJud, guard PDPJ-Br e trilhas de auditoria.
