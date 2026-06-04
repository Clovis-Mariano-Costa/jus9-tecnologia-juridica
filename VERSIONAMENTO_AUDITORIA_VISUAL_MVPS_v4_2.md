# Versionamento - Auditoria visual dos MVPs v4.2

Data: 2026-06-03

## Escopo

Atualizacao incremental da familia 4.0, focada nos ambientes MVP e demos publicos.

## Entregas

- Camada final de CSS para governanca visual dos demos em `style.css`.
- Auditoria automatica dos 13 arquivos `app-demo-*.html`.
- Documento de orientacao `ORIENTACOES/PADRAO_VISUAL_MVPS_JUS9_v4_2.md`.

## Criterios preservados

- Cada MVP pode ter personalidade propria por ambiente.
- Todos os MVPs precisam manter aviso de demonstracao e ausencia de dados reais.
- Todos devem conservar acesso claro a IA Profissional / Charlie Echo e Agenda.
- Botoes devem priorizar proximo passo, IA, agenda e retorno ao ecossistema.

## Validacao esperada

```bash
node scripts/audit-nav-favicons.mjs
node scripts/audit-mvp-visual.mjs
node --check scripts/audit-mvp-visual.mjs
node --check script.js
```
