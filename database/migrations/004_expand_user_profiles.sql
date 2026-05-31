-- Jus 9 v1.4 - Perfis dos 13 MVPs
-- Aplicar somente em ambiente PostgreSQL/Supabase revisado.

alter type user_profile add value if not exists 'academia';
alter type user_profile add value if not exists 'estudante';
alter type user_profile add value if not exists 'cidadao';
alter type user_profile add value if not exists 'perito';
alter type user_profile add value if not exists 'parceiro';
alter type user_profile add value if not exists 'escritorio';
alter type user_profile add value if not exists 'empresa';
alter type user_profile add value if not exists 'orgao_publico';
alter type user_profile add value if not exists 'magistrado';
alter type user_profile add value if not exists 'ministerio_publico';
alter type user_profile add value if not exists 'autoridade_policial';

-- Antes de dados reais:
-- 1. ativar RLS;
-- 2. limitar cada perfil por titularidade e permissao;
-- 3. registrar auditoria;
-- 4. revisar acessos secreto/cofre separadamente.
