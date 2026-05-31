# Homologacao autenticada privada - contas controladas

Classificacao: INTERNO / OPERACIONAL / SEM CREDENCIAIS REAIS

## Objetivo

Validar login, permissoes, titularidade, auditoria e cofre com identidades ficticias antes de cadastrar qualquer conta Google real.

## Matriz inicial

| Identidade ficticia | Perfil | Uso |
| --- | --- | --- |
| `admin.hml@jus9.invalid` | `admin_sistema` | auditoria e administracao |
| `titular.daj.hml@jus9.invalid` | `advogado` | titular do DAJ e acesso exclusivo ao cofre |
| `lider.daj.hml@jus9.invalid` | `advogado_lider` | leitura restrita, sem acesso ao cofre de terceiro |
| `empresa.deji.hml@jus9.invalid` | `empresa` | dossie empresarial `DEJI` proprio |

Os enderecos `.invalid` sao reservados para documentacao e nao recebem login real.

## Aplicacao segura

Somente depois de configurar `DATABASE_URL` fora do GitHub e instalar `psql`:

```powershell
.\database\scripts\apply-homologation.ps1 -ConfirmTarget jus9-homologacao
```

O aplicador recusa banco cujo nome nao indique `hml`, `homologacao`, `staging` ou `test`.

## Validacao local sem banco

```powershell
node database/scripts/validate-homologation-package.js
node tests/validate-worker-auth.mjs
```

## Ativacao Google posterior

Depois da homologacao SQL:

1. cadastrar somente contas Google controladas em segredo de ambiente;
2. mapear `AUTH_ALLOWED_EMAILS` fora do repositorio;
3. manter `AUTH_ENFORCE_API=false` durante o primeiro login;
4. validar `/api/auth/me` e `/api/auth/permissions`;
5. ativar `AUTH_ENFORCE_API=true` somente em janela controlada.
