# Versionamento - paineis especificos dos demos v1.0

Data: 2026-05-24
Repo: jus9-tecnologia-juridica

## Objetivo

Corrigir os botoes principais dos Demos 2 a 13 para que cada um abra o painel demonstrativo adequado, em vez de cair em paginas genericas compartilhadas.

## Alteracoes

- Mantido Demo 1 apontando para `app-demo-advogar.html`.
- Criados paineis especificos:
  - Demo 2: `app-demo-professor.html`
  - Demo 3: `app-demo-estudante.html`
  - Demo 4: `app-demo-cidadao.html`
  - Demo 5: `app-demo-perito.html`
  - Demo 6: `app-demo-investidor.html`
  - Demo 7: `app-demo-escritorio.html`
  - Demo 8: `app-demo-empresa.html`
  - Demo 9: `app-demo-orgao-publico.html`
  - Demo 10: `app-demo-administrador.html`
  - Demo 11: `app-demo-juiz.html`
  - Demo 12: `app-demo-promotor.html`
  - Demo 13: `app-demo-delegado.html`
- Atualizados os botoes `Abrir painel Demo N` em `demo-02` a `demo-13`.

## Cuidados preservados

- Todos os novos paineis sao demonstrativos, estaticos e sem dados reais.
- Nenhum login real, backend real, Google OAuth, token, segredo ou dado de cliente foi incluido.
- Os paineis mantem atalhos para Agenda, IA Profissional, Documentos, Workspace e demais modulos quando fizer sentido.

## Criterio de aceite

- Cada pagina `demo-XX...html` possui botao principal apontando para um `app-demo-*` do proprio perfil.
- Demo 1 continua em `app-demo-advogar.html`.
- Demos 2 a 13 nao usam mais `app-perfis.html`, `app-processos.html`, `app-documentos.html` ou outros modulos genericos como destino principal do botao.
