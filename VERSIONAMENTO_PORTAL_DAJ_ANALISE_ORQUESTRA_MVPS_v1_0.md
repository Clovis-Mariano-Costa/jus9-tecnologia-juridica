# Versionamento - Portal DAJ Analise + Orquestra MVPs v1.0

Data: 2026-07-10
Classificacao: INTERNO / PORTAL / MVP DAJ
Repositorio: jus9-tecnologia-juridica

## Objetivo

Transformar o DAJ Advogados em modelo-mae operacional do portal, mantendo cada MVP como modulo independente da Charlie Echo.

## Entregas

- Botao "Enviar DAJ para analise da Charlie Echo" passou a montar prompt mais completo.
- O envio agora abre a IA profissional com `autorun=1`, para iniciar a analise automaticamente.
- O prompt do atendimento inicial pede relatorio DAJ, classificacao, Drive Saver e forma replicavel.
- O botao "Resumir DAJ" passou a pedir relatorio de analise DAJ mais completo.
- O painel dinamico de integracao ganhou contrato operacional generico para qualquer MVP sem contrato especializado.
- Versao do script nas telas DAJ atualizada para `20260710-daj-analysis-v1`.
- Cache PWA atualizado para `jus9-pwa-v11-2026-07-10-daj-analysis`.

## Regra de experiencia

O usuario nao deve precisar entender a governanca para receber uma boa resposta. A governanca deve aparecer como resultado organizado:

- relatorio;
- classificacao;
- Drive Saver quando cabivel;
- link publico somente quando permitido;
- revisao humana quando necessaria;
- proximo ato claro.

## Modelo replicavel

Cada MVP deve ter:

- dossie ativo;
- persona propria;
- workflow proprio;
- fontes proprias;
- politica de Drive;
- limites duros;
- prompts guiados;
- capacidade de sugerir melhoria normativa quando o usuario for equipe autenticada.

O DAJ e o primeiro instrumento completo da orquestra. Os demais MVPs recebem a mesma partitura e depois especializacao.

## Cronograma renovado do portal

1. DAJ completo: atendimento inicial, analise automatica, relatorio, Drive Saver e card de retorno.
2. Contratos minimos nos demais MVPs: usar fallback operacional ja implementado e revisar modulo por modulo.
3. Especializacao visual: painéis e prompts rapidos adequados a cada ambiente.
4. Auditoria e investidores: relatorios demonstrativos por MVP, com riscos e criterios de aceite.
5. Replicacao final: todos os MVPs com fluxo independente, mas governados pela mesma matriz.

## Validacao local

Comando executado:

```bash
node --check script.js
```

Resultado: sem erro de sintaxe.

