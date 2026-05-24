# Versionamento - Worker OAuth MVP v0.5

Data: 2026-05-24

## Escopo

Publicar as rotas de autenticacao do MVP no `worker.js`, pois o deploy ativo usa Cloudflare Worker Assets.

## Rotas atendidas pelo Worker

- `GET /auth/google/start`
- `GET /auth/google/callback`
- `GET /api/auth/me`
- `POST /auth/logout`

## Criterio esperado

- Sem variaveis reais, `/auth/google/start` responde `501` com aviso seguro.
- Sem sessao, `/api/auth/me` responde `401` em JSON, nao `404`.
- `_redirects` nao deve redirecionar rotas `/auth/google/*`, para que o Worker responda antes do fallback estatico.
- Com variaveis reais, `/auth/google/start` inicia o fluxo Google com PKCE e cookie de transacao.
- Callback valida `state`, PKCE, e-mail verificado e allowlist.
- Sessao usa cookie `HttpOnly`, `Secure` e `SameSite=Lax`.

## Limites

- Nenhum token Google, e-mail real ou segredo deve ir para GitHub.
- Variaveis OAuth reais devem ficar apenas no ambiente seguro da Cloudflare.
