---
id: GOV-MVPS-RECONCILIACAO-V4-2026-07-20
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: calcular-na-release-aprovada
---

# Reconciliacao canonica dos estados dos MVPs - V4-01

## Decisao

Este relatorio substitui, para leitura corrente, os estados operacionais superados que ainda apareciam no painel, no mapa publico e no manifesto Build Week. Documentos e cards anteriores permanecem como historico versionado.

| Dominio | Estado corrente | Evidencia determinante |
|---|---|---|
| Pacote 1C / Pacote 2 | `CONCLUIDO_COM_RESSALVA_CORRETIVA` | Aceite humano, exclusao autenticada, tombstone e ausencia posterior confirmados |
| Fixture DAJ | `CORRIGIDO_E_COBERTO_POR_REGRESSAO` | Auditor impede contaminacao do campo Documentos pelo numero processual ficticio |
| Proveniencia Charlie | `IMPLEMENTADA_CONTRATO_1.2.0` | `upstream`, `correcao_upstream` e `fallback_governado` no pipeline compartilhado |
| Charlie Core | `IMPLEMENTADO_CONTRATO_1.2.0` | Registry, politicas, risco, limites, revisao humana e auditoria automatizada |
| Memoria e Drive | `AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA` | G0 concluido; producao, dado real e escopo amplo continuam bloqueados |
| Video e ZIP | `DEFERIDOS_PARA_O_ULTIMO_PACOTE` | Dependem da revisao total, gates humanos, congelamento, scan e hash |

## Limite da liberacao de Memoria e Drive

A liberacao nao representa ativacao produtiva. Qualquer ensaio exige, cumulativamente:

- dado exclusivamente ficticio;
- autorizacao humana identificada;
- menor escopo possivel;
- idempotencia e reversibilidade comprovadas;
- revogacao disponivel;
- auditoria minimizada;
- interrupcao imediata diante de divergencia, segredo ou dado real.

## Separacao de responsabilidade

A Pagina Equipe e sua implementacao pertencem a Mariana e ao Codex dela. Este fluxo dos MVPs conserva apenas o contrato externo de identidade, perfil, permissao, responsavel e revisor necessario a integracao.

## Decisoes humanas ainda abertas

- designar Product Owner e responsavel tecnico de cada MVP;
- autorizar qualquer homologacao externa de Memoria ou Drive;
- aprovar elegibilidade Build Week, conta de avaliacao e direitos de ativos;
- autorizar remocao dos arquivos legados rastreados em `tmp`;
- gravar/aprovar o video e autorizar o congelamento do ZIP somente no ultimo pacote.

