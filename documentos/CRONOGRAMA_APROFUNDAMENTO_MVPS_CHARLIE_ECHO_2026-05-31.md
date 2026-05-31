# Cronograma de aprofundamento dos MVPs com Charlie Echo

Data: 2026-05-31
Classificacao: INTERNO / OPERACIONAL / MVP DEMONSTRATIVO

## Objetivo

Aprofundar os 13 ambientes demonstrativos com respostas contextualizadas da Charlie Echo, preservando autenticacao, titularidade, auditoria, sigilo, revisao humana e a proibicao de dados reais na fase publica.

## Fase 1 - Inteligencia compartilhada e regressao

Prioridade imediata.

- tornar o cockpit profissional API-first;
- manter respostas locais somente como contingencia;
- testar perguntas abertas, identidade, modos, links externos e protocolos;
- validar downloads, anexos textuais e avisos de seguranca.

## Fase 2 - Fluxos prioritarios

Prioridade alta.

| Ambiente | Dossie | Proximo aprofundamento |
| --- | --- | --- |
| Advogado / Defensor Publico | `DAJ` | triagem, documentos, prazos, agenda e titularidade |
| Professor / Academia | `DAA` | aula, aluno, turma, plano didatico e subperfis academicos |
| Estudante | `DEJ` | roteiro de estudo, resumo, referencias e linguagem didatica |
| Perito Judicial | `DPJ` | quesitos, diligencias, anexos e cadeia tecnica demonstrativa |
| Empresa / Juridico Interno | `DEJI` | contratos, riscos, governanca e responsabilidade social |

## Fase 3 - Rede institucional e administrativa

Prioridade media.

| Ambiente | Dossie | Proximo aprofundamento |
| --- | --- | --- |
| Cidadao / Interessado | `DIC` | orientacao inicial e encaminhamento por fonte oficial |
| Investidor / Parceiro | `DIP` | apresentacao, indicadores e governanca |
| Escritorio Juridico | `DEE` | equipe, distribuicao de tarefas e auditoria |
| Orgao Publico / Instituicao | `DOI` | atendimento institucional e rastreabilidade |
| Administrador Jus 9 | `DGE` | catalogos, perfis, permissoes e relatorios |

## Fase 4 - Autoridades com cautela maxima

Prioridade condicionada a revisao humana reforcada.

| Ambiente | Dossie | Proximo aprofundamento |
| --- | --- | --- |
| Juiz / Magistrado | `DMG` | organizacao de gabinete demonstrativa, sem simular decisao |
| Promotor / Ministerio Publico | `DMP` | organizacao ministerial demonstrativa, sem simular ato oficial |
| Delegado / Autoridade Policial | `DAP` | fluxo demonstrativo, sem simular investigacao ou ato oficial |

## Condicoes antes de dados reais

- ativar banco de homologacao;
- aplicar e testar RLS;
- concluir OAuth Google e sessoes autenticadas;
- validar titularidade, perfis e auditoria com contas controladas;
- manter secreto/cofre fora do frontend publico;
- registrar revisao humana para fluxos sensiveis.
