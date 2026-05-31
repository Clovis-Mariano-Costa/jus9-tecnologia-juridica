-- Jus 9 - verificacao controlada de RLS DAJ e DEJI
-- Executar depois das migracoes 001 a 005 e do seed 001.

begin;

do $$
declare
  visible_count integer;
begin
  perform set_config('app.current_user_id', '90000000-0000-4000-8000-000000000002', true);
  perform set_config('app.current_user_profile', 'advogado', true);

  select count(*) into visible_count from dajs where id in (
    '92000000-0000-4000-8000-000000000001',
    '92000000-0000-4000-8000-000000000002'
  );
  if visible_count <> 2 then raise exception 'RLS titular: esperado 2 DAJs, recebido %', visible_count; end if;

  select count(*) into visible_count from documents where id = '93000000-0000-4000-8000-000000000002';
  if visible_count <> 1 then raise exception 'RLS titular: documento cofre deveria ser visivel'; end if;
end $$;

do $$
declare
  visible_count integer;
begin
  perform set_config('app.current_user_id', '90000000-0000-4000-8000-000000000003', true);
  perform set_config('app.current_user_profile', 'advogado_lider', true);

  select count(*) into visible_count from dajs where id = '92000000-0000-4000-8000-000000000001';
  if visible_count <> 1 then raise exception 'RLS lider: DAJ restrito deveria ser visivel'; end if;

  select count(*) into visible_count from dajs where id = '92000000-0000-4000-8000-000000000002';
  if visible_count <> 0 then raise exception 'RLS lider: DAJ cofre nao deveria ser visivel'; end if;

  select count(*) into visible_count from documents where id = '93000000-0000-4000-8000-000000000002';
  if visible_count <> 0 then raise exception 'RLS lider: documento cofre nao deveria ser visivel'; end if;
end $$;

do $$
declare
  visible_count integer;
begin
  perform set_config('app.current_user_id', '90000000-0000-4000-8000-000000000004', true);
  perform set_config('app.current_user_profile', 'empresa', true);

  select count(*) into visible_count from adapted_dossiers where id = '94000000-0000-4000-8000-000000000001';
  if visible_count <> 1 then raise exception 'RLS empresa: DEJI proprio deveria ser visivel'; end if;
end $$;

do $$
declare
  visible_count integer;
begin
  perform set_config('app.current_user_id', '90000000-0000-4000-8000-000000000001', true);
  perform set_config('app.current_user_profile', 'admin_sistema', true);

  select count(*) into visible_count from audit_logs where id = '95000000-0000-4000-8000-000000000001';
  if visible_count <> 1 then raise exception 'RLS admin: auditoria deveria ser visivel'; end if;

  select count(*) into visible_count from documents where id = '93000000-0000-4000-8000-000000000002';
  if visible_count <> 0 then raise exception 'RLS admin: cofre pertence somente ao titular'; end if;
end $$;

rollback;

select 'RLS_HOMOLOGATION_OK' as result;
