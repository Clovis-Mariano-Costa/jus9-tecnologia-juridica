# Versionamento - Charlie Echo sempre consulta API

Data: 2026-07-11

## Objetivo

Garantir que as respostas comuns da Charlie Echo no chat passem sempre pela API segura, evitando respostas locais antigas, fixas ou contaminadas por protocolos anteriores.

## Entregue

- Removido o atalho local no envio normal do chat.
- Perguntas sobre fontes, doutrina, Drive Saver, identidade, continuidade e documentos agora passam por `askCharlieApiPayload`.
- Em falha da API, a interface mostra erro claro e nao substitui por resposta local.
- Botao "Melhorar resposta" consulta API e nao gera versao local em caso de erro.
- Botao "Fontes" consulta API e nao usa lista local fixa.
- Botao "Drive Saver" consulta API antes de gerar pacote local auxiliar.
- Botao "Atualizar resumo" consulta API para gerar a resposta textual.
- Cache busting atualizado para `script.js?v=20260711-api-sempre-v1`.

## Mantido

- Acoes de interface continuam locais quando nao sao resposta substantiva: limpar memoria, exportar JSON, gerar PDF/texto local e organizar sala.
- Downloads locais continuam sendo gerados pelo navegador depois de resposta da API quando o pedido envolver documento/minuta/download.

## Regra operacional

Se a API segura estiver indisponivel, Charlie deve dizer que nao conseguiu consultar a API e pedir nova tentativa. Ela nao deve responder com fallback local substantivo.

## Proximo passo

Validar em producao com uma pergunta juridica simples, por exemplo: "Fale sobre direito de propriedade citando fontes", e confirmar no navegador que aparece "Consultando API segura da Charlie Echo..." antes da resposta.
