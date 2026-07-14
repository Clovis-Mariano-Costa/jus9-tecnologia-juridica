---
id: GOV-CHARLIE-CRONOGRAMA-002-3
versao: 2.3.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: em-execucao
classificacao: PUBLICO-INSTITUCIONAL
hash: nao-aplicavel-planejamento
substitui_planejamento: 2.2.0
preserva_historico: true
---

# Cronograma Mao na Massa - Charlie Echo v2.3.0

## Diretriz

Avancar sem perder o que ja funciona. Cada pacote exige regressao automatizada, publicacao identificavel, aceite humano quando houver login ou dado governado e caminho de rollback que preserve KV, Drive, memoria e auditoria.

Estados:

- `CONCLUIDO`: implementado, publicado, testado e aceito.
- `HOMOLOGACAO_TECNICA`: automacao aprovada; falta prova humana autenticada.
- `PROXIMO`: primeira entrega liberada pela porta anterior.
- `ESPERA_EXTERNA`: depende de orientacao ou credencial oficial.
- `BLOQUEADO_POR_PORTA`: existe codigo, mas a ativacao seguinte seria prematura.

## Base congelada

- Pedido generativo usa API da Charlie; consulta estruturada nao usa LLM.
- Processo, pessoa, DAJ, fonte, pagina e link jamais sao presumidos.
- DataJud responde somente por metadados publicos oficiais.
- CPF nao vai para URL, resposta publica, log ou memoria permanente; indice exato usa HMAC.
- Um DAJ corresponde a no maximo um processo; uma pessoa pode possuir varios DAJs.
- Cada instrumento possui personalidade, memoria, fontes, permissoes e configuracao independentes.
- O modulo social reutiliza a orquestra, mas nao herda personalidade ou avisos juridicos do DAJ.

## Pacote 0 - Fundacao auditavel

Estado: `CONCLUIDO`.

- Governanca, versoes, metadados, health, autenticacao, permissoes, memoria por usuario e inventario dos 14 MVPs.
- Porta permanente: CI e auditoria devem passar antes de toda publicacao.

## Pacote 1 - DAJ como fonte operacional

Estado geral: `HOMOLOGACAO_TECNICA`.

### 1A - Vinculo DAJ-processo

- API autenticada e regra de um processo por DAJ publicadas.

### 1B - Cadastro e indice de partes

- Nome deterministico e CPF HMAC alimentados no atendimento antes do processo.
- Idempotencia, detalhe separado e vinculo posterior aprovados tecnicamente.

### 1C - Homologacao reversivel

- Estado tecnico: implementado na release 1.10.0.
- Registro ficticio recebe marca imutavel de homologacao.
- A URL preserva somente `dajId` para retorno depois do login.
- A limpeza exige permissao, justificativa e confirmacao; remove indice e detalhe.
- Tombstone sem dados da parte bloqueia recriacao e preserva prova de auditoria.
- DAJ comum nao pode ser apagado pela rota de homologacao.

Porta humana pendente:

1. Entrar com perfil autorizado.
2. Criar DAJ com identidade e CPF validos, porem inteiramente ficticios.
3. Recarregar a pagina e retomar o mesmo `dajId`.
4. Localizar por DAJ, nome e CPF exato.
5. Vincular a processo ficticio controlado.
6. Enviar para analise da Charlie e conferir que CPF/contato nao entram no prompt.
7. Remover o DAJ ficticio e confirmar que as pesquisas deixam de encontra-lo.

Porta de saida: evidencia humana dos sete passos. Reindexacao e replicacao permanecem `BLOQUEADO_POR_PORTA` ate essa prova.

## Pacote 2 - Memoria e Drive oficial

Estado: `HOMOLOGACAO_TECNICA`; e o proximo pacote depois do aceite 1C.

- Validar com login a memoria por usuario, configuracao por instrumento e isolamento.
- Criar PDF ficticio, salvar no Drive real, receber `downloadUrl`, localizar e revogar.
- Confirmar idempotencia e auditoria sem segredo ou link inventado.

## Pacote 3 - Pesquisa judicial

- 3A numero CNJ/DataJud: `CONCLUIDO`.
- 3B fail-closed de nome/CPF/DAJ: `CONCLUIDO`.
- 3C indice interno: `HOMOLOGACAO_TECNICA`, depende da porta 1C.
- 3D reindexacao legada: `BLOQUEADO_POR_PORTA`; nunca reconstruir CPF mascarado.
- 3E conector externo de partes: `ESPERA_EXTERNA`; sem scraping ou alegacao de consulta.
- 3F PDPJ/MNI/Domicilio: readiness primeiro; ato processual exige perfil, confirmacao humana e auditoria.

## Pacote 4 - Inteligencia juridica e fontes

Estado: `HOMOLOGACAO_TECNICA`.

- Bateria fixa para conceito, prazo, doutrina, pagina, obra ambigua, jurisprudencia e pedido nao juridico.
- Autor, obra, pagina, julgado e trecho literal exigem evidencia verificavel.
- Sem evidencia, declarar o limite e pedir documento; jamais completar por plausibilidade.

## Pacote 5 - Pecas, uploads e documentos

Estado: implementacao parcial.

- Upload governado de TXT, PDF, DOCX e imagem/OCR sem fingir extracao.
- DAJ, analise Charlie, minuta distinta, PDF e Drive em uma trilha auditavel.
- Salvamento automatico somente com classificacao, justificativa e URL real do backend.

## Pacote 6 - Frontend compacto

Estado: base em homologacao.

- Minimo de botoes, fala e anexo padronizados e configuracoes reunidas no menu lateral.
- Validar desktop e celular, foco, rotulos, carregamento, erro, texto e ausencia de sobreposicao.

## Pacote 7 - Modulo social

Estado: piloto existente; revisao propria pendente.

- Preservar identidade, fontes e responsabilidade social proprias.
- Impedir contaminacao por protocolos e linguagem do DAJ.
- Aprovar acolhimento, direitos basicos, encaminhamento comunitario e limites de risco.

## Pacote 8 - Replicacao dos instrumentos

Estado: `BLOQUEADO_POR_PORTA` ate Pacotes 1 a 7.

- Replicar mecanismo e testes para 14 MVPs por configuracao independente.
- Nunca copiar dados, memoria ou permissao entre instrumentos.

## Pacote 9 - Auditoria institucional

Estado: pendente depois do modelo DAJ aceito.

- Consolidar evidencias, LGPD, seguranca, fontes, versoes, commits, deployments, riscos e dependencias.
- Material de investidores deve distinguir concluido, homologacao e planejado.

## Pacote 10 - Release final

Estado: pendente.

- Release candidata, CI completa, provas visuais e observacao de 72 horas.
- Rollback preserva dados e auditoria.

## Janela mais breve segura

1. Agora: publicar 1C tecnico e executar aceite humano autenticado.
2. Proximas 24 horas apos aceite: concluir Pacotes 2 e 3C.
3. Dias 2 a 4: Pacotes 4 e 5.
4. Dias 4 a 6: Pacotes 6 e 7.
5. Dias 6 a 10: Pacote 8.
6. Dias 10 a 12: Pacotes 9 e 10 e inicio da observacao.
7. Em paralelo, sem prazo presumido: conectores oficiais de partes e PDPJ transacional.

## Proxima acao objetiva

Publicar a release 1.10.0 e executar o aceite humano do Pacote 1C apenas com dados ficticios. Se a sessao nao estiver disponivel, parar nessa porta sem criar dados em producao e sem antecipar reindexacao ou replicacao.
