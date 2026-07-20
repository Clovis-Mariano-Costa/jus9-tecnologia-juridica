---
id: RELEASE-GOVERNANCA-CHARLIE-ECHO-1.20.0
versao: 1.20.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: preparada-para-publicacao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Release 1.20.0 - DataJud governado

## Entrega

- Allowlist sincronizada com os 91 endpoints oficiais do DataJud.
- Autenticacao upstream restrita a APIKey.
- Cache obrigatorio e falha fechada sem contador.
- Teto global de 120 requisicoes por minuto por chave, contado por tentativa.
- Timeout total, no maximo duas tentativas, `Retry-After` e backoff limitado.
- Resposta upstream limitada a 2 MB e campos solicitados minimizados.
- Auditoria sem numero processual ou hash do numero.
- Termo de Uso v1.2 registrado com bloqueio de alegacao comercial.

## Limites preservados

- Somente metadados de processos publicos por numero CNJ.
- Nome e CPF nao sao enviados a API Publica.
- Nenhum ato processual, PDPJ, MNI, Domicilio ou peticionamento foi habilitado.
- Nenhuma ampliacao de Drive ou memoria foi realizada.

## Validacao planejada

- auditor DataJud dedicado;
- regressao completa do Worker;
- CI local integral;
- dry-run do Wrangler;
- health e smoke de producao apos publicacao.

## Rollback

Restaurar a release Worker anterior `governanca-1.19.0-charlie-pipeline-governado-1.0`. Nao remover os documentos do Termo nem reativar Basic Auth. Se houver falha no contador, bloquear consultas em vez de operar sem limite.
