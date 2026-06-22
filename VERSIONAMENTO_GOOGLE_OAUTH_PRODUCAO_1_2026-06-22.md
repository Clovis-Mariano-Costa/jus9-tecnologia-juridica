# Versionamento - Google OAuth Producao 1

Data: 2026-06-22
Classificacao: PUBLICO TECNICO / SEM SEGREDOS

## Escopo

Preparacao do pacote Google OAuth Producao 1 para a Jus 9, sem publicar segredos e sem alterar escopos sensiveis.

## Alteracoes

1. Criada pasta `GOOGLE_OAUTH_PRODUCAO_1`.
2. Criado checklist pre-submissao.
3. Criada matriz de escopos.
4. Criado roteiro de video para verificacao Google.
5. Criado runbook de rotacao de segredos sem valores.
6. Criada lista de decisoes pendentes do Fundador.
7. Politica de privacidade publica atualizada com secao sobre Google/OAuth.
8. Executadas escolhas do Fundador para acesso amplo por Conta Google verificada.
9. Preparado modo publico `AUTH_PUBLIC_GOOGLE_ENABLED` com perfil minimo `cidadao`.
10. Criado registro de `accessMode` e `authNucleus` na sessao OAuth.
11. Calendar mantido no pacote 1, bloqueado para perfil publico sem `calendar:write`.
12. Criados pacotes documentais separados para Drive e Gmail.
13. Atualizado `.env.example` com variaveis publicas de configuracao, sem segredo real.

## Limites preservados

- Nenhum segredo foi publicado.
- Nenhum escopo sensivel novo foi adicionado alem do Calendar ja aprovado pelo Fundador para o pacote 1.
- Nenhuma variavel de ambiente real foi alterada.
- Nenhuma submissao ao Google foi executada.
- Drive e Gmail permaneceram fora do pacote 1 e sem escopos ativos.

## Referencias oficiais usadas

- Google OAuth app state overview
- Google OAuth policy compliance
- Google brand verification
- Google sensitive scope verification
- Google Workspace additional considerations
