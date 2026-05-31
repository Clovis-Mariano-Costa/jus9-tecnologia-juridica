# Relatorio de auditoria dos perfis dos 13 MVPs

Data: 2026-05-31
Classificacao: INTERNO / OPERACIONAL / MVP DEMONSTRATIVO

## Resultado

Foram verificados os 13 ambientes demonstrativos publicados no portal principal da Jus 9 Tecnologia Juridica.

Todos possuem:

- pagina de entrada do painel;
- pagina de perfis correspondente;
- codigo de dossie adaptado;
- e-mail demonstrativo;
- subperfis adequados ao ambiente;
- aviso de que o MVP nao concede permissao real e nao deve receber dados reais.

## Catalogo canonico criado

O arquivo `data-publica/mvp-perfis.json` passa a concentrar o contrato publico dos perfis demonstrativos.

| Demo | Ambiente | Dossie | Pagina de perfis |
| --- | --- | --- | --- |
| 1 | Advogado / Defensor Publico | `DAJ` | `app-perfis.html` |
| 2 | Professor / Academia | `DAA` | `app-perfis-professor.html` |
| 3 | Estudante | `DEJ` | `app-perfis-estudante.html` |
| 4 | Cidadao / Interessado | `DIC` | `app-perfis-cidadao.html` |
| 5 | Perito Judicial | `DPJ` | `app-perfis-perito.html` |
| 6 | Investidor / Parceiro | `DIP` | `app-perfis-investidor.html` |
| 7 | Escritorio Juridico | `DEE` | `app-perfis-escritorio.html` |
| 8 | Empresa / Juridico Interno | `DEJI` | `app-perfis-empresa.html` |
| 9 | Orgao Publico / Instituicao | `DOI` | `app-perfis-orgao-publico.html` |
| 10 | Administrador Jus 9 | `DGE` | `app-perfis-administrador.html` |
| 11 | Juiz / Magistrado | `DMG` | `app-perfis-juiz.html` |
| 12 | Promotor / Ministerio Publico | `DMP` | `app-perfis-promotor.html` |
| 13 | Delegado / Autoridade Policial | `DAP` | `app-perfis-delegado.html` |

## Compatibilidade

- `INV` permanece aceito como alias legado de `DIP`.
- `ORG` permanece aceito como alias legado de `DOI`.
- O backend passa a derivar os tipos de dossie do catalogo canonico.
- A migracao `database/migrations/004_expand_user_profiles.sql` completa o enum de perfis do esquema inicial.

## Repertorio MVP legado verificado

O repertorio separado `mvp-jus9-tecnologia-juridica` tambem foi verificado. Ele preserva uma taxonomia historica mais ampla, com perfis academicos detalhados como Mestre, Doutor e Grupo de Estudantes, alem dos perfis juridicos e institucionais.

Para a publicacao principal em `jus9tecnologia.com.br`, o catalogo canonico desta etapa permanece organizado nos 13 ambientes demonstrativos. Os subperfis academicos detalhados ficam preservados dentro do DAA e do DEJ, sem perda de informacao.

## Limites antes de producao

O catalogo nao ativa permissao real. Antes de dados reais, ainda sao obrigatorios autenticacao, autorizacao, RLS, titularidade, auditoria, revisao humana e politica especifica para secreto/cofre.
