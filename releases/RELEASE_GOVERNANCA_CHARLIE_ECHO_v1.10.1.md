---
id: JUS9-RELEASE-CHARLIE-GOV-1.10.1
versao: 1.10.1
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-877795f
---

# Release Governanca Charlie Echo v1.10.1

## Correcao

- Atendimento DAJ confirma a sessao em `/api/auth/permissions` antes de liberar gravacao.
- Estado visivel distingue sessao ausente, perfil sem permissao, falha de verificacao e perfil autorizado.
- E-mail nao e exibido no indicador.
- Link de login e ocultado quando a sessao esta autorizada.
- Botao de salvar nasce desabilitado e exige `dajs:write` para ser liberado.

## Evidencias

- Sintaxe do cliente aprovada.
- Auditoria estatica dos 14 MVPs aprovada.
- Auditoria de qualidade da Charlie aprovada.
- Producao confirmou health `ready` e release `governanca-1.10.1-daj-auth-status-1.0`.
- HTML, cliente autenticado e cache PWA v31 conferidos na origem publica.

## Publicacao

- Commit: `877795f`.
- Worker: `aa60355f-2a15-406e-a3ab-5d7e32162ff2`.
- URL: `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.

## Rollback

- Restaurar Worker `3b2c553d-90e3-4fd3-9155-108a9359130c` para voltar a 1.10.0.
- Preservar KV, memoria, auditoria, tombstones e sequencia DAJ.
