# Service worker canonico e auditor publico de instalacao

Data: 2026-06-01

## Objetivo

Reduzir o risco de divergencia entre service workers e verificar gratuitamente as portas publicas de instalacao do ecossistema.

## Alteracoes

- Mantido `/service-worker.js` como implementacao canonica da PWA principal.
- Transformado `/sw.js` em ponte legada para preservar instalacoes antigas.
- Atualizado `assets/js/pwa-install.js` para registrar somente o worker canonico.
- Corrigido o fallback offline de arquivos estaticos.
- Criado auditor local das seis paginas publicas de instalacao.
- Integrada validacao local dos QR Codes publicos mantidos em Investimentos.
- Integrado o auditor ao CI local sem custo.

## Escopo atual

Jus 9 e Jus 9 Verde possuem manifest e service worker verificados. Investimentos, Charlie Echo, Carta e Equipe possuem paginas publicas de instalacao verificadas.
