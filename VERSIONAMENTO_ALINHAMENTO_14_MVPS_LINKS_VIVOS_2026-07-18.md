# Versionamento - Alinhamento 14 MVPs e links vivos - 2026-07-18

Classificacao: PUBLICO SANITIZADO / VERSIONAMENTO / SEM SEGREDOS

## Escopo

- Alinhamento das paginas publicas de MVP para o catalogo canonico de 14 ambientes demonstrativos.
- Inclusao do Demo 14 - DED - Autor / Editora / Autor-Editor no painel do lider MVP.
- Padronizacao de links publicos de Equipe para `https://equipe.jus9tecnologia.com.br/`.
- Atualizacao do auditor local da Charlie Echo para exigir o contrato publico de 14 ambientes.

## Arquivos principais

- `lider-mvp.html`
- `dist/lider-mvp.html` artefato local ignorado pelo Git, mantido alinhado para verificacao de publicacao
- `scripts/audit-charlie-echo-quality.mjs`
- paginas HTML publicas com rotulos e retornos de MVP ajustados de 13 para 14 demos

## Governanca

- Nenhum segredo, token, senha, credencial, dado pessoal real ou documento juridico sensivel foi adicionado.
- Nenhum fluxo de backend, autenticacao, Drive, pagamento, WhatsApp, banco de dados ou persistencia real foi simulado.
- As alteracoes preservam a leitura honesta de ambiente demonstrativo e uso apenas com dados ficticios.

## Validacao local

- `node scripts/audit-mvp-visual.mjs`
- `node scripts/audit-charlie-mvp-inventory.mjs`
- `node tests/validate-public-mvps.mjs`
- auditoria estatica local de links MVP: 95 paginas visitadas, nenhum alvo local ausente
- `node scripts/run-local-ci.mjs`

Resultado: `LOCAL_CI_OK portal,rls,sql-homologacao,worker-auth,backend-local,charlie-echo,instalacao-publica,qr-codes`.

## Proximo passo recomendado

- Revisar visualmente `lider-mvp.html` e o fluxo do Demo 14 antes de publicar.
- Se aprovado, sincronizar artefatos de distribuicao e publicar pelo fluxo governado do projeto.
