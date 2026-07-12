# Versionamento Charlie Echo - Backend Extrator v1.0

## Metadados
- ID: VER-CHARLIE-BACKEND-EXTRATOR-001
- Versao: 1.0.0
- Data: 2026-07-12
- Autor: Codex / Charlie Fox
- Revisor responsavel: Clovis Mariano da Costa
- Status: rascunho operacional publicado
- Classificacao: PUBLICO-INSTITUCIONAL

## Objetivo
Ativar um extrator governado de anexos no backend da Charlie Echo para TXT, PDF textual e DOCX, sem gravar o upload e sem gerar link inventado.

## Entregas
- Rota `POST /api/attachments/extract` no Worker.
- Leitura temporaria limitada a 3 arquivos, 2 MB por arquivo e 24.000 caracteres por resposta.
- Extracao governada de TXT, PDF textual e DOCX.
- Frontend dos modulos Charlie chamando o backend para DOCX e como fallback de PDF.
- Cache publico atualizado para `20260712-charlie-backend-extractor-v1`.
- Service worker atualizado para `jus9-pwa-v20-2026-07-12-charlie-backend-extractor`.
- Contrato de backend, feature flags, modelo de evento e casos de teste atualizados.

## Limites
- PDF escaneado e imagens ainda exigem OCR ou transcricao.
- Upload nao e salvo automaticamente no Drive por esta rota.
- A resposta deve usar somente texto extraido; quando nao houver texto, a Charlie deve reconhecer o anexo e pedir OCR/transcricao.

## Auditoria
- Evento previsto: `attachment.extracted`.
- Classificacao de saida: `UPLOAD_TEMPORARIO_GOVERNADO`.
- Armazenamento declarado: `nao_salvo`.
- Retencao: `somente_resposta_atual`.

## Proximo Pacote
1. OCR governado para PDF escaneado e imagem.
2. Salvar no Drive com consentimento, classificacao e evento.
3. Leitura de DAJ salvo no Drive pela Charlie Echo.
4. Painel por usuario para preferencias, memoria e permissoes por MVP.
