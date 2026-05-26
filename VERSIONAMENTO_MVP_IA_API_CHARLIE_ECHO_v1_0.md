# Versionamento - MVP IA API Charlie Echo v1.0

Data: 2026-05-26
Repositorio: jus9-tecnologia-juridica

## Objetivo

Conectar as paginas `app-ia-*.html` dos MVPs a API segura publica da Charlie Echo:

`https://charlieecho.jus9tecnologia.com.br/api/ia`

## Alteracoes

- `script.js` agora consulta a API segura da Charlie Echo nos chats `data-ai-chat`.
- Perguntas de identidade conhecidas continuam respondidas localmente como fallback imediato.
- Se a API falhar, o retorno demonstrativo local permanece ativo.
- Os modos dos MVPs foram mapeados para:
  - `profissional` para Jurista e Especialista MVP;
  - `social` para Publico/social.
- Textos das paginas `app-ia-*.html` foram atualizados para indicar API segura e fallback local.

## Governanca

- Nenhum token, chave ou segredo foi colocado no frontend.
- A chave permanece no ambiente seguro do projeto `charlieecho-jus9-tecnologia-juridica`.
- O MVP continua sem dados reais.
