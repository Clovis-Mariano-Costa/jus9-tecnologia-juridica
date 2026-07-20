---
id: REL-CHARLIE-ECHO-1-21-9
versao: 1.21.9
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.9 - G6B registro canonico Charlie v2

## Escopo

Criar uma fonte documental unica para o estado das capacidades da Charlie, reconciliando runtime, health, testes, permissoes e documentos historicos.

## Entregas

- Registro canonico de capacidades Charlie v2.0.0.
- Vinte capacidades com estado, rota, ator, permissao, dado, efeito, evidencia, revisao humana, limite, rollback e pendencia.
- Decisao G6B de precedencia e falha fechada.
- Tres lacunas P0 encaminhadas para G6C.
- Auditor G6B integrado ao CI local.

## Estado operacional

- Esta release e documental e nao altera runtime, Worker, cache, credenciais, RBAC ou integracoes.
- Release operacional configurada permanece `governanca-1.21.8-pacote8-fechamento-1.0`.
- PDPJ continua `READINESS_ONLY`; teste de token e transacoes continuam bloqueados.
- DataJud continua somente leitura por numero CNJ.
- Pesquisa externa por nome/CPF e atos autonomos continuam bloqueados.

## Achados P0

- Separar permissoes de memoria para leitura, escrita e exclusao.
- Separar escrita de feedback DAJ da permissao `dajs:read`.
- Decompor `drive:write` por efeito governado.

## Rollback

Retirar o registro v2 e seu auditor do CI e voltar a tratar o diagnostico G6 v1.0.0 como fonte de planejamento, preservando todos os documentos historicos e o runtime atual.
