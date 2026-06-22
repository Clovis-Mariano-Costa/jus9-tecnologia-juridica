# Roteiro de video - verificacao Google OAuth

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## Objetivo

Preparar video curto, em ingles simples, demonstrando ao Google como o OAuth e usado.

## Video 1 - Login basico

Duracao sugerida: 2 a 4 minutos.

Mostrar:

1. home page publica da Jus 9;
2. link de politica de privacidade;
3. botao `Entrar com Google`;
4. redirecionamento para tela de consentimento Google;
5. nome do app na tela de consentimento;
6. barra do navegador com OAuth client ID visivel;
7. consentimento do usuario;
8. retorno ao modulo de origem;
9. tela autenticada mostrando perfil/permissoes;
10. logout.

Fala sugerida:

```text
This is the Jus 9 Tecnologia Juridica production OAuth flow.
The app uses Google Sign-In only to verify the user's identity and email.
The app requests the minimum scopes: openid, email and profile.
No Gmail, Google Drive or broad Google data access is requested in this flow.
```

## Video 2 - Google Calendar, somente se submetido

Duracao sugerida: 3 a 5 minutos.

Mostrar:

1. usuario ja autenticado;
2. painel de Google Agenda;
3. botao para conectar Google Agenda;
4. tela Google com escopo de Calendar;
5. retorno ao painel;
6. status conectado;
7. listagem de eventos demonstrativos;
8. criacao de evento ficticio;
9. evento aparecendo na lista;
10. aviso de que a agenda propria da Jus 9 e fonte de verdade.

Fala sugerida:

```text
Google Calendar is optional and incremental.
The user grants this permission only when they choose to connect Calendar.
Jus 9 uses Calendar as an operational reminder and event mirror.
Sensitive legal documents and confidential case data are not sent to Google Calendar in this production package.
```

## Cuidados

- Nao mostrar client secret.
- Nao mostrar tokens.
- Nao mostrar allowlist real.
- Nao mostrar dados juridicos reais.
- Nao mostrar dados pessoais de cliente.
- Usar conta de teste aprovada.
- Usar evento ficticio.

