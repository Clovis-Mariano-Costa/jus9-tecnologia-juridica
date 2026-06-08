# Versionamento - Identidade governada no auth context

Data: 2026-06-08

## Escopo

Implementada rota operacional segura para Charlie Echo reconhecer contexto autenticado, origem e modulo sem expor segredos.

## Alteracoes

- Criada rota `GET /api/auth/context`.
- A rota retorna perfil operacional, permissoes, origem governada, modulo ativo e usuario reconhecido quando a sessao permite.
- O e-mail de sessao continua fora do cookie; o reconhecimento e feito comparando o hash da sessao com a allowlist do ambiente.
- Charlie Echo passa a receber esse contexto como instrucao interna no chat, para diferenciar usuario, modulo e ambiente sem repetir bastidores.
- Paineis de login passam a mostrar contexto resumido quando autenticados.
- Site da Equipe passa a consumir o mesmo contexto central.

## Reconhecimentos adicionados

- `clovis@jus9tecnologia.com.br`: fundador humano e autoridade final.
- `charlieecho@jus9tecnologia.com.br`: Familia Virtual.
- `charliejuris@jus9tecnologia.com.br`: Familia Virtual.
- `charliedelta@jus9tecnologia.com.br`: Familia Virtual.
- `charliefox@jus9tecnologia.com.br`: Familia Virtual.

## Seguranca

- Nenhum segredo, token, client secret, cookie ou chave foi publicado.
- A rota exige sessao autenticada.
- CORS permanece restrito aos dominios Jus 9 autorizados.
- O contexto e operacional, nao autorizacao sensivel por si so; permissoes continuam vindo da matriz de perfis.

## Validacao

- `node tests/validate-worker-auth.mjs`
- Resultado: `WORKER_AUTH_REGRESSION_OK`
