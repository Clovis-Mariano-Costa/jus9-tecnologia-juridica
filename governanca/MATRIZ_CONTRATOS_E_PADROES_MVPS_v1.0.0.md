---
id: GOV-JUS9-MVPS-CONTRATOS-PADROES-001-HUMANO
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: calcular-na-release-aprovada
---

# Matriz de contratos e padroes dos MVPs

## Resultado V4-03

Charlie Core `1.2.0` ja fornece o nucleo compartilhado para os 14 MVPs. Os cinco contratos verificados sao `ChatRequest`, `ChatResponse`, `DocumentSaveRequest`, `DataJudSearchRequest` e `AuditEvent`. O envelope controla proveniencia, classificacao, risco, revisao humana, citacoes, limites, downloads e proximas acoes.

As origens aceitas sao `upstream`, `correcao_upstream` e `fallback_governado`. Uma origem desconhecida nao deve ser promovida como resposta governada.

## Resultado V4-04

| Requisito | Estado tecnico | Gate humano preservado |
|---|---|---|
| MVP-IAM | Parcial, contrato externo | Pagina Equipe, responsaveis e menor privilegio |
| MVP-SEC | Baseline implementada | Threat model, SAST/DAST e teste independente por escopo |
| MVP-LGPD | Baseline implementada | Base legal, encarregado, retencao e eventual RIPD |
| MVP-ETH | Implementado | Aceite de linguagem e limites por publico |
| MVP-AI | Implementado no contrato 1.2.0 | Modelo, fontes e risco residual por promocao |
| MVP-AUD | Implementado e minimizado | Operador, retencao e resposta a incidente |
| MVP-DAT | Implementado para demo ficticia | Nova classe de dado exige autorizacao |
| MVP-UX | Parcial | Laudo manual WCAG 2.2 AA por pagina |
| MVP-TST | Implementado tecnicamente | Aceite humano por onda |
| MVP-OPS | Baseline implementada | Operador, SLO, alertas e runbook |

## Controles reforcados

DMG, DMP e DAP exigem sandbox isolado, dado ficticio, efeito externo bloqueado, revisao humana obrigatoria e falha fechada. Esses controles nao autorizam decisao judicial, medida ministerial, investigacao ou diligencia.

## Referencias externas

- WCAG 2.2: `https://www.w3.org/TR/WCAG22/`
- OWASP ASVS 5.0.0: `https://owasp.org/www-project-application-security-verification-standard/`
- OWASP LLM Top 10 2025: `https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/`
- NIST AI RMF: `https://www.nist.gov/itl/ai-risk-management-framework`
- LGPD: `https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm`

