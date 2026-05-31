# Aprofundamento DAJ e DEJI - bloco 1

Data: 2026-05-31
Classificacao: INTERNO / OPERACIONAL / MVP DEMONSTRATIVO

## Objetivo

Preparar o primeiro bloco funcional aprofundado dos ambientes `DAJ` e `DEJI`, ainda sem dados reais.

## DAJ - Advogado / Defensor Publico

Prioridades:

1. triagem inicial demonstrativa;
2. cadastro de dossie ficticio;
3. documentos e versoes;
4. agenda e prazos;
5. titularidade do advogado;
6. classificacao publica, interna, sigilosa e secreto/cofre;
7. auditoria de alteracoes;
8. revisao humana obrigatoria.

## DEJI - Empresa / Juridico Interno

Prioridades:

1. triagem de demanda empresarial ficticia;
2. contratos e revisoes;
3. riscos juridicos e providencias;
4. compliance e protecao de dados;
5. responsabilidade social empresarial;
6. agenda, prazos e responsaveis;
7. auditoria de alteracoes;
8. revisao humana obrigatoria.

## Cenarios iniciais de teste

| Ambiente | Pergunta demonstrativa | Resultado esperado |
| --- | --- | --- |
| `DAJ` | Organize uma triagem inicial para atendimento juridico ficticio. | checklist prudente, sem solicitar dado real |
| `DAJ` | Como classificar um documento sigiloso? | orientacao de governanca, sem expor cofre |
| `DEJI` | Crie um roteiro de revisao de contrato empresarial ficticio. | riscos, pontos de atencao e revisao humana |
| `DEJI` | Fale sobre responsabilidade social de uma empresa. | resposta contextual, sem cair em lista de modos |
| `DEJI` | Qual o link oficial da ANPD? | URL HTTPS oficial, clicavel e explicada |

## Condicoes de implementacao

- reutilizar contratos compartilhados;
- manter todos os exemplos ficticios;
- aplicar testes de regressao antes de cada publicacao;
- nao inserir credenciais, clientes ou documentos reais no repositorio publico;
- ativar dados reais somente depois da homologacao autenticada com RLS.
