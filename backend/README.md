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
- `POST /auth/logout`
- `GET /api/profiles`
- `GET /api/dajs`
- `POST /api/dajs`
- `GET /api/dajs/:id/documentos`
- `POST /api/processos/consulta`
- `POST /api/auditoria`

## Login Google MVP

O backend possui um fluxo OAuth Google preparado para ambiente real, sem publicar
segredos no repositorio.

Consulte `AUTH_GOOGLE_MVP_SPEC.md`.

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

## Regra central de sigilo

Secreto/Cofre pertence ao advogado titular do DAJ, processo ou documento. Advogado Líder só acessa se também for titular.
