---
id: GOV-RELATORIO-DATAJUD-CNJ-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: revisao-tecnica-concluida-com-condicoes-juridicas
classificacao: PUBLICO-INSTITUCIONAL
hash: calcular-na-release-aprovada
---

# Revisao governada da API Publica DataJud/CNJ

## Resultado

O gate tecnico do conector read-only foi concluido. A revisao nao equivale a parecer juridico nem comprova autorizacao comercial. O uso permanece condicionado ao Termo v1.2, a finalidade legal, autorizada e nao comercial, a revisao humana e a conferencia no tribunal competente.

## Fontes oficiais verificadas

- Portal CNJ: https://www.cnj.jus.br/sistemas/datajud/api-publica/
- DataJud Wiki - acesso: https://datajud-wiki.cnj.jus.br/api-publica/acesso/
- DataJud Wiki - endpoints: https://datajud-wiki.cnj.jus.br/api-publica/endpoints/
- DataJud Wiki - glossario: https://datajud-wiki.cnj.jus.br/api-publica/glossario/
- Termo de Uso v1.2: https://formularios.cnj.jus.br/wp-content/uploads/2023/11/Termos-de-uso-api-publica-V1.2.pdf
- Resolucao CNJ n. 331/2020: https://atos.cnj.jus.br/atos/detalhar/3428

## Confronto e correcoes

| Controle | Antes | Depois |
|---|---|---|
| Allowlist | 61 aliases; TREs e TJMs ausentes | 91 aliases oficiais: 4 superiores, 6 TRFs, 27 TJs, 24 TRTs, 27 TREs e 3 TJMs |
| Autenticacao upstream | APIKey ou Basic legado | somente `Authorization: APIKey`, como documentado pelo CNJ |
| Limite | 120 por tribunal e por consulta | teto global por chave, contabilizado em cada tentativa upstream |
| Ausencia de contador | consulta seguia sem cache | falha fechada sem `JUS9_DATAJUD_CACHE` |
| Retry | uma repeticao fixa de 200 ms | maximo de 2 tentativas, `Retry-After` respeitado e backoff limitado |
| Timeout | por tentativa | prazo total compartilhado entre tentativas |
| Resposta | `response.json()` sem limite | leitura limitada a 2 MB e `_source` minimizado |
| Auditoria | hash truncado do numero processual | hash removido; apenas ID aleatorio, tribunal, resultado, status, total, duracao e tentativas |

## Termo de Uso v1.2

Foram incorporadas como condicoes operacionais:

- somente metadados de processos publicos;
- uso legal, autorizado e nao comercial;
- proibicao de coletar informacoes pessoais de terceiros;
- teto de 120 requisicoes por minuto por usuario ou chave, salvo autorizacao expressa por escrito;
- ciencia ao CNJ sobre informacao, estudo, relatorio ou documento disponibilizado ao publico;
- possibilidade de alteracao, interrupcao ou revogacao do acesso sem aviso;
- ausencia de garantia de precisao, integridade ou atualidade.

## Limite de conformidade

O KV aplica uma barreira global conservadora e falha fechada quando indisponivel, mas nao e um contador transacional global. Antes de escala horizontal relevante, recomenda-se substituir o contador por coordenacao forte ou obter orientacao escrita do CNJ. Nenhum aumento acima de 120 foi autorizado.

## Decisao do gate

- `G3_DATAJUD_TECNICO_CONCLUIDO`.
- `USO_COMERCIAL_NAO_AUTORIZADO`.
- `DIVULGACAO_PUBLICA_DERIVADA_DEPENDE_CIENCIA_AO_CNJ`.
- PDPJ-Br continua readiness-only.
- Drive e memoria continuam sem ampliacao neste pacote.
