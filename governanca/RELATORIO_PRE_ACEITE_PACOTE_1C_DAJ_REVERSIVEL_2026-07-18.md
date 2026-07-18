---
id: GOV-DAJ-PRE-ACEITE-1C-2026-07-18
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: pre-aceite-tecnico-concluido
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: nao-aplicavel-pre-aceite
---

# Relatorio de pre-aceite - Pacote 1C - DAJ reversivel

## Escopo

Executar a etapa preparatoria do Pacote 1C sem criar dado real e sem simular aceite humano autenticado.

O Pacote 1C exige prova humana com login autorizado para criar, retomar, pesquisar, vincular, analisar e remover um DAJ ficticio. Esta prova ainda nao foi executada neste registro.

## Resultado em 2026-07-18

Estado do Pacote 1C: `HOMOLOGACAO_TECNICA_APROVADA / ACEITE_HUMANO_PENDENTE`.

Foram validados:

- Worker e APIs DAJ continuam respondendo aos contratos esperados.
- Homologacao tecnica local cria DAJs ficticios, indexa nome/CPF por politica governada, vincula processo, audita e remove por tombstone.
- CPF integral nao fica no indice, auditoria ou resposta publica.
- Ambiente publico vivo expõe readiness, mas bloqueia mutacao anonima com `401`.
- Sem login autorizado, nao foi criado DAJ real, nao foi acionado Drive, nao foi persistido arquivo e nao foi produzido aceite humano.

## Comandos executados

```powershell
node tests\validate-daj-homologation.mjs
node tests\validate-worker-auth.mjs
```

Resultados:

- `DAJ_HOMOLOGATION_TECHNICAL_OK memory,upload,intake-index,links,multi-daj,cpf-mask,audit,cleanup,tombstones`
- `WORKER_AUTH_REGRESSION_OK`
- `LIVE_DAJ_GATE_OK readiness-publica mutacoes-anonimas-bloqueadas`

## Gate publico vivo

Endpoints conferidos no dominio publico:

- `GET https://jus9tecnologia.com.br/api/health` -> `200`
- `GET https://jus9tecnologia.com.br/api/dajs/readiness` -> `200`
- `GET https://jus9tecnologia.com.br/api/daj-process-links/readiness` -> `200`
- `GET https://jus9tecnologia.com.br/api/judicial/parties/readiness` -> `200`
- `GET https://jus9tecnologia.com.br/api/dajs` sem sessao -> `401`
- `POST https://jus9tecnologia.com.br/api/dajs` sem sessao -> `401`
- `POST https://jus9tecnologia.com.br/api/judicial/parties/search` sem sessao -> `401`

## Porta humana ainda pendente

Para concluir o Pacote 1C, executar somente com login autorizado e dados inteiramente ficticios:

1. Entrar com perfil autorizado.
2. Criar DAJ ficticio com nome e CPF validos, mas inventados.
3. Recarregar e retomar pelo mesmo `dajId`.
4. Pesquisar por DAJ, nome e CPF exato.
5. Vincular a processo ficticio controlado.
6. Enviar o DAJ para analise da Charlie.
7. Confirmar que CPF, contato e dado sensivel nao entram no prompt.
8. Remover o DAJ ficticio pela rota governada.
9. Confirmar tombstone e ausencia em pesquisas posteriores.

## Decisao de governanca

- Pacote 1C nao deve ser marcado como `CONCLUIDO` antes da prova humana.
- Pacotes 2, 3C, 8, 9 e 10 continuam condicionados a essa porta quando houver efeito real em memoria, Drive, DAJ, indice ou replicacao.
- Se a sessao autorizada nao estiver disponivel, continuar apenas em auditoria, documentacao, testes locais ou melhorias sem persistencia real.
