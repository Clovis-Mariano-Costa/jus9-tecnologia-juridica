---
id: JUS9-CHARLIE-CORE-V0-CONTRATOS-001
versao: 0.1.0
autor: Codex
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicado-controlado
classificacao: INTERNO
hash: calcular-na-release-aprovada
---

# Charlie Core v0 e contratos JSON

## Objetivo

Extrair um nucleo compartilhado e testavel para os 14 MVPs sem ativar dado real, Drive real, memoria real, acesso privilegiado ou efeito juridico autonomo.

## Entregas

- Registry canonico dos 14 MVPs, com aliases `INV -> DIP` e `ORG -> DOI`.
- Estado publico, risco padrao, papel humano, perfis e limites por modulo.
- Classificador deterministico de risco com bloqueio de efeitos criticos.
- Builder de prompt governado que preserva identidade e limites do modulo.
- Validadores para `ChatRequest`, `ChatResponse`, `DocumentSaveRequest`, `DataJudSearchRequest` e `AuditEvent`.
- Campos controlados: `auditId`, `classification`, `riskLevel`, `citations`, `downloadOptions` e `nextActions`.
- Health local passa a declarar versoes do Charlie Core e dos contratos.
- Matriz do diretorio modular passa a ser derivada do registry central.

## Limites deste pacote

- Nao sobrescreve `AUTH_ALLOWED_EMAILS` nem registra e-mail no codigo.
- Prepara `AUTH_ADVOGADO_LIDER_EMAILS` como allowlist secreta separada para preservar os usuarios existentes.
- Nao grava no Google Drive.
- Publicacao depende de validacao integral, dry-run e registro secreto separado da allowlist geral.
- Nao declara concluido o aceite humano do `DAJ-2026-0002`.
- Nao libera Memoria/Drive real, que continuam bloqueados ate a reversibilidade 1C.

## Validacao

```powershell
node --test tests/charlie-core.test.mjs
node tests/validate-worker-auth.mjs
node scripts/run-local-ci.mjs
npx wrangler deploy --dry-run
```

## Porta humana preservada

O login demonstrativo informado pelo Fundador deve ser promovido pela allowlist secreta separada. O pacote nao inclui e-mail ou senha em codigo, teste, log, documento ou commit.

## Publicacao

- Release: `governanca-1.17.0-charlie-core-contracts-auth-1.0`.
- Commit fonte: `7d94802`.
- Versao ativa do Worker: `84c5123f-e475-4d5b-b682-437483f859b4`.
- Autorizacao `advogado_lider` configurada por secret separado.
