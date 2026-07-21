---
id: REL-GOV-CHARLIE-1.21.16
versao: 1.21.16
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-21
status: publicado
classificacao: PUBLICO-INSTITUCIONAL
runtime_alterado: false
hash: calcular-na-release-aprovada
---

# Release v1.21.16 - Sprint final dos MVPs

## Resultado

- Removida do Git a extracao temporaria legada do ZIP de auditoria, composta por 26 arquivos e aproximadamente 29 MB.
- O auditor Build Week agora exige zero arquivo rastreado sob `tmp`, impedindo regressao silenciosa da higiene do repositorio.
- Pagina Build Week registra a limpeza no fechamento e identifica o snapshot publico 5.19.1.
- Manifesto Build Week sobe para 1.7.1 e cache PWA para `jus9-pwa-v55-2026-07-21-mvps-final-sprint`.
- API publica G6C3 e runtime 1.21.15 permanecem preservados.
- Criado cronograma governado para a janela final de tres horas.

## Limites

O ZIP privado e suas credenciais nao foram alterados. Elegibilidade, direitos de ativos, termos DataJud, video e submissao permanecem sob decisao humana.

## Publicacao verificada

- PR: `#11`;
- merge: `039443bf08a618cb52766dfc027ccf86ba146c3f`;
- Workers Build: `3b78e10f-193b-44bf-85f1-9ca3d91f4107`, aprovado;
- smoke publico: Build Week `200`, versionamento `200` e API governada `200`;
- marcadores confirmados no dominio: `Release 5.19.1` e `Repository hygiene`.
