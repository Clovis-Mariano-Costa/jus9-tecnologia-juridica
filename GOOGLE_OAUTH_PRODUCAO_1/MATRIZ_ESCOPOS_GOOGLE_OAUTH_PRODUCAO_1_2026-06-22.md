# Matriz de escopos - Google OAuth Producao 1

Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## Regra central

Usar escopo minimo. Escopo novo, sensivel ou restrito so entra com confirmacao humana expressa.

## Escopos atuais

| Escopo | Uso | Fluxo | Classificacao esperada | Estado |
|---|---|---|---|---|
| `openid` | Identidade OIDC minima | Login basico | Basico | Manter |
| `email` | E-mail verificado para allowlist/perfil | Login basico | Basico | Manter |
| `profile` | Perfil publico minimo | Login basico | Basico | Manter |
| `https://www.googleapis.com/auth/calendar.events` | Listar/criar eventos de Agenda quando usuario conecta Agenda | Incremental separado | Sensivel | Submeter apenas se Agenda entrar em producao |

## Escopos proibidos nesta fase

| Escopo/area | Motivo |
|---|---|
| Gmail | Nao faz parte do pacote Producao 1 |
| Drive | Continua por Drive Saver, Drive Desktop ou fluxo governado separado |
| Contatos | Nao necessario para login/Agenda |
| Escopos restritos amplos | Podem exigir revisao mais pesada e avaliacao de seguranca |

## Justificativas preparadas

### Login basico

O login Google identifica a pessoa usuaria com e-mail verificado e cria sessao governada no backend da Jus 9. O app usa perfil e permissoes para controlar acesso a modulos, sem guardar token Google na sessao principal.

### Google Agenda

A Agenda Google e recurso opcional e incremental. A pessoa usuaria so concede permissao quando escolhe conectar a Agenda. A Jus 9 usa o acesso para listar proximos eventos e criar eventos controlados como lembretes/espelhos operacionais. A agenda propria da Jus 9 continua como fonte de verdade.

## Dados tratados

- E-mail verificado.
- Hash de e-mail na sessao/log.
- Hash de identificador Google.
- Perfil operacional autorizado.
- Token de Calendar, apenas se Agenda for conectada.
- Metadados minimos de eventos quando o usuario usa Agenda.

## Dados nao tratados nesta fase

- Conteudo de Gmail.
- Arquivos do Google Drive.
- Contatos Google.
- Fotos Google.
- Dados de pagamento.
- Documentos juridicos sensiveis via Google API.

