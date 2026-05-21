# Versionamento - OAuth Google em Cloudflare Pages Functions v0.1

Data: 2026-05-21

## Decisao de publicacao

O caminho recomendado para o MVP e publicar o login Google real como Cloudflare Pages Functions no mesmo projeto de `www.jus9tecnologia.com.br`.

Motivos:

- mantem `/auth/google/start` e `/auth/google/callback` no mesmo dominio publico;
- evita CORS entre frontend e backend;
- permite cookies `HttpOnly` no dominio principal;
- usa variaveis seguras do Cloudflare Pages, sem segredos no GitHub;
- preserva a pagina estatica do MVP no mesmo deploy.

## Rotas adicionadas

- `GET /auth/google/start`
- `GET /auth/google/callback`
- `GET /api/auth/me`
- `POST /auth/logout`

## Criterios de aceite

- Sem variaveis reais, `/auth/google/start` responde `501` com aviso seguro.
- Com variaveis reais, `/auth/google/start` redireciona para `accounts.google.com`.
- Callback valida `state`, PKCE, `email_verified` e allowlist.
- Sessao usa cookie `HttpOnly`, `Secure` e `SameSite=Lax`.
- O cookie de sessao guarda hashes, nao e-mail puro.
- Nenhum token Google ou e-mail real deve ser publicado no GitHub, frontend ou console publico.

## Variaveis de ambiente no Cloudflare Pages

Configurar somente no painel/ambiente seguro:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `AUTH_COOKIE_SECRET`
- `AUTH_ALLOWED_EMAILS`
- `AUTH_SUCCESS_REDIRECT`
- `PUBLIC_SITE_ORIGIN`
- `CORS_ORIGINS`

## Observacao

O backend Express em `backend/server.js` continua util para ambiente Node separado, mas a integracao preferencial do MVP publico passa a ser Cloudflare Pages Functions para manter o login no mesmo dominio.
