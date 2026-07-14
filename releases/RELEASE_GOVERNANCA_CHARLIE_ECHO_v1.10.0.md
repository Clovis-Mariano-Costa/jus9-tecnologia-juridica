---
id: JUS9-RELEASE-CHARLIE-GOV-1.10.0
versao: 1.10.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-77b6d96
---

# Release Governanca Charlie Echo v1.10.0

## Pacote

- Pacote 1C tecnico: homologacao reversivel do cadastro DAJ.
- Criacao pelo atendimento recebe marca imutavel de registro ficticio.
- Retomada depois do login usa somente `dajId` na URL e nao recarrega CPF integral.
- Exclusao exige sessao, `dajs:write`, `audit:write`, justificativa e confirmacao vinculada ao DAJ.
- A limpeza remove indice e detalhe, preserva tombstone minimo e bloqueia replay da operacao apagada.
- Sequencia monotonicamente crescente impede reutilizar identificador excluido.
- DAJ comum permanece impossivel de excluir pela rota de homologacao.

## Fail-closed

- Sem sessao: `401`.
- Sem escrita e auditoria: `403`.
- DAJ comum: `409`.
- Confirmacao incorreta ou justificativa insuficiente: `400`, sem mutacao.
- Replay da operacao excluida: `410`.
- Tombstone e auditoria nao preservam nome, CPF, contato, processo ou justificativa livre.

## Evidencias

- CI local completa aprovada em 2026-07-13.
- Homologacao automatizada aprovou memoria, upload temporario, dois DAJs da mesma parte, pesquisa exata, vinculos, limpeza e tombstones.
- Regressao autenticada local aprovou criacao, recarga, atualizacao, vinculo, exclusao idempotente e bloqueio de DAJ comum.
- Teste de sequencia provou que um `dajId` removido nao e reutilizado.
- Producao confirmou health `ready` e release `governanca-1.10.0-daj-homologation-cleanup-1.0`.
- Readiness confirmou KV configurado, limpeza habilitada somente para teste e exigencia de `audit:write`.
- HTML, cliente JavaScript e cache PWA v30 foram conferidos na origem publica.
- Leitura e exclusao anonimas retornaram `401`; a verificacao publica nao criou DAJ.

## Publicacao

- Commit tecnico: `77b6d96`.
- Worker: `00937709-62aa-4c50-a156-91e4ae441037`.
- URL: `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.

## Rollback

- Restaurar Worker `a3be4c19-8b64-4573-bd4e-7fb71ea65bce` para voltar a release 1.9.0.
- Preservar KV, HMAC, memoria, Drive, contador de sequencia, auditoria e tombstones.
- Nao apagar tombstone nem liberar replay de operacao ja excluida durante rollback.

## Porta humana pendente

- Entrar com perfil autorizado e usar somente identidade, CPF e processo inteiramente ficticios.
- Criar, recarregar, pesquisar por DAJ/nome/CPF, vincular processo, enviar para Charlie e remover.
- Confirmar que as pesquisas deixam de encontrar o registro removido.
- Somente depois desse aceite liberar Pacote 2 operacional, reindexacao ou replicacao.
