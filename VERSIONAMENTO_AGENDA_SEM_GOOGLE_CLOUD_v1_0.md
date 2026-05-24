# Versionamento - Agenda sem Google Cloud v1.0

Data: 2026-05-24
Repo: jus9-tecnologia-juridica
Escopo: MVP publico Jus 9

## Objetivo

Registrar a Agenda do MVP como funcional em modo demonstrativo, sem dependencia de Google Cloud, OAuth real, tokens ou backend de calendario em producao.

## Alteracoes

- Adicionado bloco visual "Modo atual da Agenda" em `app-agenda.html`.
- Registrado que a agenda funciona agora com salvamento local, listagem no navegador, download ICS e link manual do Google Calendar.
- Registrado que Google Cloud, OAuth e agenda real permanecem desativados nesta fase.
- Adicionado feedback visual para:
  - salvar compromisso no navegador;
  - abrir link manual do Google Calendar;
  - baixar arquivo ICS.

## Garantias do MVP

- Nenhum segredo, token ou senha foi adicionado ao frontend.
- Nenhum dado real de cliente, processo, WhatsApp, cofre ou documento pessoal e necessario.
- Nenhum evento e enviado automaticamente ao Google Cloud.
- A Agenda continua funcionando offline no navegador.

## Proximo contrato

Quando o backend de Agenda for ativado no fluxo de producao, os eventos demonstrativos deverao ser validados em ambiente seguro antes de qualquer integracao real com Google Calendar.
