---
id: JUS9-RELEASE-CHARLIE-GOV-1.15.0
versao: 1.15.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-7bb6c3a
---

# Release Governanca Charlie Echo v1.15.0

## Entregas

- Diretorio governado passa a atender os 14 MVPs por `?mvp=CODIGO`.
- Navegacao e perfis sao selecionados por instrumento.
- Aliases `INV` e `ORG` permanecem compativeis.
- DAJ preserva o menu operacional completo.
- DIC recebe protecao social especifica e nao revela identidades internas ao cidadao.
- Cliente compartilhado deixa de usar o cadastro local legado.
- PWA atualizado para o diretorio modular.

## Validacao

- CI completa aprovada.
- Auditoria visual estrutural dos 14 paineis aprovada.
- Matriz autenticada dos 14 modulos aprovada.
- Dezesseis URLs publicas do diretorio retornaram HTTP 200.
- Health confirmou `governanca-1.15.0-modular-team-directory-1.0` em estado `ready`.
- Nenhum registro real foi alterado no smoke.

## Publicacao

- Commit tecnico: `7bb6c3a`.
- Worker: `0e88eb11-0aea-41ea-96b9-fad866073b3e`.
- Diretorio DAJ: `https://jus9tecnologia.com.br/app-equipe.html?mvp=DAJ`.
- Diretorio social: `https://jus9tecnologia.com.br/app-equipe.html?mvp=DIC`.
- Diretorio de governanca: `https://jus9tecnologia.com.br/app-equipe.html?mvp=DGE`.

## Rollback

- Restaurar o Worker `a6cf6009-c361-456e-9138-562025a47662`.
- Preservar os KVs e todos os registros existentes.
