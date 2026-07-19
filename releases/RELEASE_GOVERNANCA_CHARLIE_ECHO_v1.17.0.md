---
id: REL-CHARLIE-ECHO-1-17-0
versao: 1.17.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: git-7d94802-worker-84c5123f
---

# Release v1.17.0 - Charlie Core, contratos e perfil demonstrativo

## Escopo

Publicar o primeiro nucleo compartilhado dos 14 MVPs, contratos JSON governados e uma via separada de autorizacao demonstrativa para `advogado_lider`.

## Entregas

- Registry imutavel dos 14 MVPs, com aliases `INV -> DIP` e `ORG -> DOI`.
- Classificador deterministico de risco e builder de prompt governado.
- Validadores de `ChatRequest`, `ChatResponse`, `DocumentSaveRequest`, `DataJudSearchRequest` e `AuditEvent`.
- Diretorio modular derivado do registry central.
- Health com versao do Charlie Core, versao dos contratos e contagem de MVPs.
- Secret `AUTH_ADVOGADO_LIDER_EMAILS` isolado da allowlist geral.
- Confirmacao sanitizada da entrega privada do Codex Session ID.

## Seguranca e governanca

- Nenhuma senha, e-mail privilegiado ou Session ID e gravado no codigo, teste, documento ou commit.
- A allowlist geral existente nao e lida, substituida ou exposta durante a publicacao.
- Drive real, memoria real e aceite humano DAJ permanecem bloqueados pelas portas vigentes.
- O perfil demonstrativo somente se torna efetivo depois do login Google com o e-mail autorizado.

## Validacao exigida

- CI local integral.
- `git diff --check`.
- `wrangler deploy --dry-run`.
- Deploy controlado e verificacao do health publico.

## Evidencia de publicacao

- Commit fonte: `7d94802`.
- Worker publicado inicialmente: `12d8251b-d010-48ea-bc90-f60002c16a31`.
- Versao ativa apos configuracao secreta: `84c5123f-e475-4d5b-b682-437483f859b4`.
- Health publico: `ready`, Charlie Core `0.1.0`, contratos `1.0.0`, 14 MVPs.
- Secret confirmado somente por nome; valor nao exposto.
