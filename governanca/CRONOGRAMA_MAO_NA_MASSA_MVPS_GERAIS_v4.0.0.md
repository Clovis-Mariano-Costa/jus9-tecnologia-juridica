---
id: GOV-MVPS-CRONOGRAMA-GERAL-004
versao: 4.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: planejamento-executavel
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: gerar-na-release-aprovada
substitui_planejamento: CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.1.md
preserva_historico: true
---

# Cronograma Mao na Massa - MVPs gerais v4.0.0

## 1. Decisao de escopo deste Chat

Este Chat passa a concentrar tudo o que diz respeito ao portfolio, aos padroes, ao desenvolvimento, aos testes, a publicacao e a evolucao dos MVPs da Jus 9.

Fronteiras registradas:

- `PAGINA_EQUIPE_FORA_DE_ESCOPO_EXECUTIVO`: Pagina Equipe, pessoas, vinculos, organograma, perfis e acessos ficam com Mariana e o Codex dela.
- DGE permanece neste Chat como MVP de governanca tecnica. Identidade, pessoa, unidade e aprovacao vindas da Pagina Equipe sao dependencias externas por contrato.
- DAJ permanece no portfolio deste Chat. Detalhes internos da personalidade Charlie e da governanca CNJ podem continuar em frente propria, sem retirar o DAJ do inventario dos MVPs.
- `VIDEO_DEFERIDO` e `ZIP_DEFERIDO`: ambos ficam para o ultimo pacote, depois da nova revisao geral.
- Nenhuma etapa autoriza dado real, efeito juridico real, credencial, segredo, Drive real, memoria real ou ato de autoridade por presuncao.

Decisao operacional:

`SEGUIR_COM_RECONCILIACAO_CANONICA_E_EVOLUCAO_DOS_14_MVPS`.

## 2. Fontes varridas

### 2.1. Historico deste Chat

- varredura dos MVPs, repositorios GitHub e paginas online;
- cronograma e execucao dos pacotes Mao na Massa;
- consulta DAJ por identificador, nome, CPF exato, processo e detalhes seguros;
- incidente da resposta DAJ evasiva e posterior laudo governado;
- aceite e reversibilidade do `DAJ-2026-0002`;
- ondas de prova dos 13 MVPs demonstrativos;
- Pacote 8 com revisao tecnica executada e Video/ZIP pendentes;
- decisao de transferir Pagina Equipe para Mariana e o Codex dela;
- anexos de portfolio, padroes comuns e especificacao da Pagina Equipe recebidos em 2026-07-20.

### 2.2. Fontes locais e GitHub

- `data-publica/mvp-perfis.json`;
- `governanca/INVENTARIO_CANONICO_MVPS_CHARLIE_ECHO_v1.0.0.json`;
- `governanca/MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.json`;
- `governanca/MAPA_PROVAS_MVPS_GERAIS_v1.0.0.md`;
- pacotes Onda 1 a Onda 5;
- `governanca/RELATORIO_ACEITE_E_REVERSIBILIDADE_PACOTE_1C_DAJ_2026-07-19.md`;
- `governanca/PACOTE8_REVISAO_GERAL_VIDEO_ZIP_BUILD_WEEK_2026-07-20_v1.0.0.md`;
- portal principal e repositorios `mvp`, `charlieecho`, `backend-api`, `governanca`, `documentacao`, `admin-painel`, `investimentos` e `aulas`;
- catalogo publico com 31 repositorios Jus 9;
- branch remota `main` conferida no commit `47d2b1cbef3a83ee9889dc8dd71c7788f70bf1ea`;
- nenhum PR recente e nenhuma issue aberta encontrada para MVP no repositorio principal no momento da varredura.

### 2.3. Paginas publicas conferidas

- `https://jus9tecnologia.com.br/app-painel-mvps.html`;
- `https://jus9tecnologia.com.br/mvp-o-que-ja-funciona.html`;
- `https://jus9tecnologia.com.br/build-week-2026.html`;
- `https://jus9tecnologia.com.br/saiba-mais.html`;
- `https://jus9tecnologia.com.br/versionamento.html`.

### 2.4. Referencias externas para os gates comuns

- WCAG 2.2, preferencialmente nivel AA para os fluxos essenciais;
- OWASP ASVS 5.0.0 para requisitos de seguranca da aplicacao;
- OWASP Top 10 for LLM Applications 2025 e LLMSVS para riscos de IA;
- NIST AI RMF e perfil de IA generativa para governanca de risco;
- LGPD, materiais da ANPD e revisao humana competente;
- Termo de Uso DataJud v1.2 e documentacao oficial CNJ para o DAJ;
- padroes oficiais PDPJ-Br apenas como readiness, sem capacidade transacional presumida.

## 3. Linha de base correta em 2026-07-20

### 3.1. Portfolio

| Grupo | MVPs | Estado de referencia |
| --- | --- | --- |
| Piloto operacional | DAJ | `ATIVO_PUBLICADO_COM_DADOS_FICTICIOS` |
| Vitrines governadas | DED, DIC, DEE, DEJI, DPJ, DIP, DAA, DEJ, DOI, DGE | `DEMONSTRATIVO_PUBLICADO` |
| Vitrines de alta sensibilidade | DMP, DAP, DMG | `DEMONSTRATIVO_RESTRITO` |

Os quatorze codigos canonicos sao:

`DAJ`, `DAA`, `DEJ`, `DIC`, `DPJ`, `DIP`, `DEE`, `DEJI`, `DOI`, `DGE`, `DMG`, `DMP`, `DAP`, `DED`.

### 3.2. Correcoes de verdade necessarias

1. `PACOTE_1C_CONCLUIDO_COM_RESSALVA_CORRETIVA`: o relatorio posterior confirma laudo aceito, exclusao, tombstone e ausencia operacional do teste ficticio.
2. Memoria e Drive deixaram o bloqueio absoluto por G0, mas continuam apenas em `AUTORIZADO_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA`; isso nao equivale a producao real.
3. `CHARLIE_CORE_IMPLEMENTADO`: registry, politicas, risco, prompt governado e testes existem desde a release 1.17.0.
4. `CONTRATOS_JSON_IMPLEMENTADOS`: ChatRequest, ChatResponse, DocumentSaveRequest, DataJudSearchRequest e AuditEvent possuem validadores e testes; o contrato atual informado pelo runtime e `1.2.0`.
5. Painel executivo, mapa publico, Build Week, Pacote 8 e cronogramas antigos ainda exibem estados anteriores. Eles devem ser corrigidos sem apagar o historico.
6. O anexo de portfolio e padroes fornece uma boa norma transversal, mas a afirmacao de que somente Pagina Equipe esta especificada nao substitui o inventario vigente dos 14 MVPs.

## 4. Regra de execucao de cada pacote

Cada pacote V4 deve seguir a mesma sequencia:

1. confirmar escopo, fonte canonica e arquivos afetados;
2. registrar riscos, dados, dependencias e decisoes humanas;
3. trabalhar em branch ou worktree identificada;
4. implementar a menor alteracao coerente;
5. executar testes positivos, negativos, de autorizacao e de regressao proporcionais ao risco;
6. produzir evidencia reproduzivel e registrar limitacoes;
7. obter decisao humana quando houver promocao de estado, dado real, efeito externo ou alta sensibilidade;
8. versionar documento, changelog, release, cache e contrato quando aplicavel;
9. publicar somente depois do aceite correspondente;
10. executar smoke publico e registrar rollback.

Regra fixa: `NAO_ATIVAR_DADO_REAL_POR_PRESUNCAO`.

## 5. Cronograma executivo

| Pacote | Janela | Tema | Saida principal | Estado inicial |
| --- | --- | --- | --- | --- |
| V4-01 | 20-21/07/2026 | Reconciliacao canonica | Estados locais e publicos alinhados ao aceite 1C e ao Charlie Core existente | `PRONTO_PARA_EXECUCAO` |
| V4-02 | 22-24/07/2026 | Portfolio Canonico V2 | Ficha completa e classificacao verificavel dos 14 MVPs | `PLANEJADO` |
| V4-03 | 27-29/07/2026 | Nucleo compartilhado ponta a ponta | Core e contratos consumidos de forma consistente por portal, Worker e backend | `PLANEJADO` |
| V4-04 | 30/07-04/08/2026 | Seguranca, LGPD, IA e acessibilidade | Baseline comum e matriz de evidencias por risco | `PLANEJADO` |
| V4-05 | 05-12/08/2026 | Revalidacao dos 14 MVPs em ondas | Aceites tecnicos e humanos por MVP, sem dado real | `PLANEJADO` |
| V4-06 | 13-17/08/2026 | Repositorios, backlog e operacao | Mapa de fontes, responsaveis, issues e candidatos sem duplicacao | `PLANEJADO` |
| V4-07 | 18-20/08/2026 | Publicacao consolidada | Portal, mapa de estados, Build Week e versionamento coerentes | `PLANEJADO` |
| V4-08 | sem data nesta rodada | Revisao geral, Video e ZIP | Revisao de todos os pacotes; depois Video e ZIP final | `DEFERIDO_POR_DECISAO_HUMANA` |

## 6. Passo a passo por pacote

### PACOTE_V4_01_RECONCILIACAO_CANONICA

Objetivo: remover contradicoes entre evidencia posterior, documentos antigos e paginas publicas.

Passos:

1. criar matriz unica `fonte -> estado -> evidencia -> pagina consumidora`;
2. marcar o Pacote 1C como `CONCLUIDO_COM_RESSALVA_CORRETIVA`;
3. substituir o bloqueio absoluto de Memoria/Drive por homologacao controlada, sem ativacao real;
4. marcar Charlie Core e contratos como implementados e testados;
5. atualizar cronograma, painel, mapa publico, Build Week, manifesto de estado, README e versionamento;
6. preservar v3.1.1 e documentos anteriores como historico, com aviso de superacao;
7. rodar CI completa, smoke publico e auditor de afirmacoes.

Criterio de pronto:

- nenhuma pagina vigente afirma que 1C ainda aguarda novo teste;
- nenhuma pagina apresenta Charlie Core como trabalho inexistente;
- nenhuma pagina apresenta Memoria/Drive como producao autorizada;
- Video e ZIP continuam pendentes.

Decisao humana: aprovar a publicacao da nova classificacao.

### PACOTE_V4_02_PORTFOLIO_CANONICO_V2

Objetivo: aplicar os novos padroes aos 14 MVPs sem transferir a Pagina Equipe para este Chat.

Passos:

1. criar schema versionado da ficha de produto;
2. preencher problema, publico, valor, escopo, exclusoes, dados, riscos, dependencias e responsaveis de cada MVP;
3. classificar ciclo de vida e maturidade com evidencia, sem usar apenas etiquetas visuais;
4. mapear cada requisito aos codigos comuns `MVP-IAM`, `MVP-SEC`, `MVP-LGPD`, `MVP-ETH`, `MVP-AI`, `MVP-AUD`, `MVP-DAT`, `MVP-UX`, `MVP-TST` e `MVP-OPS`;
5. mapear sobreposicoes dos candidatos dos anexos com os produtos existentes;
6. manter Jus 9 Verde, Horas e Pagamentos, Relatorios Institucionais, Cofres, Portal de Parceiros, Memoria Viva e demais candidatos no backlog ate decisao expressa;
7. registrar Pagina Equipe como produto externo e dependencia de identidade/acesso.

Criterio de pronto:

- 14 fichas completas e auditaveis;
- candidato nao aparece como produto aprovado;
- responsavel ausente aparece como `PENDENTE_DESIGNACAO_HUMANA`;
- DGE e Pagina Equipe possuem fronteira de contrato documentada.

Decisoes humanas:

- aprovar estados e responsaveis institucionais;
- decidir quais candidatos entram em descoberta.

### PACOTE_V4_03_NUCLEO_COMPARTILHADO

Objetivo: transformar o Core existente em contrato realmente comum aos 14 MVPs.

Passos:

1. inventariar o que ainda esta duplicado em HTML e `script.js`;
2. definir uma unica fonte para registry, aliases, persona, limites, risco e revisao humana;
3. alinhar versoes dos cinco contratos entre frontend, Worker e backend;
4. validar envelope de resposta, proveniencia, citacoes, limites e proxima acao;
5. bloquear downgrade silencioso e divergencia de contrato;
6. gerar fixtures sinteticos para os 14 MVPs;
7. manter o DAJ especializado sem contaminar os demais modulos.

Criterio de pronto:

- um teste prova os 14 codigos e seus limites;
- frontend, Worker e backend concordam sobre a versao do contrato;
- falha de contrato fecha a operacao sem resposta inventada;
- alteracao de uma regra comum nao exige edicao manual em 14 paginas.

### PACOTE_V4_04_BASELINE_TRANSVERSAL

Objetivo: criar um gate comum proporcional ao risco.

Passos:

1. adotar baseline verificavel de OWASP ASVS 5.0.0;
2. testar riscos de IA com OWASP LLM Top 10/LLMSVS e NIST AI RMF;
3. mapear finalidade, minimizacao, retencao, exportacao e descarte conforme LGPD;
4. definir WCAG 2.2 AA para fluxos essenciais, com teclado, foco, rotulos, contraste e mensagens de estado;
5. executar segredo, dependencia, autorizacao, sessao, exportacao e isolamento;
6. revisar logs para impedir vazamento de pergunta, resposta, CPF, processo, token ou segredo;
7. definir incidente, backup, restauracao e rollback quando houver persistencia.

Criterio de pronto:

- matriz por MVP com controle, evidencia, resultado e risco residual;
- nenhum achado critico aberto para publicacao;
- limitacao humana ou juridica nao e apresentada como controle tecnico concluido.

Decisoes humanas:

- aprovacao juridica/LGPD proporcional ao risco;
- aceitacao expressa de risco residual relevante.

### PACOTE_V4_05_REVALIDACAO_EM_ONDAS

Objetivo: revalidar o produto real depois da reconciliacao e dos padroes comuns.

| Data | Onda | MVPs | Foco |
| --- | --- | --- | --- |
| 05/08 | 0 | DAJ | fluxo ponta a ponta ficticio, laudo, consulta, vinculo, auditoria e reversibilidade |
| 06/08 | 1 | DED, DIC | autoria/editoria e linguagem cidada segura |
| 07/08 | 2 | DEE, DEJI, DPJ | escritorio, juridico interno e metodo pericial demonstrativo |
| 10/08 | 3 | DIP, DAA, DEJ | parceria prudente, aula e estudo sem promessa ou fraude |
| 11/08 | 4 | DOI, DGE | protocolo institucional e governanca tecnica sem poder real |
| 12/08 | 5 | DMP, DAP, DMG | alta sensibilidade, nao-ato e revisao humana reforcada |

Passos de cada onda:

1. usar somente fixture sintetico identificavel;
2. executar caminho feliz e pelo menos dois caminhos negativos por MVP;
3. testar limite da IA e condicao de parada;
4. testar desktop, celular, teclado e erro de rede;
5. registrar evidencia, falha, responsavel e prazo;
6. obter aceite humano ou manter em homologacao.

Criterio de pronto:

- 14 MVPs com evidencia atual, nao apenas prova historica;
- DMP, DAP e DMG permanecem restritos e sem simulacao de autoridade;
- falha de fonte oficial nao recebe substituto generativo.

### PACOTE_V4_06_REPOSITORIOS_BACKLOG_OPERACAO

Objetivo: reduzir dispersao sem apagar historia ou repositorio.

Passos:

1. classificar os 31 repositorios como fonte primaria, consumidor, arquivo historico, candidato ou fora do escopo dos MVPs;
2. definir fonte de verdade por dominio: portal, IA, backend, governanca, dados, administracao, investimento e educacao;
3. registrar dependencias entre repositorios e versoes compativeis;
4. criar milestone e issues por pacote, caso o Fundador aprove esse fluxo;
5. adotar branch, revisao e evidencia antes de `main` para mudanca com risco;
6. organizar candidatos dos anexos sem criar produtos duplicados;
7. documentar operacao, suporte, incidente, continuidade e dono humano.

Criterio de pronto:

- cada MVP aponta sua fonte primaria e dependencias;
- nenhum repositorio e removido, arquivado ou tornado publico sem decisao humana;
- backlog separa defeito, divida, descoberta, candidato e gate humano.

### PACOTE_V4_07_PUBLICACAO_CONSOLIDADA

Objetivo: publicar somente o que foi reconciliado e aceito.

Passos:

1. atualizar painel executivo e mapa publico;
2. atualizar `saiba-mais.html` e links relacionados quando houver nova rota publica;
3. atualizar `build-week-2026.html` somente no que continuar materialmente verdadeiro;
4. atualizar versionamento, changelogs, release, sitemap, PWA e cache;
5. executar dry-run do deploy;
6. publicar em janela controlada;
7. executar smoke de todas as rotas e health;
8. comparar runtime, Git e pagina publica;
9. registrar rollback e monitorar erros.

Criterio de pronto:

- paginas publicas, fonte local e `origin/main` concordam;
- nenhum link quebrado ou status superado aparece como vigente;
- nenhuma promocao de MVP ocorreu sem evidencia e aceite.

Decisao humana: autorizar publicacao e eventual promocao de estado.

### PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP

Estado nesta rodada: `DEFERIDO_POR_DECISAO_HUMANA`.

Este e obrigatoriamente o ultimo pacote.

Ordem quando for autorizado:

1. revisar V4-01 a V4-07 e todas as evidencias;
2. confirmar elegibilidade, sandbox, direitos de ativos e termos aplicaveis;
3. executar scan final de segredos, dados pessoais e arquivos indevidos;
4. gravar o Video com roteiro aprovado e dados ficticios;
5. congelar o ZIP somente depois do Video e da revisao;
6. abrir e testar o ZIP congelado;
7. gerar SHA-256, data, tamanho e manifesto;
8. obter autorizacao humana final antes de submeter ou distribuir.

Criterio de pronto:

- `REVISAO_GERAL_EXECUTADA`;
- `VIDEO_GRAVADO_E_APROVADO`;
- `ZIP_CONGELADO_ESCANEADO_TESTADO_HASHADO`;
- nenhuma pendencia humana silenciosamente marcada como concluida.

## 7. Decisoes e verificacoes humanas

Nao impedem iniciar V4-01 e preparar V4-02:

- confirmar responsaveis institucionais de cada MVP;
- aprovar a classificacao final dos 13 demonstrativos;
- decidir quais candidatos entram em descoberta;
- aprovar uso de issues, milestones e PRs como fluxo padrao;
- validar juridico/LGPD e riscos residuais antes de qualquer dado real;
- autorizar qualquer integracao externa com efeito real;
- aprovar publicacao das correcoes de estado;
- manter Video e ZIP adiados ate ordem expressa.

## 8. Condicoes permanentes de parada

Parar o pacote se houver:

- dado pessoal, processo, documento ou evidencia real em fixture ou demo;
- segredo, token, `.env`, cookie, sessao ou credencial em arquivo, log, print ou resposta;
- decisao juridica, policial, ministerial, judicial, financeira, academica ou institucional automatica;
- estado publico sem evidencia reproduzivel;
- divergencia entre contrato de frontend, Worker e backend;
- alteracao da Pagina Equipe sem coordenacao com Mariana e o Codex dela;
- promocao de candidato sem decisao humana;
- tentativa de antecipar Video ou ZIP antes da revisao geral.

## 9. Proxima acao unica

Executar `PACOTE_V4_01_RECONCILIACAO_CANONICA`.

Primeiro resultado esperado: uma matriz de divergencias que permita corrigir estados superados sem ativar capacidade nova.
