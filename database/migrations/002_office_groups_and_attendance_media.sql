-- Jus 9 v1.2 — Grupos de escritórios e mídias de atendimento

create table if not exists office_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists offices (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references office_groups(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists daj_office_shares (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid not null references dajs(id) on delete cascade,
  office_id uuid references offices(id),
  share_level text not null check (share_level in ('liberado','compartilhado','sigiloso','interno','secreto_cofre')),
  authorized_by uuid references users(id),
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists attendance_media (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid not null references dajs(id) on delete cascade,
  attendance_id uuid references attendances(id) on delete set null,
  media_type text not null check (media_type in ('audio','video','audio_video','transcricao','resumo')),
  title text not null,
  storage_url text,
  consent_signed boolean not null default false,
  consent_document_id uuid references documents(id),
  purpose text,
  retention_policy text,
  secrecy secrecy_level not null default 'restrito',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);
