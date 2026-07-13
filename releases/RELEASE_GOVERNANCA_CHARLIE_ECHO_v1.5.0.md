# Release Governanca Charlie Echo v1.5.0

- ID: JUS9-RELEASE-CHARLIE-GOV-1.5.0
- Versao: 1.5.0
- Autor: Codex / Charlie Fox, sob direcao do Fundador
- Responsavel pela revisao: Fundador da Jus 9 Tecnologia Juridica
- Data: 2026-07-13
- Status: homologacao tecnica concluida
- Classificacao: INTERNO

## Entrega

- Proxy same-origin `/api/charlie/respond` entre o portal e a API Charlie Echo.
- Resposta publica preservada; efeitos no Drive exigem sessao com `drive:write` e segredo interno.
- `requestId` estavel em repeticoes da API e idempotencia preparada no Drive Saver.
- Timeout governado do Drive Saver e retorno sem promessa falsa de execucao.
- Memoria oficial `user-memory-v2` com prazo configuravel de revisao e sem exclusao automatica.
- Cache PWA renovado para retirar a chamada direta antiga da API.

## Verificacao

- Regressao do Worker, 14 MVPs e auditoria da Charlie Echo.
- Regressao da API Charlie Echo com resposta publica sem escrita e escrita autorizada simulada.
- Apps Script verificado estaticamente quanto a acoes corretivas, auditoria e idempotencia.

## Ativacao e rollback

- Ativacao: configurar o mesmo `JUS9_CHARLIE_INTERNAL_TOKEN` no Worker do portal e no Pages da Charlie Echo.
- Apps Script: publicar nova versao do `Code.gs` para ativar idempotencia no Google Drive.
- Rollback: restaurar a release 1.4.0 do portal e a implantacao Pages anterior; nunca remover o controle de chave interna do Drive Saver.
