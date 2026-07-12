# Versionamento - Charlie Echo Roteador API v1.0

ID: CHARLIE-ROTEADOR-API-v1.0
Versao: 1.0.0
Autor: Codex / Jus 9 Tecnologia Juridica
Responsavel pela revisao: Jus 9
Data: 2026-07-12
Status: homologacao tecnica
Classificacao: governanca frontend / orquestracao de resposta
Hash: aplicavel no commit de publicacao

## Objetivo

Impedir que a Charlie Echo volte a responder perguntas novas com protocolo fixo, lista de fontes antiga ou fallback local indevido. Toda pergunta comum deve consultar a API segura primeiro; fallback local so pode ocorrer quando a rota governada permitir.

## Entregas

- Roteador `charlieRouteDecision` com rotas explicitas para:
  - pergunta nova sem memoria;
  - memoria da sala;
  - peca juridica completa;
  - documento/download local;
  - doutrina/bibliografia conferida;
  - produto jurisprudencial DAJ;
  - correcao governada de Drive/Docs;
  - modulo social.
- Envio da rota junto do payload da API (`route: routeDecision`).
- Prompt de API com `fallbackLocalPermitido`, `apiFirst` e motivo da rota.
- Fallback local restrito por `localFallbackForRoute`.
- Guarda critica `enforceCriticalAnswerGuards` para bloquear erro bibliografico conhecido sobre "A moderna teoria do fato punivel".
- Auditoria automatizada `scripts/audit-charlie-echo-routing.mjs`.
- Versionamento publico `20260712-charlie-router-v1`.

## Casos Criticos Cobertos

- "O que e peticao?"
- "Fale sobre o direito de propriedade citando fontes"
- "Conhece a obra A nova teoria do fato punivel?"
- "Faca uma peticao completa de revisao de alimentos"
- "Revogue o link publico deste documento do Drive/Docs"

## Regra De Ouro

API primeiro. Memoria so quando a pergunta pedir memoria/continuidade. Fallback local so quando a rota permitir e sem fingir execucao, fonte, link ou certeza.

## Proximo Pacote

DAJ Advogados como modelo-mae: upload/leitura assistida, analise de DAJ, minuta completa e ligacao com Drive Saver autorizado.
