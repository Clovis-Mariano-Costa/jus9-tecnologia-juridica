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

  document.addEventListener('DOMContentLoaded', function(){
    renderSessionNotice();
    initAdaptedDossier();
    initPriorityWorkflow();
    initTeamMenuLink();
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
      navigator.serviceWorker.register('/service-worker.js').catch(function(error){
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

  function textForMode(mode, code, focus, question){
    var cleanQuestion = question || 'pergunta demonstrativa';
    var identity = identityAnswer(cleanQuestion);
    if (identity) return identity;
    var socialResponsibility = socialResponsibilityFallback(cleanQuestion);
    if (socialResponsibility) return socialResponsibility;
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
      'Se houver pedido de link, ofereca URL HTTPS completa de fonte oficial ou institucional confiavel quando possivel. Se houver continuidade, use a memoria curta da sala.',
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
    panel.innerHTML = '<div><strong>Salas da Charlie Echo</strong><p>Memoria curta local por sala demonstrativa.</p></div><div class="chat-room-actions"><button class="mini primary" type="button" data-room-new>Nova sala</button><button class="mini" type="button" data-room-archive>Arquivar</button><button class="mini" type="button" data-room-delete>Excluir</button></div><div class="chat-room-list" data-room-list></div>';
    var target = card.querySelector('[data-ai-chat-window]'); if(target) card.insertBefore(panel, target);
    function render(){ var data = loadChatRooms(code), list = panel.querySelector('[data-room-list]'); list.innerHTML = data.rooms.filter(function(r){ return r.status !== 'deleted'; }).map(function(r){ return '<button class="chat-room-pill' + (r.id===data.activeId?' active':'') + (r.status==='archived'?' archived':'') + '" type="button" data-id="' + r.id + '">' + (r.status==='archived' ? r.title + ' (arquivada)' : r.title) + '</button>'; }).join(''); list.querySelectorAll('[data-id]').forEach(function(btn){ btn.addEventListener('click', function(){ data.activeId = btn.getAttribute('data-id'); saveChatRooms(code, data); render(); }); }); }
    panel.querySelector('[data-room-new]').addEventListener('click', function(){ var data = loadChatRooms(code), room = createChatRoom(code, 'Sala ' + code + ' ' + (data.rooms.length + 1)); data.rooms.unshift(room); data.activeId = room.id; saveChatRooms(code, data); render(); });
    panel.querySelector('[data-room-archive]').addEventListener('click', function(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); if(!room) return; room.status = room.status === 'archived' ? 'active' : 'archived'; var next = data.rooms.find(function(r){ return r.status !== 'deleted' && r.status !== 'archived'; }); if(room.status==='archived' && next) data.activeId = next.id; saveChatRooms(code, data); render(); });
    panel.querySelector('[data-room-delete]').addEventListener('click', function(){ var data = loadChatRooms(code), room = data.rooms.find(function(r){ return r.id === data.activeId; }); if(!room || !confirm('Excluir esta sala local?')) return; room.status='deleted'; var next = data.rooms.find(function(r){ return r.status !== 'deleted' && r.status !== 'archived'; }) || data.rooms.find(function(r){ return r.status !== 'deleted'; }); if(!next){ next = createChatRoom(code, 'Sala ' + code + ' 1'); data.rooms.unshift(next); } data.activeId = next.id; saveChatRooms(code, data); render(); });
    render();
  }
  function buildQuestionWithRoom(question, room){ var recent = (room && room.messages || []).slice(-16).map(function(m){ return (m.role === 'assistant' ? 'Charlie: ' : 'Usuario: ') + String(m.content || '').slice(0, 700); }).join('\n'); return (room && (room.summary || recent)) ? '[MEMORIA CURTA DA SALA]\n' + (room.summary || '') + '\n' + recent + '\n\n[PERGUNTA ATUAL]\n' + question : question; }

  function bindAiChat(card){
    var form = card.querySelector('[data-ai-chat-form]');
    var input = card.querySelector('[data-ai-chat-input]');
    var windowEl = card.querySelector('[data-ai-chat-window]');
    if (!form || !input || !windowEl) return;
    var code = card.getAttribute('data-ai-code') || 'MVP';
    var focus = card.getAttribute('data-ai-focus') || 'contexto demonstrativo do MVP';
    injectChatRooms(card, code);
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
      var localIdentity = identityAnswer(question);
      if (localIdentity) {
        echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(localIdentity);
        rememberChatExchange(code, question, localIdentity);
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
          echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(answer);
          rememberChatExchange(code, question, answer);
        } catch (error) {
          var fallback = textForMode(mode, code, focus, question);
          if(room.summary) fallback = 'Vou continuar pela memoria curta desta sala. ' + room.summary + '\n\n' + fallback;
          echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + renderEchoAnswer(fallback) + '<br><br><em>API segura indisponivel agora; mantive fallback local sem dados reais.</em>';
          rememberChatExchange(code, question, fallback);
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
