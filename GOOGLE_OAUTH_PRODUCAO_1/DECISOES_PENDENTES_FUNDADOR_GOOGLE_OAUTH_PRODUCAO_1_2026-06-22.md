# Decisoes do Fundador - Google OAuth Producao 1

Classificacao: INTERNO / DECISAO HUMANA / SEM SEGREDOS
Data: 2026-06-22
Autoridade: Fundador

## 1. Publico-alvo

- [x] Acesso amplo para qualquer Conta Google verificada.
- [x] Privilegios continuam separados por perfil governado.

Execucao: o login Google passa a aceitar conta Google verificada quando `AUTH_PUBLIC_GOOGLE_ENABLED=true`. Contas fora da allowlist entram com o perfil publico `cidadao`, por padrao, sem permissao de Agenda, auditoria, cofre ou operacao juridica.

Trava de seguranca: nesta fase, `cidadao` e o unico perfil publico aceito. Se `AUTH_PUBLIC_GOOGLE_PROFILE` receber perfil privilegiado por engano, o backend cai para `cidadao`.

Observacao do Fundador: deve haver nucleo de login separado, pois Equipe e diferente de MVP/MPP.

Execucao tecnica: a sessao passa a registrar `accessMode` e `authNucleus`. O nucleo e derivado do `return_to` autorizado, com exemplos como `equipe`, `mvp`, `agenda`, `laboratorio`, `universidade`, `ia_profissional` e `principal`.

## 2. Projeto Google Cloud

- [x] Criar projeto separado de producao se o projeto atual afetar seguranca.
- [x] Nao alterar o projeto de teste atual neste pacote.

Interpretacao de seguranca: como a politica oficial do Google exige separacao entre projetos de teste e producao para apps OAuth externos, a escolha operacional segura e preparar um projeto Google Cloud separado de producao. O projeto atual permanece como teste/homologacao ate revisao humana.

## 3. Agenda Google

- [x] Submeter Calendar ja no pacote Producao 1.
- [x] Manter Calendar como consentimento incremental separado do login basico.

Execucao: o escopo `https://www.googleapis.com/auth/calendar.events` continua somente no fluxo `/auth/google/calendar/start`. Apenas perfis com permissao `calendar:write` podem iniciar esse consentimento. O perfil publico `cidadao` fica bloqueado.

## 4. Rotacao de segredo

- [x] Rotacionar `GOOGLE_CLIENT_SECRET` antes da ampliacao.
- [ ] Rotacionar `AUTH_COOKIE_SECRET` somente com janela operacional definida.

Execucao: o runbook foi preparado sem publicar valores. Nenhum segredo real foi escrito no repositorio.

## 5. Drive e Gmail

- [x] Preparar Drive em pacote separado.
- [x] Preparar Gmail em pacote separado.
- [x] Nao incluir Drive/Gmail no pacote Producao 1.

Execucao: foram criados pacotes documentais separados para Drive e Gmail, sem ativar escopos e sem alterar codigo de producao.

## 6. Submissao ao Google

- [x] Preparar material, mas nao submeter ainda.
- [x] Revisar com o Fundador antes de qualquer submissao.
- [x] Se Calendar entrar, preparar brand verification e sensitive scope verification.

Execucao: este pacote deixa codigo, checklist e roteiro prontos para revisao. A submissao ao Google permanece uma acao humana posterior.

## 7. Variaveis de ambiente sem segredo

Valores reais devem ser configurados apenas no ambiente seguro:

- `AUTH_PUBLIC_GOOGLE_ENABLED=true`
- `AUTH_PUBLIC_GOOGLE_PROFILE=cidadao`
- `AUTH_ALLOWED_EMAILS=<somente contas privilegiadas e perfis governados>`
- `GOOGLE_CLIENT_ID=<client id do projeto de producao>`
- `GOOGLE_CLIENT_SECRET=<segredo rotacionado no ambiente seguro>`

## Limites preservados

- Nenhum segredo foi publicado.
- Nenhum escopo Drive ou Gmail foi adicionado.
- Nenhum escopo sensivel foi ampliado sem confirmacao do Fundador.
- Nenhuma submissao ao Google foi executada por Codex.
