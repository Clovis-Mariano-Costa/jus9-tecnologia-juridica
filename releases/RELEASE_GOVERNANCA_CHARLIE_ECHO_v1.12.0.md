---
id: JUS9-RELEASE-CHARLIE-GOV-1.12.0
versao: 1.12.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-cd23543
---

# Release Governanca Charlie Echo v1.12.0

## Entregas

- Cada envio de DAJ abre uma sala nova e isolada, sem herdar resposta ou memoria da sala anterior.
- A rota `daj_analise_governada` chega a API central e nao e confundida com consulta por nome, CPF ou DAJ.
- A Charlie analisa o conteudo minimizado do cadastro oficial e nunca usa rascunho local como substituto.
- O resultado fica registrado no historico governado do DAJ.
- O backend devolve ou reencaminha o DAJ segundo perfil de autoria, risco, urgencia e sigilo.
- O autor sempre recebe feedback e o perfil de destino recebe o item em sua caixa de encaminhamentos.
- Perfil de estagio pode criar DAJ, mas permanece sem permissao de auditoria ou consulta processual e recebe supervisao automatica.
- Falhas de analise ou encaminhamento ficam visiveis e nao geram confirmacao presumida.

## Evidencias

- API Charlie Echo: 69 testes aprovados.
- Portal: CI completa aprovada nos 14 MVPs e no modulo social.
- Regressao do Worker aprovou devolucao ao advogado e encaminhamento de estagio para supervisao.
- Producao confirmou `feedbackRequired`, `profileInbox`, `isolatedRoomRequired` e `automaticSupervisionForIntern`.
- Ensaio publico confirmou analise ambiental ficticia sem desvio para consulta processual.
- Nenhum DAJ existente foi criado, atualizado, reanalisado ou encaminhado durante a verificacao publica.

## Publicacao

- Commit tecnico do portal: `cd23543`.
- Commit da API central: `9557903`.
- Worker: `0d910b47-c8f0-442d-80f1-196d5aa5bc09`.
- Atendimento: `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.
- Cadastro e caixa por perfil: `https://jus9tecnologia.com.br/app-clientes.html`.
- Charlie: `https://jus9tecnologia.com.br/app-ia-profissional.html`.

## Rollback

- Restaurar o Worker `eaf0d978-a883-4a81-861f-50be53723b09` para voltar a versao 1.11.0.
- Preservar KV, historicos de analise, caixas por perfil, auditoria, memoria, tombstones e sequencia DAJ.
- Restaurar a API central ao commit `9215b38` somente se a rota governada nova precisar ser desativada.

## Aceite humano pendente

- Enviar um DAJ ficticio autenticado e confirmar sala nova, analise especifica e feedback registrado.
- Conferir o resultado em `Encaminhamentos para meu perfil`.
- Validar com perfil de estagio que o DAJ chega ao assessor ou advogado conforme sigilo e risco.
