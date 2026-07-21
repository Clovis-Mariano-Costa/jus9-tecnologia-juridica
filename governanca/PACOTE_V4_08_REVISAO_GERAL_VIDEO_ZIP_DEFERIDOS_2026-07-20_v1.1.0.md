---
id: GOV-JUS9-MVPS-V4-PACOTE-08-002
versao: 1.1.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: revisao-tecnica-reexecutada-check-remoto-pendente
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: calcular-na-release-aprovada
---

# Pacote V4-08 v1.1 - Revisao geral apos correcao do build

## Regra de fechamento

O ultimo pacote do Mao na Massa e sempre a revisao de todos os pacotes. A falha do check remoto reabriu a revisao V4-08, sem invalidar o historico v1.0.0. Esta versao reexecuta o fechamento tecnico com um build reproduzivel; Video e ZIP permanecem deferidos.

## Revisao pacote a pacote

| Pacote | Resultado | Evidencia principal | Pendencia preservada |
|---|---|---|---|
| V4-01 | `CONCLUIDO` | Estados 1C, Core, Memoria e Drive reconciliados | Nenhuma ativacao produtiva |
| V4-02 | `CONCLUIDO_TECNICAMENTE` | Portfolio V2 com 14 MVPs | Designar Product Owner e responsavel tecnico |
| V4-03 | `CONCLUIDO_TECNICAMENTE` | Core 1.2.0, cinco DTOs e dez testes | Revisao continua por risco |
| V4-04 | `CONCLUIDO_COM_GATES_HUMANOS` | Matriz de dez requisitos transversais | IAM, LGPD, seguranca, WCAG e operacao |
| V4-05 | `REVALIDACAO_TECNICA_14_DE_14` | DAJ e cinco ondas aprovados | Aceite humano de utilidade das ondas |
| V4-06 | `CONCLUIDO_TECNICAMENTE` | 31 repositorios classificados | Ownership de infraestrutura e backlog humano |
| V4-07 | `PRONTO_LOCALMENTE_CHECK_REMOTO_PENDENTE` | Build limpo, CI, dry-run e mecanismo remoto confirmados | Publicar o hook versionado e obter check remoto verde |
| V4-08 | `REVISAO_GERAL_REEXECUTADA` | Este documento e auditor final v1.1.0 | Video e ZIP no congelamento humano final |

## Motivo da reabertura

O Workers Builds recebeu um checkout limpo sem `dist/`, que e derivado e ignorado pelo Git. O sincronizador anterior exigia a pasta preexistente. A correcao cria `scripts/build-portal-dist.mjs`, recria o artefato a partir de fontes curadas e torna o resultado independente do estado local.

## Evidencia da revisao

- builder: `PORTAL_DIST_BUILD_OK files=170 output=dist`;
- contrato: `PORTAL_REPRODUCIBLE_BUILD_OK sources=170 wrangler_assets=175 portal=5.17 release=1.21.12`;
- instalacao remota simulada: `npm clean-install` executou o `postinstall`, recriou 170 arquivos e auditou 35 pacotes sem vulnerabilidades;
- CI local completo por `npm test`: `LOCAL_CI_OK` em 139,5 segundos;
- Build Week: 122 verificacoes aprovadas, modo nao estrito;
- Core: 10 testes aprovados, 0 falhas;
- portfolio: 14 MVPs, sendo 1 piloto, 10 demos governadas e 3 demos restritas;
- repositorios: 31 itens, 6 grupos, nenhuma acao destrutiva;
- Wrangler: `4.112.0`;
- dry-run: 175 arquivos, 224,68 KiB, gzip 48,96 KiB;
- release candidata: `governanca-1.21.12-build-reproduzivel-1.0`;
- configuracao remota confirmada: Build command vazio, `npm clean-install` e deploy `npx wrangler versions upload`;
- check remoto: pendente do push do `postinstall` versionado.

## Sete bloqueios Build Week preservados

1. elegibilidade por escrito;
2. conta de avaliacao de menor privilegio ou sandbox isolado;
3. declaracao de direitos de ativos;
4. remocao autorizada dos 26 arquivos legados rastreados em `tmp`;
5. revisao/autorizacao dos termos DataJud para o uso demonstrado;
6. ZIP final congelado, escaneado e hashado;
7. video publico de ate tres minutos.

## Video e ZIP

Estado: `VIDEO_DEFERIDO / ZIP_DEFERIDO`.

A ordem obrigatoria permanece:

1. resolver os gates humanos aplicaveis;
2. congelar o artefato publicado e revisar todas as URLs;
3. gravar e aprovar o Video;
4. montar o ZIP final;
5. escanear segredos e abrir o ZIP de prova;
6. gerar SHA-256 e registrar a release final.

Nenhum Video ou ZIP deve ser declarado concluido antes dessa sequencia.

## Decisao da revisao

`APROVADO_TECNICAMENTE_PARA_COMMIT_E_CHECK_REMOTO_SEM_VIDEO_ZIP_FINAL`.

A publicacao governada permanece condicionada ao check remoto verde. Qualquer nova correcao reabre este pacote e exige outra revisao.
