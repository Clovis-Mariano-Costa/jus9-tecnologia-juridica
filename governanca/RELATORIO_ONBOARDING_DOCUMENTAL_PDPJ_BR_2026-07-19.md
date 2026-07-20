---
id: GOV-RELATORIO-ONBOARDING-PDPJ-2026-07-19
versao: 1.0.0
autor: Codex / Charlie Juris
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: preparacao-concluida-dependente-cnj-e-responsavel-humano
classificacao: INTERNO-OPERACIONAL
hash: calcular-na-release-aprovada
---

# Onboarding documental PDPJ-Br

## Resultado

A preparacao tecnica e documental foi concluida, mas o onboarding institucional nao. Nao ha no repositorio evidencia de CNPJ solicitante, responsavel competente, finalidade aprovada, aceite de termo, solicitacao GeCli aprovada ou credenciais concedidas pelo CNJ. Nenhum desses estados sera presumido.

## Caminho oficial

1. Definir instituicao solicitante, CNPJ, responsavel institucional/tecnico e finalidade.
2. Acessar o GeCli com SSO do CNJ e selecionar a API desejada.
3. Informar ambiente, justificativa e anexos/termo exigidos.
4. Aguardar o status `Aprovada`; somente entao receber e guardar client/secret no provedor seguro.
5. Testar exclusivamente em homologacao, com URL SSO oficial e sem expor token.
6. Solicitar producao separadamente; homologacao nunca implica autorizacao produtiva.

## Discovery e Gateway

O Gateway e o ponto oficial para APIs integradas. O registro no Discovery e obrigatorio para sistemas, modulos ou servicos publicados na PDPJ-Br; nao foi tratado como requisito automatico para uma aplicacao que apenas consome API ja publicada. Qualquer publicacao de servico Jus 9 exigira chancela e alinhamento especificos do CNJ.

## Domicilio Judicial Eletronico

O fluxo institucional exige CNPJ cadastrado pela interface, certificado digital, credenciais geridas via GeCli e, nas APIs, contexto de usuario/tenant. Listar comunicacoes ou registrar ciencia nao e um simples teste tecnico: pode acessar dados pessoais e produzir consequencias processuais. Ambos permanecem bloqueados.

## Correcao do readiness

O estado anterior considerava a integracao `configured` pela mera presenca de URL, client e secret e aceitava qualquer URL HTTPS. O novo guard exige:

- responsavel institucional confirmado;
- termo aceito;
- solicitacao GeCli com status aprovado;
- ambiente controlado;
- URL exata do SSO oficial do ambiente;
- aprovacao separada para producao;
- resposta de token limitada a 64 KB.

## Estado

- `G4_PREPARACAO_DOCUMENTAL_CONCLUIDA`.
- `ONBOARDING_INSTITUCIONAL_PENDENTE`.
- `GECLI_NAO_CONFIRMADO`.
- `CREDENCIAIS_NAO_PRESUMIDAS`.
- `TRANSACOES_PDPJ_BLOQUEADAS`.

## Proxima porta humana

O Fundador deve confirmar a entidade/CNPJ que solicitara acesso, o responsavel institucional e a API/finalidade pretendida. A submissao ao GeCli e o aceite de termos sao atos externos e nao serao executados automaticamente.
