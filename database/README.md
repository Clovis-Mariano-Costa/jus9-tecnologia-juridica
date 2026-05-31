<!--
Jus 9 Tecnologia Jurídica
Repositório: jus9-tecnologia-juridica
Software livre com autoria preservada.
Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © **Jus 9 Tecnologia Jurídica**. Direitos autorais da produção reservados.
A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
Referência oficial: https://www.jus9tecnologia.com.br/
E-mail de contato: Contato@jus9tecnologia.com.br
DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
-->

# Database — Jus 9 Movimento 3

Esquema inicial pensado para PostgreSQL/Supabase.

## Núcleo

- `dajs` é o eixo do caso.
- `documents`, `attendances`, `deadlines`, `processes`, `workspace_messages` e `audit_logs` se vinculam ao DAJ.
- `secreto/cofre` deve ser validado por titularidade do advogado.

## Migrações

Aplicar em ordem:

1. `001_initial_schema.sql`
2. `002_office_groups_and_attendance_media.sql`
3. `003_adapted_dossiers.sql`
4. `004_expand_user_profiles.sql`
5. `005_rls_titularidade_e_auditoria.sql`

## Contrato RLS

A migração `005_rls_titularidade_e_auditoria.sql` ativa RLS e exige que o backend defina, dentro de cada transação autenticada:

```sql
select set_config('app.current_user_id', 'UUID-DO-USUARIO', true);
select set_config('app.current_user_profile', 'advogado', true);
```

O terceiro argumento `true` limita o contexto à transação atual.

## Regra máxima

- `secreto/cofre` permanece acessível somente ao advogado titular do DAJ.
- liderança não rompe sigilo;
- permissões de perfil não substituem titularidade;
- `clients` permanece restrito ao administrador nesta primeira versão até receber vínculo seguro por DAJ;
- ativação remota exige teste com contas controladas e auditoria.
