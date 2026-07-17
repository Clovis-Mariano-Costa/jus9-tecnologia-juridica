# Resposta ao Google apos novo video

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-17

## Como usar

Depois de gravar o novo video e publicar como nao listado no YouTube, substituir `[NEW_VIDEO_URL]` pelo link final e responder diretamente ao e-mail do Google.

Nao enviar senha, token, cookie, secret ou credencial em aberto.

## Reply draft in English

Hello Google OAuth Verification Team,

Thank you for the additional guidance.

We prepared a new comprehensive demo video for project `jus-9-tecnologia-juridica` / project number `161727838854`:

[NEW_VIDEO_URL]

The new video demonstrates:

- the Jus 9 application identity, domain and Google Calendar documentation;
- the user-facing Agenda feature that requires Calendar event creation;
- the separation between basic Google sign-in (`openid`, `email`, `profile`) and the incremental Calendar consent flow;
- the OAuth consent screen with the requested Calendar scope expanded and readable;
- the exact Calendar scope requested by the app and configured in Google Cloud;
- creation of a fictitious user-reviewed event in the Jus 9 app;
- the same event appearing in the source Google Calendar account;
- the fact that Gmail, Drive, Contacts, files and passwords are not requested;
- local Google Calendar disconnection inside Jus 9 and revocation through Google Account connections;
- the Limited Use / AI-ML disclosure for Google Workspace and Calendar data.

The Calendar feature uses Google Calendar data only to provide the user-facing Agenda functionality. The app does not sell Google user data, does not use it for advertising, does not use it for credit or lending decisions, and does not use Google Workspace or Calendar data to train, develop, or improve generalized AI/ML models.

Regarding AI/ML: Jus 9 has AI-related product pages and may use AI tools in product development or separate demonstrative modules, but Google Workspace API data from this Calendar OAuth flow is not transferred to any third-party AI/ML service and is not used for training generalized models. In the Calendar verification flow, no third-party AI/ML provider processes Google Calendar user data.

We also reviewed and narrowed the requested scope under the minimum-privilege principle. The current submitted scope is `https://www.googleapis.com/auth/calendar.events.owned`, used for user-reviewed Calendar event creation in calendars owned by the connected user. This matches the app behavior: the Jus 9 Agenda screen lists and creates operational events in the connected user's own primary Google Calendar. Read-only scopes are not sufficient because the user-facing feature creates a reviewed event, and broader Calendar, Gmail, Drive, Contacts, files, and password scopes are not requested.

Regards,

Jus 9 Tecnologia Juridica

## Nota ao Fundador

Antes de enviar a resposta, substituir `[NEW_VIDEO_URL]` pelo link nao listado do novo video e confirmar que o Google Cloud `Acesso a dados` mostra exatamente `https://www.googleapis.com/auth/calendar.events.owned`.
