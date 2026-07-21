---
id: REL-CHARLIE-ECHO-1-21-12
versao: 1.21.12
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
runtime_alterado: true
hash: calcular-na-release-aprovada
---

# Release v1.21.12 - Build reproduzivel do portal

## Incidente

O check remoto do PR falhou porque Workers Builds executa um checkout limpo, `dist/` nao e rastreado pelo Git e o sincronizador anterior exigia que a pasta ja existisse localmente.

## Correcao

- criado `scripts/build-portal-dist.mjs` sem dependencia externa;
- o builder remove residuos, recria `dist` e copia 170 fontes publicas curadas;
- o manifesto bloqueia variacao nao versionada e caminhos de segredo, `tmp`, governanca, releases, Markdown ou ZIP;
- `scripts/run-local-ci.mjs` executa o builder como primeira verificacao;
- Wrangler executa o builder em deploy local e dry-run;
- a revisao geral V4-08 foi reexecutada e versionada em `PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP_DEFERIDOS_2026-07-20_v1.1.0.md`;
- `package.json` registra o mesmo builder em `build` e `postinstall`;
- o Workers Builds mantem Build command vazio e executa o builder durante seu `npm clean-install`, conforme uma build verde do proprio Worker.

## Evidencia esperada

- `PORTAL_DIST_BUILD_OK files=170 output=dist`;
- Wrangler: 175 assets, 224,68 KiB, gzip 48,96 KiB;
- CI local completo sem falhas;
- check remoto Workers Builds aprovado depois do push do hook versionado.

## Limites

Nenhuma capacidade juridica, permissao, integracao transacional ou classe de dado foi ampliada. Video e ZIP permanecem deferidos no Pacote V4-08.

## Rollback

Restaurar `governanca-1.21.11-mvps-v4-1.0` e remover o `postinstall` e o bloco custom build do Wrangler. A configuracao remota permanece sem Build command; `dist` continua derivado e nao deve ser publicado como fonte canonica.
