# Google Calendar Producao 1B - Jus 9

Classificacao: PUBLICO TECNICO / SEM SEGREDOS
Data: 2026-07-01
Autoridade: Fundador
Execucao: Charlie Echo / Codex

## Finalidade

Preparar a integracao Google Calendar como consentimento incremental separado do login Google basico, sem publicar segredo e sem deixar o escopo sensivel acionavel por acidente.

## Estado desta entrega

- Login Google basico permanece em `openid email profile`.
- O perfil publico `cidadao` permanece sem permissao de Calendar.
- A rota tecnica `/auth/google/calendar/start` existe, mas agora exige `GOOGLE_CALENDAR_OAUTH_ENABLED=true`.
- O Worker retorna `calendar_oauth_nao_ativado` quando a fase sensivel nao estiver ligada.
- A pagina publica `documentos/google-calendar.html` explica finalidade, limites, revogacao e escopo candidato.
- Nenhum segredo foi publicado.
- Nenhum escopo Drive ou Gmail foi adicionado.

## Escopo candidato

`https://www.googleapis.com/auth/calendar.events`

Uso previsto: permitir que pessoa autorizada e governada conecte a propria Google Agenda para listar e criar eventos operacionais revisados.

## Travas de seguranca

- `GOOGLE_CALENDAR_OAUTH_ENABLED=false` por padrao.
- `cidadao` tem somente `auth:read`.
- Inicio de Calendar exige sessao autenticada.
- Inicio de Calendar exige permissao `calendar:write`.
- Callback de Calendar valida a mesma conta Google da sessao original por hash de e-mail e hash de `sub`.
- Tokens de Calendar ficam em KV `JUS9_CALENDAR_TOKENS` e sao criptografados com chave derivada do segredo de sessao.

## Arquivos do pacote

- `CHECKLIST_PRE_SUBMISSAO_GOOGLE_CALENDAR_PRODUCAO_1B_2026-07-01.md`
- `MATRIZ_ESCOPOS_GOOGLE_CALENDAR_PRODUCAO_1B_2026-07-01.md`
- `ROTEIRO_VIDEO_VERIFICACAO_GOOGLE_CALENDAR_1B_2026-07-01.md`
- `RUNBOOK_ATIVACAO_OPERACIONAL_GOOGLE_CALENDAR_1B_2026-07-01.md`

## Criterio de saida

O pacote 1B so deve ir para ativacao quando:

1. a pagina publica estiver publicada;
2. a politica de privacidade apontar para a explicacao de Agenda;
3. o Google Cloud estiver com brand verification ok;
4. o escopo Calendar estiver justificado na tela OAuth;
5. o video de verificacao estiver pronto;
6. o Fundador confirmar a ativacao de `GOOGLE_CALENDAR_OAUTH_ENABLED=true`.

