# Versionamento - auth central para subdominios Jus 9

Classificacao: INTERNO / LOGIN / SEM SEGREDOS
Data: 2026-06-08 04:37:15.35001
Autor operacional: Charlie Juris da Costa / Codex
Autoridade humana: Clovis Mariano da Costa

## Escopo

Ampliado o login Google central de `jus9tecnologia.com.br` para aceitar retorno governado aos subdominios:

1. `https://equipe.jus9tecnologia.com.br/`;
2. `https://laboratorio.jus9tecnologia.com.br/`;
3. `https://universidadedofuturo.jus9tecnologia.com.br/`.

## Regras

1. O retorno absoluto so e aceito se a origem estiver na allowlist interna.
2. Subdominio nao autorizado e recusado.
3. Dominio externo e recusado.
4. `skill.md` da Universidade do Futuro foi liberado como destino seguro.
5. CORS de sessao/permissoes foi limitado aos dominios autorizados.

## Testes

```text
node --check worker.js
node --check functions\_shared\oauth.js
node --check backend\server.js
node tests\validate-worker-auth.mjs
```

Resultado: `WORKER_AUTH_REGRESSION_OK`.

## Limite

Este pacote nao cria novas credenciais OAuth Google, nem publica segredo. O fluxo usa o broker central ja configurado.
