# Versionamento - Menu oficial e auditoria de navegacao v4.1

Data: 2026-06-04
Classificacao: PUBLICO / GOVERNANCA DE INTERFACE

## Objetivo

Consolidar o menu oficial do portal Jus 9 e criar uma auditoria automatica simples para evitar retorno de itens antigos, links divergentes e paginas sem favicon.

## Alteracoes

1. Criado `ORIENTACOES/MENU_OFICIAL_JUS9_v4_0.md`.
2. Criado `scripts/audit-nav-favicons.mjs`.
3. Padronizados links de Equipe para `https://equipe.jus9tecnologia.com.br/`.
4. Padronizado rotulo de link `Investidores` para `Investimentos` quando usado como navegacao.
5. Padronizado rotulo antigo `MVPs / Demos` para `MVP` quando usado como link de navegacao.
6. Preservados conteudos editoriais legitimos sobre investidores e MVPs.

## Validacao

Comando executado:

```bash
node scripts/audit-nav-favicons.mjs
```

Resultado:

`Auditoria OK: 139 HTMLs verificados; menu e favicons sem regressao.`
