---
id: JUS9-BUILD-WEEK-EVIDENCIA-CODEX-SOL-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: ativo-controlado
classificacao: PUBLICO-SANITIZADO
hash: d2cfd341b2ad8c4e95e47977f4a90bd3b023cde50977efd345d08d51904a54b9
---

# Evidencia sanitizada do Codex Sol - OpenAI Build Week 2026

## Conclusao verificavel

Os metadados locais da tarefa principal do Codex registram o modelo `gpt-5.6-sol` durante o periodo da OpenAI Build Week. A configuracao foi aplicada em 13/07/2026 as 18:37:59 BRT, depois do marco oficial de 13/07/2026 as 13:00 BRT. O primeiro contexto ativo com esse modelo ocorreu as 18:40:30 BRT.

Esta evidencia comprova o modelo usado na **sessao de desenvolvimento Codex**. Ela nao comprova nem afirma que `gpt-5.6-sol` ou GPT-5.6 seja o modelo implantado no runtime publico da Charlie Echo.

## Linha do tempo

| Evento | America/Sao_Paulo | UTC | Evidencia privada correspondente |
|---|---|---|---|
| Configuracao `gpt-5.6-sol` aplicada | 2026-07-13 18:37:59.601 -03:00 | 2026-07-13 21:37:59.601Z | Registro de configuracao da tarefa |
| Primeiro contexto ativo com o modelo | 2026-07-13 18:40:30.661 -03:00 | 2026-07-13 21:40:30.661Z | Registro `turn_context` |
| Primeira chamada de ferramenta no contexto | 2026-07-13 18:40:53.499 -03:00 | 2026-07-13 21:40:53.499Z | Registro de chamada de ferramenta |
| Primeira edicao de codigo no contexto | 2026-07-13 18:53:47.778 -03:00 | 2026-07-13 21:53:47.778Z | Edicao do Worker, health e controles de token |
| Primeiro commit posterior a ativacao | 2026-07-13 19:02:05 -03:00 | 2026-07-13 22:02:05Z | Commit `cfd7c79` - governanca e homologacao DAJ |

No snapshot de verificacao de 19/07/2026, a tarefa continha 33 contextos registrados com `gpt-5.6-sol`. Essa contagem e apenas um retrato temporal; os marcos acima permanecem fixos.

## Integridade e privacidade

O identificador integral da tarefa e o arquivo local de sessao foram preservados fora do repositorio publico. O fundador confirmou o recebimento privado em 19/07/2026.

- SHA-256 do identificador privado da tarefa: `ce81b54fedefc9b4309cc4070b8899f5ffe2478d09b599fec51df73e7d24d315`.
- String canonica usada no lacre: `gpt-5.6-sol|2026-07-13T21:37:59.601Z|2026-07-13T21:40:30.661Z|2026-07-13T21:53:47.778Z|cfd7c79|2026-07-13T19:02:05-03:00`.
- SHA-256 da string canonica: `d2cfd341b2ad8c4e95e47977f4a90bd3b023cde50977efd345d08d51904a54b9`.

Um avaliador autorizado pode conferir a evidencia privada calculando o SHA-256 do identificador recebido, localizando os eventos pelos timestamps UTC e reproduzindo o hash da string canonica. O identificador integral nao deve aparecer no repositorio, na pagina publica, no video ou no texto publico da submissao.

## Limite da alegacao

| Alegacao | Estado |
|---|---|
| Codex colaborou durante o periodo da Build Week | Verificado |
| A tarefa principal usou `gpt-5.6-sol` no desenvolvimento apos o inicio do evento | Verificado por metadados locais sanitizados |
| A API OpenAI existe no codigo da Charlie Echo | Verificado em fonte |
| Charlie Echo usa GPT-5.6 em producao | Nao verificado e nao alegado |
