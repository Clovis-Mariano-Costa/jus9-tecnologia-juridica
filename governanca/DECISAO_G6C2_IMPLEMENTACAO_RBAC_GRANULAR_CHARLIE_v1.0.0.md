---
id: GOV-CHARLIE-DECISAO-G6C2-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: implementado-em-pr-aguardando-validacao-cloudflare
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Decisao G6C2 - implementacao do RBAC granular da Charlie

## Aceite humano

O aceite expresso para seguir foi recebido em 21/07/2026. O escopo autorizado abrange memoria, feedback DAJ e efeitos Drive, preservando os bloqueios de CNJ/PDPJ, contato externo e efeitos judiciais.

## Implementacao

- Memoria: `memory:read`, `memory:write` e `memory:delete`; exclusao exige `EXCLUIR MINHA MEMORIA` no cabecalho governado.
- DAJ: `dajs:review:read`, `dajs:review:submit` e `dajs:review:write`; estagio submete sem receber poder de decisao.
- Drive: criar, salvar, publicar link, revogar link e excluir recebem permissoes distintas.
- O token interno do Drive somente e encaminhado quando pedido do usuario, permissao e confirmacao do efeito coincidem.

## Compatibilidade

Permissoes legadas permanecem nas listas durante a observacao de 72 horas, mas as rotas migradas verificam as permissoes granulares. A remocao das permissoes legadas exige novo aceite humano apos a observacao.

## Validacao

- `tests/validate-worker-auth.mjs`: autenticacao, RBAC, memoria, DAJ e Drive.
- `tests/validate-daj-homologation.mjs`: fluxo tecnico reversivel e limpeza final.
- `scripts/audit-g6c2-rbac-granular-charlie.mjs`: coerencia documental e operacional.

## Limites

Esta decisao nao autoriza deploy manual, segredo novo, dado real, Drive real fora do fluxo existente, PDPJ, ciencia, peticionamento, MNI ou contato externo. O e-mail do Cloudflare informa falha de build; nao comprova falha funcional nem publicacao.

## Rollback

Restaurar os gates anteriores nas rotas, a release operacional `1.21.8` e o cache PWA v50, preservando KVs, tombstones, auditoria e documentos historicos.

## Proxima acao unica

Validar a suite integral, publicar o commit no PR #3 e obter o log autenticado do Workers Build antes de qualquer promocao.
