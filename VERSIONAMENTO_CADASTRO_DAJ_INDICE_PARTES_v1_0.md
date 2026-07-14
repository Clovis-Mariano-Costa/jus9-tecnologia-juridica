# Versionamento - Cadastro DAJ alimentando indice de partes v1.0

ID: VERSIONAMENTO-DAJ-INDICE-PARTES-001
Versao: 1.0.0
Data: 2026-07-13
Autor: Codex + Jus 9 Tecnologia Juridica
Status: homologacao tecnica
Classificacao: INTERNO / MVP DAJ / DADOS PESSOAIS CONTROLADOS

## Objetivo

Concluir o Pacote 1B: fazer o atendimento autenticado criar ou atualizar o DAJ e alimentar o indice interno de nome e CPF antes de existir vinculo processual.

## Entregas

- Novas rotas `GET /api/dajs/readiness` e `GET/POST /api/dajs`.
- Criacao de identificador DAJ no backend.
- Idempotencia obrigatoria para impedir duplicacao por repeticao da mesma operacao.
- Nome no indice deterministico e CPF exato transformado em HMAC-SHA-256.
- CPF integral ausente do indice, detalhe, resposta e auditoria.
- Contato, relato e documentos mencionados separados do indice pesquisavel.
- Classificacao sigilosa sem rebaixamento automatico.
- Vinculo posterior ao processo preservando identidade, CPF indexado e sigilo.
- Formulario de atendimento conectado ao backend e botao da Charlie liberado somente depois do salvamento real.
- Campos CPF, contato e arquivos excluidos do rascunho encaminhado a Charlie.

## Evidencias tecnicas

- Criacao antes do processo.
- Repeticao idempotente sem segundo DAJ.
- Conflito quando a mesma chave tenta representar outro cadastro.
- Bloqueio de CPF parcial, chave HMAC ausente, perfil sem escrita e payload excessivo.
- Pesquisa exata por CPF antes do vinculo processual.
- Duas pastas da mesma pessoa permitidas e um processo por DAJ preservado.
- Nenhuma mutacao causada pela pesquisa.

## Limites preservados

- Anexos selecionados no atendimento ainda nao sao persistidos por `/api/dajs`; permanecem para o Pacote 5.
- Uso de dados reais continua bloqueado ate o aceite autenticado do Pacote 1C.
- O indice atual em Cloudflare KV e adequado ao piloto controlado. Antes de escrita concorrente ou escala superior ao limite do indice, migrar alocacao e persistencia para D1 ou Durable Object transacional.
- Pesquisa externa por nome/CPF permanece `awaiting_official_guidance`.

## Proximo passo

Executar o Pacote 1C com login autorizado e dados inteiramente ficticios: criar DAJ, consultar por nome e CPF, vincular processo e confirmar persistencia entre sessoes.
