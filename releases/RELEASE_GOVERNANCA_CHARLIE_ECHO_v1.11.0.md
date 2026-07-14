---
id: JUS9-RELEASE-CHARLIE-GOV-1.11.0
versao: 1.11.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-7f0344c
---

# Release Governanca Charlie Echo v1.11.0

## Correcao

- Salvamento do atendimento retorna comprovante de indice e detalhe persistidos.
- A interface so anuncia sucesso quando o comprovante corresponde ao `dajId` recebido.
- O cadastro de clientes passou a listar `GET /api/dajs`, sem exemplos fixos apresentados como registros.
- O envio para Charlie transporta somente o `dajId` e rele o detalhe no backend autenticado.
- Nome, CPF e contato sao omitidos do prompt automatico por minimizacao.
- Falha de leitura do detalhe interrompe a analise sem recorrer a rascunho local.

## Evidencias

- CI local completa aprovada nos 14 MVPs e no modulo social.
- Regressao autenticada aprovou criacao, recibo, idempotencia, detalhe, vinculo posterior e bloqueios.
- Homologacao tecnica aprovou dois DAJs para a mesma parte, CPF HMAC, auditoria, limpeza e tombstones.
- Producao confirmou health `ready` e release `governanca-1.11.0-daj-backend-handoff-1.0`.
- Readiness confirmou `persistenceReceipt: true` e KV configurado.
- Origem publica confirmou pagina, cliente da lista, handoff backend e ausencia da chave de rascunho local.
- Leitura remota nao mutante confirmou um DAJ ativo com detalhe operacional e sem CPF integral persistido.
- `GET /api/dajs` sem sessao permaneceu bloqueado com `401`.

## Publicacao

- Commit tecnico: `7f0344c`.
- Worker: `eaf0d978-a883-4a81-861f-50be53723b09`.
- Atendimento: `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.
- Cadastro: `https://jus9tecnologia.com.br/app-clientes.html`.
- Charlie: `https://jus9tecnologia.com.br/app-ia-profissional.html`.

## Rollback

- Restaurar Worker `aa60355f-2a15-406e-a3ab-5d7e32162ff2` para voltar a 1.10.1.
- Preservar KV, memoria, auditoria, tombstones e sequencia DAJ.
- Nao remover o DAJ ja confirmado no cadastro durante rollback.

## Aceite humano pendente

- Com a sessao Familia Virtual ainda ativa, abrir o cadastro oficial e confirmar o DAJ visivel.
- Abrir o atendimento pelo registro, conferir o numero e acionar `Enviar DAJ para analise da Charlie Echo`.
- Confirmar que a Charlie inicia uma analise especifica do DAJ, sem resposta generica e sem novo cadastro.
