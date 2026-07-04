# Versionamento - Pecas completas e upload local Charlie Echo v1.0

Data: 2026-07-04

## Objetivo

Ensinar a Charlie Echo, no modulo profissional, a tratar pedidos de peca/minuta completa como producao documental inteira, e nao como pesquisa de doutrina ou jurisprudencia.

## Implementado

- Detector de pedido de peca juridica completa.
- Rota normativa propria: Prioritario > Principios > Constituicao > Lei de Pecas e Minutas > Regimento do ambiente > Protocolo de peca completa e upload governado.
- Prompt da API instruido a produzir minuta inteira com enderecamento, qualificacao, fatos, direito, tutela provisoria quando cabivel, pedidos, provas, valor da causa, fechamento e checklist.
- Fallback local com minuta demonstrativa completa, incluindo fluxo especifico para alimentos/revisional de alimentos.
- Upload local governado no chat.
- Leitura local de arquivos textuais: TXT, MD, CSV, JSON, HTML, XML, RTF e formatos textuais equivalentes.
- Aceite de PDF, DOC, DOCX e imagens como anexos com metadados, sem falsa leitura de conteudo.
- Download local automatico em PDF/TXT quando houver peca/minuta completa.
- Auditoria atualizada para proteger upload, peca completa e download local.

## Limites

- O upload ainda nao envia arquivo para backend nem Google Drive.
- PDF/DOCX/imagem ainda nao possuem extracao textual confiavel no frontend.
- Conteudo real, dados pessoais, menores, familia, saude, processo real e sigilo devem permanecer sob revisao humana e ambiente governado.

## Proximo pacote

Conectar extrator governado de PDF/DOCX/OCR e, depois, opcionalmente salvar minuta no Drive Saver com auditoria.
