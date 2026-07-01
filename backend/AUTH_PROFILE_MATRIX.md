# Matriz de perfis e permissoes - Login MVP

CLASSIFICACAO: INTERNO / OPERACIONAL / LOGIN

## Objetivo

Mapear os perfis demonstrativos do MVP para perfis reais de login Google e permissoes iniciais de backend.

Esta matriz e inicial. Antes de dados reais, deve passar por revisao humana, juridica e operacional.

## Permissoes tecnicas

| Permissao | Uso inicial |
| --- | --- |
| `auth:read` | Ler a propria sessao e permissoes. |
| `dajs:read` | Listar/consultar DAJs demonstrativos. |
| `dajs:write` | Criar DAJ demonstrativo. |
| `documents:read` | Consultar documentos demonstrativos. |
| `processes:read` | Consultar processos demonstrativos. |
| `audit:write` | Registrar evento de auditoria. |

## Matriz de perfis

| Perfil real | Demo relacionado | Tela inicial | Permissoes iniciais |
| --- | --- | --- | --- |
| `admin_sistema` | `demo10@jus9tecnologia.com.br` | `central-tecnica.html` | `auth:read`, `dajs:read`, `dajs:write`, `documents:read`, `processes:read`, `audit:write` |
| `advogado_lider` | `demo@jus9tecnologia.com.br` | `app-demo-advogar.html` | `auth:read`, `dajs:read`, `dajs:write`, `documents:read`, `processes:read`, `audit:write` |
| `advogado` | `demo1@jus9tecnologia.com.br` | `app-demo-advogar.html` | `auth:read`, `dajs:read`, `dajs:write`, `documents:read`, `processes:read`, `audit:write` |
| `academia` | `demo2@jus9tecnologia.com.br` | `app-demo-professor.html` | `auth:read` |
| `estudante` | `demo3@jus9tecnologia.com.br` | `app-demo-estudante.html` | `auth:read` |
| `cidadao` | `demo4@jus9tecnologia.com.br` | `app-demo-cidadao.html` | `auth:read` |
| `perito` | `demo5@jus9tecnologia.com.br` | `app-demo-perito.html` | `auth:read`, `documents:read` |
| `parceiro` | `demo6@jus9tecnologia.com.br` | `app-demo-investidor.html` | `auth:read` |
| `escritorio` | `demo7@jus9tecnologia.com.br` | `app-demo-escritorio.html` | `auth:read`, `dajs:read`, `documents:read`, `processes:read` |
| `empresa` | `demo8@jus9tecnologia.com.br` | `app-demo-empresa.html` | `auth:read`, `documents:read` |
| `orgao_publico` | `demo9@jus9tecnologia.com.br` | `app-demo-orgao-publico.html` | `auth:read`, `processes:read` |
| `magistrado` | `demo11@jus9tecnologia.com.br` | `app-demo-juiz.html` | `auth:read`, `processes:read` |
| `ministerio_publico` | `demo12@jus9tecnologia.com.br` | `app-demo-promotor.html` | `auth:read`, `processes:read` |
| `autoridade_policial` | `demo13@jus9tecnologia.com.br` | `app-demo-delegado.html` | `auth:read`, `documents:read`, `processes:read` |
| `autor_editor` | `demo14@jus9tecnologia.com.br` | `app-demo-autor-editor.html` | `auth:read` |

## Catalogo publico canonico

O contrato publico dos 14 ambientes demonstrativos fica em `data-publica/mvp-perfis.json`.

Ele registra codigo de dossie, aliases legados, tela inicial, tela de perfis e subperfis demonstrativos. O endpoint `GET /api/profiles` deriva sua resposta desse arquivo.

## Perfis internos herdados do backend

| Perfil | Uso sugerido |
| --- | --- |
| `assessor_chefe` | Apoio juridico interno com leitura ampla e auditoria. |
| `assessor` | Apoio juridico com leitura controlada. |
| `secretaria` | Organizacao operacional e documentos comuns. |
| `estagio` | Apoio de baixa permissao. |

## Regras antes de dados reais

- `secreto` e `cofre` seguem pertencendo ao advogado titular.
- Conta Google autorizada nao significa acesso irrestrito.
- Perfil define tela inicial e permissoes; titularidade define acesso ao sigilo.
- Allowlist inicial deve ficar apenas em variavel segura.
- Migracao futura deve trocar allowlist por tabela `users` com auditoria.
