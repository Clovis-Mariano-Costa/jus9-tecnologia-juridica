---
id: REL-CHARLIE-ECHO-1-21-11
versao: 1.21.11
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: candidata-em-pr-cloudflare-pendente
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.11 - G6C2 RBAC granular

## Escopo

Implementar o desenho G6C aprovado para memoria, revisao DAJ e Drive com falha fechada, confirmacao por efeito e compatibilidade observavel.

## Entregas

- Permissoes granulares por perfil.
- Rotas de memoria e revisao DAJ migradas para permissoes especificas.
- Confirmacao explicita para exclusao de memoria.
- Token interno do Drive condicionado a intencao, permissao e confirmacao especifica.
- Testes e auditor G6C2.

## Estado operacional

- Configuracao candidata: `governanca-1.21.11-g6c2-rbac-granular-1.0`.
- Cache candidato: `jus9-pwa-v51-2026-07-21-g6c2-rbac-granular`.
- Nenhum deploy manual foi executado.
- Workers Builds falhou instantaneamente nos PRs #2 e #3; a causa permanece externa e nao confirmada sem o log autenticado.
- PDPJ, contato externo e efeitos judiciais continuam bloqueados.

## Rollback

Restaurar `wrangler.jsonc`, service worker, gates das rotas e mapa de permissoes para a release operacional 1.21.8, sem apagar KVs, tombstones ou auditoria.
