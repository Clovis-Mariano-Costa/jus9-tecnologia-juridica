---
id: JUS9-RELEASE-CHARLIE-GOV-1.7.0
versao: 1.7.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-13
status: publicado-em-homologacao
classificacao: INTERNO
hash: pendente-apos-commit
---

# Release Governanca Charlie Echo v1.7.0

## DED independente

- IA editorial propria com personalidade, foco, perguntas e contrato operacional DED.
- Perfis editoriais proprios para autor, autor-editor, editora, editor, revisor, curador, designer e publicador.
- Documentos e workspace proprios, ligados a autoria, versao, direitos, prova e publicacao.
- Menu geral da Charlie passa a listar os quatorze instrumentos independentes.

## Governanca preservada

- O DED usa a API segura, memoria por usuario e Drive governado da orquestra comum.
- Autoria, fonte, citacao, pagina, licenca e titularidade nao podem ser inventadas.
- O DIC permanece modulo social proprio e seu modo social padrao agora e verificado em teste.

## Proximo marco

- Observar a release em producao por 72 horas e colher aceite humano.
- Publicar o Apps Script idempotente do Drive Saver quando o responsavel acessar o projeto correto.

## Evidencias de publicacao

- Commit: `6f0f755`.
- Implantacao ativa: `bd91217c-9164-44d8-8baa-6ddf586dfee1`.
- Health: `governanca-1.7.0-ded-independente-1.0`, estado `ready`.
- CI completa: portal, 14 MVPs, governanca, RLS, SQL, autenticacao, DAJ, backend local, Charlie Echo publica, instalacao e QR Codes.
- Prova visual: DED em 1280x720 e 390x844 sem rolagem horizontal ou texto excedente.
- Prova funcional: fala, anexo, configuracoes, memoria por usuario, retencao, instrumento DED e consulta real da API.
- Invariante social: DIC abre com modo `social` selecionado e foco de orientacao publica.

## Rollback

- Implantacao anterior preservada: `0cbfb823-8773-4f85-af0d-a73779421a70`.
- Em regressao grave, reverter a implantacao do Worker e o commit desta release; nao remover KVs, segredos ou trilhas de auditoria.

## Pendencias externas

- Publicar a versao idempotente do `Code.gs` no Apps Script do Drive Saver.
- Obter conector autorizado para pesquisa por nome/CPF e credenciais institucionais PDPJ quando aprovadas.
- Observar producao por 72 horas antes do aceite humano final.
