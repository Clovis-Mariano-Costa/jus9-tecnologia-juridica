# Correção de documentos públicos e 404 — 2026-07-30

## Diagnóstico

O código-fonte continha documentos Markdown internos e três exemplos fictícios
em TXT, mas o build público copiava apenas HTML da pasta `documentos`. A Central
Técnica oferecia oito links para Markdown deliberadamente proibido no artefato
de produção; a página de documentos oferecia três downloads TXT que não eram
incluídos no manifesto. Todos esses links retornavam 404.

## Decisão

- Rascunhos e documentos internos Markdown permanecem fora do build público.
- A Central Técnica passa a apresentar somente páginas HTML preparadas para
  consulta pública.
- Os três TXT são exemplos fictícios já sinalizados como demonstração e passam
  a integrar explicitamente o manifesto público.
- Rotas inexistentes continuam retornando status 404, agora com página
  institucional, `noindex` e sem cache.

## Alterações

- `central-tecnica.html`: remove links públicos a rascunhos e documentos
  internos; adota escopo público.
- `scripts/build-portal-dist.mjs`: inclui os três downloads TXT e atualiza a
  contagem fechada do manifesto para 174 arquivos.
- `404.html`: adiciona página institucional de não encontrado.
- `worker.js`: preserva o status 404 e serve o documento institucional.

## Testes obrigatórios

1. `npm test`.
2. `npm run build`.
3. Confirmar 174 arquivos no `dist`.
4. Confirmar os três downloads no `dist/documentos`.
5. Confirmar que não há `.md` nem `.zip` no artefato.
6. Confirmar em produção:
   - `/central-tecnica` = 200;
   - os três TXT = 200;
   - uma rota aleatória = 404 com a página institucional;
   - os Markdown internos continuam 404.

