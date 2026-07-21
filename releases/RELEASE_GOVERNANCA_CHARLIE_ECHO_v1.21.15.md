---
id: REL-GOV-CHARLIE-1.21.15
versao: 1.21.15
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: publicado-validado
classificacao: PUBLICO-INSTITUCIONAL
runtime_alterado: true
hash: calcular-na-release-aprovada
---

# Release v1.21.15 - API de estado governado da Charlie

## Entrega

- nova rota publica `GET /api/governance/charlie/capabilities`;
- contrato OpenAPI 3.1 versionado;
- estado minimizado de G6C2, DataJud, PDPJ e canal institucional CNJ;
- efeitos proibidos declarados de forma verificavel;
- `405` para escrita, `no-store` e identificador de correlacao por requisicao;
- cronograma Charlie/CNJ atualizado para v2.0.0;
- pagina Build Week e versionamento publico atualizados para portal 5.19.

## Limites preservados

Nenhuma permissao foi ampliada. Nenhuma credencial, sessao, e-mail, CPF, dado processual ou segredo e exposto. DataJud permanece somente leitura por numero CNJ. PDPJ permanece `READINESS_ONLY`. O CNJ ainda nao respondeu e silencio nao autoriza conexao ou efeito.

## Rollback

Retornar a release operacional 1.21.13 e o cache PWA v53, removendo apenas a rota G6C3. Nenhum dado persistente depende desta API.

## Publicacao e evidencia

- PR integrado: `#9`;
- commit de merge: `d7cb2175feb0544ccbfb987ec1c1b5e4d8af1cbe`;
- Workers Build: `c85e6371-2973-48fe-8975-390327527c1c` (`SUCCESS`);
- deployment de producao: `65182c10-c7a0-4f60-9d7a-b980db8d6c02`;
- versao Cloudflare: `dda51a41-d335-4f79-a903-c61df72105ce`;
- validacao online em 21/07/2026 as 18:42 BRT: endpoint, pagina Build Week e versionamento responderam `200` com a release 1.21.15.
