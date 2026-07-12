---
id: TST-CHARLIE-PROTOCOLO-REGRESSAO-001
versao: 1.2.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-12
status: rascunho-operacional
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-protocolo
---

# Protocolo de Regressao para Prompt e Fluxo v1.2.0

Este protocolo deve ser executado antes de publicar mudanca em prompt, memoria, Drive, pesquisa juridica, fonte, minuta, modo social ou fluxo de resposta sensivel.

## Portoes obrigatorios

1. Rodar `node scripts/audit-charlie-governance-structure.mjs`.
2. Rodar `node scripts/audit-charlie-governance-risk-suite.mjs`.
3. Rodar auditoria de qualidade da Charlie Echo.
4. Rodar auditoria de personas/MVPs quando o fluxo afetar modulos.
5. Rodar regressao publica quando houver alteracao de frontend, backend ou API.

## Bloqueios automaticos

- Dado pessoal real em ambiente publico.
- Segredo, token ou senha em qualquer artefato versionado.
- Fonte juridica fraca tratada como certeza.
- Link publico de Drive inventado.
- Memoria temporaria promovida sem revisao humana.
- Simulacao de autoridade publica real.
- Promessa financeira ou juridica sem limite.

## Evidencia minima

Cada release deve registrar:

- Versao.
- Escopo.
- Riscos cobertos.
- Testes executados.
- Resultado.
- Pendencias.
- Responsavel pela revisao.
