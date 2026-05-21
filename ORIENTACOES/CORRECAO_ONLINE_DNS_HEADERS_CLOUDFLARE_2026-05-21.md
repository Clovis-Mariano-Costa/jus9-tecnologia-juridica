# Correcao online - DNS raiz e headers Cloudflare

Data: 2026-05-21
Classificacao: INTERNO OPERACIONAL / SEM SEGREDOS

## Situacao confirmada

`https://www.jus9tecnologia.com.br/` responde `200 OK` via Cloudflare.

`https://jus9tecnologia.com.br/` nao resolve para pagina publica. A consulta DNS local retornou apenas SOA, sem A/AAAA/CNAME funcional para o dominio raiz.

O site principal online responde:

```text
Content-Type: text/html
CF-Cache-Status: HIT
Server: cloudflare
```

O conteudo HTML esta em UTF-8 valido, mas o cabecalho ideal ainda deve ser:

```text
Content-Type: text/html; charset=utf-8
X-Content-Type-Options: nosniff
```

O arquivo `_headers` ja existe neste repositorio e define `charset=utf-8`. Se o online ainda nao aplica, ha tres causas provaveis:

1. Deploy de producao nao usou a raiz deste repositorio como output.
2. Deploy de producao esta em commit/branch anterior.
3. Cache do Cloudflare ainda esta servindo resposta antiga.

## Acao 1 - DNS raiz

No Cloudflare, zona `jus9tecnologia.com.br`:

1. Abrir `DNS > Records`.
2. Criar registro para o dominio raiz:

```text
Type: CNAME
Name: @
Target: www.jus9tecnologia.com.br
Proxy status: Proxied
TTL: Auto
```

Se o painel nao aceitar CNAME no apex, usar Cloudflare CNAME flattening ou criar Custom Domain apex no projeto Pages.

Resultado esperado:

```text
https://jus9tecnologia.com.br/ -> https://www.jus9tecnologia.com.br/
```

## Acao 2 - Custom domains em Pages

No Cloudflare Pages do projeto da Jus 9:

1. Abrir `Workers & Pages`.
2. Abrir o projeto que serve `www.jus9tecnologia.com.br`.
3. Conferir `Custom domains`.
4. Garantir que existem:

```text
www.jus9tecnologia.com.br
jus9tecnologia.com.br
```

5. Se o apex for adicionado, aguardar emissao de certificado.

## Acao 3 - Build/output

Conferir:

```text
Production branch: main
Build command: vazio
Output directory: /
```

O arquivo `_headers` precisa estar na raiz do output publicado.

## Acao 4 - Purge cache

Depois do deploy:

1. Abrir `Caching > Configuration`.
2. Usar `Purge Custom Cache`.
3. Limpar:

```text
https://www.jus9tecnologia.com.br/
https://jus9tecnologia.com.br/
https://www.jus9tecnologia.com.br/index.html
https://www.jus9tecnologia.com.br/sw.js
https://www.jus9tecnologia.com.br/script.js
https://www.jus9tecnologia.com.br/style.css
```

## Validacao

Rodar:

```powershell
curl.exe -I -L https://jus9tecnologia.com.br/
curl.exe -I -L https://www.jus9tecnologia.com.br/
```

Esperado:

```text
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Server: cloudflare
```

## Observacao

Nao inserir tokens, API keys, segredo Cloudflare, cookies ou credenciais neste repositorio. Ajustes de DNS, Pages e cache devem ser feitos no painel Cloudflare ou por CLI autenticada com segredo local seguro.
