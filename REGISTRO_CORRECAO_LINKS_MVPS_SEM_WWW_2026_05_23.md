# REGISTRO — Correção de links MVPs / Demos sem www

**Data:** 2026-05-23  
**Classificação:** INTERNO / CARTÓRIO INTELIGENTE / PROGRAMAÇÃO  
**Repositório:** `jus9-tecnologia-juridica`

## Motivo

A home voltou a carregar corretamente com CSS e assets, mas o botão **Acompanhe os MVPs / Demos** apontava para:

`https://www.jus9tecnologia.com.br/mvp#demos-jus9`

O domínio com `www` apresentou erro de redirecionamento em excesso. O domínio funcional confirmado é:

`https://jus9tecnologia.com.br/`

## Correção aplicada

Links de MVPs / Demos foram padronizados para:

`https://jus9tecnologia.com.br/mvp#demos-jus9`

## Arquivos alterados

- `app-agenda.html`
- `app-atendimento-inicial.html`
- `app-clientes.html`
- `app-cofre.html`
- `app-daj.html`
- `app-demo-advogar.html`
- `app-documentos.html`
- `app-gravacoes.html`
- `app-grupos.html`
- `app-ia-profissional.html`
- `app-perfis.html`
- `app-prazos.html`
- `app-processos.html`
- `app-retorno.html`
- `app-workspace.html`
- `arquitetura-sistema.html`
- `arquitetura-tecnica.html`
- `central-tecnica.html`
- `charlie-delta-da-costa.html`
- `comunidade.html`
- `consulta-publica.html`
- `creditos.html`
- `cronograma-final.html`
- `detetive-particular.html`
- `doutrina.html`
- `equipe.html`
- `guia-marca.html`
- `ia-juridica.html`
- `ia-profissional.html`
- `index.html`
- `jurisprudencia.html`
- `jus9-verde.html`
- `lider-mvp.html`
- `LOGIN_DEPLOY_CHECKLIST.md`
- `mais-direito.html`
- `manual-interno.html`
- `MAPA_LINKS_SEMANTICOS_JUS9_v1_5.md`
- `marca.html`
- `modelos-peticoes.html`
- `nossa-historia.html`
- `politica-de-privacidade.html`
- `publicacao.html`
- `README.md`
- `versionamento.html`
- `charlie-delta-da-costa/index.html`
- `documentos/aviso-mvp.html`
- `documentos/compromisso-sigilo.html`
- `documentos/cookies.html`
- `documentos/privacidade.html`
- `documentos/seguranca.html`
- `documentos/termos.html`
- `documentos/visao-de-futuro.html`
- `EQUIPE/index.html`
- `login/index.html`
- `ORIENTACOES/MAPA_DE_LINKS_OFICIAIS.md`
- `ORIENTACOES/MAPA_DE_LINKS_SEMANTICOS_OFICIAIS.md`
- `ORIENTACOES/MAPA_LINKS_SEMANTICOS_JUS9_v1_6.md`
- `origem-visual/index.html`
- `politica-de-privacidade/index.html`

## Commit sugerido

### Summary

Corrige links dos MVPs sem www

### Description

Atualiza os links dos botões e referências de MVPs / Demos no repositório principal da Jus 9 Tecnologia Jurídica para usar o domínio funcional sem www: https://jus9tecnologia.com.br/mvp#demos-jus9.

A correção evita o erro de redirecionamento em excesso apresentado no domínio www.jus9tecnologia.com.br e preserva a navegação para a seção Demo 1 a Demo 13.
