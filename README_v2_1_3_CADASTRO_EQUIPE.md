# Jus 9 Tecnologia Jurídica — v2.1.3 Cadastro de Equipe no MVP

## Objetivo da revisão

Atender à orientação de alterar, dentro do MVP, a seção **Cadastros** para **Cadastro de Equipe**, fazendo com que o acesso leve diretamente a um formulário de cadastro interno.

## Alterações realizadas

- Renomeada a navegação interna do MVP de **Cadastros** para **Cadastro de Equipe**.
- Recriada a página `app-cadastro.html` como formulário direto de cadastro de equipe.
- Incluídos campos para:
  - foto pessoal/profissional;
  - nome completo;
  - CPF;
  - e-mail profissional;
  - telefone/WhatsApp;
  - perfil de atuação;
  - status inicial;
  - OAB ou matrícula interna;
  - advogado líder responsável;
  - permissões delegadas;
  - vínculo com arquivo de fotos do Workspace;
  - visibilidade da foto.
- Incluída observação de auditoria obrigatória para salvar quem cadastrou, data, hora, permissões, foto enviada, vínculo com Workspace e aceite do aviso de responsabilidade.
- Atualizado `app-workspace.html` com a seção `#arquivo-fotos-equipe`, ligada ao Cadastro de Equipe.
- Mantida a distinção operacional: abertura de DAJ é cadastro inicial do cliente; Cadastro de Equipe é cadastro interno do escritório.

## Arquivos alterados

- `jus9-tecnologia-juridica/app-cadastro.html`
- `jus9-tecnologia-juridica/app-workspace.html`
- Navegação interna dos arquivos `app-*.html`
- `jus9-tecnologia-juridica/mvp.html`
- `jus9-tecnologia-juridica/README.md`
- `jus9-tecnologia-juridica/versionamento.html`

## Observação técnica

Esta etapa ainda é demonstrativa e estática. Em versão com backend, o upload de foto deverá gravar arquivo/URL em armazenamento seguro, vincular a imagem ao perfil da equipe, registrar logs de auditoria e respeitar permissões definidas pelo advogado líder.
