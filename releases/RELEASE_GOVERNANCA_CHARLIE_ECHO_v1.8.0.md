---
id: JUS9-RELEASE-CHARLIE-GOV-1.8.0
versao: 1.8.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: publicado-em-homologacao
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

## Evidencias de publicacao

- Teste de dois CPFs validos com finais iguais sem colisao.
- Teste de ausencia de mutacao em pesquisa por nome.
- Teste de falha fechada sem segredo HMAC.
- Teste de ausencia de OpenAI e de minuta em rotas estruturadas.
- Commit do portal: `554b387`.
- Commit da Charlie Echo: `9215b38`.
- Worker do portal: `d1a2ce54-e046-416b-9f79-b629ab4073fe`.
- Cloudflare Pages da Charlie: `85f416d3-03a7-4661-871d-97fd4e77a94e`.
- Health: release `governanca-1.8.0-pesquisa-partes-fail-closed-1.0`, estado `ready`.
- Producao: rota de readiness confirmou nome e CPF internos configurados e conector externo em espera.
- Navegador: nome respondeu em modo estruturado; CPF anonimo foi bloqueado; nenhuma chamada a `/api/charlie/respond` ocorreu.
- Responsividade: desktop e viewport celular sem largura excedente, titulo cortado ou formulario comprimido.

## Rollback

- Restaurar o Worker `8d14a038-d127-4647-bccd-c90377d50630` e a Charlie `fa5eee2c-caf4-4e1f-aa7f-cb3799e9ac3d`.
- Preservar KVs, segredos, auditoria e memoria; nao apagar o indice durante rollback.
