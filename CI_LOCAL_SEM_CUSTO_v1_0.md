# CI local sem custo - v1.0

Data: 2026-06-01

## Objetivo

Executar a homologação prioritária do ecossistema sem consumir minutos de GitHub Actions e sem contratar infraestrutura.

## Comando

Na raiz de `jus9-tecnologia-juridica`:

```powershell
node scripts/run-local-ci.mjs
```

## Verificações

- portal público e 13 MVPs;
- matriz controlada de RLS;
- estrutura SQL com tabelas e políticas RLS esperadas;
- pacote SQL de homologação fictícia para `DAJ` e `DEJI`;
- autenticação do Worker;
- política `fail closed` do backend local;
- regressão pública ao vivo da Charlie Echo.

- auditoria das seis paginas publicas de instalacao e das duas PWAs completas.
- validacao dos QR Codes publicos mantidos no portal de Investimentos.

## GitHub Actions

GitHub Actions permanece opcional. Em repositórios privados, a execução em runners hospedados pelo GitHub consome franquia mensal e pode gerar cobrança quando excedida, dependendo da configuração da conta. Por isso, esta etapa usa execução local.

Referência oficial:

`https://docs.github.com/en/billing/concepts/product-billing/github-actions`
