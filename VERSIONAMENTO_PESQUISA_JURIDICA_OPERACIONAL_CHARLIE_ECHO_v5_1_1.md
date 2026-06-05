# Versionamento - Charlie Echo v5.1.1

Data: 2026-06-05

## Correção

A Charlie Echo ja sabia indicar fontes, mas respondia pedidos de pesquisa com um protocolo abstrato. Nesta versao, pedidos como "pesquise", "busque" e "indique" passam a gerar pesquisa juridica operacional.

## Resultado esperado

- Montar links clicaveis de busca.
- Separar jurisprudencia e doutrina.
- Gerar termos sugeridos.
- Indicar criterio de conferencia.
- Nao inventar julgados, autores, ementas, paginas ou conclusoes sem fonte conferida.

## Exemplo de comportamento

Pedido: "pesquise jurisprudencia do TJSC sobre responsabilidade civil e indique doutrina academica sobre responsabilidade social empresarial"

Resposta esperada: roteiro TJSC, busca pronta limitada ao dominio oficial, LexML, Google Academico, SciELO, CAPES, Google Livros e ficha de conferencia.
