---
id: GOV-CHARLIE-CNJ-OBS-M1-20260720-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: observacao-em-curso
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
cronograma: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.8.0.md
---

# Registro de observacao M1 - Charlie/CNJ

## Checagem inicial

Checagem somente leitura executada em 20/07/2026. Nenhum dado pessoal, credencial, escrita, deploy ou chamada CNJ/PDPJ foi usado.

| Alvo | Resultado | Evidencia minimizada |
|---|---|---|
| `https://jus9tecnologia.com.br/` | `200` | Menu principal contem link para `pesquisa-repositorios.html`. |
| `https://jus9tecnologia.com.br/pesquisa-repositorios.html` | `200` | Pagina de Pesquisa disponivel. |
| `https://jus9tecnologia.com.br/data-publica/repositorios-jus9.json` | `200` | Catalogo declara 31 repositorios. |
| `https://jus9-tecnologia-juridica.aeonprimevo.workers.dev/api/health` | `200` | Servico `ready`; release `governanca-1.21.5-onda5-dmp-dap-dmg-1.0`. |

## Gates confirmados pelo health

- DataJud configurado em `leitura_metadados`, com cache.
- PDPJ `configured: false` e `mode: readiness_only`.
- Busca processual externa por parte permanece `awaiting_official_guidance`.
- Charlie Core preserva contrato `1.2.0` e 14 MVPs.

## Resultado parcial

Estado M1: `EM_OBSERVACAO_SEM_INCIDENTE_CONFIRMADO`. Esta checagem inicial nao encerra a janela de 72 horas nem substitui as verificacoes mobile/desktop e de cache previstas para M4.

## Proxima coleta

Repetir a checagem no fechamento de M1, em 23/07/2026, ou antes se houver relato de incidente. M2, retorno do CNJ, permanece separado e agendado para 22/07/2026 as 10h.
