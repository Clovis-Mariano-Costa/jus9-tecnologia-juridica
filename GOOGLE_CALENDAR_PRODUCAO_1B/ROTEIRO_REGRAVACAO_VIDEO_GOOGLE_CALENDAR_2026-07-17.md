# Roteiro de regravacao - Google OAuth Calendar

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-17
Projeto Google Cloud: `jus-9-tecnologia-juridica`
Numero do projeto: `161727838854`

## 1. Por que regravar

O Google informou que o video anterior nao demonstrou suficientemente:

- por que o escopo `https://www.googleapis.com/auth/calendar.events` e necessario;
- por que escopos mais restritos nao bastariam;
- a funcionalidade operacional completa do escopo;
- a tela de consentimento OAuth com escopos totalmente expandidos e legiveis;
- o impacto do evento criado dentro da conta Google Calendar de origem;
- a conformidade de Uso Limitado quando ha mencao a IA/ML no produto.

## 2. Decisao antes de gravar

Antes de regravar, confirmar com o Fundador:

1. Manter `https://www.googleapis.com/auth/calendar.events`; ou
2. Avaliar troca para `https://www.googleapis.com/auth/calendar.events.owned`.

Observacao tecnica: o codigo atual usa `calendarId: "primary"` para listar/criar eventos. Como isso tende a operar na agenda principal da propria conta de teste, `calendar.events.owned` pode ser uma opcao mais estreita e mais alinhada ao principio de menor privilegio. Nao alterar no Google Cloud nem no codigo sem confirmacao expressa.

Se mantiver `calendar.events`, o video precisa explicar que a funcao prevista e listar e criar eventos operacionais revisados na agenda conectada pelo usuario, e que escopos somente leitura nao bastam porque o usuario precisa criar o evento pelo app.

## 3. Preparacao segura

- Usar conta de teste governada, sem dados pessoais reais.
- Usar uma janela limpa do Chrome, com zoom entre 90% e 100%.
- Nao mostrar secrets do Cloudflare, tokens, cookies, chaves, `.env`, senhas ou dados de clientes.
- Usar somente dados ficticios.
- Antes de gravar, sair da sessao local da Jus 9.
- Se possivel, deixar a tela de consentimento Google em ingles.
- Se aparecer "Show all services" ou "Mostrar todos os servicos", clicar para expandir todos os escopos.
- Deixar o titulo do evento unico para facilitar busca no Google Calendar.

Titulo sugerido do evento:

`JUS9-GOOGLE-VERIFY-CALENDAR-2026-07-17-001`

Descricao sugerida:

`Fictitious event created only for Google OAuth verification. No real client, case, legal strategy, health, financial or confidential data.`

## 4. Estrutura recomendada do video

Duracao alvo: 8 a 12 minutos. Se ficar maior, tudo bem; melhor completo que curto demais.

### Bloco 1 - Identidade e escopo do app

Mostrar:

1. `https://jus9tecnologia.com.br/`
2. Nome e marca Jus 9.
3. `https://jus9tecnologia.com.br/documentos/google-calendar.html`
4. Trechos sobre menor privilegio, dados acessados, Uso Limitado e IA/ML.
5. `https://jus9tecnologia.com.br/documentos/privacidade.html`
6. Trecho que declara que dados Google Workspace/Calendar nao sao usados para treinar IA/ML.

Narracao sugerida em ingles:

`This is Jus 9 Tecnologia Juridica. The Google Calendar feature is separate from basic Google sign-in and is used only after a governed user gives explicit consent. Google Workspace data, including Calendar data, is not used to train generalized AI or ML models.`

### Bloco 2 - Mostrar o app e a necessidade do escopo

Abrir:

`https://jus9tecnologia.com.br/app-agenda.html`

Mostrar:

1. A Agenda Jus 9.
2. O formulario de evento.
3. O botao `Salvar na Google Agenda`.
4. O painel `Google Agenda real`.

Narracao sugerida em ingles:

`The user-facing feature lets an authorized user create an operational event from the Jus 9 Agenda screen and send it to their own Google Calendar. A read-only scope is not sufficient because the feature creates a user-reviewed event. Gmail, Drive, Contacts and files are not requested.`

### Bloco 3 - Login basico separado

Mostrar:

1. Entrar com Google, se ainda nao estiver logado.
2. Confirmar que o login basico apenas cria sessao.
3. Opcional: abrir `/api/auth/me` rapidamente e mostrar apenas `authenticated`, `provider`, `profile` e `accessMode`, sem expor e-mail real se nao for necessario.

Narracao sugerida em ingles:

`Basic sign-in is separate and uses only openid, email and profile. Calendar authorization is not requested during basic sign-in.`

### Bloco 4 - Consentimento incremental Calendar

No app:

1. Clicar `Conectar Google Agenda`.
2. Na tela Google OAuth, mostrar:
   - nome do app;
   - barra de endereco com `client_id`;
   - conta de teste;
   - escopo de Calendar totalmente expandido;
   - se existir, clicar `Show all services` / `Mostrar todos os servicos`.
3. Autorizar.

Narracao sugerida em ingles:

`This is the separate Google Calendar consent flow. The OAuth consent screen shows the same Calendar scope submitted in Google Cloud. The scope is requested only when the user starts the Calendar connection.`

## 5. Provar impacto na conta Google

Depois do retorno ao app:

1. Confirmar status `Google Agenda conectada com permissao governada`.
2. Preencher evento ficticio:
   - titulo: `JUS9-GOOGLE-VERIFY-CALENDAR-2026-07-17-001`
   - tipo: reuniao/equipe
   - data/hora: hoje ou amanha
   - descricao ficticia sem dados reais
3. Clicar `Salvar na Google Agenda`.
4. Mostrar mensagem de sucesso no app.
5. Clicar `Listar eventos` e mostrar o evento listado no app.
6. Abrir `https://calendar.google.com/` na mesma conta de teste.
7. Procurar o titulo do evento.
8. Abrir o evento no Google Calendar e mostrar que ele foi criado.

Narracao sugerida em ingles:

`The event was created in the Jus 9 app and is now visible in the source Google Calendar account. This demonstrates the write capability enabled by the Calendar events scope. The app does not implement deletion in this verification flow.`

## 6. Mostrar governanca e limite publico

Opcional, mas recomendado:

1. Fazer logout.
2. Entrar com uma conta publica/cidadao, se houver uma conta de teste publica.
3. Mostrar que o perfil publico nao consegue conectar Calendar, ou que a conexao fica indisponivel.

Narracao sugerida em ingles:

`Public demo users cannot access the real Calendar OAuth flow. Calendar is restricted to governed profiles and test accounts during verification.`

## 7. Mostrar revogacao e encerramento

Mostrar:

1. `https://myaccount.google.com/connections`
2. Onde o usuario pode revisar/remover acesso.
3. Voltar para a Jus 9.
4. Logout local.

Narracao sugerida em ingles:

`The user can revoke the app connection from their Google Account connections page. Jus 9 also documents revocation and deletion paths in the privacy policy.`

## 8. Fechamento sobre IA/ML

Mostrar novamente a pagina:

`https://jus9tecnologia.com.br/documentos/google-calendar.html`

Trecho:

`Dados do Google Workspace, incluindo dados da Google Agenda, nao sao usados para desenvolver, melhorar ou treinar modelos generalizados de IA/ML.`

Narracao sugerida em ingles:

`Although Jus 9 has AI-related product pages, Google Workspace and Calendar user data from this OAuth flow is not transferred to third-party AI services and is not used to train, develop, or improve generalized AI or ML models.`

## 9. Checklist final antes de enviar

- [ ] Video mostra a aplicacao correta, marca e dominio Jus 9.
- [ ] Video mostra o fluxo OAuth completo.
- [ ] Tela de consentimento aparece legivel.
- [ ] Escopo aparece expandido e corresponde ao Google Cloud.
- [ ] Video mostra a funcao no app que usa o escopo.
- [ ] Evento criado no app aparece no Google Calendar da conta de teste.
- [ ] Video explica por que read-only nao basta.
- [ ] Video declara que Gmail, Drive, Contacts e arquivos nao sao solicitados.
- [ ] Video mostra ou menciona que dados Google Calendar nao vao para IA/ML.
- [ ] Video nao mostra segredo, token, cookie, senha ou dado real.
- [ ] Video esta no YouTube como `Nao listado` ou em link acessivel ao Google.

## 10. Observacao para o Google Cloud

O status de publicacao deve permanecer `Em producao`. Se a flag de Calendar precisar ser ativada para gravar, ativar apenas pelo menor tempo necessario e apenas para a conta governada/teste, mantendo bloqueio para usuarios publicos.
