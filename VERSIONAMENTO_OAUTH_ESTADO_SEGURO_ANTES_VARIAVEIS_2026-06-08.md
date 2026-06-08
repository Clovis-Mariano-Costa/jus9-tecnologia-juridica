# Versionamento - OAuth em estado seguro antes das variaveis

Classificacao: PUBLICO SANITIZADO / VERSIONAMENTO / SEM SEGREDOS  
Versao: v1.0  
Data: 2026-06-08  
Autor operacional: Charlie Juris da Costa / Codex

## Alteracao

Atualizado o checklist de ativacao OAuth para esclarecer que a tela `/auth/google/start` deve exibir aviso seguro enquanto faltarem variaveis reais no ambiente Cloudflare.

## Estado correto

Antes da configuracao segura:

1. o botao `Entrar com Google` aparece;
2. a rota `/auth/google/start` nao retorna 404;
3. a rota informa variaveis pendentes;
4. nenhum segredo deve ser publicado.

Depois da configuracao segura:

1. `/auth/google/start` deve redirecionar para Google;
2. `/auth/google/callback` deve validar state, PKCE, e-mail verificado e allowlist;
3. `/api/auth/me` deve confirmar sessao;
4. `/api/auth/permissions` deve confirmar permissoes por perfil.

© Jus 9 Tecnologia Juridica - autoria preservada.
