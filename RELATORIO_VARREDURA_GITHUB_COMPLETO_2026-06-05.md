# Relatorio - Varredura GitHub completo Jus 9

Data: 2026-06-05  
Responsavel tecnico: Charlie Fox da Costa / Codex  
Escopo: repositorios locais em `C:\Users\aeonp\Documents\GitHub`

## Sintese

A varredura encontrou os repositorios locais em `main` e sem pendencias de worktree antes das correcoes deste pacote.

Foram encontrados dois pontos relevantes:

1. O auditor de navegacao/favicons do portal principal ainda tratava o botao restaurado `Acompanhe os MVPs / Demos` como item antigo/removido.
2. A regressao publica da Charlie Echo falhou no caso `modos`, indicando que a resposta publica ainda podia oscilar e deixar de mencionar identidade matriz, especialista de MVP, curadoria de links confiaveis e governanca.

## Correcoes executadas

### Portal principal Jus 9

Arquivo ajustado:

- `scripts/audit-nav-favicons.mjs`

Alteracoes:

- removida a regra antiga que proibia o CTA `Acompanhe os MVPs / Demos`;
- removida a regra antiga que proibia o rotulo `MVPs / Demos` quando usado como CTA;
- adicionada verificacao positiva exigindo que `index.html` mantenha o CTA `Acompanhe os MVPs / Demos` apontando para `mvp.html#demos-jus9`;
- mantidas as protecoes contra retorno de `Investidores` no menu principal e `Equipe` apontando para `equipe.html`.

Verificacao:

- `node scripts/audit-nav-favicons.mjs` passou com 143 HTMLs verificados.

### Charlie Echo

Arquivo ajustado:

- `functions/api/ia.js`

Alteracoes:

- criada deteccao canonica para perguntas explicitas sobre modos;
- adicionada resposta estavel para `Quais sao seus modos?`, preservando identidade matriz, especialista de MVP, social, governanca, curadoria de links/downloads e mediacao multilingue;
- o ajuste nao altera Constituicao, DNA, Prioritario ou clausulas petreas; e governanca operacional de resposta publica.

Verificacao:

- `node --check functions/api/ia.js` passou.
- `node tests/charlie-echo-public-regression.mjs` passou depois do push/deploy refletido na API publica.
- A falha antiga em `modos` foi corrigida e validada ao vivo.

### Teste estatico da Charlie Echo

Arquivo ajustado:

- `tests/charlie-echo-public-regression.mjs`

Alteracao:

- o teste `cockpit profissional API-first` foi atualizado para reconhecer a chamada atual da API com memoria de sala (`getActiveRoom('prof')`), sem voltar ao padrao antigo sem sala.

Verificacao:

- `CHARLIE_ECHO_REGRESSION_OK` passou.

## Commits publicados

Portal principal:

- `e26d1c2 chore: registrar varredura GitHub completa`

Charlie Echo:

- `447c1af fix: estabilizar resposta de modos da Charlie Echo`
- `d69d65e test: reconhecer cockpit profissional com memoria de sala`

## Verificacao final ampla

No portal principal, `node scripts/run-local-ci.mjs` passou integralmente:

- portal publico e 13 MVPs;
- Charlie Echo portal publico;
- matriz RLS;
- estrutura SQL de RLS;
- pacote SQL de homologacao ficticia;
- autenticacao do Worker;
- backend local fail closed;
- Charlie Echo publica ao vivo;
- paginas publicas de instalacao;
- QR codes publicos.

## Proximos passos sugeridos

1. Criar um auditor dedicado para todos os modulos da Charlie Echo, cobrindo: memoria curta, salas, renomear/arquivar/excluir, OCR/anexos, downloads PDF, links externos confiaveis, pesquisa juridica guiada e apresentacao por ambiente.
2. Criar uma pagina de matriz de MVPs pronta para evento, com status por modulo: pronto, demonstrativo, em revisao, pendente de backend.
3. Evoluir pesquisa de doutrina/jurisprudencia em duas camadas: orientacao segura sem backend e, futuramente, busca real via backend com fontes oficiais.
4. Criar uma auditoria recorrente de menus/favicons por subdominio, para detectar quando itens removidos reaparecem por cache, template antigo ou duplicacao de arquivo.
5. Preparar um checklist curto de demo presencial: roteiro, links, fallback offline, QR codes, responsavel humano e limite de uso demonstrativo.

## Recomendacao de governanca

Nao vejo necessidade imediata de mexer em Constituicao, DNA, Prioritario ou clausulas petreas para estes achados. O que falta agora e governanca operacional de qualidade: testes, auditores e checklist de deploy por modulo.
