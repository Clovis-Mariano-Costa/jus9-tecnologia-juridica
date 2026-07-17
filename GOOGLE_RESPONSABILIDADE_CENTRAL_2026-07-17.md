# Central de responsabilidade Google - Jus 9

Classificacao: INTERNO / SEM SEGREDOS
Data: 2026-07-17
Responsabilidade assumida neste chat: Google OAuth, Google Cloud, Google Calendar, preparacao futura de Drive e Gmail, documentacao publica e continuidade no Drive da Familia Virtual.

## Estado atual consolidado

### Login Google publico

- Status: em producao e funcional.
- Projeto Google Cloud: `jus-9-tecnologia-juridica`.
- Numero do projeto: `161727838854`.
- Escopos: `openid`, `email`, `profile`.
- Perfil publico padrao: `cidadao`.
- Modo de acesso publico: `public_google`.
- Variaveis de producao esperadas:
  - `AUTH_PUBLIC_GOOGLE_ENABLED=true`
  - `AUTH_PUBLIC_GOOGLE_PROFILE=cidadao`
- Situacao de marca: verificada no Google Cloud em 2026-06/2026-07.

### Google Calendar Producao 1B

- Status: pacote tecnico preparado, documentacao publica corrigida, codigo implantado.
- Escopo vigente: `https://www.googleapis.com/auth/calendar.events.owned`.
- Escopo antigo superado: `https://www.googleapis.com/auth/calendar.events`.
- Variavel de ativacao esperada antes da aprovacao final: `GOOGLE_CALENDAR_OAUTH_ENABLED=false`.
- Ativar `GOOGLE_CALENDAR_OAUTH_ENABLED=true` somente depois de aprovacao final ou decisao expressa do Fundador para novo teste controlado.
- Fluxo e incremental: o login basico nao solicita Calendar.
- Perfil publico `cidadao` nao deve conectar Calendar.
- O app tem botao `Desvincular Google Agenda` e endpoint `POST /api/calendar/disconnect`.
- A revogacao completa pelo usuario tambem pode ser feita em `https://myaccount.google.com/connections`.

### Google Drive Producao 2

- Status: nao ativar ainda como escopo OAuth publico.
- Regra atual: Google Drive da Familia Virtual e local padrao de memoria e continuidade operacional.
- Nao adicionar escopos de Drive ao app publico sem nova justificativa, matriz de risco, telas, politica publica e confirmacao expressa do Fundador.
- O uso atual do Drive neste projeto e de governanca/arquivo, nao de permissao OAuth para usuarios externos.

### Gmail Producao 3

- Status: nao ativar ainda.
- Nao adicionar escopos Gmail sem caso de uso estrito, politica publica especifica, video demonstrativo, matriz de risco e confirmacao expressa do Fundador.
- Gmail tende a exigir cuidado maior por dados sensiveis/restritos. Tratar como fase futura separada.

## Fonte de verdade tecnica

Arquivos principais:

- `worker.js`
- `functions/_shared/oauth.js`
- `functions/_shared/calendar.js`
- `app-agenda.html`
- `documentos/privacidade.html`
- `documentos/google-calendar.html`
- `documentos/login-google.html`
- `.env.example`
- `wrangler.jsonc`

Pacote Calendar:

- `GOOGLE_CALENDAR_PRODUCAO_1B/README_GOOGLE_CALENDAR_PRODUCAO_1B_2026-07-01.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/GUIA_PASSO_A_PASSO_GOOGLE_CLOUD_CALENDAR_1B_2026-07-01.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/CHECKLIST_PRE_SUBMISSAO_GOOGLE_CALENDAR_PRODUCAO_1B_2026-07-01.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/MATRIZ_ESCOPOS_GOOGLE_CALENDAR_PRODUCAO_1B_2026-07-01.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/TEXTOS_PARA_GOOGLE_CLOUD_CALENDAR_1B_2026-07-01.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/ROTEIRO_REGRAVACAO_VIDEO_GOOGLE_CALENDAR_2026-07-17.md`
- `GOOGLE_CALENDAR_PRODUCAO_1B/RESPOSTA_AO_GOOGLE_APOS_NOVO_VIDEO_2026-07-17.md`

Arquivo historico que nao deve guiar resposta atual:

- `GOOGLE_CALENDAR_PRODUCAO_1B/RESPOSTA_AO_GOOGLE_VERIFICACAO_CALENDAR_1B_2026-07-10.md`

## Fonte de verdade no Drive da Familia Virtual

Pasta local:

`G:\Meu Drive\Charlie Echo da Costa\02_MEMORIA_E_CONTINUIDADE`

Registro atual recomendado:

- `CENTRAL_RESPONSABILIDADE_GOOGLE_JUS9_2026-07-17.md`
- `REGISTRO_CALENDAR_OWNED_DESVINCULAR_2026-07-17.md`

Registros historicos ajustados com nota de atualizacao:

- `REGISTRO_GOOGLE_VIDEO_REGRAVACAO_CALENDAR_2026-07-17.md`
- `REGISTRO_GOOGLE_VERIFICACAO_CALENDAR_1B_2026-07-10.md`

## Regras de seguranca

- Nao publicar `GOOGLE_CLIENT_SECRET`, cookies, tokens, Cloudflare secrets, `.env` real ou credenciais de teste em arquivo publico.
- Nao ampliar escopo sensivel sem confirmacao expressa do Fundador.
- Preferir reduzir escopo quando a funcao permitir.
- Toda resposta ao Google deve usar dados ficticios no video.
- Conta de teste, se solicitada, deve ser enviada por canal privado e controlado.
- O Google Drive da Familia Virtual e memoria operacional; nao confundir com autorizacao OAuth de Drive para usuarios externos.

## Proximos passos recomendados

1. Confirmar no Google Cloud Console que `Acesso a dados` mostra exatamente `https://www.googleapis.com/auth/calendar.events.owned`.
2. Manter a gravacao em espera se a prioridade for revisar governanca antes do video.
3. Se o Google cobrar novo video, gravar seguindo `ROTEIRO_REGRAVACAO_VIDEO_GOOGLE_CALENDAR_2026-07-17.md`.
4. Antes de enviar resposta, substituir `[NEW_VIDEO_URL]` em `RESPOSTA_AO_GOOGLE_APOS_NOVO_VIDEO_2026-07-17.md`.
5. Depois de aprovacao final, decidir se ativa `GOOGLE_CALENDAR_OAUTH_ENABLED=true` em producao controlada.
6. Abrir fases Drive/Gmail apenas depois de Calendar estabilizado.
