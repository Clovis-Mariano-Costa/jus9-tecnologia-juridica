---
id: GOV-CHARLIE-CNJ-CONEXOES-001-4
versao: 1.4.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.3.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.4.0

## Estado consolidado

G0, G1, G2 e o gate tecnico G3 foram concluidos. O DataJud permanece read-only, por numero CNJ, com 91 aliases oficiais, resposta minimizada, cache, timeout total, backoff, teto global por chave e auditoria sem identificador processual. O Termo v1.2 foi revisado operacionalmente, sem alegacao de parecer juridico ou autorizacao comercial.

## Sequencia vinculante atualizada

| Etapa | Janela | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | concluida | `G0_CONCLUIDO` | Aceite, exclusao, tombstone e ausencia confirmados. |
| 1 | concluida | `FIXTURE_CONCLUIDO` | Regressao impede contaminacao entre documentos e processo. |
| 2 | concluida | `G1_PROVENIENCIA_CONCLUIDO` | Origem, contrato e auditoria declarados e publicados. |
| 3 | concluida | `G2_PIPELINE_CONCLUIDO` | Envelope unico e evento minimizado publicados. |
| 4 | concluida tecnicamente | `G3_DATAJUD_TECNICO_CONCLUIDO` | Allowlist oficial, cache, timeout total, backoff, limite global, logs minimizados e Termo v1.2 confrontados. Uso comercial nao autorizado. |
| 5 | 3-5 dias | `AGORA_PDPJ_ONBOARDING_DOCUMENTAL` | Responsavel institucional, CNPJ, finalidade, SSO OAuth2, STG, Gateway, Discovery e matriz de autorizacao documentados; nenhuma chamada transacional. |
| 6 | depois do desenho PDPJ | `AUTORIZADO_PARA_DESENHAR_HOMOLOGACAO` | Plano de Drive, memoria e conectores com escopos minimos, dado ficticio, revogacao, idempotencia e auditoria; ativacao continua bloqueada. |
| 7 | 72 horas apos cada publicacao | `OBSERVACAO_CONTINUA` | Observar erros, latencia, cache, rate limit, vazamento e fallback; manter ou reverter. |

## Proxima acao unica

Iniciar o onboarding documental da PDPJ-Br sem presumir credenciais ou autorizacao: consolidar pre-requisitos institucionais, ambientes oficiais, matriz de capacidades e condicoes de parada. Peticionamento, ciencia, Domicilio e MNI continuam bloqueados.
