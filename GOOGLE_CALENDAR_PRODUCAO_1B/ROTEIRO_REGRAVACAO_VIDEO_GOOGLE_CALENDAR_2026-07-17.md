# Roteiro de regravacao - Google OAuth Calendar

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-17
Projeto Google Cloud: `jus-9-tecnologia-juridica`
Numero do projeto: `161727838854`

## 1. Objetivo da regravacao

Este video deve responder ao pedido do Google de forma direta, mostrando a funcionalidade completa da Google Agenda dentro da Jus 9 e demonstrando por que o escopo solicitado e necessario.

O video precisa provar:

- que o app correto e a Jus 9 Tecnologia Juridica;
- que o dominio usado e `jus9tecnologia.com.br`;
- que o login basico com Google e separado da autorizacao da Google Agenda;
- que o escopo `https://www.googleapis.com/auth/calendar.events.owned` aparece na tela de consentimento;
- que o app cria um evento ficticio revisado pela pessoa usuaria;
- que esse evento aparece na Google Agenda da mesma conta de teste;
- que escopos somente leitura nao bastam, porque a funcao cria eventos;
- que Gmail, Drive, contatos, arquivos e senhas nao sao solicitados;
- que dados da Google Agenda nao sao usados para treinar IA/ML;
- que a pessoa usuaria pode desvincular a Agenda na Jus 9 e tambem revogar o acesso na Conta Google.

## 2. Decisao tecnica ja tomada

Decisao tomada em 2026-07-17:

- usar o escopo `https://www.googleapis.com/auth/calendar.events.owned`;
- manter Calendar separado do login basico `openid`, `email` e `profile`;
- manter bloqueio para usuario publico `cidadao`;
- demonstrar somente com conta governada/de teste;
- usar apenas dados ficticios;
- atualizar codigo, paginas publicas e pacote de verificacao para o mesmo escopo.

Observacao tecnica: o codigo usa `calendarId: "primary"` para listar e criar eventos na agenda principal da propria conta conectada. Por isso, `calendar.events.owned` e mais estreito e mais alinhado ao principio de menor privilegio do que `calendar.events`.

Antes de gravar, confirmar no Google Cloud que `Google Auth Platform > Acesso a dados` usa exatamente:

`https://www.googleapis.com/auth/calendar.events.owned`

## 3. Preparacao segura antes de gravar

- Usar conta de teste governada, sem dados pessoais reais.
- Usar janela limpa do Chrome, com zoom entre 90% e 100%.
- Nao mostrar secrets do Cloudflare, tokens, cookies, chaves, `.env`, senhas ou dados de clientes.
- Usar somente dados ficticios.
- Antes de gravar, sair da sessao local da Jus 9.
- Se a tela do Google aparecer em ingles, tudo bem; narrar em portugues.
- Se aparecer `Mostrar todos os servicos` ou `Show all services`, clicar para expandir todos os escopos.
- Deixar o titulo do evento unico para facilitar busca na Google Agenda.

Titulo sugerido do evento:

`JUS9-GOOGLE-VERIFY-CALENDAR-2026-07-17-001`

Descricao sugerida do evento:

`Evento ficticio criado somente para verificacao OAuth do Google. Nao contem cliente real, processo real, estrategia juridica, dado de saude, dado financeiro ou informacao confidencial.`

## 4. Estrutura recomendada do video

Duracao alvo: 8 a 12 minutos. Se ficar maior, tudo bem. Para a verificacao, e melhor completo do que curto demais.

## 5. Bloco 1 - Identidade do app e documentos publicos

Mostrar:

1. Abrir `https://jus9tecnologia.com.br/`.
2. Mostrar nome e marca Jus 9.
3. Abrir `https://jus9tecnologia.com.br/documentos/google-calendar.html`.
4. Mostrar os trechos sobre:
   - escopo `calendar.events.owned`;
   - menor privilegio;
   - dados acessados;
   - uso limitado;
   - IA/ML.
5. Abrir `https://jus9tecnologia.com.br/documentos/privacidade.html`.
6. Mostrar o trecho que declara que dados Google Workspace/Agenda nao sao usados para treinar IA/ML.

Fala sugerida:

`Este e o app Jus 9 Tecnologia Juridica, no dominio jus9tecnologia.com.br. A funcionalidade de Google Agenda e separada do login basico com Google e so e usada depois de consentimento explicito de uma conta governada. Dados do Google Workspace, incluindo dados da Google Agenda, nao sao usados para treinar modelos generalizados de inteligencia artificial ou aprendizado de maquina.`

## 6. Bloco 2 - Mostrar a Agenda Jus 9 e a necessidade do escopo

Abrir:

`https://jus9tecnologia.com.br/app-agenda.html`

Mostrar:

1. A tela Agenda Jus 9.
2. O formulario de evento.
3. O botao `Salvar na Google Agenda`.
4. O painel `Google Agenda real`.
5. O botao `Conectar Google Agenda`.
6. O botao `Desvincular Google Agenda`, se ja estiver visivel depois de conexao.

Fala sugerida:

`Esta tela permite que uma pessoa autorizada crie um compromisso operacional revisado dentro da Jus 9 e envie esse compromisso para a propria Google Agenda. Um escopo somente leitura nao seria suficiente, porque a funcionalidade precisa criar o evento depois da revisao humana. A Jus 9 nao solicita Gmail, Drive, contatos, arquivos nem senhas para esta funcao.`

## 7. Bloco 3 - Login basico separado

Mostrar:

1. Entrar com Google, se ainda nao estiver logado.
2. Confirmar que o login basico cria apenas a sessao.
3. Opcional: abrir `/api/auth/me` rapidamente.
4. Mostrar apenas campos como `authenticated`, `provider`, `profile` e `accessMode`.
5. Evitar expor e-mail real, se nao for necessario.

Fala sugerida:

`O login basico com Google e separado da autorizacao de Agenda. Nesta etapa, o app usa apenas openid, email e profile para criar a sessao e aplicar o perfil governado. A autorizacao de Calendar ainda nao foi solicitada.`

## 8. Bloco 4 - Consentimento incremental da Google Agenda

No app:

1. Clicar em `Conectar Google Agenda`.
2. Na tela de consentimento do Google, mostrar:
   - nome do app;
   - conta de teste;
   - dominio relacionado;
   - escopo de Google Agenda;
   - lista de servicos expandida, se houver opcao.
3. Se aparecer `Mostrar todos os servicos`, clicar para expandir.
4. Confirmar que o escopo visivel corresponde ao escopo configurado no Google Cloud:

`https://www.googleapis.com/auth/calendar.events.owned`

5. Autorizar.

Fala sugerida:

`Este e o fluxo separado de consentimento para Google Agenda. O escopo aparece na tela do Google e corresponde ao mesmo escopo configurado no Google Cloud. Ele so e pedido quando a pessoa usuaria inicia a conexao da Agenda.`

## 9. Bloco 5 - Provar o impacto na conta Google

Depois do retorno ao app:

1. Confirmar o status `Google Agenda conectada com permissao governada`.
2. Preencher evento ficticio:
   - titulo: `JUS9-GOOGLE-VERIFY-CALENDAR-2026-07-17-001`;
   - tipo: reuniao/equipe;
   - data/hora: hoje ou amanha;
   - descricao ficticia, sem dados reais.
3. Clicar em `Salvar na Google Agenda`.
4. Mostrar a mensagem de sucesso no app.
5. Clicar em `Listar eventos`.
6. Mostrar o evento listado dentro da Jus 9.
7. Abrir `https://calendar.google.com/` na mesma conta de teste.
8. Procurar pelo titulo do evento.
9. Abrir o evento na Google Agenda.
10. Mostrar que o evento criado pela Jus 9 aparece na conta Google de origem.

Fala sugerida:

`O evento foi criado na tela da Jus 9 e agora aparece na Google Agenda da mesma conta de teste. Isso demonstra a capacidade de escrita do escopo de eventos da Agenda. A criacao acontece com dados ficticios e revisao humana antes do envio.`

## 10. Bloco 6 - Mostrar governanca e limite publico

Opcional, mas recomendado:

1. Fazer logout.
2. Entrar com uma conta publica/cidadao, se houver uma conta de teste publica.
3. Mostrar que o perfil publico nao consegue conectar Calendar, ou que a conexao fica indisponivel.

Fala sugerida:

`Usuarios publicos de demonstracao nao acessam o fluxo real de OAuth da Google Agenda. A Agenda real fica restrita a perfis governados e contas de teste autorizadas durante a verificacao.`

## 11. Bloco 7 - Desvincular Agenda e mostrar revogacao

Mostrar:

1. No app, clicar em `Desvincular Google Agenda`.
2. Explicar que esse botao remove o grant local de Calendar salvo pela Jus 9.
3. Confirmar que o status volta para Agenda nao conectada.
4. Abrir `https://myaccount.google.com/connections`.
5. Mostrar onde a pessoa usuaria pode revisar ou remover o acesso diretamente na Conta Google.
6. Voltar para a Jus 9.
7. Fazer logout local.

Fala sugerida:

`A pessoa usuaria pode desvincular a Google Agenda dentro da Jus 9. Esse botao remove o vinculo local de Calendar salvo pela aplicacao. Alem disso, a pessoa usuaria tambem pode revisar ou revogar o acesso pela propria Conta Google, na pagina de conexoes da conta.`

## 12. Bloco 8 - Fechamento sobre Uso Limitado e IA/ML

Mostrar novamente:

`https://jus9tecnologia.com.br/documentos/google-calendar.html`

Mostrar o trecho:

`Dados do Google Workspace, incluindo dados da Google Agenda, nao sao usados para desenvolver, melhorar ou treinar modelos generalizados de IA/ML.`

Fala sugerida:

`Embora a Jus 9 tenha paginas e modulos relacionados a inteligencia artificial, os dados do Google Workspace e da Google Agenda deste fluxo OAuth nao sao transferidos para servicos de terceiros de IA e nao sao usados para treinar, desenvolver ou melhorar modelos generalizados de IA ou aprendizado de maquina.`

## 13. Checklist final antes de enviar

- [ ] O video mostra a aplicacao correta, marca e dominio Jus 9.
- [ ] O video mostra as paginas publicas de privacidade e Google Agenda.
- [ ] O video mostra o fluxo OAuth completo.
- [ ] A tela de consentimento aparece legivel.
- [ ] O escopo aparece expandido e corresponde ao Google Cloud.
- [ ] O video mostra a funcao no app que usa o escopo.
- [ ] O evento criado no app aparece na Google Agenda da conta de teste.
- [ ] O video explica por que escopo somente leitura nao basta.
- [ ] O video declara que Gmail, Drive, contatos e arquivos nao sao solicitados.
- [ ] O video mostra ou menciona que dados da Google Agenda nao vao para IA/ML.
- [ ] O video mostra `Desvincular Google Agenda`.
- [ ] O video mostra ou menciona revogacao em `myaccount.google.com/connections`.
- [ ] O video nao mostra segredo, token, cookie, senha ou dado real.
- [ ] O video esta no YouTube como `Nao listado` ou em link acessivel ao Google.

## 14. Observacao para o Google Cloud

O status de publicacao deve permanecer `Em producao`.

Se a flag de Calendar precisar ser ativada para gravar, ativar apenas pelo menor tempo necessario e apenas para a conta governada/de teste, mantendo bloqueio para usuarios publicos.

Antes de gravar, confirmar:

- Google Calendar API ativada;
- marca verificada;
- `Acesso a dados` com o escopo `https://www.googleapis.com/auth/calendar.events.owned`;
- redirect URI correto;
- paginas publicas no ar;
- nenhum segredo visivel na gravacao.
