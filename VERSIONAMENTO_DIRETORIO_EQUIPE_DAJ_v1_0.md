---
id: JUS9-DIRETORIO-EQUIPE-DAJ-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-257800a
---

# Diretorio governado da equipe DAJ

## Objetivo

Substituir o cadastro ficticio de equipe no navegador por um diretorio oficial, autenticado, modular e auditavel, sem conceder privilegio apenas pelo preenchimento de formulario.

## Entregas

- `app-equipe.html` passa a usar o layout clean do DAJ e o menu lateral de doze destinos.
- `assets/js/governed-team-directory.js` consulta sessao, perfis aprovados, solicitacoes e auditoria no backend oficial.
- Oito perfis compoem o diretorio DAJ: administrador, advogado lider, advogado, assessor chefe, assessor, secretaria, estagio e escritorio juridico.
- Pessoas autenticadas podem solicitar apenas o proprio perfil.
- Gestores autorizados podem solicitar inclusao de terceiros, revisar e auditar apenas os modulos permitidos.
- Leitores do diretorio recebem nome, papel, funcao e status; e-mail fica restrito a gestores.
- Aprovacao de cadastro e politica efetiva de autenticacao permanecem separadas.
- Menus DAJ apontam para `Equipe e acessos`; a lista completa dos 19 papeis continua em `app-perfis.html`.
- Empresa e Investidor recebem o atalho de Agenda que faltava na auditoria transversal.

## Contrato de permissoes

- `profiles:request`: registra solicitacao propria; gestor do modulo pode registrar terceiro.
- `profiles:read`: le somente o diretorio do modulo compativel com o perfil autenticado.
- `profiles:manage`: lista solicitacoes, decide e consulta auditoria somente nos modulos autorizados.
- `admin_sistema`: pode administrar todos os modulos reconhecidos.
- `advogado_lider`: administra DAJ e DEE.
- `assessor_chefe`: administra DAJ e DEE.

## Regras de seguranca

- API sem sessao retorna `401`.
- Perfil sem capacidade retorna `403`.
- Solicitacao de terceiro por nao gestor retorna `403`.
- Perfil e modulo incompativeis retornam `400`.
- Perfil `admin_sistema` somente pode ser solicitado ou aprovado por administrador.
- Dados retornados pelo backend sao renderizados com `textContent`, sem HTML dinamico.
- KV, DAJs, memoria, anexos, Drive e dados do Google Calendar nao foram migrados nem apagados.

## Evidencias

- Commit tecnico: `257800a`.
- Worker: `a6cf6009-c361-456e-9138-562025a47662`.
- Release: `governanca-1.14.0-team-directory-1.0`.
- CI completa aprovada nos 14 MVPs, modulo social, Worker, RLS, DAJ e backend local.
- Auditoria visual estrutural dos 14 paineis aprovada.
- Nove paginas publicas verificadas com HTTP 200.
- Endpoints anonimos de perfis, solicitacoes e auditoria verificados com HTTP 401.

## Cronograma renovado

1. Aceite humano do diretorio DAJ em desktop e celular, com login de administrador e login operacional.
2. Homologacao de uma solicitacao ficticia completa: criar, manter pendente, aprovar, listar e reprovar.
3. Integrar aviso interno ou e-mail de convite sem transformar envio em concessao de acesso.
4. Replicar o diretorio por instrumento: DAA/DEJ, DPJ, DEE/DEJI e DIP.
5. Aplicar versao social propria ao DIC, com linguagem publica e menor exposicao de identidades.
6. Replicar aos modulos institucionais e editorial: DOI, DMG, DMP, DAP, DED e DGE.
7. Consolidar painel administrativo transversal, acessibilidade, responsividade e relatorio para investidores.

## Rollback

- Restaurar o Worker `ac8b3947-da9c-4eb0-8744-e7a7c66462ea` para voltar a release 1.13.0.
- Preservar o KV `JUS9_PROFILE_REQUESTS`; nenhuma reversao de dados e necessaria.
- Restaurar os menus para `app-perfis.html` apenas se a pagina de equipe for retirada.
- O cache PWA anterior e `jus9-pwa-v34-2026-07-14-daj-clean-ui`.
