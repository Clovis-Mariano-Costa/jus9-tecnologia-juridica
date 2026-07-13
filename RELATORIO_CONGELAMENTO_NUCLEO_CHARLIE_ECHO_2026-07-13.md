# Relatorio de congelamento do nucleo Charlie Echo - 2026-07-13

## Objetivo

Congelar o nucleo funcional ja aprovado da Charlie Echo e impedir regressao para respostas genericas, protocolos repetidos ou invencao de fonte, arquivo, URL, obra, pagina, processo ou dado pessoal.

## Nucleo protegido

- API segura como primeira via de resposta.
- Fallback local restrito a rotas explicitamente autorizadas.
- Memoria da sala usada apenas quando a pergunta pedir continuidade.
- Pergunta nova, conceitual ou definitoria ignora historico contaminado.
- Pecas, minutas e documentos devem virar produto concreto com placeholders e revisao humana.
- Upload local governado entra como insumo, sem inventar conteudo de anexo nao extraido.
- Pesquisa juridica com fontes deve produzir sintese e caminho de conferencia, nao apenas lista de links.
- Citacao, doutrina, obra, pagina e trecho literal exigem verificacao.
- Caso "fato punivel" deve corrigir a referencia para "A moderna teoria do fato punivel", de Juarez Cirino dos Santos, sem atribuir a Geraldo Prado.
- Pesquisa processual aceita numero CNJ, nome e CPF, mas nome/CPF exigem conector autorizado e CPF mascarado.
- Drive Saver/Cartorio Digital exige backend autorizado para link real, revogacao ou salvamento governado.

## MVPs ja fortalecidos

- DAJ - Advogados / Defensores.
- DAA - Professor.
- DEJ - Estudante.
- DIC - Cidadao / Social.
- DPJ - Perito.
- DIP - Investidor / Parceiro.
- DEE - Escritorio Juridico.
- DEJI - Empresa / Juridico Interno.

## MVPs para proximo pacote de replicacao

- DOI - Orgao Publico / Instituicao.
- DGE - Governanca do Ecossistema.
- DMG - Magistratura demonstrativa.
- DMP - Ministerio Publico demonstrativo.
- DAP - Autoridade Policial demonstrativa.
- DED - Autor / Editor, revisao final de encaixe.

## Travas automatizadas adicionadas

- `tests/validate-charlie-response-contracts.mjs`
  - verifica API-first;
  - verifica ausencia de fallback generico no erro da API;
  - verifica rotas para peca completa, download, citacao ativa, bibliografia, Drive corretivo e pergunta nova;
  - verifica resposta substantiva para direito de propriedade com fontes;
  - verifica correcao da obra sobre fato punivel;
  - verifica pesquisa processual por numero, nome e CPF com CPF mascarado;
  - verifica DataJud sem busca publica inventada por partes.

- `scripts/run-local-ci.mjs`
  - passa a executar a regressao anti-travamento junto da bateria local.

## Regra de congelamento

Qualquer pacote futuro pode melhorar a Charlie, mas nao deve remover:

- `charlieRouteDecision`;
- `askCharlieApiPayload`;
- `enforceCriticalAnswerGuards`;
- `applyCreativeReasoningFrame`;
- `asksCompleteLegalDraft`;
- `asksActiveLegalCitationResearch`;
- `criticalBibliographicCorrection`;
- `supportedSearchTypes` do DataJud;
- regra global de pesquisa processual por numero, nome e CPF;
- regra de Drive Saver sem URL inventada.

## Proximo pacote recomendado

Pacote Final 2 - Replicacao completa para DOI, DGE, DMG, DMP, DAP e revisao de DED, mantendo cada MVP como instrumento independente da orquestra geral.
