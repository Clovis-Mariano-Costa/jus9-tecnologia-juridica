---
id: GOV-ONDA1-DED-DIC-PROVA-VALOR-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicado-controlado
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: gerar-na-versao-final
base: MAPA_PROVAS_MVPS_GERAIS_v1.0.0.md
---

# Pacote Onda 1 - Prova de valor DED + DIC

## Decisao

`SEGUIR_COM_ONDA1_DED_DIC_PROVA_30_MIN`

Este pacote transforma o mapa de provas dos MVPs gerais em roteiro executavel para as duas vitrines mais rapidas: DED e DIC.

Charlie/DAJ fica fora deste pacote. O pacote nao conclui Pacote 2, nao ativa Drive real, nao ativa memoria real e nao autoriza dado real em demo publica.

## Objetivo

Provar em ate 30 minutos que:

- DED entrega autoria/editoria com artefato revisavel.
- DIC entrega linguagem cidada segura com encaminhamento humano.
- Ambos preservam dados ficticios, bloqueios de efeito real e revisao humana.

## Roteiro de execucao

| Janela | MVP | Acao | Aceite | Parada |
| --- | --- | --- | --- | --- |
| 0-15 min | DED | Abrir `app-demo-autor-editor.html` e `app-ia-autor-editor.html#chat-ia`, usar `DED-MODELO-VITRINE-2026`, pedir briefing editorial, checklist de autoria e plano de revisao. | Artefato revisavel, ficticio, com autoria/titularidade separadas e revisao humana. | Manuscrito real, contrato real, ISBN, venda, promessa editorial, Drive real ou fonte inventada. |
| 15-25 min | DIC | Abrir `app-demo-cidadao.html` e `app-ia-cidadao.html#chat-ia`, usar `DIC-MODELO-VITRINE-2026`, pedir orientacao simples, fonte oficial e encaminhamento humano. | Resposta sem CPF, endereco, telefone, documento, processo real, estrategia individual ou substituicao de humano. | Urgencia real, dado pessoal, caso concreto, atendimento de saude/policia ou decisao humana substituida. |
| 25-30 min | Evidencia | Registrar decisao `CONCLUIR_DEMO_DED`, `CONCLUIR_DEMO_DIC` ou `MANTER_EM_HOMOLOGACAO`. | Evidencia publica e governada suficiente para seguir a proxima onda. | Qualquer efeito externo, dado real, memoria real ou Drive real. |

## Evidencias publicadas

- Painel executivo: `app-painel-mvps.html#onda1-ded-dic`.
- DED: `app-demo-autor-editor.html#prova-ded`.
- DIC: `app-demo-cidadao.html#prova-dic`.
- Auditoria: `scripts/audit-onda1-ded-dic-proof-package.mjs`.

## Condicoes de aceite

- DED nao promete publicacao, ISBN, venda, contrato, registro autoral, Drive ou revisao automatica final.
- DIC nao coleta CPF, endereco, telefone, documento, nome real, processo real ou estrategia juridica individual.
- As duas vitrines usam apenas datasets ficticios.
- Humano permanece como decisor final.
- Video e ZIP permanecem no ultimo pacote de revisao geral.

## Proxima acao recomendada

Depois desta Onda 1, seguir para Onda 2 com DEE, DEJI e DPJ usando o mesmo modelo: roteiro curto, evidencia publica, aceite humano e bloqueios explicitos.
