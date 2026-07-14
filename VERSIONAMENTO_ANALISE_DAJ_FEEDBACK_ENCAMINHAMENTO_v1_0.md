---
id: JUS9-DAJ-ANALISE-FEEDBACK-ENCAMINHAMENTO-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-cd23543
---

# Analise DAJ com feedback e encaminhamento

## Objetivo

Fazer a analise da Charlie Echo produzir um resultado operacional do DAJ, com retorno obrigatorio ao autor e encaminhamento ao perfil competente quando houver necessidade de supervisao.

## Fluxo

1. O portal rele o DAJ persistido no backend autenticado.
2. Uma sala nova e isolada e criada para cada analise.
3. A API recebe a rota fixa `daj_analise_governada`, sem memoria de sala anterior e sem fallback local.
4. Respostas de consulta por nome, CPF ou identificador sao descartadas como desvio de rota.
5. A analise valida e registrada no historico do DAJ.
6. O backend decide entre devolver ou reencaminhar segundo autoria, risco, urgencia e sigilo.
7. O autor sempre recebe feedback com resumo, providencia, situacao, motivo e identificador do registro.
8. O perfil destinatario recebe o DAJ na caixa de encaminhamentos.

## Matriz inicial de encaminhamento

- Estagio: assessor; em DAJ sigiloso ou sigilo estrito, advogado.
- Assessor: advogado.
- Assessor chefe: advogado lider.
- Secretaria: assessor.
- Escritorio: advogado.
- Risco ou urgencia elevados: advogado lider.
- Advogado, advogado lider ou administrador: devolucao ao perfil de autoria, salvo escalonamento por risco.

## Seguranca

- A decisao de permissao e encaminhamento e deterministica no backend, nao no modelo generativo.
- A caixa por perfil armazena resumo e metadados; o resultado completo permanece no detalhe governado do DAJ.
- Auditoria registra agente, DAJ, sala, destino, acao, situacao e nivel de risco, sem duplicar conteudo bruto sensivel.
- Falha da API ou do registro gera feedback explicito de nao conclusao; nenhum encaminhamento e presumido.
- Esta implantacao nao reanalisa nem altera automaticamente DAJs existentes.

## Evidencias

- Commit do portal: `cd23543`.
- Commit da API Charlie Echo: `9557903`.
- Worker: `0d910b47-c8f0-442d-80f1-196d5aa5bc09`.
- Release: `governanca-1.12.0-daj-isolated-review-1.0`.
- CI local completa aprovada.
- Ensaio publico confirmou operacao `analise_daj_governada` e ausencia de desvio para consulta estruturada.

## Aceite humano

Com uma sessao de equipe autenticada, enviar um DAJ ficticio para analise, conferir a nova sala e verificar o recibo de feedback. Para validar supervisao, repetir com um DAJ ficticio criado por perfil de estagio e conferir a caixa do assessor ou advogado correspondente.
