---
id: GOV-CHARLIE-CRONOGRAMA-002-1
versao: 2.1.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: em-execucao
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
---

# Cronograma Mao na Massa - Charlie Echo v2.1.0

## Base que nao pode regredir

- A resposta inteligente continua API-primeiro nos pedidos generativos.
- Consultas estruturadas nao passam por modelo generativo.
- Numero CNJ usa DataJud oficial; nome e CPF nao sao enviados a API Publica DataJud.
- Nenhuma indisponibilidade pode ser preenchida por processo, parte, DAJ, fonte ou vinculo presumido.
- Cada DAJ corresponde a um processo; uma pessoa pode possuir varios DAJs.

## Pacotes 0 a 2 - Base, DAJ, memoria e Drive

- Estado tecnico: concluido e publicado.
- Pendente humano preservado: ensaio autenticado do Drive Saver no Apps Script correto.
- Nenhuma alteracao deste pacote modifica KVs, memoria oficial ou trilhas existentes.

## Pacote 3 - Pesquisa judicial

### 3A - Numero CNJ

- Estado: concluido.
- DataJud read-only, cache, auditoria, DTO oficial e limite de metadados publicos.

### 3B - Nome e CPF no indice interno DAJ

- Estado tecnico: concluido na release 1.8.0.
- Nova consulta autenticada `POST /api/judicial/parties/search`.
- Nome usa comparacao deterministica no indice DAJ.
- CPF usa HMAC-SHA-256 exato; CPF integral nao e persistido nem devolvido.
- Busca e somente leitura, sem mutacao do DAJ e sem chamada a LLM.
- Comparacao pelos dois ultimos digitos foi removida e proibida por teste.

### 3C - Reindexacao segura

- Estado: proximo passo humano-operacional.
- Registros antigos que possuem apenas CPF mascarado nao podem ser reconstruidos automaticamente.
- Ao revisar ou atualizar um DAJ com perfil autorizado, informar novamente o CPF valido para gerar o HMAC exato.
- Criterio de aceite: um DAJ ficticio reindexado e encontrado apenas pelo CPF integral correspondente.

### 3D - Pesquisa externa por partes

- Estado: aguardando orientacao oficial e credenciais.
- A API Publica DataJud nao oferece pesquisa nacional por nome/CPF.
- PDPJ permanece somente em readiness; nenhum endpoint transacional foi habilitado.
- Quando houver resposta oficial, validar finalidade, papeis, autenticacao, limites, auditoria e termos antes de programar o conector.
- Ate la, a interface informa `awaiting_official_guidance` e nao presume resultado externo.

## Pacote 4 - Replicacao por instrumento

- Estado: base dos 14 MVPs concluida; a pesquisa de partes permanece piloto exclusivo do DAJ.
- Inicio: somente depois do aceite autenticado do Pacote 3B/3C.
- Regra: replicar o mecanismo, nao dados, permissoes ou memoria entre instrumentos.

## Pacote 5 - Auditoria e release

- Release 1.8.0: fail-closed de nome/CPF, HMAC exato, rota deterministica e regressao anti-invencao.
- Janela de observacao: 72 horas apos publicacao.
- Criterio de rollback: qualquer minuta em resposta a consulta de partes, vazamento de CPF, mutacao por pesquisa ou falsa alegacao de consulta externa.

## Sequencia imediata

1. Publicar a API Charlie com a trava de rota estruturada.
2. Configurar `JUS9_DAJ_PII_INDEX_KEY` como segredo do Worker do portal.
3. Publicar o portal e verificar health `ready`.
4. Homologar nome e CPF com dados inteiramente ficticios e login autorizado.
5. Reindexar registros reais somente em ambiente apropriado e por usuario autorizado.
6. Aguardar a resposta oficial sobre o conector externo.
7. Retomar a integracao externa apenas com evidencia documental e credenciais validas.

## Fontes oficiais da decisao

- CNJ - API Publica DataJud: https://www.cnj.jus.br/sistemas/datajud/api-publica/
- DataJud - Glossario da API Publica: https://datajud-wiki.cnj.jus.br/api-publica/glossario/
- PDPJ - Padroes de API: https://docs.pdpj.jus.br/desenvolvendo-para-a-pdpj/padroes-de-api/
- PDPJ - Discovery e Gateway: https://docs.pdpj.jus.br/servicos-estruturantes/discovery-gateway/
- CNJ - Consulta Nacional de Pessoas: https://www.cnj.jus.br/tecnologia-da-informacao-e-comunicacao/justica-4-0/consulta-nacional-de-pessoas/

