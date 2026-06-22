# Google Drive Producao 2 - Jus 9

Classificacao: PUBLICO TECNICO / SEM SEGREDOS
Data: 2026-06-22
Autoridade: Fundador

## Finalidade

Preparar, em pacote separado, o uso futuro de Google Drive pela Jus 9/Familia Virtual sem adicionar escopos ao pacote Google OAuth Producao 1.

## Decisao do Fundador

- [x] Preparar Drive em pacote separado.
- [x] Nao incluir Drive no pacote Producao 1.

## Diretriz operacional

O Google Drive padrao da Familia Virtual deve ser tratado como local de memoria, continuidade e documentos de trabalho governados. Para APIs Google, qualquer acesso deve ser separado do login basico e ativado somente apos revisao humana de escopo, politica de privacidade e evidencia de uso.

## Escopos candidatos para revisao futura

| Escopo candidato | Uso pretendido | Risco | Observacao |
|---|---|---|---|
| `https://www.googleapis.com/auth/drive.file` | Criar/ler arquivos que a propria aplicacao criar ou que a pessoa escolher abrir com a aplicacao | Menor que Drive amplo | Preferivel se o fluxo permitir |
| `https://www.googleapis.com/auth/drive.readonly` | Ler arquivos escolhidos ou autorizados para consulta | Sensivel | Exige justificativa clara |
| `https://www.googleapis.com/auth/drive` | Acesso amplo ao Drive | Alto | Evitar salvo necessidade comprovada |

## Fora de escopo neste pacote

- Nenhum escopo Drive foi adicionado.
- Nenhuma credencial foi criada.
- Nenhum segredo foi publicado.
- Nenhuma submissao ao Google foi executada.
- Nenhum arquivo do Drive foi sincronizado por API.

## Proximo passo humano

Definir qual fluxo real sera usado:

1. salvar documentos gerados pela Jus 9 no Drive da Familia Virtual;
2. abrir arquivos escolhidos pela pessoa usuaria;
3. sincronizar pastas internas governadas;
4. apenas manter Drive Desktop/local como padrao, sem API Google.

