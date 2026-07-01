# Roteiro de video - Google Calendar Producao 1B

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## Objetivo do video

Mostrar ao Google e a auditoria interna que a Jus 9 usa Calendar apenas depois de consentimento separado, com escopo minimo e para uma funcao clara de agenda.

## Roteiro sugerido

1. Abrir `https://jus9tecnologia.com.br/documentos/google-calendar.html`.
2. Mostrar a explicacao publica sobre uso, limites e revogacao.
3. Abrir `https://jus9tecnologia.com.br/app-agenda.html`.
4. Mostrar que o modo local, ICS e link manual funcionam sem OAuth Calendar.
5. Entrar com conta Google autorizada.
6. Mostrar `/api/auth/me` com perfil governado, sem exibir e-mail real.
7. Acionar `Conectar Google Agenda` somente em ambiente com `GOOGLE_CALENDAR_OAUTH_ENABLED=true`.
8. Mostrar a tela de consentimento do Google com o escopo de Calendar.
9. Autorizar.
10. Voltar a `app-agenda.html`.
11. Listar eventos ou criar evento ficticio.
12. Mostrar que conta publica `cidadao` nao consegue iniciar Calendar.
13. Mostrar logout.
14. Mostrar onde revogar em `https://myaccount.google.com/connections`.

## Dados do video

- Usar conta de teste ou conta autorizada pelo Fundador.
- Usar eventos ficticios.
- Nao mostrar segredo, token, e-mail privado ou dados juridicos reais.
- Nao usar cliente real.
- Nao usar processo real.

