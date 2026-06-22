# Gmail Producao 3 - Jus 9

Classificacao: PUBLICO TECNICO / SEM SEGREDOS
Data: 2026-06-22
Autoridade: Fundador

## Finalidade

Preparar, em pacote separado, eventual uso futuro de Gmail pela Jus 9/Familia Virtual sem adicionar escopos ao pacote Google OAuth Producao 1.

## Decisao do Fundador

- [x] Preparar Gmail em pacote separado.
- [x] Nao incluir Gmail no pacote Producao 1.

## Diretriz operacional

Gmail envolve conteudo de comunicacao e pode demandar revisao sensivel/restrita conforme o escopo. O pacote inicial deve evitar leitura ampla de caixa postal e priorizar fluxos explicitamente acionados pela pessoa usuaria.

## Escopos candidatos para revisao futura

| Escopo candidato | Uso pretendido | Risco | Observacao |
|---|---|---|---|
| `https://www.googleapis.com/auth/gmail.send` | Enviar e-mails preparados pela aplicacao apos confirmacao humana | Sensivel | Candidato mais restrito para envio |
| `https://www.googleapis.com/auth/gmail.compose` | Criar rascunhos/mensagens para revisao humana | Sensivel | Preferivel a envio automatico quando aplicavel |
| `https://www.googleapis.com/auth/gmail.readonly` | Ler mensagens para triagem ou contexto | Alto | Evitar sem necessidade comprovada |
| `https://mail.google.com/` | Acesso amplo ao Gmail | Muito alto | Nao recomendado para pacotes iniciais |

## Fora de escopo neste pacote

- Nenhum escopo Gmail foi adicionado.
- Nenhuma credencial foi criada.
- Nenhum segredo foi publicado.
- Nenhuma submissao ao Google foi executada.
- Nenhuma leitura ou envio de e-mail foi implementado.

## Proximo passo humano

Definir se o Gmail sera usado para:

1. envio de mensagens transacionais;
2. rascunhos revisados por humano;
3. triagem de caixa postal;
4. nenhum uso por API, mantendo e-mail fora do produto.

