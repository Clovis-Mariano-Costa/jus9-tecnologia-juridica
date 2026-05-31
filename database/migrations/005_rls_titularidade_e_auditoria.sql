-- Jus 9 v1.5 - RLS por titularidade, perfil e auditoria
-- Aplicar somente em PostgreSQL/Supabase revisado, apos 001 a 004.
-- O backend deve definir app.current_user_id e app.current_user_profile
-- em cada transacao autenticada antes de consultar dados protegidos.

create or replace function jus9_current_user_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.current_user_id', true), '')::uuid;
$$;

create or replace function jus9_current_user_profile()
returns text
language sql
stable
as $$
  select nullif(current_setting('app.current_user_profile', true), '');
$$;

create or replace function jus9_is_admin()
returns boolean
language sql
stable
as $$
  select jus9_current_user_profile() = 'admin_sistema';
$$;

create or replace function jus9_is_daj_titular(target_daj_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from dajs
    where id = target_daj_id
      and titular_lawyer_id = jus9_current_user_id()
  );
$$;

create or replace function jus9_can_read_daj(target_daj_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from dajs
    where id = target_daj_id
      and (
        jus9_is_admin()
        or titular_lawyer_id = jus9_current_user_id()
        or (
          secrecy in ('comum', 'restrito')
          and lead_lawyer_id = jus9_current_user_id()
        )
      )
  );
$$;

alter table users enable row level security;
alter table clients enable row level security;
alter table dajs enable row level security;
alter table attendances enable row level security;
alter table processes enable row level security;
alter table process_movements enable row level security;
alter table documents enable row level security;
alter table deadlines enable row level security;
alter table deadline_alerts enable row level security;
alter table workspace_messages enable row level security;
alter table audit_logs enable row level security;
alter table office_groups enable row level security;
alter table offices enable row level security;
alter table daj_office_shares enable row level security;
alter table attendance_media enable row level security;
alter table adapted_dossiers enable row level security;

create policy users_read_self_or_admin on users
  for select using (id = jus9_current_user_id() or jus9_is_admin());

create policy clients_admin_only on clients
  for all using (jus9_is_admin()) with check (jus9_is_admin());

create policy dajs_read_by_titular_lead_or_admin on dajs
  for select using (
    jus9_is_admin()
    or titular_lawyer_id = jus9_current_user_id()
    or (secrecy in ('comum', 'restrito') and lead_lawyer_id = jus9_current_user_id())
  );

create policy dajs_write_by_titular_or_admin on dajs
  for all using (
    jus9_is_admin() or titular_lawyer_id = jus9_current_user_id()
  ) with check (
    jus9_is_admin() or titular_lawyer_id = jus9_current_user_id()
  );

create policy attendances_by_daj_access on attendances
  for all using (jus9_can_read_daj(daj_id))
  with check (jus9_can_read_daj(daj_id));

create policy processes_by_daj_access on processes
  for all using (daj_id is not null and jus9_can_read_daj(daj_id))
  with check (daj_id is not null and jus9_can_read_daj(daj_id));

create policy process_movements_by_process_access on process_movements
  for all using (
    exists (
      select 1 from processes
      where processes.id = process_movements.process_id
        and processes.daj_id is not null
        and jus9_can_read_daj(processes.daj_id)
    )
  ) with check (
    exists (
      select 1 from processes
      where processes.id = process_movements.process_id
        and processes.daj_id is not null
        and jus9_can_read_daj(processes.daj_id)
    )
  );

create policy documents_by_daj_access_with_secret_titular on documents
  for all using (
    case
      when secrecy in ('secreto', 'cofre') or status in ('secreto', 'cofre')
        then jus9_is_daj_titular(daj_id)
      else jus9_can_read_daj(daj_id)
    end
  ) with check (
    case
      when secrecy in ('secreto', 'cofre') or status in ('secreto', 'cofre')
        then jus9_is_daj_titular(daj_id)
      else jus9_can_read_daj(daj_id)
    end
  );

create policy deadlines_by_daj_access on deadlines
  for all using (daj_id is not null and jus9_can_read_daj(daj_id))
  with check (daj_id is not null and jus9_can_read_daj(daj_id));

create policy deadline_alerts_by_deadline_access on deadline_alerts
  for all using (
    exists (
      select 1 from deadlines
      where deadlines.id = deadline_alerts.deadline_id
        and deadlines.daj_id is not null
        and jus9_can_read_daj(deadlines.daj_id)
    )
  ) with check (
    exists (
      select 1 from deadlines
      where deadlines.id = deadline_alerts.deadline_id
        and deadlines.daj_id is not null
        and jus9_can_read_daj(deadlines.daj_id)
    )
  );

create policy workspace_messages_by_daj_access on workspace_messages
  for all using (daj_id is not null and jus9_can_read_daj(daj_id))
  with check (daj_id is not null and jus9_can_read_daj(daj_id));

create policy audit_logs_insert_authenticated on audit_logs
  for insert with check (actor_id = jus9_current_user_id());

create policy audit_logs_read_admin on audit_logs
  for select using (jus9_is_admin());

create policy office_groups_admin_only on office_groups
  for all using (jus9_is_admin()) with check (jus9_is_admin());

create policy offices_admin_only on offices
  for all using (jus9_is_admin()) with check (jus9_is_admin());

create policy daj_office_shares_titular_or_admin on daj_office_shares
  for all using (jus9_is_admin() or jus9_is_daj_titular(daj_id))
  with check (jus9_is_admin() or jus9_is_daj_titular(daj_id));

create policy attendance_media_by_daj_access_with_secret_titular on attendance_media
  for all using (
    case
      when secrecy in ('secreto', 'cofre') then jus9_is_daj_titular(daj_id)
      else jus9_can_read_daj(daj_id)
    end
  ) with check (
    case
      when secrecy in ('secreto', 'cofre') then jus9_is_daj_titular(daj_id)
      else jus9_can_read_daj(daj_id)
    end
  );

create policy adapted_dossiers_created_by_owner_or_admin on adapted_dossiers
  for all using (created_by = jus9_current_user_id() or jus9_is_admin())
  with check (created_by = jus9_current_user_id() or jus9_is_admin());

-- clients permanece restrito ao administrador nesta primeira versao porque
-- ainda nao possui vinculo direto com usuario fora de dajs. Antes de producao,
-- revisar se o acesso deve derivar de um DAJ especifico.
