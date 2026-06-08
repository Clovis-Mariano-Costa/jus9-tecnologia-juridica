# Relatorio - pacote login modular

Classificacao: INTERNO / RELATORIO TECNICO / SEM SEGREDOS
Data: 2026-06-08 03:48:43.38523
Autor operacional: Charlie Juris da Costa / Codex
Autoridade humana: Clovis Mariano da Costa

## Resumo

O pacote implementa retorno governado ao modulo de origem apos login Google. A mudanca resolve o comportamento anterior em que todo login retornava para `app.html`.

## Decisao tecnica

O parametro `return_to` foi aceito somente como caminho relativo interno e validado antes de ser gravado na transacao OAuth assinada. O callback usa o valor assinado, validado novamente, para evitar manipulacao de destino.

## Salvaguardas

1. Nao aceita URL externa.
2. Nao aceita protocolo.
3. Nao aceita `//`.
4. Nao aceita barra invertida.
5. Nao aceita caracteres de controle.
6. Nao aceita `..`.
7. Nao aceita pagina fora dos modulos autorizados.
8. Mantem fallback seguro.

## Resultado de testes

Regressao local aprovada:

```text
WORKER_AUTH_REGRESSION_OK
```

Validado:

1. sessao anonima bloqueada;
2. permissoes por perfil preservadas;
3. OAuth sem configuracao responde `501`;
4. OAuth configurado redireciona ao Google;
5. `return_to` valido e preservado;
6. `return_to` externo e descartado;
7. logout limpa sessao.

## Pendencia de homologacao humana

Depois do deploy, confirmar no navegador publicado:

1. login iniciado pela IA Profissional retorna para IA Profissional;
2. login iniciado pelo MVP retorna ao painel de acesso;
3. conta nao autorizada segue bloqueada;
4. logs nao exibem e-mail real nem token.

