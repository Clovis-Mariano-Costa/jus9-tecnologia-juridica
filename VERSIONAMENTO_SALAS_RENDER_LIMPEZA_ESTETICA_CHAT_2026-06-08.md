# Versionamento - Salas, limpeza e estetica inicial do chat

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Problema

A troca de sala alterava o estado local, mas a janela do chat continuava exibindo o historico da sala anterior.

O comando `Limpar sala` apagava a memoria, mas a mensagem de confirmacao era salva novamente, dando a impressao de que a sala nao limpava.

## Correcoes

1. Criada renderizacao central da sala ativa.
2. Trocar, criar, renomear, arquivar ou excluir sala atualiza a janela do chat.
3. `Limpar sala` agora apaga a memoria, renderiza a sala limpa e mostra confirmacao sem salvar essa confirmacao na memoria.
4. A mensagem visual de sala vazia e removida quando o usuario envia a primeira pergunta.
5. Primeiro polimento estetico no chat dedicado:
   - painel de salas mais limpo;
   - sala ativa mais evidente;
   - bolhas de usuario e Charlie mais legiveis;
   - janela de conversa mais organizada.

## Limite

Esta etapa nao cria ainda sidebar completa no estilo ChatGPT. Ela corrige o comportamento e prepara a proxima evolucao visual.
