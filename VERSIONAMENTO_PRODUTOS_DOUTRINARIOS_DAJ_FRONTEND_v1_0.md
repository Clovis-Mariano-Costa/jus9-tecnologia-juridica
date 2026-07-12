# Versionamento - Produtos doutrinarios e bibliograficos DAJ frontend v1.0

Data: 2026-07-12

Escopo: consolidar, no modelo-mae DAJ Advogados, um instrumento de doutrina e bibliografia governada para a Charlie Echo.

## Entregas

- Novo painel `Doutrina e bibliografia DAJ` no contrato operacional do chat DAJ.
- Tres acoes rapidas: mapa bibliografico, sintese doutrinaria e ficha de obra.
- Botao `Doutrina DAJ` em `app-ia-profissional.html` e `app-daj.html`.
- Rota normativa propria: Prioritario > Principios > Constituicao > Lei de Doutrina e Bibliografia Conferida > Regimento DAJ > Protocolo de produto doutrinario-bibliografico governado.
- Fallback local para produto doutrinario/bibliografico quando a API nao responder.
- Trava bibliografica contra alucinacao de autor, obra, edicao, pagina e citacao.
- Caso sentinela: `A moderna teoria do fato punivel`, com correcao cautelosa quando o usuario escrever `A nova teoria do fato punivel`.

## Regras

- Charlie pode produzir sintese, argumentos, mapa de fontes e ficha de verificacao.
- Charlie nao pode inventar autor, pagina, trecho literal, edicao, editora, ISBN ou tese interna sem fonte conferida.
- BDTD, CAPES, SciELO, LexML, catalogos bibliograficos e Google Academico com cautela sao fontes de verificacao.
- Uso real em peca, parecer, aula, prazo ou decisao exige revisao humana.

## Replicacao

1. Validar DAJ com perguntas de obra/autoria e sintese doutrinaria.
2. Replicar o painel como `instrumento` por MVP, com prompts proprios.
3. Registrar auditoria publica e teste sentinela por ambiente.
4. Manter cache-bust e service worker versionados a cada pacote.
