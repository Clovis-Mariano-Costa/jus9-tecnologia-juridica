# Versionamento - Menu de Acoes do Chat Charlie Echo

Registrado em: 2026-06-08 08:35:45.02421

## Escopo

Pacote emergencial de ergonomia para a pagina dedicada da Charlie Echo antes do evento.

## Alteracoes

- Substituido o conjunto de botoes grandes de utilidades por um menu compacto "Acoes".
- Mantidas as funcoes existentes: Memoria, Painel, Melhorar resposta, Fontes, Atualizar resumo e Gerar PDF.
- Menu fecha automaticamente ao escolher uma acao ou clicar fora.
- Perguntas guiadas foram ajustadas para ocupar menos espaco na lateral da pagina dedicada.
- CSS da pagina dedicada foi restringido para nao afetar botoes internos dos paineis.

## Validacao

- `node --check script.js`
- `node tests\validate-worker-auth.mjs`
- Confirmado online: `script.js` contem `data-action-menu-toggle` e `chat-action-popover`.
- Confirmado online: `style.css` contem `chat-action-popover` e seletor dedicado do menu.

## Deploy

Worker publicado em 2026-06-08.

Current Version ID: `588d85e1-4ac0-4127-b383-bd1caefcc803`

## Observacao Operacional

Este pacote nao altera OAuth, Agenda, chaves, permissoes ou governanca primeva. E apenas ajuste visual e ergonomico do chat dedicado.
