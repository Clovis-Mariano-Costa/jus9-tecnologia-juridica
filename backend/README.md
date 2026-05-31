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

# Jus 9 MVP Backend — Movimento 3

Backend demonstrativo inicial em Node/Express.

## Rodar localmente

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Endpoints iniciais

- `GET /health`
- `GET /auth/google/start`
- `GET /auth/google/callback`
- `GET /api/auth/me`
- `GET /api/auth/permissions`
- `POST /auth/logout`
- `GET /api/profiles`
- `GET /api/dajs`
- `POST /api/dajs`
- `GET /api/dajs/:id/documentos`
- `GET /api/dossiers`
- `POST /api/dossiers`
- `POST /api/processos/consulta`
- `POST /api/auditoria`

## Login Google MVP

O backend possui um fluxo OAuth Google preparado para ambiente real, sem publicar
segredos no repositorio.

Consulte `AUTH_GOOGLE_MVP_SPEC.md`.

Documentos de apoio:

- `OAUTH_GOOGLE_ACTIVATION_CHECKLIST.md`
- `AUTH_PROFILE_MATRIX.md`

Para publicacao no dominio principal do MVP, a integracao preferencial esta em
Cloudflare Pages Functions, no diretorio `functions/`. Consulte
`CLOUDFLARE_PAGES_FUNCTIONS_DEPLOY.md`.

Resumo:

- usa `state`, `nonce` e PKCE;
- exige allowlist por `AUTH_ALLOWED_EMAILS`;
- nao grava token Google;
- cria cookie de sessao `HttpOnly`;
- nao grava e-mail puro dentro do cookie de sessao.

Sem as variaveis obrigatorias, `GET /auth/google/start` responde com aviso `501`
de configuracao pendente.

`AUTH_ENFORCE_API=false` mantem os endpoints demonstrativos abertos para o MVP
estatico. Depois do login real validado, `AUTH_ENFORCE_API=true` passa a exigir
sessao e permissao nos endpoints de DAJ, documentos, processos e auditoria.

## Regra central de sigilo

Secreto/Cofre pertence ao advogado titular do DAJ, processo ou documento. Advogado Líder só acessa se também for titular.

## Dossies adaptados

`/api/dossiers` prepara a replicacao do nucleo organizacional para os 13 MVPs.

`/api/profiles` retorna o catalogo publico canonico dos 13 ambientes demonstrativos, seus subperfis, codigos de dossie e aliases legados. A fonte e `data-publica/mvp-perfis.json`.
O endpoint ainda usa memoria do processo Node e nao substitui banco remoto. A
migracao PostgreSQL correspondente esta em
`database/migrations/003_adapted_dossiers.sql`.

## Banco remoto e RLS

A migração `database/migrations/005_rls_titularidade_e_auditoria.sql` prepara RLS por titularidade. Ao integrar PostgreSQL/Supabase ao backend, cada transação autenticada deve definir `app.current_user_id` e `app.current_user_profile` com `set_config(..., true)` antes das consultas protegidas.

Não ativar dados reais enquanto o backend ainda estiver usando arrays em memória.
