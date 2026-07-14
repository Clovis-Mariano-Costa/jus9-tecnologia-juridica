---
id: JUS9-DIRETORIO-EQUIPE-MODULAR-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-7bb6c3a
---

# Diretorio governado de equipe por modulo

## Objetivo

Transformar o diretorio DAJ em componente compartilhado, mantendo dados, perfis, navegacao e permissoes independentes para cada MVP da Charlie Echo.

## Modulos atendidos

- DAJ: Advogados.
- DAA: Professor e Academia.
- DEJ: Estudante.
- DIC: Social e Cidadao.
- DPJ: Perito Judicial.
- DIP: Investidor e Parceiro.
- DEE: Escritorio Juridico.
- DEJI: Empresa e Juridico Interno.
- DOI: Orgao Publico e Instituicao.
- DGE: Governanca do Ecossistema.
- DMG: Magistratura.
- DMP: Ministerio Publico.
- DAP: Autoridade Policial.
- DED: Autor e Editor.

Os aliases `INV` e `ORG` continuam aceitos e sao normalizados para `DIP` e `DOI`.

## Entregas

- `app-equipe.html?mvp=CODIGO` seleciona o instrumento correto.
- Painel, Charlie, documentos, workspace e papeis apontam para paginas proprias do modulo.
- O DAJ preserva o menu operacional completo.
- Outros modulos exibem apenas os destinos compartilhados necessarios.
- Cada formulario oferece somente perfis compativeis com o modulo.
- A matriz de backend continua sendo a autoridade final, independentemente do frontend.
- O DIC permite solicitacao pessoal, mas nao revela o diretorio interno ao perfil `cidadao`.
- O cadastro local antigo nao e mais acionado pela pagina compartilhada.

## Validacao

- Commit tecnico: `7bb6c3a`.
- Worker: `0e88eb11-0aea-41ea-96b9-fad866073b3e`.
- Release: `governanca-1.15.0-modular-team-directory-1.0`.
- CI completa aprovada.
- Matriz de autenticacao aprovada nos 14 modulos.
- Regra social aprovada em sequencia `201/200/403`: solicitar, consultar pedido proprio e bloquear diretorio interno.
- Todos os 71 destinos declarados no cliente existem no repositorio.
- Quatorze codigos canonicos e dois aliases responderam HTTP 200 em producao.
- Health de producao retornou `ready`.

## Seguranca

- Nenhum perfil, DAJ, arquivo, memoria ou evento de agenda foi criado no smoke de producao.
- O cliente nao usa `localStorage` nem HTML dinamico para dados do diretorio.
- A API permanece autenticada e limitada por modulo.
- O DIC aplica minimizacao adicional de identidade.
- A aprovacao cadastral continua separada da politica efetiva de permissao do login.

## Proximos pacotes

1. Remover o bloco local de equipe que permanece inativo no `script.js` compartilhado.
2. Fazer aceite visual autenticado em DAJ, DIC, DPJ, DEJI e DGE.
3. Criar ativacao de acesso governada com revogacao verificavel, sem transformar aprovacao cadastral em privilegio silencioso.
4. Integrar convite ou aviso interno com trilha, sem enviar segredo por e-mail.
5. Consolidar painel administrativo transversal e relatorio de auditoria para parceiros.

## Rollback

- Restaurar o Worker `a6cf6009-c361-456e-9138-562025a47662` para voltar a 1.14.0.
- Preservar todos os KVs.
- O componente modular e aditivo e nao requer migracao reversa de dados.
- O cache PWA anterior e `jus9-pwa-v35-2026-07-14-team-directory`.
