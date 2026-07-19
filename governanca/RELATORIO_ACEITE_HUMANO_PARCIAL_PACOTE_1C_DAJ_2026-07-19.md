---
id: GOV-DAJ-ACEITE-HUMANO-PARCIAL-1C-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: aceite-humano-parcial-confirmado
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: nao-aplicavel-aceite-parcial
referencia_daj: DAJ-2026-0002
---

# Relatorio de aceite humano parcial - Pacote 1C - DAJ

## Resultado

Estado do Pacote 1C em 2026-07-19: `ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE`.

Evidencia humana informada pelo responsavel:

- `DAJ-2026-0002` confirmado no cadastro oficial em `2026-07-19 13:44:32 BRT`.
- Indice e detalhe foram gravados.
- A consulta governada de DAJs em `app-clientes.html` foi criada, publicada e validada em seguida.

## O que esta confirmado

- Existe registro oficial de DAJ no cadastro governado.
- O indice operacional recebeu o DAJ.
- O detalhe do DAJ foi gravado.
- A pagina publica de DAJs agora permite consulta governada por DAJ, nome, CPF exato, numero de processo e detalhes seguros.
- As APIs anonimas continuam falhando fechadas com `401`.

## O que ainda nao deve ser presumido

Nao ha evidencia registrada neste documento de:

- envio do `DAJ-2026-0002` para analise da Charlie;
- confirmacao de que o prompt da Charlie minimizou CPF, contato e dado sensivel nesse DAJ especifico;
- vinculo processual ficticio concluido para esse DAJ especifico;
- remocao governada do DAJ ficticio;
- tombstone confirmado;
- ausencia posterior em pesquisas por DAJ, nome e CPF.

Por isso, o Pacote 1C ainda nao deve ser marcado como `CONCLUIDO`.

## Evidencias tecnicas relacionadas

- Commit de consulta governada: `a142825 feat: consulta governada de dajs por chaves`.
- Deploy publico: `cde1bf89-3d93-4429-a485-be46945bec04`.
- Smoke publico: `LIVE_DAJ_SEARCH_SMOKE_OK page,js,apis-fail-closed`.
- Regressao publica: `PUBLIC_MVPS_REGRESSION_OK`.
- Regressao de autenticacao: `WORKER_AUTH_REGRESSION_OK`.

## Decisao de continuidade

- Pacotes que dependem de efeito real em memoria, Drive, reindexacao real, replicacao com persistencia ou dados sensiveis continuam aguardando fechamento reversivel do 1C.
- Pacotes de interface, consulta, documentacao, kits demonstrativos, auditoria estatica e smoke publico podem continuar.
- O proximo passo humano do Pacote 1C e executar a analise Charlie e a remocao/tombstone do DAJ ficticio, se o registro for realmente destinado a homologacao reversivel.
