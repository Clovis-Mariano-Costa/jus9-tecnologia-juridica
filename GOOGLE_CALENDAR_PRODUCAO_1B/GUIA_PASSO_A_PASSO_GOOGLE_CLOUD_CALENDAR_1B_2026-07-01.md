# Guia passo a passo - Google Cloud Calendar Producao 1B

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-01

## Antes de comecar

Nao altere segredos e nao ligue `GOOGLE_CALENDAR_OAUTH_ENABLED=true` ainda.

Tenha abertas estas paginas:

- Console Google Cloud do projeto `jus-9-tecnologia-juridica`.
- `https://jus9tecnologia.com.br/documentos/privacidade.html`
- `https://jus9tecnologia.com.br/documentos/google-calendar.html`
- `TEXTOS_PARA_GOOGLE_CLOUD_CALENDAR_1B_2026-07-01.md`

## 1. Confirmar projeto

1. Abra o Google Cloud Console.
2. Confirme no seletor superior que o projeto e `Jus 9 Tecnologia Juridica`.
3. Confirme o ID do projeto antes de qualquer mudanca.

## 2. Confirmar API Calendar

1. No menu, procure `APIs e servicos`.
2. Abra `Biblioteca`.
3. Pesquise `Google Calendar API`.
4. Se estiver desativada, deixe preparado para ativar somente quando a verificacao sensivel for iniciada.

## 3. Conferir OAuth consent screen

1. Abra `Google Auth Platform`.
2. Abra `Branding`.
3. Confirme:
   - nome do app;
   - e-mail de suporte;
   - pagina inicial;
   - politica de privacidade;
   - termos;
   - dominio autorizado.

## 4. Conferir Data Access / Acesso a dados

1. Abra `Acesso a dados`.
2. Confirme que o login basico possui apenas:
   - `openid`;
   - `.../auth/userinfo.email`;
   - `.../auth/userinfo.profile`.
3. Nao adicione Drive.
4. Nao adicione Gmail.
5. Para Calendar 1B, preparar o escopo:
   - `https://www.googleapis.com/auth/calendar.events`

## 5. Preencher justificativa

Use o arquivo:

`TEXTOS_PARA_GOOGLE_CLOUD_CALENDAR_1B_2026-07-01.md`

Copie a versao curta ou detalhada conforme o campo do Google.

## 6. Preparar video

Use o arquivo:

`ROTEIRO_VIDEO_VERIFICACAO_GOOGLE_CALENDAR_1B_2026-07-01.md`

Antes de gravar:

- use conta de teste;
- use dados ficticios;
- nao mostre segredo;
- nao mostre e-mail privado se puder evitar;
- nao mostre cliente ou processo real.

## 7. Submeter para verificacao

Somente submeter depois de:

- pagina publica publicada;
- politica de privacidade publicada;
- brand status verificado;
- video pronto;
- justificativa revisada;
- Fundador confirmar.

## 8. Apos aprovacao

Somente depois da aprovacao ou da decisao operacional expressa:

1. Ir ao Cloudflare.
2. Abrir Worker/Pages `jus9-tecnologia-juridica`.
3. Em variaveis, trocar:

```text
GOOGLE_CALENDAR_OAUTH_ENABLED=false
```

por:

```text
GOOGLE_CALENDAR_OAUTH_ENABLED=true
```

4. Testar conta governada.
5. Testar conta publica `cidadao` bloqueada.

