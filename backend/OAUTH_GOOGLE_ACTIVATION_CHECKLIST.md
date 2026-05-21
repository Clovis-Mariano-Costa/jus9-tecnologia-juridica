# Checklist de ativacao - OAuth Google MVP

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Antes de ativar

- Confirmar que o MVP online ja serve o commit correto.
- Confirmar que `/mvp` mostra `Login MVP v0.3 - Google preparado`.
- Confirmar que `/login/` e `/auth/google/start/` nao retornam 404.
- Confirmar qual ambiente HTTPS hospedara o backend.
- Confirmar que o backend roda Node.js 18 ou superior.

## Google Cloud Console

1. Criar ou selecionar projeto Google Cloud da Jus 9.
2. Configurar OAuth consent screen.
3. Usar escopos minimos:
   - `openid`
   - `email`
   - `profile`
4. Criar credencial OAuth Client para Web application.
5. Adicionar redirect URI autorizado:
   - `https://www.jus9tecnologia.com.br/auth/google/callback`
6. Adicionar origem autorizada:
   - `https://www.jus9tecnologia.com.br`

## Variaveis no ambiente seguro

Configurar fora do GitHub:

```env
PUBLIC_SITE_ORIGIN=https://www.jus9tecnologia.com.br
CORS_ORIGINS=https://www.jus9tecnologia.com.br
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://www.jus9tecnologia.com.br/auth/google/callback
AUTH_COOKIE_SECRET=...
AUTH_ALLOWED_EMAILS=email@dominio.com:perfil
AUTH_SUCCESS_REDIRECT=https://www.jus9tecnologia.com.br/app.html
AUTH_ENFORCE_API=false
```

`AUTH_ALLOWED_EMAILS` deve comecar pequeno. Primeiro liberar apenas contas de teste controladas.

## Teste controlado

1. Abrir `/auth/google/start`.
2. Confirmar redirecionamento para Google.
3. Entrar com conta autorizada.
4. Confirmar retorno para `/app.html`.
5. Chamar `/api/auth/me` e confirmar `authenticated=true`.
6. Chamar `/api/auth/permissions` e confirmar permissao coerente com o perfil.
7. Testar conta nao autorizada e confirmar erro `403`.
8. Confirmar que nenhum token ou e-mail real aparece em HTML publico, console publico ou commit.

## Ativacao gradual de API

Manter:

```env
AUTH_ENFORCE_API=false
```

ate validar login e sessao.

Depois, em janela controlada:

```env
AUTH_ENFORCE_API=true
```

Validar:

- `GET /api/dajs` exige sessao.
- `POST /api/dajs` exige permissao `dajs:write`.
- `GET /api/dajs/:id/documentos` exige `documents:read`.
- `POST /api/processos/consulta` exige `processes:read`.
- `POST /api/auditoria` exige `audit:write`.

## Rollback

Se houver falha:

1. Reverter `AUTH_ENFORCE_API=false`.
2. Remover ou pausar variaveis OAuth se necessario.
3. Manter acesso demo no MVP.
4. Mostrar mensagem operacional: `Login Google em manutencao. Use o acesso demonstrativo do MVP.`
5. Revisar logs sem expor e-mail real ou token.

## Nao fazer

- Nao colocar `GOOGLE_CLIENT_SECRET` no GitHub.
- Nao colocar e-mails reais de allowlist no frontend.
- Nao pedir escopos de Drive, Gmail ou Calendar nesta fase.
- Nao ativar dados reais de processos, clientes ou documentos antes de autorizacao por perfil e auditoria.
