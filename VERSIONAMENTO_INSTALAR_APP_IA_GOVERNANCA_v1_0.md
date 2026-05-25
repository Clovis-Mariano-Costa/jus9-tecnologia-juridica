# Versionamento - instalar app, IA e governanca v1.0

Data: 2026-05-25
Repo: jus9-tecnologia-juridica
Escopo: correcao da pagina de instalacao PWA, rota limpa e padrao publico da I.A.

## Alteracoes

- Mantida `instalar-app.html` como pagina oficial do site principal.
- Criado suporte de rota limpa `/instalar-app` no Worker.
- Atualizado `script.js` para apontar o link dinamico para `/instalar-app`.
- Atualizados `sw.js` e `service-worker.js` para cachear `/instalar-app` e `/instalar-app.html`.
- Reescrita `instalar-app.html` com texto legivel, instrucoes para iOS/Safari e Android/Chrome.
- Corrigidas ocorrencias publicas de `IA assistiva` para `I.A Generativa Multimodal Jurista, com governanca humana e revisao humana`.

## Arquivos ajustados

- `instalar-app.html`
- `worker.js`
- `script.js`
- `sw.js`
- `service-worker.js`
- `mvp.html`
- `modelos-peticoes.html`
- `EQUIPE/REGISTRO_EQUIPE_GOVERNANCA_ASSINATURAS.md`

## Cautela

A pagina de instalacao segue sendo PWA demonstrativo. Nao representa aplicativo nativo final, login real, backend de producao ou coleta de dados sensiveis.
