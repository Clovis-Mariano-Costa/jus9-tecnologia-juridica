# Login Google MVP - especificacao segura

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Objetivo

Preparar o login real com Google OAuth para o MVP da Jus 9 sem publicar dados sensiveis no repositorio.

Este pacote implementa as rotas de backend:

- `GET /auth/google/start`
- `GET /auth/google/callback`
- `GET /api/auth/me`
- `GET /api/auth/permissions`
- `POST /auth/logout`

## Principios de seguranca

- Nenhum `client_secret`, token, e-mail real de allowlist ou chave de sessao deve entrar no GitHub.
- O fluxo usa `state`, `nonce` e PKCE.
- O backend solicita apenas os escopos `openid email profile`.
- O acesso real depende de allowlist por variavel de ambiente.
- A sessao nao grava token Google.
- O cookie de sessao e `HttpOnly`, `SameSite=Lax` e `Secure` em producao.
- O cookie guarda hashes de identificadores, nao e-mail puro.

## Variaveis obrigatorias

Configurar no provedor seguro do backend:

```env
PUBLIC_SITE_ORIGIN=https://www.jus9tecnologia.com.br
CORS_ORIGINS=https://www.jus9tecnologia.com.br
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://www.jus9tecnologia.com.br/auth/google/callback
AUTH_COOKIE_SECRET=...
AUTH_ALLOWED_EMAILS=email@dominio.com:perfil,outro@dominio.com:perfil
AUTH_SUCCESS_REDIRECT=https://www.jus9tecnologia.com.br/app.html
AUTH_ENFORCE_API=false
```

`AUTH_COOKIE_SECRET` deve ser longo, aleatorio e exclusivo do ambiente.

## Retorno modular seguro

`GET /auth/google/start` aceita o parametro opcional `return_to`, sempre relativo ao proprio site:

```text
/auth/google/start?return_to=/app-ia-profissional.html
/auth/google/start?return_to=/app-demo-advogar.html
/auth/google/start?return_to=/app-agenda.html
```

O backend valida o destino antes de gravar a transacao OAuth assinada. Sao recusados:

- URL externa;
- protocolo `http:`, `https:`, `javascript:` ou equivalente;
- caminho iniciado por `//`;
- barra invertida;
- caracteres de controle;
- tentativa de `..`;
- pagina fora dos modulos autorizados.

Se `return_to` estiver ausente ou invalido, o callback usa `AUTH_SUCCESS_REDIRECT` ou `/app.html`.

## Perfis aceitos

- `admin_sistema`
- `advogado_lider`
- `advogado`
- `assessor_chefe`
- `assessor`
- `secretaria`
- `estagio`
- `academia`
- `estudante`
- `cidadao`
- `perito`
- `parceiro`
- `escritorio`
- `empresa`
- `orgao_publico`
- `magistrado`
- `ministerio_publico`
- `autoridade_policial`
- `autor_editor`

## Comportamento esperado

1. Usuario abre `/auth/google/start`.
2. Backend valida configuracao.
3. Backend cria transacao OAuth temporaria em cookie `HttpOnly`.
4. Usuario e redirecionado ao Google.
5. Google retorna para `/auth/google/callback`.
6. Backend valida `state`, troca o codigo por token e busca `userinfo`.
7. Backend exige `email_verified=true`.
8. Backend confere e-mail na allowlist.
9. Backend cria sessao assinada sem guardar token Google.
10. Usuario e redirecionado para o modulo de origem validado ou para o fallback seguro.

## Criterios de aceite local

- Sem variaveis reais, `/auth/google/start` deve responder `501` com aviso de configuracao pendente.
- Com variaveis reais, `/auth/google/start` deve redirecionar para `accounts.google.com`.
- Com `return_to` interno valido, a transacao OAuth deve preservar o modulo de origem.
- Com `return_to` externo ou perigoso, a transacao OAuth deve descartar o destino.
- `/api/auth/me` sem sessao deve retornar `401`.
- `/api/auth/permissions` sem sessao deve retornar `401`.
- `/auth/logout` deve limpar a sessao.

## Bloqueios antes de producao plena

- Rodar o backend em Node.js 18 ou superior.
- Hospedar o backend em ambiente HTTPS.
- Garantir que `/auth/google/start` e `/auth/google/callback` apontem para o backend, nao para a pagina estatica de placeholder.
- Confirmar dominio autorizado no Google Cloud Console.
- Configurar callback exatamente igual a `GOOGLE_CALLBACK_URL`.
- Substituir allowlist temporaria por tabela de usuarios com auditoria.
- Revisar logs para garantir que e-mails e tokens nao sejam impressos.
- Integrar autorizacao por perfil aos endpoints sensiveis.

## Protecao de API

`AUTH_ENFORCE_API=false` mantem os endpoints demonstrativos acessiveis para o MVP estatico.

Quando o backend estiver em HTTPS e o login Google estiver validado, ativar:

```env
AUTH_ENFORCE_API=true
```

Com essa chave, endpoints de DAJ, documentos, processos e auditoria passam a exigir sessao e permissao de perfil.
