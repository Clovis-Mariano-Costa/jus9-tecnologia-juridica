---
id: JUS9-RELEASE-CHARLIE-GOV-1.14.0
versao: 1.14.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-257800a
---

# Release Governanca Charlie Echo v1.14.0

## Entregas

- Diretorio real de equipe substitui a tela local ficticia do DAJ.
- Solicitacoes, perfis aprovados, decisoes e auditoria usam o KV oficial existente.
- Permissoes de solicitar, ler e administrar perfis ficam explicitas e separadas.
- Solicitacao propria, convite de gestor, leitura com e-mail oculto e limite por modulo sao validados no backend.
- Sete telas do modelo DAJ compartilham layout clean e menu de doze destinos.
- Pagina de papeis continua apresentando os 19 perfis reconhecidos.
- Empresa e Investidor recebem acesso direto a Agenda.
- Cache PWA inclui a pagina e o cliente do diretorio governado.

## Validacao

- CI completa aprovada.
- Auditoria visual estrutural dos 14 paineis aprovada.
- Health confirmou `governanca-1.14.0-team-directory-1.0` em estado `ready`.
- Nove paginas publicas retornaram HTTP 200.
- Novo cliente, folha clean e cache PWA foram encontrados em producao.
- Rotas anonimas de perfis, solicitacoes e auditoria retornaram HTTP 401.
- Nenhum DAJ, perfil real, memoria, arquivo ou evento de agenda foi criado ou removido no smoke de producao.

## Publicacao

- Commit tecnico: `257800a`.
- Worker: `a6cf6009-c361-456e-9138-562025a47662`.
- Diretorio: `https://jus9tecnologia.com.br/app-equipe.html`.
- Papeis: `https://jus9tecnologia.com.br/app-perfis.html`.
- Painel DAJ: `https://jus9tecnologia.com.br/app-demo-advogar.html`.

## Rollback

- Restaurar o Worker `ac8b3947-da9c-4eb0-8744-e7a7c66462ea` para voltar a 1.13.0.
- Preservar todos os KVs e seus registros.
- O novo cliente e aditivo e nao exige migracao de dados para retirada.
