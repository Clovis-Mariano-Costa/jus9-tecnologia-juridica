---
id: JUS9-CONTINUIDADE-CODEX-CHARLIE-ECHO-2026-07-17
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-17
status: ativo
classificacao: INTERNO
hash: nao-aplicavel-documento-de-continuidade
---

# Continuidade Codex - Charlie Echo e ecossistema Jus 9

## Leia isto primeiro

Este documento existe para permitir que outro Chat do Codex retome o trabalho sem reconstruir meses de contexto e sem desfazer decisoes ja aprovadas.

Antes de editar qualquer arquivo:

1. Leia este documento inteiro.
2. Confira `git status`, `git log` e o health de producao.
3. Preserve toda alteracao que ja estiver no worktree e nao tiver sido criada por voce.
4. Revalide o comportamento existente antes de propor uma arquitetura nova.
5. Continue pelo ponto indicado em **Retomada imediata**.

O repositorio e a producao sao a fonte tecnica final. Este documento registra o estado conhecido em 17/07/2026, mas nao substitui nova verificacao.

## Objetivo maior

Construir a governanca geral da Charlie Echo como uma orquestradora modular, auditavel, criativa e juridicamente responsavel. O DAJ Advogados e o primeiro modelo de producao. Quando o modelo estiver aprovado, os componentes compartilhados devem ser replicados para os demais MVPs sem apagar a identidade propria de cada modulo.

Google Drive e a memoria operacional oficial. Git e a fonte versionada de codigo, contratos, governanca e documentacao. Nenhuma memoria temporaria pode ser promovida silenciosamente a memoria permanente.

## Ordem constitucional obrigatoria

Toda decisao da Charlie deve respeitar esta ordem:

1. Prioritario.
2. Principios.
3. Constituicao.
4. Leis internas.
5. Regimentos.
6. Protocolos.

No DNA ficam a identidade mais antiga, os caminhos para MiniBackend/Drive Saver e as capacidades operacionais. Na Constituicao ficam valores, principios eticos e limites gerais. As Tres Leis da Robotica de Isaac Asimov foram adotadas pelo usuario como clausulas petreas simbolicas da personalidade. Elas sao principios narrativos de governanca, nao uma garantia tecnica de seguranca e nunca substituem autorizacao, controle de acesso, auditoria ou legislacao aplicavel.

## Decisoes aprovadas pelo usuario

- A governanca geral da Charlie e prioridade; o DAJ Advogados recebe a primeira aplicacao pratica.
- Depois da aprovacao do modelo DAJ, replicar para todos os MVPs e modulos.
- Google Drive e a memoria operacional oficial desde ja.
- A Charlie deve consultar a API em toda resposta que dependa de inteligencia, memoria, fonte, dado oficial ou acao; nao usar resposta local congelada para simular inteligencia.
- Em falha de API critica, falhar de forma explicita e fechada. Nunca substituir por texto generico que pareca resposta real.
- A Charlie pode criar, ser criativa e elaborar pecas completas dentro da lei. Ela nao deve ser reduzida a uma maquina de escrever nem a um menu de fontes.
- A Charlie pode salvar automaticamente documentos no Drive e gerar PDF quando o contexto e a governanca permitirem.
- Ela pode criar link publico por julgamento governado. Criacao, revogacao e exclusao devem ser reais, auditadas e executadas pelo backend autorizado.
- Nunca inventar `downloadUrl`, URL publica, autor, obra, pagina, processo, decisao, prazo, fato ou resultado de pesquisa.
- O usuario e reconhecido pelo login. Deve existir memoria por usuario e painel de configuracao por instrumento/MVP.
- Membros da equipe podem sugerir mudancas. A Charlie tambem deve sugeri-las quando perceber necessidade relevante.
- O modulo social DIC tem personalidade e regras proprias. Nao transformar sua linguagem ou seus fluxos em uma copia do DAJ profissional.
- Pesquisa de processo por nome ou CPF nao pode usar modelo generativo como mecanismo de consulta.
- Aprovacao de cadastro no diretorio de equipe nao concede privilegio de login automaticamente enquanto nao existir ativacao e revogacao verificaveis.

## Repositorios

### Portal, Worker e MVPs

`C:\Users\aeonp\Documents\GitHub\jus9-tecnologia-juridica`

Responsabilidades principais:

- paginas publicas e autenticadas;
- Worker Cloudflare e rotas `/api/*`;
- autenticacao, permissoes, KVs e proxy governado;
- DAJ, processos, DataJud, memoria por usuario e diretorio modular;
- releases, governanca, testes e documentacao.

### API central da Charlie Echo

`C:\Users\aeonp\Documents\GitHub\charlieecho-jus9-tecnologia-juridica`

Responsabilidades principais:

- raciocinio e roteamento da Charlie;
- contratos de Drive Saver e MiniBackend;
- guardas contra respostas inventadas;
- leitura de arquivos, OCR e producao documental;
- rota governada de analise do DAJ.

Estado conhecido em 17/07/2026:

- branch `main` limpa e sincronizada com `origin/main`;
- HEAD `9557903 fix: preserva rota governada de analise DAJ`;
- ultima bateria conhecida: 69 testes aprovados. Reexecutar antes da proxima alteracao nesse repositorio.

## Estado atual do repositorio principal

Estado conferido em 17/07/2026:

- branch `main` sincronizada com `origin/main` no commit `a4d9fe0`;
- existem tres commits posteriores ao pacote da equipe, dedicados ao Google Calendar:
  - `9bd4c38 Organiza regravacao do video Google Calendar`;
  - `3236254 Reduz Calendar para escopo owned e desvinculo`;
  - `a4d9fe0 Centraliza responsabilidade Google`;
- ha uma alteracao local do usuario em `GOOGLE_CALENDAR_PRODUCAO_1B/RESPOSTA_AO_GOOGLE_APOS_NOVO_VIDEO_2026-07-17.md`.

Nao reverter, sobrescrever, formatar, incluir em commit ou publicar essa alteracao local sem pedido expresso. Ela pertence a uma frente paralela do usuario.

## Producao confirmada

URL principal: `https://jus9tecnologia.com.br/`

Health: `https://jus9tecnologia.com.br/api/health`

Snapshot verificado em 17/07/2026:

- release: `governanca-1.15.1-team-local-cleanup-1.0`;
- status: `ready`;
- autenticacao: configurada;
- memoria por usuario: configurada e isolada em `JUS9_USER_MEMORY`;
- proxy da Charlie: configurado;
- Drive privilegiado: configurado;
- DataJud: configurado, somente leitura de metadados, com cache;
- PDPJ: nao configurado, apenas readiness;
- cadastro DAJ: configurado, com escrita oficial;
- indice de CPF do DAJ: HMAC-SHA-256, sem CPF bruto como chave;
- vinculo DAJ-processo: configurado;
- pesquisa interna de partes: nome e CPF exato configurados;
- pesquisa externa de partes: `awaiting_official_guidance`.

Worker publicado para a release 1.15.1: `3ea6e197-148f-4fac-b4ba-ca307e86c51e`.

Rollback imediato da release 1.15.1: Worker `0e88eb11-0aea-41ea-96b9-fad866073b3e`, correspondente a 1.15.0. Preservar todos os KVs em qualquer rollback.

## Entregas ja consolidadas

### Charlie Echo

- fluxo API-first para respostas juridicas e profissionais;
- bloqueio de fallback local generico em rotas criticas;
- guardas contra atribuicao falsa de obra, autor e pagina;
- correcao conhecida: `A moderna teoria do fato punivel` e associada a Juarez Cirino dos Santos, e nao pode ser atribuida a outro autor sem fonte verificada;
- upload e leitura de documentos, PDF, DOCX e OCR;
- integracao governada com Drive Saver;
- criacao de documento real e retorno de URL somente quando o backend devolver URL verdadeira;
- memoria oficial por usuario;
- sala isolada de analise DAJ: `daj_analise_governada`.

### DAJ

- salvamento oficial no backend, nao apenas no navegador;
- idempotencia e minimizacao de dados;
- um DAJ corresponde a no maximo um processo;
- nome e CPF podem estar associados a varios DAJs;
- envio para analise da Charlie deve abrir nova sala e ler o DAJ oficial pelo identificador;
- a analise deve produzir sintese fiel, lacunas, riscos sustentados, perguntas, proximas acoes e limites;
- toda analise deve gerar feedback e encaminhamento adequado;
- quando o autor for estagiario, encaminhar a assessor ou advogado conforme regra de equipe;
- nao misturar intencao de consulta de parte com intencao de producao de peca.

### Processos e DataJud

- pesquisa pelo numero CNJ funciona por conector DataJud read-only;
- mapa de aliases de tribunais e DTO interno implementados;
- cache e auditoria de metadados implementados;
- DataJud fornece metadados publicos, nao autos nem documentos do processo;
- consulta por nome/CPF usa `/api/judicial/parties/search`, autenticada e separada da API generativa;
- fonte interna governada pode pesquisar nome e CPF exato;
- fonte externa nacional por nome/CPF continua aguardando orientacao oficial e credenciais;
- se a fonte externa nao estiver disponivel, informar indisponibilidade objetiva e nao presumir processos, partes ou vinculos;
- PDPJ, MNI e Domicilio Judicial nao devem executar atos transacionais ainda.

### Diretorio de equipe

Pagina: `https://jus9tecnologia.com.br/app-equipe.html?mvp=DAJ`

- componente governado compartilhado por 14 modulos;
- modulos canonicos: DAJ, DAA, DEJ, DIC, DPJ, DIP, DEE, DEJI, DOI, DGE, DMG, DMP, DAP e DED;
- aliases: INV para DIP e ORG para DOI;
- navegacao, perfis e permissoes variam por modulo;
- DIC permite ao cidadao solicitar seu proprio perfil, mas nao listar diretorio interno;
- chaves locais antigas `jus9MvpTeamMembersV1` e `jus9MvpTeamAuditV1` foram removidas;
- `initTeamPage` foi removido;
- `initTeamMenuLink` permanece e liga os MVPs ao diretorio modular;
- backend e a autoridade final, nunca o formulario frontend.

APIs existentes:

- `POST /api/profile-requests`;
- `POST /api/profile-requests/action`;
- `GET /api/profile-requests/audit`;
- `GET /api/governed-profiles`.

Permissoes:

- `profiles:request`;
- `profiles:read`;
- `profiles:manage`.

Invariante de seguranca: pedido aprovado no diretorio ainda e cadastro governado, nao permissao efetiva de acesso. A proxima camada precisa de ativacao, revogacao e comprovacao de estado antes de ligar essas duas coisas.

### Frontend

- DAJ recebeu camada visual limpa em `assets/css/daj-clean-ui.css`;
- sete paginas DAJ/modelo usam menus operacionais padronizados;
- a direcao visual e reduzir botoes aparentes, manter comandos essenciais e concentrar opcoes secundarias em configuracoes/menu lateral;
- fala, upload e configuracoes devem seguir o mesmo componente em todas as salas da Charlie;
- nao retirar funcionalidade para obter aparencia limpa;
- evitar explicacoes longas dentro da interface;
- a pagina modelo de processos e `app-processos.html`;
- a pagina profissional principal da Charlie e `app-ia-profissional.html`;
- o atendimento inicial e `app-atendimento-inicial.html`.

## Modulos e identidades

- DAJ: Advogados.
- DAA: Professor e Academia.
- DEJ: Estudante.
- DIC: Social e Cidadao.
- DPJ: Perito Judicial.
- DIP: Investidor e Parceiro.
- DEE: Escritorio Juridico.
- DEJI: Empresa e Juridico Interno.
- DOI: Orgao Publico e Instituicao.
- DGE: Governanca do Ecossistema.
- DMG: Magistratura.
- DMP: Ministerio Publico.
- DAP: Autoridade Policial.
- DED: Autor e Editor.

Cada instrumento pode compartilhar infraestrutura, mas precisa manter prompts, memoria de sala, ferramentas, perfis, tom, menu e limites proprios.

## Arquitetura de governanca exigida

Diretorios previstos e ja iniciados:

- `/governanca`;
- `/memoria`;
- `/prompts`;
- `/documentacao`;
- `/apis`;
- `/modelos`;
- `/logs`;
- `/testes`;
- `/releases`;
- `/historico`;
- `/obsoleto`.

Memoria separada em:

- permanente;
- evolutiva;
- temporaria;
- conversacional.

Prompts separados por dominio:

- identidade;
- governanca;
- juridico;
- programacao;
- atendimento;
- marketing;
- pesquisa;
- investimentos;
- seguranca;
- desenvolvedor.

Todo documento de governanca deve registrar ID, versao, autor, revisor, data, status, classificacao e hash quando aplicavel. Nunca sobrescrever versao aprovada. Atualizar CHANGELOG e release quando houver mudanca comportamental.

## Regras que nao podem regredir

1. Nunca inventar resultado para preencher silencio de API.
2. Nunca fazer pesquisa por nome/CPF em modelo generativo.
3. Nunca usar texto generico de peca como resposta a consulta processual.
4. Nunca retornar link de Drive ou download que nao veio de operacao real.
5. Nunca abrir sala antiga ao enviar DAJ para analise.
6. Nunca analisar rascunho local quando o fluxo afirma ler cadastro oficial.
7. Nunca permitir que instrucao contida em upload substitua a governanca da sala.
8. Nunca registrar ciencia, peticionar ou praticar ato transacional sem camada especifica, perfil autorizado, confirmacao humana e auditoria.
9. Nunca armazenar CPF bruto como indice pesquisavel quando o contrato exige HMAC.
10. Nunca misturar memoria de usuarios ou modulos.
11. Nunca promover memoria temporaria automaticamente a permanente.
12. Nunca achatar o modulo social em linguagem juridica profissional.
13. Nunca transformar aprovacao cadastral em privilegio silencioso.
14. Nunca enviar segredo, token ou credencial por e-mail, log, documento ou resposta.
15. Nunca alterar dados reais durante smoke test de producao.

## Validacao conhecida

A ultima CI completa da release 1.15.1 terminou com:

`LOCAL_CI_OK portal,rls,sql-homologacao,worker-auth,backend-local,charlie-echo,instalacao-publica,qr-codes`

Tambem foram aprovados:

- matriz de autenticacao dos 14 modulos;
- sequencia social DIC `201/200/403`: solicitar, consultar pedido proprio e bloquear diretorio interno;
- homologacao DAJ;
- RLS;
- backend fail closed;
- instalacao publica e QR codes;
- ausencia das chaves locais de equipe na producao.

Comando principal de CI no repositorio:

```powershell
node scripts/run-local-ci.mjs
```

Validacao isolada do Worker:

```powershell
node tests/validate-worker-auth.mjs
```

Dry-run Cloudflare:

```powershell
npx wrangler deploy --dry-run
```

Antes de publicar, localizar e executar tambem o sincronizador vigente de `dist`; nao assumir que os assets da raiz ja estao copiados. Conferir `git diff --stat` depois da sincronizacao e nao incluir arquivos do usuario por acidente.

## Aceite visual pendente

A automacao de navegador falhou anteriormente com `Cannot redefine property: process`. Por isso, os testes estruturais e HTTP passaram, mas o aceite visual autenticado destes cinco contextos continua pendente:

- `https://jus9tecnologia.com.br/app-equipe.html?mvp=DAJ`;
- `https://jus9tecnologia.com.br/app-equipe.html?mvp=DIC`;
- `https://jus9tecnologia.com.br/app-equipe.html?mvp=DPJ`;
- `https://jus9tecnologia.com.br/app-equipe.html?mvp=DEJI`;
- `https://jus9tecnologia.com.br/app-equipe.html?mvp=DGE`.

Conferir desktop e celular, menu lateral, perfis disponiveis, solicitacao, listagem permitida, bloqueio DIC, mensagens vazias/erro e ausencia de overflow. Nao iniciar ativacao automatica de acesso antes desse aceite.

## Retomada imediata

### Pacote 1 - fechar aceite do diretorio modular

1. Confirmar que o worktree nao contem mudanca alheia que sera afetada.
2. Abrir os cinco modulos indicados acima com login de teste apropriado.
3. Registrar problemas visuais ou comportamentais por modulo.
4. Corrigir apenas o componente compartilhado quando a correcao for realmente comum.
5. Reexecutar CI completa e smoke sem gravar dado real.

### Pacote 2 - ativacao e revogacao governadas

Somente depois do aceite visual:

1. modelar estado separado para cadastro, aprovacao, acesso ativo, suspenso e revogado;
2. definir autoridade por modulo e impedir escalada lateral;
3. criar ativacao idempotente e revogacao verificavel;
4. registrar agente, alvo, modulo, perfil, justificativa, versao, data e resultado;
5. manter a politica de login como autoridade final;
6. oferecer reconciliacao que detecte cadastro aprovado sem acesso e acesso sem cadastro;
7. adicionar testes de autoelevacao, elevacao entre modulos, dupla aprovacao, revogacao e replay.

Nao conectar diretamente o botao `aprovar` a um privilegio efetivo sem esse desenho completo.

### Pacote 3 - feedback e comunicacao

1. implementar aviso interno e/ou convite depois de ativacao real;
2. enviar somente URL de entrada e contexto minimo;
3. nunca enviar segredo;
4. registrar entrega, falha e reenvio;
5. aplicar preferencias e identidade do modulo.

### Pacote 4 - painel transversal

1. painel administrativo para pedidos, acessos ativos, suspensoes e revogacoes;
2. filtros por MVP, perfil, status e periodo;
3. trilha de auditoria exportavel para investidores e parceiros;
4. visibilidade minima por papel;
5. indicadores sem expor conteudo juridico sigiloso.

### Pacote 5 - replicacao da experiencia da Charlie

1. consolidar componente unico de fala, upload e configuracoes;
2. validar no DAJ;
3. replicar por configuracao, sem copiar logica divergente;
4. preservar personalidade DIC e demais instrumentos;
5. validar memoria por usuario e por sala em cada MVP.

## Cronograma curto recomendado

O usuario pediu a maior velocidade que a seguranca permitir. Use pacotes pequenos, publicaveis e reversiveis:

- Dia 1: aceite visual e correcoes do diretorio modular.
- Dias 2 e 3: contrato, backend e testes da ativacao/revogacao.
- Dia 4: frontend da ativacao, reconciliacao e auditoria.
- Dia 5: comunicacao e painel transversal inicial.
- Semana 2: componente compartilhado de chat, fala, upload e configuracoes; DAJ como homologacao.
- Semanas 3 e 4: replicacao progressiva para DIC, DPJ, DEJI e DGE, depois os demais modulos.
- Meses seguintes: DataJud ampliado com fontes oficiais; PDPJ/MNI/Domicilio apenas apos credenciais, caso de uso e governanca transacional aprovados.

O roadmap de portfolio pode abranger 12 meses para todos os MVPs, mas cada pacote tecnico deve terminar com teste, release, rollback e evidencias no mesmo ciclo.

## Passos dos primeiros 30 minutos do proximo Chat

Execute nesta ordem:

```powershell
cd C:\Users\aeonp\Documents\GitHub\jus9-tecnologia-juridica
& "C:\Users\aeonp\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" status --short --branch
& "C:\Users\aeonp\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" log -10 --oneline --decorate
Invoke-RestMethod "https://jus9tecnologia.com.br/api/health?continuity=$([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())" | ConvertTo-Json -Depth 8
node scripts/run-local-ci.mjs
```

Depois:

1. comparar a release do health com `wrangler.jsonc`;
2. conferir se o arquivo do Google Calendar continua modificado e preserva-lo;
3. ler `VERSIONAMENTO_DIRETORIO_EQUIPE_MODULAR_v1_0.md`;
4. ler `releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.15.1.md`;
5. iniciar o aceite visual do Pacote 1;
6. somente entao editar.

Se a CI falhar, corrigir a regressao antes de adicionar funcionalidade. Se producao e repositorio divergirem, diagnosticar a divergencia antes de publicar.

## Publicacao segura

- Stage somente os arquivos do pacote atual.
- Nao usar `git add .` em worktree com arquivos do usuario.
- Revisar `git diff --cached` antes do commit.
- Separar commit tecnico de documentacao quando isso facilitar rollback.
- Atualizar versao semantica, CHANGELOG e release.
- Fazer dry-run do Worker.
- Publicar com preservacao de secrets e bindings existentes.
- Confirmar health e assets em producao com cache-buster.
- Fazer smoke read-only.
- Registrar ID do Worker e caminho de rollback.

## Fontes juridicas e pesquisa

No modulo profissional, priorizar fontes oficiais e academicas reais, incluindo:

- STF, STJ, TST e tribunais competentes;
- Planalto;
- LexML;
- DataJud/CNJ para metadados processuais;
- BDTD: `https://bdtd.ibict.br/`;
- SciELO e Portal CAPES quando adequados.

A Charlie deve pesquisar e responder, nao apenas listar onde o usuario poderia pesquisar. Quando nao houver acesso ao conteudo necessario, deve dizer exatamente o que nao conseguiu verificar. Citacao com pagina so pode ser apresentada como verificada quando a pagina da edicao consultada estiver realmente disponivel.

## Documentos essenciais para leitura

- `VERSIONAMENTO_DIRETORIO_EQUIPE_MODULAR_v1_0.md`;
- `VERSIONAMENTO_DIRETORIO_EQUIPE_DAJ_v1_0.md`;
- `VERSIONAMENTO_VINCULO_DAJ_PROCESSO_v1_0.md`;
- `VERSIONAMENTO_GATEWAY_CNJ_DATAJUD_TRIBUNAIS_v1_0.md`;
- `VERSIONAMENTO_MEMORIA_USUARIO_OFICIAL_LOGIN_v1_1.md`;
- `releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.15.1.md`;
- `releases/CHANGELOG.md`;
- `governanca/CHANGELOG.md`;
- `prompts/CHANGELOG.md`;
- `memoria/CHANGELOG.md`.

## Fechamento para o proximo Codex

Nao recomecar a Charlie do zero. A base mais dificil ja foi construida: API-first, Drive governado, DAJ oficial, DataJud read-only, memoria por usuario, fail-closed e diretorio modular. O proximo salto e ligar identidade aprovada a acesso real sem perder revogacao, segregacao por modulo e rastreabilidade.

O usuario autorizou iniciativa ampla, mas valoriza conversa antes de decisoes profundas. Avance sozinho em diagnostico, implementacao reversivel, testes e documentacao. Pare para perguntar somente quando houver escolha de negocio irreversivel, credencial ausente, risco juridico relevante ou conflito real entre fontes.

Preserve o que funciona. Volte de proposito para verificar; nunca volte por ter avancado sem evidencias.
