# Favicons da Jus 9 Tecnologia Jurídica

Esta pasta contém o favicon criado para a Jus 9 Tecnologia Jurídica.

## Arquivos principais

- `jus9-favicon.ico`
- `jus9-favicon.png`
- `jus9-favicon-16.png`
- `jus9-favicon-32.png`
- `jus9-favicon-48.png`
- `jus9-favicon-180.png`
- `jus9-favicon-192.png`
- `jus9-favicon-512.png`

## Como instalar no site da Jus 9

Copie esta pasta para o site da Jus 9 ou coloque os arquivos em:

`assets/images/jus9-favicons/`

Depois, dentro do `<head>` do HTML principal da Jus 9, adicione:

```html
<link rel="icon" type="image/x-icon" href="assets/images/jus9-favicons/jus9-favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/jus9-favicons/jus9-favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="assets/images/jus9-favicons/jus9-favicon-16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="assets/images/jus9-favicons/jus9-favicon-180.png" />
<link rel="icon" type="image/png" sizes="192x192" href="assets/images/jus9-favicons/jus9-favicon-192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="assets/images/jus9-favicons/jus9-favicon-512.png" />
```

## Observação

Depois do deploy, o navegador pode manter o favicon antigo em cache. Teste em aba anônima ou pressione Ctrl+F5.
