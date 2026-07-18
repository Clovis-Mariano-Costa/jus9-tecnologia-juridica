---
id: JUS9-BUILD-WEEK-CONFORMIDADE-001
versao: 1.1.0
autor: Codex / Charlie Fox, a partir do relatorio de Charlie Delta
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: em-revisao-com-bloqueio-de-elegibilidade
classificacao: INTERNO
hash: nao-aplicavel-ate-aprovacao
---

# Relatorio de conformidade - OpenAI Build Week 2026

## Finalidade

Este documento revisa e fortalece o arquivo `Relatorio_Continuidade_Codex_Jus9_OpenAI_Build_Week_2026.md`, produzido por Charlie Delta. O relatorio original continua sendo uma fonte de continuidade. Esta versao acrescenta verificacao independente de regras, codigo, Git, ZIP, links publicos, licenca, runtime de IA e integracoes de terceiros.

Data da verificacao: 18/07/2026.

## Conclusao executiva

A Jus 9 possui evidencia tecnica forte de ampliacao significativa durante o periodo da Build Week. Entretanto, a submissao competitiva esta bloqueada ate esclarecimento oficial de elegibilidade: as regras vigentes listam expressamente residentes e organizacoes domiciliadas no Brasil entre os nao elegiveis, e o participante informou ser pessoa fisica residente no Brasil.

O material pode continuar sendo organizado e o produto pode continuar sendo desenvolvido. Nao se deve declarar a inscricao elegivel nem realizar tentativa de contorno territorial sem resposta escrita dos organizadores.

## Estados usados nesta auditoria

- `VERIFICADO`: confirmado diretamente em regra oficial, Git, codigo, arquivo ou endpoint.
- `RELATADO`: informado no relatorio de Charlie Delta, mas nao confirmado por evidencia independente nesta auditoria.
- `PENDENTE`: exige documento, captura, sessao, permissao ou teste adicional.
- `BLOQUEADO`: nao deve avancar como alegacao ou submissao competitiva nas condicoes atuais.

## Regras e horario oficial

Fonte principal: https://openai.devpost.com/rules

- Inicio do periodo de submissao: 13/07/2026, 09:00 Pacific Time.
- Equivalencia em Brasilia no periodo: 13/07/2026, 13:00.
- Encerramento: 21/07/2026, 17:00 Pacific Time.
- Equivalencia em Brasilia no periodo: 21/07/2026, 21:00.
- Projeto preexistente e permitido somente quanto ao trabalho significativamente ampliado depois do inicio.
- E obrigatoria documentacao clara que separe trabalho anterior e trabalho novo.
- A submissao exige evidencia de uso de Codex e/ou GPT-5.6 no periodo.
- O video deve ter menos de tres minutos, audio e demonstracao clara.
- O repositorio precisa ser acessivel aos avaliadores.
- O README deve explicar a colaboracao com Codex.
- A submissao pede o Session ID obtido por `/feedback` no Codex.
- Integracoes de terceiros exigem autorizacao compativel com termos e licencas.

## Bloqueio de elegibilidade

Status: `BLOQUEADO`.

As regras oficiais vigentes incluem o Brasil na lista de jurisdicoes excluidas. A FAQ tambem informa que, em equipes internacionais, cada membro precisa atender individualmente aos requisitos de elegibilidade.

Existe discussao publica especifica, mas sem resposta oficial conclusiva dos organizadores na data desta auditoria:

https://openai.devpost.com/forum_topics/44359-what-about-brazil

Acao obrigatoria:

1. solicitar esclarecimento oficial no quadro de discussoes e no canal indicado pela FAQ;
2. guardar captura, URL, data e resposta integral;
3. nao interpretar cadastro aceito pela plataforma como revogacao das regras;
4. nao usar representante ou organizacao estrangeira sem situacao juridica real, autorizacao e conformidade integral.

Mensagem recomendada:

```text
Subject: Urgent eligibility clarification for Brazilian entrant

The Official Rules expressly list Brazil among the excluded jurisdictions,
although Brazil appears among OpenAI API-supported countries and registration
is available. I am an individual resident of Brazil. May I validly submit a
project for judging and prizes? If not, is non-competitive participation
permitted? Please provide an official clarification before the submission
deadline.
```

## Evidencia de trabalho novo

Status: `VERIFICADO`.

Repositorio principal:

- baseline anterior ao marco: `a45ae2cf75221eaf7f3679ad8c20c59146f73ae6`;
- data do baseline: 13/07/2026, 01:35:10 BRT;
- HEAD auditado: `e546a9c61e8f3fd3e4634ecee2cf0ddbefbc151f`;
- commits depois do baseline: 42;
- arquivos alterados: 108;
- adicoes: 12.067;
- remocoes: 1.055.

API central da Charlie Echo:

- baseline anterior ao marco: `aaf55b87e5e3cf6a68a98a7f14bfcd371f0cffb7`;
- commits posteriores: 3;
- arquivos alterados: 7;
- adicoes: 463;
- remocoes: 14.

O detalhamento reproduzivel esta em `EVIDENCIAS_BUILD_WEEK_2026.md`.

## Escopo recomendado para avaliacao

Categoria recomendada: `Work and Productivity`.

O ecossistema completo e amplo demais para uma demonstracao inferior a tres minutos. O fluxo central recomendado e:

1. criar atendimento com dados inteiramente ficticios;
2. salvar um DAJ no backend oficial;
3. abrir sala nova e isolada de analise da Charlie Echo;
4. receber sintese fiel, lacunas, perguntas, riscos sustentados e feedback;
5. encaminhar o DAJ ao papel humano adequado;
6. consultar processo por numero CNJ via DataJud read-only;
7. vincular um DAJ a um processo, preservando a regra um-para-um;
8. mostrar trilha, governanca e falha fechada sem inventar dados.

Nome de demonstracao recomendado:

`Jus 9 DAJ - Governed AI Legal Intake and Case Workflow`

Proposta curta:

`A governed legal workflow that turns a fictional client intake into an auditable DAJ, obtains AI-assisted analysis with human routing, and links the record to official public case metadata without inventing results.`

## Uso do Codex e do GPT-5.6

### Codex

Status: `VERIFICADO_COM_EVIDENCIA_COMPLEMENTAR_PENDENTE`.

O historico Git, os documentos de release e o arquivo de continuidade demonstram trabalho substancial realizado com Codex. Ainda falta registrar no dossie o Session ID de `/feedback` da sessao principal e, se possivel, capturas ou exportacoes datadas das sessoes relevantes.

### GPT-5.6

Status: `PENDENTE`.

O relatorio de Charlie Delta afirma uso do GPT-5.6. Esta auditoria nao encontrou identificador de sessao, captura do modelo ou log que comprove essa afirmacao.

O runtime da Charlie Echo usa a API OpenAI e recebe o modelo por variavel de ambiente. O repositorio da API central contem `JUS9_MODEL_DEFAULT=gpt-5.5` em `.env.example` e fallbacks diferentes no codigo. Portanto:

- nao declarar que o runtime usa GPT-5.6 sem atestado de configuracao do ambiente;
- nao publicar valor de secret;
- comprovar apenas o nome do modelo, data, ambiente e resposta de readiness sanitizada;
- se GPT-5.6 foi usado somente na sessao do Charlie Delta, registrar isso como colaboracao de desenvolvimento/documentacao, nao como runtime.

## Repositorio e limites de reproducao

Status do repositorio principal relatado: privado.

O codigo funcional esta distribuido em mais de um repositorio local:

- `jus9-tecnologia-juridica`: portal, Worker, DAJ, DataJud, perfis e frontend;
- `charlieecho-jus9-tecnologia-juridica`: API central e raciocinio da Charlie;
- `backend-api-jus9-tecnologia-juridica`: politicas complementares de backend;
- `investimentos-jus9-tecnologia-juridica`: materiais e validacoes publicas complementares.

Um unico link privado para o repositorio principal pode nao permitir avaliacao completa da API central. Antes da submissao, escolher uma opcao:

1. compartilhar todos os repositorios essenciais com os avaliadores; ou
2. criar snapshot sanitizado e versionado do codigo necessario; ou
3. declarar claramente quais componentes sao externos e fornecer demo funcional sem rebuild.

Nao copiar secrets, dados reais ou historicos internos para consolidar repositorios.

## Auditoria do README

O README criado no commit `e546a9c` melhora muito a apresentacao institucional, mas precisava das seguintes correcoes:

- ingles como idioma principal para avaliacao;
- separacao objetiva entre projeto anterior e trabalho da Build Week;
- baseline e links de comparacao Git;
- fluxo concreto que os jurados devem testar;
- limites de reproducao do repositorio;
- distincao entre Codex comprovado, API OpenAI comprovada e GPT-5.6 pendente;
- status de elegibilidade;
- licenca MIT real, que ja existe no repositorio.

O README foi revisado no mesmo pacote deste relatorio.

## Auditoria do ZIP

Arquivo verificado:

`C:\Users\aeonp\Downloads\Jus9_OpenAI_Build_Week_2026_Submission_Final.zip`

Resultado:

- status: `VERIFICADO`;
- tamanho: 23.730.283 bytes;
- entradas: 32;
- SHA-256 intermediario: `309F6655D5C92E0EB0F061485875B1088BC58F1163A8A727BF70FC2C2AC4FC93`;
- abaixo do limite relatado de 35 MB;
- contem 10 imagens de galeria, 4 imagens de governanca, 8 documentos, README, manifesto, contact sheet e pitch deck;
- nenhum segredo foi identificado pelos nomes ou textos Markdown/TXT inspecionados;
- o link `sandbox:/mnt/data/...` do chat anterior nao e duravel e nao deve ser usado na submissao.

Pendencias do ZIP:

- verificar visualmente todas as paginas do PDF e todas as imagens;
- confirmar autoria/licenca de cada imagem, marca, fonte e grafico;
- remover ou licenciar musica no video;
- atualizar o ZIP para incluir evidencia temporal e um caminho de produto, pois o pacote atual enfatiza governanca mais do que a demonstracao funcional;
- gerar hash SHA-256 do ZIP final depois da ultima revisao.

O hash acima identifica somente o pacote auditado em 18/07. Qualquer alteracao no ZIP exige novo hash.

## Links publicos

Status em 18/07/2026: `VERIFICADO_HTTP_200`.

- https://jus9tecnologia.com.br/
- https://jus9tecnologia.com.br/mvp#demos-jus9
- https://charlieecho.jus9tecnologia.com.br/ia-profissional
- https://carta.jus9tecnologia.com.br/
- https://jus9tecnologia.com.br/instalar-app

HTTP 200 nao comprova fluxo funcional. Ainda e necessario testar em janela anonima, desktop e celular, com dados ficticios e sem privilegio administrativo pessoal.

## Integracoes de terceiros

O inventario detalhado esta em `MATRIZ_INTEGRACOES_TERCEIROS_BUILD_WEEK_2026.md`.

Pontos criticos:

- OpenAI: uso tecnico confirmado; guardar prova de conta/termos e modelo sem expor chave.
- Google: OAuth, Drive e Calendar exigem escopos minimos, politica de privacidade e consentimento coerente.
- Cloudflare: guardar evidencia do contrato aplicavel a conta e dos servicos usados.
- DataJud/CNJ: o termo oficial restringe modificacao, distribuicao, venda ou exploracao comercial de informacao derivada sem autorizacao previa e contem deveres relacionados a divulgacao publica. Revisao e eventual contato formal com o CNJ sao obrigatorios antes de usar resultados DataJud como parte publica/comercial da demonstracao.
- Bibliotecas e imagens: gerar inventario de licencas e declaracao de autoria.

## Cronograma de fechamento

### 18/07

- publicar este dossie, evidencia temporal e matriz de terceiros;
- enviar pergunta oficial de elegibilidade;
- obter Session ID de `/feedback`;
- localizar evidencia real do GPT-5.6 ou corrigir a alegacao.

### 19/07

- auditar segredos, licencas e repositorios necessarios;
- testar fluxo DAJ ponta a ponta com dados ficticios;
- criar conta ou sessao de avaliacao de menor privilegio;
- revisar visualmente ZIP e pitch deck.

### 20/07

- gravar video de ate 2min45s;
- finalizar texto em ingles e screenshots;
- gerar ZIP final e SHA-256;
- ensaiar o caminho do avaliador em janela anonima.

### 21/07

- usar somente para contingencia e submissao, caso a elegibilidade tenha sido confirmada;
- prazo externo: 21:00 BRT.

## Checklist de bloqueios

- [ ] Resposta oficial confirmando elegibilidade de residente no Brasil.
- [ ] Session ID de `/feedback` da sessao Codex principal.
- [ ] Evidencia verificavel do uso de GPT-5.6, se essa alegacao permanecer.
- [ ] Acesso dos avaliadores a todos os repositorios essenciais.
- [ ] Teste anonimo do fluxo demonstrado.
- [ ] Revisao de termos DataJud/CNJ e autorizacao quando aplicavel.
- [ ] Inventario de licencas de terceiros.
- [ ] Declaracao de autoria das imagens e pitch.
- [ ] Video publico em ingles ou com traducao inglesa, sem musica/marca nao autorizada.
- [ ] ZIP final sanitizado e com hash.

## Regra final

O material do Hackathon deve provar o que existe e o que foi construido no periodo. Visao futura pode aparecer como roadmap, nunca como funcionalidade entregue. Nenhuma resposta de IA, integracao, autorizacao, modelo, teste ou elegibilidade pode ser presumida.
