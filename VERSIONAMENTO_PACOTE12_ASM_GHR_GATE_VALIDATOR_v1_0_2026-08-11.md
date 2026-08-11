# Versionamento — Pacote 12 ASM + GHR + Gate Validator v1.0

**Data:** 2026-08-11 — America/Sao_Paulo
**Repositório:** `Clovis-Mariano-Costa/jus9-tecnologia-juridica`
**Pedido de origem:** Drive `1SWFZGRpw1CrXakaqfveOB9YjGrmF0im2`, documento `17ZOWgB-YTWo-e9T_j6EC-UCPF9ExLq60iMuFrpjgxy4`
**Estado:** IMPLEMENTAÇÃO LOCAL VERIFICADA / SEM MERGE / SEM DEPLOY

## Escopo implementado

- `backend/lib/academic-pipeline.js`: máquina de estados acadêmicos M00–M23, transições sequenciais fail-closed, Gate Validator, registro genealógico com SHA-256, resultados negativos e eventos de rollback sem apagar histórico.
- `tests/pacote12-academic-pipeline.test.mjs`: testes unitários, integração de transição, salto proibido, gate incompleto, timestamp, parent/hash, resultado negativo, rollback e fail-closed.

## Limites preservados

- Biblioteca completa, CTPSV/CITAT, dicionários, ensino automatizado, adjudicação experimental, frontend completo e backend geral ficaram fora desta rodada.
- A biblioteca é isolada e não foi conectada a rotas, dados reais, Google Drive, banco ou deploy.
- Nenhum segredo, credencial, dado pessoal real ou assinatura humana foi criado.
- O módulo exige evidência, ator, papel, justificativa, timestamp UTC com milissegundos e todos os gates de cibersegurança positivos antes de transição.

## Verificação

Comando focal:

```powershell
node --test tests/pacote12-academic-pipeline.test.mjs
```

O pedido original permanece preservado no Drive até o envio explícito deste registro e do pedido à pasta de quarentena.

Resultado desta execução:

- `node --test tests/pacote12-academic-pipeline.test.mjs`: **PASS — 6/6**.
- `node --test tests/pacote12-academic-pipeline.test.mjs tests/academic-governance-index.test.mjs`: **PASS — 11/11**, incluindo a camada complementar do pipeline.
- `npm test`: **FALHA PREEXISTENTE FORA DO PACOTE 12** em `scripts/audit-portal-reproducible-build.mjs`, porque `versionamento.html` não contém os marcadores esperados de v5.19 e v5.18. O build inicial do portal passou e nenhum arquivo preexistente foi alterado para mascarar a falha.

## Duplicata identificada

O documento Drive `1W9KTPeV0ddki0VJ1PePl91ap_VzcWiae1yBN09WBJkA` possui o mesmo título, versão, escopo ASM/GHR/GV, restrições e casos de aceite do pedido `17ZOWgB-YTWo-e9T_j6EC-UCPF9ExLq60iMuFrpjgxy4`. Foi classificado como `DUPLICATA_EXATA_DO_PEDIDO_CONCLUIDO`; não houve segunda alteração de código.

## Pedido relacionado — pipeline acadêmico

O pedido `1jnCtp-3VpyAMBORYDCHeFRRPAS_GKdoSTk7VRvmwtUE` permanece como escopo mais amplo. Nesta rodada foi implementada a camada local mínima complementar em `backend/lib/academic-governance-index.js`, com testes em `tests/academic-governance-index.test.mjs`: índice de metadados, derivado didático sanitizado, gate de Biblioteca, trilha de pesquisa, detector de duplicidade e relatório de higiene. A integração real com Drive, banco, RBAC de produção, frontend, publicação e deploy permanece deliberadamente fora do protótipo.
