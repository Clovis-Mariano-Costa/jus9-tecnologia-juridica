# Pendência — links dos cards MVPs / Demos

**Data:** 2026-05-23  
**Classificação:** INTERNO / CARTÓRIO INTELIGENTE / PROGRAMAÇÃO  
**Repositório:** `jus9-tecnologia-juridica`

## Diagnóstico

Na página pública:

`https://jus9tecnologia.com.br/mvp#demos-jus9`

os cards dos demos ainda apontam para páginas genéricas ou transversais, como:

- `app-perfis.html`
- `app-workspace.html`
- `app-processos.html`
- `app-documentos.html`
- `pontes-e-parcerias.html`
- `central-tecnica.html`

Isso faz parecer que todos os demos levam para o mesmo ambiente, especialmente nos perfis que usam `app-perfis.html`.

## Correção recomendada

Atualizar `mvp.html` para os links abaixo:

| Demo | Perfil | Destino correto |
|---|---|---|
| 1 | Advogado / Defensor Público | `app-demo-advogar.html` ou futura `demo-01-advogado-defensor.html` |
| 2 | Professor / Academia | `demo-02-professor.html` |
| 3 | Estudante | futura `demo-03-estudante.html` |
| 4 | Cidadão / Interessado | futura `demo-04-cidadao-interessado.html` |
| 5 | Perito Judicial | `demo-05-perito-judicial.html` |
| 6 | Investidor / Parceiro | futura `demo-06-investidor-parceiro.html` |
| 7 | Escritório Jurídico | `demo-07-escritorio-juridico.html` |
| 8 | Empresa / Jurídico Interno | `demo-08-empresa-juridico-interno.html` |
| 9 | Órgão Público / Instituição | futura `demo-09-orgao-publico-instituicao.html` |
| 10 | Administrador Jus 9 | futura `demo-10-administrador-jus9.html` |
| 11 | Juiz / Magistrado | `demo-11-juiz-magistrado.html` |
| 12 | Promotor / Ministério Público | `demo-12-promotor-ministerio-publico.html` |
| 13 | Delegado / Autoridade Policial | `demo-13-delegado-autoridade-policial.html` |

## Prioridade

1. Criar as páginas faltantes dos Demos 3, 4, 6, 9 e 10.
2. Atualizar os links em `mvp.html`.
3. Testar no site público cada botão `Acessar Demo`.

## Observação

A correção deve preservar o Worker, CSS, DNS e rotas já estabilizadas.
