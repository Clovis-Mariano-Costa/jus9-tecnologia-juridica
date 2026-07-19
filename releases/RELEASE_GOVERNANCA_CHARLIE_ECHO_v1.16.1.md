---
id: REL-CHARLIE-ECHO-1-16-1
versao: 1.16.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.16.1 - Laudo obrigatorio na analise DAJ

## Escopo

Correcao do incidente em que a analise do `DAJ-2026-0002` devolveu resposta evasiva de indice/endpoint em vez de laudo.

## Entregas

- `script.js` exige `Laudo de Analise DAJ` com 10 secoes obrigatorias.
- Respostas que desviam para DataJud, pesquisa de partes, indice, vinculo DAJ-processo ou `/api/daj-process-links` sao recusadas.
- Registro em `/api/dajs/review` so ocorre depois de resposta validada como laudo.
- Paginas DAJ usam `script.js?v=20260719-daj-laudo-v1`.
- Painel executivo e mapa publico registram `AGUARDANDO_NOVO_TESTE_HUMANO`.
- Criados relatorio de incidente, cronograma v3.1.1 e auditoria dedicada do laudo.

## Estado governado

Pacote 2: `AGUARDANDO_NOVO_TESTE_HUMANO`.

Pacote 6: `BLOQUEADO_ATE_REVERSIBILIDADE_1C`.

Video e ZIP final: permanecem no ultimo pacote.
