-- Jus 9 v1.3 - Dossies adaptados dos 13 MVPs
-- Aplicar somente em ambiente PostgreSQL/Supabase revisado.

create table if not exists adapted_dossiers (
  id uuid primary key default gen_random_uuid(),
  code text not null check (code in (
    'DAJ', 'DAA', 'DEJ', 'DIC', 'DPJ', 'DIP', 'DEE',
    'DEJI', 'DOI', 'DGE', 'DMG', 'DMP', 'DAP'
  )),
  number text unique not null,
  title text not null,
  owner_label text not null,
  attention_reason text not null default 'revisao_humana',
  secrecy secrecy_level not null default 'comum',
  status text not null default 'em_triagem',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists adapted_dossiers_code_idx
  on adapted_dossiers (code, created_at desc);

-- Politica obrigatoria para producao:
-- 1. ativar RLS antes de inserir dados reais;
-- 2. separar permissoes por perfil e titularidade;
-- 3. auditar criacao, leitura, alteracao e exclusao;
-- 4. manter secreto/cofre fora do frontend publico.
