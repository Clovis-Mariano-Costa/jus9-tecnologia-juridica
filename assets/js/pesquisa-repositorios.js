(function () {
  'use strict';

  const form = document.querySelector('[data-repository-search-form]');
  const input = document.querySelector('[data-repository-search-input]');
  const visibility = document.querySelector('[data-repository-visibility]');
  const results = document.querySelector('[data-repository-results]');
  const summary = document.querySelector('[data-repository-summary]');
  const githubSearch = document.querySelector('[data-github-search]');
  const owner = 'Clovis-Mariano-Costa';
  let catalog = [];

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function githubRepositoryUrl(name) {
    return `https://github.com/${owner}/${encodeURIComponent(name)}`;
  }

  function updateGithubSearch(query) {
    const value = String(query || '').trim();
    githubSearch.href = `https://github.com/search?q=${encodeURIComponent(`user:${owner} ${value}`.trim())}&type=code`;
    githubSearch.setAttribute('aria-label', value ? `Pesquisar ${value} no GitHub` : 'Abrir pesquisa dos repositorios no GitHub');
  }

  function render() {
    const query = normalize(input.value);
    const visibilityFilter = visibility.value;
    const filtered = catalog.filter((repo) => {
      const matchesText = !query || normalize(`${repo.name} ${repo.category}`).includes(query);
      const matchesVisibility = visibilityFilter === 'all' || repo.visibility === visibilityFilter;
      return matchesText && matchesVisibility;
    });

    summary.textContent = `${filtered.length} de ${catalog.length} repositorios no catalogo governado.`;
    results.replaceChildren(...filtered.map((repo) => {
      const article = document.createElement('article');
      article.className = 'repository-card';
      const title = document.createElement('h2');
      title.textContent = repo.name;
      const meta = document.createElement('p');
      meta.className = 'repository-meta';
      meta.textContent = `${repo.category} · ${repo.visibility === 'public' ? 'publico' : 'acesso restrito'}`;
      const link = document.createElement('a');
      link.href = githubRepositoryUrl(repo.name);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = repo.visibility === 'public' ? 'Abrir repositorio' : 'Abrir no GitHub conforme permissao';
      article.append(title, meta, link);
      if (String(input.value || '').trim()) {
        const codeSearch = document.createElement('a');
        codeSearch.href = `https://github.com/search?q=${encodeURIComponent(`repo:${owner}/${repo.name} ${input.value.trim()}`)}&type=code`;
        codeSearch.target = '_blank';
        codeSearch.rel = 'noopener noreferrer';
        codeSearch.textContent = 'Pesquisar este termo neste repositorio';
        article.append(codeSearch);
      }
      return article;
    }));
    updateGithubSearch(input.value);
  }

  fetch('data-publica/repositorios-jus9.json', { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw new Error('catalogo indisponivel');
      return response.json();
    })
    .then((data) => {
      catalog = Array.isArray(data.repositories) ? data.repositories : [];
      render();
    })
    .catch(() => {
      summary.textContent = 'Catalogo temporariamente indisponivel. Use a pesquisa direta no GitHub.';
      updateGithubSearch(input.value);
    });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    render();
  });
  input.addEventListener('input', render);
  visibility.addEventListener('change', render);
  updateGithubSearch('');
}());
