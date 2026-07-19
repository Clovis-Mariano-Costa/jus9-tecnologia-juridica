---
id: GOV-CHARLIE-CNJ-CONEXOES-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: em-execucao-controlada
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
preserva_historico: CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.1.md
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma focado - Charlie, governanca, CNJ e conexoes

## Recorte de trabalho

Este cronograma sucede o v3.1.1 apenas para esta frente de trabalho. Evolucao, prova e priorizacao dos demais MVPs ficam fora deste chat e devem seguir em conversa separada.

Entram neste escopo:

- Charlie Core, proxy e contratos de resposta;
- governanca, auditoria, classificacao, minimizacao e revisao humana;
- API Publica do DataJud em modo somente leitura;
- prontidao institucional para PDPJ-Br, SSO, Gateway e Discovery;
- conexoes autorizadas da Charlie, com falha fechada e rastreabilidade.

## Marco de partida - 2026-07-19

- Login demonstrativo com perfil `advogado_lider`: `CONFIRMADO_PELO_FUNDADOR`.
- Laudo do `DAJ-2026-0002`: `SATISFATORIO_COM_RESSALVAS / ACEITE_HUMANO_AUTORIZADO`.
- Ressalva: o campo de documentos do dataset incorporou texto do processo ficticio por erro de formatacao.
- Origem do laudo: fallback governado do Worker apos rejeicao da resposta upstream.
- Reversibilidade: `EM_EXECUCAO / CONFIRMACAO_NATIVA_PENDENTE_NO_CHROME`.
- Drive e memoria real: `BLOQUEADOS_ATE_TOMBSTONE_E_AUSENCIA_CONFIRMADOS`.

## Sequencia vinculante

| Etapa | Janela | Estado | Criterio de pronto |
|---:|---|---|---|
| 0 | agora | `EM_EXECUCAO` | Remover `DAJ-2026-0002`, obter tombstone e confirmar ausencia por DAJ, nome e CPF ficticios. |
| 1 | apos etapa 0 | `PENDENTE` | Corrigir o fixture contaminado e repetir regressao de minimizacao sem criar novo dado persistente. |
| 2 | 1 dia | `PENDENTE` | Tornar explicita a proveniencia da resposta: upstream, correcao upstream ou fallback governado; registrar motivo e versao do contrato. |
| 3 | 1-2 dias | `PENDENTE` | Consolidar contratos da Charlie, classificacao de risco, citacoes, limites, auditoria e revisao humana em um unico pipeline. |
| 4 | 2-3 dias | `PENDENTE_REVISAO_TERMOS` | Validar DataJud somente por numero CNJ, aliases permitidos, cache, timeout, backoff, logs minimizados e termo de uso. |
| 5 | 3-5 dias | `DEPENDENTE_CNPJ_E_CNJ` | Preparar onboarding PDPJ-Br: responsavel institucional, SSO OAuth2, ambiente STG, Gateway, Discovery e matriz de autorizacao. |
| 6 | apos etapa 0 | `BLOQUEADO` | Revisar Drive, memoria e demais conectores com escopos minimos, revogacao, idempotencia e trilha de auditoria. |
| 7 | 72 horas apos publicacao | `PENDENTE` | Observar erros, latencia, cache, rate limit, vazamento de dados e recuperacoes por fallback; decidir manter ou reverter. |

## Portas obrigatorias

### G0 - Reversibilidade do DAJ ficticio

- exclusao autenticada e restrita a homologacao;
- tombstone sem dados da parte;
- ausencia operacional por DAJ, nome e CPF ficticios;
- indice de processo e caixas de workflow limpos;
- registro do aceite com as ressalvas, sem senha, cookie ou dado privado.

Sem G0, Drive e memoria real continuam bloqueados.

### G1 - Charlie rastreavel

- toda resposta declara `source`, versao do contrato e `auditId`;
- fallback nao se apresenta como resposta direta do modelo;
- resposta juridica critica exige revisao humana;
- nenhum prompt contem segredo, CPF integral, contato ou dado nao necessario;
- falha upstream nunca autoriza invencao de fonte, processo ou providencia.

### G2 - DataJud publico e somente leitura

- consulta apenas a metadados processuais publicos;
- entrada primaria por numero CNJ validado;
- tribunal resolvido por allowlist, nunca por URL livre;
- cache com TTL, limite de taxa, timeout e backoff;
- resultado identifica CNJ/DataJud como fonte e preserva data da consulta;
- busca externa por nome ou CPF permanece fechada sem conector oficialmente autorizado.

### G3 - PDPJ-Br institucional

- nenhuma credencial ou chamada real antes de onboarding e autorizacao formal;
- SSO OAuth2 e perfis/lotacoes tratados como controle institucional;
- homologacao usa Gateway/Discovery STG e contratos oficiais;
- producao depende de responsavel, matriz de acesso, logs, revogacao e plano de incidente.

### G4 - Conexoes da Charlie

- cada conector declara dono, finalidade, classificacao, escopos, ambiente e modo de falha;
- escrita externa exige autorizacao humana especifica e idempotencia;
- secrets ficam fora de codigo, prompt, log e documento;
- desconexao e revogacao devem ser testaveis;
- conectores bloqueados nao podem ser simulados como ativos.

## Fontes oficiais de referencia

- API Publica do DataJud: https://www.cnj.jus.br/sistemas/datajud/api-publica/
- Termo de Uso da API Publica do DataJud: https://formularios.cnj.jus.br/wp-content/uploads/2023/05/Termos-de-uso-api-publica-V1.1.pdf
- Documentacao PDPJ-Br: https://docs.pdpj.jus.br/
- Discovery e Gateway: https://docs.pdpj.jus.br/servicos-estruturantes/discovery-gateway/
- Padroes de API PDPJ-Br: https://docs.pdpj.jus.br/desenvolvendo-para-a-pdpj/padroes-de-api/

## Proxima acao unica

Fechar G0. Na aba autenticada do atendimento, concluir a confirmacao de remocao do `DAJ-2026-0002`; depois comprovar tombstone e ausencia. Nenhuma etapa posterior deve ser declarada iniciada antes desse resultado.
