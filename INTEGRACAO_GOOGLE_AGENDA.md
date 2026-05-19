# Integracao com Google Agenda

Data: 2026-05-19

## Resposta curta

Sim, a Jus 9 pode integrar com Google Agenda.

## O que ja pode existir no MVP estatico

- Link para abrir o Google Agenda com um evento demonstrativo preenchido.
- Exportacao futura em `.ics`.
- Tela de Agenda interna (`app-agenda.html`) como fonte visual dos compromissos do MVP.

## O que exige backend seguro

Para sincronizacao real com a agenda de um usuario, cliente, advogado ou equipe:

- projeto no Google Cloud;
- OAuth 2.0;
- consentimento do usuario;
- escopos minimos de calendario;
- backend para guardar tokens com seguranca;
- logs de acesso;
- politica de permissao por perfil;
- cuidado com dados juridicos sensiveis.

## Regra de seguranca

Nao sincronizar dados reais de processos, clientes, prazos ou documentos com Google Agenda sem revisao humana, base juridica, consentimento e cofre tecnico adequado.
