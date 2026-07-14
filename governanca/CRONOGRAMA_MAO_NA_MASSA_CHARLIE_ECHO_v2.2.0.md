---
id: GOV-CHARLIE-CRONOGRAMA-002-2
versao: 2.2.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: em-execucao
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 2.1.0
preserva_historico: true
---

# Cronograma Mao na Massa - Charlie Echo v2.2.0

## Resultado da revisao

Esta versao nao sobrescreve cronogramas aprovados. Ela corrige a ordem operacional dos pacotes e separa entrega tecnica, publicacao, homologacao humana e dependencia externa.

Correcoes principais:

- O motor interno de nome/CPF esta publicado, mas somente sera considerado operacional depois que o cadastro autenticado do DAJ alimentar o indice.
- Pesquisa externa por nome/CPF fica em trilha paralela e nao bloqueia o DAJ interno.
- Resposta inteligente, documentos, frontend, modulo social e replicacao voltam a ter portas de aceite proprias.
- Nenhum pacote pode usar LLM, fallback demonstrativo ou dados presumidos para encobrir integracao ausente.

## Estados oficiais

- `CONCLUIDO`: implementado, testado, publicado e aceito.
- `HOMOLOGACAO`: publicado e testado tecnicamente; falta aceite humano autenticado.
- `PROXIMO`: primeira entrega executavel sem dependencia externa.
- `ESPERA_EXTERNA`: depende de resposta, convenio ou credencial oficial.
- `FUTURO_GOVERNADO`: proibido ativar antes dos pacotes anteriores.

## Base que nao pode regredir

- Pedidos generativos usam a API da Charlie; consultas estruturadas nao usam LLM.
- Nenhuma indisponibilidade pode ser preenchida com processo, pessoa, DAJ, fonte, pagina, link ou vinculo presumido.
- Numero CNJ usa DataJud oficial somente para metadados publicos.
- CPF nao aparece em URL, log publico, resposta ou memoria permanente e nao possui fallback por ultimos digitos.
- Cada DAJ corresponde a um processo; uma pessoa pode possuir varios DAJs.
- Memorias, permissoes, documentos e configuracoes permanecem isolados por usuario e instrumento.

## Pacote 0 - Fundacao auditavel

Estado: `CONCLUIDO` e congelado.

- Governanca versionada, metadados, auditoria estrutural, health e inventario dos 14 MVPs.
- Autenticacao, KV de memoria por usuario, observabilidade e contratos de personalidade por instrumento.

Porta de regressao: a CI local e os auditores de governanca devem continuar aprovados antes de qualquer publicacao.

## Pacote 1 - DAJ como fonte operacional

Estado: `HOMOLOGACAO`.

### 1A - Vinculo DAJ-processo

- Estado: `HOMOLOGACAO`.
- API autenticada, KV oficial e regra de um processo por DAJ publicados.

### 1B - Cadastro DAJ alimentando o indice

- Estado: `HOMOLOGACAO` na release 1.9.0.
- Salvamento autenticado do atendimento/DAJ ligado ao indice de partes.
- Nome normalizado e HMAC do CPF valido indexados ao criar ou atualizar o DAJ.
- Indexacao parcial com CPF invalido e recusada sem inventar, completar ou deduzir documento.
- Criacao protegida por idempotencia e detalhe sigiloso separado do indice pesquisavel.

### 1C - Aceite ponta a ponta

- Estado: pendente depois de 1B.
- Criar DAJ inteiramente ficticio com login autorizado.
- Vincular a um numero CNJ ficticio de teste controlado.
- Encontrar o mesmo DAJ por identificador, nome e CPF exato.
- Confirmar persistencia entre sessoes, ausencia de mutacao pela pesquisa e auditoria sem CPF bruto.

Porta de saida: 1A, 1B e 1C aprovados. Antes disso, a pesquisa interna e tecnicamente pronta, mas nao operacionalmente concluida.

## Pacote 2 - Memoria por usuario e Drive oficial

Estado: `HOMOLOGACAO`.

- KV dedicado por login, configuracao por instrumento, exportacao, limpeza e retencao publicados.
- Drive Saver, PDF, `downloadUrl` real, revogacao e exclusao governada preservados.
- Concluir ensaio autenticado no Apps Script correto, incluindo idempotencia, revogacao e trilha de auditoria.

Porta de saida: criar, localizar, baixar e revogar documento ficticio sem duplicacao, link inventado ou acesso entre usuarios.

## Pacote 3 - Pesquisa judicial

Estado geral: parcialmente concluido.

### 3A - Numero CNJ

- Estado: `CONCLUIDO`.
- DataJud read-only, cache, auditoria, DTO interno e limites de metadados publicos.

### 3B - Fail-closed para nome, CPF e DAJ

- Estado: `CONCLUIDO`.
- Rotas estruturadas nao chamam OpenAI e nao produzem minuta ou resultado presumido.

### 3C - Pesquisa no indice interno

- Estado tecnico: publicado.
- Estado operacional: depende do Pacote 1B/1C.
- Nome usa comparacao deterministica; CPF usa HMAC-SHA-256 exato.

### 3D - Reindexacao de registros legados

- Estado: pendente depois do Pacote 1C.
- Recolher novamente o CPF somente em sessao autorizada e por finalidade legitima.
- Nao reconstruir CPF mascarado e nao promover dado antigo automaticamente.

### 3E - Conector externo de partes

- Estado: `ESPERA_EXTERNA`.
- Aguardar orientacao, finalidade, endpoint, papeis, limites e credenciais oficiais.
- Nao fazer scraping indiscriminado e nao afirmar pesquisa externa durante a espera.

### 3F - PDPJ, MNI e Domicilio

- Estado: `FUTURO_GOVERNADO`.
- Readiness e autenticacao primeiro; peticionamento, ciencia ou ato processual somente com perfil autorizado, confirmacao humana e auditoria.

## Pacote 4 - Inteligencia juridica e fidelidade das fontes

Estado: `HOMOLOGACAO`.

- Preservar API-primeiro, foco na pergunta atual e regressao anti-resposta-unica.
- Pesquisa ativa deve pesquisar quando houver fonte acessivel, e nao apenas listar portais.
- Autor, obra, pagina, julgado e trecho literal exigem evidencia verificavel.
- Sem evidencia, a Charlie deve declarar o limite e pedir documento ou recorte, nunca completar por plausibilidade.

Porta de saida: bateria fixa de perguntas conceituais, prazos, doutrina, pagina, obra ambigua, jurisprudencia e pedido fora do juridico, sem respostas repetidas ou referencias inventadas.

## Pacote 5 - Pecas, uploads e documentos

Estado: implementacao parcial em homologacao.

- Manter producao de peca completa como rota propria, com dados faltantes sinalizados.
- Homologar upload e extracao governada de TXT, PDF, DOCX e imagem/OCR sem alegar leitura que nao ocorreu.
- Integrar atendimento inicial, DAJ, analise da Charlie, PDF e Drive em uma unica trilha auditavel.
- Salvamento automatico pode ocorrer pela decisao governada da Charlie, com classificacao, justificativa e URL real do backend.

Porta de saida: documento ficticio entra, e lido, analisado, gera minuta distinta, PDF e registro no Drive; falhas de extracao ou Drive aparecem explicitamente.

## Pacote 6 - Frontend compacto e consistente

Estado: base em `HOMOLOGACAO`.

- Superficie principal com o minimo de botoes; fala, anexo e configuracoes seguem o mesmo contrato.
- Menu lateral completo concentra memoria, salas, capacidades, integracoes e configuracao do instrumento.
- Auditar todas as paginas da Charlie em desktop e celular, incluindo rotulos, acessibilidade, estados vazios, erros e carregamento.

Porta de saida: nenhuma funcao perdida, nenhum controle duplicado, nenhum texto cortado e nenhuma pagina usando componente antigo incompativel.

## Pacote 7 - Modulo social

Estado: piloto existente; revisao especifica pendente.

- Preservar identidade, principios, constituicao, memoria e fontes proprias do instrumento social.
- Impedir contaminacao automatica por protocolos, avisos e linguagem do DAJ Advogados.
- Reutilizar a orquestra tecnica, sem compartilhar personalidade, dados ou autorizacoes juridicas.

Porta de saida: bateria social e cidada aprovada, incluindo acolhimento, orientacao comunitaria, direitos basicos, encaminhamento e limites de risco.

## Pacote 8 - Replicacao dos instrumentos

Estado: `FUTURO_GOVERNADO` depois dos Pacotes 1 a 7.

- Replicar contratos aprovados para os 14 MVPs por configuracao independente.
- Cada instrumento recebe personalidade, memoria, fontes, capacidades, permissoes, Drive e painel proprios.
- Replicar mecanismo e testes; nunca copiar dados de usuarios ou permissao entre MVPs.

Porta de saida: matriz dos 14 MVPs com teste funcional, visual, de isolamento e rollback por instrumento.

## Pacote 9 - Auditoria institucional

Estado: pendente depois da homologacao do modelo DAJ.

- Consolidar evidencias de governanca, LGPD, seguranca, fontes, auditoria, limites e maturidade.
- Atualizar documentacao para investidores e parceiros sem apresentar recurso planejado como pronto.
- Registrar versoes, commits, deployments, testes, riscos residuais e dependencias externas.

## Pacote 10 - Release final e observacao

Estado: pendente.

- Publicar release candidata, executar CI completa e provas visuais.
- Observar producao por 72 horas sem regressoes criticas.
- Aprovar ou fazer rollback preservando KV, Drive, memoria e auditoria.

Porta final: nenhum resultado inventado, nenhum vazamento, nenhum ato transacional indevido e todos os instrumentos aprovados em sua matriz.

## Cronograma mais breve permitido pela seguranca

1. Dias 0 a 1: Pacote 1B e testes automatizados do cadastro/indice.
2. Dias 1 a 2: Pacotes 1C, 2 e 3C com login e dados ficticios.
3. Dias 2 a 4: Pacotes 4 e 5, resposta juridica, fontes, upload, PDF e Drive.
4. Dias 4 a 6: Pacotes 6 e 7, frontend completo e modulo social.
5. Dias 6 a 10: Pacote 8, replicacao e isolamento dos 14 instrumentos.
6. Dias 10 a 12: Pacotes 9 e 10, auditoria institucional, release e inicio da observacao.
7. Trilha paralela sem prazo presumido: Pacotes 3E e 3F, aguardando evidencia e credenciais oficiais.

## Proxima acao objetiva

Executar o Pacote 1C: homologar com login autorizado e dados ficticios a criacao, a pesquisa por nome/CPF, o vinculo processual posterior e a persistencia entre sessoes. Nao iniciar reindexacao real, replicacao dos MVPs ou conector externo antes desse aceite.
