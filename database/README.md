# Database — Jus 9 Movimento 3

Esquema inicial pensado para PostgreSQL/Supabase.

## Núcleo

- `dajs` é o eixo do caso.
- `documents`, `attendances`, `deadlines`, `processes`, `workspace_messages` e `audit_logs` se vinculam ao DAJ.
- `secreto/cofre` deve ser validado por titularidade do advogado.

## Próximo passo técnico

Adicionar RLS no Supabase ou autorização equivalente no backend.
