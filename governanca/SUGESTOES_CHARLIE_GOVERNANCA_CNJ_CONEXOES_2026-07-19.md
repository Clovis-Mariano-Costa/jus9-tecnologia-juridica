---
id: GOV-CHARLIE-SUGESTOES-CNJ-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: backlog-governado
classificacao: INTERNO
hash: nao-aplicavel-backlog
---

# Sugestoes focadas - Charlie, governanca, CNJ e conexoes

## Prioridade imediata

1. Corrigir o fixture que misturou documentos e processo ficticio; adicionar teste que rejeite delimitadores de tabela ou numero CNJ no campo de documentos quando vierem de erro de template.
2. Exibir no chat um selo de proveniencia: `Charlie upstream`, `resposta corrigida` ou `fallback governado do Worker`.
3. No feedback, persistir resumo curto, `analysisId`, `auditId`, origem e hash; evitar cortar o laudo no meio de uma secao.
4. Registrar o aceite humano como `SATISFATORIO_COM_RESSALVAS`, separado da conclusao da reversibilidade.

## Charlie e governanca

- Unificar policy engine, registry e contratos em middleware unico para entrada, saida e auditoria.
- Tornar classificacao e risco enums versionados; rejeitar valores livres.
- Exigir citacao verificavel para afirmacao juridica externa e permitir ausencia de citacao quando a resposta apenas resume o cadastro governado.
- Medir taxa de fallback, motivo da rejeicao upstream, latencia e revisoes humanas.
- Criar teste de caos: timeout, resposta vazia, fonte inventada, endpoint indevido e indisponibilidade do conector.

## CNJ, DataJud e PDPJ-Br

- Manter DataJud publico estritamente read-only e orientado ao numero CNJ.
- Versionar allowlist de tribunais e mapeamento de aliases; nao aceitar endpoint fornecido pelo usuario.
- Guardar apenas hash da consulta e metadados operacionais necessarios no log.
- Fazer revisao formal do Termo de Uso antes de ampliar cache, volume ou demonstracao publica.
- Tratar PDPJ-Br como integracao institucional: SSO, perfis, lotacoes, Gateway e Discovery dependem de autorizacao e ambiente de homologacao.
- Nao confundir API Publica do DataJud com APIs autenticadas da PDPJ-Br ou servicos negociais restritos.

## Demais conexoes

- Criar inventario unico com estados `desligado`, `readiness`, `homologacao`, `ativo` e `revogado`.
- Padronizar circuit breaker, timeout, backoff, idempotency key e correlation ID.
- Separar leitura, escrita e compartilhamento em escopos distintos.
- Manter Drive e memoria real bloqueados ate G0; quando liberados, iniciar com pasta isolada, dados ficticios e exclusao comprovavel.
- Criar painel operacional somente com metadados nao sensiveis: saude, ultima verificacao, ambiente, versao e dono do conector.

## Fora deste chat

- evolucao funcional e prova dos demais MVPs;
- ranking, vitrine, marketing ou expansao de personas;
- video e ZIP geral da submissao, salvo quando afetarem diretamente a evidencia tecnica da Charlie ou das conexoes.
