# Versionamento - Padroes de Presenca da Charlie Echo

Registrado em: 2026-06-08 08:56:03.88573

## Escopo

Pacote 4 iniciado com revisao dos pacotes anteriores e criacao de tres densidades de interface para Charlie Echo.

## Padroes

### Detalhista

Uso: pagina de referencia da Charlie Echo.

Aplicado em: `app-chat-charlie-echo.html` / rota `https://jus9tecnologia.com.br/chat-charlie`.

Caracteristicas:

- Salas visiveis.
- Perguntas guiadas completas.
- Menu com Memoria, Painel, Melhorar resposta, Fontes, Atualizar resumo e Gerar PDF.
- Painel amplo de configuracoes e memoria.

### Medio

Uso: paginas proprias de IA de cada MVP ou modulo.

Aplicado em: `app-ia-*.html`, `charlie-echo.html` e `ia-profissional.html`.

Caracteristicas:

- Salas visiveis.
- Sugestoes guiadas reduzidas.
- Menu com Painel, Melhorar resposta, Fontes e Gerar PDF.
- Mantem especialidade do MVP por `data-ai-code` e `data-ai-focus`.

### Pequeno

Uso: chat embutido em paginas operacionais de MVP, quando a Charlie nao e a pagina principal.

Caracteristicas:

- Sem painel extra de perguntas guiadas.
- Sem lista de salas visivel.
- Menu minimo com Melhorar resposta e Fontes.
- Mantem a memoria governada por tras, mas reduz a carga visual.

## Decisao de Governanca

Charlie Echo tem identidade matriz unica, mas deve assumir especialidade conforme o modelo:

- DAJ: jurista de triagem e estrategia prudente.
- DAA: professora / academia.
- DEJ: estudante.
- DPJ: perito.
- DMP: Ministerio Publico.
- DAP: autoridade policial demonstrativa.
- Demais MVPs: especialista conforme ambiente e limites humanos.

## Validacao

- `node --check script.js`
- `node tests\validate-worker-auth.mjs`
- Confirmado online: `script.js` contem `chatLayout` e `chatActionsForLayout`.
- Confirmado online: `chat-charlie` contem `data-ai-layout="detalhista"`.
- Confirmado online: `app-ia-promotor.html` contem `data-ai-layout="medio"`.

## Deploy

Worker publicado em 2026-06-08.

Current Version ID: `906fd676-78cf-4a44-bdc6-c89682e69557`

## Proximo Uso

Ao replicar para novos MVPs:

- Pagina completa da Charlie: `data-ai-layout="detalhista"`.
- Pagina de IA de modulo: `data-ai-layout="medio"`.
- Chat pequeno dentro de pagina operacional: `data-ai-layout="pequeno"`.
