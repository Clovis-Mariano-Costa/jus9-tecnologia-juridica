---
id: GOV-CHARLIE-CRONOGRAMA-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: rascunho-operacional
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
---

# Cronograma de Governanca - Charlie Echo v1.0.0

## Premissa

Este cronograma segue a auditoria anexada e a especificacao de governanca. A fundacao deve ser implantada sem alterar a logica de negocio existente.

## Pacote 0 - Fundacao auditavel (0 a 2 dias)

Entregas:

- Arvore oficial de governanca.
- Metadados obrigatorios.
- CHANGELOG por componente.
- Politica de memoria por tipo.
- Contrato inicial de dominios de prompt.
- Modelos documentais e evento de auditoria.
- Checklist automatizavel.
- Auditor estrutural local.

Criterio de aceite:

- Auditoria `scripts/audit-charlie-governance-structure.mjs` retorna OK.
- Nenhuma regra ativa da Charlie e alterada neste pacote.

## Pacote 1 - Matriz de capacidades e modos (3 a 7 dias)

Entregas:

- Matriz publico/profissional/social por estado: ativo, demonstrativo, planejado e bloqueado por seguranca.
- Contratos de modo: estudante, profissional, social, governanca, pesquisa juridica, minuta e revisao.
- Vinculo entre modo, prompt, memoria permitida, fontes e limites.

## Pacote 2 - Governanca testavel (8 a 15 dias)

Entregas:

- Casos de teste de dados pessoais, segredo, fonte fraca, minuta juridica, autoridade publica e link quebrado.
- Checklist LGPD, seguranca, conformidade juridica e integridade documental.
- Auditoria de regressao antes de publicar prompt ou fluxo.

## Pacote 3 - Backend e eventos governados (16 a 30 dias)

Entregas:

- Rotas minimas: chat, rooms, summaries, sources, exports, health e governance-events.
- Registro de eventos: message.created, risk.classified, source.checked, summary.updated, export.generated, attachment.rejected e prompt.version.used.
- Feature flags para diferenciar ativo, demo, planejado e bloqueado.

## Pacote 4 - Memoria operacional oficial (31 a 60 dias)

Entregas:

- Memoria por usuario com consentimento, exportacao, limpeza e retencao.
- Google Drive como repositorio documental governado.
- Backend como fonte de verdade para estado transacional critico.
- Trilha de alteracoes por usuario, sala, documento e prompt.

## Pacote 5 - Replicacao por MVP (61 a 90 dias)

Entregas:

- DAJ como modelo juridico.
- DIC como modelo social/cidadao.
- Demais MVPs com instrumentos independentes e auditaveis.
- Painel de maturidade por modulo.
