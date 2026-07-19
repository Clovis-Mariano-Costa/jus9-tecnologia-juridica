---
id: REL-CHARLIE-ECHO-1-18-0
versao: 1.18.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: release-candidata
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.18.0 - Proveniencia auditavel da Charlie

## Escopo

Concluir o G1 do cronograma focado em Charlie, governanca, CNJ e conexoes, tornando identificavel a origem tecnica de cada resposta.

## Entregas

- Charlie Core contrato `1.1.0`.
- Origens canonicas: `upstream`, `correcao_upstream` e `fallback_governado`.
- Cabecalhos `X-Jus9-Charlie-Source`, `X-Jus9-Charlie-Contract-Version` e `X-Jus9-Charlie-Audit-Id`.
- Metadados no corpo da rota DAJ validada ou recuperada.
- Proveniencia visivel na interface; fallback local demonstrativo fica explicitamente distinguido da API.
- Regressao automatizada para resposta normal, retry corretivo e fallback DAJ.

## Limites

- Nao ativa Drive, memoria, DataJud ou PDPJ-Br.
- O `auditId` correlaciona a resposta, mas nao substitui o evento persistente de auditoria que sera consolidado no proximo gate.
- Respostas gerais continuam em streaming e declaram proveniencia nos cabecalhos; a rota DAJ continua materializando apenas o corpo necessario para validar o laudo.

## Rollback

Restaurar a release `1.17.2` do Worker e dos assets. Preservar KVs, segredos, tombstones e trilhas de auditoria.
