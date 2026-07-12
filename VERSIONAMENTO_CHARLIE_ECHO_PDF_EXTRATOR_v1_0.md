# VERSIONAMENTO - Charlie Echo PDF Extrator v1.0

## Metadados
- ID: CHARLIE-ECHO-PDF-EXTRATOR-v1.0
- Versao: 1.0.0
- Autor operacional: Codex / Jus 9
- Responsavel por revisao: equipe Jus 9
- Data: 2026-07-12
- Status: implementado e pendente de validacao humana continuada
- Classificacao: governanca tecnica publica

## Objetivo
Adicionar leitura local governada de PDF textual aos anexos da Charlie Echo, sem prometer OCR, DOCX ou leitura de imagem antes do backend extrator.

## Entrega
- Inclusao de `extractPdfTextHeuristic` no frontend publico.
- Identificacao de modo de extracao e confianca no contexto enviado para a Charlie.
- Tratamento explicito para PDF textual, PDF sem texto pesquisavel, DOCX e imagem.
- Atualizacao da interface de anexos para explicar a capacidade real sem excesso de botoes.
- Atualizacao das auditorias locais e publicas para cobrar a nova capacidade.
- Atualizacao do cache publico para `20260712-charlie-pdf-extractor-v1`.
- Atualizacao do service worker para `jus9-pwa-v19-2026-07-12-charlie-pdf-extractor`.

## Limites governados
- A extracao de PDF e heuristica e serve como insumo de analise com cautela.
- PDF escaneado, imagem, audio, video e DOCX exigem OCR, transcricao ou backend extrator.
- A Charlie nao deve afirmar conteudo de anexo sem texto extraido.
- Dados reais e sigilosos continuam sujeitos a revisao humana e ambiente autorizado.

## Proximo pacote recomendado
Implementar backend extrator governado para DOCX, PDF escaneado e OCR, ligado ao Drive Saver e a memoria operacional por usuario.
