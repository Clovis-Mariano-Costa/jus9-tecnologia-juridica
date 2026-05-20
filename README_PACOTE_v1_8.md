# Correcao MVP - logins demonstrativos por perfil e link Equipe

## Correcoes

- Inclui caixa "Ver e-mails demo por MVP" na tela de acesso ao MVP.
- Cria logins `demo1` a `demo13`, um por perfil demonstrativo.
- Mantem a senha unica demonstrativa: `Jus9MVP#2026`.
- Registra que o primeiro cadastro real sera Cadastro Lider ate alteracao posterior.
- Reforca que DAJ e exclusivo de Advogado(a) ou Defensor(a) Publico(a).
- Reforca link Equipe no cabecalho da Jus 9.
- Prepara o botao "Entrar com Google" para a rota futura `/auth/google/start`.

## Acessos demo

| MVP / perfil | E-mail demo | Destino inicial |
| --- | --- | --- |
| Acesso principal | `demo@jus9tecnologia.com.br` | `app-demo-advogar.html` |
| Advogado / Defensor Publico | `demo1@jus9tecnologia.com.br` | `app-demo-advogar.html` |
| Professor / Academia | `demo2@jus9tecnologia.com.br` | `app-perfis.html` |
| Estudante | `demo3@jus9tecnologia.com.br` | `app-perfis.html` |
| Cidadao / Interessado | `demo4@jus9tecnologia.com.br` | `app-perfis.html` |
| Perito Judicial | `demo5@jus9tecnologia.com.br` | `app-perfis.html` |
| Investidor / Parceiro | `demo6@jus9tecnologia.com.br` | `pontes-e-parcerias.html` |
| Escritorio Juridico | `demo7@jus9tecnologia.com.br` | `app-workspace.html` |
| Empresa / Juridico Interno | `demo8@jus9tecnologia.com.br` | `app-documentos.html` |
| Orgao Publico / Instituicao | `demo9@jus9tecnologia.com.br` | `app-workspace.html` |
| Administrador Jus 9 | `demo10@jus9tecnologia.com.br` | `central-tecnica.html` |
| Juiz / Magistrado | `demo11@jus9tecnologia.com.br` | `app-processos.html` |
| Promotor / Ministerio Publico | `demo12@jus9tecnologia.com.br` | `app-processos.html` |
| Delegado / Autoridade Policial | `demo13@jus9tecnologia.com.br` | `app-documentos.html` |

## Link Equipe

Destino oficial:
`https://www.jus9tecnologia.com.br/equipe/`

## Observacao de seguranca

Os acessos demo sao publicos e demonstrativos. Nao representam login real, sessao segura, banco de dados, controle de acesso ou permissao de producao. Dados reais so devem entrar depois de backend seguro, autenticacao real, autorizacao por perfil, logs, armazenamento privado e revisao humana.
