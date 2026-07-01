# Checklist pre-submissao - Google Calendar Producao 1B

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## 1. Publico e transparencia

- [x] Criar pagina publica sobre Google Agenda.
- [x] Linkar pagina de Agenda a partir da politica de privacidade.
- [x] Linkar pagina de Agenda a partir da pagina de login Google.
- [x] Explicar que Calendar e consentimento separado do login basico.
- [x] Explicar revogacao pela Conta Google.

## 2. Codigo

- [x] Criar trava `GOOGLE_CALENDAR_OAUTH_ENABLED`.
- [x] Deixar `GOOGLE_CALENDAR_OAUTH_ENABLED=false` no `wrangler.jsonc`.
- [x] Bloquear `/auth/google/calendar/start` enquanto a trava estiver desligada.
- [x] Retornar status `calendar_oauth_nao_ativado` sem pedir escopo ao Google.
- [x] Manter bloqueio de `cidadao`.
- [x] Manter Calendar separado de Drive/Gmail.

## 3. Google Cloud

- [ ] Confirmar que Google Calendar API esta ativada no projeto correto.
- [ ] Confirmar que o projeto correto e o projeto de producao.
- [ ] Confirmar dominios autorizados.
- [ ] Confirmar redirect URI `https://jus9tecnologia.com.br/auth/google/callback`.
- [ ] Confirmar redirect URI `https://www.jus9tecnologia.com.br/auth/google/callback`.
- [ ] Declarar o escopo `https://www.googleapis.com/auth/calendar.events` apenas quando houver submissao.
- [ ] Preencher justificativa de uso do escopo.
- [ ] Enviar video demonstrando o fluxo.

## 4. Cloudflare

- [ ] Confirmar `GOOGLE_CLIENT_ID` como secret/var segura.
- [ ] Confirmar `GOOGLE_CLIENT_SECRET` como secret.
- [ ] Confirmar `AUTH_COOKIE_SECRET` como secret forte.
- [ ] Confirmar binding `JUS9_CALENDAR_TOKENS`.
- [ ] Confirmar `GOOGLE_CALENDAR_OAUTH_ENABLED=false` antes da revisao final.
- [ ] Virar `GOOGLE_CALENDAR_OAUTH_ENABLED=true` somente apos aprovacao final.

## 5. Testes locais

- [ ] `node --check worker.js`.
- [ ] `node --check functions/_shared/calendar.js`.
- [ ] `node --check functions/_shared/oauth.js`.
- [ ] `node tests/validate-worker-auth.mjs`.
- [ ] Testar status Calendar desligado.
- [ ] Testar bloqueio de `cidadao`.
- [ ] Testar redirecionamento Calendar somente com flag ligada.

## 6. Bloqueios

- [ ] Nao ativar se a pagina publica nao estiver publicada.
- [ ] Nao ativar se Google mostrar marca nao verificada.
- [ ] Nao ativar se o video de verificacao nao estiver pronto.
- [ ] Nao ativar se houver segredo em GitHub.
- [ ] Nao ativar Drive/Gmail junto com Calendar 1B.

