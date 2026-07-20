---
id: GOV-CHARLIE-CNJ-CONEXOES-001-3
versao: 1.3.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.2.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.3.0

## Estado consolidado

G0, G1 e G2 foram concluidos tecnicamente. O G2 unifica contrato, proveniencia, classificacao, risco, citacoes, limites, revisao humana e bloqueio de efeitos autonomos, com auditoria operacional minimizada.

## Sequencia vinculante atualizada

| Etapa | Janela | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | concluida | `G0_CONCLUIDO` | Aceite, exclusao, tombstone e ausencia confirmados. |
| 1 | concluida | `FIXTURE_CONCLUIDO` | Regressao impede contaminacao entre documentos e processo. |
| 2 | concluida | `G1_PROVENIENCIA_CONCLUIDO` | Origem, contrato e auditoria declarados e publicados. |
| 3 | concluida tecnicamente | `G2_PIPELINE_CONCLUIDO` | Envelope unico e evento minimizado testados; falta observacao da publicacao. |
| 4 | 2-3 dias | `AGORA_REVISAO_TERMOS` | DataJud somente por numero CNJ, allowlist, cache, timeout, backoff, logs minimizados e Termo de Uso revisado. |
| 5 | 3-5 dias | `DEPENDENTE_CNPJ_E_CNJ` | Onboarding PDPJ-Br: responsavel institucional, SSO OAuth2, STG, Gateway, Discovery e matriz de autorizacao. |
| 6 | apos G2 | `AUTORIZADO_PARA_DESENHAR_HOMOLOGACAO` | Plano de Drive, memoria e conectores com escopos minimos, dado ficticio, revogacao, idempotencia e auditoria; ativacao continua bloqueada. |
| 7 | 72 horas apos cada publicacao | `PENDENTE` | Observar erros, latencia, cache, rate limit, vazamento e fallback; manter ou reverter. |

## Proxima acao unica

Executar a revisao governada do DataJud: confrontar implementacao atual, documentacao oficial e Termos de Uso do CNJ; fechar lacunas de allowlist, timeout, backoff, cache e logs antes de qualquer ampliacao funcional.
