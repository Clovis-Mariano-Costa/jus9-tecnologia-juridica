# Versionamento - Dossies persistentes locais dos MVPs v1.0

Data: 2026-05-31

## Objetivo

Transformar os paineis demonstrativos em fluxos testaveis sem publicar dados
reais antes da ativacao do banco remoto.

## Entregas

- O login demonstrativo registra sessao local com validade de oito horas.
- Os 13 paineis `app-demo-*` recebem criacao de dossie ficticio adaptado ao
  perfil.
- Os registros ficam somente no navegador por `localStorage`.
- A interface informa explicitamente que a persistencia e demonstrativa.
- O backend Express ganha contrato `GET /api/dossiers` e `POST /api/dossiers`.
- A migration `003_adapted_dossiers.sql` prepara a futura persistencia em
  PostgreSQL/Supabase.

## Limites

- Nao inserir nomes, processos, documentos ou dados reais.
- O deploy publico ainda nao possui banco remoto configurado.
- Antes de dados reais, ativar autenticacao, RLS, permissoes e auditoria.
