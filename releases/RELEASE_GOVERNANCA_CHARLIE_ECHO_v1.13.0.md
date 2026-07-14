---
id: JUS9-RELEASE-CHARLIE-GOV-1.13.0
versao: 1.13.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-89072ab
---

# Release Governanca Charlie Echo v1.13.0

## Entregas

- Seis telas do DAJ recebem layout operacional limpo e menu lateral consistente.
- Pagina de perfis lista os 19 papeis aceitos, incluindo os oito participantes do DAJ.
- O login continua sendo a unica fonte do perfil; nao existe selecao livre de privilegios.
- Painel DAJ deixa de exibir metricas e processos ficticios como dados operacionais.
- Pesquisa processual reduz controles duplicados e abre o DAJ efetivamente vinculado.
- Charlie mantem upload, fala, memoria, Drive e comandos guiados dentro de Configuracoes.
- Cache PWA atualizado para a nova camada visual.

## Validacao

- CI completa aprovada.
- Seis paginas publicas retornaram HTTP 200.
- Cada pagina confirmou um H1, doze itens de menu e ausencia das faixas institucionais repetidas.
- Pagina de perfis confirmou 19 papeis.
- Health confirmou `governanca-1.13.0-daj-clean-ui-1.0` em estado `ready`.
- Nenhum DAJ foi criado, alterado ou excluido durante a verificacao visual.

## Publicacao

- Commit tecnico: `89072ab`.
- Worker: `ac8b3947-da9c-4eb0-8744-e7a7c66462ea`.
- Painel: `https://jus9tecnologia.com.br/app-demo-advogar.html`.
- Perfis: `https://jus9tecnologia.com.br/app-perfis.html`.
- Atendimento: `https://jus9tecnologia.com.br/app-atendimento-inicial.html`.
- Processos: `https://jus9tecnologia.com.br/app-processos.html`.
- Charlie: `https://jus9tecnologia.com.br/app-ia-profissional.html`.

## Rollback

- Restaurar o Worker `0d910b47-c8f0-442d-80f1-196d5aa5bc09` para voltar a 1.12.0.
- Preservar KV, DAJs, historicos, caixas por perfil, auditoria, memoria e tombstones.
- A camada `daj-clean-ui.css` e aditiva e pode ser removida sem migracao de dados.
