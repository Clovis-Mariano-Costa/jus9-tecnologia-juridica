---
id: RELEASE-GOVERNANCA-CHARLIE-ECHO-1.20.0
versao: 1.20.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
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

## Validacao executada

- auditor DataJud dedicado: aprovado;
- regressao completa do Worker: aprovada;
- CI local integral: aprovado;
- tipos, startup e dry-run do Wrangler: aprovados;
- health e smoke de producao: `ready` nos dominios oficial e workers.dev;
- readiness: 91 aliases, 120 requisicoes/minuto, 2 tentativas, 2 MB e uso comercial nao autorizado.

## Publicacao

- Commit fonte: `1ccb82a`.
- Release: `governanca-1.20.0-datajud-governado-1.0`.
- Versao ativa do Worker: `ea966e92-6c25-4445-8dbe-393f632a3c68`.
- Consulta a processo real durante o smoke: nao realizada.

## Rollback

Restaurar a release Worker anterior `governanca-1.19.0-charlie-pipeline-governado-1.0`. Nao remover os documentos do Termo nem reativar Basic Auth. Se houver falha no contador, bloquear consultas em vez de operar sem limite.
