# Runbook - rotacao de segredos Google OAuth

Classificacao: INTERNO TECNICO / SEM VALORES SECRETOS

## Quando usar

Usar antes de ampliar acesso do OAuth Google para producao, especialmente se houve arquivo local com credencial, print, copia antiga ou duvida de exposicao.

## Nao registrar

Nao registrar aqui:

- client secret real;
- token;
- refresh token;
- backup code;
- cookie secret;
- e-mail real de allowlist;
- ID privado que nao precise ser publico.

## Passos

1. Abrir Google Cloud Console com conta proprietaria/editor autorizada.
2. Selecionar projeto de producao.
3. Criar novo OAuth Client ou rotacionar secret do client existente.
4. Confirmar redirect URI autorizado:
   - `https://www.jus9tecnologia.com.br/auth/google/callback`
   - `https://jus9tecnologia.com.br/auth/google/callback`
5. Confirmar JavaScript origins autorizadas:
   - `https://www.jus9tecnologia.com.br`
   - `https://jus9tecnologia.com.br`
6. Atualizar `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` somente no ambiente seguro da Cloudflare.
7. Atualizar `GOOGLE_CALLBACK_URL` se necessario.
8. Rotacionar `AUTH_COOKIE_SECRET` se houver risco de exposicao.
9. Invalidar sessoes antigas, se necessario.
10. Testar login com conta autorizada.
11. Testar conta nao autorizada.
12. Testar logout.
13. Registrar apenas data, responsavel e resultado.

## Rollback

1. Reverter variaveis para ultimo conjunto valido no ambiente seguro.
2. Pausar OAuth se necessario removendo variaveis obrigatorias.
3. Confirmar que `/auth/google/start` volta ao aviso seguro de configuracao pendente.
4. Manter acesso demonstrativo do MVP.

## Evidencia segura

Registrar:

- data;
- quem executou;
- qual ambiente;
- se login passou;
- se conta nao autorizada foi bloqueada;
- se logout passou;
- se Agenda foi testada.

Nao registrar valores.

