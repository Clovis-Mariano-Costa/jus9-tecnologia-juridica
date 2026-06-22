# Decisoes pendentes do Fundador - Google OAuth Producao 1

Classificacao: INTERNO / DECISAO HUMANA / SEM SEGREDOS

## 1. Publico-alvo

- [ ] Acesso apenas para contas `@jus9tecnologia.com.br`.
- [ ] Acesso para contas externas por convite/allowlist.
- [ ] Acesso amplo para qualquer Conta Google.

Recomendacao: comecar por contas internas e allowlist.

## 2. Projeto Google Cloud

- [ ] Usar projeto atual para producao.
- [ ] Criar projeto separado de producao.

Recomendacao: criar projeto separado de producao.

## 3. Agenda Google

- [ ] Submeter Calendar ja no pacote Producao 1.
- [ ] Manter Calendar apenas para equipe/testadores por enquanto.
- [ ] Remover Calendar da submissao inicial e manter somente login basico.

Recomendacao: login basico primeiro; Calendar depois ou com grupo restrito.

## 4. Rotacao de segredo

- [ ] Rotacionar `GOOGLE_CLIENT_SECRET` antes da ampliacao.
- [ ] Rotacionar tambem `AUTH_COOKIE_SECRET`.
- [ ] Nao rotacionar agora.

Recomendacao: rotacionar `GOOGLE_CLIENT_SECRET` antes da ampliacao.

## 5. Drive e Gmail

- [ ] Nao incluir Drive/Gmail nesta fase.
- [ ] Preparar Drive em pacote separado.
- [ ] Preparar Gmail em pacote separado.

Recomendacao: nao incluir Drive/Gmail nesta fase.

## 6. Submissao ao Google

- [ ] Preparar material, mas nao submeter ainda.
- [ ] Submeter brand verification primeiro.
- [ ] Submeter brand + sensitive scope verification se Calendar entrar.

Recomendacao: preparar material e revisar com o Fundador antes de submeter.

