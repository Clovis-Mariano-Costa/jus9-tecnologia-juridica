# Versionamento - Pesquisa de repositorios GitHub Jus 9 v1.0.0

Data: 20/07/2026
Versao publica do portal: 5.12
Classificacao: PUBLICO / METADADOS GOVERNADOS

## Entrega

- Link `Pesquisa` adicionado ao menu principal da home.
- Pagina `pesquisa-repositorios.html` criada para consultar o catalogo institucional.
- Catalogo `data-publica/repositorios-jus9.json` criado com 31 repositorios identificados na conta GitHub oficial.
- Repositorios publicos e restritos sao distinguidos sem replicar conteudo privado.
- Pesquisa de conteudo e encaminhada ao GitHub, que aplica as permissoes da sessao do usuario.
- Nenhuma senha, token, chave GitHub ou conteudo de repositorio privado foi incorporado ao portal.

## Arquivos principais

- `index.html`
- `pesquisa-repositorios.html`
- `assets/js/pesquisa-repositorios.js`
- `data-publica/repositorios-jus9.json`
- `versionamento.html`
- `service-worker.js`
- `sitemap.xml`
- `_redirects`
- `scripts/audit-pesquisa-repositorios.mjs`
- `scripts/run-local-ci.mjs`
- `scripts/Sync-PortalDist.ps1`

Cache PWA desta versao: `jus9-pwa-v47-2026-07-20-pesquisa-repositorios`.

Autorizacao humana: em 20/07/2026, o Fundador confirmou a publicacao dos nomes dos repositorios restritos como metadados publicos. Conteudo e credenciais continuam protegidos.

## Criterio de aceite

1. O menu principal apresenta `Pesquisa`.
2. O catalogo permite filtro por termo e visibilidade.
3. Todos os 31 repositorios Jus 9 identificados constam no manifesto versionado.
4. Conteudo restrito somente pode ser aberto quando o GitHub reconhecer permissao na sessao do usuario.
5. Auditoria automatizada passa sem credenciais.

## Rollback

Remover o link do menu e os novos artefatos de pesquisa; restaurar `versionamento.html` para 5.11 e o cache PWA anterior. Nenhum dado de repositorio precisa ser apagado porque o portal armazena apenas metadados do catalogo.
