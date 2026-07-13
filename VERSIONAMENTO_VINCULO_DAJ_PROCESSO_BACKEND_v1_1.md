# Versionamento - Vinculo DAJ Processo Backend v1.1

ID: VERSIONAMENTO-DAJ-PROCESSO-BACKEND-002
Versao: 1.1.0
Data: 2026-07-13
Autor: Codex + Jus 9 Tecnologia Juridica
Status: homologacao publicada
Classificacao: INTERNO / MVP DAJ / PROCESSOS / BACKEND

## Objetivo

Promover o vinculo DAJ-processo do modo local demonstrativo para API autenticada com KV oficial dedicado, mantendo fallback local somente para uso publico sem sessao.

## Entregas

- Criado KV Cloudflare `JUS9_DAJ_PROCESS_LINKS`.
- Atualizado `wrangler.jsonc` com binding oficial.
- `app-processos.html` consulta `GET /api/daj-process-links/readiness`.
- `app-processos.html` usa `GET /api/daj-process-links` e `POST /api/daj-process-links` com `credentials:'include'`.
- Sem sessao ou falha governada, o MVP conserva `localStorage` como fallback demonstrativo.
- A Charlie Echo recebe no prompt se o vinculo veio da API autenticada oficial ou do fallback local.

## Regras preservadas

- Cada DAJ corresponde a um unico processo.
- Nome e CPF podem reunir varios DAJs.
- CPF integral nao deve ser persistido nem retornado.
- Escrita oficial exige sessao e permissoes `dajs:write` e `processes:read`.

## Proximo passo

Validar fluxo autenticado real com usuario advogado, depois replicar o padrao para os modulos que dependem de processo, procedimento ou dossie equivalente.
