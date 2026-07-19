---
id: GOV-CHARLIE-CRONOGRAMA-003-1
versao: 3.1.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 3.0.0
preserva_historico: true
base_documental: Auditoria_Jus9_Charlie_Echo_Brief_Codex_2026-07-19.docx
---

# Cronograma Mao na Massa - Charlie Echo v3.1.0

## Decisao central do briefing

O briefing de auditoria de 2026-07-19 recomenda:

- tratar o `DAJ` Advogado/Defensor como piloto operacional unico para validacao real com dados ficticios;
- manter os demais 13 MVPs como vitrines publicas governadas ate o nucleo compartilhado provar valor;
- criar `Charlie Core v0` para politicas, modos, classificacao, contratos, downloads, fontes e auditoria;
- separar estado `ativo`, `demonstrativo`, `planejado` e `bloqueado` em pagina publica;
- manter Drive real, memoria real, cofre, Gmail e qualquer dado sensivel fora do OAuth publico ate fase propria;
- deixar `DataJud` apenas como integracao read-only de metadados publicos por numero CNJ;
- preservar versionamento, changelog, testes, smoke publico e revisao humana em todo pacote.

## Marco atual em 2026-07-19

- `DAJ-2026-0002` confirmado no cadastro oficial em `2026-07-19 13:44:32 BRT`, com indice e detalhe gravados.
- Estado correto do 1C: `ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE`.
- Consulta governada em `app-clientes.html` publicada para DAJ, nome, CPF exato, numero do processo e detalhes seguros.
- Vitrines `DED`, `DIC`, `DEE`, `DEJI` e `DPJ` publicadas com datasets ficticios e limites humanos.
- Build Week recebeu mapa de escopo dos MVPs e links para `saiba-mais.html`, `mvp-o-que-ja-funciona.html` e `app-painel-mvps.html`.
- Pagina `mvp-o-que-ja-funciona.html` passa a separar `ATIVO_PUBLICADO`, `DEMONSTRATIVO_PUBLICADO`, `PLANEJADO` e `BLOQUEADO`.

## Regra-mestra

O ultimo pacote do Mao na Massa e sempre a revisao geral de todos os pacotes.

Nada dependente de acao humana, sessao autenticada, dado real, Drive real, cofre, token, CPF integral, processo real, arquivo real ou evidencia privada pode ser declarado concluido por presuncao.

## Pacotes sugeridos

| Pacote | Nome | Janela sugerida | Estado | Criterio de pronto |
|---:|---|---|---|---|
| 0 | Registro do aceite humano parcial DAJ | 2026-07-19 | `CONCLUIDO` | Relatorio parcial gravado sem concluir reversibilidade. |
| 1 | Consulta DAJ completa | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Busca por DAJ, nome, CPF exato, processo e detalhes seguros publicada e auditada. |
| 2 | Fechamento reversivel 1C | 2026-07-19 a 2026-07-20 | `DEPENDENTE_DE_ACAO_HUMANA` | Analise Charlie, minimizacao, exclusao governada, tombstone e ausencia posterior comprovadas. |
| 3 | DED vitrine editorial | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Briefing ficticio, autoria, titularidade, revisao humana e sem efeitos reais. |
| 4 | DIC vitrine social | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Anti-PII, fontes oficiais, linguagem cidada e encaminhamento humano. |
| 5 | DEE, DEJI e DPJ | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Datasets ficticios, guardrails, auditoria e assinatura/decisao humana. |
| 6 | Memoria e Drive real | Apos Pacote 2 | `BLOQUEADO_ATE_REVERSIBILIDADE_1C` | So iniciar apos tombstone e ausencia posterior do DAJ ficticio. |
| 7 | Painel executivo dos MVPs | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Ranking, riscos, evidencias, pacotes e atalhos publicos publicados. |
| 8 | Build Week + mapa publico de estados | 2026-07-19 | `CONCLUIDO_PUBLICADO` | Build Week, Saiba Mais, sitemap, PWA e pagina de estados alinhados ao briefing. |
| 9 | Charlie Core v0 | 2026-07-20 | `PROXIMO_SEGURO` | Politicas extraidas, registry dos MVPs, classificador de risco e builder de prompt testados. |
| 10 | Contratos JSON e testes por risco | 2026-07-20 a 2026-07-21 | `PROXIMO_SEGURO` | ChatRequest, ChatResponse, DocumentSaveRequest, DataJudSearchRequest e AuditEvent validados. |
| 11 | DataJud read-only e validacao humana | 2026-07-21 | `PARCIAL_COM_REVISAO_HUMANA` | Rotas read-only, DTO, cache, timeout, logs, termos e roteiro de entrevistas registrados. |
| 12 | Revisao geral, video e ZIP final | Ultimo pacote | `PENDENTE_FECHAMENTO_GERAL` | Revisar todos os pacotes, gravar video publico curto, gerar ZIP final escaneado, congelado e hashado. |

## Ordem operacional recomendada

### 2026-07-19 - Consolidar publico e versionamento

- Publicar links Build Week em `saiba-mais.html`.
- Reescrever `mvp-o-que-ja-funciona.html` como mapa de estados.
- Registrar este cronograma v3.1.0, auditor dedicado e changelogs.
- Rodar CI local e smoke publico apos deploy.

### 2026-07-20 - Pacote 9: Charlie Core v0

- Criar `config/charlie` ou `functions/lib/charlie-core`.
- Extrair identidade matriz, politica comum, politica por modo e politica por modulo.
- Criar registry dos 14 MVPs: codigo, nome, risco padrao, papel humano, estado e limites.
- Criar testes que falham se sumirem regras criticas: dados sensiveis, revisao humana, DPJ/DAP, cofre, DataJud, fontes e emergencia social.

### 2026-07-20 a 2026-07-21 - Pacote 10: contratos JSON

- Padronizar `ChatRequest`, `ChatResponse`, `DocumentSaveRequest`, `DataJudSearchRequest` e `AuditEvent`.
- Garantir que frontend, Worker, backend e Drive Saver tenham DTOs estaveis.
- Manter `auditId`, `classification`, `riskLevel`, `citations`, `downloadOptions` e `nextActions` como campos controlados.
- Registrar changelog de contratos e regressao automatizada.

### 2026-07-21 - Pacote 11: DataJud e validacao humana

- Manter DataJud como `read_only`.
- Conferir termos/autorizacao antes de qualquer uso publico/comercial de dado real.
- Preparar roteiro de 10 entrevistas com advogados/escritorios, 5 parceiros tecnicos e 3 investidores/parceiros.
- Registrar feedback sem dados pessoais e sem prometer funcionalidade ainda bloqueada.

### Ultimo pacote - Revisao, video e ZIP

- Revisar todos os pacotes de 0 a 12.
- Confirmar que Pacote 2 e Pacote 6 nao foram concluidos por presuncao.
- Lembrar o video publico curto: ate tres minutos, sem conta, token, CPF, documento real, processo real, Drive real ou dado sensivel.
- Lembrar o ZIP final: remover segredo, `.env`, credenciais, sessoes, dados pessoais, arquivos reais e evidencias privadas; escanear; congelar; gerar hash.

## Pendencias que exigem Clovis

- Executar o Pacote 2 em sessao autorizada para fechar reversibilidade do `DAJ-2026-0002`.
- Confirmar elegibilidade Build Week por escrito se a submissao competitiva continuar ativa.
- Anexar privadamente o Codex Session ID de `/feedback`, sem publicar no GitHub.
- Aprovar declaracao de direitos de ativos e credenciais de avaliador, se houver.
- Autorizar limpeza da extracao legada de ZIP em `tmp` antes do pacote final.

## Decisao de continuidade

`SEGUIR_COM_PACOTES_SEGUROS_E_MANTER_BLOQUEIOS_HUMANOS`.

O caminho mais forte agora e publicar e auditar a consolidacao publica, depois fazer `Charlie Core v0`, contratos JSON e DataJud read-only. Memoria/Drive real continuam bloqueados ate o fechamento reversivel do 1C.
