# Padrao de integracao Charlie Echo + DAJ

Data: 2026-07-04

## Objetivo

Usar o DAJ como modelo-mae de integracao entre Charlie Echo e os MVPs da Jus 9. O modulo deve funcionar como dossie vivo: antes de responder, Charlie identifica o ambiente, o dossie ativo, as rotas, o workflow, os limites e o proximo ato util.

## Contrato operacional do DAJ

- Dossie ativo: `DAJ-2026-0001`.
- Rotas: DAJ, clientes/atendimentos, documentos, processos, prazos, agenda, workspace e IA Profissional.
- Ordem de trabalho: objetivo do usuario, fatos, documentos, prazos, riscos, fontes, minuta, Drive Saver e revisao humana.
- Documento juridico: quando o usuario pede peca, minuta, peticao, contrato ou requerimento, Charlie deve produzir rascunho completo com placeholders e checklist.
- Upload: usar somente texto extraido. TXT, PDF textual e DOCX podem ser extraidos; imagem e PDF escaneado tentam OCR local governado sob demanda. Quando nao houver texto extraido, pedir transcricao, OCR melhor ou backend especializado.
- Drive Saver: salvar ou gerar link publico somente quando backend autorizado retornar resultado real. Documento sigiloso vai para guarda restrita/revisao.
- Fontes: Planalto, STF, STJ, TJSC, TST, LexML, BDTD, CAPES, SciELO e Google Academico com cautela.

## Padrao para replicar em outros MVPs

1. Criar contrato do MVP em `mvpIntegrationContracts`.
2. Definir dossie ativo, rotas, workflow, politica de arquivo/Drive, fontes e limite duro.
3. Adicionar painel visual equivalente quando o MVP tiver chat principal.
4. Ajustar prompts guiados para comecarem pelo dossie, nao por protocolo generico.
5. Garantir que a API receba `mvpIntegrationInstruction(code, focus)`.
6. Testar: pergunta operacional, pergunta juridica com fontes, peca completa, upload e salvar no Drive.

## Pacotes seguintes

- Pacote 2: extrator real para PDF/DOCX e OCR local governado para imagem/PDF escaneado.
- Pacote 3: OCR backend/Drive quando autenticado e salvamento governado automatico por classificacao.
- Pacote 4: painel de auditoria do DAJ com historico de documentos salvos.
- Pacote 5: replicacao para DAA, DEJ, DEE, DEJI, DIC, DPJ, DIP, DOI, DGE, DMG, DMP e DAP.
