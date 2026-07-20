---
id: REL-CHARLIE-ECHO-1-21-3
versao: 1.21.3
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: publicada-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.21.3 - G5 governanca das APIs CNJ

## Escopo

Concluir o pacote documental e simulado G5 sem credenciais, chamadas reais ou capacidade transacional.

## Entregas

- Catalogo governado de 11 capacidades DataJud/PDPJ.
- Fixture de 15 cenarios ficticios, com zero chamadas de rede.
- Runbook de credenciais, incidentes, indisponibilidade e mudanca de termos.
- Auditores G5 e cronograma v1.7 integrados ao CI local.
- Cronograma Charlie/CNJ v1.7.0.

## Estado externo

- CNJ sem resposta ate 20/07/2026.
- Acompanhamento mantido para 22/07/2026 as 10h.
- PDPJ permanece `blocked-institutional-onboarding`.
- Worker publico permanece `governanca-1.21.2-pesquisa-repositorios-1.0`; esta release nao altera runtime.

## Limites

- Nenhuma credencial real recebida, criada ou testada.
- Nenhuma chamada real PDPJ executada.
- Nenhuma ciencia, peticao, comunicacao de domicilio ou operacao MNI habilitada.
- Nenhuma busca DataJud por nome ou CPF habilitada.

## Rollback

Restaurar o cronograma v1.6.0 e retirar os artefatos G5 do CI, preservando os contratos DataJud/PDPJ e a release publica 1.21.2.
