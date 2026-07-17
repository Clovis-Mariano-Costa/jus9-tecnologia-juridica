# Checklist pre-submissao - Google Calendar Producao 1B

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## 1. Publico e transparencia

- [x] Criar pagina publica sobre Google Agenda.
- [x] Linkar pagina de Agenda a partir da politica de privacidade.
- [x] Linkar pagina de Agenda a partir da pagina de login Google.
- [x] Explicar que Calendar e consentimento separado do login basico.
- [x] Explicar revogacao pela Conta Google.
- [x] Preparar texto de uso limitado dos dados Google.

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
- [x] Declarar o escopo `https://www.googleapis.com/auth/calendar.events` apenas quando houver submissao.
- [x] Preencher justificativa de uso do escopo.
- [x] Enviar video demonstrando o fluxo.
- [x] Preparar textos copiaveis para o Google Cloud.
- [x] Preparar guia de cliques para o Fundador.

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

## 7. Resposta do Google - 2026-07-10

- [x] Ler retorno do Google sobre checklist de verificacao OAuth.
- [x] Reforcar politica publica com dados acessados, uso, transferencia, protecao, retencao/exclusao e Uso Limitado.
- [x] Reforcar pagina publica Calendar com caminho de teste, menor privilegio, ambiente governado e restricoes de IA/ML.
- [x] Criar minuta de resposta ao Google sem publicar segredos.
- [ ] Responder ao e-mail do Google com a minuta revisada pelo Fundador.
- [ ] Fornecer conta de teste apenas se o Google solicitar, por canal privado e controlado.

## 8. Novo retorno do Google - 2026-07-17

- [x] Ler retorno pedindo novo video mais abrangente.
- [x] Identificar exigencias: funcionalidade completa, impacto na conta Google, tela OAuth expandida, correspondencia exata de escopo e Uso Limitado/IA.
- [x] Criar roteiro de regravacao: `ROTEIRO_REGRAVACAO_VIDEO_GOOGLE_CALENDAR_2026-07-17.md`.
- [x] Criar minuta de resposta apos novo video: `RESPOSTA_AO_GOOGLE_APOS_NOVO_VIDEO_2026-07-17.md`.
- [ ] Decidir se manter `calendar.events` ou avaliar troca para `calendar.events.owned`.
- [ ] Regravar video com evento ficticio aparecendo no Google Calendar da conta de teste.
- [ ] Publicar video como nao listado.
- [ ] Responder diretamente ao e-mail do Google com o novo link.
