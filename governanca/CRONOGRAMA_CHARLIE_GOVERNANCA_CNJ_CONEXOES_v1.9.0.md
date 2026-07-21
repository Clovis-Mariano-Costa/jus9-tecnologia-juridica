---
id: GOV-CHARLIE-CNJ-CONEXOES-001-9
versao: 1.9.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: execucao-controlada-g6c2-build-verde-aguardando-cnj
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.8.0.md
preserva_historico: true
---

# Cronograma executivo - Charlie, governanca, CNJ e conexoes v1.9.0

## Estado atual

G6C e o registro canonico estao documentados. G6C2 foi implementado no PR #3 e passou na suite local. Os PRs #2 e #3 falharam no mesmo check Cloudflare. Foi localizado um defeito reproduzivel: `wrangler.jsonc` exige `dist`, mas `dist/` era ignorado e inexistia no checkout limpo. A correcao gera os assets publicos antes do deploy remoto. O Workers Build `57af5b3e-0c41-4802-bcba-d331a0f3c940` confirmou `SUCCESS` no commit `b9a83c7`; o PR ficou limpo e apto a merge, sem merge automatico. O CNJ ainda nao respondeu; silencio nao autoriza conexao ou homologacao.

## Fila executavel

| Ordem | Janela | Acao | Porta de saida |
|---|---|---|---|
| 1 | 21/07 | Concluir testes e auditoria G6C2; versionar e publicar no PR #3. | Suite local verde e diff revisado. |
| 2 | 21/07 | Reexecutar Workers Build pelo novo commit e capturar o resultado. | `CONCLUIDO`: build verde no commit `b9a83c7`. |
| 3 | ate 23/07 | Manter observacao somente leitura da home, Pesquisa, Charlie, DAJ, health e PWA. | Registro de estabilidade, correcao ou rollback. |
| 4 | 22/07 as 10h | Conferir o canal usado no e-mail ao CNJ. | `CNJ_RESPONDEU` ou `CNJ_SEM_RESPOSTA`. |
| 5 | apos a conferencia | Confrontar resposta com o catalogo ou preparar reiteracao para aprovacao humana. | Matriz de aderencia ou minuta nao enviada. |
| 6 | apos build verde | Observar G6C2 por 72 horas sem remover permissoes legadas. | Evidencia de compatibilidade e falha fechada. |
| 7 | apos 72 horas | Decisao humana sobre remocao de fallbacks/permissoes legadas. | Nova decisao versionada ou manutencao do estado. |

## Bloqueios vinculantes

- Nenhum deploy manual enquanto a falha do Workers Build nao for compreendida.
- Nenhuma credencial, token ou log sensivel no repositorio.
- PDPJ permanece `READINESS_ONLY`; ciencia, peticionamento e MNI permanecem proibidos.
- DataJud continua somente leitura por numero CNJ; nome/CPF dependem de conector autorizado.
- Reiteracao ao CNJ depende de aprovacao humana e nao sera enviada automaticamente.

## Proxima acao unica

Publicar G6C2 no PR #3 com a suite integral verde e usar o novo check para obter evidencia do incidente Cloudflare.
