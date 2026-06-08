# Checklist de Deploy - Login MVP Jus 9

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Objetivo

Garantir que a pagina online de login sirva a versao correta do MVP, com:

- botao "Entrar com Google";
- demos `demo@` e `demo1` a `demo13`;
- senha demonstrativa `Jus9MVP#2026`;
- rota `/login/` apontando para `/mvp.html#acesso`;
- rota `/auth/google/start` servida por backend real ou, sem variaveis, respondendo `501` seguro.

## Versao esperada

Marcador visivel na tela:

`Login MVP v0.4 - Google preparado sem Cloud ativo`

## Verificacoes online

1. Abrir `https://jus9tecnologia.com.br/mvp#demos-jus9`.
2. Confirmar se aparece o marcador de versao acima.
3. Confirmar se aparece o botao `Entrar com Google`.
4. Abrir `Ver e-mails demo por MVP` e conferir `demo1` a `demo13`.
5. Abrir `https://www.jus9tecnologia.com.br/login/`.
6. Confirmar redirecionamento HTTP para `/mvp.html#acesso`.
7. Abrir `https://www.jus9tecnologia.com.br/auth/google/start`.
8. Confirmar que a rota nao retorna 404: sem variaveis reais deve responder `501`; com variaveis reais deve redirecionar para Google.

## Se a versao online continuar antiga

1. No Cloudflare Pages, confirmar projeto conectado ao repositorio `Clovis-Mariano-Costa/jus9-tecnologia-juridica`.
2. Confirmar branch de producao `main`.
3. Confirmar commit de producao igual ou posterior a `1461c07`.
4. Rodar `Retry deployment` ou criar novo deploy de producao.
5. Confirmar que nao existe pagina legada concorrente em `mvp/index.html`.
6. Limpar cache de Cloudflare para:
   - `/mvp`
   - `/mvp.html`
   - `/script.js`
   - `/sw.js`
   - `/login/`
   - `/auth/google/start/`
   - `/auth/google/start`
   - `/auth/google/callback`
   - `/api/auth/me`

## Proxima etapa

Manter o OAuth Google preparado no Worker, sem Google Cloud ativo, ate existir decisao financeira e operacional para credenciais reais.
