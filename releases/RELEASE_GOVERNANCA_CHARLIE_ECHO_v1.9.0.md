---
id: JUS9-RELEASE-CHARLIE-GOV-1.9.0
versao: 1.9.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-6d78f9e
---

# Release Governanca Charlie Echo v1.9.0

## Pacote

- Pacote 1B: cadastro autenticado do DAJ alimentando o indice interno de partes.
- DAJ pode nascer no atendimento e receber processo posteriormente.
- Nome entra no indice deterministico e CPF entra somente como HMAC-SHA-256 e mascara.
- Contato, relato e documentos mencionados ficam em detalhe separado do indice pesquisavel.
- Criacao exige idempotencia; repeticao nao cria segundo DAJ.
- Vinculo processual posterior preserva identidade, indice CPF e sigilo do atendimento.

## Fail-closed

- Sem sessao: `401`.
- Sem `dajs:write`: `403`.
- Sem KV: `501`.
- Sem segredo HMAC quando ha CPF: `503`.
- CPF parcial ou invalido: `400`, sem mutacao.
- Payload superior a 32 KB: `413`.
- Mesma chave idempotente com outro cadastro: `409`.

## Evidencias

- CI local completa aprovada em 2026-07-13.
- Homologacao tecnica DAJ: memoria, upload temporario, cadastro, indice, multiplos DAJs, vinculo, mascara, auditoria e limpeza.
- Producao: health `ready`, cadastro e HMAC configurados.
- Producao: `/api/dajs/readiness` confirmou `cpf_request_only_hmac_at_rest` e processo opcional na criacao.
- Producao: pagina sem alerta de falso salvamento, cliente idempotente publicado e aviso de dados ficticios presente.
- Producao: tentativa anonima de gravacao retornou `401`; nenhum DAJ foi criado na verificacao publica.

## Publicacao

- Commit: `6d78f9e`.
- Ajuste de entrada autenticada: commit `141ea6b`.
- Deploy automatico: `c08ee2d7-72cd-4aa7-9ad8-625126bf8691`.
- Worker verificado: `fc89e543-3bff-4a07-b5c4-b5749717ce48`.
- Worker com entrada autenticada: `a3be4c19-8b64-4573-bd4e-7fb71ea65bce`.
- Release viva: `governanca-1.9.0-daj-intake-index-1.0`.

## Rollback

- Restaurar Worker `ad044a0f-5d19-4141-8955-69c56bbeea89` para voltar a release 1.8.0.
- Preservar KV, HMAC, memoria, Drive e auditoria; nao apagar registros durante rollback.

## Pendencias de aceite

- Executar Pacote 1C com login autorizado e dados inteiramente ficticios.
- Confirmar criacao, pesquisa por nome/CPF, vinculo posterior e persistencia entre sessoes.
- Anexos continuam fora da rota `/api/dajs` ate o Pacote 5.
- Antes de escrita concorrente em escala, migrar alocacao e indice de KV para D1 ou Durable Object transacional.
