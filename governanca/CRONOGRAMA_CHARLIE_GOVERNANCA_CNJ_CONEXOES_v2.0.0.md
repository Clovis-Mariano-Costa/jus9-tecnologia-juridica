---
id: GOV-CHARLIE-CNJ-CONEXOES-002-0
versao: 2.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: execucao-controlada-g6c3-aguardando-cnj
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.9.0.md
preserva_historico: true
---

# Cronograma executivo - Charlie, governanca, CNJ e conexoes v2.0.0

## Estado consolidado

G6C2 esta integrado ao `main`, a suite completa e o Workers Build passaram, e o portal 5.18 esta publicado. O pacote G6C3 acrescenta uma API publica de estado governado, sem ampliar permissoes ou conexoes. O CNJ ainda nao respondeu ao e-mail institucional; silencio nao autoriza integracao, homologacao, reiteracao automatica ou efeito transacional.

## Janela final da Build Week - 21/07/2026

| Ordem | Janela | Acao | Porta de saida |
|---|---|---|---|
| 1 | T+00 a T+35 min | Implementar API G6C3 somente leitura e contrato OpenAPI. | GET 200, escrita 405, sem segredo e default deny. |
| 2 | T+35 a T+75 min | Cobrir rota, CORS, bloqueios CNJ/PDPJ e correlacao por requisicao. | Testes e auditor G6C3 verdes. |
| 3 | T+75 a T+120 min | Executar CI integral, build reproduzivel e `wrangler deploy --dry-run`. | Nenhuma regressao e artefato curado. |
| 4 | T+120 a T+155 min | Versionar governanca 1.21.15, portal 5.19, changelogs e pagina Build Week. | Evidencia publica coerente e credenciais ausentes. |
| 5 | T+155 a T+180 min | Publicar PR, integrar, observar Workers Build e validar producao. | Build verde e endpoint/publicacao acessiveis. |

## Depois do evento

| Quando | Acao | Condicao |
|---|---|---|
| 22/07 as 10h | Conferir o canal usado no e-mail ao CNJ. | Registrar `CNJ_RESPONDEU` ou `CNJ_SEM_RESPOSTA`. |
| Apos conferencia | Preparar matriz de aderencia ou minuta de reiteracao nao enviada. | Qualquer envio exige aprovacao humana. |
| Por 72 horas apos a promocao de G6C2 | Observar G6C2, preservando permissoes legadas. | Sem regressao de acesso e sem escalada indevida. |
| Apos 72 horas | Decisao humana sobre fallbacks legados. | Remocao somente em nova release reversivel. |

## Bloqueios vinculantes

- Nenhuma credencial, token, log sensivel ou dado real no repositorio ou na API publica.
- PDPJ permanece `READINESS_ONLY`; ciencia, peticionamento e MNI permanecem proibidos.
- DataJud continua somente leitura por numero CNJ; nome e CPF externos dependem de conector autorizado.
- Reiteracao ao CNJ depende de aprovacao humana e nao sera enviada automaticamente.
- A API G6C3 descreve estado e limites; ela nao concede permissao nem executa efeito.

## Proxima acao unica

Concluir validacao, versionamento e publicacao do G6C3; depois observar o build remoto e manter o lembrete do CNJ para 22/07 as 10h.
