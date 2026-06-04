# Versionamento - Charlie Echo MVPs v4.4.1

Data: 04/06/2026

## Objetivo

Garantir que os 13 MVPs carreguem a versao atual das salas da Charlie Echo, sem ficarem presos em HTML, CSS ou JavaScript antigos pelo cache do PWA.

## Alteracoes

- Cache do service worker atualizado para `jus9-pwa-v4-2026-06-04-charlie-rooms-v4-4-1`.
- `app-ia-*.html`, `script.js` e `style.css` usam estrategia network-first.
- `script.js` pede `registration.update()` ao registrar o service worker.
- Service worker aceita mensagem `SKIP_WAITING`.
- Auditoria local verifica o protocolo anti-cache dos MVPs.

## Validacao esperada

1. Abrir qualquer `app-ia-*.html#chat-ia`.
2. Ver o painel de salas no topo da janela do chat.
3. Fazer uma pergunta.
4. Perguntar `Qual foi minha pergunta anterior?`.
5. Confirmar que a Charlie Echo responde com base na memoria curta da sala.

