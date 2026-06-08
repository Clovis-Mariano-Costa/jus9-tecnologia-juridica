# Versionamento - replicacao do script de chat nos MVPs

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Escopo

Propagacao do novo padrao de resposta limpa da Charlie Echo para as paginas `app*.html`.

## Alteracao

O `src` do `script.js` foi atualizado mecanicamente para:

`script.js?v=20260608-chat-modelo-v1`

## Motivo

Evitar que paginas de MVP continuem usando cache antigo com respostas repetitivas e renderizacao visual anterior.

## Limites

Nao houve mudanca individual de conteudo, texto, paleta ou personalidade ambiental de cada MVP nesta etapa. A alteracao foi apenas o apontamento para a versao nova do script compartilhado.

## Teste

Rodar regressao do Worker e conferir URLs publicas criticas.
