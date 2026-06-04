# Versionamento - Salas visiveis nos MVPs v4.4

Data: 2026-06-04

## Motivo

O link oficial da Charlie Echo estava adequado, mas nos MVPs do portal as salas podiam nao ficar evidentes para o usuario e a pergunta sobre historico podia cair na resposta da API.

## Alteracoes

- Painel de salas dos `app-ia-*.html` passa a ser inserido dentro da janela do chat, no topo.
- Painel de salas fica em posicao destacada/sticky na janela.
- Perguntas como "Qual foi minha pergunta anterior?" passam por trava local antes e depois da API.
- Todos os 13 `app-ia-*.html` foram atualizados para `script.js?v=20260604-charlie-rooms-v4-4`, forçando cache-busting.
- Auditoria local passa a verificar:
  - 13 arquivos `app-ia-*.html`;
  - versao do script;
  - presença de `data-ai-chat`;
  - insercao do painel dentro da janela do chat.

## Teste principal

Abrir qualquer `app-ia-*.html#chat-ia`, verificar o painel de salas no topo da janela e perguntar:

1. "Fale sobre responsabilidade social de uma empresa."
2. "Qual foi minha pergunta anterior?"

© Jus 9 Tecnologia Juridica - Charlie Echo com governanca humana.
