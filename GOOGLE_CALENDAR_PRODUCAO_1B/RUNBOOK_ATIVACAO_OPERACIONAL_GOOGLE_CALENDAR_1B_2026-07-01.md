# Runbook - Ativacao operacional Google Calendar 1B

Classificacao: INTERNO / SEM SEGREDOS

## Estado seguro padrao

`GOOGLE_CALENDAR_OAUTH_ENABLED=false`

Com esse estado:

- `/auth/google/calendar/start` nao redireciona para Google.
- Nenhum escopo Calendar e solicitado.
- `/api/calendar/status` informa `calendar_oauth_nao_ativado`.
- Agenda local, ICS e link manual continuam funcionando.

## Pre-requisitos para virar para true

1. Brand verification Google ok.
2. Escopo `calendar.events.owned` declarado e justificado.
3. Politica de privacidade publicada.
4. Pagina `documentos/google-calendar.html` publicada.
5. Video de verificacao pronto.
6. Testes locais aprovados.
7. Fundador confirmar ativacao.

## Ativacao

No Cloudflare Worker/Pages, configurar:

```text
GOOGLE_CALENDAR_OAUTH_ENABLED=true
```

Nao alterar:

```text
AUTH_PUBLIC_GOOGLE_PROFILE=cidadao
```

Nao publicar:

```text
GOOGLE_CLIENT_SECRET
AUTH_COOKIE_SECRET
AUTH_ALLOWED_EMAILS real
```

## Validacao apos ativacao

1. Conta publica externa deve continuar como `cidadao`.
2. Conta `cidadao` deve receber `403` em `/auth/google/calendar/start`.
3. Conta governada com `calendar:write` deve ir para consentimento Google.
4. Callback deve voltar para `/app-agenda.html`.
5. `/api/calendar/status` deve indicar `connected:true` apos consentimento.
6. `Desvincular Google Agenda` deve retornar status nao conectado.
7. Logout deve encerrar sessao local.

## Reversao rapida

Se houver erro, voltar:

```text
GOOGLE_CALENDAR_OAUTH_ENABLED=false
```

Isso deve interromper novas autorizacoes Calendar sem derrubar o login Google basico.
