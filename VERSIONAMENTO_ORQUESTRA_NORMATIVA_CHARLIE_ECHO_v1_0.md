# Versionamento - Orquestra normativa Charlie Echo v1.0

Data: 2026-07-03
Classificacao: INTERNO / OPERACIONAL / SEM SEGREDOS

## Objetivo

Corrigir o caminho da Charlie Echo no portal `jus9tecnologia.com.br/app-ia-profissional.html`, alinhando a tela com a ordem normativa definida:

1. Prioritario.
2. Principios e clausulas petreas.
3. Constituicao.
4. Leis internas.
5. Regimentos.
6. Protocolos.

## Problema observado

A pagina do portal usava `script.js` e possuia resposta local de pesquisa juridica capaz de interceptar pedidos como revogar link publico de Google Docs/Drive antes da API segura da Charlie Echo.

Isso fazia a Charlie responder com protocolo antigo de doutrina/jurisprudencia em vez de executar ou encaminhar a acao governada de Drive Saver.

## Ajustes implementados

- Criado reconhecimento local de acao corretiva de Drive/Docs.
- Acoes corretivas agora pulam fallback local e seguem para a API segura.
- A tela passa a exibir resposta textual governada da API mesmo quando a API retorna status nao-2xx com diagnostico util.
- O prompt enviado pelo portal agora declara a ordem normativa obrigatoria.
- A BDTD foi adicionada como fonte academica do modulo profissional para advogados.
- O cache busting do `app-ia-profissional.html` foi atualizado para carregar o `script.js` novo.

## Limite preservado

Nenhuma chave, token, URL privada de Web App, `.env`, cookie, credencial ou ID privado de pasta foi publicado.

## Validacao prevista

- `node --check script.js`
- auditorias locais existentes do portal
- teste manual em `https://jus9tecnologia.com.br/app-ia-profissional.html`

## Relacao com governanca

Este pacote implementa, no portal, a primeira camada do despachante prioritario. A consolidacao documental correspondente fica no repositorio `charlieecho-jus9-tecnologia-juridica`.
