# Checklist de Testes — MVP / Demos / Functions

Data: 2026-05-23  
Projeto: Jus 9 Tecnologia Juridica  
Escopo: testes manuais de publicacao, rotas, demos e Functions.

## 1. Site principal

- [ ] Abrir https://jus9tecnologia.com.br/
- [ ] Confirmar status 200 OK
- [ ] Confirmar CSS aplicado
- [ ] Confirmar acentos corretos
- [ ] Confirmar que https://www.jus9tecnologia.com.br/ redireciona para https://jus9tecnologia.com.br/

## 2. MVP

- [ ] Abrir https://jus9tecnologia.com.br/mvp
- [ ] Abrir https://jus9tecnologia.com.br/mvp.html
- [ ] Confirmar Login MVP v0.3
- [ ] Confirmar botao Entrar com Google
- [ ] Confirmar secao Demo 1 a Demo 13
- [ ] Confirmar que a ancora #demos-jus9 funciona

## 3. Demos

- [ ] Demo 1 abre demo-01-advogado-defensor.html
- [ ] Demo 2 abre demo-02-professor.html
- [ ] Demo 3 abre demo-03-estudante.html
- [ ] Demo 4 abre demo-04-cidadao-interessado.html
- [ ] Demo 5 abre demo-05-perito-judicial.html
- [ ] Demo 6 abre demo-06-investidor-parceiro.html
- [ ] Demo 7 abre demo-07-escritorio-juridico.html
- [ ] Demo 8 abre demo-08-empresa-juridico-interno.html
- [ ] Demo 9 abre demo-09-orgao-publico-instituicao.html
- [ ] Demo 10 abre demo-10-administrador-jus9.html
- [ ] Demo 11 abre demo-11-juiz-magistrado.html
- [ ] Demo 12 abre demo-12-promotor-ministerio-publico.html
- [ ] Demo 13 abre demo-13-delegado-autoridade-policial.html

## 4. Login demonstrativo

Senha demo: Jus9MVP#2026

- [ ] demo@jus9tecnologia.com.br redireciona para Demo 1
- [ ] demo1@jus9tecnologia.com.br redireciona para Demo 1
- [ ] demo2@jus9tecnologia.com.br redireciona para Demo 2
- [ ] demo3@jus9tecnologia.com.br redireciona para Demo 3
- [ ] demo4@jus9tecnologia.com.br redireciona para Demo 4
- [ ] demo5@jus9tecnologia.com.br redireciona para Demo 5
- [ ] demo6@jus9tecnologia.com.br redireciona para Demo 6
- [ ] demo7@jus9tecnologia.com.br redireciona para Demo 7
- [ ] demo8@jus9tecnologia.com.br redireciona para Demo 8
- [ ] demo9@jus9tecnologia.com.br redireciona para Demo 9
- [ ] demo10@jus9tecnologia.com.br redireciona para Demo 10
- [ ] demo11@jus9tecnologia.com.br redireciona para Demo 11
- [ ] demo12@jus9tecnologia.com.br redireciona para Demo 12
- [ ] demo13@jus9tecnologia.com.br redireciona para Demo 13

## 5. Cloudflare Pages Functions

Rotas que nao devem retornar 404 depois da publicacao correta das Functions:

- [ ] https://jus9tecnologia.com.br/auth/google/start
- [ ] https://jus9tecnologia.com.br/auth/google/callback
- [ ] https://jus9tecnologia.com.br/api/auth/me
- [ ] https://jus9tecnologia.com.br/auth/logout

Resultado esperado antes das variaveis OAuth:

- [ ] /auth/google/start retorna resposta segura de preparacao, possivelmente 501
- [ ] /api/auth/me retorna JSON de nao autenticado, possivelmente 401

## 6. Investimentos

- [ ] Abrir https://investimentos.jus9tecnologia.com.br/
- [ ] Confirmar link para MVPs / Demos
- [ ] Abrir https://investimentos.jus9tecnologia.com.br/web-summit
- [ ] Confirmar que o botao de MVPs aponta para https://jus9tecnologia.com.br/mvp.html#demos-jus9

## 7. Observacoes

- Nao inserir dados reais durante os testes.
- Nao mexer em DNS sem motivo.
- Nao reescrever login antes de resolver a publicacao das Functions.
- Nao alterar Worker/CSS/assets ja estabilizados sem nova necessidade tecnica.
