---
id: GOV-CHARLIE-CNJ-CONEXOES-001-7
versao: 1.7.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: g5-concluido-aguardando-cnj
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.6.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.7.0

## Estado consolidado

G0 a G4 permanecem concluidos. G5 documental e simulado foi concluido sem credenciais e sem chamadas reais: catalogo de 11 capacidades, 15 cenarios ficticios e runbook de credenciais/incidentes. O CNJ continua sem resposta ate 20/07/2026 e a homologacao real permanece bloqueada.

## Sequencia vinculante

| Etapa | Estado | Criterio de pronto |
|---:|---|---|
| 0-4 | `CONCLUIDO` | Proveniencia, pipeline, DataJud e preparacao PDPJ preservados. |
| 5A | `G5_CATALOGO_CONCLUIDO` | Onze capacidades classificadas por dados, efeito, credencial, aprovacao, auditoria e rollback. |
| 5B | `G5_SIMULACAO_CONCLUIDA` | Quinze cenarios ficticios; zero chamadas de rede; falha fechada comprovada documentalmente. |
| 5C | `G5_RUNBOOK_CONCLUIDO` | Recebimento, rotacao, revogacao, indisponibilidade, incidente e mudanca de termos documentados. |
| 6A | `CNJ_AGUARDANDO_RESPOSTA` | Verificar resposta em 22/07/2026 as 10h. |
| 6B | `REITERACAO_CONDICIONAL` | Se ausente, registrar nova tentativa e preparar reiteracao objetiva pelo canal oficial. |
| 7 | `HOMOLOGACAO_REAL_BLOQUEADA` | Exige resposta aplicavel, entidade/CNPJ, responsavel, finalidade, termo, GeCli, credenciais e ambiente oficial. |
| 8 | `OBSERVACAO_CONTINUA` | Releases publicadas observadas por 72 horas. |

## Entregas G5

- `apis/CATALOGO_CAPACIDADES_CNJ_GOVERNADO_v1.0.0.json`
- `apis/fixtures/CENARIOS_HOMOLOGACAO_SIMULADA_CNJ_v1.0.0.json`
- `governanca/RUNBOOK_G5_APIS_CNJ_CREDENCIAIS_INCIDENTES_v1.0.0.md`
- `scripts/audit-g5-governanca-apis-cnj.mjs`

## Proxima acao unica

Aguardar o marco de acompanhamento em 22/07/2026. Se houver resposta do CNJ, comparar item a item com o catalogo e o checklist institucional antes de qualquer mudanca. Se nao houver, preparar reiteracao sem inferir anuencia.

## Bloqueios preservados

- PDPJ: `blocked-institutional-onboarding`.
- Domicilio listar comunicacoes: bloqueado.
- Registrar ciencia: proibido nesta fase.
- Peticionamento: proibido nesta fase.
- MNI: proibido nesta fase.
- DataJud por nome/CPF: bloqueado sem conector autorizado.
- DataJud por numero CNJ: somente leitura, termos vigentes, fonte oficial e revisao humana.
