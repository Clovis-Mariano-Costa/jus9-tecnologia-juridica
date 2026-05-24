# Versionamento - MVP sem Google Cloud v1.0

Data: 2026-05-24

## Decisao

O MVP publico da Jus 9 segue sem ativar Google Cloud pago nesta fase.

## Como fica o login

- Acesso principal por login demonstrativo.
- E-mail principal: `demo@jus9tecnologia.com.br`.
- Perfis demo: `demo1@jus9tecnologia.com.br` ate `demo13@jus9tecnologia.com.br`.
- Senha demonstrativa: `Jus9MVP#2026`.
- Google OAuth permanece preparado no Worker, mas sem credenciais reais.

## Comportamento esperado

- `/auth/google/start` responde `501` seguro enquanto faltarem variaveis reais.
- `/api/auth/me` responde `401` sem sessao.
- `/auth/logout` responde `204`.
- Nenhum dado real, token Google, segredo ou e-mail real deve ir para GitHub.

## Proximas frentes sem custo Google

- Evoluir os perfis demonstrativos.
- Evoluir Agenda com armazenamento local, ICS e contrato de backend local.
- Evoluir DAJ, documentos, painel e workspace com dados ficticios.
- Registrar limites de seguranca e governanca em cada pacote.
