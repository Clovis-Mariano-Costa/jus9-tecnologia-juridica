# Versionamento - Gateway CNJ DataJud Tribunais v1.0

Data: 2026-07-12
Autor: Charlie Fox / Codex
Status: implementado para homologacao
Classificacao: publico tecnico

## Objetivo

Implantar a primeira camada de integracao governada entre a Jus 9, Charlie Echo e a API Publica do CNJ/DataJud, em modo leitura, sem peticionamento e sem exposicao de credenciais no frontend.

## Fonte oficial

- CNJ/DataJud API Publica: https://www.cnj.jus.br/sistemas/datajud/api-publica/
- Tutorial CNJ DataJud: https://www.cnj.jus.br/wp-content/uploads/2023/05/tutorial-api-publica-datajud-beta.pdf

## Entregas

- Modulo compartilhado `functions/_shared/datajud.js`.
- Endpoint publico de status: `GET /api/tribunais/datajud/status`.
- Endpoint interno de busca: `POST /api/tribunais/datajud/search`.
- Autenticacao interna por `JUS9_TRIBUNAIS_GATEWAY_TOKEN`.
- Suporte a `DATAJUD_API_KEY` e, como legado, `DATAJUD_USERNAME`/`DATAJUD_PASSWORD`.
- Normalizacao de metadados: numero CNJ, tribunal, classe, assuntos, orgao julgador e movimentacoes.
- Remocao de campos brutos de partes e preservacao de limites LGPD.

## Limites

- Somente leitura de metadados, capas e movimentacoes publicas.
- Nao acessa processo sigiloso, inteiro teor protegido, senha de advogado ou area autenticada de tribunal.
- Nao faz peticionamento, protocolo, juntada, ciencia, assinatura ou ato processual.
- Uso real exige conferencia no tribunal competente e revisao humana qualificada.

## Proximos passos

- Configurar secrets no Cloudflare: `JUS9_TRIBUNAIS_GATEWAY_TOKEN` e `DATAJUD_API_KEY`.
- Conectar Charlie Echo ao gateway via chamada server-to-server.
- Criar painel DAJ para consulta CNJ/DataJud com historico governado.
- Expandir conectores por tribunal apenas quando houver fonte oficial e regra de uso.

## Validacao

- `node --check worker.js`
- `node tests/validate-worker-auth.mjs`
- `npx wrangler deploy --dry-run`
