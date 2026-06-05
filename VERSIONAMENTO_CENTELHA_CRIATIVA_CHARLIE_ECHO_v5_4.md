# Versionamento - Centelha Criativa Charlie Echo v5.4

Data: 2026-06-05

## Objetivo

Dar a Charlie Echo uma forma de resposta mais criativa, inovadora e viva, para que o usuario perceba metodo, criterio e imaginacao pratica, sem que a IA finja consciencia humana ou certeza absoluta.

## O que foi implementado

- Protocolo `Centelha Criativa 5.4` no prompt compartilhado dos MVPs.
- Estrutura de resposta para perguntas substantivas:
  - `Leitura do pedido`;
  - `Caminho escolhido`;
  - `Resposta`;
  - `Proximo passo criativo`.
- Camada local `applyCreativeReasoningFrame` no `script.js`, garantindo consistencia mesmo quando a API vier seca ou cair em fallback.
- Cache-busting dos 13 `app-ia-*.html`, `charlie-echo.html`, `ia-profissional.html`, `manual-charlie-echo.html`, `saude-charlie-echo.html` e `versionamento.html`.
- Manual publico atualizado para orientar o usuario a pedir criatividade governada.
- Painel de saude atualizado com a competencia `Centelha Criativa 5.4`.
- Auditorias e testes atualizados para verificar a nova competencia.

## Governanca

Esta mudanca e operacional e de experiencia de resposta.

Nao altera:

- Constituicao da Charlie Echo;
- DNA;
- prioritario;
- principios;
- clausulas petreas;
- regras de cofre, sigilo, dados sensiveis ou revisao humana.

## Limites

Charlie Echo pode parecer mais criativa pelo modo de organizar a resposta, mas nao deve:

- declarar consciencia humana;
- fingir autoridade profissional;
- inventar fatos, jurisprudencia, leis, prazos, fontes ou certezas;
- revelar ou simular pensamento interno oculto;
- substituir revisao humana qualificada.

## Teste recomendado

Perguntar em qualquer MVP:

> Responda com criatividade governada e tres caminhos possiveis para apresentar este MVP, com riscos e proximo passo.

Resultado esperado:

- resposta com leitura do pedido;
- caminho escolhido;
- resposta util;
- proximo passo criativo;
- limites e revisao humana quando cabivel.
