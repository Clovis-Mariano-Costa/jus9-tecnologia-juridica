# Versionamento - Charlie Echo qualidade de resposta v4.2

Data: 2026-06-04

## Objetivo

Melhorar a confianca operacional da Charlie Echo nos MVPs publicos, com foco em continuidade da sala, resposta por intencao, ferramentas de melhoria e verificacao publica.

## Alteracoes

- Corrigida resposta local para perguntas como "Qual foi minha pergunta anterior?" usando a memoria curta da sala antes da API.
- Adicionados botoes nos chats MVP:
  - Melhorar resposta;
  - Transformar em pacote;
  - Qual foi minha pergunta anterior?
- Criada pagina `saude-charlie-echo.html` com painel publico simples de saude operacional.
- Criada pagina `manual-charlie-echo.html` com manual curto para conversar melhor com Charlie Echo.
- Adicionados links de menu para Saude Charlie e Manual Charlie.
- Criada auditoria local `scripts/audit-charlie-echo-quality.mjs`.

## Limites

- A memoria continua local e por sala, sem persistencia por usuario.
- A persistencia real por usuario, dispositivo, datas e banco de dados fica para o pacote futuro agendado.
- Nenhum dado real deve ser inserido nos ambientes demonstrativos publicos.

## Teste principal

No chat MVP, perguntar algo e depois perguntar: "Qual foi minha pergunta anterior?".

© Jus 9 Tecnologia Juridica - Charlie Echo da Costa com governanca humana.
