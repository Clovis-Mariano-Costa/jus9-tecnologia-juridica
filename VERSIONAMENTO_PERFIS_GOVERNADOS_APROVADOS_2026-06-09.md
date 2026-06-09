# VERSIONAMENTO - Perfis Governados Aprovados

Registrado em: 2026-06-09 07:24:10.03692

## Escopo

Cria a camada interna de perfis governados aprovados a partir da revisao humana das solicitacoes de perfil.

## Alteracoes

- Adicionada rota `GET /api/governed-profiles`.
- A rota exige sessao Google autorizada e permissao `audit:write`.
- Aprovacao de solicitacao passa a materializar o perfil em `governed-profiles:index`.
- Reprovacao ou retorno para pendente remove o perfil da lista aprovada.
- Perfil aprovado registra escopo, modulo, nome, e-mail normalizado, perfil, origem, politica de imagem e trilha minima de aprovacao.

## Regra de Seguranca

Perfil aprovado e identidade governada interna. Ele nao concede cofre, nao concede cargo externo, nao libera permissao sensivel automaticamente e nao substitui revisao humana.

## Teste

- `node --check worker.js`
- `node tests\validate-worker-auth.mjs`

Resultado: `WORKER_AUTH_REGRESSION_OK`.
