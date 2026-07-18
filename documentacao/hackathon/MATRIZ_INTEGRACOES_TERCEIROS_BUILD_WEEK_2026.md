---
id: JUS9-BUILD-WEEK-TERCEIROS-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: em-revisao
classificacao: INTERNO
hash: nao-aplicavel-ate-aprovacao
---

# Matriz de integracoes e direitos de terceiros

## Objetivo

Demonstrar que cada SDK, API, dado, biblioteca e ativo de terceiros usado na submissao possui base de uso identificada. Esta matriz nao substitui analise juridica nem autorizacao exigida pelo titular.

## Matriz

| Terceiro/componente | Uso no projeto | Evidencia tecnica | Base/termos | Estado | Acao antes de submeter |
|---|---|---|---|---|---|
| OpenAI API | Respostas da Charlie e pesquisa juridica ativa | Chamadas a `/v1/responses` e `/v1/chat/completions` na API central | https://openai.com/policies/service-terms/ | Tecnico verificado; conta/modelo pendentes | Guardar prova de conta e termo aplicavel; atestar modelo sem expor chave |
| Codex | Desenvolvimento, revisao, testes e documentacao | Commits, releases e continuidade | Regras Build Week e termos OpenAI | Verificado; Session ID pendente | Executar `/feedback` na sessao principal e guardar ID |
| Google Drive / Apps Script | Memoria operacional e documentos | Proxy governado e Drive Saver | https://developers.google.com/terms | Uso verificado; conformidade documental pendente | Confirmar consentimento, politica de privacidade, escopos e propriedade dos arquivos |
| Google OAuth / Calendar | Login e agenda | Codigo e documentos de verificacao; Calendar OAuth desativado no health auditado | https://developers.google.com/terms/api-services-user-data-policy | Em verificacao | Usar menor escopo; nao demonstrar capacidade nao aprovada; guardar resposta Google |
| Cloudflare Workers / KV | Hosting, API, cache, memoria e registros | `wrangler.jsonc`, Worker e health de producao | Contrato aplicavel a conta Cloudflare | Uso verificado; comprovante pendente | Guardar conta/contrato e listar bindings sem valores secretos |
| CNJ DataJud API Publica | Metadados processuais por numero CNJ | Conector read-only, aliases, cache e readiness | https://formularios.cnj.jus.br/wp-content/uploads/2023/05/Termos-de-uso-api-publica-V1.1.pdf | Atencao juridica | Revisar clausulas 3.8 e 3.9; obter esclarecimento/autorizacao antes de uso publico ou comercial quando aplicavel |
| GitHub | Repositorios e historico | Remotes e commits | Termos GitHub e licencas do conteudo | Verificado; acesso de avaliador pendente | Compartilhar repositorios essenciais ou snapshot sanitizado |
| Bibliotecas open source | Runtime, testes e ferramentas | Imports/manifests distribuidos nos repositorios | Licencas individuais | Pendente | Gerar inventario/SBOM e preservar notices |
| Devpost | Cadastro e submissao | Projeto Build Week | https://openai.devpost.com/rules | Bloqueado por elegibilidade | Obter resposta oficial sobre residente no Brasil |
| YouTube | Video publico de demonstracao | Ainda nao produzido | Termos YouTube e direitos autorais | Pendente | Usar audio proprio, sem musica ou marca nao autorizada |
| Imagens, logos e pitch deck | Galeria e apresentacao | ZIP com 14 imagens e PDF | Autoria/licenca de cada ativo | Pendente | Criar declaracao de autoria e remover material sem cadeia de direitos |

## DataJud/CNJ - risco prioritario

O termo oficial da API publica informa acesso a metadados de processos publicos e atribui responsabilidade ao usuario. Tambem contem restricoes sobre modificacao, distribuicao, venda ou exploracao comercial da API ou de informacoes derivadas sem autorizacao previa por escrito, alem de dever relacionado a material disponibilizado ao publico.

Enquanto isso nao estiver resolvido:

- manter o conector somente leitura;
- nao pesquisar nacionalmente por nome ou CPF;
- nao afirmar acesso a autos ou documentos;
- nao usar dados processuais reais no video;
- preferir processo ficticio/mock claramente rotulado ou demonstracao de readiness;
- nao apresentar a integracao como autorizacao comercial do CNJ.

## Google - controles minimos

- explicar com clareza quais dados sao solicitados e para que;
- solicitar apenas escopos necessarios;
- manter politica de privacidade acessivel;
- obter consentimento para novo uso de dados;
- proteger credenciais de cliente;
- permitir revogacao/desvinculo;
- nao usar API nao documentada;
- nao apresentar verificacao em andamento como aprovacao.

## Evidencias a arquivar

- capturas das paginas de termos com data;
- comprovantes de conta ou contrato, sem numero sensivel;
- versoes das politicas de privacidade;
- lista de escopos OAuth;
- resposta formal do CNJ, Google ou organizadores quando houver;
- SBOM/licencas das dependencias;
- declaracao de autoria de imagens, texto, voz e video;
- hash dos arquivos finais apresentados.

## Regra de publicacao

`Uso tecnicamente possivel` nao significa `uso autorizado`. Uma integracao so deve aparecer como plenamente habilitada na submissao quando a evidencia tecnica e a base de uso estiverem ambas documentadas.
