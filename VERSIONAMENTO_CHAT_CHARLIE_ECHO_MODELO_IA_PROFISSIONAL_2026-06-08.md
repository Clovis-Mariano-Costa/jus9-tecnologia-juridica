# Versionamento - Chat Charlie Echo modelo da IA Profissional

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Escopo

Primeira versao do modelo de chat dedicado da Charlie Echo para a IA Profissional da Jus 9.

## Alteracoes

1. Criada pagina `app-chat-charlie-echo.html`.
2. Criada rota curta `/chat-charlie`.
3. Atualizada `app-ia-profissional.html` com link para o chat dedicado.
4. Atualizado prompt externo da Charlie Echo para reduzir cabecalhos repetitivos como `Escuta`, `Sentire`, `Leitura do pedido` e `Caminho escolhido`.
5. Mantidos criterios internos de governanca sem exibir todos em toda resposta.
6. Melhorada renderizacao de Markdown simples:
   - negrito;
   - titulos;
   - bullets;
   - links HTTPS clicaveis.
7. Atualizada allowlist de retorno do OAuth para aceitar `app-chat-charlie-echo.html`.

## Governanca

O aviso de MVP permanece, mas deixa de ser repetido em toda resposta. Ele continua obrigatorio quando o pedido envolver dado real, segredo, token, processo real, prazo, documento sensivel ou decisao de risco.

Nenhum segredo, token, cookie, chave, e-mail pessoal ou dado real foi publicado.

## Testes

1. `node --check worker.js`
2. `node --check functions/_shared/oauth.js`
3. `node --check backend/server.js`
4. `node tests/validate-worker-auth.mjs`
