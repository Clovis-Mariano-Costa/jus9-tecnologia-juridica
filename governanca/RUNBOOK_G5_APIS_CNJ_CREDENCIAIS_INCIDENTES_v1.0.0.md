---
id: GOV-RUNBOOK-G5-CNJ-001
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: ativo-sem-credenciais
classificacao: INTERNO
hash: calcular-na-release-aprovada
---

# Runbook G5 - APIs CNJ, credenciais e incidentes

## Estado de entrada

- CNJ sem resposta ate 20/07/2026.
- PDPJ em `blocked-institutional-onboarding`.
- DataJud somente leitura, numero CNJ e metadados publicos.
- Nenhuma credencial real pertence ao repositorio, pagina publica, fixture, log ou conversa.

## Recebimento de credencial

1. Confirmar por humano competente a entidade, CNPJ, responsavel, finalidade, ambiente e autorizacao aplicavel.
2. Validar origem pelo canal oficial do CNJ; nao aceitar segredo recebido por canal nao confirmado.
3. Registrar somente identificador administrativo e data, nunca o valor do segredo.
4. Armazenar no cofre do provedor, com menor privilegio e separacao homologacao/producao.
5. Executar teste apenas em URL SSO allowlisted e depois de GeCli aprovado.
6. Producao exige aprovacao humana separada e nova release governada.

## Rotacao e revogacao

- Rotacionar imediatamente se houver exposicao, destino incorreto, colaborador desligado ou suspeita de replay.
- Revogar primeiro; preservar logs minimizados; depois investigar.
- Nunca copiar token para ticket, commit, chat, captura de tela ou relatorio publico.
- Confirmar que caches, filas e variaveis antigas nao conservam o segredo.

## Indisponibilidade e limite

- Falhar fechado em timeout, resposta invalida, corpo excedente, rate limit sem contador ou fonte fora da allowlist.
- DataJud: no maximo duas tentativas, backoff e limite global conservador por chave.
- PDPJ: sem fallback generativo e sem trocar automaticamente homologacao por producao.
- Nao transformar indisponibilidade em permissao para fonte alternativa nao autorizada.

## Incidente

1. Desabilitar a capacidade afetada.
2. Revogar/rotacionar credenciais no provedor.
3. Classificar dados e efeitos possivelmente atingidos.
4. Preservar evidencia minimizada, sem replicar conteudo juridico sigiloso.
5. Notificar responsavel humano e avaliar obrigacoes contratuais/LGPD.
6. Restaurar somente com causa identificada, teste negativo e aceite humano.

## Mudanca de termo ou documentacao

- Congelar a capacidade afetada.
- Comparar fonte oficial, data, escopo, autenticacao, limites e deveres de comunicacao.
- Atualizar contrato, catalogo, testes e release antes de reativar.
- Mudanca de documentacao nunca autoriza automaticamente uso comercial ou transacional.

## Resposta futura do CNJ

- Arquivar referencia e data da resposta sem publicar dados pessoais ou segredos.
- Comparar a resposta com o checklist institucional e registrar divergencias.
- Manter bloqueado tudo o que nao tiver autorizacao expressa e verificavel.
- Solicitar nova decisao humana antes de GeCli, credenciais ou homologacao real.
