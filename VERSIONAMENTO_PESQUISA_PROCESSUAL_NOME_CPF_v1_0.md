# Versionamento - Pesquisa processual por numero, nome e CPF v1.0

Data: 2026-07-13

## Escopo

- Ampliada a pagina `app-processos.html` para aceitar pesquisa por numero CNJ, nome da parte e CPF.
- Mantida a busca por numero CNJ como caminho publico principal do DataJud/CNJ.
- Nome e CPF entram como chaves governadas, dependentes de conector autorizado de partes.
- CPF deve ser mascarado em resposta, status, auditoria e memoria.
- A Charlie Echo passa a reconhecer as tres chaves e a declarar limite quando a API Publica DataJud nao suportar busca por partes.

## Regras

- Nao inventar resultado processual por nome ou CPF.
- Nao salvar CPF inteiro em memoria permanente.
- Nao registrar CPF inteiro em log publico.
- Nao usar DataJud publico como se ele expusesse dados de partes.
- Conferencia humana e tribunal competente continuam obrigatorios para uso real.

## Fontes oficiais consideradas

- CNJ DataJud Wiki: https://datajud-wiki.cnj.jus.br/api-publica/
- CNJ API Publica DataJud: https://www.cnj.jus.br/sistemas/datajud/api-publica/
- Tutorial CNJ API Publica DataJud: https://www.cnj.jus.br/wp-content/uploads/2023/05/tutorial-api-publica-datajud-beta.pdf
