# Versionamento - Login e Cache MVP v0.4

Data: 2026-05-24

## Escopo

Reduzir risco de HTML antigo e 404 no login Google do MVP publicado em Cloudflare Pages.

## Alteracoes

- Ajustado o botao "Entrar com Google" para apontar para `/auth/google/start/index.html`, rota estatica de fallback enquanto as Pages Functions nao estiverem ativas.
- Ajustado `_redirects` para preservar o fallback estatico em `/auth/google/start/index.html`.
- Adicionados cabecalhos `Cache-Control: no-store, max-age=0` para rotas de MVP, login e OAuth.

## Observacao

O OAuth real continua dependente da publicacao das Cloudflare Pages Functions em `functions/`. Sem as variaveis reais no ambiente seguro, a rota de funcao deve responder `501`; com variaveis reais, deve iniciar o fluxo Google.
