---
id: VERSIONAMENTO-BUILD-WEEK-SAIBA-MAIS-MAO-NA-MASSA-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: ativo
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-versionamento
---

# Versionamento - Build Week, Saiba Mais e Mao na Massa v3.1.0

## Motivo

Aplicar o briefing `Auditoria_Jus9_Charlie_Echo_Brief_Codex_2026-07-19.docx`, preservando a regra de versionamento obrigatorio e evitando sobrescrever o cronograma v3.0.0.

## Entregas

- `build-week-2026.html` recebeu secao publica de escopo dos MVPs.
- `saiba-mais.html` recebeu link de menu para Build Week e cards para Build Week, painel executivo e mapa de estados.
- `mvp-o-que-ja-funciona.html` foi reorganizada por estados: ativo, demonstrativo, planejado e bloqueado.
- `app-painel-mvps.html` recebeu atalhos para Build Week, Saiba Mais e mapa de estados.
- `sitemap.xml` e `service-worker.js` passaram a incluir as rotas publicas relevantes.
- `documentacao/hackathon/BUILD_WEEK_STATUS_2026.json` subiu para versao `1.1.0` com `mvpConsolidation`.
- Criado `governanca/CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.0.md`.
- Criados auditores `audit-saiba-mais-build-week-links.mjs` e `audit-mao-na-massa-v3-1.mjs`.

## Bloqueios preservados

- Pacote 2 segue `DEPENDENTE_DE_ACAO_HUMANA`.
- Pacote 6 segue `BLOQUEADO_ATE_REVERSIBILIDADE_1C`.
- Video e ZIP seguem pendentes para o ultimo pacote, sempre depois da revisao geral.

## Rollback

Restaurar os arquivos publicos alterados e remover os dois auditores novos. O cronograma v3.1.0 nao substitui fisicamente o v3.0.0; para voltar a direcao anterior, manter apenas o v3.0.0 como cronograma de trabalho vigente.
