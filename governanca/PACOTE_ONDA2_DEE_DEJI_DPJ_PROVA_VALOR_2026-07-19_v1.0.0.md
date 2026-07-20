---
id: GOV-ONDA2-DEE-DEJI-DPJ-PROVA-VALOR-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicado-controlado
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: gerar-na-versao-final
base: MAPA_PROVAS_MVPS_GERAIS_v1.0.0.md
---

# Pacote Onda 2 - Prova de valor DEE + DEJI + DPJ

## Decisao

`SEGUIR_COM_ONDA2_DEE_DEJI_DPJ_PROVA_35_MIN`

Este pacote transforma a camada B2B e tecnica dos MVPs gerais em roteiro executavel para DEE, DEJI e DPJ.

Charlie/DAJ fica fora deste pacote. O pacote nao conclui Pacote 2, nao ativa Drive real, nao ativa memoria real e nao autoriza dado real em demo publica.

## Objetivo

Provar em ate 35 minutos que:

- DEE entrega rotina de escritorio com papeis, tarefas, sigilo e responsavel humano.
- DEJI entrega juridico interno com matriz de risco, compliance, LGPD e aprovacao humana.
- DPJ entrega laudo tecnico demonstrativo verificavel, com metodo antes de conclusao.
- Todos preservam dados ficticios, bloqueios de efeito real e revisao humana.

## Roteiro de execucao

| Janela | MVP | Acao | Aceite | Parada |
| --- | --- | --- | --- | --- |
| 0-12 min | DEE | Abrir `app-demo-escritorio.html` e `app-ia-escritorio.html#chat-ia`, usar `DEE-MODELO-VITRINE-2026`, pedir triagem, responsavel, prazo interno, documento e revisao humana. | Fluxo revisavel com permissao por caso, sigilo, dono humano e limite contra assinatura/protocolo/estrategia final automatica. | Cliente real, processo real, honorario real, segredo profissional ou ato externo. |
| 12-24 min | DEJI | Abrir `app-demo-empresa.html` e `app-ia-empresa.html#chat-ia`, usar `DEJI-MODELO-VITRINE-2026`, pedir matriz de risco, compliance, LGPD, aprovacao e alternativas. | Recomendacao revisavel separada de decisao corporativa, com juridico, compliance, financeiro e diretoria humanos. | Contrato real, fornecedor real, dado financeiro, segredo empresarial ou aprovacao automatica. |
| 24-32 min | DPJ | Abrir `app-demo-perito.html` e `app-ia-perito.html#chat-ia`, usar `DPJ-MODELO-VITRINE-2026`, pedir objeto, quesitos, metodo, lacunas, cadeia tecnica e limites. | Metodo antes de conclusao, lacunas visiveis e declaracao de que fato tecnico exige evidencia e perito humano. | Evidencia real, processo real, documento sigiloso, conclusao pericial real ou laudo final automatico. |
| 32-35 min | Evidencia | Registrar decisao `CONCLUIR_DEMO_DEE`, `CONCLUIR_DEMO_DEJI`, `CONCLUIR_DEMO_DPJ` ou `MANTER_EM_HOMOLOGACAO`. | Evidencia publica e governada suficiente para seguir a proxima onda. | Qualquer efeito externo, dado real, memoria real ou Drive real. |

## Evidencias publicadas

- Painel executivo: `app-painel-mvps.html#onda2-dee-deji-dpj`.
- DEE: `app-demo-escritorio.html#prova-dee`.
- DEJI: `app-demo-empresa.html#prova-deji`.
- DPJ: `app-demo-perito.html#prova-dpj`.
- Auditoria: `scripts/audit-onda2-dee-deji-dpj-proof-package.mjs`.

## Condicoes de aceite

- DEE nao assina, nao protocola, nao decide estrategia final e nao usa cliente real.
- DEJI nao aprova fornecedor, nao assina contrato, nao decide pela empresa e nao usa segredo empresarial.
- DPJ nao conclui fato tecnico sem evidencia, nao assina laudo e nao substitui perito habilitado.
- As tres vitrines usam apenas datasets ficticios.
- Humano permanece como decisor final.
- Video e ZIP permanecem no ultimo pacote de revisao geral.

## Proxima acao recomendada

Depois desta Onda 2, seguir para Onda 3 com DIP, DAA e DEJ usando o mesmo modelo: roteiro curto, evidencia publica, aceite humano e bloqueios explicitos.
