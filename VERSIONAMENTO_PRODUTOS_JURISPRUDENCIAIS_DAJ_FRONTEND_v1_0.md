# Versionamento - Produtos Jurisprudenciais DAJ no Frontend v1.0

Data: 2026-07-12

## Objetivo

Conectar a interface do DAJ/IA Profissional aos produtos jurisprudenciais governados da Charlie Echo, usando a API publica ja validada em producao.

## Entrega

- Atalho visivel "Jurisprudencia DAJ" no contrato DAJ da pagina `app-ia-profissional.html`.
- Atalho "Jurisprudencia DAJ" na pagina `app-daj.html`, abrindo o chat com prompt pronto.
- Painel recolhido de "Jurisprudencia governada DAJ" dentro do hub de configuracoes/ferramentas da Charlie.
- Tres comandos operacionais:
  - Argumento com precedente.
  - Checklist probatorio.
  - Quadro comparativo.
- Cache-bust do script compartilhado para `script.js?v=20260712-jurisprudencia-daj-v1`.

## Governanca

O fluxo usa fontes conferidas e nao transforma pesquisa generica em resposta fixa. Quando houver pedido de arquivo/download, a API da Charlie deve classificar o produto e acionar Drive Saver apenas dentro das regras governadas.

## Replicacao

Depois de aprovado no DAJ, o mesmo modelo pode ser replicado por MVP:

1. Identificar o repertorio confiavel do modulo.
2. Criar prompts de produto adequados ao instrumento.
3. Inserir comandos no hub recolhido, evitando excesso de botoes visiveis.
4. Manter um atalho curto no painel principal do MVP.
5. Atualizar auditoria local e regressao publica.

