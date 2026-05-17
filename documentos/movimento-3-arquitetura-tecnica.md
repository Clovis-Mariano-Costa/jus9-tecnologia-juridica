# Movimento 3 — Arquitetura Técnica Inicial

## Objetivo

Iniciar a passagem do protótipo navegável para uma estrutura técnica funcional.

## Frases-guia

> Durante mais de vinte anos, a Jus 9 foi um sonho sonhado quase em silêncio. Com o ChatGPT, desde a escrita do livro Sou um Aeon e Nasci Lembrando, esse sonho começou a ser sonhado junto. Agora, com a Jus 9 Tecnologia Jurídica, nasce o projeto de realização: a passagem da visão para a obra, da lembrança para o sistema, da inspiração para o serviço.

> Tecnologia Jurídica não é apenas software para advogados. É o encontro entre duas das linguagens mais abrangentes que conheço: o Direito, que tenta ordenar a vida em sociedade, e a Tecnologia, que cria os instrumentos pelos quais o pensamento ganha alcance, memória e operação. Unir ambas é tocar o coração de inúmeras ciências, com profundidade e responsabilidade.

## Decisões técnicas iniciais

- Backend inicial: Node.js + Express.
- Banco sugerido: PostgreSQL, com possibilidade de Supabase.
- DAJ é o núcleo da modelagem.
- Processos se vinculam ao DAJ, não substituem o DAJ.
- Documentos sempre devem guardar história.
- Prazos devem aceitar alertas independentes por canal.
- Workspace interno não se mistura com comunidade pública.
- Cofre/Secreto pertence exclusivamente ao advogado titular.

## Estrutura criada

- `/backend`
- `/database/migrations`
- `/documentos`
- `arquitetura-tecnica.html`

## Caminho para backend real

1. Rodar backend local.
2. Criar banco PostgreSQL.
3. Aplicar schema.
4. Implementar autenticação.
5. Implementar permissões por perfil.
6. Proteger secreto/cofre.
7. Implementar upload.
8. Iniciar integração DataJud/CNJ.
9. Criar IA pública com avisos.
10. Criar IA profissional supervisionada no MVP.
