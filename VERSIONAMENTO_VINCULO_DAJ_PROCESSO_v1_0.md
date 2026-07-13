# Versionamento - Vinculo DAJ Processo v1.0

ID: VERSIONAMENTO-DAJ-PROCESSO-001
Versao: 1.0.0
Data: 2026-07-13
Autor: Codex + Jus 9 Tecnologia Juridica
Status: homologacao demonstrativa
Classificacao: INTERNO / MVP DAJ / PROCESSOS

## Objetivo

Transformar a selecao "Vincular ao DAJ" da pagina `app-processos.html` em regra operacional demonstrativa, com persistencia local, painel de vinculo e pesquisa por DAJ.

## Regras implementadas

- Cada DAJ pode ficar vinculado a um unico processo.
- A pesquisa por numero CNJ pode vincular DAJ existente ou criar novo DAJ local.
- A pesquisa por DAJ mostra o processo ja vinculado.
- Nome e CPF podem reunir varios DAJs.
- CPF continua mascarado na resposta e no indice visual.
- Conflito de DAJ ou processo ja vinculado bloqueia duplicidade e registra auditoria local.

## Limites

Esta versao usa `localStorage` apenas para validacao do fluxo no MVP publico. Em producao, o indice DAJ-processo deve ser movido para backend autenticado, com permissao por perfil, auditoria por usuario, LGPD, trilha de alteracao e revisao humana para correcoes sensiveis.

## Arquivos

- `app-processos.html`
- `worker.js`
- `tests/validate-public-mvps.mjs`
- `tests/validate-charlie-response-contracts.mjs`
- `tests/validate-worker-auth.mjs`

## API preparada

- `GET /api/daj-process-links/readiness`
- `GET /api/daj-process-links`
- `POST /api/daj-process-links`

A API exige sessao. Leitura exige `dajs:read` ou `processes:read`. Escrita exige `dajs:write` e `processes:read`. O armazenamento definitivo deve usar KV proprio `JUS9_DAJ_PROCESS_LINKS`; sem esse binding, o Worker responde `501` e nao finge gravacao remota.

## Proximo passo

Provisionar `JUS9_DAJ_PROCESS_LINKS`, ligar `app-processos.html` primeiro ao backend autenticado e manter o indice local apenas como fallback demonstrativo.
