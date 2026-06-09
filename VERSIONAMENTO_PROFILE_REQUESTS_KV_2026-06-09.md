# Versionamento - solicitacoes governadas de perfil em KV

Data: 2026-06-09

## Escopo

Criada a primeira camada persistente para solicitacoes de cadastro/perfil da Equipe, Laboratorio e Universidade do Futuro.

## Backend

- Criado KV `JUS9_PROFILE_REQUESTS`.
- Adicionada rota `POST /api/profile-requests`.
- Adicionada rota `GET /api/profile-requests`.

## Regras

- Envio exige sessao Google autorizada.
- Listagem exige perfil com permissao de auditoria (`audit:write`).
- Registros entram como `INTERNO` e `pendente_revisao_humana`.
- O formulario publico ainda preserva rascunho local como fallback.

## Seguranca

- Nenhum segredo, token, cookie ou chave foi publicado.
- A rota nao recebe imagem binaria; recebe apenas sinal/politica de imagem.
- Uso real permanece sujeito a revisao humana.

## Validacao

- `node tests/validate-worker-auth.mjs`
- Resultado: `WORKER_AUTH_REGRESSION_OK`
