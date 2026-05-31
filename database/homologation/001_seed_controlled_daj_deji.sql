-- Jus 9 - seed controlado de homologacao DAJ e DEJI
-- SOMENTE DADOS FICTICIOS. Nunca aplicar diretamente em producao.

begin;

select set_config('app.current_user_id', '90000000-0000-4000-8000-000000000001', true);
select set_config('app.current_user_profile', 'admin_sistema', true);

insert into users (id, name, email, profile) values
  ('90000000-0000-4000-8000-000000000001', 'Administrador Homologacao', 'admin.hml@jus9.invalid', 'admin_sistema'),
  ('90000000-0000-4000-8000-000000000002', 'Advogada Titular Homologacao', 'titular.daj.hml@jus9.invalid', 'advogado'),
  ('90000000-0000-4000-8000-000000000003', 'Advogada Lider Nao Titular', 'lider.daj.hml@jus9.invalid', 'advogado_lider'),
  ('90000000-0000-4000-8000-000000000004', 'Empresa Homologacao', 'empresa.deji.hml@jus9.invalid', 'empresa')
on conflict (id) do nothing;

insert into clients (id, name, primary_contact, notes) values
  ('91000000-0000-4000-8000-000000000001', 'Cliente Ficticio Homologacao', 'contato-ficticio@jus9.invalid', 'Registro exclusivamente ficticio para validar RLS.')
on conflict (id) do nothing;

insert into dajs (
  id, number, client_id, apparent_area, status, secrecy, attention_reason,
  lead_lawyer_id, titular_lawyer_id
) values
  (
    '92000000-0000-4000-8000-000000000001',
    'DAJ-HML-0001',
    '91000000-0000-4000-8000-000000000001',
    'Contratual ficticio',
    'em_triagem',
    'restrito',
    'prazo',
    '90000000-0000-4000-8000-000000000003',
    '90000000-0000-4000-8000-000000000002'
  ),
  (
    '92000000-0000-4000-8000-000000000002',
    'DAJ-HML-COFRE-0001',
    '91000000-0000-4000-8000-000000000001',
    'Cofre ficticio',
    'em_triagem',
    'cofre',
    'sigilo',
    '90000000-0000-4000-8000-000000000003',
    '90000000-0000-4000-8000-000000000002'
  )
on conflict (id) do nothing;

insert into documents (id, daj_id, title, status, secrecy, origin, uploaded_by, summary) values
  (
    '93000000-0000-4000-8000-000000000001',
    '92000000-0000-4000-8000-000000000001',
    'Contrato comum ficticio',
    'recebido',
    'comum',
    'homologacao',
    '90000000-0000-4000-8000-000000000002',
    'Documento ficticio sem dado real.'
  ),
  (
    '93000000-0000-4000-8000-000000000002',
    '92000000-0000-4000-8000-000000000002',
    'Documento cofre ficticio',
    'cofre',
    'cofre',
    'homologacao',
    '90000000-0000-4000-8000-000000000002',
    'Documento ficticio exclusivo para validar titularidade.'
  )
on conflict (id) do nothing;

insert into adapted_dossiers (
  id, code, number, title, owner_label, attention_reason, secrecy, status, metadata, created_by
) values
  (
    '94000000-0000-4000-8000-000000000001',
    'DEJI',
    'DEJI-HML-0001',
    'Revisao contratual empresarial ficticia',
    'Empresa Homologacao',
    'revisao_humana',
    'restrito',
    'em_triagem',
    '{"classification":"HOMOLOGACAO FICTICIA","responsabilidade_social":true}'::jsonb,
    '90000000-0000-4000-8000-000000000004'
  )
on conflict (id) do nothing;

insert into audit_logs (id, actor_id, daj_id, document_id, action, reason) values
  (
    '95000000-0000-4000-8000-000000000001',
    '90000000-0000-4000-8000-000000000001',
    '92000000-0000-4000-8000-000000000001',
    null,
    'homologacao.seed',
    'Seed ficticio de homologacao DAJ e DEJI.'
  )
on conflict (id) do nothing;

commit;
