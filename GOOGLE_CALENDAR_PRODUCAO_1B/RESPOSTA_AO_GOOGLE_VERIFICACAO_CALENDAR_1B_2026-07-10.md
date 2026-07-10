# Resposta ao Google - verificacao Calendar Producao 1B

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-10
Projeto Google Cloud: `jus-9-tecnologia-juridica`
Numero do projeto: `161727838854`

## Orientacao

Use o texto em ingles abaixo para responder diretamente ao e-mail do Google depois de revisar o link do video e qualquer conta de teste. Nao incluir senhas publicamente. Se o Google pedir credenciais, envie por canal privado e controlado.

## Reply draft in English

Hello Google OAuth Verification Team,

Thank you for reviewing the Jus 9 Tecnologia Juridica OAuth verification request for project `jus-9-tecnologia-juridica` / project number `161727838854`.

We reviewed your checklist and updated the public documentation and verification materials.

The requested sensitive scope is:

`https://www.googleapis.com/auth/calendar.events`

The app uses this scope only for a user-facing Google Calendar feature. An authorized, governed user can connect their own Google Calendar from the Jus 9 Agenda screen, review operational event data, and create or update calendar events such as meetings, reminders, and legal workflow appointments. The scope is requested through a separate incremental consent flow, not during basic Google sign-in.

Basic Google sign-in remains separate and uses only `openid`, `email`, and `profile`. The app does not request Gmail, Drive, Contacts, files, passwords, or broader Google service access for this Calendar verification phase.

We chose `calendar.events` as the least-privilege scope because the user-facing feature must create user-reviewed Calendar events. A read-only scope would not support the event creation demonstrated in the app, and the broader Calendar scope is not requested because it would grant more access than required.

The public production app does not expose the new Calendar sensitive flow to general public users while verification is pending. Public users with the `cidadao` profile remain limited to basic demonstrative authentication. The Calendar OAuth flow is available only in a governed verification/test path for authorized profiles and test accounts.

Updated public documentation:

- Privacy Policy: https://jus9tecnologia.com.br/documentos/privacidade.html
- Google Calendar data use page: https://jus9tecnologia.com.br/documentos/google-calendar.html
- Google sign-in explanation: https://jus9tecnologia.com.br/documentos/login-google.html

The Privacy Policy and Calendar page now clearly disclose:

- what Google user data may be accessed, including raw Calendar event data fields needed by the feature;
- how that data is used for sign-in, access control, and user-facing Calendar event functionality;
- that Google user data is not sold, not used for behavioral advertising, not shared with data brokers, and not used for credit or lending decisions;
- that Google Workspace data, including Calendar data, is not used to train, develop, or improve generalized AI/ML models;
- how data is protected through HTTPS, secure sessions, profile-based permissions, minimization, environment separation, and controlled encrypted token storage when Calendar is enabled;
- retention, deletion, revocation, and user request paths, including Google account revocation at https://myaccount.google.com/connections.

The demo video was prepared with fictitious data and shows the Google consent flow and Calendar functionality. Video URL submitted in the verification form:

https://youtu.be/TVTkvGfIGj4

Reviewer navigation path:

1. Open https://jus9tecnologia.com.br/app-agenda.html
2. Sign in with Google using a governed test account authorized for Calendar verification.
3. Open the Google Calendar connection flow from the Agenda screen.
4. Review the Google OAuth consent screen and confirm the Calendar events scope.
5. Create a fictitious, user-reviewed test event.
6. Confirm the created event inside the test account's Google Calendar.

No restricted Gmail, Drive, or other restricted scopes are requested in this submission. CASA is therefore not expected to apply to this Calendar-only sensitive-scope request unless Google determines otherwise.

If you need a dedicated governed test account or additional navigation details, we can provide them privately through the verification thread.

Regards,

Jus 9 Tecnologia Juridica

## Resumo em portugues para o Fundador

- O Google pediu clareza de escopo, video, ambiente de teste, politica de privacidade, uso limitado e IA/ML.
- As paginas publicas foram reforcadas para responder esses pontos.
- O escopo Calendar continua separado do login basico.
- Gmail e Drive nao foram adicionados.
- Nao publicar senha no e-mail; se pedirem usuario de teste, enviar por canal privado.
