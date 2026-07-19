---
id: REL-GOV-CHARLIE-ECHO-001-016-000
versao: 1.16.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: release-candidata
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-no-fechamento
---

# Release candidata v1.16.0 - Build Week, Saiba Mais e estados dos MVPs

## Escopo

- Link de Build Week no menu da pagina `saiba-mais.html`.
- Links de retorno de `build-week-2026.html` para `saiba-mais.html`, `mvp-o-que-ja-funciona.html` e `app-painel-mvps.html`.
- Mapa publico de estados dos MVPs em `mvp-o-que-ja-funciona.html`.
- Atualizacao de sitemap, service worker, manifesto Build Week e versionamento publico.
- Cronograma Mao na Massa v3.1.0 com pacotes sugeridos e ultimo pacote reservado para revisao/video/ZIP.

## Validacao esperada

- `node scripts/audit-build-week-readiness.mjs`
- `node scripts/audit-saiba-mais-build-week-links.mjs`
- `node scripts/audit-mao-na-massa-v3-1.mjs`
- `node scripts/run-local-ci.mjs`
- Smoke publico apos deploy nas quatro rotas: Build Week, Saiba Mais, Painel MVPs e O que ja funciona.

## Bloqueios preservados

- Pacote 2: `DEPENDENTE_DE_ACAO_HUMANA`.
- Pacote 6: `BLOQUEADO_ATE_REVERSIBILIDADE_1C`.
- Build Week: elegibilidade, Session ID privado, juiz/sandbox, direitos de ativos, ZIP final e video seguem pendentes.

## Rollback

Reverter o commit desta release e republicar a versao anterior do Worker/Assets. Nenhuma migracao de dados e necessaria.
