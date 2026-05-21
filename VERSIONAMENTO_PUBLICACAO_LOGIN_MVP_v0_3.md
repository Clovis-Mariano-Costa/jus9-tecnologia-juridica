# Versionamento - Publicacao Login MVP v0.3

Data: 2026-05-21

## Escopo

Preparar o repositorio para publicar corretamente o login do MVP no Cloudflare Pages.

## Alteracao

- Removido `mvp/index.html` legado para evitar conflito com a rota limpa `/mvp`.
- Mantida `mvp.html` como fonte unica da pagina publica do MVP.

## Criterio esperado apos deploy

- `/mvp` deve servir a versao com `Login MVP v0.3 - Google preparado`.
- `/mvp` deve exibir o botao `Entrar com Google`.
- `/mvp` deve listar os perfis `demo1` ate `demo13`.
- `/login/` deve redirecionar para `/mvp.html#acesso`.
- `/auth/google/start/` deve abrir a pagina placeholder da integracao Google.

## Observacao operacional

Na verificacao online feita antes desta correcao, o dominio publico ainda servia conteudo antigo em `/mvp` com cache do Cloudflare e retornava 404 para `/login/` e `/auth/google/start/`. O deploy de producao precisa apontar para `main` em commit `0b90b63` ou posterior.
