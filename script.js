// Jus 9 - scripts consolidados pre-Movimento 2
(function(){
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.menu');

  if (menu && !menu.querySelector('[data-jus9-investimentos-menu]')) {
    const mvpLink = Array.from(menu.querySelectorAll('a')).find((a) => (a.textContent || '').trim().toLowerCase().includes('mvp'));
    const investimentoLink = document.createElement('a');
    investimentoLink.href = 'https://investimentos.jus9tecnologia.com.br/';
    investimentoLink.textContent = 'Investimentos';
    investimentoLink.setAttribute('data-jus9-investimentos-menu', 'true');

    const investidoresLink = document.createElement('a');
    investidoresLink.href = 'https://investimentos.jus9tecnologia.com.br/web-summit';
    investidoresLink.textContent = 'Investidores';
    investidoresLink.setAttribute('data-jus9-investidores-menu', 'true');

    if (mvpLink && mvpLink.nextSibling) {
      menu.insertBefore(investimentoLink, mvpLink.nextSibling);
      menu.insertBefore(investidoresLink, investimentoLink.nextSibling);
    } else {
      menu.appendChild(investimentoLink);
      menu.appendChild(investidoresLink);
    }
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
  var googleLogin = document.querySelector('[data-google-login]');
  if (!googleLogin) return;
  googleLogin.addEventListener('click', function(event){
    var msg = document.querySelector('[data-login-message]');
    var isStaticPreview = location.protocol === 'file:' || location.hostname === '' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!isStaticPreview) return;
    event.preventDefault();
    if (msg) {
      msg.textContent = 'Login Google preparado para a rota /auth/google/start. No preview local, falta conectar o backend OAuth.';
      msg.hidden = false;
    } else {
      alert('Login Google preparado para a rota /auth/google/start. No preview local, falta conectar o backend OAuth.');
    }
  });
})();
