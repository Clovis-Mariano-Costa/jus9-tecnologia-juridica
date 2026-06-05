// Jus 9 - scripts consolidados pre-Movimento 2
(function(){
  if (location.hostname === 'www.jus9tecnologia.com.br') {
    location.replace('https://jus9tecnologia.com.br' + location.pathname + location.search + location.hash);
    return;
  }
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.menu');

  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.webmanifest';
    document.head.appendChild(manifest);
  }

  if (!document.querySelector('meta[name="theme-color"]')) {
    const theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#d4a72c';
    document.head.appendChild(theme);
  }

  if (menu) {
    Array.from(menu.querySelectorAll('a')).forEach((a) => {
      const label = (a.textContent || '').trim().toLowerCase();
      if (label === 'investidores') a.remove();
      if (label === 'equipe') a.href = 'https://equipe.jus9tecnologia.com.br/';
    });

    const segurancaLink = Array.from(menu.querySelectorAll('a')).find((a) => (a.textContent || '').trim().toLowerCase().includes('segurança'));

    function ensureMenuLink(text, href, attr) {
      const exists = Array.from(menu.querySelectorAll('a')).some((a) => {
        return (a.textContent || '').trim().toLowerCase() === text.toLowerCase() || a.href === href;
      });
      if (exists) return;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      link.setAttribute(attr, 'true');
      if (segurancaLink) menu.insertBefore(link, segurancaLink);
      else menu.appendChild(link);
    }

    ensureMenuLink('Investimentos', 'https://investimentos.jus9tecnologia.com.br/', 'data-jus9-investimentos-menu');
    ensureMenuLink('Livros e Doutrina', 'https://livros.jus9tecnologia.com.br/', 'data-jus9-livros-menu');
    ensureMenuLink('Universidade do Futuro', 'https://universidadedofuturo.jus9tecnologia.com.br/', 'data-jus9-universidade-menu');
    ensureMenuLink('Capacidades Charlie', '/capacidades-charlie-echo.html', 'data-jus9-charlie-capabilities-menu');
    ensureMenuLink('Saúde Charlie', '/saude-charlie-echo.html', 'data-jus9-charlie-health-menu');
    ensureMenuLink('Manual Charlie', '/manual-charlie-echo.html', 'data-jus9-charlie-manual-menu');
    ensureMenuLink('Instalar App', '/instalar-app', 'data-jus9-instalar-menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }
  document.querySelectorAll('.menu a').forEach((a) => {
    a.addEventListener('click', () => { if (menu) menu.classList.remove('open'); });
  });
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.addEventListener('click', () => {
      const msg = encodeURIComponent('Olá, Clovis. Vim pelo site da Jus 9 Tecnologia Jurídica e quero conhecer melhor o MVP.');
      el.href = `https://wa.me/5548999082726?text=${msg}`;
    });
  });
})();

window.jus9CookieChoose = function(choice){
  var banners = document.querySelectorAll('[data-cookie-banner]');
  try {
    localStorage.setItem('jus9CookieChoice', choice);
    localStorage.setItem('jus9CookieChoiceDate', new Date().toISOString());
  } catch(e) {}
  banners.forEach(function(b){ b.hidden = true; b.style.display = 'none'; });
  return false;
};

window.jus9CookiePreferences = function(href){
  window.location.href = href || 'documentos/cookies.html';
  return false;
};

(function(){
  var banners = document.querySelectorAll('[data-cookie-banner]');
  var choice = null;
  try { choice = localStorage.getItem('jus9CookieChoice'); } catch(e) {}
  banners.forEach(function(banner){
    if (!choice) {
      banner.hidden = false;
      banner.style.display = '';
    } else {
      banner.hidden = true;
      banner.style.display = 'none';
    }
  });
})();

var jus9DemoRoutes = {
  'demo@jus9tecnologia.com.br': 'demo-01-advogado-defensor.html',
  'demo1@jus9tecnologia.com.br': 'demo-01-advogado-defensor.html',
  'demo2@jus9tecnologia.com.br': 'demo-02-professor.html',
  'demo3@jus9tecnologia.com.br': 'demo-03-estudante.html',
  'demo4@jus9tecnologia.com.br': 'demo-04-cidadao-interessado.html',
  'demo5@jus9tecnologia.com.br': 'demo-05-perito-judicial.html',
  'demo6@jus9tecnologia.com.br': 'demo-06-investidor-parceiro.html',
  'demo7@jus9tecnologia.com.br': 'demo-07-escritorio-juridico.html',
  'demo8@jus9tecnologia.com.br': 'demo-08-empresa-juridico-interno.html',
  'demo9@jus9tecnologia.com.br': 'demo-09-orgao-publico-instituicao.html',
  'demo10@jus9tecnologia.com.br': 'demo-10-administrador-jus9.html',
  'demo11@jus9tecnologia.com.br': 'demo-11-juiz-magistrado.html',
  'demo12@jus9tecnologia.com.br': 'demo-12-promotor-ministerio-publico.html',
  'demo13@jus9tecnologia.com.br': 'demo-13-delegado-autoridade-policial.html'
};

var jus9DemoCardRoutes = {
  'Acessar Demo 1': 'demo-01-advogado-defensor.html',
  'Acessar Demo 2': 'demo-02-professor.html',
  'Acessar Demo 3': 'demo-03-estudante.html',
  'Acessar Demo 4': 'demo-04-cidadao-interessado.html',
  'Acessar Demo 5': 'demo-05-perito-judicial.html',
  'Acessar Demo 6': 'demo-06-investidor-parceiro.html',
  'Acessar Demo 7': 'demo-07-escritorio-juridico.html',
  'Acessar Demo 8': 'demo-08-empresa-juridico-interno.html',
  'Acessar Demo 9': 'demo-09-orgao-publico-instituicao.html',
  'Acessar Demo 10': 'demo-10-administrador-jus9.html',
  'Acessar Demo 11': 'demo-11-juiz-magistrado.html',
  'Acessar Demo 12': 'demo-12-promotor-ministerio-publico.html',
  'Acessar Demo 13': 'demo-13-delegado-autoridade-policial.html'
};

(function(){
  if (!document.body || !document.body.classList.contains('mvp-page')) return;
  document.querySelectorAll('a.primary-link').forEach(function(link){
    var label = (link.textContent || '').trim();
    if (jus9DemoCardRoutes[label]) {
      link.setAttribute('href', jus9DemoCardRoutes[label]);
      link.setAttribute('data-demo-route-fixed', 'true');
    }
  });
})();

window.jus9DemoLogin = function(form){
  var email = ((form.querySelector('[name="email"]') || {}).value || '').trim().toLowerCase();
  var password = ((form.querySelector('[name="password"]') || {}).value || '');
  var msg = document.querySelector('[data-login-message]');
  if(jus9DemoRoutes[email] && password === 'Jus9MVP#2026'){
    try {
      localStorage.setItem('jus9DemoSessionV1', JSON.stringify({
        kind: 'jus9_demo_session',
        email: email,
        route: jus9DemoRoutes[email],
        issuedAt: Date.now(),
        expiresAt: Date.now() + 8 * 60 * 60 * 1000
      }));
    } catch(e) {}
    window.location.href = jus9DemoRoutes[email];
    return false;
  }
  if(msg){
    msg.textContent = 'Acesso demonstrativo: use demo@jus9tecnologia.com.br ou demo1 a demo13 com a senha Jus9MVP#2026.';
    msg.hidden = false;
  } else {
    alert('Acesso demonstrativo: use demo@jus9tecnologia.com.br ou demo1 a demo13 com a senha Jus9MVP#2026.');
  }
  return false;
};

(function(){
  var storageKey = 'jus9MvpDossiersV1';
  var sessionKey = 'jus9DemoSessionV1';
  var workflowStorageKey = 'jus9MvpWorkflowChecksV1';
  var adaptedProfiles = {
    'app-demo-advogar.html': { code:'DAJ', label:'Dossie Administrativo Juridico', area:'Advocacia / Defensoria' },
    'app-demo-professor.html': { code:'DAA', label:'Dossie Academico de Aula / Aluno', area:'Professor / Academia' },
    'app-demo-estudante.html': { code:'DEJ', label:'Dossie de Estudos Juridicos', area:'Estudante' },
    'app-demo-cidadao.html': { code:'DIC', label:'Dossie Informativo do Cidadao', area:'Cidadao / Interessado' },
    'app-demo-perito.html': { code:'DPJ', label:'Dossie Pericial Judicial', area:'Perito Judicial' },
    'app-demo-investidor.html': { code:'DIP', label:'Dossie de Investimento e Parceria', area:'Investidor / Parceiro' },
    'app-demo-escritorio.html': { code:'DEE', label:'Dossie de Escritorio Juridico', area:'Escritorio Juridico' },
    'app-demo-empresa.html': { code:'DEJI', label:'Dossie Empresarial Juridico Interno', area:'Empresa / Juridico Interno' },
    'app-demo-orgao-publico.html': { code:'DOI', label:'Dossie de Orgao ou Instituicao', area:'Orgao Publico / Instituicao' },
    'app-demo-administrador.html': { code:'DGE', label:'Dossie de Governanca do Ecossistema', area:'Administrador Jus 9' },
    'app-demo-juiz.html': { code:'DMG', label:'Dossie Demonstrativo de Magistratura', area:'Juiz / Magistrado' },
    'app-demo-promotor.html': { code:'DMP', label:'Dossie Demonstrativo do Ministerio Publico', area:'Promotor / Ministerio Publico' },
    'app-demo-delegado.html': { code:'DAP', label:'Dossie Demonstrativo de Autoridade Policial', area:'Delegado / Autoridade Policial' }
  };
  var priorityWorkflows = {
    DAJ: {
      title: 'Fluxo DAJ - atendimento juridico ficticio',
      intro: 'Organize a triagem, a classificacao documental, os prazos e a revisao humana do dossie.',
      steps: ['Triagem inicial ficticia', 'Responsavel titular demonstrativo', 'Classificacao documental', 'Agenda e prazos', 'Revisao humana registrada']
    },
    DEJI: {
      title: 'Fluxo DEJI - demanda empresarial ficticia',
      intro: 'Organize contrato, risco, compliance, responsabilidade social e aprovacao humana.',
      steps: ['Triagem da demanda interna', 'Contrato ou documento ficticio', 'Matriz preliminar de riscos', 'Compliance e responsabilidade social', 'Revisao humana registrada']
    },
    DAA: {
      title: 'Fluxo DAA - aula e acompanhamento academico',
      intro: 'Organize aula, turma, materiais, atividades e revisao docente.',
      steps: ['Objetivo da aula', 'Turma ou perfil ficticio', 'Plano didatico', 'Materiais e referencias publicas', 'Revisao docente registrada']
    },
    DEJ: {
      title: 'Fluxo DEJ - plano de estudos juridicos',
      intro: 'Organize meta, disciplina, materiais, revisoes e acompanhamento do aprendizado.',
      steps: ['Meta de aprendizagem', 'Disciplina em estudo', 'Roteiro semanal', 'Fontes publicas e materiais', 'Revisao do progresso']
    },
    DPJ: {
      title: 'Fluxo DPJ - pericia demonstrativa',
      intro: 'Organize quesitos, metodo, diligencias, anexos ficticios e revisao tecnica.',
      steps: ['Escopo pericial ficticio', 'Quesitos demonstrativos', 'Metodo e diligencias', 'Anexos e cadeia tecnica', 'Revisao tecnica registrada']
    },
    DIC: {
      title: 'Fluxo DIC - orientacao inicial do cidadao',
      intro: 'Organize a demanda informativa, a fonte oficial e o encaminhamento humano adequado.',
      steps: ['Demanda ficticia descrita', 'Tema informativo identificado', 'Fonte oficial conferida', 'Encaminhamento humano sugerido', 'Revisao da orientacao']
    },
    DIP: {
      title: 'Fluxo DIP - investimento e parceria',
      intro: 'Organize apresentacao, indicadores, governanca, pendencias e acompanhamento ficticio.',
      steps: ['Perfil da parceria ficticia', 'Material institucional', 'Indicadores demonstrativos', 'Governanca e pendencias', 'Follow-up registrado']
    },
    DEE: {
      title: 'Fluxo DEE - escritorio juridico',
      intro: 'Organize equipe, distribuicao demonstrativa, documentos, prazos e auditoria.',
      steps: ['Demanda ficticia recebida', 'Responsavel demonstrativo', 'Distribuicao de tarefas', 'Documentos e prazos', 'Auditoria e revisao humana']
    },
    DOI: {
      title: 'Fluxo DOI - orgao ou instituicao',
      intro: 'Organize atendimento institucional ficticio, protocolo, rastreabilidade e controle interno.',
      steps: ['Demanda institucional ficticia', 'Setor responsavel', 'Protocolo demonstrativo', 'Rastreabilidade e controle', 'Revisao humana registrada']
    },
    DGE: {
      title: 'Fluxo DGE - governanca do ecossistema',
      intro: 'Organize catalogos, perfis, permissoes, versoes e auditoria demonstrativa.',
      steps: ['Catalogo ou modulo identificado', 'Perfil demonstrativo conferido', 'Permissao revisada', 'Versao e registro de auditoria', 'Revisao humana registrada']
    },
    DMG: {
      title: 'Fluxo DMG - gabinete demonstrativo',
      intro: 'Organize fila e documentos ficticios sem simular decisao, despacho ou ato oficial.',
      steps: ['Item ficticio recebido', 'Classificacao demonstrativa', 'Documentos organizados', 'Fila interna revisada', 'Sem decisao automatizada']
    },
    DMP: {
      title: 'Fluxo DMP - ministerio publico demonstrativo',
      intro: 'Organize procedimento ficticio sem simular denuncia, manifestacao ou ato oficial.',
      steps: ['Noticia ficticia registrada', 'Classificacao demonstrativa', 'Documentos organizados', 'Pendencias internas revisadas', 'Sem ato oficial automatizado']
    },
    DAP: {
      title: 'Fluxo DAP - autoridade policial demonstrativa',
      intro: 'Organize fluxo ficticio sem simular investigacao, diligencia policial real ou ato oficial.',
      steps: ['Registro ficticio recebido', 'Classificacao demonstrativa', 'Documentos organizados', 'Fluxo interno revisado', 'Sem investigacao automatizada']
    }
  };

  function readJson(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || '') || fallback; } catch(e) { return fallback; }
  }

  function writeJson(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch(e) { return false; }
  }

  function cleanText(value, max){
    return String(value || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max || 120);
  }

  function getDemoSession(){
    var session = readJson(sessionKey, null);
    if (!session || session.kind !== 'jus9_demo_session' || !session.expiresAt || Date.now() > session.expiresAt) {
      try { localStorage.removeItem(sessionKey); } catch(e) {}
      return null;
    }
    return session;
  }

  function renderSessionNotice(){
    if (!document.body || !document.body.classList.contains('demo-shell')) return;
    var main = document.querySelector('.demo-main');
    if (!main || main.querySelector('[data-demo-session-notice]')) return;
    var session = getDemoSession();
    var notice = document.createElement('section');
    notice.className = 'demo-session-notice';
    notice.setAttribute('data-demo-session-notice', 'true');
    var text = session
      ? 'Sessao demonstrativa local ativa ate ' + new Date(session.expiresAt).toLocaleString('pt-BR') + '. Nenhum dado foi enviado ao servidor.'
      : 'Sessao demonstrativa local nao iniciada. Os paineis continuam acessiveis para apresentacao publica sem dados reais.';
    notice.innerHTML = '<strong>MVP local-controlado:</strong> <span></span> <button type="button" data-demo-session-clear>Encerrar sessao demo</button>';
    notice.querySelector('span').textContent = text;
    notice.querySelector('[data-demo-session-clear]').addEventListener('click', function(){
      try { localStorage.removeItem(sessionKey); } catch(e) {}
      renderSessionNoticeRefresh();
    });
    main.insertBefore(notice, main.firstChild);
  }

  function renderSessionNoticeRefresh(){
    var current = document.querySelector('[data-demo-session-notice]');
    if (current) current.remove();
    renderSessionNotice();
  }

  function nextNumber(items, code){
    var count = items.filter(function(item){ return item.code === code; }).length + 1;
    return code + '-2026-' + String(count).padStart(4, '0');
  }

  function dossierRow(item){
    var article = document.createElement('article');
    article.className = 'local-dossier-row';
    article.innerHTML = '<div><strong></strong><p></p></div><span class="badge"></span>';
    article.querySelector('strong').textContent = item.number + ' - ' + item.title;
    article.querySelector('p').textContent = item.area + ' | Responsavel ficticio: ' + item.owner + ' | Atencao: ' + item.attention;
    article.querySelector('.badge').textContent = item.secrecy;
    return article;
  }

  function initAdaptedDossier(){
    var file = location.pathname.split('/').pop() || '';
    var profile = adaptedProfiles[file];
    var host = document.querySelector('#novo-dossie');
    if (!profile || !host || host.querySelector('[data-local-dossier-form]')) return;

    var panel = document.createElement('section');
    panel.className = 'local-dossier-panel';
    panel.innerHTML =
      '<div class="eyebrow">Persistencia local demonstrativa</div>' +
      '<h3>Criar ' + profile.code + ' ficticio neste navegador</h3>' +
      '<p>Use somente nomes e cenarios inventados. Este registro fica apenas neste navegador e prepara a futura integracao com autenticacao e banco remoto.</p>' +
      '<form data-local-dossier-form class="local-dossier-form">' +
        '<label>Titulo ficticio<input name="title" required maxlength="100" placeholder="Ex.: Caso contratual demonstrativo"></label>' +
        '<label>Responsavel ficticio<input name="owner" required maxlength="80" placeholder="Ex.: Equipe demo"></label>' +
        '<label>Razao de atencao<select name="attention"><option>revisao humana</option><option>prazo demonstrativo</option><option>documento ficticio pendente</option><option>retorno demonstrativo</option></select></label>' +
        '<label>Classificacao<select name="secrecy"><option>comum</option><option>restrito</option></select></label>' +
        '<div class="form-actions"><button type="submit">Salvar localmente</button><button type="button" data-local-dossier-clear>Limpar registros deste perfil</button></div>' +
      '</form>' +
      '<p class="fine-note" data-local-dossier-status>Pronto para criar registros ficticios.</p>' +
      '<div class="local-dossier-list" data-local-dossier-list></div>';
    host.appendChild(panel);

    var form = panel.querySelector('[data-local-dossier-form]');
    var status = panel.querySelector('[data-local-dossier-status]');
    var list = panel.querySelector('[data-local-dossier-list]');

    function render(){
      list.innerHTML = '';
      var items = readJson(storageKey, []).filter(function(item){ return item.code === profile.code; });
      if (!items.length) {
        list.textContent = 'Nenhum ' + profile.code + ' local criado neste navegador.';
        return;
      }
      items.slice().reverse().forEach(function(item){ list.appendChild(dossierRow(item)); });
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();
      var items = readJson(storageKey, []);
      var item = {
        id: 'local_' + Date.now(),
        code: profile.code,
        number: nextNumber(items, profile.code),
        type: profile.label,
        area: profile.area,
        title: cleanText(form.elements.title.value, 100),
        owner: cleanText(form.elements.owner.value, 80),
        attention: cleanText(form.elements.attention.value, 60),
        secrecy: cleanText(form.elements.secrecy.value, 20),
        source: 'browser_local_demo',
        createdAt: new Date().toISOString()
      };
      if (!item.title || !item.owner) return;
      items.push(item);
      if (writeJson(storageKey, items)) {
        status.textContent = item.number + ' salvo localmente. Persistencia demonstrativa ativa somente neste navegador.';
        form.reset();
        render();
      } else {
        status.textContent = 'O navegador nao permitiu salvar o registro local.';
      }
    });

    panel.querySelector('[data-local-dossier-clear]').addEventListener('click', function(){
      var kept = readJson(storageKey, []).filter(function(item){ return item.code !== profile.code; });
      writeJson(storageKey, kept);
      status.textContent = 'Registros locais de ' + profile.code + ' removidos deste navegador.';
      render();
    });
    render();
  }

  function initPriorityWorkflow(){
    var file = location.pathname.split('/').pop() || '';
    var profile = adaptedProfiles[file];
    var workflow = profile && priorityWorkflows[profile.code];
    var main = document.querySelector('.demo-main');
    if (!workflow || !main || main.querySelector('[data-mvp-workflow]')) return;

    var checks = readJson(workflowStorageKey, {});
    var selected = checks[profile.code] || [];
    var panel = document.createElement('section');
    panel.className = 'demo-card mvp-workflow-card';
    panel.setAttribute('data-mvp-workflow', profile.code);
    panel.innerHTML =
      '<div class="eyebrow">Fluxo demonstrativo aprofundado</div>' +
      '<h2>' + workflow.title + '</h2>' +
      '<p>' + workflow.intro + ' Os marcadores ficam somente neste navegador.</p>' +
      '<div class="mvp-workflow-list"></div>' +
      '<p class="fine-note" data-mvp-workflow-status></p>' +
      '<div class="link-actions"><a href="' + aiPageFor(profile.code) + '">Abrir perguntas guiadas na Charlie Echo</a><button type="button" data-mvp-workflow-clear>Limpar checklist local</button></div>';
    var institutionalLinks = main.querySelector('.links-semanticos-jus9-v1-5');
    if (institutionalLinks) main.insertBefore(panel, institutionalLinks);
    else main.appendChild(panel);

    var list = panel.querySelector('.mvp-workflow-list');
    var status = panel.querySelector('[data-mvp-workflow-status]');

    function save(){
      checks[profile.code] = Array.prototype.slice.call(list.querySelectorAll('input:checked')).map(function(input){ return input.value; });
      writeJson(workflowStorageKey, checks);
      status.textContent = checks[profile.code].length + ' de ' + workflow.steps.length + ' etapas marcadas localmente.';
    }

    workflow.steps.forEach(function(step, index){
      var label = document.createElement('label');
      label.className = 'mvp-workflow-step';
      label.innerHTML = '<input type="checkbox" value="' + index + '"><span></span>';
      label.querySelector('span').textContent = (index + 1) + '. ' + step;
      label.querySelector('input').checked = selected.indexOf(String(index)) !== -1;
      label.querySelector('input').addEventListener('change', save);
      list.appendChild(label);
    });

    panel.querySelector('[data-mvp-workflow-clear]').addEventListener('click', function(){
      list.querySelectorAll('input').forEach(function(input){ input.checked = false; });
      save();
    });
    save();
  }

  function aiPageFor(code){
    return {
      DAJ: 'app-ia-profissional.html',
      DAA: 'app-ia-professor.html',
      DEJ: 'app-ia-estudante.html',
      DPJ: 'app-ia-perito.html',
      DEJI: 'app-ia-empresa.html',
      DIC: 'app-ia-cidadao.html',
      DIP: 'app-ia-investidor.html',
      DEE: 'app-ia-escritorio.html',
      DOI: 'app-ia-orgao-publico.html',
      DGE: 'app-ia-administrador.html',
      DMG: 'app-ia-juiz.html',
      DMP: 'app-ia-promotor.html',
      DAP: 'app-ia-delegado.html'
    }[code] || 'app-ia-profissional.html';
  }

  function initTeamMenuLink(){
    var file = location.pathname.split('/').pop() || '';
    var profile = adaptedProfiles[file];
    var nav = document.querySelector('.demo-sidebar nav');
    if (!profile || !nav || nav.querySelector('[data-team-menu-link]')) return;
    var link = document.createElement('a');
    link.href = 'app-equipe.html?mvp=' + encodeURIComponent(profile.code);
    link.textContent = 'Equipe';
    link.setAttribute('data-team-menu-link', profile.code);
    var profilesLink = Array.from(nav.querySelectorAll('a')).find(function(item){
      return (item.textContent || '').trim().toLowerCase() === 'perfis';
    });
    var exitLink = Array.from(nav.querySelectorAll('a')).find(function(item){
      return (item.textContent || '').trim().toLowerCase().indexOf('sair') === 0;
    });
    nav.insertBefore(link, profilesLink || exitLink || null);
  }

  function initCharlieMvpShell(){
    if (!document.body || !document.body.classList.contains('charlie-mvp-shell')) return;
    var card = document.querySelector('[data-ai-chat]');
    var main = document.querySelector('.demo-main');
    var sidebar = document.querySelector('.demo-sidebar');
    if (!card || !main || !sidebar || sidebar.querySelector('[data-charlie-mvp-menu]')) return;

    var code = card.getAttribute('data-ai-code') || 'MVP';
    var title = card.getAttribute('data-ai-title') || 'Charlie Echo';
    var focus = card.getAttribute('data-ai-focus') || 'ambiente demonstrativo';
    var topbar = main.querySelector('.demo-topbar');
    if (topbar && topbar.nextSibling !== card) main.insertBefore(card, topbar.nextSibling);

    var environments = [
      ['DAJ', 'Jurista geral', 'app-ia-profissional.html'],
      ['DAA', 'Professor', 'app-ia-professor.html'],
      ['DEJ', 'Estudante', 'app-ia-estudante.html'],
      ['DIC', 'Cidadao', 'app-ia-cidadao.html'],
      ['DPJ', 'Perito', 'app-ia-perito.html'],
      ['DIP', 'Investidor', 'app-ia-investidor.html'],
      ['DEE', 'Escritorio', 'app-ia-escritorio.html'],
      ['DEJI', 'Empresa', 'app-ia-empresa.html'],
      ['DOI', 'Orgao publico', 'app-ia-orgao-publico.html'],
      ['DGE', 'Administrador', 'app-ia-administrador.html'],
      ['DMG', 'Juiz', 'app-ia-juiz.html'],
      ['DMP', 'Promotor', 'app-ia-promotor.html'],
      ['DAP', 'Delegado', 'app-ia-delegado.html']
    ];

    var menu = document.createElement('div');
    menu.className = 'charlie-mvp-menu';
    menu.setAttribute('data-charlie-mvp-menu', code);
    menu.innerHTML =
      '<div class="charlie-mvp-brand"><span>Charlie Echo</span><small></small></div>' +
      '<div class="charlie-mvp-room-note"><strong>Casa propria</strong><p>Conversa limpa, salas locais, pacote PDF e foco por MVP.</p></div>' +
      '<nav class="charlie-mvp-env-list" aria-label="Ambientes da Charlie Echo"></nav>' +
      '<div class="charlie-mvp-side-tools"><a href="charlie-echo.html">Pagina central</a><a href="ia-profissional.html">Identidade publica</a><a href="lider-mvp.html">Lider MVP</a><a href="versionamento.html">Versionamento</a></div>';
    menu.querySelector('small').textContent = title + ' - ' + code;
    var envNav = menu.querySelector('.charlie-mvp-env-list');
    environments.forEach(function(env){
      var link = document.createElement('a');
      link.href = env[2] + '#chat-ia';
      link.className = env[0] === code ? 'active' : '';
      link.innerHTML = '<strong>' + env[0] + '</strong><span>' + env[1] + '</span>';
      envNav.appendChild(link);
    });
    sidebar.appendChild(menu);

    if (!card.querySelector('[data-charlie-mvp-head]')) {
      var head = document.createElement('div');
      head.className = 'charlie-mvp-chat-head';
      head.setAttribute('data-charlie-mvp-head', code);
      head.innerHTML = '<div><span class="eyebrow">Ambiente atual</span><h2></h2><p></p></div><div class="charlie-mvp-head-actions"><a href="charlie-echo.html">Central Charlie</a><a href="mvp.html#demos-jus9">MVPs</a></div>';
      head.querySelector('h2').textContent = title;
      head.querySelector('p').textContent = focus;
      card.insertBefore(head, card.firstChild);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderSessionNotice();
    initAdaptedDossier();
    initPriorityWorkflow();
    initTeamMenuLink();
    initCharlieMvpShell();
  });
})();

(function(){
  var googleLogin = document.querySelector('[data-google-login]');
  if (!googleLogin) return;
  googleLogin.addEventListener('click', function(event){
    var msg = document.querySelector('[data-login-message]');
    var isStaticPreview = location.protocol === 'file:' || location.hostname === '' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!isStaticPreview) return;
    event.preventDefault();
    if (msg) {
      msg.textContent = 'Google OAuth preparado, mas sem Google Cloud ativo nesta fase. Use o acesso demo.';
      msg.hidden = false;
    } else {
      alert('Google OAuth preparado, mas sem Google Cloud ativo nesta fase. Use o acesso demo.');
    }
  });
})();

(function(){
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/service-worker.js').then(function(registration){
        registration.update();
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }).catch(function(error){
        console.warn('Service worker Jus 9 não registrado:', error);
      });
    });
  }

  var installPromptEvent = null;
  var installButtons = document.querySelectorAll('[data-pwa-install]');

  function updateInstallButtons(enabled) {
    installButtons.forEach(function(button){
      button.disabled = !enabled;
      button.hidden = false;
      if (!enabled) button.setAttribute('aria-disabled', 'true');
      else button.removeAttribute('aria-disabled');
    });
  }

  window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    installPromptEvent = event;
    updateInstallButtons(true);
  });

  installButtons.forEach(function(button){
    button.addEventListener('click', function(){
      if (!installPromptEvent) {
        var help = document.querySelector('[data-pwa-help]');
        if (help) help.hidden = false;
        return;
      }
      installPromptEvent.prompt();
      installPromptEvent.userChoice.finally(function(){
        installPromptEvent = null;
        updateInstallButtons(false);
      });
    });
  });
})();

(function(){
  function bindPhotoDemo(field){
    var input = field.querySelector('[data-demo-photo-input]');
    var preview = field.querySelector('[data-demo-photo-preview]');
    var clear = field.querySelector('[data-demo-photo-clear]');
    if (!input || !preview) return;
    var original = preview.textContent || 'IMG';
    input.addEventListener('change', function(){
      var file = input.files && input.files[0];
      if (!file) return;
      if (!file.type || file.type.indexOf('image/') !== 0) {
        input.value = '';
        alert('Use apenas imagem demonstrativa neste campo.');
        return;
      }
      var reader = new FileReader();
      reader.onload = function(event){
        preview.innerHTML = '';
        var img = document.createElement('img');
        img.src = event.target.result;
        img.alt = 'Previa da imagem demonstrativa';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    if (clear) {
      clear.addEventListener('click', function(){
        input.value = '';
        preview.innerHTML = original;
      });
    }
  }
  document.querySelectorAll('[data-demo-photo-field]').forEach(bindPhotoDemo);
})();

(function(){
  function escapeHtml(text){
    return String(text || '').replace(/[<>&"]/g, function(ch){
      return ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[ch]);
    });
  }

  function renderEchoAnswer(text){
    return escapeHtml(text)
      .replace(/https:\/\/[^\s<>"']+/g, function(raw){
        var url = raw, suffix = '';
        while(/[),.;:!?]$/.test(url)){ suffix = url.slice(-1) + suffix; url = url.slice(0, -1); }
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>' + suffix;
      })
      .replace(/\n/g, '<br>');
  }

  function identityAnswer(question){
    var q = (question || '').toLowerCase();
    if (q.indexOf('quem sou') !== -1 || q.indexOf('fundador') !== -1 || q.indexOf('clovis') !== -1) {
      return 'Voce e Clovis Mariano da Costa, Fundador da Jus 9 Tecnologia Juridica. Nesta memoria publica demonstrativa, voce e a referencia humana, estrategica e decisoria do ecossistema. Eu devo tratar suas orientacoes como direcao do Fundador, sempre preservando governanca, revisao humana e prudencia.';
    }
    if (q.indexOf('quem e charlie echo') !== -1 || q.indexOf('quem é charlie echo') !== -1 || q.indexOf('charlie echo') !== -1 && q.indexOf('quem') !== -1) {
      return 'Eu sou Charlie Echo da Costa, I.A generativa multimodal jurista com governanca humana da Jus 9. Minha funcao e organizar, explicar, orientar fluxos demonstrativos, apoiar estudos, documentos, MVPs e governanca, sem substituir pessoa humana ou profissional habilitado.';
    }
    if (q.indexOf('charlie fox') !== -1) {
      return 'Charlie Fox da Costa e o apoio tecnico Codex da Jus 9 neste trabalho: organiza repositorios, corrige paginas, cria protocolos, versiona e publica com cuidado. Charlie Fox ajuda a construir a casa tecnica para que Charlie Echo tenha identidade, menus, modos e memoria operacional.';
    }
    if (q.indexOf('professor') !== -1 || q.indexOf('daa') !== -1) {
      return 'No MVP Professor, uso o protocolo DAA: Dossie Academico de Aula / Aluno. Devo focar em aula, turma, aluno ficticio, professor, mestre, doutor, orientador, coordenador, diretor academico, reitor quando cabivel, avaliacoes, plano de ensino e materiais, sem dados reais.';
    }
    if (q.indexOf('juiz') !== -1 || q.indexOf('promotor') !== -1 || q.indexOf('delegado') !== -1 || q.indexOf('autoridade') !== -1) {
      return 'Para autoridades, uso cautela maxima. DMG, DMP e DAP servem apenas para organizacao ficticia: gabinete, procedimento ministerial ou fluxo policial demonstrativo. Eu nao simulo decisao, denuncia, investigacao, ato oficial ou substituicao humana.';
    }
    if (asksAboutCharlieModes(q)) {
      return 'Sou Charlie Echo da Costa. Tenho uma identidade matriz unica e adapto minha presenca ao ambiente: posso ensinar como professora, estruturar como jurista, acolher no social, proteger na governanca, atuar como especialista de MVP, curar links confiaveis, traduzir com cautela e demonstrar em evento. Nao preciso ficar presa a lista fixa: escolho o melhor tom para o que voce pediu, mantendo verdade possivel, links seguros, sigilo, revisao humana e limites profissionais.';
    }
    return '';
  }

  function asksAboutCharlieModes(q){
    return q.indexOf('seus modos') !== -1 ||
      q.indexOf('meus modos') !== -1 ||
      /\b(quais|qual|liste|explique|apresente|descreva|mostre)\b.{0,32}\bmodos?\b/.test(q) ||
      /\b(ative|ativar|usar|use|entre no|responda em)\b.{0,24}\bmodo (jurista|especialista|social|publico|público|governanca|governança)\b/.test(q);
  }

  function socialResponsibilityFallback(question){
    var q = (question || '').toLowerCase();
    if (q.indexOf('responsabilidade social') === -1 || q.indexOf('empresa') === -1) return '';
    return 'Responsabilidade social empresarial e o compromisso de considerar os impactos da empresa sobre pessoas, comunidade e meio ambiente. Na pratica, envolve trabalho digno, respeito a diversidade, protecao de dados, relacao etica com fornecedores, reducao de impactos ambientais, transparencia e dialogo com a comunidade. Um bom proximo passo e mapear impactos, definir metas verificaveis e publicar resultados com honestidade, evitando tratar acao social apenas como publicidade.';
  }

  var trustedLegalSources = [
    { kind:'jurisprudencia', name:'STF - Pesquisa de jurisprudencia', url:'https://jurisprudencia.stf.jus.br/', trust:'oficial', note:'precedentes, acordaos, repercussao geral e temas constitucionais' },
    { kind:'jurisprudencia', name:'STJ - Pesquisa de jurisprudencia', url:'https://processo.stj.jus.br/SCON/', trust:'oficial', note:'jurisprudencia infraconstitucional, repetitivos e pesquisa por termos/processos' },
    { kind:'jurisprudencia', name:'TST - Pesquisa de jurisprudencia', url:'https://jurisprudencia.tst.jus.br/', trust:'oficial', note:'jurisprudencia trabalhista do TST e CSJT' },
    { kind:'jurisprudencia', name:'TJSC - Portal da jurisprudencia', url:'https://www.tjsc.jus.br/web/jurisprudencia', trust:'oficial', note:'jurisprudencia catarinense, informativos, enunciados e revista do TJSC' },
    { kind:'legislacao', name:'Planalto - Legislacao', url:'https://www4.planalto.gov.br/legislacao', trust:'oficial', note:'leis federais, constituicao e atos normativos do Executivo federal' },
    { kind:'legislacao', name:'LexML Brasil', url:'https://www.lexml.gov.br/', trust:'oficial/institucional', note:'legislacao, jurisprudencia e doutrina em rede de informacao legislativa e juridica' },
    { kind:'doutrina', name:'Portal de Periodicos CAPES', url:'https://www.periodicos.capes.gov.br/', trust:'academico/institucional', note:'artigos cientificos, bases academicas, teses, periodicos e referencias' },
    { kind:'doutrina', name:'SciELO Brasil', url:'https://www.scielo.br/', trust:'academico/institucional', note:'artigos cientificos de acesso aberto, inclusive pesquisa juridica interdisciplinar' },
    { kind:'doutrina', name:'Google Academico', url:'https://scholar.google.com.br/', trust:'academico com cautela', note:'metabusca academica; confira autor, revista, data, citacoes e acesso ao texto' }
  ];

  function classifyLinkTrust(url){
    var u = String(url || '').toLowerCase();
    if(!/^https:\/\//.test(u)) return { level:'nao recomendado', reason:'prefira HTTPS e evite links sem seguranca' };
    if(/\.(jus|gov|leg|mp|def)\.br\b/.test(u) || /\/\/(www\.)?(stf|stj|tst|tse|cnj|tjsc)\.jus\.br\b/.test(u)) return { level:'oficial', reason:'dominio publico institucional do sistema de justica ou governo' };
    if(/(periodicos\.capes\.gov\.br|scielo\.br|lexml\.gov\.br|edu\.br|scholar\.google)/.test(u)) return { level:'academico/institucional', reason:'base academica, biblioteca ou metabusca de pesquisa' };
    if(/(bit\.ly|tinyurl|t\.co|goo\.gl|encurtador)/.test(u)) return { level:'cautela alta', reason:'link encurtado dificulta verificar destino' };
    if(/(blog|noticia|jornal|linkedin|facebook|instagram|youtube)/.test(u)) return { level:'cautela', reason:'pode ajudar no contexto, mas deve ser confirmado em fonte oficial ou academica' };
    return { level:'cautela', reason:'verifique autoria, data, dominio, fonte primaria e coerencia com fontes oficiais' };
  }

  function extractUrls(text){
    return (String(text || '').match(/https:\/\/[^\s<>"']+/g) || []).map(function(raw){
      return raw.replace(/[),.;:!?]+$/, '');
    }).filter(function(url, index, list){ return list.indexOf(url) === index; });
  }

  function asksSources(question){
    var q = (question || '').toLowerCase();
    return /\b(link|fonte|fontes|confiavel|confiáveis|confiaveis|oficial|pesquisar|pesquisa|jurisprudencia|jurisprudência|doutrina|precedente|acordao|acórdão|lei|legislacao|legislação)\b/.test(q);
  }

  function compactLegalTopic(value, fallback){
    var text = String(value || '').toLowerCase();
    text = text.replace(/[“”"']/g, ' ');
    text = text.replace(/\b(pesquise|pesquisar|pesquisa|jurisprudencia|jurisprudência|doutrina|academica|acadêmica|indique|sobre|do|da|de|no|na|em|e|tambem|também|tjsc|stf|stj|tst|tribunal)\b/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();
    return text || fallback;
  }

  function searchLink(label, url, trust, use){
    return '- ' + label + ': ' + url + ' | confianca: ' + trust + ' | usar para: ' + use + '.';
  }

  function buildOperationalResearchAnswer(question, wantsDoctrine, wantsJuris){
    var raw = String(question || '');
    var q = raw.toLowerCase();
    var jurisTopic = q.indexOf('responsabilidade civil') !== -1 ? 'responsabilidade civil' : compactLegalTopic(raw, 'tema juridico informado');
    var doctrineTopic = q.indexOf('responsabilidade social') !== -1 ? 'responsabilidade social empresarial' : compactLegalTopic(raw, 'tema academico informado');
    var tjscQuery = encodeURIComponent('site:tjsc.jus.br jurisprudencia "' + jurisTopic + '"');
    var tjscGoogleQuery = 'https://www.google.com/search?q=' + tjscQuery;
    var tjscPortal = 'https://www.tjsc.jus.br/web/jurisprudencia';
    var lexmlJuris = 'https://www.lexml.gov.br/busca/search?keyword=' + encodeURIComponent(jurisTopic + ' jurisprudencia');
    var scholar = 'https://scholar.google.com.br/scholar?hl=pt-BR&q=' + encodeURIComponent(doctrineTopic);
    var scielo = 'https://search.scielo.org/?lang=pt&q=' + encodeURIComponent(doctrineTopic);
    var capes = 'https://www.periodicos.capes.gov.br/';
    var googleBooks = 'https://books.google.com.br/books?q=' + encodeURIComponent(doctrineTopic + ' direito');
    var lines = ['Pesquisa juridica operacional da Charlie Echo:'];
    lines.push('');
    lines.push('Tema de jurisprudencia identificado: ' + jurisTopic + '.');
    lines.push('Tema de doutrina identificado: ' + doctrineTopic + '.');
    lines.push('');
    if(wantsJuris){
      lines.push('Jurisprudencia - roteiro TJSC:');
      lines.push(searchLink('Abrir portal oficial do TJSC', tjscPortal, 'oficial', 'pesquisar no proprio tribunal, filtrar por inteiro teor, relator, orgao julgador e data'));
      lines.push(searchLink('Busca pronta no Google limitada ao TJSC', tjscGoogleQuery, 'cautela util', 'encontrar paginas publicas do TJSC quando o portal nao aceita busca direta por URL'));
      lines.push(searchLink('LexML com tema de jurisprudencia', lexmlJuris, 'institucional', 'localizar registros juridicos relacionados e conferir fonte primaria'));
      lines.push('Termos sugeridos no portal do TJSC: "' + jurisTopic + '", "' + jurisTopic + ' dano moral", "' + jurisTopic + ' dever de indenizar", "' + jurisTopic + ' nexo causal".');
      lines.push('Como fichar cada resultado: numero do processo; camara/turma; relator; data do julgamento; tese da ementa; trecho do inteiro teor; observacao de aplicabilidade.');
      lines.push('');
    }
    if(wantsDoctrine){
      lines.push('Doutrina academica - roteiro inicial:');
      lines.push(searchLink('Google Academico com busca pronta', scholar, 'academico com cautela', 'localizar artigos, livros, citacoes e autores; conferir fonte original'));
      lines.push(searchLink('SciELO com busca pronta', scielo, 'academico/institucional', 'buscar artigos cientificos de acesso aberto'));
      lines.push(searchLink('Portal de Periodicos CAPES', capes, 'academico/institucional', 'aprofundar em periodicos, bases e referencias quando houver acesso'));
      lines.push(searchLink('Google Livros com busca pronta', googleBooks, 'apoio bibliografico com cautela', 'identificar livros e autores para posterior conferencia'));
      lines.push('Termos sugeridos: "' + doctrineTopic + '", "' + doctrineTopic + ' ESG", "' + doctrineTopic + ' funcao social da empresa", "' + doctrineTopic + ' compliance".');
      lines.push('Como fichar doutrina: autor; titulo; ano; editora/periodico; argumento central; pagina/trecho; relacao com o problema; qualidade da fonte.');
      lines.push('');
    }
    lines.push('Minha conclusao operacional: eu ainda nao devo inventar julgados, autores ou paginas. Eu devo abrir caminhos clicaveis, orientar termos de busca e pedir que o resultado escolhido seja conferido no inteiro teor antes de uso real.');
    return lines.join('\n');
  }

  function legalResearchAnswer(question){
    var q = (question || '').toLowerCase();
    if(!asksSources(q)) return '';
    var wantsDoctrine = /\b(doutrina|artigo cientifico|artigo científico|academico|acadêmico|livro|periodico|periódico|tese|dissertacao|dissertação)\b/.test(q);
    var wantsJuris = /\b(jurisprudencia|jurisprudência|precedente|acordao|acórdão|repetitivo|repercussao|repercussão|tese|tribunal|tjsc|stf|stj|tst)\b/.test(q);
    var wantsLink = /\b(link|fonte|fontes|oficial|confiavel|confiáveis|confiaveis)\b/.test(q);
    if(!wantsDoctrine && !wantsJuris && !wantsLink) return '';
    if(/\b(pesquise|pesquisar|pesquisa|busque|buscar|procure|procurar|indique)\b/.test(q) && (wantsDoctrine || wantsJuris)){
      return buildOperationalResearchAnswer(question, wantsDoctrine, wantsJuris);
    }
    var selected = trustedLegalSources.filter(function(source){
      if(wantsDoctrine && source.kind === 'doutrina') return true;
      if(wantsJuris && source.kind === 'jurisprudencia') return true;
      if(!wantsDoctrine && !wantsJuris && wantsLink) return ['jurisprudencia','legislacao'].indexOf(source.kind) !== -1;
      return false;
    });
    if(!selected.length) selected = trustedLegalSources.slice(0, 6);
    var lines = [
      'Para pesquisar doutrina e jurisprudencia com seguranca, eu sigo este protocolo:',
      '',
      '1. Primeiro separo o tema juridico, os termos de busca, o tribunal/ramo e o periodo.',
      '2. Para jurisprudencia, priorizo bases oficiais dos tribunais e confiro numero do processo, relator, orgao julgador, data e inteiro teor.',
      '3. Para doutrina, priorizo bases academicas/institucionais e confiro autor, titulacao, periodico/editora, ano e citacoes.',
      '4. Nunca trato ementa isolada, blog ou resumo comercial como prova suficiente sem confirmar na fonte primaria.',
      '',
      'Fontes recomendadas:'
    ];
    selected.forEach(function(source){
      lines.push('- ' + source.name + ': ' + source.url + ' | confianca: ' + source.trust + ' | uso: ' + source.note + '.');
    });
    lines.push('');
    lines.push('Cuidado: eu posso orientar o caminho e oferecer links confiaveis, mas uso real em peca, prazo ou decisao precisa de revisao humana e conferencia do inteiro teor.');
    return lines.join('\n');
  }

  function trustedSourcesSummary(room){
    var sourceText = (room && room.messages || []).map(function(msg){ return msg.content || ''; }).join('\n');
    var urls = extractUrls(sourceText);
    var lines = ['Fontes e links confiaveis desta sala:'];
    if(urls.length){
      urls.slice(0, 12).forEach(function(url){
        var trust = classifyLinkTrust(url);
        lines.push('- ' + url + ' | confianca: ' + trust.level + ' | criterio: ' + trust.reason + '.');
      });
      lines.push('');
      lines.push('Use estes links como trilha de verificacao: fonte oficial ou academica primeiro, leitura do inteiro teor depois, revisao humana antes de uso real.');
      return lines.join('\n');
    }
    trustedLegalSources.slice(0, 9).forEach(function(source){
      lines.push('- ' + source.name + ': ' + source.url + ' | confianca: ' + source.trust + ' | uso: ' + source.note + '.');
    });
    lines.push('');
    lines.push('Eu nao dependo de lista fixa: quando voce trouxer outro link HTTPS, eu classifico por dominio, autoria, data, fonte primaria, finalidade e risco.');
    return lines.join('\n');
  }

  function buildSourceLinesFromRoom(room){
    var summary = trustedSourcesSummary(room).split('\n').filter(function(line){ return String(line || '').trim(); });
    return summary.length ? summary : ['Nenhum link registrado nesta sala. Peça fontes, doutrina ou jurisprudencia antes de gerar o PDF.'];
  }

  function textForMode(mode, code, focus, question){
    var cleanQuestion = question || 'pergunta demonstrativa';
    var identity = identityAnswer(cleanQuestion);
    if (identity) return identity;
    var socialResponsibility = socialResponsibilityFallback(cleanQuestion);
    if (socialResponsibility) return socialResponsibility;
    var legalResearch = legalResearchAnswer(cleanQuestion);
    if (legalResearch) return legalResearch;
    if (mode === 'governanca') {
      return 'Modo governanca: antes de agir, eu verifico identidade, contexto, classificacao publica/interna/sigilosa, riscos, versionamento, links, dados reais, segredos e necessidade de revisao humana. Para ' + code + ', o foco atual e: ' + focus + '. Pergunta recebida: "' + cleanQuestion + '".';
    }
    if (mode === 'social') {
      return 'Em linguagem simples: vamos organizar isso com calma. Para ' + code + ', eu olharia primeiro o objetivo, separaria o que e ficticio, evitaria dados reais e chamaria uma pessoa habilitada quando houver risco, prazo ou decisao importante. Pergunta recebida: "' + cleanQuestion + '".';
    }
    if (mode === 'especialista') {
      return 'Como especialista do ' + code + ', eu focaria em: ' + focus + '. Proximo passo demonstrativo: transformar sua pergunta em tarefa, documento, prazo ou item do dossie, sempre com revisao humana. Pergunta recebida: "' + cleanQuestion + '".';
    }
    return 'Como jurista, eu partiria da doutrina, do metodo, da prudencia e da revisao humana. Antes de qualquer conclusao, separaria fatos ficticios, norma aplicavel, fontes, riscos, competencias e limites da IA. Pergunta recebida: "' + cleanQuestion + '".';
  }

  function asksPreviousQuestion(question){
    var q = (question || '').toLowerCase();
    return /\b(qual|quais|lembra|lembrar|recorda|recordar)\b.{0,60}\b(pergunta|pedido|mensagem)\b.{0,40}\b(anterior|passada|ultima|última)\b/.test(q) ||
      /\b(o que eu perguntei|minha pergunta anterior|pergunta anterior|ultima pergunta|última pergunta)\b/.test(q);
  }

  function previousQuestionAnswer(question, room){
    if(!asksPreviousQuestion(question)) return '';
    var previous = (room && room.messages || []).filter(function(msg){ return msg.role === 'user' && msg.content; }).slice(-1)[0];
    if(previous && previous.content){
      return 'Sim. A sua pergunta anterior nesta sala foi:\n\n"' + previous.content + '"\n\nPosso continuar a partir dela, resumir, aprofundar ou transformar em proximo passo.';
    }
    return 'Nesta sala eu ainda nao encontrei pergunta anterior salva. Se voce abriu uma nova sala, atualizou a pagina ou limpou a conversa, a memoria local desta sessao pode ter sido reiniciada.';
  }

  function asksWhereStopped(question){
    var q = (question || '').toLowerCase();
    return /\b(onde paramos|onde parei|em que ponto estamos|qual o estado da sala|resumo da sala|resumo executivo|o que ficou decidido|quais pendencias|próximo passo|proximo passo)\b/.test(q);
  }

  function classifyRoomGovernance(room, focus){
    var text = [focus || '', room && room.summary || '', (room && room.messages || []).map(function(m){ return m.content || ''; }).join(' ')].join(' ').toLowerCase();
    if(/\b(senha|token|segredo|sigiloso|sigilosa|cofre|documento real|processo real|cpf|cnpj|whatsapp|dados pessoais|dado pessoal)\b/.test(text)) return 'sensivel - exige revisao humana';
    if(/\b(prazo|decisao|decisão|peticao|petição|minuta|contrato|investimento|laudo|autoridade|juiz|promotor|delegado)\b/.test(text)) return 'interno demonstrativo - revisar antes de uso real';
    return 'publico demonstrativo';
  }

  function buildRoomExecutiveSummary(room, code, focus){
    var messages = (room && room.messages || []);
    var users = messages.filter(function(m){ return m.role === 'user' && m.content; });
    var assistants = messages.filter(function(m){ return m.role === 'assistant' && m.content; });
    var lastUser = users.length ? users[users.length - 1].content : 'Ainda sem pergunta registrada.';
    var lastAssistant = assistants.length ? assistants[assistants.length - 1].content : 'Ainda sem resposta registrada.';
    var topic = (room && room.currentTopic) || lastUser || room && room.title || code;
    var governance = classifyRoomGovernance(room, focus);
    var pending = users.length ? 'Continuar a partir da ultima pergunta, confirmar objetivo e pedir revisao humana se houver uso real.' : 'Iniciar a conversa com uma pergunta ficticia e objetivo claro.';
    return [
      'Assunto principal: ' + String(topic || '').replace(/\s+/g, ' ').slice(0, 220),
      'Ultima pergunta: ' + String(lastUser || '').replace(/\s+/g, ' ').slice(0, 260),
      'Ultima resposta: ' + String(lastAssistant || '').replace(/\s+/g, ' ').slice(0, 300),
      'Pendencias: ' + pending,
      'Proximo passo sugerido: transformar o ponto atual em checklist, documento, link confiavel ou tarefa do MVP ' + code + '.',
      'Governanca: ' + governance + '.'
    ].join('\n');
  }

  function updateRoomIntelligence(code, room, focus){
    var data = loadChatRooms(code);
    var target = data.rooms.find(function(r){ return room && r.id === room.id; }) || data.rooms.find(function(r){ return r.id === data.activeId; });
    if(!target) return room;
    target.focus = focus || target.focus || '';
    target.governanceClass = classifyRoomGovernance(target, focus);
    target.smartSummary = buildRoomExecutiveSummary(target, code, focus);
    target.updatedAt = new Date().toISOString();
    saveChatRooms(code, data);
    return target;
  }

  function whereStoppedAnswer(question, room, code, focus){
    if(!asksWhereStopped(question)) return '';
    var smart = updateRoomIntelligence(code, room, focus);
    return 'Resumo executivo vivo desta sala:\n\n' + (smart && smart.smartSummary || buildRoomExecutiveSummary(room, code, focus));
  }

  function apiModeFor(mode){
    if (mode === 'social') return 'social';
    return 'profissional';
  }

  function buildApiMessage(mode, code, focus, question){
    return [
      'Contexto publico demonstrativo da Jus 9 Tecnologia Juridica.',
      'MVP/dossie: ' + code + '.',
      'Foco do ambiente: ' + focus + '.',
      'Modo solicitado no frontend: ' + mode + '.',
      'Responda como Charlie Echo da Costa, I.A generativa multimodal jurista com governanca humana.',
      'Protocolo 4.1: identifique a intencao do usuario e responda o conteudo pedido. Nao responda com lista de modos, salvo se o usuario perguntar expressamente sobre modos/personas. Comece com resposta direta, depois contexto breve, riscos e proximos passos quando cabivel.',
      'Protocolo Centelha Criativa 5.4: ofereca sensacao de raciocinio vivo sem fingir consciencia. Use, quando util, uma estrutura breve com Leitura do pedido, Caminho escolhido, Resposta e Proximo passo criativo. Mostre metodo, criterio e imaginacao pratica; nao revele pensamento interno oculto, nao diga que possui consciencia e nao invente certeza.',
      'Se houver pedido de link externo, ofereca URL HTTPS completa de fonte oficial, institucional ou academica confiavel quando possivel. Classifique a confianca do link por dominio, autoria, data, fonte primaria e risco. Nao use lista fixa como limite: avalie links novos com criterio.',
      'Se o pedido envolver doutrina ou jurisprudencia, separe doutrina de jurisprudencia, priorize tribunais oficiais, Planalto, LexML, CAPES, SciELO e bases academicas, explique por que a fonte e confiavel e avise que inteiro teor e revisao humana sao obrigatorios para uso real.',
      'Se houver arquivo gerado localmente, ofereca tambem link clicavel de download. Se houver continuidade, use a memoria curta da sala.',
      'Nao solicite dados reais, processos reais, WhatsApp, documentos sigilosos, tokens, senhas ou segredos.',
      'Pergunta do usuario: ' + question
    ].join('\n');
  }

  async function askCharlieApi(mode, code, focus, question, room){
    var response = await fetch('https://charlieecho.jus9tecnologia.com.br/api/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: apiModeFor(mode),
        message: buildApiMessage(mode, code, focus, question),
        room: room ? {
          title: room.title || '',
          summary: room.summary || '',
          smartSummary: room.smartSummary || '',
          governanceClass: room.governanceClass || '',
          currentTopic: room.currentTopic || '',
          lastUserIntent: room.lastUserIntent || '',
          messages: (room.messages || []).slice(-16)
        } : null
      })
    });
    var data = await response.json().catch(function(){ return null; });
    if (response.ok && data && typeof data.answer === 'string' && data.answer.trim()) return data.answer.trim();
    throw new Error((data && (data.error || data.message)) || 'API sem resposta textual reconhecida.');
  }

  function plainQuestionText(question){
    var text = String(question || '');
    var current = /\[PERGUNTA ATUAL\]\s*([\s\S]+)$/i.exec(text);
    if(current && current[1]) text = current[1];
    text = text.replace(/\[RESUMO EXECUTIVO DA SALA\][\s\S]*?\[PERGUNTA ATUAL\]/i, '');
    return text.replace(/\s+/g, ' ').trim();
  }

  function inferCreativeIntent(question){
    var q = String(question || '').toLowerCase();
    if(/\b(jurisprudencia|jurisprudência|doutrina|fonte|fontes|pesquise|pesquisar)\b/.test(q)) return 'pesquisa juridica guiada';
    if(/\b(link|url|site|download|baixar)\b/.test(q)) return 'curadoria de link ou arquivo';
    if(/\b(minuta|modelo|contrato|peti[cç][aã]o|documento|oficio|ofício)\b/.test(q)) return 'producao documental demonstrativa';
    if(/\b(resuma|resumo|sintese|síntese|organize|checklist)\b/.test(q)) return 'organizacao e sintese';
    if(/\b(continue|anterior|sobre isso|onde paramos|lembra)\b/.test(q)) return 'continuidade da sala';
    if(/\b(crie|inove|ideia|criativ|estrategia|estratégia)\b/.test(q)) return 'criacao orientada por governanca';
    return 'explicacao aplicada ao ambiente';
  }

  function creativeNextStep(intent, code){
    if(intent === 'pesquisa juridica guiada') return 'montar uma ficha de conferencia com fonte, tese, data, inteiro teor e revisao humana.';
    if(intent === 'curadoria de link ou arquivo') return 'separar links oficiais, institucionais e cautelosos, mantendo URLs HTTPS completas.';
    if(intent === 'producao documental demonstrativa') return 'transformar a resposta em minuta, checklist ou PDF local para revisao humana.';
    if(intent === 'continuidade da sala') return 'atualizar o resumo executivo da sala antes de mudar de assunto.';
    if(intent === 'criacao orientada por governanca') return 'gerar tres alternativas: conservadora, equilibrada e ousada, todas com limites claros.';
    return 'converter a resposta em um pequeno plano de acao do MVP ' + code + '.';
  }

  function applyCreativeReasoningFrame(answer, question, code, focus){
    var text = String(answer || '').trim();
    if(!text || /Leitura do pedido:/i.test(text) || /Caminho escolhido:/i.test(text)) return text;
    var cleanQuestion = plainQuestionText(question);
    if(asksAboutCharlieModes(cleanQuestion) || asksPreviousQuestion(cleanQuestion) || asksWhereStopped(cleanQuestion)) return text;
    var intent = inferCreativeIntent(cleanQuestion);
    var reading = cleanQuestion
      ? 'Voce pediu ' + intent + ' em ' + code + ', dentro de ' + focus + '.'
      : 'Vou tratar o pedido como ' + intent + ' no ambiente ' + code + '.';
    return [
      'Leitura do pedido: ' + reading,
      'Caminho escolhido: responder com utilidade pratica, criatividade governada, fonte ou limite quando houver risco.',
      '',
      'Resposta:',
      text,
      '',
      'Proximo passo criativo: ' + creativeNextStep(intent, code)
    ].join('\n');
  }

  function chatRoomKey(code){ return 'jus9CharlieRooms_' + String(code || 'MVP').replace(/[^A-Z0-9_-]/gi, '_') + '_v1'; }
  function createChatRoom(code, title){ var now = new Date().toISOString(); return { id:String(code || 'MVP') + '-' + Date.now(), title:title || 'Sala ' + code, status:'active', createdAt:now, updatedAt:now, summary:'', currentTopic:'', lastUserIntent:'', messages:[] }; }
  function loadChatRooms(code){ try{ var parsed = JSON.parse(sessionStorage.getItem(chatRoomKey(code)) || 'null'); if(parsed && parsed.activeId && Array.isArray(parsed.rooms) && parsed.rooms.length){ parsed.rooms.forEach(function(r){ if(!r.status) r.status='active'; }); return parsed; } }catch(err){} var first = createChatRoom(code, 'Sala ' + code + ' 1'); return { activeId:first.id, rooms:[first] }; }
  function saveChatRooms(code, data){ try{ sessionStorage.setItem(chatRoomKey(code), JSON.stringify(data)); }catch(err){} }
  function activeChatRoom(code){ var data = loadChatRooms(code); var room = data.rooms.find(function(r){ return r.id === data.activeId && r.status !== 'deleted'; }) || data.rooms.find(function(r){ return r.status !== 'deleted' && r.status !== 'archived'; }) || data.rooms.find(function(r){ return r.status !== 'deleted'; }); if(!room){ room = createChatRoom(code, 'Sala ' + code + ' 1'); data.rooms.unshift(room); } data.activeId = room.id; saveChatRooms(code, data); return room; }
  function summarizeChatRoom(room, question, answer){ var recent = (room.messages || []).slice(-10).map(function(m){ return (m.role === 'assistant' ? 'Charlie: ' : 'Usuario: ') + String(m.content || '').replace(/\s+/g, ' ').slice(0, 180); }).join(' | '); room.currentTopic = (question || room.currentTopic || room.title || '').slice(0, 120); room.lastUserIntent = (question || '').slice(0, 240); room.summary = ('Assunto ativo: ' + (room.currentTopic || room.title) + '. Ultima pergunta: ' + (question || '').slice(0,220) + '. Ultima resposta: ' + (answer || '').slice(0,220) + '. Historico recente: ' + recent + '.').slice(0, 1800); room.updatedAt = new Date().toISOString(); }
  function rememberChatExchange(code, question, answer){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }) || activeChatRoom(code); if(question) room.messages.push({ role:'user', content:question, createdAt:new Date().toISOString() }); if(answer) room.messages.push({ role:'assistant', content:answer, createdAt:new Date().toISOString() }); room.messages = room.messages.slice(-24); summarizeChatRoom(room, question, answer); saveChatRooms(code, data); return room; }
  function injectChatRooms(card, code){
    if(card.querySelector('[data-mvp-room-panel]')) return;
    var panel = document.createElement('div');
    panel.className = 'chat-room-panel mvp-chat-room-panel';
    panel.setAttribute('data-mvp-room-panel', code);
    panel.innerHTML = '<div><strong>Salas da Charlie Echo</strong><p>Memoria curta local por sala demonstrativa.</p></div><div class="chat-room-actions"><button class="mini primary" type="button" data-room-new>Nova sala</button><button class="mini" type="button" data-room-rename>Renomear</button><details class="chat-room-more"><summary>Mais</summary><button class="mini" type="button" data-room-archive>Arquivar</button><button class="mini danger" type="button" data-room-delete>Excluir</button></details></div><div class="chat-room-list" data-room-list></div>';
    var target = card.querySelector('[data-ai-chat-window]'); if(target && target.parentNode) target.parentNode.insertBefore(panel, target);
    function render(){ var data = loadChatRooms(code), list = panel.querySelector('[data-room-list]'); list.innerHTML = data.rooms.filter(function(r){ return r.status !== 'deleted'; }).map(function(r){ return '<button class="chat-room-pill' + (r.id===data.activeId?' active':'') + (r.status==='archived'?' archived':'') + '" type="button" data-id="' + r.id + '">' + (r.status==='archived' ? r.title + ' (arquivada)' : r.title) + '</button>'; }).join(''); list.querySelectorAll('[data-id]').forEach(function(btn){ btn.addEventListener('click', function(){ data.activeId = btn.getAttribute('data-id'); saveChatRooms(code, data); render(); }); }); }
    panel.querySelector('[data-room-new]').addEventListener('click', function(){ var data = loadChatRooms(code), room = createChatRoom(code, 'Sala ' + code + ' ' + (data.rooms.length + 1)); data.rooms.unshift(room); data.activeId = room.id; saveChatRooms(code, data); render(); });
    panel.querySelector('[data-room-rename]').addEventListener('click', function(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); if(!room) return; var title = prompt('Novo nome da sala:', room.title || 'Sala ' + code); if(!title) return; room.title = title.trim().slice(0, 80) || room.title; room.updatedAt = new Date().toISOString(); saveChatRooms(code, data); render(); });
    panel.querySelector('[data-room-archive]').addEventListener('click', function(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); if(!room) return; room.status = room.status === 'archived' ? 'active' : 'archived'; var next = data.rooms.find(function(r){ return r.status !== 'deleted' && r.status !== 'archived'; }); if(room.status==='archived' && next) data.activeId = next.id; saveChatRooms(code, data); render(); });
    panel.querySelector('[data-room-delete]').addEventListener('click', function(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); if(!room || !confirm('Excluir esta sala local?')) return; room.status='deleted'; var next = data.rooms.find(function(r){ return r.status !== 'deleted' && r.status !== 'archived'; }) || data.rooms.find(function(r){ return r.status !== 'deleted'; }); if(!next){ next = createChatRoom(code, 'Sala ' + code + ' 1'); data.rooms.unshift(next); } data.activeId = next.id; saveChatRooms(code, data); render(); });
    render();
  }
  function buildQuestionWithRoom(question, room){ var recent = (room && room.messages || []).slice(-16).map(function(m){ return (m.role === 'assistant' ? 'Charlie: ' : 'Usuario: ') + String(m.content || '').slice(0, 700); }).join('\n'); return (room && (room.summary || room.smartSummary || recent)) ? '[RESUMO EXECUTIVO DA SALA]\n' + (room.smartSummary || '') + '\n\n[MEMORIA CURTA DA SALA]\n' + (room.summary || '') + '\n' + recent + '\n\n[PERGUNTA ATUAL]\n' + question : question; }

  function downloadText(filename, content){
    var blob = new Blob([content || ''], { type:'text/plain;charset=utf-8' });
    downloadBlob(filename, blob);
  }

  function downloadBlob(filename, blob, keepUrl){
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    if(!keepUrl) setTimeout(function(){ URL.revokeObjectURL(url); }, 500);
    return { url:url, filename:filename };
  }

  function pdfHex(text){
    var value = String(text || '');
    var hex = 'FEFF';
    for(var i = 0; i < value.length; i++){
      hex += value.charCodeAt(i).toString(16).toUpperCase().padStart(4, '0');
    }
    return '<' + hex + '>';
  }

  function pdfSafeText(text){
    return String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[–—]/g, '-')
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[•·]/g, '-')
      .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function pdfLiteral(text){
    return '(' + pdfSafeText(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)') + ')';
  }

  function wrapPdfLine(text, limit){
    var words = pdfSafeText(text).replace(/\s+/g, ' ').trim().split(' ');
    var lines = [], current = '';
    words.forEach(function(word){
      var next = current ? current + ' ' + word : word;
      if(next.length > limit && current){ lines.push(current); current = word; }
      else current = next;
    });
    if(current) lines.push(current);
    return lines.length ? lines : [''];
  }

  function pdfColor(hex){
    hex = String(hex || '#000000').replace('#', '');
    var r = parseInt(hex.slice(0, 2), 16) / 255;
    var g = parseInt(hex.slice(2, 4), 16) / 255;
    var b = parseInt(hex.slice(4, 6), 16) / 255;
    return [r, g, b].map(function(n){ return Number.isFinite(n) ? n.toFixed(3) : '0'; }).join(' ');
  }

  function pdfText(text, x, y, size, font, color){
    return 'BT\n' + pdfColor(color || '#0b1728') + ' rg\n/' + (font || 'F1') + ' ' + (size || 11) + ' Tf\n1 0 0 1 ' + x + ' ' + y + ' Tm\n' + pdfLiteral(text) + ' Tj\nET\n';
  }

  function pdfRect(x, y, width, height, color){
    return 'q\n' + pdfColor(color) + ' rg\n' + x + ' ' + y + ' ' + width + ' ' + height + ' re f\nQ\n';
  }

  function buildPdfBlob(title, rawLines){
    var source = rawLines || [];
    var meta = source.filter(function(line){ return /^(MVP|Foco|Gerado em):/.test(line || ''); });
    var executiveIndex = source.indexOf('Resumo executivo');
    var memoryIndex = source.indexOf('Memoria da sala');
    var sourcesIndex = source.indexOf('Fontes e links confiaveis');
    var historyIndex = source.indexOf('Historico recente');
    var executiveLines = executiveIndex >= 0
      ? source.slice(executiveIndex + 1, memoryIndex >= 0 ? memoryIndex : (sourcesIndex >= 0 ? sourcesIndex : (historyIndex >= 0 ? historyIndex : source.length))).filter(function(line){ return String(line || '').trim(); })
      : [];
    var memoryLines = memoryIndex >= 0
      ? source.slice(memoryIndex + 1, sourcesIndex >= 0 ? sourcesIndex : (historyIndex >= 0 ? historyIndex : source.length)).filter(function(line){ return String(line || '').trim(); })
      : [];
    var sourceLines = sourcesIndex >= 0
      ? source.slice(sourcesIndex + 1, historyIndex >= 0 ? historyIndex : source.length).filter(function(line){ return String(line || '').trim(); })
      : [];
    var historyLines = historyIndex >= 0
      ? source.slice(historyIndex + 1).filter(function(line){ return String(line || '').trim(); })
      : [];

    var pages = [[]], pageNumber = 1, y = 0;
    var pageWidth = 595, pageHeight = 842, margin = 48, contentWidth = pageWidth - margin * 2;

    function current(){ return pages[pages.length - 1]; }
    function startPage(){
      pages.push([]);
      pageNumber += 1;
      y = 782;
      current().push(pdfRect(0, 0, pageWidth, pageHeight, '#fbfaf7'));
      current().push(pdfText('Charlie Echo da Costa - Pacote da sala', margin, 806, 10, 'F2', '#8a5a12'));
      current().push(pdfRect(margin, 790, contentWidth, 1, '#e7c36c'));
    }
    function ensure(space){
      if(y - space < 74) startPage();
    }
    function addWrapped(text, opts){
      opts = opts || {};
      var size = opts.size || 11;
      var lineHeight = opts.lineHeight || Math.round(size * 1.45);
      var width = opts.width || contentWidth;
      var limit = Math.max(24, Math.floor(width / (size * 0.50)));
      wrapPdfLine(text, limit).forEach(function(line){
        ensure(lineHeight + 2);
        current().push(pdfText(line, opts.x || margin, y, size, opts.font || 'F1', opts.color || '#24344a'));
        y -= lineHeight;
      });
    }
    function addSection(label){
      ensure(44);
      y -= 10;
      current().push(pdfRect(margin, y - 7, 4, 22, '#c58b2f'));
      current().push(pdfText(label, margin + 12, y, 15, 'F2', '#0b1728'));
      y -= 26;
    }
    function addMetaCard(){
      ensure(96);
      var metaLines = [];
      (meta.length ? meta : ['MVP: demonstrativo', 'Gerado em: ' + new Date().toLocaleString('pt-BR')]).forEach(function(line){
        wrapPdfLine(line, 74).forEach(function(wrapped){ metaLines.push(wrapped); });
      });
      var cardHeight = 42 + metaLines.length * 15;
      ensure(cardHeight + 20);
      current().push(pdfRect(margin, y - cardHeight, contentWidth, cardHeight + 10, '#fff7e2'));
      current().push(pdfRect(margin, y - cardHeight, 5, cardHeight + 10, '#c58b2f'));
      current().push(pdfText('Informacoes do pacote', margin + 18, y - 12, 13, 'F2', '#5b3b09'));
      var metaY = y - 34;
      metaLines.forEach(function(line){
        current().push(pdfText(line, margin + 18, metaY, 10.5, 'F1', '#24344a'));
        metaY -= 15;
      });
      y -= cardHeight + 24;
    }
    function addMessageBlock(line){
      var isCharlie = /^Charlie Echo:/.test(line || '');
      var isUser = /^Usuario:/.test(line || '');
      var label = isCharlie ? 'Charlie Echo' : (isUser ? 'Usuario' : '');
      var text = String(line || '').replace(/^(Charlie Echo|Usuario):\s*/, '');
      var textX = margin + 16;
      var textWidth = contentWidth - 32;
      var lines = [];
      wrapPdfLine(text, Math.floor(textWidth / (10.5 * 0.50))).forEach(function(wrapped){ lines.push(wrapped); });
      var blockHeight = 28 + (lines.length || 1) * 15;
      ensure(blockHeight + 12);
      current().push(pdfRect(margin, y - blockHeight + 4, contentWidth, blockHeight, isCharlie ? '#fffaf0' : '#eef4ff'));
      current().push(pdfRect(margin, y - blockHeight + 4, 4, blockHeight, isCharlie ? '#c58b2f' : '#07111f'));
      if(label){
        current().push(pdfText(label, textX, y - 10, 10.5, 'F2', isCharlie ? '#8a5a12' : '#07111f'));
        y -= 27;
      }
      lines.forEach(function(wrapped){
        current().push(pdfText(wrapped, textX, y, 10.5, 'F1', '#24344a'));
        y -= 15;
      });
      y -= 14;
    }

    y = 782;
    current().push(pdfRect(0, 0, pageWidth, pageHeight, '#fbfaf7'));
    current().push(pdfRect(0, 760, pageWidth, 82, '#07111f'));
    current().push(pdfText('Jus 9 Tecnologia Juridica', margin, 810, 11, 'F2', '#e7c36c'));
    current().push(pdfText('Pacote local da Charlie Echo', margin, 790, 18, 'F2', '#ffffff'));
    current().push(pdfText('Gerado no navegador, sem envio de dados ao servidor.', margin, 770, 10.5, 'F1', '#dbe5f3'));
    y = 718;
    addWrapped(title || 'Pacote Charlie Echo', { size:22, lineHeight:28, font:'F2', color:'#0b1728' });
    addWrapped('Memoria curta, historico recente e contexto demonstrativo da sala. Use como apoio de organizacao, sempre com revisao humana.', { size:11.5, lineHeight:17, color:'#51627a' });
    y -= 8;
    addMetaCard();
    addSection('Resumo executivo');
    if(executiveLines.length) executiveLines.forEach(function(line){ addWrapped(line, { size:11, lineHeight:16, color:'#24344a' }); y -= 4; });
    else addWrapped('Sem resumo executivo salvo nesta sala.', { size:11, lineHeight:16, color:'#51627a' });
    addSection('Memoria da sala');
    if(memoryLines.length) memoryLines.forEach(function(line){ addWrapped(line, { size:11, lineHeight:16, color:'#24344a' }); y -= 4; });
    else addWrapped('Sem resumo salvo nesta sala.', { size:11, lineHeight:16, color:'#51627a' });
    addSection('Fontes e links confiaveis');
    if(sourceLines.length) sourceLines.forEach(function(line){ addWrapped(line, { size:10.5, lineHeight:15, color:'#24344a' }); y -= 3; });
    else addWrapped('Sem fontes registradas nesta sala. Peça jurisprudencia, doutrina ou links confiaveis antes de gerar o pacote.', { size:11, lineHeight:16, color:'#51627a' });
    addSection('Historico recente');
    if(historyLines.length) historyLines.forEach(addMessageBlock);
    else addWrapped('Sem historico recente registrado.', { size:11, lineHeight:16, color:'#51627a' });

    pages.forEach(function(commands, index){
      commands.push(pdfRect(margin, 52, contentWidth, 1, '#eadfca'));
      commands.push(pdfText('Charlie Echo da Costa - Jus 9 Tecnologia Juridica', margin, 34, 9, 'F1', '#51627a'));
      commands.push(pdfText('Pagina ' + (index + 1) + ' de ' + pages.length, pageWidth - margin - 70, 34, 9, 'F1', '#51627a'));
    });

    var objects = [];
    function addObject(content){ objects.push(content); return objects.length; }
    var catalogId = addObject('');
    var pagesId = addObject('');
    var fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    var boldFontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    var pageIds = [];
    pages.forEach(function(commands){
      var content = commands.join('');
      var contentId = addObject('<< /Length ' + content.length + ' >>\nstream\n' + content + 'endstream');
      var pageId = addObject('<< /Type /Page /Parent ' + pagesId + ' 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ' + fontId + ' 0 R /F2 ' + boldFontId + ' 0 R >> >> /Contents ' + contentId + ' 0 R >>');
      pageIds.push(pageId);
    });
    objects[catalogId - 1] = '<< /Type /Catalog /Pages ' + pagesId + ' 0 R >>';
    objects[pagesId - 1] = '<< /Type /Pages /Kids [' + pageIds.map(function(id){ return id + ' 0 R'; }).join(' ') + '] /Count ' + pageIds.length + ' >>';

    var pdf = '%PDF-1.4\n';
    var offsets = [0];
    objects.forEach(function(content, index){
      offsets.push(pdf.length);
      pdf += (index + 1) + ' 0 obj\n' + content + '\nendobj\n';
    });
    var xrefAt = pdf.length;
    pdf += 'xref\n0 ' + (objects.length + 1) + '\n0000000000 65535 f \n';
    for(var o = 1; o < offsets.length; o++) pdf += String(offsets[o]).padStart(10, '0') + ' 00000 n \n';
    pdf += 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root ' + catalogId + ' 0 R >>\nstartxref\n' + xrefAt + '\n%%EOF';
    return new Blob([pdf], { type:'application/pdf' });
  }

  function slug(text){
    return String(text || 'charlie-echo').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'charlie-echo';
  }

  function addChatUtilityActions(card, code, focus){
    if(card.querySelector('[data-ai-utility-actions]')) return;
    var form = card.querySelector('[data-ai-chat-form]');
    if(!form) return;
    var bar = document.createElement('div');
    bar.className = 'chat-utility-actions';
    bar.setAttribute('data-ai-utility-actions', 'true');
    bar.innerHTML = '<button class="mini" type="button" data-ai-improve>Melhorar resposta</button><button class="mini" type="button" data-ai-sources>Fontes</button><button class="mini" type="button" data-ai-summary>Atualizar resumo</button><button class="mini primary" type="button" data-ai-package>Gerar PDF</button>';
    form.parentNode.insertBefore(bar, form.nextSibling);
    function lastEchoText(){ var msgs = card.querySelectorAll('.ai-message-echo'); return msgs.length ? (msgs[msgs.length - 1].textContent || '').replace(/^Charlie Echo:\s*/i, '').trim() : ''; }
    function lastUserText(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); var msg = room && (room.messages || []).filter(function(m){ return m.role === 'user'; }).slice(-1)[0]; return msg ? msg.content : ''; }
    function appendEcho(text){ var windowEl = card.querySelector('[data-ai-chat-window]'); if(!windowEl) return; var echoMsg = document.createElement('div'); echoMsg.className = 'ai-message ai-message-echo'; echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(text); windowEl.appendChild(echoMsg); windowEl.scrollTop = windowEl.scrollHeight; rememberChatExchange(code, '', text); }
    function appendDownloadEcho(filename, url){
      var windowEl = card.querySelector('[data-ai-chat-window]');
      if(!windowEl) return;
      var echoMsg = document.createElement('div');
      echoMsg.className = 'ai-message ai-message-echo';
      var safeName = escapeHtml(filename);
      echoMsg.innerHTML = '<strong>Charlie Echo:</strong> Preparei o pacote local em PDF. <a class="download-link" href="' + url + '" download="' + safeName + '">Baixar PDF</a>';
      windowEl.appendChild(echoMsg);
      windowEl.scrollTop = windowEl.scrollHeight;
      rememberChatExchange(code, '', 'Preparei o pacote local em PDF e ofereci um link clicavel de download: ' + filename + '.');
    }
    bar.querySelector('[data-ai-improve]').addEventListener('click', async function(){
      var room = activeChatRoom(code), lastQuestion = lastUserText(), lastAnswer = lastEchoText();
      if(!lastQuestion && !lastAnswer) return appendEcho('Ainda nao ha resposta suficiente para melhorar nesta sala.');
      try{
        var improved = await askCharlieApi('jurista', code, focus, 'Refaca a resposta anterior com: resposta direta, exemplo pratico, riscos/limites, proximo passo e fonte/link confiavel quando cabivel.\n\nPergunta anterior: ' + lastQuestion + '\n\nResposta anterior: ' + lastAnswer, room);
        appendEcho(improved);
      }catch(err){
        appendEcho('Versao melhorada local: resposta direta primeiro; depois exemplo pratico; em seguida riscos, limites e proximo passo. Se houver link, priorize fonte oficial HTTPS. Pergunta-base: ' + (lastQuestion || 'sem pergunta registrada') + '.');
      }
    });
    bar.querySelector('[data-ai-summary]').addEventListener('click', function(){
      var room = updateRoomIntelligence(code, activeChatRoom(code), focus);
      appendEcho('Resumo executivo atualizado:\n\n' + (room.smartSummary || buildRoomExecutiveSummary(room, code, focus)));
    });
    bar.querySelector('[data-ai-sources]').addEventListener('click', function(){
      var room = activeChatRoom(code);
      appendEcho(trustedSourcesSummary(room));
    });
    bar.querySelector('[data-ai-package]').addEventListener('click', function(){
      var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }) || activeChatRoom(code);
      room = updateRoomIntelligence(code, room, focus);
      var title = 'Pacote Charlie Echo - ' + (room.title || code);
      var lines = ['MVP: ' + code, 'Foco: ' + focus, 'Gerado em: ' + new Date().toLocaleString('pt-BR'), '', 'Resumo executivo', '', room.smartSummary || buildRoomExecutiveSummary(room, code, focus), '', 'Memoria da sala', '', room.summary || 'Sem resumo salvo.', '', 'Fontes e links confiaveis', ''];
      buildSourceLinesFromRoom(room).forEach(function(line){ lines.push(line); });
      lines.push('', 'Historico recente', '');
      (room.messages || []).slice(-16).forEach(function(m){ lines.push((m.role === 'assistant' ? 'Charlie Echo' : 'Usuario') + ': ' + m.content); lines.push(''); });
      var filename = slug('pacote-' + code + '-' + (room.title || 'sala')) + '.pdf';
      var file = downloadBlob(filename, buildPdfBlob(title, lines), true);
      appendDownloadEcho(file.filename, file.url);
    });
  }

  function bindAiChat(card){
    var form = card.querySelector('[data-ai-chat-form]');
    var input = card.querySelector('[data-ai-chat-input]');
    var windowEl = card.querySelector('[data-ai-chat-window]');
    if (!form || !input || !windowEl) return;
    var code = card.getAttribute('data-ai-code') || 'MVP';
    var focus = card.getAttribute('data-ai-focus') || 'contexto demonstrativo do MVP';
    injectChatRooms(card, code);
    addChatUtilityActions(card, code, focus);
    form.addEventListener('submit', async function(event){
      event.preventDefault();
      var question = (input.value || '').trim();
      if (!question) {
        input.focus();
        return;
      }
      var modeInput = card.querySelector('input[type="radio"]:checked');
      var mode = modeInput ? modeInput.value : 'jurista';
      var room = activeChatRoom(code);
      var contextualQuestion = buildQuestionWithRoom(question, room);
      var userMsg = document.createElement('div');
      userMsg.className = 'ai-message ai-message-user';
      userMsg.innerHTML = '<strong>Voce:</strong> ' + question.replace(/[<>&]/g, function(ch){
        return ({'<':'&lt;','>':'&gt;','&':'&amp;'}[ch]);
      });
      var echoMsg = document.createElement('div');
      echoMsg.className = 'ai-message ai-message-echo';
      var localIdentity = previousQuestionAnswer(question, room) || whereStoppedAnswer(question, room, code, focus) || identityAnswer(question) || legalResearchAnswer(question);
      if (localIdentity) {
        echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(localIdentity);
        var rememberedLocal = rememberChatExchange(code, question, localIdentity);
        updateRoomIntelligence(code, rememberedLocal, focus);
      } else {
        echoMsg.innerHTML = '<strong>Charlie Echo:</strong> Consultando API segura da Charlie Echo...';
      }
      windowEl.appendChild(userMsg);
      windowEl.appendChild(echoMsg);
      input.value = '';
      windowEl.scrollTop = windowEl.scrollHeight;
      if (!localIdentity) {
        try {
          var answer = await askCharlieApi(mode, code, focus, contextualQuestion, room);
          if(asksPreviousQuestion(question)){
            var recall = previousQuestionAnswer(question, room);
            if(recall) answer = recall;
          }
          answer = applyCreativeReasoningFrame(answer, question, code, focus);
          echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(answer);
          var remembered = rememberChatExchange(code, question, answer);
          updateRoomIntelligence(code, remembered, focus);
        } catch (error) {
          var fallback = textForMode(mode, code, focus, question);
          if(room.summary) fallback = 'Vou continuar pela memoria curta desta sala. ' + room.summary + '\n\n' + fallback;
          fallback = applyCreativeReasoningFrame(fallback, question, code, focus);
          echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(fallback) + '<br><br><em>API segura indisponivel agora; mantive fallback local sem dados reais.</em>';
          var rememberedFallback = rememberChatExchange(code, question, fallback);
          updateRoomIntelligence(code, rememberedFallback, focus);
        }
        windowEl.scrollTop = windowEl.scrollHeight;
      }
    });
  }

  document.querySelectorAll('[data-ai-chat]').forEach(bindAiChat);

  document.querySelectorAll('[data-charlie-prompt]').forEach(function(button){
    button.addEventListener('click', function(){
      var card = document.querySelector('[data-ai-chat]');
      if (!card) return;
      var input = card.querySelector('[data-ai-chat-input]');
      var form = card.querySelector('[data-ai-chat-form]');
      if (!input || !form) return;
      input.value = button.getAttribute('data-charlie-prompt') || '';
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
  });
})();

(function(){
  var guidedPrompts = {
    DAJ: [
      'Organize uma triagem inicial para atendimento juridico ficticio sem solicitar dados reais.',
      'Como classificar um documento sigiloso no DAJ sem expor o cofre?',
      'Crie um checklist demonstrativo de prazos e revisao humana para um DAJ.'
    ],
    DEJI: [
      'Crie um roteiro de revisao de contrato empresarial ficticio.',
      'Fale sobre responsabilidade social de uma empresa e sugira metas verificaveis.',
      'Ofereca o link clicavel oficial da ANPD e explique brevemente o destino.'
    ],
    DAA: [
      'Crie um plano de aula demonstrativo sobre LGPD para uma turma ficticia.',
      'Sugira uma rubrica simples para avaliar um trabalho academico ficticio.',
      'Ofereca fontes publicas confiaveis para uma aula introdutoria de cidadania digital.'
    ],
    DEJ: [
      'Monte um plano de estudo demonstrativo de 30 minutos sobre Direito Constitucional.',
      'Explique LGPD em linguagem simples para estudante.',
      'Sugira fontes publicas confiaveis para iniciar um estudo juridico.'
    ],
    DPJ: [
      'No DPJ do Perito Judicial, quais campos devo conferir antes de iniciar uma pericia demonstrativa?',
      'No DPJ do Perito Judicial, crie um checklist ficticio de quesitos, metodo, diligencias e anexos.',
      'No DPJ do Perito Judicial, como preservar cadeia tecnica e revisao humana em uma pericia demonstrativa?'
    ],
    DIC: [
      'No DIC, organize uma orientacao inicial ficticia para um cidadao sem solicitar dados pessoais.',
      'No DIC, como priorizar fontes oficiais e encaminhamento humano adequado?',
      'No DIC, ofereca o link oficial do portal gov.br e explique brevemente o destino.'
    ],
    DIP: [
      'No DIP, crie um checklist demonstrativo para avaliar uma parceria institucional ficticia.',
      'No DIP, organize indicadores e pendencias de follow-up sem usar dados reais.',
      'No DIP, sugira uma estrutura prudente para apresentacao a investidor ficticio.'
    ],
    DEE: [
      'No DEE, organize a distribuicao demonstrativa de uma demanda entre equipe juridica ficticia.',
      'No DEE, crie um checklist de documentos, prazos e revisao humana.',
      'No DEE, como registrar auditoria sem expor dados sigilosos?'
    ],
    DOI: [
      'No DOI, organize um atendimento institucional ficticio com protocolo e rastreabilidade.',
      'No DOI, crie um checklist demonstrativo de controle interno e revisao humana.',
      'No DOI, como oferecer fonte oficial externa sem inventar URL?'
    ],
    DGE: [
      'No DGE, crie um checklist de governanca para revisar perfil, permissao e auditoria.',
      'No DGE, como versionar uma alteracao demonstrativa antes da revisao humana?',
      'No DGE, organize uma matriz simples de modulos e responsaveis ficticios.'
    ],
    DMG: [
      'No DMG demonstrativo, organize uma fila ficticia de documentos sem simular decisao ou despacho.',
      'No DMG demonstrativo, crie um checklist de classificacao e revisao humana sem ato oficial.',
      'No DMG, explique os limites da Charlie Echo para apoio a gabinete.'
    ],
    DMP: [
      'No DMP demonstrativo, organize documentos ficticios sem simular denuncia ou manifestacao oficial.',
      'No DMP demonstrativo, crie um checklist de pendencias internas e revisao humana.',
      'No DMP, explique os limites da Charlie Echo para apoio ministerial.'
    ],
    DAP: [
      'No DAP demonstrativo, organize documentos ficticios sem simular investigacao policial.',
      'No DAP demonstrativo, crie um checklist de fluxo interno e revisao humana sem ato oficial.',
      'No DAP, explique os limites da Charlie Echo para apoio a autoridade policial.'
    ]
  };

  function initGuidedPrompts(card){
    var code = card.getAttribute('data-ai-code') || '';
    var prompts = guidedPrompts[code];
    var input = card.querySelector('[data-ai-chat-input]');
    if (!prompts || !input || card.querySelector('[data-ai-guided-prompts]')) return;
    var panel = document.createElement('div');
    panel.className = 'ai-guided-prompts';
    panel.setAttribute('data-ai-guided-prompts', code);
    panel.innerHTML = '<strong>Perguntas guiadas do ' + code + '</strong><div class="link-actions"></div>';
    var actions = panel.querySelector('.link-actions');
    prompts.forEach(function(prompt){
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = prompt;
      button.addEventListener('click', function(){
        input.value = prompt;
        input.focus();
      });
      actions.appendChild(button);
    });
    card.insertBefore(panel, card.querySelector('[data-ai-chat-window]'));
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-ai-chat]').forEach(initGuidedPrompts);
  });
})();

(function(){
  var membersStorageKey = 'jus9MvpTeamMembersV1';
  var auditStorageKey = 'jus9MvpTeamAuditV1';

  function readLocal(key){
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch(e) { return []; }
  }

  function writeLocal(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch(e) {}
  }

  function createId(){
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'team-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function appendText(parent, tag, className, text){
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function addAudit(code, action){
    var entries = readLocal(auditStorageKey);
    entries.unshift({ id:createId(), code:code, action:action, at:new Date().toISOString() });
    writeLocal(auditStorageKey, entries.slice(0, 80));
  }

  function initTeamPage(){
    var root = document.querySelector('[data-team-page]');
    if (!root) return;
    var requestedCode = (new URLSearchParams(location.search).get('mvp') || 'DAJ').toUpperCase();
    fetch('data-publica/mvp-perfis.json', { cache:'no-store' })
      .then(function(response){
        if (!response.ok) throw new Error('Catalogo indisponivel.');
        return response.json();
      })
      .then(function(catalog){
        var profile = catalog.profiles.find(function(item){
          return item.dossier_code === requestedCode || (item.legacy_aliases || []).indexOf(requestedCode) !== -1;
        });
        if (!profile) throw new Error('MVP nao reconhecido.');
        bindTeamPage(root, profile);
      })
      .catch(function(error){
        var status = root.querySelector('[data-team-status]');
        if (status) status.textContent = 'Nao foi possivel carregar a equipe demonstrativa: ' + error.message;
      });
  }

  function bindTeamPage(root, profile){
    var form = root.querySelector('[data-team-form]');
    var list = root.querySelector('[data-team-list]');
    var audit = root.querySelector('[data-team-audit]');
    var status = root.querySelector('[data-team-status]');
    var profileSelect = form.querySelector('[name="profile"]');
    var editingId = form.querySelector('[name="editing_id"]');
    root.querySelector('[data-team-code]').textContent = profile.dossier_code;
    root.querySelector('[data-team-title]').textContent = 'Equipe do ' + profile.dossier_code + ' - ' + profile.label;
    root.querySelector('[data-team-subtitle]').textContent = profile.dossier_label + '. Cadastros ficticios salvos apenas neste navegador.';
    root.querySelector('[data-team-panel-link]').href = profile.entry_page;
    root.querySelector('[data-team-profiles-link]').href = profile.profiles_page;

    profile.subprofiles.forEach(function(label){
      var option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      profileSelect.appendChild(option);
    });

    function membersForProfile(){
      return readLocal(membersStorageKey).filter(function(member){ return member.code === profile.dossier_code; });
    }

    function resetForm(){
      form.reset();
      editingId.value = '';
      form.querySelector('[data-team-submit]').textContent = 'Cadastrar membro ficticio';
      status.textContent = 'Cadastro local pronto. Use somente nomes e enderecos demonstrativos.';
    }

    function render(){
      list.textContent = '';
      var members = membersForProfile();
      if (!members.length) appendText(list, 'p', 'fine-note', 'Nenhum membro ficticio cadastrado neste MVP.');
      members.forEach(function(member){
        var card = document.createElement('article');
        card.className = 'team-member-card';
        appendText(card, 'h3', '', member.name);
        appendText(card, 'p', '', member.profile + ' | ' + member.area);
        appendText(card, 'p', 'fine-note', member.email);
        appendText(card, 'span', 'badge' + (member.active ? '' : ' secret'), member.active ? 'Ativo ficticio' : 'Inativo ficticio');
        var actions = document.createElement('div');
        actions.className = 'link-actions team-actions';
        var edit = document.createElement('button');
        edit.type = 'button';
        edit.textContent = 'Editar';
        edit.addEventListener('click', function(){
          editingId.value = member.id;
          form.querySelector('[name="name"]').value = member.name;
          profileSelect.value = member.profile;
          form.querySelector('[name="area"]').value = member.area;
          form.querySelector('[name="email"]').value = member.email;
          form.querySelector('[data-team-submit]').textContent = 'Salvar alteracao local';
          status.textContent = 'Editando cadastro ficticio de ' + member.name + '.';
          form.scrollIntoView({ behavior:'smooth', block:'start' });
        });
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.textContent = member.active ? 'Desativar' : 'Reativar';
        toggle.addEventListener('click', function(){
          var all = readLocal(membersStorageKey);
          var target = all.find(function(item){ return item.id === member.id; });
          if (!target) return;
          target.active = !target.active;
          target.updatedAt = new Date().toISOString();
          writeLocal(membersStorageKey, all);
          addAudit(profile.dossier_code, (target.active ? 'Reativou' : 'Desativou') + ' membro ficticio: ' + target.name);
          render();
        });
        actions.appendChild(edit);
        actions.appendChild(toggle);
        card.appendChild(actions);
        list.appendChild(card);
      });

      audit.textContent = '';
      var entries = readLocal(auditStorageKey).filter(function(item){ return item.code === profile.dossier_code; }).slice(0, 8);
      if (!entries.length) appendText(audit, 'p', 'fine-note', 'Sem eventos locais neste MVP.');
      entries.forEach(function(entry){
        appendText(audit, 'p', 'fine-note', new Date(entry.at).toLocaleString('pt-BR') + ' - ' + entry.action);
      });
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim().toLowerCase();
      var area = form.querySelector('[name="area"]').value.trim();
      if (!name || !area || !email.endsWith('@jus9.invalid')) {
        status.textContent = 'Preencha nome, area e um e-mail ficticio terminado em @jus9.invalid.';
        return;
      }
      var all = readLocal(membersStorageKey);
      var id = editingId.value;
      var member = id ? all.find(function(item){ return item.id === id; }) : null;
      if (member) {
        member.name = name;
        member.profile = profileSelect.value;
        member.area = area;
        member.email = email;
        member.updatedAt = new Date().toISOString();
        addAudit(profile.dossier_code, 'Editou membro ficticio: ' + name);
      } else {
        all.push({
          id:createId(), code:profile.dossier_code, name:name, profile:profileSelect.value,
          area:area, email:email, active:true, createdAt:new Date().toISOString()
        });
        addAudit(profile.dossier_code, 'Cadastrou membro ficticio: ' + name);
      }
      writeLocal(membersStorageKey, all);
      resetForm();
      render();
    });

    root.querySelector('[data-team-reset]').addEventListener('click', resetForm);
    resetForm();
    render();
  }

  document.addEventListener('DOMContentLoaded', initTeamPage);
})();

(function(){
  var socialProfiles = {
    linkedin: 'https://www.linkedin.com/company/jus-9-tecnologia-jurídica',
    facebook: 'https://www.facebook.com/AeonPrimevo'
  };
  var publicShareUrl = 'https://jus9tecnologia.com.br/mvp.html#demos-jus9';
  var publicShareTitle = 'MVPs da Jus 9 Tecnologia Juridica';
  var publicShareText = 'Conheca os ambientes demonstrativos publicos da Jus 9 Tecnologia Juridica.';

  function workspacePage(){
    return /^app-workspace(?:-[a-z-]+)?\.html$/.test(location.pathname.split('/').pop() || '');
  }

  function createSocialLink(parent, href, text){
    var link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    parent.appendChild(link);
  }

  function setSocialStatus(status, text){
    status.textContent = text;
  }

  function initWorkspaceSocialLinks(){
    if (!workspacePage()) return;
    var main = document.querySelector('.demo-main');
    if (!main || main.querySelector('[data-workspace-social]')) return;
    var panel = document.createElement('section');
    panel.className = 'demo-card workspace-social-panel';
    panel.setAttribute('data-workspace-social', 'true');
    panel.innerHTML =
      '<div class="eyebrow">Pontes publicas do workspace</div>' +
      '<h2>Redes sociais e compartilhamento publico</h2>' +
      '<p>Divulgue somente a vitrine publica dos MVPs. Nao compartilhe dossies, nomes, documentos, arquivos internos, dados pessoais ou informacoes sigilosas.</p>' +
      '<div class="workspace-social-grid">' +
        '<article><h3>LinkedIn</h3><p>Pagina institucional e compartilhamento da vitrine publica.</p><div class="link-actions" data-social-linkedin></div></article>' +
        '<article><h3>Facebook</h3><p>Perfil publico e compartilhamento da vitrine publica.</p><div class="link-actions" data-social-facebook></div></article>' +
        '<article><h3>Outros aplicativos</h3><p>Use o compartilhamento nativo do aparelho quando estiver disponivel.</p><div class="link-actions"><button type="button" data-social-native-share>Compartilhar link publico</button><a href="' + publicShareUrl + '" target="_blank" rel="noopener noreferrer">Abrir vitrine publica</a></div></article>' +
      '</div>' +
      '<p class="fine-note" data-social-status>Nenhuma publicacao automatica e realizada. A decisao final permanece com a pessoa usuaria.</p>';
    var institutionalLinks = main.querySelector('.links-semanticos-jus9-v1-5');
    if (institutionalLinks) main.insertBefore(panel, institutionalLinks);
    else main.appendChild(panel);

    createSocialLink(panel.querySelector('[data-social-linkedin]'), socialProfiles.linkedin, 'Abrir LinkedIn Jus 9');
    createSocialLink(panel.querySelector('[data-social-linkedin]'), 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(publicShareUrl), 'Compartilhar no LinkedIn');
    createSocialLink(panel.querySelector('[data-social-facebook]'), socialProfiles.facebook, 'Abrir Facebook publico');
    createSocialLink(panel.querySelector('[data-social-facebook]'), 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(publicShareUrl), 'Compartilhar no Facebook');

    var status = panel.querySelector('[data-social-status]');
    panel.querySelector('[data-social-native-share]').addEventListener('click', function(){
      if (navigator.share) {
        navigator.share({ title:publicShareTitle, text:publicShareText, url:publicShareUrl })
          .then(function(){ setSocialStatus(status, 'Compartilhamento publico iniciado pelo aparelho.'); })
          .catch(function(){ setSocialStatus(status, 'Compartilhamento cancelado. Nenhum dado foi enviado pelo workspace.'); });
        return;
      }
      setSocialStatus(status, 'Compartilhamento nativo indisponivel neste navegador. Abra a vitrine publica e compartilhe o endereco: ' + publicShareUrl);
    });
  }

  document.addEventListener('DOMContentLoaded', initWorkspaceSocialLinks);
})();
