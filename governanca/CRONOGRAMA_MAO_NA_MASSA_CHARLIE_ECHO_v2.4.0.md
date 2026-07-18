---
id: GOV-CHARLIE-CRONOGRAMA-002-4
versao: 2.4.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: em-execucao
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 2.3.0
preserva_historico: true
---

# Cronograma Mao na Massa - Charlie Echo v2.4.0

## Marco atual

Base de trabalho em 2026-07-18:

- Portal principal publicado com 14 MVPs e 14 IAs dedicadas.
- Demo 14 - DED - Autor / Editora / Autor-Editor publicado com IA Editorial propria.
- Commit de referencia: `ebe72c1 fix: aponta demo 14 para ia editorial`.
- Deploy de referencia: `3b6f132d-dad7-465e-b306-97ff6fe47aae`.
- CI completo aprovado: `LOCAL_CI_OK portal,rls,sql-homologacao,worker-auth,backend-local,charlie-echo,instalacao-publica,qr-codes`.

## Diretriz

Fazer trabalho real sem quebrar governanca. Cada pacote precisa terminar com evidencia, teste, criterio de aceite e decisao clara: avancar, manter em homologacao ou bloquear por dependencia externa.

Regras fixas:

- Usar somente dados ficticios em testes, aceite humano e demonstracoes publicas.
- Nao inserir CPF real, documento real, senha, token, segredo, processo real, dado de cliente ou arquivo interno.
- Nao simular backend, Drive, DataJud, PDPJ, login, memoria oficial ou link publico quando a resposta real nao existir.
- Consulta estruturada nao usa LLM para inventar resultado.
- DataJud permanece read-only e limitado a metadados publicos oficiais.
- Um DAJ pode ficar vinculado a no maximo um processo.
- Cada MVP conserva memoria, personalidade, permissao, fontes e limites proprios.
- Toda publicacao exige CI, smoke test publico e registro de versionamento.

## Cadencia diaria

- 09:00 BRT - Conferir status, portas abertas, CI anterior e pendencias humanas.
- 10:00 a 13:00 BRT - Implementar somente o pacote ativo.
- 14:00 a 16:00 BRT - Rodar testes, corrigir regressao e revisar seguranca.
- 16:00 a 17:00 BRT - Sincronizar `dist`, fazer dry-run/deploy quando houver alteracao publicavel.
- 17:00 a 18:00 BRT - Registrar versionamento, commit, push e resumo do dia.
- 20:00 BRT - Revisao curta: proxima porta, bloqueio, rollback ou continuidade.

## Cronograma por data

### 2026-07-18 - D0 - Base publica dos 14 MVPs

Estado: `CONCLUIDO`.

Entregas:

- Conferir 14 MVPs, lider MVP, Demo 14 e IA Editorial.
- Sincronizar `dist`.
- Publicar Worker/Assets.
- Smoke test publico nas paginas centrais do Demo 14.

Aceite:

- `DEMO14_FLOW_OK`.
- `LOCAL_LINK_AUDIT_OK`.
- `LOCAL_CI_OK`.
- Smoke online com HTTP 200 em `mvp.html`, `lider-mvp.html`, `demo-14-autor-editor.html`, `app-demo-autor-editor.html` e `app-ia-autor-editor.html`.

### 2026-07-19 - D1 - Pacote 1C: aceite humano DAJ reversivel

Estado: `PROXIMO`.

Objetivo:

- Provar, com login autorizado e dados totalmente ficticios, que o DAJ criado pelo atendimento pode ser retomado, pesquisado, vinculado, analisado pela Charlie e removido pela rota de homologacao.

Roteiro:

1. Entrar com perfil autorizado.
2. Criar DAJ ficticio com nome e CPF validos, mas inventados.
3. Recarregar e retomar pelo mesmo `dajId`.
4. Pesquisar por DAJ, nome e CPF exato.
5. Vincular a processo ficticio controlado.
6. Enviar o DAJ para analise da Charlie.
7. Confirmar que CPF, contato e dado sensivel nao entram no prompt.
8. Remover o DAJ ficticio pela rota governada.
9. Confirmar tombstone e ausencia em pesquisas posteriores.

Porta de saida:

- Evidencia humana dos nove passos.
- Sem essa evidencia, Pacotes 2, 3C, 8, 9 e 10 continuam bloqueados para efeitos reais.

### 2026-07-20 - D2 - Pacote 2: memoria por usuario e Drive oficial

Estado: `DEPENDENTE_DO_ACEITE_1C`.

Objetivo:

- Validar memoria por usuario, configuracao por instrumento e Drive Saver com URL real retornada pelo backend autorizado.

Entregas:

- Teste autenticado de memoria isolada por usuario.
- PDF ficticio gerado e salvo no Drive oficial quando permitido.
- `downloadUrl` real verificado.
- Revogacao ou exclusao governada conferida.
- Registro de idempotencia e auditoria.

Porta de saida:

- Nenhum link inventado.
- Nenhum arquivo real ou sigiloso.
- Evidencia de salvar, localizar e revogar/excluir artefato ficticio.

### 2026-07-21 - D3 - Pacote 3C: indice interno DAJ e pesquisa controlada

Estado: `DEPENDENTE_DO_ACEITE_1C`.

Objetivo:

- Confirmar que o indice interno do DAJ responde por identificador, nome e CPF exato sem vazar CPF, sem URL sensivel e sem chamada generativa.

Entregas:

- Pesquisa por DAJ.
- Pesquisa por nome normalizado.
- Pesquisa por CPF exato via HMAC.
- Confirmacao de falha fechada para dado insuficiente.
- Confirmacao de que reindexacao legada permanece bloqueada.

Porta de saida:

- `3C` aprovado apenas com DAJ ficticio criado pelo fluxo oficial.
- `3D` continua bloqueado; nunca reconstruir CPF mascarado.

### 2026-07-22 a 2026-07-23 - D4/D5 - Pacotes 4 e 5: fontes, pecas, upload e documentos

Estado: `PROXIMO_APOS_1C_E_2`.

Objetivo:

- Transformar a resposta juridica da Charlie em produto verificavel: fontes, limites, minuta, upload lido, PDF e Drive sem invencao.

Entregas:

- Bateria fixa de perguntas juridicas com fontes.
- Resposta com limite explicito quando faltar evidencia.
- Upload governado de TXT, PDF textual, DOCX e imagem/OCR.
- Minuta distinta da analise.
- PDF local.
- Salvamento governado no Drive somente com classificacao permitida.

Porta de saida:

- Documento ficticio entra, e lido ou recusado com motivo.
- Charlie nao alega leitura que nao ocorreu.
- PDF e Drive aparecem somente quando realmente gerados.

### 2026-07-24 - D6 - Pacote 6: frontend compacto e revisao visual

Estado: `PROXIMO_APOS_PACOTES_4_E_5`.

Objetivo:

- Reduzir atrito visual e operacional nos MVPs sem esconder governanca.

Entregas:

- Controle compacto de fala, upload, fontes, PDF e configuracoes.
- Validacao desktop e celular.
- Sem overflow horizontal.
- Sem texto sobreposto.
- Erros e carregamento visiveis.

Porta de saida:

- Screenshot ou evidencia visual em desktop e mobile.
- `node scripts/audit-mvp-visual.mjs` aprovado.

### 2026-07-25 - D7 - Pacote 7: modulo social DIC

Estado: `PROXIMO_APOS_PACOTE_6`.

Objetivo:

- Preservar o DIC como modulo social/cidadao, sem contaminacao por linguagem, protocolos ou promessas do DAJ.

Entregas:

- Revisao de acolhimento, orientacao social, encaminhamento humano e limites de risco.
- Fontes publicas confiaveis.
- Bloqueio de resposta juridica profissional quando o pedido exigir advogado, defensor, autoridade ou emergencia.

Porta de saida:

- DIC responde como modulo social responsavel.
- DAJ e DIC permanecem separados.

### 2026-07-26 a 2026-07-28 - D8/D10 - Pacote 8: replicacao dos 14 instrumentos

Estado: `BLOQUEADO_ATE_PACOTES_1_A_7`.

Objetivo:

- Replicar o modelo validado para todos os instrumentos, mantendo isolamento por configuracao.

Entregas:

- 14 contratos por instrumento.
- 14 IAs dedicadas revisadas.
- Memoria e Drive por permissao, sem copia entre MVPs.
- Perguntas guiadas, fontes, limites e workflow por codigo.
- Regressao automatizada de personas, rotas e inventario.

Porta de saida:

- `node tests/validate-public-mvps.mjs`.
- `node scripts/audit-charlie-echo-mvp-personas.mjs`.
- `node scripts/audit-charlie-mvp-inventory.mjs`.
- Nenhuma memoria, permissao ou personalidade cruzada.

### 2026-07-29 - D11 - Pacote 9: auditoria institucional

Estado: `PROXIMO_APOS_REPLICACAO`.

Objetivo:

- Consolidar evidencias e limites para operacao, parceiro, investidor, reviewer e usuario publico.

Entregas:

- Evidencias de commits, deploys, testes, rollback e riscos.
- Revisao LGPD.
- Revisao Google Drive/OAuth.
- Revisao DataJud/CNJ.
- Matriz de dependencias externas.
- Separacao entre concluido, homologacao, planejado e bloqueado.

Porta de saida:

- Nao publicar material comercial que trate homologacao como produto final.

### 2026-07-30 a 2026-08-01 - D12/D14 - Pacote 10: release candidata e observacao

Estado: `PENDENTE`.

Objetivo:

- Fechar release candidata com provas, CI, deploy, smoke test e observacao de 72 horas.

Entregas:

- Release candidate.
- `node scripts/run-local-ci.mjs`.
- `npx wrangler deploy --dry-run`.
- Deploy identificado.
- Smoke test publico.
- Plano de rollback.
- Janela de observacao de 72 horas.

Porta de saida:

- Aprovar release, manter em observacao ou rollback preservando KV, Drive, memoria e auditoria.

## Trilhas paralelas sem prazo presumido

- Conector externo oficial de partes por nome/CPF.
- PDPJ/MNI/Domicilio Judicial para atos transacionais.
- Confirmacao juridica dos termos DataJud/CNJ.
- Politica Google OAuth/Drive e consentimento em producao.
- Evidencia externa de runtime/modelo quando exigida por edital, evento ou parceiro.

## Comandos minimos de validacao

```powershell
node scripts/audit-mvp-visual.mjs
node scripts/audit-charlie-mvp-inventory.mjs
node tests/validate-public-mvps.mjs
node scripts/run-local-ci.mjs
npx wrangler deploy --dry-run
```

## Proxima acao objetiva

Executar em 2026-07-19 o Pacote 1C com login autorizado e dados ficticios. Se o login autorizado nao estiver disponivel, parar na porta humana, registrar o bloqueio e trabalhar apenas em auditoria, documentacao ou testes que nao criem dados reais.
