---
id: REL-CHARLIE-ECHO-1-21-10
versao: 1.21.10
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.10 - G6C autoridade e ferramentas Charlie

## Escopo

Definir o desenho-alvo de autoridade, permissoes granulares, ferramentas e aprovacao por efeito para a Charlie, sem alterar o RBAC ou o Worker.

## Entregas

- Matriz de autoridade e ferramentas v1.0.0.
- Seis niveis de aprovacao: A0, A1, A2, A3, A4 e bloqueado.
- Vinte e tres permissoes-alvo.
- Onze grupos de ferramentas classificados.
- Decisao G6C e auditor integrado ao CI local.

## Estado operacional

- Esta release e documental e nao altera runtime, Worker, cache, credenciais, RBAC ou integracoes.
- Release operacional configurada permanece `governanca-1.21.8-pacote8-fechamento-1.0`.
- As permissoes-alvo ainda nao foram adicionadas a `functions/_shared/permissions.js`.
- PDPJ continua `READINESS_ONLY`; contato externo e efeitos judiciais continuam bloqueados.

## Proximo gate

G6C2 exige aceite humano expresso antes de implementar permissoes granulares para memoria, feedback DAJ e Drive.

## Rollback

Retirar matriz, decisao e auditor G6C do CI, preservando o registro canonico v2, a release 1.21.9 e todo o runtime atual.
