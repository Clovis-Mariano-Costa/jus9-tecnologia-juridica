# Versionamento - Agenda Google OAuth real governado

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Escopo

Preparacao da conexao real com Google Agenda no mini backend da Jus 9.

## Alteracoes

1. Criado KV `JUS9_CALENDAR_TOKENS` para armazenamento server-side de concessao Google Calendar.
2. Adicionado fluxo `/auth/google/calendar/start` usando o mesmo callback OAuth ja homologado.
3. Mantido login basico com escopo minimo `openid email profile`.
4. Agenda passa a pedir escopo especifico apenas quando o usuario solicita a conexao.
5. Criados endpoints:
   - `GET /api/calendar/status`
   - `GET /api/calendar/events`
   - `POST /api/calendar/events`
6. Tokens de Agenda sao armazenados criptografados no KV, sem publicacao em GitHub.
7. Atualizada `app-agenda.html` com painel de conexao real, preservando modo local/ICS.

## Governanca

Agenda propria da Jus 9 continua sendo fonte de verdade.

Google Agenda e espelho operacional, lembrete e convite, com consentimento e revisao humana.

Nao publicar tokens, chaves, cookies, refresh tokens, IDs sensiveis ou URLs de callback com estado.

## Fontes tecnicas

Google recomenda escopos minimos e autorizacao incremental para recursos apenas quando necessarios.

Cloudflare recomenda guardar segredos fora do codigo e usar bindings/ambiente para dados sensiveis.

## Homologacao humana

Em 2026-06-08, o fundador humano confirmou:

1. login Google passou;
2. consentimento de Agenda passou apos inclusao da conta testadora;
3. Google Calendar API foi ativada no projeto Google Cloud;
4. `app-agenda.html` listou evento real da conta conectada.
5. criacao de evento ficticio controlado passou;
6. evento `Teste ficticio Agenda Jus 9` apareceu na listagem da Agenda.

Estado final: Pacote 4 homologado em leitura e escrita controlada.
