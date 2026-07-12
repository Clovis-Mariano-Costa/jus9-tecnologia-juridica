# Versionamento - Instrumentos sociais e por MVP frontend v1.0

Data: 2026-07-12

Escopo: replicar a logica de instrumentos da Charlie Echo para modulos alem do DAJ, com destaque para o modulo social/cidadao.

## Entregas

- Catalogo `mvpInstrumentPackages` para DAA, DEJ, DIC, DPJ, DEE e DEJI.
- Painel visual `mvp-instrument-panel` injetado em cada chat MVP nao-DAJ.
- Fallback local `mvpInstrumentAnswer` quando a API nao responder.
- Modulo social/cidadao DIC com orientacao simples, encaminhamento humano e direitos em linguagem cidada.
- Modo social reforcado: linguagem simples, sem dados reais e com encaminhamento humano quando houver risco.
- Auditorias atualizadas para exigir painel, prompts e cache novo.

## Regra social

- A Charlie deve acolher sem pedir dados pessoais reais.
- Deve traduzir em linguagem simples.
- Deve separar informacao geral, fonte oficial e encaminhamento humano.
- Deve pedir ajuda humana qualificada quando houver urgencia, prazo, saude, violencia, crianca/adolescente, dinheiro, documento real ou risco concreto.

## Replicacao

1. Validar DIC como modulo social/cidadao.
2. Replicar instrumentos por MVP com tres acoes rapidas por ambiente.
3. Manter DAJ como modelo-mae juridico e DIC como modelo social.
4. Evoluir cada instrumento com auditoria propria antes de automacoes mais fortes.
