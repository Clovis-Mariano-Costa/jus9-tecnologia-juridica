---
id: REL-CHARLIE-GOVERNANCA-005
versao: 1.4.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL
hash: pendente-apos-commit
---

# Release - Governanca Charlie Echo v1.4.0

## Escopo

Consolidacao da governanca ativa no Worker e homologacao tecnica do modelo-mae DAJ.

## Inclui

- Inventario canonico de 14 MVPs.
- Treze paginas de IA dedicadas e rota compartilhada transitoria para o DED.
- Endpoint explicito `GET /api/health` sem exposicao de segredos.
- KV dedicado `JUS9_USER_MEMORY` para memoria oficial por login.
- DataJud/CNJ configurado para metadados por numero processual.
- KV oficial para vinculo DAJ-processo.
- Comparacao protegida do token interno do gateway DataJud.
- Ensaio tecnico DAJ: memoria, upload, vinculo, busca, CPF mascarado, auditoria e limpeza.

## Nao inclui

- Pesquisa por nome/CPF em tribunal sem conector autorizado.
- Ato transacional PDPJ, MNI, Domicilio ou peticionamento.
- Aceite humano com conta real, que permanece etapa separada da homologacao tecnica.

## Criterio de promocao

- Bateria local integrada verde.
- Dry-run do Worker verde.
- Smoke test publico de health, DataJud e DAJ-processo.
- Ensaio autenticado humano com dados inteiramente ficticios.
