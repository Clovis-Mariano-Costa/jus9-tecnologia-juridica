# Versionamento Charlie Echo - Card DAJ/Drive Saver

ID: VERSIONAMENTO-CHARLIE-DRIVE-DAJ-CARD-001
Versao: 1.0.0
Autor: Codex / Charlie Fox
Revisor responsavel: Clovis Mariano da Costa
Data: 2026-07-12
Status: publicado-operacional
Classificacao: PUBLICO-INSTITUCIONAL
Hash: nao-aplicavel-documento-base

## Objetivo

Fechar o circuito visual entre a resposta inteligente da Charlie Echo, o artefato DAJ/documental produzido pela API e o Drive Saver/Cartorio Digital.

## Entregas

- O card do Drive aparece tambem quando a API retorna `artifact` com decisao governada, mesmo antes de existir `driveSaver`.
- O card mostra classificacao, destino, revisao humana e regra de link publico.
- Quando o Drive Saver retorna `downloadUrl`, `viewUrl` ou `auditUrl`, o card exibe apenas links reais e seguros do Google.
- Quando o Drive nao foi acionado, o card explica se ficou em download local ou aguardando backend autorizado.
- Painel de saude atualizado para pacote v5.7.

## Limites

- O portal nao recebe segredo, token ou chave do Drive Saver.
- Link publico continua condicionado a `downloadUrl` real retornada por backend autorizado.
- Documento sigiloso ou interno pode ser salvo sem link publico, conforme classificacao.

## Proximo Pacote

Ampliar backend OCR/Drive para arquivos maiores, historico de documentos do DAJ e painel de auditoria por MVP.
