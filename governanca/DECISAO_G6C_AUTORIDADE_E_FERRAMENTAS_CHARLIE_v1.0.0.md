---
id: GOV-CHARLIE-DECISAO-G6C-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: desenho-concluido-implementacao-aguarda-aceite-humano
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Decisao G6C - autoridade e ferramentas da Charlie

## Decisao

Adotar a matriz `apis/MATRIZ_AUTORIDADE_FERRAMENTAS_CHARLIE_v1.0.0.json` como desenho-alvo de autoridade e ferramentas. Esta decisao conclui o desenho documental, mas nao altera o RBAC ou o Worker.

## Regra central

Capacidade elegivel nao significa acao autorizada. Toda operacao deve combinar ator, sessao, permissao especifica, modulo, dado, efeito, nivel de aprovacao e rollback. Qualquer campo ausente falha fechado.

## Niveis

- `A0`: leitura publica minimizada, sem mutacao.
- `A1`: gesto local ou no proprio escopo, reversivel e sem efeito externo.
- `A2`: sessao, permissao especifica, modulo e auditoria.
- `A3`: confirmacao humana vinculada ao efeito e alvo.
- `A4`: dupla validacao para publicacao, exclusao ou efeito sensivel/destrutivo.
- `BLOQUEADO`: capacidade inexistente, insegura ou dependente de autorizacao externa.

## Achados G6B tratados no desenho

1. Memoria foi decomposta em `memory:read`, `memory:write` e `memory:delete`.
2. Revisao DAJ foi decomposta em `dajs:review:read`, `dajs:review:submit` e `dajs:review:write`.
3. Drive foi decomposto em criar, salvar, publicar link, revogar link e excluir.

Essas permissoes ainda nao existem no runtime. O comportamento atual permanece documentado no registro canonico v2 e nao deve ser confundido com o modelo-alvo.

## Papel da Charlie

A Charlie pode classificar, explicar, resumir, preparar, recomendar, solicitar confirmacao e encaminhar. Nao pode conceder permissao, aprovar a propria acao sensivel, usar credencial fora do proxy, enviar contato externo, publicar, excluir, peticionar ou registrar ciencia.

## Papel do advogado lider

O `advogado_lider` e decisor humano juridico no escopo explicito do modulo e das permissoes. Nao representa autorizacao universal, bypass, onboarding PDPJ, delegacao de credencial ou permissao para ato autonomo.

## Ferramentas catalogadas

Onze grupos foram classificados: resposta Charlie, anexos, memoria, DAJ, Drive, Calendar, DataJud, PDPJ, pesquisa externa de partes, contato externo e efeitos judiciais.

PDPJ permanece `READINESS_ONLY`. Contato externo e efeitos judiciais permanecem bloqueados.

## Migracao proposta

1. Adicionar permissoes granulares em paralelo as legadas, com testes e sem retirar acesso existente.
2. Migrar cada rota para permissao especifica e confirmacao por efeito.
3. Observar por 72 horas.
4. Remover fallback legado somente apos aceite humano.

## Condicao para implementar

G6C2 exige aceite humano expresso para alterar `functions/_shared/permissions.js`, handlers do Worker e testes. A aprovacao deve confirmar especialmente memoria, feedback DAJ e efeitos Drive.

## Proxima acao unica

Obter decisao humana sobre G6C2. Enquanto isso, o RBAC e o runtime permanecem inalterados.
