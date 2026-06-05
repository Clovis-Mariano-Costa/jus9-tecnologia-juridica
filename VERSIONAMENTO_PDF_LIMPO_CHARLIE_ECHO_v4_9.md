# Versionamento - PDF limpo Charlie Echo v4.9

Data: 05/06/2026

## Objetivo

Corrigir a aparencia real do PDF gerado pela Charlie Echo, especialmente letras espacadas, acentos quebrados e blocos de texto pouco legiveis.

## Alteracoes

- Texto do PDF passa a usar string literal PDF compativel com fontes base.
- Conteudo e normalizado para evitar quebra visual em acentos e caracteres especiais.
- Cartao de informacoes quebra linhas longas corretamente.
- Historico recente ganhou blocos visuais alternados:
  - Usuario em azul claro;
  - Charlie Echo em dourado claro.
- Fundo e rodape passam a ser consistentes em todas as paginas.

## Mantido

- Geracao local via `Blob`.
- Link clicavel `Baixar PDF` dentro do chat.
- Sem backend e sem envio de dados ao servidor.

