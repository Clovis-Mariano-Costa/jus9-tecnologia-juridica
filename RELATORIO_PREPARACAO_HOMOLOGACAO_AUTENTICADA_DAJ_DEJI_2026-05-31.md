# Relatorio de preparacao da homologacao autenticada DAJ e DEJI

Data: 2026-05-31
Classificacao: INTERNO / OPERACIONAL / SEM DADOS REAIS

## Resultado

Foi preparado o pacote seguro para iniciar homologacao autenticada privada dos fluxos `DAJ` e `DEJI`.

## Entregas

- seed SQL com quatro identidades exclusivamente ficticias `.invalid`;
- dois DAJs controlados, incluindo um caso `cofre`;
- um dossie empresarial `DEJI`;
- verificacao SQL de RLS para titular, lider nao titular, empresa e administrador;
- aplicador PowerShell com confirmacao explicita e trava de nome do banco;
- regressao local do Worker para sessao, permissoes, expiracao, OAuth pendente e logout;
- matriz executavel das regras esperadas de titularidade.

## Estado remoto

O pacote nao foi aplicado remotamente.

Nesta maquina nao estao configurados:

- `DATABASE_URL`;
- credenciais Supabase/PostgreSQL;
- `psql`;
- credenciais Google OAuth;
- token Cloudflare local.

Esse limite e correto: nenhuma credencial deve ser publicada no repositorio ou inferida automaticamente.

## Validacoes locais aprovadas

```text
RLS_STRUCTURE_OK tables=16 policies=18
HOMOLOGATION_PACKAGE_OK seeds=DAJ,DEJI rls=titular,lider,empresa,admin
RLS_CONTROLLED_MATRIX_OK titular,lider,admin,empresa
WORKER_AUTH_REGRESSION_OK
APPLY_GUARD_OK DATABASE_URL_AUSENTE
```

## Proximo passo externo controlado

1. criar banco privado com nome contendo `hml`, `homologacao`, `staging` ou `test`;
2. instalar `psql`;
3. configurar `DATABASE_URL` fora do GitHub;
4. executar `database/scripts/apply-homologation.ps1 -ConfirmTarget jus9-homologacao`;
5. cadastrar credenciais OAuth Google em ambiente seguro;
6. validar login com contas controladas reais, mantendo dados juridicos ficticios.
