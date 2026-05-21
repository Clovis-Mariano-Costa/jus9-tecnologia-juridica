# Checklist de Deploy - Login MVP Jus 9

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Objetivo

Garantir que a pagina online de login sirva a versao correta do MVP, com:

- botao "Entrar com Google";
- demos `demo@` e `demo1` a `demo13`;
- senha demonstrativa `Jus9MVP#2026`;
- rota `/login/` apontando para `/mvp.html#acesso`;
- rota `/auth/google/start/` sem erro 404 enquanto o OAuth real nao estiver publicado.

## Versao esperada

Marcador visivel na tela:

`Login MVP v0.3 - Google preparado`

## Verificacoes online

1. Abrir `https://www.jus9tecnologia.com.br/mvp`.
2. Confirmar se aparece o marcador de versao acima.
3. Confirmar se aparece o botao `Entrar com Google`.
4. Abrir `Ver e-mails demo por MVP` e conferir `demo1` a `demo13`.
5. Abrir `https://www.jus9tecnologia.com.br/login/`.
6. Confirmar redirecionamento para `/mvp.html#acesso`.
7. Abrir `https://www.jus9tecnologia.com.br/auth/google/start/`.
8. Confirmar a pagina `Integracao Google preparada`.

## Se a versao online continuar antiga

1. No Cloudflare Pages, confirmar projeto conectado ao repositorio `Clovis-Mariano-Costa/jus9-tecnologia-juridica`.
2. Confirmar branch de producao `main`.
3. Confirmar commit de producao igual ou posterior a `1461c07`.
4. Rodar `Retry deployment` ou criar novo deploy de producao.
5. Limpar cache de Cloudflare para:
   - `/mvp`
   - `/mvp.html`
   - `/script.js`
   - `/sw.js`
   - `/login/`
   - `/auth/google/start/`

## Proxima etapa

Substituir a pagina placeholder `/auth/google/start/` por backend real com OAuth Google, `state`, PKCE, sessao segura, escopos minimos e auditoria.
