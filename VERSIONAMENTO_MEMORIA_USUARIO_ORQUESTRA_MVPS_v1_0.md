# Versionamento - Memoria de usuario e orquestra de MVPs v1.0

Data: 2026-07-10

## Objetivo

Criar uma camada configuravel de memoria por usuario e um painel de configuracao por instrumento/MVP dentro da interface da Charlie Echo.

## Entregue no portal

- Memoria do usuario configuravel no painel de configuracoes da Charlie Echo.
- Memoria de sala continua separada da memoria pessoal.
- Painel de instrumento por MVP, com autonomia, Drive/memoria, formato, fontes e notas especificas.
- Cada MVP passa a enviar para a API um bloco proprio: `[MEMORIA DO USUARIO CONFIGURAVEL]` e `[PAINEL DO INSTRUMENTO MVP]`.
- Opcao de sincronizar a memoria no Cartorio Digital Charlie Echo quando o Drive Saver estiver disponivel.
- Exportacao local em JSON e limpeza da memoria pessoal pelo usuario.
- Mensagens internas de configuracao nao sao gravadas na memoria curta da sala.

## Governanca

A memoria configuravel nao deve ser tratada como prova de fato real, segredo, credencial, autorizacao juridica ou permissao para expor dados. Ela serve para calibrar linguagem, continuidade e preferencias do usuario.

O painel do instrumento preserva a ordem operacional da Charlie:

1. Prioritario.
2. Principios e clausulas petreas.
3. Constituicao.
4. Leis internas.
5. Regimentos.
6. Protocolos.

## Replicacao

O modelo foi criado para ser reutilizado em todos os MVPs:

- DAJ Advogados como piloto.
- Demais MVPs com instrumentos independentes.
- Mesma orquestra geral, com calibragem propria por modulo.

## Proximo passo

Consolidar persistencia por login no backend, usando Google Drive / Cartorio Digital Charlie Echo como memoria operacional oficial e mantendo controle do usuario para consultar, editar, exportar e limpar a propria memoria.
