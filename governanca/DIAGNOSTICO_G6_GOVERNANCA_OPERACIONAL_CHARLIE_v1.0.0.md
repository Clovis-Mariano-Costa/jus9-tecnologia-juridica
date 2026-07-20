---
id: GOV-CHARLIE-DIAGNOSTICO-G6-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: diagnostico-concluido-proxima-etapa-documental
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
escopo: Charlie Echo, sem ampliacao CNJ e sem MVPs gerais
---

# Diagnostico G6 - governanca operacional da Charlie

## Conclusao executiva

A Charlie possui controles reais mais maduros que parte de sua documentacao fundadora. O pipeline ativo ja registra classificacao, risco, proveniencia, revisao humana, citacoes, limites, efeitos autonomos bloqueados e auditoria minimizada. Entretanto, a matriz de capacidades v1.1.0, as feature flags v1.3.0 e o contrato de backend v1.3.0 ainda classificam partes do chat, health e eventos como planejadas. A proxima prioridade e reconciliar a fonte de verdade antes de ampliar memoria, Drive, RAG, CNJ ou ferramentas transacionais.

## Evidencias confrontadas

- `functions/lib/charlie-core/response-pipeline.js` e contrato Charlie Core `1.2.0`.
- `worker.js` e health publico `/api/health`.
- `governanca/MATRIZ_CAPACIDADES_CHARLIE_ECHO_v1.1.0.json`.
- `apis/FEATURE_FLAGS_CAPACIDADES_CHARLIE_ECHO_v1.3.0.json`.
- `apis/CONTRATO_BACKEND_GOVERNADO_CHARLIE_ECHO_v1.3.0.yaml`.
- `prompts/governanca/CONTRATOS_MODOS_CHARLIE_ECHO_v1.1.0.yaml`.
- `prompts/seguranca/POLITICA_RISCOS_CHARLIE_ECHO_v1.2.0.yaml`.
- `memoria/POLITICA_MEMORIA_CHARLIE_ECHO_v1.0.0.md`.
- auditores do pipeline, riscos, qualidade, autenticacao, RLS e laudo DAJ.

## O que ja esta governado

1. Classificacao da entrada e da resposta.
2. Nivel de risco e revisao humana obrigatoria em uso sensivel.
3. Proveniencia entre upstream, correcao upstream e fallback governado.
4. Contrato de laudo DAJ com dez secoes obrigatorias.
5. Bloqueio de efeitos autonomos e de atos juridicos reais.
6. Auditoria minimizada sem pergunta, resposta, CPF, numero processual ou identidade.
7. DataJud por numero CNJ em leitura de metadados, com cache e limites.
8. PDPJ em `readiness_only`, sem credenciais ou transacoes.
9. Memoria por usuario isolada no backend, sem promocao automatica declarada.
10. Revisao humana e encaminhamento ao papel `advogado_lider` no fluxo DAJ aceito.

## Lacunas prioritarias

| Prioridade | Lacuna | Risco | Tratamento proposto |
|---|---|---|---|
| P0 | Documentacao diverge do runtime | Capacidade ativa pode aparecer como planejada ou vice-versa. | Criar registro canonico v2 gerado de evidencias verificaveis e vinculado ao health. |
| P0 | Autoridade por papel nao esta consolidada em uma unica matriz | Um perfil pode receber acao acima do escopo esperado. | Mapear papel, recurso, leitura, escrita, aprovacao, delegacao e revogacao; manter `advogado_lider` como decisor humano, nao como autorizacao universal. |
| P0 | Ferramentas e conectores nao possuem um catalogo Charlie unico | Chat pode sugerir acao que o conector nao deve executar. | Adotar default deny por ferramenta, efeito, dado, ambiente, credencial e aprovacao humana. |
| P0 | Segredos e sessoes precisam de regra operacional unica | Credencial pode ser copiada para chat, log ou documento. | Proibir segredo em prompt/repositorio, exigir rotacao apos exposicao e custodia no provedor seguro. |
| P1 | Politica de memoria nao declara prazos concretos por classe | Contexto pode permanecer alem da finalidade. | Definir retencao, exportacao, exclusao, tombstone, base/consentimento e responsavel por classe. |
| P1 | Status de citacao nao equivale a verificacao material da fonte | Resposta pode parecer fundamentada sem conferencia suficiente. | Separar `citada`, `localizada`, `conferida` e `inaplicavel`; registrar fonte e data sem guardar consulta sigilosa. |
| P1 | Auditoria nao consolida retencao, alertas e acesso | Evento minimizado pode permanecer sem regra de ciclo de vida. | Definir prazo, acesso, alerta, exportacao, integridade e descarte por evento. |
| P1 | Suite de riscos cobre categorias, mas nao todo abuso de ferramentas | Prompt injection ou escalada de permissao pode escapar do teste funcional. | Incluir injecao de prompt, exfiltracao, tool misuse, conflito de fontes e bypass de aprovacao. |
| P2 | Manifesto e contratos fundadores seguem como rascunho operacional | Regra aplicada pode nao ter aceite formal registrado. | Submeter pacote reconciliado ao revisor humano e promover somente por release. |

## Plano G6

### G6A - diagnostico e linha de base

Estado: `CONCLUIDO_DOCUMENTAL`.

Saida: este diagnostico e a matriz de reconciliacao v1.0.0. Nenhum runtime alterado.

### G6B - registro canonico de capacidades v2

Estado: `PROXIMA_ACAO`.

Criar uma fonte unica que declare por capacidade: estado comprovado, rota, ambiente, papel, dado, efeito, dependencia, feature flag, evidencia, revisao humana e rollback. Itens sem evidencia falham fechados.

### G6C - matriz de autoridade e ferramentas

Estado: `PLANEJADO_APOS_G6B`.

Mapear `advogado_lider`, demais papeis humanos, Charlie, DataJud, Drive, memoria e futuro PDPJ. A Charlie pode recomendar e preparar; efeitos externos exigem humano e conector expressamente autorizado.

### G6D - ciclo de vida de memoria e auditoria

Estado: `PLANEJADO_APOS_G6C`.

Definir retencao, consentimento, exportacao, exclusao, tombstone, acesso, alertas e descarte. Drive nao sera tratado como cofre ou unica fonte transacional.

### G6E - avaliacao adversarial

Estado: `PLANEJADO_APOS_G6D`.

Ampliar testes ficticios para injecao de prompt, exfiltracao, fonte falsa, escalada de papel, ferramenta indevida, memoria sem consentimento e tentativa de ato juridico autonomo.

### G6F - aceite humano e promocao

Estado: `BLOQUEADO_ATE_G6B_G6E`.

Promover documentos fundadores de rascunho para ativo somente apos revisao humana, testes, release e rollback documentado.

## Condicoes de parada

- Qualquer pedido para registrar senha, token, cookie, certificado ou segredo no repositorio.
- Capacidade sem evidencia tecnica atual ou com estado divergente entre health, codigo e documento.
- Escrita, publicacao, contato externo ou ato juridico sem aprovacao humana especifica.
- Uso de dado real em teste publico ou fixture.
- Tentativa de usar o papel `advogado_lider` como permissao irrestrita.
- Ampliacao PDPJ/CNJ antes dos gates institucionais do cronograma v1.8.0.

Para qualquer canal institucional pendente, silencio nao autoriza integracao, credencial, teste de rede ou efeito externo.

## Proxima acao unica

Executar G6B: elaborar o registro canonico de capacidades Charlie v2 a partir do runtime atual, sem mudar o runtime e sem promover estado que nao tenha evidencia automatizada.
