---
id: REL-GOV-CHARLIE-1.21.13
versao: 1.21.13
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: pronto-para-revisao
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Release v1.21.13 - Entrega final Build Week

## Resultado

Esta release integra a consolidacao dos 14 MVPs com a governanca G6C/G6C2 da Charlie e prepara a entrega privada aos juizes da OpenAI Build Week 2026.

## Alteracoes

- mantido um unico builder canonico, `scripts/build-portal-dist.mjs`, com 170 fontes publicas curadas e 175 assets processados;
- incorporadas permissoes granulares de memoria, revisao DAJ e efeitos no Drive, preservando menor privilegio, confirmacao e falha fechada;
- adicionados os auditores G6C e G6C2 ao CI integrado;
- pagina Build Week atualizada com teste de tres minutos, acesso privado dos juizes e estados separados para ZIP e video;
- versionamento publico elevado para 5.18 e cache PWA para `jus9-pwa-v53-2026-07-21-build-week-final`;
- manifesto Build Week elevado para 1.6.0;
- registrada a confirmacao do fundador sobre ChatGPT, Codex e API OpenAI como ferramentas exclusivas de IA na construcao produtiva do ecossistema ate 21/07/2026, sob autoria e revisao humanas.

## Limites preservados

- nenhuma credencial de juiz, token ou identificador privado e publicado no Git ou no portal;
- a afirmacao de ferramentas OpenAI nao implica patrocinio, parceria formal nem autoria OpenAI de Cloudflare, GitHub, Google, CNJ, bibliotecas, padroes ou fontes de terceiros;
- o runtime GPT-5.6 da Charlie continua nao comprovado e nao e declarado;
- silencio do CNJ nao autoriza integracao, homologacao ou efeito transacional;
- elegibilidade, direitos de ativos, gravacao/publicacao do video e submissao final permanecem gates humanos.

## Validacao prevista

- `npm clean-install`
- `npm test`
- `npx wrangler deploy --dry-run`
- Workers Builds remoto na branch de integracao
