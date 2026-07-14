# Versionamento - Homologacao reversivel do DAJ v1.0

ID: VERSIONAMENTO-DAJ-HOMOLOGACAO-REVERSIVEL-001
Versao: 1.0.0
Data: 2026-07-13
Autor: Codex + Jus 9 Tecnologia Juridica
Status: homologacao tecnica
Classificacao: INTERNO / MVP DAJ / DADOS PESSOAIS CONTROLADOS

## Objetivo

Permitir o aceite ponta a ponta do Pacote 1C sem deixar registros ficticios ativos e sem criar uma exclusao ampla para DAJs reais.

## Entregas

- Marcacao imutavel `testMode=true` e `environment=homologacao` na criacao pelo formulario controlado.
- Retomada de DAJ pela URL depois do login, consultando a memoria oficial por `dajId`.
- CPF integral nunca e recarregado no navegador.
- Exclusao governada exige `dajs:write`, `audit:write`, justificativa e confirmacao `EXCLUIR TESTE <DAJ-ID>`.
- DAJ comum ou sem marca de homologacao e recusado com `409`.
- Indice e detalhe operacional sao removidos; tombstone preserva apenas prova minima sem nome, CPF, contato, processo ou justificativa livre.
- A justificativa e preservada somente como hash e a sequencia monotonicamente crescente impede reutilizar o `dajId` apagado.
- Marcador idempotente passa ao estado `deleted`, impedindo recriacao pela operacao anterior.

## Evidencias automatizadas

- Criacao, recarga, atualizacao, pesquisa por nome/CPF e vinculo posterior.
- Recusa anonima, recusa por permissao e recusa por confirmacao incorreta.
- Limpeza de DAJ ficticio mesmo depois de vinculado.
- Pesquisa por CPF sem resultado depois da limpeza.
- Segunda limpeza idempotente e replay da criacao respondendo `410`.
- DAJ comum protegido contra a rota de limpeza.
- Homologacao tecnica termina com indice ativo vazio e tombstones sem dados da parte.

## Limites preservados

- O aceite humano autenticado ainda e obrigatorio para concluir o Pacote 1C.
- Cloudflare KV continua adequado apenas ao piloto controlado; concorrencia e escala exigem D1 ou Durable Object transacional.
- Anexos permanecem fora de `/api/dajs` e seguem para o Pacote 5.
- Reindexacao real e replicacao dos MVPs continuam bloqueadas ate a porta humana.

## Rollback

Restaurar o Worker anterior sem remover KV, auditoria ou tombstones. Um rollback nao autoriza recriar operacoes que ja tenham sido marcadas como excluidas.
