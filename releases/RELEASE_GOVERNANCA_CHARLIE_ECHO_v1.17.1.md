---
id: REL-CHARLIE-ECHO-1-17-1
versao: 1.17.1
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: publicada-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Release v1.17.1 - Proxy governado para laudo DAJ

## Escopo

Hotfix do incidente em que a rota DAJ passou a falhar fechada porque a API externa continuava devolvendo resposta evasiva em vez de laudo.

## Entregas

- `script.js` envia `dajAnalysisSource` minimizado para a rota `LAUDO_DAJ_V1`.
- `worker.js` valida a resposta upstream antes de devolver ao frontend.
- Se o upstream vier evasivo ou sem laudo, o Worker monta `Laudo de Analise DAJ` limitado aos dados oficiais do cadastro.
- O fallback marca `source: worker_daj_laudo_governado` e cabecalho `X-Jus9-Daj-Laudo-Fallback: governado`.
- Cache DAJ renovado para `script.js?v=20260719-daj-laudo-v2` e `jus9-pwa-v40-2026-07-19-daj-laudo-proxy`.

## Limite

O Pacote 2 ainda precisa de novo teste humano com `DAJ-2026-0002`.

O laudo governado do Worker nao autoriza reversibilidade, Drive real, memoria real, cofre, protocolo ou ato externo sem aceite humano.
