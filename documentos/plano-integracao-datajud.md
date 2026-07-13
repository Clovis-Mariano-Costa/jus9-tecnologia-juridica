<!--
Jus 9 Tecnologia Jurídica
Repositório: jus9-tecnologia-juridica
Software livre com autoria preservada.
Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © **Jus 9 Tecnologia Jurídica**. Direitos autorais da produção reservados.
A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
Referência oficial: https://www.jus9tecnologia.com.br/
E-mail de contato: Contato@jus9tecnologia.com.br
DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
-->

# Plano de Integração DataJud/CNJ — Jus 9

## Objetivo

Consultar metadados processuais e movimentos públicos para vincular ao DAJ.

## Princípio

A consulta processual mostra o processo por fora. O DAJ mostra o caso por dentro.

## Chaves de pesquisa governadas

- Numero CNJ: consulta principal suportada pela API Publica DataJud/CNJ, com retorno de metadados publicos.
- Nome da parte: chave aceita pela interface Jus 9, mas nao deve ser enviada ao DataJud publico como se houvesse suporte documentado a dados de partes. Exige conector autorizado do tribunal/parceiro, finalidade legitima, minimizacao e auditoria.
- CPF: chave aceita pela interface Jus 9 apenas como dado pessoal processual controlado. A resposta deve mascarar o CPF, nao registrar o documento inteiro em log/memoria permanente e exigir conector autorizado.
- Quando nao houver conector autorizado para nome/CPF, a Charlie Echo deve declarar a limitacao e orientar conferencia no tribunal competente, sem inventar resultado.

## Etapas

1. Identificar tribunal pelo número CNJ.
2. Selecionar fonte:
   - DataJud/CNJ;
   - consulta pública do tribunal;
   - integração parceira;
   - consulta manual.
3. Consultar movimentos.
4. Salvar resposta bruta quando permitido.
5. Gerar movimento interno no DAJ.
6. Criar prazo quando houver intimação.
7. Respeitar sigilo, atraso de atualização e disponibilidade por tribunal.

## Tribunais

- Tribunais estaduais: TJAC a TJTO.
- Federais: TRF1 a TRF6.
- Superiores: STF, STJ, TST, TSE, STM.
- TNU quando aplicável.
