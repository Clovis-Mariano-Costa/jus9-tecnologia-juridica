---
id: JUS9-DAJ-PERSISTENCIA-ANALISE-BACKEND-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: homologacao
classificacao: INTERNO
hash: calcular-no-release
---

# Persistencia e analise backend do DAJ

## Objetivo

Eliminar a aparencia de salvamento sem continuidade e impedir que a Charlie analise um rascunho local como se fosse um DAJ oficial.

## Contrato de persistencia

`POST /api/dajs` retorna `persistence` somente depois de aguardar a gravacao do detalhe, do indice e do marcador idempotente aplicavel.

O frontend so declara sucesso quando confirma:

- `stored: true`;
- `indexWritten: true`;
- `detailWritten: true`;
- `dajId` igual ao identificador retornado.

## Fonte operacional

- `app-clientes.html` lista apenas registros retornados por `GET /api/dajs` com sessao autenticada.
- Exemplos fixos foram retirados da lista para nao parecerem cadastros reais.
- O atendimento oferece link direto para conferir o DAJ salvo no cadastro oficial.

## Handoff para Charlie Echo

1. O atendimento confirma `GET /api/dajs?dajId=...`.
2. A navegacao transporta somente o `dajId` e o comando de inicio.
3. A pagina da Charlie rele o mesmo DAJ no backend autenticado.
4. Somente o detalhe operacional minimizado entra no prompt.
5. Nome, CPF e contato nao entram no prompt automatico.
6. Se o detalhe nao puder ser confirmado, a analise nao inicia e nenhum rascunho local e usado.

## Compatibilidade e rollback

- O contrato anterior de criacao e leitura permanece compativel; `persistence` e aditivo.
- O KV `JUS9_DAJ_PROCESS_LINKS`, seus indices, auditorias e tombstones nao devem ser removidos no rollback.
- A versao anterior pode ser restaurada sem migracao de dados.

## Evidencias exigidas

- regressao autenticada do Worker;
- homologacao tecnica do DAJ;
- auditoria estatica dos MVPs;
- CI local completa;
- verificacao publica sem criar, atualizar ou excluir DAJ real.
