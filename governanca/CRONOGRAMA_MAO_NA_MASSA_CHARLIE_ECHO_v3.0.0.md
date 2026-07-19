---
id: GOV-CHARLIE-CRONOGRAMA-003-0
versao: 3.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 2.4.0
preserva_historico: true
---

# Cronograma Mao na Massa - Charlie Echo v3.0.0

## Marco atual

Base em 2026-07-19:

- `DAJ-2026-0002` confirmado no cadastro oficial em `2026-07-19 13:44:32 BRT`, com indice e detalhe gravados.
- Pacote 1C esta em `ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE`.
- Consulta governada em `app-clientes.html` publicada para DAJ, nome, CPF exato, numero de processo e detalhes seguros.
- Vitrines seguras `DED`, `DIC`, `DEE`, `DEJI` e `DPJ` publicadas com dados ficticios, guardrails e revisao humana.
- Lembrete final obrigatorio registrado: revisar todos os pacotes, preparar video publico curto e congelar ZIP final escaneado e hashado.
- Commit de referencia da consulta: `a142825 feat: consulta governada de dajs por chaves`.
- Deploy de referencia: `cde1bf89-3d93-4429-a485-be46945bec04`.
- Smoke publico: `LIVE_DAJ_SEARCH_SMOKE_OK page,js,apis-fail-closed`.

## Regra-mestra

Fazer varios pacotes, mas separar efeito real de trabalho seguro.

- Pode continuar: interface, consulta, kits, documentacao, auditoria, smoke test, melhorias de UX e validacoes com dados ficticios.
- Ainda depende de porta humana: memoria real, Drive real, reindexacao real, replicacao persistente, exclusao/tombstone e qualquer fluxo com dado sensivel.
- Nunca presumir processo, pessoa, fonte, link, Drive, CPF, arquivo, credencial ou aceite humano.
- CPF integral nao entra em query string, prompt, localStorage, auditoria visivel ou resultado.

## Pacotes

### Pacote 0 - Registro do aceite humano parcial DAJ

Estado: `CONCLUIDO`.

Entrega:

- Relatorio de aceite humano parcial do `DAJ-2026-0002`.
- Registro de que indice e detalhe foram gravados.
- Limite explicito: reversibilidade ainda pendente.

Validacao:

- `MAO_NA_MASSA_V3_OK`.

### Pacote 1 - Consulta DAJ completa

Estado: `CONCLUIDO_PUBLICADO`.

Entrega:

- `app-clientes.html` com consulta por DAJ, nome, CPF exato, numero do processo e detalhes seguros.
- Nome e CPF via `/api/judicial/parties/search` com POST governado.
- Processo via `/api/daj-process-links`.
- DAJ direto via `/api/dajs?dajId=`.
- Resultados enriquecidos por detalhe oficial quando disponivel.

Validacao:

- `PUBLIC_MVPS_REGRESSION_OK`.
- `WORKER_AUTH_REGRESSION_OK`.
- `LIVE_DAJ_SEARCH_SMOKE_OK page,js,apis-fail-closed`.

### Pacote 2 - Fechamento reversivel do Pacote 1C

Estado: `DEPENDENTE_DE_ACAO_HUMANA`.

Objetivo:

- Enviar o `DAJ-2026-0002` para analise da Charlie, confirmar minimizacao do prompt e remover o DAJ ficticio pela rota governada, se ele for registro de homologacao.

Porta de saida:

- Analise Charlie registrada.
- Confirmacao de ausencia de CPF/contato no prompt.
- Remocao governada com `EXCLUIR TESTE <dajId>`.
- Tombstone confirmado.
- Pesquisa posterior por DAJ, nome e CPF sem resultado operacional.

### Pacote 3 - DED vitrine editorial

Estado: `PRONTO_PARA_EXECUCAO_SEGURA`.

Objetivo:

- Transformar o DED em demo editorial convincente, sem Drive real e sem promessa de publicacao.

Entregas:

- Fluxo Autor/Editora/Autor-Editor.
- Briefing editorial ficticio.
- Checklist de autoria, titularidade, versoes e revisao humana.
- Respostas da IA Editorial com limites claros.

### Pacote 4 - DIC vitrine social

Estado: `PRONTO_PARA_EXECUCAO_SEGURA`.

Objetivo:

- Fortalecer o DIC como modulo social/cidadao com linguagem simples, fontes oficiais e encaminhamento humano.

Entregas:

- Roteiro de orientacao cidada.
- Bloqueio de coleta de dado pessoal.
- Separacao explicita do DAJ.
- Encaminhamento para humano quando houver caso concreto, urgencia ou necessidade profissional.

### Pacote 5 - DEE, DEJI e DPJ

Estado: `CONCLUIDO_PUBLICADO`.

Objetivo:

- Replicar a matriz DAJ para mercados juridicos proximos, mantendo permissao, auditoria e personalidade propria.

Entregas:

- `DEE` - escritorio juridico com dataset ficticio, permissao por caso, sigilo profissional, auditoria e revisao do advogado.
- `DEJI` - empresa / juridico interno com contrato ficticio, compliance, LGPD, risco e decisao humana.
- `DPJ` - perito judicial com quesitos ficticios, metodo, cadeia tecnica, contraditorio e assinatura humana.

### Pacote 6 - Memoria e Drive

Estado: `BLOQUEADO_ATE_REVERSIBILIDADE_1C`.

Objetivo:

- Validar memoria por usuario e Drive Saver oficial com artefato ficticio, URL real retornada pelo backend e revogacao/exclusao governada.

Nao iniciar enquanto o Pacote 1C nao estiver fechado ou enquanto a reversibilidade estiver pendente.

### Pacote 7 - Painel executivo dos 14 MVPs

Estado: `CONCLUIDO_PUBLICADO`.

Objetivo:

- Criar visao executiva de prontidao, riscos, evidencias, commits, deploys e proximas portas para os 14 MVPs.

### Pacote 8 - Revisao geral, Video e ZIP

Estado: `PENDENTE_FECHAMENTO_GERAL`.

Objetivo:

- Revisar todos os pacotes do Mao na Massa antes de declarar encerramento.
- Lembrar e preparar o video publico curto.
- Lembrar e preparar o ZIP final congelado, escaneado e hashado.

Regra:

- O ultimo pacote e sempre a revisao de todos os pacotes.
- O video nao pode mostrar conta, token, CPF, documento real, processo real, Drive real ou dado sensivel.
- O ZIP nao pode conter credenciais, `.env`, tokens, sessoes, arquivos reais, dados pessoais ou evidencias privadas.

## Proxima acao

Quando houver sessao autorizada, voltar ao Pacote 2 e fechar a reversibilidade do `DAJ-2026-0002`. Enquanto isso, manter o Pacote 6 bloqueado e preparar o Pacote 8 somente no fim: revisao geral, video e ZIP.
