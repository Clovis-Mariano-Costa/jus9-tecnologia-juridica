# Versionamento Charlie Echo - Diagnostico da API

ID: VERSIONAMENTO-CHARLIE-API-DIAGNOSTICO-001
Versao: 1.0.0
Autor: Codex / Charlie Fox
Revisor responsavel: Clovis Mariano da Costa
Data: 2026-07-12
Status: publicado-operacional
Classificacao: PUBLICO-INSTITUCIONAL
Hash: nao-aplicavel-documento-base

## Objetivo

Evitar que o portal trate toda falha de chamada como "API indisponivel", quando a API pode estar viva e a falha estar ligada a timeout, payload grande, contexto contaminado ou resposta 4xx/5xx.

## Entregas

- Timeout governado na chamada publica para `https://charlieecho.jus9tecnologia.com.br/api/ia`.
- Retry compacto pela propria API quando a chamada completa falha por status recuperavel, timeout ou resposta textual ausente.
- Diagnostico visivel no chat com status/motivo reduzido, sem expor segredo.
- Preservacao da regra API-first: o retry continua consultando a API segura; nao vira fallback local generico.
- Cache PWA atualizado para `jus9-pwa-v23-2026-07-12-charlie-api-diagnostico`.

## Evidencia

Teste direto do endpoint publico retornou HTTP 200 para `fale o que sabe sobre prazos`.
Preflight CORS retornou HTTP 204 com origem permitida.

## Proximo Pacote

Depois de estabilizar a chamada, seguir para historico/auditoria de documentos DAJ por MVP e backend OCR/Drive para arquivos maiores.
