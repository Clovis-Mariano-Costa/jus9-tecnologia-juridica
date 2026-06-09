# Versionamento - acoes de revisao de solicitacoes de perfil

Data: 2026-06-09

## Escopo

Adicionada acao governada sobre solicitacoes de perfil persistidas no KV.

## Backend

- Criada rota `POST /api/profile-requests/action`.
- A rota aceita as acoes: `aprovar`, `reprovar` e `pendente`.
- A rota exige sessao Google autorizada e permissao `audit:write`.
- Cada decisao atualiza o registro individual, o indice de listagem e uma trilha de auditoria.

## Seguranca

- Aprovacao nesta etapa significa apenas revisao humana interna.
- Nao concede cofre, cargo final externo, permissao sensivel ou acesso automatico.
- Nenhum segredo, token, cookie ou chave foi publicado.

## Validacao

- `node tests/validate-worker-auth.mjs`
- Resultado: `WORKER_AUTH_REGRESSION_OK`
