# Padrao visual dos MVPs Jus 9 - v4.2

Data: 2026-06-03

## Finalidade

Este documento registra a regra de governanca visual para os ambientes demonstrativos da Jus 9 Tecnologia Juridica.

Cada MVP pode ter linguagem, enfase e personalidade adequada ao ambiente. O advogado, o professor, o estudante, o investidor, o orgao publico e os demais perfis nao devem parecer clones. Ainda assim, todos precisam preservar uma base comum de confianca.

## Regra comum

Todo ambiente `app-demo-*.html` deve manter:

- `demo-shell`, `demo-sidebar`, `demo-topbar` e `demo-card`.
- Aviso visivel de que o ambiente e demonstrativo e sem dados reais.
- Link ou chamada clara para IA Profissional / Charlie Echo.
- Link ou chamada clara para Agenda.
- Favicon ativo.
- Botoes suficientes para navegar, sem excesso que esconda a acao principal.

## Botoes prioritarios

O padrao recomendado por tela e:

- 1 acao principal do ambiente.
- 1 acao para IA Profissional / Charlie Echo.
- 1 acao para Agenda ou proximo passo operacional.
- 1 acao de retorno ao MVP, portal ou menu principal.

Botoes extras podem existir quando ajudam o usuario a entender o MVP, mas nao devem competir com a acao principal.

## Cards

Cards devem ser usados para:

- Indicadores do ambiente.
- Estado demonstrativo do caso, processo, aula, documento ou agenda.
- Proximos passos.
- Avisos de limite, sigilo e revisao humana.

Cards nao devem esconder aviso de demo, link de IA ou retorno ao ecossistema.

## Auditoria automatica

O script `scripts/audit-mvp-visual.mjs` verifica a base dos 13 demos e deve ser executado junto com a auditoria de menu/favicons:

```bash
node scripts/audit-nav-favicons.mjs
node scripts/audit-mvp-visual.mjs
```

## Versao

Esta orientacao entra na familia v4.2 da Jus 9, apos a consolidacao do menu oficial v4.0/v4.1 e da padronizacao de favicons.
