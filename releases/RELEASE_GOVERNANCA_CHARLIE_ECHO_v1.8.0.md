---
id: JUS9-RELEASE-CHARLIE-GOV-1.8.0
versao: 1.8.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: release-candidato
classificacao: INTERNO
hash: pendente-apos-commit
---

# Release Governanca Charlie Echo v1.8.0

## Correcao

- Nome, CPF e DAJ deixam de chamar a API generativa na pagina de Processos.
- A API Charlie reconhece a rota estruturada e falha fechado antes de OpenAI.
- A antiga comparacao de CPF pelos dois ultimos digitos foi removida.
- CPF passa a usar HMAC exato com segredo exclusivo do Worker.
- Pesquisa de partes e autenticada, somente leitura e auditada sem chave pessoal bruta.

## Limite externo

- A API Publica DataJud continua restrita a metadados processuais publicos e nao e usada para nome/CPF.
- O conector externo permanece `awaiting_official_guidance` ate resposta e credenciais oficiais.
- Nenhum resultado externo e simulado durante a espera.

## Reindexacao

- Registros antigos com apenas CPF mascarado precisam receber novamente o CPF por fluxo autorizado.
- O HMAC nao permite reconstruir o CPF e o sistema nao tenta faze-lo.

## Evidencias previstas

- Teste de dois CPFs validos com finais iguais sem colisao.
- Teste de ausencia de mutacao em pesquisa por nome.
- Teste de falha fechada sem segredo HMAC.
- Teste de ausencia de OpenAI e de minuta em rotas estruturadas.

## Rollback

- Restaurar a implantacao 1.7.0 do Worker e a implantacao anterior da Charlie.
- Preservar KVs, segredos, auditoria e memoria; nao apagar o indice durante rollback.

