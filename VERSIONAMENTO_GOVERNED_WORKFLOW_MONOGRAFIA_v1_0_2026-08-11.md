# Versionamento — Núcleo de Workflow Governado da Monografia v1.0

**Data:** 2026-08-11 — America/Sao_Paulo
**Pedido de origem:** Drive `1hvImGx4NegKuqIgIfUuVqUDRLU_tBV9ZOtkzqdvgnuw`
**Estado:** PROTÓTIPO LOCAL VERIFICADO / SEM MERGE / SEM DEPLOY

## Entregas

- `backend/lib/governed-workflow.js`: pacote versionado, pré-condições fail-closed, aprovação humana, testes, incidentes, lint de requisitos, detecção de segredos e eventos de auditoria com hash.
- `tests/governed-workflow.test.mjs`: cobertura unitária, falhas fechadas, aprovação, teste adversarial, incidente, lint e higiene de segredos.

## Limites

O núcleo não conecta Google Drive, GitHub, bancos ou provedores externos; não publica, não faz merge, não faz deploy e não simula assinatura. Adaptadores, painel e integração entre os repositórios permanecem como etapas posteriores, cada uma com seu próprio gate e registro.

