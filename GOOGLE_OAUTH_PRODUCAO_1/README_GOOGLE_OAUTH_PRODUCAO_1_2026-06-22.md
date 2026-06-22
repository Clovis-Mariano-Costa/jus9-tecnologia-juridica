# Google OAuth Producao 1 - Jus 9

Classificacao: PUBLICO TECNICO / SEM SEGREDOS
Data: 2026-06-22
Autoridade: Fundador
Execucao: Charlie Juris da Costa / Codex

## Finalidade

Preparar a passagem do OAuth Google da Jus 9 de teste controlado para producao governada, sem publicar segredo, sem alterar escopos sensiveis e sem submeter verificacao antes de revisao humana.

## Estado confirmado

- Login Google basico implementado em `/auth/google/start` e `/auth/google/callback`.
- Login basico solicita apenas `openid email profile`.
- Sessao grava hashes, perfil, modo de acesso e nucleo de login, nao token Google.
- Retorno modular por `return_to` existe com allowlist de rotas e origens.
- Google Agenda existe como fluxo incremental separado no Worker.
- Escopo de Agenda atual: `https://www.googleapis.com/auth/calendar.events`.
- Tokens de Calendar ficam em KV `JUS9_CALENDAR_TOKENS`, criptografados com chave derivada do segredo de sessao.
- Politica de privacidade publica recebeu secao sobre Google/OAuth.

## Decisoes executadas apos escolha do Fundador

- Acesso amplo por Conta Google verificada fica preparado por `AUTH_PUBLIC_GOOGLE_ENABLED=true`.
- Contas fora da allowlist entram como `cidadao` por `AUTH_PUBLIC_GOOGLE_PROFILE=cidadao`.
- Nesta fase, `cidadao` e o unico perfil publico aceito; valores privilegiados caem para `cidadao`.
- Contas privilegiadas continuam governadas por `AUTH_ALLOWED_EMAILS`.
- A sessao registra `accessMode` com valores como `allowlist` ou `public_google`.
- A sessao registra `authNucleus` para separar Equipe, MVP, Agenda, Laboratorio, Universidade, IA profissional e Principal.
- Agenda permanece no pacote 1, mas somente para perfis com `calendar:write`.
- Drive e Gmail ficam em pacotes separados e sem escopos ativos neste pacote.

## Projeto de producao

A escolha operacional segura e criar um projeto Google Cloud separado para producao. O projeto atual deve permanecer como teste/homologacao ate revisao humana, porque as politicas oficiais do Google para OAuth externo exigem separacao entre projetos de teste e producao.

## Arquivos do pacote

- `CHECKLIST_PRE_SUBMISSAO_GOOGLE_OAUTH_PRODUCAO_1_2026-06-22.md`
- `MATRIZ_ESCOPOS_GOOGLE_OAUTH_PRODUCAO_1_2026-06-22.md`
- `ROTEIRO_VIDEO_VERIFICACAO_GOOGLE_OAUTH_2026-06-22.md`
- `RUNBOOK_ROTACAO_SEGREDOS_GOOGLE_OAUTH_2026-06-22.md`
- `DECISOES_PENDENTES_FUNDADOR_GOOGLE_OAUTH_PRODUCAO_1_2026-06-22.md`

## Nao executado neste pacote

- Nao houve mudanca de client secret.
- Nao houve submissao ao Google.
- Nao houve inclusao de Drive, Gmail ou escopo novo.
- Nao houve publicacao de allowlist real.
- Nao houve publicacao de valores reais de `AUTH_ALLOWED_EMAILS`.
- Nao houve mudanca em KV ou Cloudflare.

## Criterio de saida

Este pacote esta pronto quando:

1. os documentos estiverem versionados;
2. a politica publica mencionar uso de dados Google;
3. os testes locais continuarem passando;
4. o Fundador tiver uma lista clara de decisoes antes de producao.
