# Versionamento - Foco na pergunta atual e memoria da sala

Data: 2026-07-11

## Objetivo

Corrigir o caso em que uma pergunta nova e simples, como "o que e peticao?", era contaminada pela memoria anterior da sala.

## Entregue

- A memoria da sala deixou de entrar automaticamente em toda pergunta.
- A memoria completa agora so entra quando a pergunta pede continuidade, ultima resposta, onde paramos, salvamento de resposta anterior ou contexto explicitamente anterior.
- Perguntas novas, conceituais ou definitorias entram limpas na API, com a regra "responda somente a pergunta atual".
- O prompt da API recebeu regra de foco: `[PERGUNTA ATUAL]` prevalece sobre historico antigo.
- Memorias contaminadas por respostas antigas como "Vou continuar pela memoria governada..." e "API segura indisponivel..." sao filtradas antes de ir para a API.
- Cache busting atualizado para `script.js?v=20260711-foco-pergunta-atual-v1`.

## Teste humano recomendado

Na mesma sala:

1. Perguntar: "fale sobre o direito de propriedade citando fontes".
2. Em seguida perguntar: "o que e peticao?".
3. A Charlie deve responder o conceito de peticao, sem continuar o tema de propriedade e sem despejar memoria antiga do DAJ.

## Regra operacional

API sempre deve ser chamada para resposta comum. Memoria da sala e contexto auxiliar, nao comando principal.
