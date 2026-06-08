# Versionamento - Memoria governada local e configuracoes do usuario

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Escopo

Ampliar a memoria da Charlie Echo e dar mais poder ao usuario no chat.

## Alteracoes

1. Memoria das salas passou de `sessionStorage` para `localStorage`, com migracao automatica da versao anterior.
2. Historico por sala foi ampliado para ate 96 mensagens por padrao, configuravel ate 160.
3. Criado painel `Abrir memoria` com:
   - resumo editavel;
   - decisoes detectadas;
   - pendencias detectadas;
   - exportacao JSON;
   - limpeza da sala.
4. Criado painel `Configuracoes` com:
   - usar ou nao memoria;
   - nivel de detalhe;
   - tom;
   - cautela;
   - formato preferido;
   - limite de mensagens.
5. O contexto enviado para Charlie Echo inclui preferencias do usuario, decisoes, pendencias e historico recente.

## Governanca

A memoria continua local, no navegador do usuario. Ainda nao e memoria de backend, banco ou conta Google.

O usuario pode limpar e exportar a memoria.

Nao foram publicados segredos, tokens, dados reais, cookies ou credenciais.

## Proximo passo

Homologar no chat dedicado e, depois, preparar memoria autenticada por usuario.
