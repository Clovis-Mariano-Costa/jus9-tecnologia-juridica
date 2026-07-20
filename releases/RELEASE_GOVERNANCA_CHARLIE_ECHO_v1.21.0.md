---
id: RELEASE-GOVERNANCA-CHARLIE-ECHO-1.21.0
versao: 1.21.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: preparada-para-publicacao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Release 1.21.0 - guard de onboarding PDPJ-Br

## Entrega

- Readiness deixa de confundir credenciais com autorizacao institucional.
- SSO limitado aos endpoints oficiais de homologacao e producao.
- GeCli aprovado, responsavel e aceite tornam-se pre-condicoes explicitas.
- Producao exige confirmacao separada.
- Resposta do token limitada a 64 KB; token e secret nunca retornam.
- Matriz preserva Domicilio, ciencia, peticionamento e MNI bloqueados.

## Sem ativacao

Esta release nao configura CNPJ, credencial, certificado, tenant, perfil, lotacao, API negocial ou endpoint transacional. Nao chama o CNJ e nao submete solicitacao GeCli.

## Rollback

Restaurar a release `governanca-1.20.0-datajud-governado-1.0`. Nao restaurar a aceitacao de URL SSO arbitraria nem declarar `configured` apenas por haver client/secret.
