-- Jus 9 Tecnologia Jurídica
-- Movimento 3 — Esquema inicial PostgreSQL/Supabase

create type user_profile as enum (
  'admin_sistema',
  'advogado_lider',
  'advogado',
  'assessor_chefe',
  'assessor',
  'secretaria',
  'estagio'
);

create type secrecy_level as enum (
  'comum',
  'restrito',
  'secreto',
  'cofre'
);

create type attention_reason as enum (
  'prazo',
  'documento_faltante',
  'cliente_aguardando_retorno',
  'audiencia',
  'intimacao',
  'risco_de_perda_de_direito',
  'urgencia_emocional_social',
  'sigilo',
  'outro'
);

create type document_status as enum (
  'faltante',
  'recebido',
  'pendente_conferencia',
  'conferido',
  'ajuizado',
  'protocolado',
  'cofre',
  'secreto',
  'arquivado'
);

create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  profile user_profile not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  primary_contact text,
  notes text,
  created_at timestamptz not null default now()
);

create table dajs (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,
  client_id uuid references clients(id),
  apparent_area text not null default 'Ainda não classificada',
  status text not null default 'em_triagem',
  secrecy secrecy_level not null default 'comum',
  attention_reason attention_reason not null default 'outro',
  lead_lawyer_id uuid references users(id),
  titular_lawyer_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table attendances (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid not null references dajs(id) on delete cascade,
  type text not null check (type in ('inicial','retorno')),
  summary text,
  urgency text,
  attention_reason attention_reason not null default 'outro',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table processes (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid references dajs(id) on delete set null,
  cnj_number text,
  court text,
  state text,
  source text,
  secrecy secrecy_level not null default 'comum',
  last_movement_at timestamptz,
  created_at timestamptz not null default now()
);

create table process_movements (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references processes(id) on delete cascade,
  movement_date timestamptz,
  description text not null,
  source text,
  raw_payload jsonb
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid not null references dajs(id) on delete cascade,
  process_id uuid references processes(id) on delete set null,
  title text not null,
  status document_status not null default 'recebido',
  secrecy secrecy_level not null default 'comum',
  origin text,
  document_date date,
  entered_at timestamptz not null default now(),
  uploaded_by uuid references users(id),
  download_url text,
  summary text
);

create table deadlines (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid references dajs(id) on delete cascade,
  process_id uuid references processes(id) on delete cascade,
  title text not null,
  deadline_at timestamptz not null,
  level text not null default 'importante',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table deadline_alerts (
  id uuid primary key default gen_random_uuid(),
  deadline_id uuid not null references deadlines(id) on delete cascade,
  channel text not null check (channel in ('interno','email','whatsapp','sms')),
  minutes_before integer not null,
  enabled boolean not null default true
);

create table workspace_messages (
  id uuid primary key default gen_random_uuid(),
  daj_id uuid references dajs(id) on delete cascade,
  process_id uuid references processes(id) on delete cascade,
  author_id uuid references users(id),
  visibility text not null default 'interno',
  body text not null,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id),
  daj_id uuid references dajs(id),
  document_id uuid references documents(id),
  action text not null,
  reason text,
  ip_address text,
  created_at timestamptz not null default now()
);

-- Política lógica: secreto/cofre exige titularidade.
-- A implementação final deve reforçar isso em RLS, backend e auditoria.
