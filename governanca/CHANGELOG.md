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
