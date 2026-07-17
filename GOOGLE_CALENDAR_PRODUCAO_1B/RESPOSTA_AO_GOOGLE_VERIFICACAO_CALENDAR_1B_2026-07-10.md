# Historico - resposta ao Google Calendar 1B de 2026-07-10

Classificacao: HISTORICO / NAO USAR COMO RESPOSTA ATUAL / SEM SEGREDOS
Data original: 2026-07-10
Atualizacao de responsabilidade: 2026-07-17
Projeto Google Cloud: `jus-9-tecnologia-juridica`
Numero do projeto: `161727838854`

## Status deste arquivo

Este arquivo fica preservado apenas como memoria historica da primeira resposta ao Google.

Nao usar este texto para responder ao Google a partir de 2026-07-17.

Motivo: a orientacao antiga usava o escopo:

`https://www.googleapis.com/auth/calendar.events`

Depois da revisao de 2026-07-17, a decisao vigente passou a ser o escopo mais estreito:

`https://www.googleapis.com/auth/calendar.events.owned`

O codigo, as paginas publicas, o roteiro de regravacao e a minuta atual foram alinhados ao escopo `calendar.events.owned`.

## Fonte atual de resposta ao Google

Usar o arquivo atual:

`GOOGLE_CALENDAR_PRODUCAO_1B/RESPOSTA_AO_GOOGLE_APOS_NOVO_VIDEO_2026-07-17.md`

Usar o roteiro atual:

`GOOGLE_CALENDAR_PRODUCAO_1B/ROTEIRO_REGRAVACAO_VIDEO_GOOGLE_CALENDAR_2026-07-17.md`

Antes de responder ao Google, confirmar no Google Cloud Console, em `Google Auth Platform > Acesso a dados`, que o escopo configurado e exatamente:

`https://www.googleapis.com/auth/calendar.events.owned`

## Videos historicos enviados ou testados

Estes links foram usados ou preparados no ciclo anterior. Eles ficam registrados para continuidade, mas nao substituem a necessidade de seguir a minuta atual se o Google pedir novo video.

- `https://youtu.be/TVTkvGfIGj4`
- `https://youtu.be/bc4wkdYZJEs?si=5GVBZx7TU0EzgXQy`
- `https://youtu.be/LiRjC4nQB0c?si=ScZ0t0pF6IF1IyFc`
- `https://youtu.be/TVTkvGfIGj4?si=i7fa_f4Tp4W796zU`

## Resumo historico do que este arquivo representava

Em 2026-07-10, este arquivo orientava uma resposta ao Google explicando:

- identidade do app Jus 9 Tecnologia Juridica;
- uso separado de login basico com Google;
- tentativa de verificacao sensivel para Google Calendar;
- documentacao publica de privacidade e uso de dados;
- ausencia de Gmail, Drive, Contacts, arquivos, senhas e escopos restritos na fase Calendar;
- envio de video demonstrativo e conta de teste governada por canal privado, se solicitado.

## Decisao superveniente de 2026-07-17

A decisao atual substituiu a justificativa antiga por uma abordagem de menor privilegio:

- `calendar.events.owned` em vez de `calendar.events`;
- Calendar separado de `openid`, `email` e `profile`;
- `GOOGLE_CALENDAR_OAUTH_ENABLED=false` por padrao ate aprovacao final;
- botao `Desvincular Google Agenda` no MVP;
- endpoint `POST /api/calendar/disconnect` para remover o grant local de Calendar;
- instrucao para revogacao externa em `https://myaccount.google.com/connections`;
- paginas publicas atualizadas em `documentos/privacidade.html` e `documentos/google-calendar.html`.

## Regra de continuidade

Se este arquivo aparecer em busca futura, tratar como historico. A autoridade operacional atual esta no centro de responsabilidade Google e no pacote `GOOGLE_CALENDAR_PRODUCAO_1B` atualizado em 2026-07-17.
