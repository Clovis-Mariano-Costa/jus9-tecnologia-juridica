# Versionamento - auditoria de solicitacoes de perfil

Data: 2026-06-09

## Escopo

Exposta rota governada para leitura da trilha de auditoria das solicitacoes de perfil.

## Backend

- Criada rota `GET /api/profile-requests/audit`.
- A rota exige sessao Google autorizada e permissao `audit:write`.
- A rota lista os eventos gravados em `profile-requests:audit`.

## Seguranca

- Auditoria e interna e restrita.
- Nao expõe segredo, token, cookie, cofre ou chave.
- Nao concede permissao nem aprova perfil automaticamente.

## Validacao

- `node tests/validate-worker-auth.mjs`
- Resultado: `WORKER_AUTH_REGRESSION_OK`
