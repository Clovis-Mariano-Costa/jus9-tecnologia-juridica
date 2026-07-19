---
id: GOV-CHARLIE-CNJ-CONEXOES-001-1
versao: 1.1.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.0.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes v1.1.0

## Atualizacao central

G0 foi concluido em 2026-07-19. O `DAJ-2026-0002` recebeu aceite humano satisfatorio com ressalvas, foi removido pela rota governada, gerou tombstone e nao foi localizado por DAJ, nome, CPF ficticio ou processo ficticio.

Drive e memoria nao sao ativados por esse fechamento. Eles passam apenas a poder entrar em revisao e homologacao controlada.

## Sequencia vinculante atualizada

| Etapa | Janela | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | concluida | `G0_CONCLUIDO` | Aceite, exclusao, tombstone e ausencia confirmados. |
| 1 | agora | `EM_VALIDACAO` | Fixture corrigido e regressao impede contaminacao entre documentos e processo. |
| 2 | 1 dia | `PROXIMA` | Proveniencia `upstream`, `correcao_upstream` e `fallback_governado` explicita, versionada e auditavel. |
| 3 | 1-2 dias | `PENDENTE` | Contratos, risco, citacoes, limites e revisao humana consolidados em um pipeline. |
| 4 | 2-3 dias | `PENDENTE_REVISAO_TERMOS` | DataJud somente por numero CNJ, allowlist, cache, timeout, backoff, logs minimizados e Termo de Uso revisado. |
| 5 | 3-5 dias | `DEPENDENTE_CNPJ_E_CNJ` | Onboarding PDPJ-Br: responsavel institucional, SSO OAuth2, STG, Gateway, Discovery e matriz de autorizacao. |
| 6 | apos G1 | `AUTORIZADO_PARA_PLANEJAR_HOMOLOGACAO` | Drive, memoria e conectores com escopos minimos, dado ficticio, revogacao, idempotencia e auditoria. |
| 7 | 72 horas apos cada publicacao | `PENDENTE` | Observar erros, latencia, cache, rate limit, vazamento e fallback; manter ou reverter. |

## Gates preservados

- G1 Charlie rastreavel antes de ampliar conectores.
- G2 DataJud publico permanece read-only e separado de busca interna por partes.
- G3 PDPJ-Br depende de autorizacao institucional; readiness nao significa acesso ativo.
- G4 qualquer escrita externa exige confirmacao humana especifica.
- Dados reais, atos processuais e credenciais nunca entram em demonstracao publica.

## Proxima acao unica

Executar a regressao do fixture corrigido. Se passar, iniciar G1 pela modelagem e teste do campo de proveniencia da resposta, sem ativar qualquer novo conector.
