# RELATÓRIO DE VARREDURA — jus9-tecnologia-juridica

**Data:** 2026-05-23  
**Classificação:** INTERNO / CARTÓRIO INTELIGENTE / PROGRAMAÇÃO / DEPLOY  
**Origem:** ZIP enviado pelo Fundador  
**Destino:** pacote corrigido para commit manual

## Resultado resumido

- Arquivos copiados para pacote limpo: 268
- Tamanho total aproximado do pacote limpo: 38.07 MiB
- Pasta `.git/` removida: sim
- Arquivos `.env` reais removidos: nenhum no pacote limpo
- Arquivos maiores que 25 MiB no pacote limpo: 0

## Arquivos principais

- OK — `index.html`
- OK — `mvp.html`
- OK — `style.css`
- OK — `script.js`
- OK — `wrangler.jsonc`
- OK — `worker.js`
- OK — `_headers`

## Arquivos/pastas removidos ou excluídos

- `.git/`
- `.servidor-local.err.log`
- `.servidor-local.out.log`
- `backend/node_modules/`

## Arquivos grandes no pacote limpo

- Nenhum arquivo acima de 25 MiB.

## Observações

1. O erro inicial do Cloudflare foi causado porque `.git/objects/pack/...` entrou como asset.
2. A nova entrega não inclui `.git/`.
3. O erro de aparência crua foi causado porque `style.css` e `script.js` chegaram ao navegador com `Content-Type: text/html`.
4. O pacote inclui `_headers` e `worker.js` para reforçar MIME types.
5. Se o erro persistir após commit/push/deploy, o próximo diagnóstico deve ser feito na aba Network do DevTools, conferindo Status e Response Headers de `/style.css` e `/script.js`.

## Possíveis links antigos de MVP encontrados

- `app-agenda.html`
- `app-atendimento-inicial.html`
- `app-clientes.html`
- `app-cofre.html`
- `app-daj.html`
- `app-demo-advogar.html`
- `app-documentos.html`
- `app-gravacoes.html`
- `app-grupos.html`
- `app-ia-profissional.html`
- `app-perfis.html`
- `app-prazos.html`
- `app-processos.html`
- `app-retorno.html`
- `app-workspace.html`
- `apresentacao-online-charlie-fox-codex.html`
- `arquitetura-sistema.html`
- `arquitetura-tecnica.html`
- `central-tecnica.html`
- `charlie-delta-da-costa.html`
- `comunidade.html`
- `consulta-publica.html`
- `creditos.html`
- `cronograma-final.html`
- `detetive-particular.html`
- `doutrina.html`
- `equipe.html`
- `guia-marca.html`
- `ia-juridica.html`
- `ia-profissional.html`
- `jurisprudencia.html`
- `jus9-verde.html`
- `lider-mvp.html`
- `mais-direito.html`
- `manual-interno.html`
- `marca.html`
- `modelos-peticoes.html`
- `nossa-historia.html`
- `origem-visual.html`
- `PATCH_CABECALHO_EQUIPE_INDEX.html`
- `politica-de-privacidade.html`
- `pontes-e-parcerias.html`
- `publicacao.html`
- `README.md`
- `versionamento.html`
- `charlie-delta-da-costa/index.html`
- `documentos/aviso-mvp.html`
- `documentos/compromisso-sigilo.html`
- `documentos/cookies.html`
- `documentos/privacidade.html`
- `documentos/seguranca.html`
- `documentos/termos.html`
- `documentos/visao-de-futuro.html`
- `EQUIPE/index.html`
- `origem-visual/index.html`
- `politica-de-privacidade/index.html`
