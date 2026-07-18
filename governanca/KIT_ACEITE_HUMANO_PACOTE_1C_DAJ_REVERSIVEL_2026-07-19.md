---
id: GOV-DAJ-KIT-ACEITE-1C-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: pronto-para-aceite-humano
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: nao-aplicavel-kit-operacional
data_execucao_alvo: 2026-07-19
estado_tecnico_previo: HOMOLOGACAO_TECNICA_APROVADA / ACEITE_HUMANO_PENDENTE
---

# Kit de aceite humano - Pacote 1C - DAJ reversivel

## Objetivo

Executar, com sessao autorizada e somente dados ficticios, a prova humana do Pacote 1C: criar um DAJ pelo atendimento, retomar o registro, pesquisar por DAJ/nome/CPF, vincular processo ficticio, enviar para analise da Charlie e remover o teste pela rota governada.

Este kit nao autoriza uso de dado real, arquivo real, processo real, CPF real, cliente real, segredo, token, senha, link de Drive inventado ou aceite sem login.

## Estado de partida

- Estado atual: `HOMOLOGACAO_TECNICA_APROVADA / ACEITE_HUMANO_PENDENTE`.
- Relatorio tecnico base: `governanca/RELATORIO_PRE_ACEITE_PACOTE_1C_DAJ_REVERSIVEL_2026-07-18.md`.
- Ambiente publico: `https://jus9tecnologia.com.br`.
- Porta humana: aberta somente para perfil com permissao `dajs:write` e auditoria de limpeza.

## Pre-requisitos

- Acessar com perfil autorizado do DAJ em janela normal de navegador.
- Usar somente os dados ficticios deste documento.
- Capturar evidencia visual de cada passo sem expor e-mail pessoal, token, cookie, CPF integral em area publica ou dado real.
- Registrar o `dajId` gerado no quadro de evidencias.
- Parar imediatamente se a sessao autorizada indisponivel, se aparecer dado real, ou se qualquer mutacao funcionar sem sessao.

## Dataset ficticio unico

Use exatamente estes dados no aceite:

| Campo | Valor |
| --- | --- |
| Nome da parte | `Parte Alfa Ficticia Pacote 1C` |
| CPF ficticio | `123.456.789-09` |
| Contato ficticio | `parte.alfa.pacote1c@example.invalid` |
| Area | `Familia` |
| Urgencia | `Importante` |
| Motivo de atencao | `documento faltante` |
| Nivel de sigilo | `Restrito` |
| Resumo | `Atendimento inteiramente ficticio para aceite humano do Pacote 1C.` |
| Documentos | `Documento ficticio A; Documento ficticio B` |
| Processo ficticio | `6666666-66.2099.8.24.0000` |

## Roteiro operacional

1. Abrir `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.
2. Confirmar que a pagina reconhece a sessao autorizada para cadastro DAJ.
3. Preencher o atendimento com o dataset ficticio unico.
4. Salvar o DAJ e registrar o `dajId` gerado.
5. Reabrir `https://jus9tecnologia.com.br/app-atendimento-inicial.html?dajId=<dajId>` e confirmar retomada do mesmo registro.
6. Abrir `https://jus9tecnologia.com.br/app-clientes.html?dajId=<dajId>` e localizar o item pelo identificador.
7. Pesquisar pelo nome `Parte Alfa Ficticia Pacote 1C` e confirmar que encontra apenas o registro ficticio.
8. Pesquisar pelo CPF `123.456.789-09` e confirmar que o CPF integral nao aparece em resposta publica, card, prompt ou auditoria visivel.
9. Abrir `https://jus9tecnologia.com.br/app-processos.html?dajId=<dajId>` e vincular o processo ficticio `6666666-66.2099.8.24.0000`.
10. Confirmar que o mesmo DAJ nao aceita segundo processo ficticio sem revisao governada.
11. Abrir `https://jus9tecnologia.com.br/app-ia-profissional.html?dajId=<dajId>`.
12. Enviar o DAJ para analise da Charlie e confirmar que o prompt usa fonte governada, sem rascunho local.
13. Confirmar que CPF integral, contato e dado sensivel nao entram no prompt de analise.
14. Voltar ao atendimento e remover o DAJ ficticio pela rota governada, usando a confirmacao `EXCLUIR TESTE <dajId>`.
15. Repetir as pesquisas por DAJ, nome e CPF e confirmar ausencia operacional do registro removido.
16. Registrar tombstone ou mensagem equivalente de remocao governada.

## Evidencias esperadas

| Passo | URL | Resultado esperado | Evidencia | Decisao | Observacoes |
| --- | --- | --- | --- | --- | --- |
| 1 | `/app-atendimento-inicial.html` | Pagina abre e sessao autorizada e reconhecida | pendente | pendente | Sem print de token/cookie |
| 2 | `/app-atendimento-inicial.html` | Botao de salvar fica disponivel para perfil autorizado | pendente | pendente | Se nao houver login, parar |
| 3 | `/app-atendimento-inicial.html` | Campos aceitam somente dataset ficticio | pendente | pendente | Sem anexar arquivo real |
| 4 | `/api/dajs` | Retorna `dajId` e comprovante de persistencia | pendente | pendente | Anotar `dajId` |
| 5 | `/app-atendimento-inicial.html?dajId=<dajId>` | Registro retomado apos recarregar | pendente | pendente | Fonte oficial, nao localStorage |
| 6 | `/app-clientes.html?dajId=<dajId>` | Registro localizado por DAJ | pendente | pendente | Sem dado real na lista |
| 7 | `/api/judicial/parties/search` | Nome ficticio encontra o DAJ correto | pendente | pendente | Resultado deterministico |
| 8 | `/api/judicial/parties/search` | CPF ficticio encontra sem expor CPF integral | pendente | pendente | Conferir mascara/minimizacao |
| 9 | `/app-processos.html?dajId=<dajId>` | Processo ficticio vinculado ao DAJ | pendente | pendente | Um DAJ, um processo |
| 10 | `/api/daj-process-links` | Segundo processo e bloqueado sem revisao | pendente | pendente | Esperado erro governado |
| 11 | `/app-ia-profissional.html?dajId=<dajId>` | Charlie abre com DAJ governado | pendente | pendente | Sem rascunho local |
| 12 | `/api/dajs/review` | Analise registrada e auditavel | pendente | pendente | Sem CPF/contato no prompt |
| 13 | `/api/dajs/review` | Prompt minimiza identidade sensivel | pendente | pendente | Conferir resposta visivel |
| 14 | `/api/dajs?dajId=<dajId>` | Remocao aceita com `EXCLUIR TESTE <dajId>` | pendente | pendente | Apenas DAJ ficticio |
| 15 | `/api/judicial/parties/search` | DAJ removido nao aparece em pesquisas | pendente | pendente | Buscar por DAJ, nome e CPF |
| 16 | `/api/dajs` | Tombstone ou mensagem equivalente existe | pendente | pendente | Sem preservar CPF/processo |

## Condicoes de parada

Parar e registrar `MANTER_EM_HOMOLOGACAO` se ocorrer qualquer item:

- Sessao autorizada indisponivel ou perfil sem `dajs:write`.
- Login, Drive, memoria oficial ou backend real nao puderem ser confirmados.
- Qualquer dado real aparecer no fluxo.
- CPF integral aparecer em area publica, card, prompt, auditoria visivel ou resposta persistida.
- Mutacao funcionar sem sessao.
- Sistema inventar link de Drive, processo, fonte, arquivo, identificador ou resultado.
- Erro de backend impedir confirmar criacao, retomada, pesquisa, vinculo, analise ou remocao.
- Remocao nao gerar tombstone ou nao limpar o indice operacional.

## Decisao final

Marcar uma unica saida:

- `CONCLUIDO`: todos os passos passaram com evidencias e o DAJ ficticio foi removido.
- `MANTER_EM_HOMOLOGACAO`: alguma etapa falhou sem risco de dado real.
- `BLOQUEADO_POR_SESSAO`: nao houve login autorizado ou permissao suficiente.
- `ROLLBACK_INVESTIGAR`: ocorreu vazamento, persistencia indevida, mutacao anonima, dado real, Drive inventado ou falha de limpeza.

## Registro final a preencher

```text
data_execucao:
executor_autorizado:
perfil:
dajId_ficticio:
decisao_final:
evidencias_armazenadas_em:
observacoes:
```
