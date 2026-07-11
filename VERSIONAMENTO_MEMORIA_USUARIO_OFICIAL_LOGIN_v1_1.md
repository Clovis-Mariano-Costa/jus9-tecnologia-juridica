# Versionamento - Memoria oficial por login Charlie Echo v1.1

Data: 2026-07-10

## Objetivo

Transformar a memoria configuravel do usuario em uma memoria operacional por login, mantendo fallback local no navegador e trilha documental no Cartorio Digital Charlie Echo.

## Entregue

- Nova rota governada: `/api/charlie/memory`.
- Leitura, salvamento e exclusao de memoria por sessao autenticada.
- Chave de armazenamento por hash da sessao, sem expor e-mail, token, cookie ou segredo no chat.
- Suporte a `JUS9_USER_MEMORY` como KV dedicado.
- Fallback temporario no KV `JUS9_PROFILE_REQUESTS`, com prefixo proprio `charlie:user-memory:v1`, ate a criacao do KV dedicado.
- Painel da Charlie Echo carrega memoria oficial ao abrir e antes de responder.
- Fallback local separado por dono quando houver login.
- Salvamento do painel atualiza memoria oficial por login e, se habilitado, tambem registra no Drive Saver/Cartorio Digital.
- Limpeza da memoria do usuario remove o registro local e tenta remover a memoria oficial por login.
- Regressao automatizada em `tests/validate-worker-auth.mjs`.

## Governanca

A memoria do usuario calibra preferencias, continuidade e modo de trabalho. Ela nao e prova de fato real, autorizacao juridica, credencial, segredo ou permissao para expor dados.

O armazenamento oficial fica atras da sessao Google e exige permissao `auth:read`. A resposta comum da Charlie nao deve revelar hashes, cookies, e-mails, tokens, URLs internas ou bastidores da autenticacao.

## Ativacao recomendada

1. Criar KV dedicado no Cloudflare com binding `JUS9_USER_MEMORY`.
2. Manter o fallback atual enquanto o binding dedicado nao estiver em producao.
3. Validar no DAJ Advogados como modelo-mae.
4. Replicar para os demais MVPs usando o mesmo contrato de painel por instrumento.
5. Depois da aprovacao, ligar auditoria consolidada para investidores e parceiros.

## Cronograma atualizado

- Dia 1: memoria oficial por login no DAJ, teste de regressao e validacao visual.
- Dia 2: ajustar UX do painel e testar com login real.
- Dia 3: criar KV dedicado `JUS9_USER_MEMORY` e remover dependencia do fallback.
- Dias 4 a 5: replicar o modelo para todos os MVPs que usam Charlie Echo.
- Semana 2: relatorio de auditoria para investidores/parceiros com evidencias, limites e roadmap.

## Proximo passo

Testar no dominio autenticado, salvar uma memoria de usuario no painel, enviar uma pergunta ao DAJ e confirmar que a resposta respeita a memoria por login e o instrumento DAJ.
