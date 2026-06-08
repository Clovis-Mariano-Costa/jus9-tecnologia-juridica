# Versionamento - Descontaminacao da memoria de doutrina

Data: 2026-06-08

Autor operacional: Charlie Juris da Costa / Codex

## Problema

Mesmo apos corrigir a API primaria, a sala local podia continuar carregando respostas antigas em que `doutrina` era tratada como pesquisa juridica guiada. Quando a API falhava ou a memoria era usada como contexto, a Charlie Echo podia repetir o erro antigo.

## Correcao

1. Memorias com frases do protocolo antigo sao ignoradas ao montar contexto para a API.
2. O objeto de sala enviado para a API tambem passa por sanitizacao.
3. O fallback local ganhou resposta de producao doutrinaria responsavel.
4. O resumo executivo deixa de reaproveitar resposta contaminada como ultima resposta util.
5. Se o pedido atual for doutrina produtiva, a intencao antiga `pesquisa juridica guiada` nao e enviada como orientacao.

## Resultado esperado

Perguntas como `Explique a doutrina da responsabilidade civil sem citar autores` devem produzir conteudo doutrinario, mesmo se a memoria local ainda guardar respostas antigas ruins.

Pedidos de pesquisa, fontes, jurisprudencia ou links continuam seguindo trilha segura de fontes.
