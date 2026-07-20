---
id: REL-CHARLIE-ECHO-1-21-5
versao: 1.21.5
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.5 - Onda 5 DMP + DAP + DMG

## Escopo

Publicar o pacote de prova de valor da Onda 5 dos MVPs gerais, concentrado em DMP, DAP e DMG.

## Entregas

- Painel executivo ganha `data-onda5-dmp-dap-dmg-proof` com roteiro de 32 minutos.
- DMP ganha `data-dmp-proof-runbook` e criterio `CONCLUIR_DEMO_DMP`.
- DAP ganha `data-dap-proof-runbook` e criterio `CONCLUIR_DEMO_DAP`.
- DMG ganha `data-dmg-proof-runbook` e criterio `CONCLUIR_DEMO_DMG`.
- Documento governado `PACOTE_ONDA5_DMP_DAP_DMG_PROVA_VALOR_2026-07-20_v1.0.0.md`.
- Auditor `scripts/audit-onda5-dmp-dap-dmg-proof-package.mjs` integrado ao CI local.
- Versionamento publico sobe para v5.14 e cache PWA para `jus9-pwa-v49-2026-07-20-onda5-dmp-dap-dmg`.

## Limites

- Nao conclui Pacote 2 DAJ.
- Nao ativa Drive real, memoria real, reindexacao real ou dados reais.
- Nao cria denuncia real, requisicao real, medida real, investigacao real, diligencia real, ato policial ou decisao judicial.
- Nao amplia o contrato Charlie Core `1.2.0`.
- Nao altera o guard PDPJ-Br `1.21.0`; readiness segue bloqueado por onboarding institucional.
- Nao substitui o ultimo pacote de revisao geral.
- Video e ZIP permanecem como fechamento obrigatorio do Mao na Massa.

## Rollback

Restaurar a release operacional `1.21.4` Onda 4 DOI + DGE e o cache `jus9-pwa-v48-2026-07-20-onda4-doi-dge`, preservando KVs, segredos, tombstones, DataJud, guard PDPJ-Br, pesquisa federada, release documental G5 e trilhas de auditoria.
