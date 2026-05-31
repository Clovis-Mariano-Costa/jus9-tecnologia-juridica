# Relatorio de preparacao RLS e autenticacao dos MVPs

Data: 2026-05-31
Classificacao: INTERNO / SEGURANCA / BACKEND

## Auditoria executada

Foram revisados:

- backend Node demonstrativo;
- Cloudflare Pages Functions de OAuth Google;
- esquema PostgreSQL/Supabase;
- matriz dos 13 perfis MVP;
- variaveis de ambiente publicadas apenas como exemplos;
- disponibilidade local de credenciais e ferramentas remotas.

## Resultado

Nao foram encontradas credenciais de banco remoto, `psql` ou CLI Supabase configurados nesta maquina. Por seguranca, nenhuma alteracao remota foi aplicada.

## Implementacao preparada

- Criada a migracao `database/migrations/005_rls_titularidade_e_auditoria.sql`.
- Ativado o desenho RLS para tabelas do nucleo, grupos, midias e dossies adaptados.
- Registradas funcoes auxiliares de contexto, perfil e titularidade.
- Reforcada a regra: `secreto/cofre` pertence ao advogado titular.
- Criada a rota Cloudflare Pages Functions `GET /api/auth/permissions`.
- Criada matriz compartilhada de permissoes para a rota publica autenticada.
- Integrada a rota ao `worker.js`, roteador efetivamente publicado no dominio principal.

## Restricoes intencionais

- A tabela `clients` permanece restrita ao administrador nesta primeira versao, pois ainda nao possui politica de vinculo direto fora do DAJ.
- O backend Node demonstrativo ainda usa arrays em memoria.
- A migracao deve ser aplicada primeiro em homologacao.
- Dados reais continuam proibidos ate integracao remota, RLS testado, auditoria e revisao humana.

## Proxima janela controlada

1. provisionar banco de homologacao;
2. aplicar migracoes `001` a `005`;
3. integrar backend ao banco;
4. configurar OAuth Google com contas de teste;
5. testar matriz de acesso e titularidade;
6. ativar `AUTH_ENFORCE_API=true` apenas apos homologacao.
