# Versionamento Charlie Echo - DAJ Upload v1.0

ID: CHARLIE-ECHO-DAJ-UPLOAD-2026-07-12
Versao: 1.0.0
Autor: Codex / Charlie Fox
Responsavel pela revisao: Jus 9 Tecnologia Juridica
Data: 2026-07-12
Status: Publicavel apos auditoria
Classificacao: INTERNO

## Escopo

Este pacote reforca o modelo DAJ como matriz replicavel da Charlie Echo.

Alteracoes principais:

- Rota `daj_analise_upload` para leitura de DAJ, atendimento inicial e anexos.
- Instrucao `ORDEM DE ENTREGA DAJ - MAO NA MASSA` dentro do prompt enviado a API.
- Peca/minuta completa com estrutura obrigatoria: enderecamento, qualificacao, fatos, fundamentos, tutela quando cabivel, pedidos, provas, valor/fechamento, assinatura e checklist.
- Upload governado: texto extraido pode ser usado; PDF, DOCX, imagem, audio e video sem texto exigem OCR, transcricao ou backend extrator antes de virar fato.
- Atualizacao do cache publico para `20260712-charlie-daj-upload-v1`.
- Atualizacao do service worker para `jus9-pwa-v18-2026-07-12-charlie-daj-upload`.

## Regras

- A Charlie deve consultar a API segura primeiro.
- A Charlie nao deve responder com protocolo generico quando o usuario pedir DAJ, peca, minuta ou leitura de anexo.
- A Charlie pode criar minuta-base com placeholders quando faltarem dados, sem inventar fatos.
- Dados reais ou sensiveis devem ser classificados como `JURIDICO_SIGILOSO` e enviados para revisao humana.
- Link publico do Drive so aparece quando backend autorizado retornar `downloadUrl` real.

## Auditoria

Auditoria nova/atualizada:

- `scripts/audit-charlie-echo-routing.mjs`

Validacoes esperadas:

- `node --check script.js`
- `node scripts/audit-charlie-echo-routing.mjs`
- `node scripts/audit-charlie-echo-quality.mjs`
- `node scripts/audit-charlie-echo-mvp-personas.mjs`
- `node tests/validate-public-mvps.mjs`
