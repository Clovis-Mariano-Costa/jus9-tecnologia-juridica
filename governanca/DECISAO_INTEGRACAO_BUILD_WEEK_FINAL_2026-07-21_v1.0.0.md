---
id: GOV-DECISAO-BUILD-WEEK-FINAL-2026-07-21
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: executado-em-branch
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Decisao de integracao da entrega final Build Week

## Contexto

As branches `codex-cronograma-mvps-v4` e `agent/g6c-autoridade-ferramentas` estavam tecnicamente verdes, mas mantinham construtores e contratos de CI concorrentes.

## Decisao

1. Adotar `scripts/build-portal-dist.mjs` como unico builder canonico.
2. Preservar o manifesto curado de 170 fontes publicas e o contrato Wrangler de 175 assets.
3. Incorporar ao mesmo resultado as permissoes, matrizes, auditores e testes G6C/G6C2 da Charlie.
4. Excluir o builder concorrente `scripts/build-cloudflare-dist.mjs` da linha integrada.
5. Manter credenciais e artefatos privados fora do Git e do artefato publico.

## Gates

- CI local completo e Wrangler dry-run devem passar.
- Workers Builds remoto deve ficar verde antes da promocao.
- O ZIP privado deve passar por scan, extracao, conferencia de manifesto, limite de 35 MB e SHA-256.
- O roteiro do video deve permanecer fora do ZIP.
- Elegibilidade, direitos de ativos, video e submissao continuam sob decisao humana.
