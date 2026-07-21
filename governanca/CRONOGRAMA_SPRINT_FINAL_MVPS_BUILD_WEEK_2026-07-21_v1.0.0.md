---
id: JUS9-CRONOGRAMA-SPRINT-FINAL-MVPS-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Cronograma do sprint final dos MVPs - Build Week 2026

Janela operacional: 18:20-21:00 BRT. Objetivo: maximizar a demonstrabilidade dos 14 MVPs sem ampliar dados, permissoes ou alegacoes nao verificadas.

| Janela | Pacote | Entrega e aceite |
|---|---|---|
| 18:20-18:45 | Auditoria consolidada | `origin/main`, PRs, builder, pagina publica e bloqueios conferidos |
| 18:45-19:35 | Higiene e prova | Extracao temporaria removida; `git ls-files tmp` deve retornar zero |
| 19:35-20:10 | Verificacao | Builder, CI local, auditor Build Week e Wrangler dry-run aprovados |
| 20:10-20:35 | Versionamento | Portal 5.18.2, manifesto 1.7.0, cache PWA v54, release e changelogs coerentes |
| 20:35-21:00 | Publicacao e handoff | Branch/PR, check remoto, pagina Build Week e lista humana final |

## Ordem de prioridade

1. preservar o DAJ como piloto operacional e os outros 13 MVPs como demos governadas;
2. retirar bloqueios tecnicos que dependem somente do repositorio;
3. manter o teste dos juizes curto, reproduzivel e com dados ficticios;
4. nao presumir elegibilidade, direitos de ativos, autorizacao DataJud ou runtime nao atestado;
5. reservar gravacao do video e submissao final ao responsavel humano.

## Gates humanos remanescentes

- confirmacao escrita de elegibilidade;
- declaracao de direitos dos ativos;
- revisao dos termos DataJud para o uso demonstrado;
- gravacao e publicacao do video com menos de tres minutos;
- decisao e envio final na plataforma do evento.
