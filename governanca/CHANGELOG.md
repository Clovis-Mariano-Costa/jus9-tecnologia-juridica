---
id: GOV-CHARLIE-CHANGELOG-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: ativo
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-changelog
---

# Changelog - Governanca

## 1.13.3 - 2026-07-19

- Registrado incidente da analise DAJ em que a Charlie Echo devolveu orientacao de indice/endpoint em vez de laudo.
- Criado cronograma Mao na Massa v3.1.1 com Pacote 2 em `AGUARDANDO_NOVO_TESTE_HUMANO` e reversibilidade bloqueada ate laudo satisfatorio.
- Adicionada auditoria dedicada para preservar o contrato obrigatorio de laudo, a falha fechada e o ultimo pacote como revisao/video/ZIP.

## 1.13.2 - 2026-07-19

- Criado cronograma Mao na Massa v3.1.0 a partir do briefing de auditoria anexado, sem sobrescrever o v3.0.0.
- v3.1.0 preserva DAJ como piloto operacional, 13 MVPs como vitrines governadas, `Charlie Core v0` como proximo pacote seguro e revisao/video/ZIP como ultimo pacote.
- Adicionados auditores para cronograma v3.1.0 e para links Build Week/Saiba Mais/mapa de estados.

## 1.13.1 - 2026-07-19

- Registrada revisao geral do Mao na Massa cobrindo Pacotes 0 a 8.
- Revisao preserva Pacote 2 como `DEPENDENTE_DE_ACAO_HUMANA`, Pacote 6 como `BLOQUEADO_ATE_REVERSIBILIDADE_1C` e Video/ZIP como pendentes.
- Adicionado auditor da revisao geral ao CI local.

## 1.13.0 - 2026-07-19

- Publicado Pacote 5 com vitrines `DEE`, `DEJI` e `DPJ`, cada uma com dataset ficticio, checklist governado, pacote de prompts e guardrails de revisao humana.
- Registrado checklist final obrigatorio do Mao na Massa: revisao geral de todos os pacotes, video publico curto e ZIP final congelado, escaneado e hashado.
- Painel executivo passa a marcar o Pacote 5 como `CONCLUIDO_PUBLICADO` e o Pacote 8 como `PENDENTE_FECHAMENTO_GERAL`.

## 1.12.9 - 2026-07-19

- Publicada vitrine social DIC com dataset ficticio, checklist anti-PII, fonte oficial e encaminhamento humano.
- IA DIC passa a expor pacote de prompts e guardrails contra coleta de dados pessoais, caso real, urgencia e substituicao de atendimento humano.
- Painel executivo passa a marcar o Pacote 4 como `CONCLUIDO_PUBLICADO` e o CI local recebe auditor dedicado do DIC.

## 1.12.8 - 2026-07-19

- Publicada vitrine editorial DED com briefing ficticio, checklist de autoria/titularidade e pacote de prompts da IA Editorial.
- Painel DED e IA DED deixam explicito que Drive real, ISBN, venda, contrato e publicacao ficam bloqueados no demo publico.
- Painel executivo passa a marcar o Pacote 3 como `CONCLUIDO_PUBLICADO` e o CI local recebe auditor dedicado do DED.

## 1.12.7 - 2026-07-19

- Criado `app-painel-mvps.html` como painel executivo dos 14 MVPs, com ranking, pacotes Mao na Massa, riscos, evidencias, commits e deploy base.
- `mvp.html` e `lider-mvp.html` passam a apontar para o painel executivo.
- Adicionado auditor do painel executivo ao CI local e regressao publica dos MVPs.

## 1.12.6 - 2026-07-19

- Registrado aceite humano parcial do `DAJ-2026-0002`, confirmado no cadastro oficial com indice e detalhe gravados.
- Criado cronograma Mao na Massa v3.0.0 com pacotes reordenados por seguranca, deixando memoria/Drive bloqueados ate reversibilidade do 1C.
- Adicionado auditor do Mao na Massa v3 ao CI local.

## 1.12.5 - 2026-07-19

- `app-clientes.html` passa a consultar DAJs por DAJ, nome, CPF exato, numero do processo e detalhes operacionais seguros.
- Pesquisa por nome/CPF usa POST no indice governado de partes, sem query string com PII e sem fallback por finais de CPF.
- Resultados da consulta enriquecem o DAJ com detalhe oficial quando disponivel, mantendo CPF mascarado e renderizacao segura por `textContent`.

## 1.12.4 - 2026-07-19

- Criados kits demonstrativos de vitrine para DED e DIC com datasets ficticios, roteiros, evidencias esperadas e condicoes de parada.
- DED passa a ter prova guiada de autoria/editoria sem promessa de publicacao, ISBN, venda ou Drive real.
- DIC passa a ter prova guiada social/cidada sem coleta de dado pessoal, sem substituir humano e sem contaminar linguagem pelo DAJ.
- Adicionado auditor dos kits demonstrativos ao CI local.

## 1.12.3 - 2026-07-19

- Criada matriz de priorizacao dos 14 MVPs com criterios ponderados, ranking, ondas de execucao e proximas acoes.
- Registrado DAJ como porta operacional, DED e DIC como vitrines estrategicas, e DMG/DMP/DAP como alta sensibilidade demonstrativa.
- Adicionado auditor automatico da matriz ao CI local.

## 1.12.2 - 2026-07-18

- Criado kit de aceite humano do Pacote 1C com dataset ficticio, roteiro de evidencias, condicoes de parada e decisao final.
- Adicionado auditor estatico do kit para preservar a porta humana, a minimizacao de CPF e o bloqueio contra dados reais.

## 1.12.1 - 2026-07-18

- Executado pre-aceite tecnico do Pacote 1C com homologacao DAJ, regressao de autenticacao e gate publico vivo.
- Registrado que o ambiente publico falha fechado sem sessao autorizada e que o aceite humano segue pendente.

## 1.12.0 - 2026-07-18

- Criado cronograma Mao na Massa v2.4.0 com datas concretas, base dos 14 MVPs publicada e porta humana do Pacote 1C preservada.
- Demo 14 passa a integrar a fila de continuidade com IA Editorial dedicada e smoke test publico.
- Proximos pacotes ficam condicionados a aceite humano autenticado com dados ficticios quando houver memoria, Drive, DAJ ou indice governado.

## 1.11.0 - 2026-07-14

- Sucesso de gravacao exige comprovante correspondente ao `dajId`, indice e detalhe.
- O cadastro oficial substitui exemplos locais na continuidade do atendimento.
- Handoff DAJ-Charlie passa a reler a fonte governada e nao aceita rascunho de navegador.
- Prompt automatico aplica minimizacao de identidade, CPF e contato.

## 1.10.1 - 2026-07-14

- Atendimento DAJ passa a confirmar sessao e `dajs:write` antes de liberar gravacao.
- Estado autenticado fica visivel sem expor e-mail e o link de login some quando autorizado.

## 1.10.0 - 2026-07-13

- Homologacao do DAJ passa a ser reversivel somente para registros explicitamente ficticios.
- Exclusao exige sessao, escrita, auditoria, justificativa e confirmacao vinculada ao identificador.
- Tombstone minimo bloqueia recriacao idempotente sem preservar dados da parte.
- DAJs comuns permanecem imutaveis pela rota de limpeza de homologacao.

## 1.9.0 - 2026-07-13

- DAJ passa a ser a fonte operacional do indice interno de partes.
- Criacao, atualizacao, idempotencia, separacao de detalhe e vinculo posterior receberam regressao automatizada.
- Reindexacao real e replicacao continuam bloqueadas ate o aceite autenticado com dados ficticios.

## 1.8.0 - 2026-07-13

- Consultas processuais estruturadas passam a obedecer a politica `no_llm_no_invented_results`.
- Nome usa indice DAJ autenticado e CPF usa HMAC-SHA-256 exato.
- Cronograma 2.1.0 separa indice interno pronto, reindexacao e conector externo aguardando orientacao.

## 1.7.0 - 2026-07-13

- Inventario atualizado para quatorze MVPs com IA dedicada.
- DED recebeu contrato operacional editorial independente.
- Invariante do modulo social DIC passou a ser auditada.

## 1.6.0 - 2026-07-13

- DataJud e readiness PDPJ incorporados a governanca operacional.

## 1.5.0 - 2026-07-13

- Memoria por usuario e Drive oficial passaram a usar proxy governado.

## 1.3.0 - 2026-07-12

- Adicionados contratos de backend governado, catalogo de eventos e feature flags.
- Criado auditor especifico para rotas, eventos, flags e bloqueios.

## 1.2.0 - 2026-07-12

- Adicionada governanca testavel para riscos sensiveis.
- Registrado protocolo de regressao antes de publicar prompt ou fluxo sensivel.

## 1.1.0 - 2026-07-12

- Adicionada matriz de capacidades por estado: ativo, demonstrativo, planejado e bloqueado por seguranca.
- Vinculados os estados a ambientes, dependencias, evidencias e limites.

## 1.0.0 - 2026-07-12

- Criada fundacao de governanca modular conforme especificacao v1.0.
- Registrada separacao entre governanca, memoria, prompts, documentacao, APIs, modelos, logs, testes, releases, historico e obsoleto.
- Definida regra de nao sobrescrever versoes aprovadas.
- Adicionado cronograma inicial de execucao e maturidade.
