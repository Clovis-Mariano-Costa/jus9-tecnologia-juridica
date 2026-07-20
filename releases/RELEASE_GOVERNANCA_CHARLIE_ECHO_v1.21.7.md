---
id: REL-CHARLIE-ECHO-1-21-7
versao: 1.21.7
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.7 - diagnostico G6 da governanca Charlie

## Escopo

Confrontar controles documentados com o runtime atual da Charlie e organizar a proxima fase de governanca, sem ampliar CNJ, memoria, Drive, ferramentas ou efeitos externos.

## Entregas

- Diagnostico G6 de governanca operacional.
- Matriz de reconciliacao com 11 dominios de controle.
- Priorizacao P0, P1 e P2.
- Sequencia G6A a G6F e proxima acao unica G6B.
- Auditor G6 integrado ao CI local.

## Estado operacional

- Esta release e documental e nao altera runtime, Worker, cache, credenciais ou integracoes.
- Release operacional configurada permanece `governanca-1.21.5-onda5-dmp-dap-dmg-1.0`.
- PDPJ continua em `readiness_only` e DataJud continua somente leitura.
- O papel `advogado_lider` permanece decisor humano, sem permissao universal implicita.

## Principal achado

O pipeline ativo possui controles que documentos fundadores ainda classificam como planejados. G6B criara um registro canonico v2 baseado em evidencias, preservando as versoes historicas.

## Rollback

Retirar os artefatos G6 do CI e manter o cronograma v1.8.0 e a release documental 1.21.6, sem tocar no runtime.
