# Menu oficial Jus 9 v4.0

Classificacao: PUBLICO / GOVERNANCA DE INTERFACE
Data: 2026-06-04
Repositorio de referencia: `jus9-tecnologia-juridica`

## Objetivo

Registrar o menu publico oficial da Jus 9 Tecnologia Juridica para evitar regressao visual, retorno de botoes antigos e divergencia entre paginas do ecossistema.

## Menu principal superior

O menu principal superior do portal Jus 9 deve usar, como referencia, os seguintes itens:

1. Investimentos -> `https://investimentos.jus9tecnologia.com.br/`
2. Livros e Doutrina -> `https://livros.jus9tecnologia.com.br/`
3. Universidade do Futuro -> `https://universidadedofuturo.jus9tecnologia.com.br/`
4. Instalar App -> `/instalar-app`
5. Seguranca & Sigilo -> `#seguranca`
6. Fundador -> `#fundador`
7. IA Publica -> `ia-juridica.html`
8. Charlie Echo -> `https://charlieecho.jus9tecnologia.com.br/ia-profissional/`
9. Nossa Historia -> `nossa-historia.html`
10. Marca -> `marca.html`
11. Mais Direito -> `mais-direito.html`
12. Equipe -> `https://equipe.jus9tecnologia.com.br/`
13. Comunidade -> `comunidade.html`
14. Pontes -> `pontes-e-parcerias.html`
15. Contato -> `#contato`
16. Privacidade -> `politica-de-privacidade.html`
17. Jus9 Verde -> `jus9-verde.html`
18. Pre-cadastro MVP -> `lider-mvp.html`

## Itens removidos do menu principal

Estes itens nao devem voltar ao menu principal superior:

1. Ecossistema
2. MVPs / Demos
3. Investidores
4. Jus 9 Jornada
5. Visao de Futuro
6. Acompanhe os MVPs / Demos

Observacao: paginas de MVP continuam existindo. O que foi removido foi o rotulo antigo do menu principal e de CTAs institucionais que confundiam a navegacao.

## Regras de link

1. `Equipe` deve apontar para `https://equipe.jus9tecnologia.com.br/`.
2. `Livros e Doutrina` deve apontar para `https://livros.jus9tecnologia.com.br/`.
3. `Universidade do Futuro` deve apontar para `https://universidadedofuturo.jus9tecnologia.com.br/`.
4. `Charlie Echo` deve apontar preferencialmente para `https://charlieecho.jus9tecnologia.com.br/ia-profissional/`.
5. Evitar `www.jus9tecnologia.com.br` em links internos do portal principal, salvo quando houver decisao tecnica expressa.

## Favicons

Toda pagina HTML completa publicada deve possuir favicon.

Fragmentos HTML sem `<head>`, trechos de insercao e arquivos parciais nao precisam receber favicon.

## Auditoria

Executar:

```bash
node scripts/audit-nav-favicons.mjs
```

O auditor deve ser usado antes de publicar alteracoes de menu, cabecalho, rodape, paginas publicas ou novos MVPs.
