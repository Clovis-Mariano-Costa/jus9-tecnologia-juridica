---
id: GOV-CHARLIE-CNJ-CONEXOES-001-5
versao: 1.5.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: aguardando-porta-humana-institucional
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.4.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.5.0

## Estado consolidado

G0, G1, G2 e G3 foram concluidos. A preparacao documental G4 da PDPJ-Br tambem foi concluida, mas o onboarding institucional permanece externo e pendente: CNPJ, responsavel, finalidade, aceite e aprovacao GeCli nao foram comprovados.

## Sequencia vinculante atualizada

| Etapa | Estado | Criterio de pronto |
|---:|---|---|
| 0 | `G0_CONCLUIDO` | Reversibilidade e ausencia confirmadas. |
| 1 | `FIXTURE_CONCLUIDO` | Regressao de contaminacao ativa. |
| 2 | `G1_PROVENIENCIA_CONCLUIDO` | Origem e auditoria publicadas. |
| 3 | `G2_PIPELINE_CONCLUIDO` | Envelope governado publicado. |
| 4 | `G3_DATAJUD_TECNICO_CONCLUIDO` | DataJud governado e Termo v1.2 revisado. |
| 5A | `G4_PREPARACAO_DOCUMENTAL_CONCLUIDA` | Contrato, matriz, SSO oficial, GeCli, Gateway/Discovery e bloqueios documentados. |
| 5B | `AGORA_DEPENDENTE_ACAO_HUMANA_E_CNJ` | Confirmar entidade/CNPJ, responsavel e finalidade; submeter GeCli; obter aprovacao para homologacao. |
| 6 | `DESENHO_DE_HOMOLOGACAO_POSTERGADO` | Somente depois da decisao humana sobre PDPJ; ativacao de Drive/memoria continua fora deste pacote. |
| 7 | `OBSERVACAO_CONTINUA` | Monitorar releases publicadas por 72 horas. |

## Proxima acao unica

Obter do Fundador a definicao institucional minima para a solicitacao PDPJ-Br: entidade/CNPJ, responsavel e API/finalidade. Ate essa confirmacao, manter o readiness em `blocked-institutional-onboarding` e todas as capacidades negociais desabilitadas.
