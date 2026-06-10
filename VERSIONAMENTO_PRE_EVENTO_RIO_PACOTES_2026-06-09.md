# Versionamento - Pacote 11 - Pre-evento Rio

Registrado em: 2026-06-09 21:35:46.83332

## Escopo

Preparacao dos pacotes publicos da Jus 9 Tecnologia Juridica para demonstracao no Rio, com foco em aparencia, navegacao, integridade dos MVPs e seguranca operacional demonstrativa.

## Alteracoes

- Corrigidos links legados da Equipe para o subdominio oficial `https://equipe.jus9tecnologia.com.br/`.
- Adicionado `charset=utf-8` para paginas HTML publicas via cabecalho de publicacao.
- Criada faixa compacta de navegacao do evento nas rotas criticas: MVPs, IA Profissional, Agenda e Chat Charlie.
- Ajustada semantica do Chat Charlie com H1 real e atalhos publicos mais claros.
- Preservados os tres padroes de Charlie Echo: detalhista no chat dedicado, medio nas paginas de IA e pequeno para modulos operacionais.
- Realinhados contratos de cache-bust dos 13 MVPs, 13 paginas de IA e 13 workspaces sociais.
- Mantido aviso publico de MVP e uso apenas com dados ficticios, sem divulgar arquitetura sensivel.

## Validacoes

- `node tests/validate-worker-auth.mjs` aprovado.
- `node tests/validate-public-mvps.mjs` aprovado.
- `node scripts/audit-nav-favicons.mjs` aprovado.
- `node scripts/audit-mvp-visual.mjs` aprovado.
- Auditoria local: zero links legados para `/equipe/`.
- Auditoria local: zero sequencias conhecidas de mojibake nos arquivos rastreados.

## Governanca

- Nenhum segredo, token, client secret, cookie ou chave foi publicado.
- Nenhuma permissao de cofre foi alterada.
- Ambiente segue em MVP publico: visitantes devem usar dados ficticios.
- Uso real permanece condicionado a revisao humana e governanca aplicavel.

