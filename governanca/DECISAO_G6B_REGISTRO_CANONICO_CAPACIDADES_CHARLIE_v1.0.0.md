---
id: GOV-CHARLIE-DECISAO-G6B-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: implementado-documental-aguardando-aceite-humano
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Decisao G6B - registro canonico de capacidades Charlie v2

## Decisao

Adotar `apis/REGISTRO_CANONICO_CAPACIDADES_CHARLIE_v2.0.0.json` como nova fonte documental de estado das capacidades da Charlie. As matrizes v1.1.0 e v1.3.0 permanecem preservadas como historico, mas nao devem ser usadas isoladamente para declarar o que esta ativo.

## Regra operacional

Uma capacidade somente pode ser apresentada como operacional quando registro, codigo, health quando aplicavel, teste, permissao, revisao humana, release e rollback forem coerentes. Divergencia falha fechada. A presenca de rota no codigo nao equivale a autorizacao para uso.

## Resultado

- 20 capacidades catalogadas.
- Cada capacidade declara estado, rota, metodo, ator, permissao, dado, efeito, revisao humana, evidencia, limite, rollback e pendencia.
- PDPJ continua `READINESS_ONLY` e o teste de token permanece bloqueado por dependencia externa.
- Pesquisa externa por nome/CPF e atos autonomos permanecem bloqueados.
- Nenhuma credencial, chamada CNJ/PDPJ, alteracao de Worker ou mudanca de permissao foi executada.

## Achados P0 para G6C

1. Memoria: `GET`, `POST` e `DELETE` usam `auth:read`; separar leitura, escrita e exclusao.
2. Feedback DAJ: `POST /api/dajs/review` grava estado com `dajs:read`; criar permissao especifica de revisao escrita.
3. Drive: `drive:write` agrega salvar e potenciais efeitos distintos; separar criar, salvar, publicar, revogar e excluir.

Estes achados registram o comportamento atual, mas nao o promovem como modelo definitivo de autorizacao.

## Advogado lider

O perfil `advogado_lider` permanece confirmado como decisor humano no fluxo juridico, limitado as permissoes explicitas e ao escopo do modulo. O papel nao autoriza bypass de seguranca, transacao PDPJ, segredo em prompt ou ato autonomo da Charlie.

## Proxima acao unica

Executar G6C: elaborar a matriz de autoridade e ferramentas, inicialmente em modo documental, com default deny e permissoes separadas por efeito.
