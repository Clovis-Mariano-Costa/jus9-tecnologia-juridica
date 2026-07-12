# Versionamento Charlie Echo - OCR Local Governado

ID: VERSIONAMENTO-CHARLIE-OCR-LOCAL-001
Versao: 1.0.0
Autor: Codex / Charlie Fox
Revisor responsavel: Clovis Mariano da Costa
Data: 2026-07-12
Status: publicado-operacional
Classificacao: PUBLICO-INSTITUCIONAL
Hash: nao-aplicavel-documento-base

## Objetivo

Adicionar OCR local governado aos anexos da Charlie Echo, especialmente para imagem e PDF escaneado, sem persistir o upload e sem tratar OCR como prova final.

## Entregas

- Leitura local de imagens por Tesseract.js carregado sob demanda.
- Leitura das primeiras paginas de PDF escaneado por PDF.js + Tesseract.js carregados sob demanda.
- Limite operacional de 6 MB para OCR local nesta versao.
- Status visivel no painel de anexos durante processamento.
- Contexto de anexos identifica quando a origem foi OCR local governado.
- Painel de saude e auditorias passam a reconhecer OCR local como capacidade ativa.
- Feature flag `flag.ocr.local` e matriz de capacidades atualizadas.

## Limites

- OCR pode trocar letras, numeros, acentos e formatacao.
- Texto extraido por OCR exige revisao humana no arquivo original antes de uso real.
- O pacote nao salva o anexo no Drive e nao cria link publico.
- OCR backend para arquivos maiores, lote e trilha transacional continua no proximo pacote.

## Proximo Pacote

Integrar Drive Saver/DAJ para leitura, salvamento, classificacao e auditoria por documento, mantendo publicacao e revogacao de link publico como acao governada.
