---
id: GOV-JUS9-MVPS-REPOSITORIOS-001-HUMANO
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: homologacao-tecnica
classificacao: PUBLICO-INSTITUCIONAL / SOMENTE METADADOS
hash: calcular-na-release-aprovada
---

# Mapa de repositorios e fontes dos MVPs - V4-06

## Resultado

Os 31 repositorios do catalogo publico foram classificados uma unica vez em seis grupos: nucleo dos MVPs, governanca/documentacao, infraestrutura sobreposta, Pagina Equipe externa, satelites de dominio e laboratorios.

O repositorio `jus9-tecnologia-juridica` e a fonte atual do portal, Worker, portfolio e governanca dos 14 MVPs. Repositorios especializados continuam fontes por dominio e devem trocar contratos versionados, sem copiar segredos ou conteudo privado para o portal.

## Decisoes humanas

| Decisao | Por que nao foi automatizada |
|---|---|
| Escolher um dos tres repositorios de infraestrutura como canonico | Pode alterar ownership, deploy e rollback |
| Designar Product Owner e responsavel tecnico | Responsabilidade nao pode ser presumida |
| Homologar IAM com Mariana | A Pagina Equipe pertence ao fluxo dela |
| Arquivar, fundir, migrar, excluir ou publicar repositorio | Acao destrutiva ou de exposicao exige autorizacao explicita |

## Regra operacional

Nenhuma recomendacao deste mapa muda visibilidade, permissao, branch, deploy ou conteudo de repositorio. Acoes futuras devem ter issue, responsavel, criterio de aceite, plano de rollback e release correspondente.

