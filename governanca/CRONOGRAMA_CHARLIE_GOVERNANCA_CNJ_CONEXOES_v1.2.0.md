---
id: GOV-CHARLIE-CNJ-CONEXOES-001-2
versao: 1.2.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.1.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.2.0

## Estado consolidado

G0 e o G1 de proveniencia foram concluidos tecnicamente em 2026-07-19. A Charlie agora distingue resposta upstream, correcao upstream, fallback governado do Worker e fallback local demonstrativo, com contrato e auditoria visiveis.

Drive, memoria e novos conectores continuam bloqueados para ativacao. DataJud permanece somente leitura e PDPJ-Br permanece dependente de autorizacao institucional.

## Sequencia vinculante atualizada

| Etapa | Janela | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | concluida | `G0_CONCLUIDO` | Aceite, exclusao, tombstone e ausencia confirmados. |
| 1 | concluida | `FIXTURE_CONCLUIDO` | Regressao impede contaminacao entre documentos e processo. |
| 2 | concluida tecnicamente | `G1_PROVENIENCIA_CONCLUIDO` | Origem, contrato e auditoria declarados e testados; falta apenas observacao da publicacao. |
| 3 | 1-2 dias | `AGORA` | Contratos, risco, citacoes, limites e revisao humana consolidados em um pipeline unico, com evento persistente minimizado. |
| 4 | 2-3 dias | `PENDENTE_REVISAO_TERMOS` | DataJud somente por numero CNJ, allowlist, cache, timeout, backoff, logs minimizados e Termo de Uso revisado. |
| 5 | 3-5 dias | `DEPENDENTE_CNPJ_E_CNJ` | Onboarding PDPJ-Br: responsavel institucional, SSO OAuth2, STG, Gateway, Discovery e matriz de autorizacao. |
| 6 | apos G1 | `AUTORIZADO_PARA_PLANEJAR_HOMOLOGACAO` | Drive, memoria e conectores com escopos minimos, dado ficticio, revogacao, idempotencia e auditoria. |
| 7 | 72 horas apos cada publicacao | `PENDENTE` | Observar erros, latencia, cache, rate limit, vazamento e fallback; manter ou reverter. |

## Proxima acao unica

Executar G2 interno: fazer o pipeline da resposta aplicar e registrar, de forma unica, contrato, classificacao, risco, citacoes, limites, revisao humana e proveniencia antes de ampliar DataJud ou qualquer conexao de escrita.
