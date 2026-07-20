---
id: GOV-CHARLIE-CNJ-CONEXOES-001-8
versao: 1.8.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-20
status: execucao-controlada-aguardando-cnj
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
substitui_planejamento_operacional: CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.7.0.md
preserva_historico: true
escopo_chat: Charlie Echo, governanca, APIs do CNJ e conexoes
---

# Cronograma executivo - Charlie, governanca, CNJ e conexoes v1.8.0

## Objetivo desta versao

Converter o estado consolidado ate G5 em uma fila operacional com datas, responsaveis, entradas, saidas e condicoes de parada. Esta versao nao autoriza credenciais, chamadas reais, ciencia, peticionamento, Domicilio Judicial, MNI ou qualquer efeito juridico externo.

## O que temos em 20/07/2026

| Bloco | Estado comprovado | Evidencia principal |
|---|---|---|
| G0-G4 | `CONCLUIDO` | Proveniencia, pipeline Charlie, DataJud somente leitura e preparacao PDPJ preservados. |
| G5 catalogo | `CONCLUIDO` | 11 capacidades classificadas por dado, efeito, credencial, aprovacao, auditoria e rollback. |
| G5 simulacao | `CONCLUIDO` | 15 cenarios ficticios, `networkCalls: false` e falha fechada. |
| G5 runbook | `CONCLUIDO` | Recebimento, rotacao, revogacao, indisponibilidade, incidente e mudanca de termos. |
| Portal Jus 9 | `PUBLICADO_EM_OBSERVACAO` | Pesquisa no menu, catalogo de 31 repositorios e release operacional configurada `governanca-1.21.5-onda5-dmp-dap-dmg-1.0`. |
| CNJ | `AGUARDANDO_RESPOSTA` | E-mail ja enviado; ausencia de resposta nao vale como autorizacao. |
| PDPJ real | `BLOQUEADO` | Falta onboarding institucional aplicavel, GeCli, termo, ambiente e credenciais oficiais. |

## Cronograma por marco

| Data e janela | Marco | Responsavel | Passo executavel | Saida esperada |
|---|---|---|---|---|
| 20/07 | M0 - linha de base | Codex + revisor humano | Congelar inventario G5, registrar bloqueios e preservar evidencias atuais. | Cronograma v1.8 e release documental auditaveis. |
| 20 a 23/07 | M1 - observacao de 72 horas | Codex | Verificar home, menu Pesquisa, pagina de pesquisa, catalogo, cache/PWA, Worker e visual mobile/desktop; somente leitura. | Registro de observacao com incidentes ou confirmacao de estabilidade. |
| 22/07 as 10h | M2 - retorno CNJ | Revisor humano + Codex | Conferir caixa/canal usado no contato e registrar `respondeu` ou `sem_resposta`. | Evidencia datada do acompanhamento. |
| 22/07 apos a conferencia | M3 - bifurcacao governada | Codex | Se respondeu, confrontar resposta com 11 capacidades e checklist institucional. Se nao respondeu, preparar minuta objetiva de reiteracao. | Matriz de aderencia ou minuta para aprovacao humana. |
| 23/07 | M4 - fechamento da observacao | Codex + revisor humano | Reexecutar smoke tests e classificar ocorrencias por severidade e reversibilidade. | Parecer `estavel`, `corrigir` ou `rollback`. |
| 24/07 | M5 - decisao humana | Revisor humano | Aprovar reiteracao, correcoes ou proximo pacote documental. Nenhum envio automatico. | Decisao registrada e proxima release definida. |
| Sem data, apos resposta aplicavel | M6 - pre-homologacao | Revisor humano + responsavel institucional | Validar entidade/CNPJ, responsavel, finalidade, termo, GeCli, ambiente, SSO oficial e custodia de credenciais. | Checklist completo; lacuna unica mantem bloqueio. |
| Somente apos M6 aprovado | M7 - homologacao tecnica limitada | Equipe tecnica + revisor humano | Teste minimo, reversivel e nao transacional no ambiente oficial autorizado. | Evidencia tecnica e decisao humana; ampliacao exige nova autorizacao. |

## Passo a passo imediato

1. Preservar a release operacional atual; nao alterar Worker durante a observacao, salvo incidente confirmado.
2. Executar checagens de leitura no portal e registrar horario, rota, status e resultado, sem dados pessoais.
3. Em 22/07/2026 as 10h, confirmar se o CNJ respondeu ao contato ja enviado.
4. Registrar apenas um dos estados: `CNJ_RESPONDEU` ou `CNJ_SEM_RESPOSTA`.
5. Se houver resposta, extrair requisitos oficiais e comparar com cada capacidade do catalogo G5; divergencia fecha a capacidade.
6. Se nao houver resposta, redigir reiteracao curta com identificacao do contato anterior, duvidas pendentes e pedido de canal correto.
7. Submeter qualquer reiteracao ao Fundador/revisor humano antes do envio; nao enviar automaticamente.
8. Ao completar 72 horas, consolidar a observacao do portal e decidir entre estabilidade, correcao pequena ou rollback.
9. Manter homologacao real bloqueada ate todos os gates institucionais de M6 estarem comprovados.
10. Registrar cada decisao nas paginas de governanca e release correspondentes antes de mudar o runtime.

## Checklist da observacao M1

- Home responde e exibe `Pesquisa` no menu principal.
- Pagina `pesquisa-repositorios.html` responde em desktop e mobile.
- Catalogo publico responde e declara 31 repositorios.
- Repositorios restritos aparecem somente como metadados; conteudo e credenciais nao sao expostos.
- Pesquisa de conteudo continua delegada ao GitHub e as permissoes da sessao do usuario.
- Health do Worker preserva a release operacional esperada.
- Cache/PWA nao serve menu ou pagina anteriores.
- Nenhuma regressao e observada na Charlie Echo, no DAJ ou no DataJud somente leitura.

## Bifurcacao M3

### Se o CNJ responder

1. Guardar a evidencia no canal institucional apropriado, sem copiar segredo para o repositorio.
2. Classificar a resposta como informativa, requisito de onboarding, autorizacao limitada ou negativa.
3. Confrontar escopo, ambiente, credencial, finalidade, limites, auditoria e revogacao com o catalogo G5.
4. Atualizar o estado apenas das capacidades expressamente cobertas.
5. Exigir revisao humana antes de teste de rede ou configuracao de segredo.

### Se o CNJ nao responder

1. Registrar data, hora e canal conferido.
2. Preparar reiteracao; nao presumir anuencia e nao aumentar escopo.
3. Apontar o canal oficial alternativo, se houver evidencia oficial.
4. Aguardar aprovacao humana para envio.
5. Manter PDPJ e capacidades transacionais bloqueadas.

## Condicoes de parada

- Resposta ambigua, origem nao verificavel ou escopo diferente do solicitado.
- Pedido para publicar ou versionar credencial, token, certificado ou dado sigiloso.
- Falta de entidade/CNPJ, responsavel, termo, GeCli, ambiente ou finalidade aprovada.
- Qualquer tentativa de registrar ciencia, peticionar, consultar Domicilio ou usar MNI nesta fase.
- Divergencia entre fonte oficial, catalogo G5 e comportamento observado.
- Incidente no portal que possa expor metadado restrito alem da autorizacao concedida.

## Bloqueios vinculantes

- PDPJ: `blocked-institutional-onboarding`.
- Domicilio listar comunicacoes: bloqueado.
- Registrar ciencia: proibido nesta fase.
- Peticionamento: proibido nesta fase.
- MNI: proibido nesta fase.
- DataJud por nome/CPF: bloqueado sem conector autorizado.
- DataJud por numero CNJ: somente leitura, termos vigentes, fonte oficial e revisao humana.

## Proxima acao unica

Continuar M1, observacao somente leitura, e executar M2 em 22/07/2026 as 10h. O resultado de M2 determina a bifurcacao M3; nenhum outro gate e antecipado.
