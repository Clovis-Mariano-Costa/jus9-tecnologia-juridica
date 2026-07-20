---
id: REL-CHARLIE-ECHO-1-21-6
versao: 1.21.6
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.6 - cronograma executivo Charlie/CNJ

## Escopo

Organizar o estado consolidado G0-G5 em marcos datados, passos executaveis, bifurcacao conforme resposta do CNJ, responsaveis e condicoes de parada.

## Entregas

- Cronograma Charlie/CNJ v1.8.0.
- Janela de observacao de 72 horas do portal publicado.
- Registro inicial M1 com home, Pesquisa, catalogo e health verificados em somente leitura.
- Acompanhamento do CNJ fixado em 22/07/2026 as 10h.
- Fluxos separados para `CNJ_RESPONDEU` e `CNJ_SEM_RESPOSTA`.
- Auditor do cronograma v1.8 integrado ao CI local.

## Estado operacional

- Esta release e documental e nao altera runtime, Worker, cache, credenciais ou integracoes.
- Release operacional configurada permanece `governanca-1.21.5-onda5-dmp-dap-dmg-1.0`.
- Ausencia de resposta do CNJ nao constitui autorizacao.
- Qualquer reiteracao depende de aprovacao humana antes do envio.

## Bloqueios

- PDPJ continua `blocked-institutional-onboarding`.
- Homologacao real depende de resposta aplicavel e checklist institucional completo.
- Domicilio, ciencia, peticionamento, MNI e busca DataJud por nome/CPF continuam bloqueados.

## Rollback

Retomar o cronograma v1.7.0 como planejamento operacional, preservando os artefatos G5 e a release operacional 1.21.5.
