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
