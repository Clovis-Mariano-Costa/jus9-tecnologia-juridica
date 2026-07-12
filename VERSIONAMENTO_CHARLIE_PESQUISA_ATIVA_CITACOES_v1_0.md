# Versionamento - Charlie Pesquisa Ativa de Citacoes v1.0

Data: 2026-07-12
Autor: Charlie Fox / Codex
Status: implementado
Classificacao: publico tecnico

## Objetivo

Padronizar o portal Jus 9 para reconhecer pedidos de citacao, doutrina e pagina como rota propria da Charlie Echo, encaminhando a API para pesquisa ativa em vez de resposta generica com lista de fontes.

## Entregas

- Detector `asksActiveLegalCitationResearch`.
- Instrucao `activeLegalCitationInstruction` enviada no payload da API.
- Rota `pesquisa_citacao_doutrinaria_ativa` no orquestrador do chat.
- Cache-bust `20260712-charlie-pesquisa-ativa-v1`.
- Service worker `jus9-pwa-v24-2026-07-12-charlie-pesquisa-ativa`.
- Pagina de saude atualizada para `Ativos v5.8`.

## Regra operacional

Quando o usuario pedir citacao, doutrina com pagina, obra, autor, fonte verificavel ou trecho literal, a Charlie deve:

- tentar consultar fonte via API/backend quando houver tema minimo;
- responder com sintese, URL, fonte, pagina quando verificavel e limite de uso;
- pedir recorte curto quando faltar tema, obra, autor ou arquivo;
- nunca inventar autor, obra, pagina, julgado ou trecho literal.

## Validacao

- `node --check script.js`
- `node scripts/audit-charlie-echo-routing.mjs`
- `node scripts/audit-charlie-echo-quality.mjs`
- `node scripts/audit-charlie-echo-mvp-personas.mjs`
- `node tests/validate-public-mvps.mjs`

