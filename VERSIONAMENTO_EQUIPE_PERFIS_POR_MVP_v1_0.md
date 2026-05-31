# Equipe por MVP - v1.0

Data: 2026-05-31

## Objetivo

Disponibilizar uma tela compartilhada de equipe para os 13 MVPs, mantendo os perfis adequados a cada ambiente demonstrativo.

## Entregas

- item `Equipe` inserido no menu lateral dos 13 painéis;
- rota compartilhada `app-equipe.html?mvp=CODIGO`;
- perfis lidos de `data-publica/mvp-perfis.json`;
- cadastro, edição, desativação e reativação de membros fictícios;
- trilha de auditoria demonstrativa;
- persistência somente no navegador com `localStorage`.

## Limites

A tela não cria usuário real, autenticação real ou autorização de acesso. Não inserir dados pessoais, processos reais, documentos sigilosos, senhas ou segredos.

## Próxima etapa

Quando houver backend autenticado, substituir a persistência local por usuários reais, convites, papéis, permissões, auditoria persistente e revisão humana.
