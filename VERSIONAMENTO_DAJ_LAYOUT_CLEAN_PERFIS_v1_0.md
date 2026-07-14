---
id: JUS9-DAJ-LAYOUT-CLEAN-PERFIS-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-14
status: publicado-em-homologacao
classificacao: INTERNO
hash: commit-89072ab
---

# Layout clean e perfis do DAJ

## Objetivo

Transformar o DAJ no modelo visual operacional da Jus 9: menos ruido, menos botoes duplicados, navegacao completa e perfis compreensiveis sem alterar os contratos de backend.

## Telas revisadas

- painel DAJ;
- atendimento inicial;
- cadastro e encaminhamentos;
- pesquisa processual;
- Charlie Echo profissional;
- perfis e acessos.

## Entregas

- Camada visual isolada em `assets/css/daj-clean-ui.css`.
- Menu lateral padronizado com doze destinos nas seis telas.
- Titulos reduzidos, raios de ate 8 px, sombras removidas e espacos mais compactos.
- Faixas institucionais repetidas retiradas das telas operacionais.
- Painel principal sem metricas, processos ou auditorias ficticias apresentados como dados de trabalho.
- Pesquisa processual sem 27 atalhos redundantes de tribunais; o seletor existente permanece.
- Painel processual abre o DAJ realmente vinculado e pode iniciar analise em nova sala.
- Pagina de perfis reescrita sem texto corrompido e com os 19 papeis reconhecidos.

## Perfis do fluxo DAJ

Administrador do sistema, advogado lider, advogado, assessor chefe, assessor, secretaria, estagio e escritorio juridico.

Os demais onze perfis pertencem a outros modulos: academia, estudante, cidadao, perito, parceiro, empresa, orgao publico, magistrado, Ministerio Publico, autoridade policial e autor/editor.

## Regra de seguranca

A lista apresenta papeis possiveis, nao pessoas nem credenciais. O perfil e reconhecido pelo login governado e nao pode ser escolhido livremente na interface.

## Evidencias

- Commit tecnico: `89072ab`.
- Worker: `ac8b3947-da9c-4eb0-8744-e7a7c66462ea`.
- Release: `governanca-1.13.0-daj-clean-ui-1.0`.
- Seis paginas publicas com um H1, doze itens de menu e camada clean carregada.
- CI completa aprovada nos 14 MVPs e no modulo social.
- Contratos de salvamento, pesquisa, analise, feedback e encaminhamento preservados.

## Cronograma renovado

1. Aceite visual DAJ: desktop e celular, login, atendimento, encaminhamento e pesquisa.
2. Correcao transversal curta: atalhos de Agenda ausentes nos paineis Empresa e Investidor.
3. Replicacao visual em ondas: educacao, apoio tecnico, empresarial, institucional e editorial.
4. Modulo social: aplicar somente limpeza e configuracoes adequadas ao DIC, preservando linguagem e prioridades sociais.
5. Diretorio de equipe: separar papeis possiveis de pessoas cadastradas, com convite, status e auditoria.
6. Revisao final: acessibilidade, responsividade, cache PWA e relatorio para investidores e parceiros.
