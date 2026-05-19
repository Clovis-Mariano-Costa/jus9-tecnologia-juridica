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

## Próximo passo técnico

Adicionar RLS no Supabase ou autorização equivalente no backend.
