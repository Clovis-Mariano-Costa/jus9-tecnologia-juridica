# Deploy OAuth Google MVP - Cloudflare Pages Functions

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Decisao

Publicar o OAuth real do MVP como Cloudflare Pages Functions no mesmo projeto que serve `www.jus9tecnologia.com.br`.

O backend Express em `backend/server.js` permanece como alternativa para Node separado, mas o caminho preferencial do MVP publico e Pages Functions porque preserva as rotas no mesmo dominio:

- `/auth/google/start`
- `/auth/google/callback`
- `/api/auth/me`
- `/auth/logout`

## Configuracao do projeto Pages

No Cloudflare Pages:

1. Projeto conectado ao repo `Clovis-Mariano-Costa/jus9-tecnologia-juridica`.
2. Production branch: `main`.
3. Build command: vazio, salvo se o painel exigir outro padrao.
4. Output directory: raiz do repositorio.
5. Deploy de producao no commit `33fe199` ou posterior.

## Variaveis seguras

Configurar apenas em `Settings > Environment variables` do Cloudflare Pages, nunca no GitHub:

```env
PUBLIC_SITE_ORIGIN=https://www.jus9tecnologia.com.br
CORS_ORIGINS=https://www.jus9tecnologia.com.br
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://www.jus9tecnologia.com.br/auth/google/callback
AUTH_COOKIE_SECRET=...
AUTH_ALLOWED_EMAILS=email@dominio.com:perfil,outro@dominio.com:perfil
AUTH_SUCCESS_REDIRECT=https://www.jus9tecnologia.com.br/app.html
```

`AUTH_COOKIE_SECRET` deve ser longo, aleatorio e exclusivo do ambiente.

## Cache purge apos deploy

Limpar no Cloudflare:

- `/mvp`
- `/mvp.html`
- `/login/`
- `/auth/google/start`
- `/auth/google/start/`
- `/auth/google/callback`
- `/api/auth/me`
- `/auth/logout`
- `/sw.js`
- `/script.js`

## Validacao

Sem variaveis reais:

- `/auth/google/start` deve responder `501`.
- `/api/auth/me` deve responder `401`.
- `/login/` deve responder `302` para `/mvp.html#acesso`.
- `/mvp` deve exibir `Login MVP v0.3 - Google preparado`, botao Google e perfis `demo1` ate `demo13`.

Com variaveis reais:

- `/auth/google/start` deve responder `302` para `accounts.google.com`.
- `/auth/google/callback` deve validar `state`, PKCE, `email_verified` e allowlist.
- Sessao deve ser criada em cookie `HttpOnly`, `Secure` e `SameSite=Lax`.
- Logs nao devem conter token Google nem e-mail real.
