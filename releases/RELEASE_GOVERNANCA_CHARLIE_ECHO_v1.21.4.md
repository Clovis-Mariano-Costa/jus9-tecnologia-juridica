---
id: REL-CHARLIE-ECHO-1-21-4
versao: 1.21.4
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.4 - Onda 4 DOI + DGE

## Escopo

Publicar o pacote de prova de valor da Onda 4 dos MVPs gerais, concentrado em DOI e DGE.

## Entregas

- Painel executivo ganha `data-onda4-doi-dge-proof` com roteiro de 22 minutos.
- DOI ganha `data-doi-proof-runbook` e criterio `CONCLUIR_DEMO_DOI`.
- DGE ganha `data-dge-proof-runbook` e criterio `CONCLUIR_DEMO_DGE`.
- Documento governado `PACOTE_ONDA4_DOI_DGE_PROVA_VALOR_2026-07-19_v1.0.0.md`.
- Auditor `scripts/audit-onda4-doi-dge-proof-package.mjs` integrado ao CI local.
- Versionamento publico sobe para v5.13 e cache PWA para `jus9-pwa-v48-2026-07-20-onda4-doi-dge`.

## Limites

- Nao conclui Pacote 2 DAJ.
- Nao ativa Drive real, memoria real, reindexacao real ou dados reais.
- Nao cria ato oficial, protocolo real, despacho, permissao real, token, cofre ou segredo operacional.
- Nao amplia o contrato Charlie Core `1.2.0`.
- Nao altera o guard PDPJ-Br `1.21.0`; readiness segue bloqueado por onboarding institucional.
- Nao substitui o ultimo pacote de revisao geral.
- Video e ZIP permanecem como fechamento obrigatorio do Mao na Massa.

## Rollback

Restaurar a release operacional `1.21.2` Pesquisa Jus 9 e o cache `jus9-pwa-v47-2026-07-20-pesquisa-repositorios`, preservando KVs, segredos, tombstones, DataJud, guard PDPJ-Br, pesquisa federada, release documental `1.21.3` G5 e trilhas de auditoria.
