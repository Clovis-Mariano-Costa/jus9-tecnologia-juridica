# Versionamento - login Google com retorno modular

Classificacao: INTERNO / OPERACIONAL / LOGIN / SEM SEGREDOS
Data: 2026-06-08 03:48:43.38523
Autor operacional: Charlie Juris da Costa / Codex
Autoridade humana: Clovis Mariano da Costa

## Escopo

Pacote tecnico para permitir que o login Google retorne ao modulo de origem da pessoa usuaria, sem abrir risco de redirecionamento externo.

## Alteracoes

1. `functions/_shared/oauth.js`
   - criada validacao `normalizeAuthReturnTo`;
   - criado fallback `getAuthSuccessRedirect`;
   - bloqueados protocolos externos, `//`, barra invertida, caracteres de controle, `..` e rotas fora dos modulos Jus 9.

2. `worker.js`
   - `/auth/google/start` passa a aceitar `return_to`;
   - `return_to` validado entra na transacao OAuth assinada;
   - `/auth/google/callback` redireciona para o modulo validado ou fallback seguro.

3. `functions/auth/google/start.js` e `functions/auth/google/callback.js`
   - mantidos coerentes com o Worker principal.

4. `backend/server.js`
   - backend local alinhado ao mesmo contrato de retorno modular.

5. `script.js`
   - links de login passam a enviar origem modular;
   - botao do MVP retorna ao painel de acesso;
   - paineis com `data-auth-login-link` retornam para a pagina atual.

6. `tests/validate-worker-auth.mjs`
   - adicionados testes de retorno modular valido;
   - adicionados testes de bloqueio de retorno externo;
   - adicionada regressao de allowlist.

## Criterios de aceite

1. Login vindo de `app-ia-profissional.html` pode retornar para `app-ia-profissional.html`.
2. Login vindo de modulo demo pode retornar para o modulo demo.
3. URL externa nao e preservada.
4. Fallback permanece seguro em `AUTH_SUCCESS_REDIRECT` ou `/app.html`.
5. Nenhum segredo foi adicionado ao repositorio.

## Testes executados

```text
node --check worker.js
node --check functions\_shared\oauth.js
node --check functions\auth\google\start.js
node --check functions\auth\google\callback.js
node --check script.js
node --check backend\server.js
node tests\validate-worker-auth.mjs
```

Resultado: aprovado.

## Proximo passo

Recompilar `dist`, publicar Worker e testar online:

1. abrir `https://jus9tecnologia.com.br/app-ia-profissional.html`;
2. clicar em `Entrar com Google`;
3. concluir login com conta autorizada;
4. confirmar retorno para `app-ia-profissional.html`;
5. validar `/api/auth/me` e `/api/auth/permissions`.

