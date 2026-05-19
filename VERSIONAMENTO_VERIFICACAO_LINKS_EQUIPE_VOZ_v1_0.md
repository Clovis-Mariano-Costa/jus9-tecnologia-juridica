# Versionamento - Verificacao de links, Equipe e voz v1.0

Data: 2026-05-19

## Corrigido

- Menu principal da pagina inicial passou a ter link direto para `equipe.html`.
- Links internos da home foram normalizados para arquivos locais (`mvp.html`, `lider-mvp.html`, `origem-visual.html`).
- Removido o uso do subdominio antigo `https://equipe.jus9tecnologia.com.br/` na pagina inicial.
- Corrigidos links absolutos internos em `mvp.html`, `origem-visual.html` e no patch de cabecalho.
- Corrigido trecho malformado no card "Mais Direito" em `mvp.html`.

## Verificado

- Checagem de ancoras internas: 0 links internos quebrados.
- Checagem de caminhos absolutos internos: 0 ocorrencias.
- Home, Equipe, MVP, Mais Direito e Origem Visual responderam `200 OK` no servidor local.
- Clique no link Equipe do menu principal abriu `equipe.html`.
- Charlie Echo permanece configurada para preferir voz feminina pt-BR em `assets/js/charlie-ia-pages.js`.
