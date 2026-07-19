---
id: GOV-CHARLIE-CRONOGRAMA-003-1-1
versao: 3.1.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 3.1.0
preserva_historico: true
incidente_relacionado: RELATORIO_INCIDENTE_ANALISE_DAJ_RESPOSTA_EVASIVA_2026-07-19.md
---

# Cronograma Mao na Massa - Charlie Echo v3.1.1

## Atualizacao central

O cronograma v3.1.1 incorpora o incidente de qualidade da analise DAJ comunicado em 2026-07-19.

A resposta da Charlie Echo ao `DAJ-2026-0002` foi considerada evasiva porque devolveu orientacao de indice/endpoint em vez de laudo. A continuidade correta e:

`CORRIGIR_ANALISE_DAJ_ANTES_DE_REVERSIBILIDADE`.

## Marco atual em 2026-07-19

- `DAJ-2026-0002` segue com `ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE`.
- A rota DAJ foi corrigida para exigir `Laudo de Analise DAJ` antes de registrar feedback.
- O Pacote 2 passa para `AGUARDANDO_NOVO_TESTE_HUMANO`.
- Pacote 6 continua `BLOQUEADO_ATE_REVERSIBILIDADE_1C`.
- O ultimo pacote do Mao na Massa continua sendo revisao geral, video e ZIP final.

## Pacotes atualizados

| Pacote | Nome | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | Registro do aceite humano parcial DAJ | `CONCLUIDO` | Relatorio parcial gravado sem concluir reversibilidade. |
| 1 | Consulta DAJ completa | `CONCLUIDO_PUBLICADO` | Busca por DAJ, nome, CPF exato, processo e detalhes seguros publicada e auditada. |
| 2A | Incidente de qualidade da analise DAJ | `REGISTRADO` | Resposta evasiva documentada e criterio de laudo definido. |
| 2B | Contrato obrigatorio de laudo DAJ | `CORRECAO_TECNICA_PUBLICAVEL` | Rota recusa resposta sem laudo e impede registro prematuro em `/api/dajs/review`. |
| 2C | Novo teste humano do DAJ-2026-0002 | `AGUARDANDO_NOVO_TESTE_HUMANO` | Humano confirma laudo com 10 secoes ou reprova novamente. |
| 2D | Reversibilidade 1C | `BLOQUEADO_ATE_LAUDO_SATISFATORIO` | Somente apos laudo aprovado: minimizacao, exclusao, tombstone e ausencia posterior. |
| 3 | DED vitrine editorial | `CONCLUIDO_PUBLICADO` | Briefing ficticio, autoria, titularidade, revisao humana e sem efeitos reais. |
| 4 | DIC vitrine social | `CONCLUIDO_PUBLICADO` | Anti-PII, fontes oficiais, linguagem cidada e encaminhamento humano. |
| 5 | DEE, DEJI e DPJ | `CONCLUIDO_PUBLICADO` | Datasets ficticios, guardrails, auditoria e assinatura/decisao humana. |
| 6 | Memoria e Drive real | `BLOQUEADO_ATE_REVERSIBILIDADE_1C` | So iniciar apos tombstone e ausencia posterior do DAJ ficticio. |
| 7 | Painel executivo dos MVPs | `CONCLUIDO_PUBLICADO` | Ranking, riscos, evidencias, pacotes e atalhos publicos publicados. |
| 8 | Build Week + mapa publico de estados | `CONCLUIDO_PUBLICADO` | Build Week, Saiba Mais, sitemap, PWA e pagina de estados alinhados ao briefing. |
| 9 | Charlie Core v0 | `PROXIMO_SEGURO` | Politicas extraidas, registry dos MVPs, classificador de risco e builder de prompt testados. |
| 10 | Contratos JSON e testes por risco | `PROXIMO_SEGURO` | ChatRequest, ChatResponse, DocumentSaveRequest, DataJudSearchRequest e AuditEvent validados. |
| 11 | DataJud read-only e validacao humana | `PARCIAL_COM_REVISAO_HUMANA` | Rotas read-only, DTO, cache, timeout, logs, termos e roteiro de entrevistas registrados. |
| 12 | Revisao geral, video e ZIP final | `PENDENTE_FECHAMENTO_GERAL` | Revisar todos os pacotes, gravar video publico curto, gerar ZIP final escaneado, congelado e hashado. |

## Proxima acao humana

Refazer o envio do `DAJ-2026-0002` para Charlie Echo em sessao autenticada.

Aceite minimo do novo teste:

- resposta inicia ou contem `Laudo de Analise DAJ`;
- contem as 10 secoes obrigatorias;
- nao se limita a endpoint, indice, DataJud ou consulta DAJ-processo;
- registra limites e lacunas sem inventar fato, processo, parte, CPF, prazo ou documento;
- devolve conclusao operacional revisavel para humano.

## Ordem operacional apos o novo teste

1. Se o laudo for satisfatorio, seguir para reversibilidade 1C.
2. Se o laudo for evasivo novamente, manter Pacote 2 aberto e abrir novo incidente.
3. So depois do 1C concluido avaliar Pacote 6, memoria e Drive real.
4. Continuar com Pacote 9 e Pacote 10 apenas nas partes que nao dependem de dado real.
5. Fechar video e ZIP apenas no ultimo pacote.

## Decisao de continuidade

`SEGUIR_COM_CORRECAO_DAJ_E_MANTER_BLOQUEIOS_HUMANOS`.

Nada neste cronograma autoriza dado real, Drive real, cofre, memoria real, segredo, CPF integral, processo real, arquivo real ou evidencia privada no fluxo publico.
