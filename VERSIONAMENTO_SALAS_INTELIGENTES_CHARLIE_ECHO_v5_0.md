# Versionamento - Salas inteligentes Charlie Echo v5.0

Data: 05/06/2026

## Objetivo

Ensinar a Charlie Echo a organizar o que nasceu da conversa, nao apenas responder mensagens isoladas.

## Alteracoes

- Novo botao `Atualizar resumo`.
- Cada sala passa a manter `smartSummary`.
- Cada sala passa a manter `governanceClass`.
- Perguntas como `Onde paramos?`, `Resumo da sala` e `Qual o proximo passo?` usam o resumo executivo vivo.
- O PDF passa a incluir a secao `Resumo executivo`.
- O contexto enviado para a API inclui:
  - resumo simples;
  - resumo executivo;
  - classificacao de governanca;
  - mensagens recentes.

## Campos do resumo executivo

- Assunto principal.
- Ultima pergunta.
- Ultima resposta.
- Pendencias.
- Proximo passo sugerido.
- Governanca.

## Governanca

Classificacao local demonstrativa:

- `publico demonstrativo`;
- `interno demonstrativo - revisar antes de uso real`;
- `sensivel - exige revisao humana`.

## Limite

A inteligencia ainda usa memoria local de sessao. Persistencia real por usuario, dispositivo e datas permanece para pacote futuro.

