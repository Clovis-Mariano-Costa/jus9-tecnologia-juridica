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
- `GET /api/profiles`
- `GET /api/dajs`
- `POST /api/dajs`
- `GET /api/dajs/:id/documentos`
- `POST /api/processos/consulta`
- `POST /api/auditoria`

## Regra central de sigilo

Secreto/Cofre pertence ao advogado titular do DAJ, processo ou documento. Advogado Líder só acessa se também for titular.
