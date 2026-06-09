# VERSIONAMENTO - Auth Context com Perfil Governado

Registrado em: 2026-06-09 07:53:25.27262

## Escopo

Enriquece `GET /api/auth/context` com o perfil governado aprovado correspondente ao e-mail autenticado, quando existir.

## Alteracoes

- `auth/context` consulta a lista interna de perfis governados aprovados.
- Quando ha correspondencia de e-mail, `identity.user.governedProfile` recebe escopo, perfil, modulo, status, protocolo de origem e data de aprovacao.
- A informacao serve para reconhecimento contextual da Charlie Echo e dos ambientes.
- A rota continua exigindo sessao autenticada.

## Limite

Perfil governado aprovado nao concede permissao sensivel, cofre, segredo ou publicacao automatica. Ele apenas melhora reconhecimento e continuidade institucional.

## Teste

- `node --check worker.js`
- `node tests\validate-worker-auth.mjs`

Resultado: `WORKER_AUTH_REGRESSION_OK`.
