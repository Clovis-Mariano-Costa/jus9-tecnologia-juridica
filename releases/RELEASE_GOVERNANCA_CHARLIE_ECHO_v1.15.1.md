---
id: JUS9-RELEASE-CHARLIE-GOV-1.15.1
versao: 1.15.1
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-5fdf715
---

# Release Governanca Charlie Echo v1.15.1

## Objetivo

Remover definitivamente o cadastro local ficticio de equipe depois da publicacao do diretorio governado modular.

## Entregas

- Removido de `script.js` o bloco que usava `jus9MvpTeamMembersV1`.
- Removido o historico local `jus9MvpTeamAuditV1`.
- Removido o inicializador `initTeamPage`.
- Preservado `initTeamMenuLink`, que liga os 14 MVPs ao diretorio modular.
- Cache PWA atualizado para eliminar copias antigas do script compartilhado.

## Validacao

- CI completa aprovada depois da remocao.
- Health confirmou `governanca-1.15.1-team-local-cleanup-1.0` em estado `ready`.
- Producao confirmou ausencia das duas chaves locais e de `initTeamPage`.
- Menu modular permaneceu presente.
- Nenhum KV ou registro foi alterado.

## Publicacao

- Commit tecnico: `5fdf715`.
- Worker: `3ea6e197-148f-4fac-b4ba-ca307e86c51e`.

## Rollback

- Restaurar o Worker `0e88eb11-0aea-41ea-96b9-fad866073b3e` para voltar a 1.15.0.
- Nao restaurar o cadastro local salvo no navegador como fonte oficial.
