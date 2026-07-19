---
id: REL-CHARLIE-CHANGELOG-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: ativo
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-changelog
---

# Changelog - Releases

## 1.17.1 - 2026-07-19

- Proxy `/api/charlie/respond` passa a recuperar respostas evasivas da rota `LAUDO_DAJ_V1` com laudo governado limitado ao cadastro oficial minimizado.
- Frontend DAJ envia `dajAnalysisSource` estruturado e sem nome/CPF/contato para permitir laudo seguro no Worker.
- Cache-buster DAJ sobe para `script.js?v=20260719-daj-laudo-v2`; service worker sobe para `jus9-pwa-v40-2026-07-19-daj-laudo-proxy`.

## 1.17.0 - 2026-07-19

- Charlie Core v0 centraliza o registry canonico dos 14 MVPs, aliases, riscos, papeis humanos e limites por modulo.
- Cinco contratos JSON governados passam a ter validadores e testes dedicados.
- Health publica somente versoes e contagens nao sensiveis do nucleo compartilhado.
- Autorizacao demonstrativa de `advogado_lider` passa a usar secret separado, sem sobrescrever a allowlist geral e sem credenciais no repositorio.
- Confirmacao de entrega privada do Codex Session ID e registrada sem armazenar o identificador.

## 1.16.1 - 2026-07-19

- Publicada correcao do contrato de saida da analise DAJ: sem `Laudo de Analise DAJ`, o feedback nao e registrado.
- Paginas DAJ usam novo cache-buster `script.js?v=20260719-daj-laudo-v1`.
- Service worker, release marker, painel executivo, versionamento e auditores passam a refletir o incidente e o novo teste humano.

## 1.16.0 - 2026-07-19

- Publicado pacote de links Build Week/Saiba Mais/mapa de estados dos MVPs.
- Service worker e sitemap passam a incluir Build Week, Saiba Mais, painel executivo e O que ja funciona.
- Cronograma Mao na Massa v3.1.0 e auditores dedicados entram como release candidata de continuidade.

## 1.15.1 - 2026-07-14

- Removido do script compartilhado o cadastro local ficticio de equipe.
- Chaves `jus9MvpTeamMembersV1` e `jus9MvpTeamAuditV1` deixam de existir no portal.
- Menu que encaminha os 14 MVPs ao diretorio governado permanece ativo.
- Cache PWA renovado para descartar copias antigas.

## 1.15.0 - 2026-07-14

- Diretorio governado de equipe passa a atender os 14 MVPs com configuracao independente.
- Cada modulo recebe navegacao e perfis proprios.
- Aliases INV/ORG continuam compativeis com DIP/DOI.
- DIC preserva solicitacao pessoal sem expor o diretorio social interno.
- Matriz autenticada dos 14 modulos e smoke de 16 URLs passam a integrar a validacao.

## 1.14.0 - 2026-07-14

- Equipe DAJ deixa de ser cadastro ficticio local e passa a usar diretorio governado oficial.
- Solicitacao propria, convite de gestor, perfis aprovados e auditoria recebem interface unica e clean.
- Backend separa `profiles:request`, `profiles:read` e `profiles:manage`, com limite por modulo.
- E-mails do diretorio ficam ocultos para leitores sem gestao.
- Empresa e Investidor recebem atalho de Agenda.

## 1.13.0 - 2026-07-14

- Seis telas do DAJ recebem layout clean isolado e menu lateral padronizado.
- Perfis e acessos passam a listar os 19 papeis reconhecidos, oito deles ligados ao DAJ.
- Painel remove metricas e processos ficticios apresentados como dados operacionais.
- Pesquisa processual remove atalhos redundantes e abre o DAJ realmente vinculado.
- Funcionalidades de backend, Charlie, feedback e encaminhamento permanecem preservadas.

## 1.12.0 - 2026-07-14

- Analise do DAJ passa a usar sala nova, rota fixa e nenhuma memoria da sala anterior.
- Resultado completo fica no historico governado e o autor recebe feedback obrigatorio.
- Backend devolve ou reencaminha por perfil, risco, urgencia e sigilo.
- Estagio pode criar DAJ, mas a analise segue para supervisao de assessor ou advogado.
- Cadastro ganha caixa de encaminhamentos por perfil.

## 1.11.0 - 2026-07-14

- Salvamento DAJ passa a devolver comprovante de indice e detalhe persistidos.
- Cadastro de clientes deixa de exibir exemplos fixos e le a lista oficial autenticada.
- Envio para Charlie transporta somente `dajId`; a analise rele o detalhe no backend e falha fechada sem ele.
- Nome, CPF e contato ficam fora do prompt automatico de analise.

## 1.10.1 - 2026-07-14

- Pagina de atendimento mostra o resultado do login e o perfil autorizado.
- Botao de salvar nasce bloqueado e so e liberado depois da verificacao de permissao.

## 1.10.0 - 2026-07-13

- Pacote 1C tecnico recebe criacao marcada, retomada por `dajId` e limpeza governada do DAJ ficticio.
- A limpeza remove indice e detalhe, preserva tombstone minimo e nao pode atingir DAJ comum.
- Aceite humano autenticado continua como porta obrigatoria antes da reindexacao ou replicacao.

## 1.9.0 - 2026-07-13

- Atendimento inicial deixa de simular salvamento e cria DAJ autenticado no backend.
- Nome e CPF exato passam a ser pesquisaveis antes de existir numero processual.
- CPF integral nao e persistido; contato e relato ficam fora do indice de pesquisa.
- Pacote 1B publicado somente em homologacao, com dados ficticios ate o aceite 1C.

## 1.8.0 - 2026-07-13

- Pesquisa por nome/CPF separada da IA generativa e movida para endpoint autenticado somente leitura.
- CPF indexado por HMAC exato, sem persistencia do valor integral e sem fallback por finais iguais.
- Pesquisa externa por partes registrada como aguardando orientacao oficial, sem resultado presumido.

## 1.7.0 - 2026-07-13

- DED promovido a instrumento independente com IA, perfis, documentos e workspace proprios.
- Quatorze MVPs passam a possuir salas de IA dedicadas.
- Preservacao do modo social padrao do DIC adicionada a auditoria automatica.

## 1.6.0 - 2026-07-13

- DataJud estabilizado com cache, limite, auditoria e DTO de metadados oficiais.
- PDPJ preparado somente para readiness e teste seguro de token.

## 1.5.0 - 2026-07-13

- Memoria por usuario e Drive oficial protegidos por proxy autenticado.

## 1.3.0 - 2026-07-12

- Registrado release-candidato do Pacote 3: contratos de backend e eventos governados.

## 1.2.0 - 2026-07-12

- Registrado release-candidato do Pacote 2: governanca testavel.

## 1.1.0 - 2026-07-12

- Registrado release-candidato do Pacote 1: matriz de capacidades e contratos de modo.

## 1.0.0 - 2026-07-12

- Criada area de releases governadas.
- Registrado pacote fundacional de governanca.
