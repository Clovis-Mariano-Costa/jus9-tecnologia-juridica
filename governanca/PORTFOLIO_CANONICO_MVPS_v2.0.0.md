---
id: GOV-JUS9-PORTFOLIO-MVPS-002-HUMANO
versao: 2.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL / SEM DADOS REAIS
hash: calcular-na-release-aprovada
---

# Portfolio canonico dos MVPs Jus 9 - V2

## Regra do portfolio

O portfolio corrente possui 14 MVPs. DAJ e o piloto operacional com dados ficticios; dez MVPs sao demonstracoes publicas governadas; DMP, DAP e DMG sao demonstracoes publicas restritas de alta sensibilidade. Nenhum MVP recebe dado real, efeito juridico autonomo ou permissao produtiva por este documento.

A fonte estruturada e `governanca/PORTFOLIO_CANONICO_MVPS_v2.0.0.json`. A Pagina Equipe permanece sob responsabilidade de Mariana e do Codex dela; aqui existe apenas o contrato externo de identidade e autorizacao consumido pelos MVPs.

## Visao executiva

| MVP | Publico | Estado | Risco | Prova publica |
|---|---|---|---|---|
| DAJ | Advogado / Defensor Publico | Piloto operacional ficticio | Alto | `app-clientes.html#consulta-daj` |
| DAA | Professor / Academia | Demo governada | Moderado | `app-demo-professor.html#prova-daa` |
| DEJ | Estudante | Demo governada | Moderado | `app-demo-estudante.html#prova-dej` |
| DIC | Cidadao / Interessado | Demo governada | Alto | `app-demo-cidadao.html#prova-dic` |
| DPJ | Perito Judicial | Demo governada | Alto | `app-demo-perito.html#prova-dpj` |
| DIP | Investidor / Parceiro | Demo governada | Moderado | `app-demo-investidor.html#prova-dip` |
| DEE | Escritorio Juridico | Demo governada | Alto | `app-demo-escritorio.html#prova-dee` |
| DEJI | Empresa / Juridico Interno | Demo governada | Alto | `app-demo-empresa.html#prova-deji` |
| DOI | Orgao Publico / Instituicao | Demo governada | Alto | `app-demo-orgao-publico.html#prova-doi` |
| DGE | Administrador Jus 9 | Demo governada | Alto | `app-demo-administrador.html#prova-dge` |
| DMG | Juiz / Magistrado | Demo restrita | Critico | `app-demo-juiz.html#prova-dmg` |
| DMP | Promotor / Ministerio Publico | Demo restrita | Critico | `app-demo-promotor.html#prova-dmp` |
| DAP | Delegado / Autoridade Policial | Demo restrita | Critico | `app-demo-delegado.html#prova-dap` |
| DED | Autor / Editora / Autor-Editor | Demo governada | Moderado | `app-demo-autor-editor.html#prova-ded` |

## Padrao minimo comum

Todos os MVPs devem cumprir `MVP-IAM`, `MVP-SEC`, `MVP-LGPD`, `MVP-ETH`, `MVP-AI`, `MVP-AUD`, `MVP-DAT`, `MVP-UX`, `MVP-TST` e `MVP-OPS`. O JSON canonico registra a definicao verificavel e a referencia de cada requisito.

## Decisoes humanas necessarias

- designar Product Owner e responsavel tecnico por MVP;
- decidir se algum candidato entra no backlog canonico;
- aprovar qualquer uso de dado real, que exigira projeto e avaliacao proprios;
- aprovar homologacoes externas, contas institucionais e integracoes com efeito real;
- revisar formalmente a classificacao de risco antes de promocao produtiva.

Enquanto essas decisoes nao ocorrerem, os campos de responsavel permanecem `PENDENTE_DESIGNACAO_HUMANA` e os limites atuais prevalecem.

