// Jus 9 - scripts consolidados pre-Movimento 2
(function(){
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.menu');
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

window.jus9DemoLogin = function(form){
  var email = ((form.querySelector('[name="email"]') || {}).value || '').trim().toLowerCase();
  var password = ((form.querySelector('[name="password"]') || {}).value || '');
  var msg = document.querySelector('[data-login-message]');
  var demoRoutes = {
    'demo@jus9tecnologia.com.br': 'app-demo-advogar.html',
    'demo1@jus9tecnologia.com.br': 'app-demo-advogar.html',
    'demo2@jus9tecnologia.com.br': 'app-perfis.html',
    'demo3@jus9tecnologia.com.br': 'app-perfis.html',
    'demo4@jus9tecnologia.com.br': 'app-perfis.html',
    'demo5@jus9tecnologia.com.br': 'app-perfis.html',
    'demo6@jus9tecnologia.com.br': 'pontes-e-parcerias.html',
    'demo7@jus9tecnologia.com.br': 'app-workspace.html',
    'demo8@jus9tecnologia.com.br': 'app-documentos.html',
    'demo9@jus9tecnologia.com.br': 'app-workspace.html',
    'demo10@jus9tecnologia.com.br': 'central-tecnica.html',
    'demo11@jus9tecnologia.com.br': 'app-processos.html',
    'demo12@jus9tecnologia.com.br': 'app-processos.html',
    'demo13@jus9tecnologia.com.br': 'app-documentos.html'
  };
  if(demoRoutes[email] && password === 'Jus9MVP#2026'){
    window.location.href = demoRoutes[email];
    return false;
  }
  if(demoRoutes[email] && password === 'Jus9MVP2026'){
    window.location.href = demoRoutes[email];
    return false;
  }
  if(email === 'demo@jus9tecnologia.com.br' && password === 'Jus9MVP#2026'){
    window.location.href = 'app-demo-advogar.html';
    return false;
  }
  if(msg){
    msg.textContent = 'Acesso demonstrativo: use demo@jus9tecnologia.com.br com a senha Jus9MVP#2026.';
    msg.hidden = false;
  } else {
    alert('Acesso demonstrativo: use demo@jus9tecnologia.com.br com a senha Jus9MVP#2026.');
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
