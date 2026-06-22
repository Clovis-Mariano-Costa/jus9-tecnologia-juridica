# Checklist pre-submissao - Google OAuth Producao 1

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## 1. Projeto Google Cloud

- [x] Definir projeto separado de producao como caminho seguro.
- [ ] Confirmar owner/editor do projeto.
- [ ] Confirmar e-mail de suporte.
- [ ] Confirmar contatos de desenvolvedor.
- [ ] Confirmar dominios autorizados.
- [ ] Confirmar projeto sem credenciais de teste/developer local.
- [ ] Confirmar que o projeto de teste atual nao sera usado para producao.

## 2. Dominios

- [ ] Verificar `jus9tecnologia.com.br` no Google Search Console.
- [ ] Confirmar que a conta do Search Console tem acesso ao projeto Google Cloud.
- [ ] Confirmar home page publica.
- [ ] Confirmar politica de privacidade publica.
- [ ] Confirmar termos ou documento equivalente.
- [ ] Confirmar redirect URIs HTTPS.

## 3. OAuth consent screen

- [ ] Nome do app representa a Jus 9 corretamente.
- [ ] E-mail de suporte esta correto.
- [ ] Home page aponta para dominio oficial.
- [ ] Politica de privacidade aponta para pagina publica no mesmo dominio.
- [ ] Escopos declarados batem com o codigo.
- [ ] Justificativa de escopos esta preparada.
- [ ] Nenhum escopo Drive/Gmail foi adicionado nesta fase.

## 4. Escopos

- [ ] Login basico: `openid`.
- [ ] Login basico: `email`.
- [ ] Login basico: `profile`.
- [x] Agenda liberada pelo Fundador para o pacote 1: `https://www.googleapis.com/auth/calendar.events`.
- [x] Confirmar que Calendar continua incremental, separado do login basico.
- [x] Confirmar que perfil publico `cidadao` nao tem `calendar:write`.

## 5. Cloudflare/Worker

- [ ] Rotacionar `GOOGLE_CLIENT_SECRET` se o Fundador confirmar.
- [ ] Rotacionar `AUTH_COOKIE_SECRET` se necessario.
- [ ] Configurar `GOOGLE_CLIENT_ID` no ambiente seguro.
- [ ] Configurar `GOOGLE_CLIENT_SECRET` no ambiente seguro.
- [ ] Configurar `GOOGLE_CALLBACK_URL`.
- [ ] Configurar `PUBLIC_SITE_ORIGIN`.
- [ ] Configurar `CORS_ORIGINS`.
- [ ] Configurar `AUTH_PUBLIC_GOOGLE_ENABLED=true` se acesso amplo for ativado.
- [ ] Configurar `AUTH_PUBLIC_GOOGLE_PROFILE=cidadao`.
- [ ] Configurar `AUTH_ALLOWED_EMAILS` apenas para contas privilegiadas, sem publicar valores.
- [ ] Confirmar binding `JUS9_CALENDAR_TOKENS` se Agenda entrar em producao.

## 6. Testes antes da submissao

- [ ] `node --check worker.js`.
- [ ] `node --check functions/_shared/oauth.js`.
- [ ] `node --check functions/_shared/calendar.js`.
- [ ] `node tests/validate-worker-auth.mjs`.
- [ ] Testar conta autorizada.
- [ ] Testar conta Google verificada fora da allowlist como `cidadao`.
- [ ] Testar que `cidadao` nao acessa Agenda.
- [ ] Testar retorno modular.
- [ ] Testar `accessMode` e `authNucleus`.
- [ ] Testar `return_to` externo bloqueado.
- [ ] Testar logout.
- [ ] Testar Agenda somente se autorizada.

## 7. Evidencias para Google

- [ ] Video do login basico.
- [ ] Video de Agenda, se escopo Calendar for submetido.
- [ ] Tela de consentimento exibindo nome do app.
- [ ] Barra do navegador mostrando OAuth Client ID.
- [ ] Demonstracao clara de como o dado Google e usado.
- [ ] Politica de privacidade publica e acessivel.

## 8. Bloqueios

- [ ] Nao submeter se a politica de privacidade nao estiver publicada.
- [ ] Nao submeter se houver segredo em GitHub.
- [ ] Nao ativar Drive/Gmail neste pacote.
- [ ] Nao usar escopo sensivel novo sem confirmacao do Fundador.
- [ ] Nao enviar para producao se callback/redirect nao bater exatamente.
