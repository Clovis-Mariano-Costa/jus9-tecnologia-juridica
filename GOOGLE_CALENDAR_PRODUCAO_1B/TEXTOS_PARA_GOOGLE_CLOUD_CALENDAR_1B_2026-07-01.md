# Textos para Google Cloud - Calendar Producao 1B

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-01
Uso: copiar e adaptar no Google Cloud OAuth consent screen e na verificacao de escopo sensivel.

## Nome do app

Jus 9 Tecnologia Juridica

## App home page

https://jus9tecnologia.com.br/

## Politica de privacidade

https://jus9tecnologia.com.br/documentos/privacidade.html

## Termos

https://jus9tecnologia.com.br/documentos/termos.html

## Explicacao publica do login Google

https://jus9tecnologia.com.br/documentos/login-google.html

## Explicacao publica do Google Calendar

https://jus9tecnologia.com.br/documentos/google-calendar.html

## Escopo solicitado

`https://www.googleapis.com/auth/calendar.events`

## Justificativa curta em portugues

A Jus 9 usa este escopo somente quando uma pessoa autorizada conecta voluntariamente a propria Google Agenda. A finalidade e listar e criar eventos operacionais revisados pela pessoa usuaria, como lembretes, reunioes e compromissos da agenda juridica, sem sincronizar documentos, Gmail, Drive ou dados sensiveis do MVP publico. O login Google basico permanece separado e usa apenas `openid email profile`.

## Short justification in English

Jus 9 uses this scope only when an authorized user voluntarily connects their own Google Calendar. The purpose is to list and create user-reviewed operational events, such as reminders, meetings, and legal workflow appointments. The app does not use this scope to access Gmail, Drive, passwords, legal documents, or public MVP user data. Basic Google sign-in remains separate and uses only `openid email profile`.

## Justificativa detalhada em portugues

O produto possui uma Agenda Jus 9 propria para organizar compromissos operacionais. A integracao com Google Calendar funciona como espelho e lembrete escolhido pela pessoa usuaria. O escopo `calendar.events` e solicitado em um fluxo incremental separado de `/auth/google/start`, pela rota `/auth/google/calendar/start`, somente para perfis governados com permissao `calendar:write`.

O perfil publico `cidadao` nao pode conectar Calendar. Quando a fase sensivel esta desligada, `GOOGLE_CALENDAR_OAUTH_ENABLED=false` impede que qualquer pessoa seja redirecionada ao Google para solicitar Calendar.

Os eventos enviados ao Google Calendar devem conter apenas dados minimos: titulo, horario, local e descricao saneada. A Jus 9 orienta que nao sejam inseridos dados reais de cliente, segredo de justica, documentos juridicos, estrategia processual, senhas ou tokens.

## Detailed justification in English

Jus 9 has its own internal agenda for operational scheduling. The Google Calendar integration is used only as an optional mirror/reminder chosen by the user. The `calendar.events` scope is requested through a separate incremental flow, `/auth/google/calendar/start`, not through the basic sign-in flow. Only governed profiles with the `calendar:write` permission can start this flow.

The public `cidadao` profile cannot connect Google Calendar. When the sensitive phase is disabled, `GOOGLE_CALENDAR_OAUTH_ENABLED=false` prevents the app from redirecting any user to Google for Calendar consent.

Events sent to Google Calendar must contain minimal data only: title, time, location, and sanitized description. Jus 9 instructs users not to enter real client data, sealed case information, legal documents, legal strategy, passwords, or tokens.

## Limited Use / uso limitado

Portuguese:

Os dados recebidos de APIs Google serao usados somente para fornecer e melhorar funcionalidades visiveis ao usuario, como autenticacao governada e agenda conectada mediante consentimento. A Jus 9 nao vende dados Google, nao usa dados Google para publicidade comportamental e nao transfere dados Google para treinamento de modelos generalizados de IA.

English:

Data received from Google APIs is used only to provide and improve user-facing features, such as governed authentication and user-consented calendar functionality. Jus 9 does not sell Google user data, does not use Google user data for behavioral advertising, and does not transfer Google user data to train generalized AI models.

## Resposta para "How will your app use this scope?"

The app uses `https://www.googleapis.com/auth/calendar.events` only after a separate user consent flow. Authorized users can connect their own Google Calendar from the Jus 9 Agenda screen to list upcoming events and create reviewed operational events. The scope is not requested during basic sign-in, and public users cannot access the Calendar flow. Calendar data is not used for ads, not sold, and not used to train generalized AI models.

## Resposta para "Why is a narrower scope not sufficient?"

The app needs to create user-reviewed calendar events, not only display availability or read public events. The broad `calendar` scope is not requested because it grants wider calendar management access than needed. Gmail and Drive scopes are not requested. The chosen scope is limited to event-level functionality required for the user-facing Agenda feature.

## Video demo URL

https://youtu.be/TVTkvGfIGj4

## Atualizacao apos resposta do Google - 2026-07-10

O Google solicitou reforco de transparencia para escopos sensiveis. As paginas publicas abaixo foram atualizadas para declarar dados acessados, finalidade, compartilhamento, protecao, retencao/exclusao, Uso Limitado e restricoes de IA/ML:

- https://jus9tecnologia.com.br/documentos/privacidade.html
- https://jus9tecnologia.com.br/documentos/google-calendar.html

Texto curto para resposta:

We reviewed Google's OAuth verification checklist and updated the public Privacy Policy and Google Calendar data-use page. The app requests only `https://www.googleapis.com/auth/calendar.events` for user-reviewed Calendar event functionality. Basic Google sign-in remains separate and uses only `openid`, `email`, and `profile`. Gmail, Drive, Contacts, files, passwords, and broader Google service scopes are not requested in this submission. Google user data is not sold, not used for behavioral advertising, not used for credit/lending decisions, and not used to train generalized AI/ML models.
