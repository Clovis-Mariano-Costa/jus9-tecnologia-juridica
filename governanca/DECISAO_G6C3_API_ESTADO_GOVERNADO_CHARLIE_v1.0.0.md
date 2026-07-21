---
id: GOV-CHARLIE-DECISAO-G6C3-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: implementado-em-validacao
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Decisao G6C3 - API publica de estado governado da Charlie

## Decisao

Expor `GET /api/governance/charlie/capabilities` como leitura publica A0, minimizada e sem credenciais. A rota torna verificaveis as portas de autoridade da Charlie sem transformar prontidao tecnica em autorizacao juridica ou institucional.

## Conteudo permitido

- versoes do schema, da politica e da release;
- principios de default deny e revisao humana;
- grupos de permissoes granulares G6C2;
- estado resumido de DataJud, PDPJ e do contato institucional com o CNJ;
- efeitos explicitamente bloqueados;
- caminhos das evidencias publicas versionadas.

## Controles

- somente `GET`; qualquer escrita retorna `405`;
- `Cache-Control: no-store`;
- identificador aleatorio por requisicao em `X-Jus9-Request-Id`;
- nenhum token, e-mail, CPF, sessao, segredo, valor de credencial ou dado processual;
- DataJud permanece somente leitura por numero CNJ;
- PDPJ permanece `READINESS_ONLY`;
- o CNJ segue sem resposta e silencio nao autoriza conexao, homologacao ou efeito.

## Rollback

Remover a rota e o import do modulo compartilhado. Nenhum dado persistente, permissao ou conector e alterado por esse rollback.

## Porta seguinte

Observar G6C2 ate completar 72 horas. Remover permissoes legadas somente por nova decisao humana. Conferir o canal institucional do CNJ em 22/07/2026 as 10h, sem envio automatico.
