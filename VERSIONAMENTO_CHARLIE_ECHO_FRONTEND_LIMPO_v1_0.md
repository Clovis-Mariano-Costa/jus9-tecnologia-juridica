# Versionamento - Charlie Echo Frontend Limpo v1.0

ID: CHARLIE-FRONTEND-LIMPO-v1.0
Versao: 1.0.0
Autor: Codex / Jus 9 Tecnologia Juridica
Responsavel pela revisao: Jus 9
Data: 2026-07-12
Status: homologacao tecnica
Classificacao: governanca frontend
Hash: aplicavel no commit de publicacao

## Objetivo

Padronizar a superficie publica da Charlie Echo com menos botoes visiveis, preservando capacidades, auditoria e evolucao modular por MVP.

## Entregas

- Botao principal padronizado como `Falar com Charlie`.
- Controles rapidos `Anexar` e `Configuracoes`.
- Menu lateral/expansivel para ferramentas, anexos, salas, instrumentos e integracoes.
- Painel de configuracoes com memoria do usuario, instrumento do MVP, resposta e capacidades.
- Resumo de capacidades por MVP: ativo, configuravel, governado e limitado.
- Versionamento de cache/script em `20260712-charlie-clean-ui-v1`.

## Regra de compatibilidade

As funcoes antigas permanecem por atributos e contratos internos. Apenas os rotulos visiveis foram encurtados para reduzir ruido visual.

## Cronograma Renovado

1. Pacote 1 - Superficie limpa da Charlie: concluir padronizacao visual, auditorias e deploy publico.
2. Pacote 2 - Configuracoes por instrumento: ampliar capacidades por MVP, com DAJ Advogados como modelo-mae.
3. Pacote 3 - Upload e leitura assistida: ligar extrator governado para PDF/DOCX e anexos do atendimento inicial.
4. Pacote 4 - Drive operacional: salvar PDF/documentos com decisao governada, logs e `downloadUrl` real quando autorizado.
5. Pacote 5 - Replicacao: aplicar o modelo validado aos demais MVPs e ao modulo social.

## Auditoria

Validar com:

- `node scripts/audit-charlie-echo-quality.mjs`
- `node scripts/audit-charlie-echo-mvp-personas.mjs`
- `node tests/validate-public-mvps.mjs`
- `node scripts/audit-charlie-echo-public-modules.mjs` apos deploy
