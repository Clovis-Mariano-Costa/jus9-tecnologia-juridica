# Matriz de escopo - Google Calendar Producao 1B

Classificacao: PUBLICO TECNICO / SEM SEGREDOS
Data: 2026-07-01

## Escopos OAuth

| Escopo | Uso na Jus 9 | Fase | Risco | Decisao |
| --- | --- | --- | --- | --- |
| `openid` | Identificar sessao Google basica | Login basico | Baixo | Mantido |
| `email` | Confirmar e-mail verificado | Login basico | Baixo | Mantido |
| `profile` | Dados publicos minimos do perfil Google | Login basico | Baixo | Mantido |
| `https://www.googleapis.com/auth/calendar.events.owned` | Ver/criar/editar eventos em calendarios proprios quando pessoa autorizada conecta Agenda | Calendar 1B | Sensivel | Escolhido, desligado por padrao |

## Escopos rejeitados nesta fase

| Escopo | Motivo |
| --- | --- |
| `https://www.googleapis.com/auth/calendar` | Amplo demais: pode ver, editar, compartilhar e apagar calendarios. |
| `https://www.googleapis.com/auth/calendar.readonly` | Leitura ampla de calendarios; nao e necessario para criar lembretes operacionais iniciais. |
| `https://www.googleapis.com/auth/calendar.settings.readonly` | Configuracoes de Calendar nao sao necessarias no MVP. |
| Drive | Pacote separado, sem ativacao nesta fase. |
| Gmail | Pacote separado, sem ativacao nesta fase. |

## Perfis autorizaveis

| Perfil | Calendar read/write | Observacao |
| --- | --- | --- |
| `admin_sistema` | Sim | Uso tecnico e homologacao governada. |
| `advogado_lider` | Sim | Operacao juridica autorizada. |
| `advogado` | Sim | Operacao juridica autorizada. |
| `secretaria` | Sim | Operacao de agenda e compromissos. |
| `cidadao` | Nao | Publico demonstrativo; bloqueado. |
| Demais perfis | Nao por padrao | Requer decisao posterior. |

## Contrato de minimizacao

- Nao salvar processo real no titulo do evento.
- Nao salvar documento juridico em descricao de evento.
- Nao sincronizar dados sensiveis sem revisao humana.
- Preferir descricoes neutras e operacionais.
- Agenda Jus 9 interna continua como fonte de verdade.
- Oferecer `Desvincular Google Agenda` para remover o grant local de Calendar.

## Referencias oficiais

- Google Calendar API scopes: https://developers.google.com/workspace/calendar/api/auth
- Google sensitive scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- Google app verification submission: https://support.google.com/cloud/answer/13461325
