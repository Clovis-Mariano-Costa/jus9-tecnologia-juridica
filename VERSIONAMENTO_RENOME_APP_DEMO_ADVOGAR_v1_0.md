# Versionamento - Renome app-demo para app-demo-advogar v1.0

Data: 2026-05-19

## Entregue

- Rota demonstrativa de advocacia renomeada de `app-demo.html` para `app-demo-advogar.html`.
- Referencias internas atualizadas de `app-demo` para `app-demo-advogar`.
- Redirecionamentos Cloudflare Pages adicionados:
  - `/app-demo` -> `/app-demo-advogar`
  - `/app-demo.html` -> `/app-demo-advogar.html`
- Home publicada usada como base para manter compatibilidade visual com a pagina em producao.
- Link `Equipe` inserido imediatamente antes de `Mais Direito` no menu principal da home.

## Regra para proximas atualizacoes

Sempre que uma rota publica for renomeada, verificar:

- arquivo fisico;
- links internos;
- manifest/PWA;
- service worker;
- robots;
- sitemap;
- documentos de versionamento;
- redirecionamento do caminho antigo para o novo;
- teste local com status HTTP 200;
- ausencia de referencias antigas.
