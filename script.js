// Jus 9 - scripts consolidados pre-Movimento 2
(function(){
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

    const instalarLink = document.createElement('a');
    instalarLink.href = '/instalar-app';
    instalarLink.textContent = 'Instalar App';
    instalarLink.setAttribute('data-jus9-instalar-menu', 'true');

    if (mvpLink && mvpLink.nextSibling) {
      menu.insertBefore(investimentoLink, mvpLink.nextSibling);
      menu.insertBefore(investidoresLink, investimentoLink.nextSibling);
      menu.insertBefore(instalarLink, investidoresLink.nextSibling);
    } else {
      menu.appendChild(investimentoLink);
      menu.appendChild(investidoresLink);
      menu.appendChild(instalarLink);
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
  function textForMode(mode, code, focus, question){
    var cleanQuestion = question || 'pergunta demonstrativa';
    if (mode === 'social') {
      return 'Em linguagem simples: vamos organizar isso com calma. Para ' + code + ', eu olharia primeiro o objetivo, separaria o que e ficticio, evitaria dados reais e chamaria uma pessoa habilitada quando houver risco, prazo ou decisao importante. Pergunta recebida: "' + cleanQuestion + '".';
    }
    if (mode === 'especialista') {
      return 'Como especialista do ' + code + ', eu focaria em: ' + focus + '. Proximo passo demonstrativo: transformar sua pergunta em tarefa, documento, prazo ou item do dossie, sempre com revisao humana. Pergunta recebida: "' + cleanQuestion + '".';
    }
    return 'Como jurista, eu partiria da doutrina, do metodo, da prudencia e da revisao humana. Antes de qualquer conclusao, separaria fatos ficticios, norma aplicavel, fontes, riscos, competencias e limites da IA. Pergunta recebida: "' + cleanQuestion + '".';
  }

  function bindAiChat(card){
    var form = card.querySelector('[data-ai-chat-form]');
    var input = card.querySelector('[data-ai-chat-input]');
    var windowEl = card.querySelector('[data-ai-chat-window]');
    if (!form || !input || !windowEl) return;
    var code = card.getAttribute('data-ai-code') || 'MVP';
    var focus = card.getAttribute('data-ai-focus') || 'contexto demonstrativo do MVP';
    form.addEventListener('submit', function(event){
      event.preventDefault();
      var question = (input.value || '').trim();
      if (!question) {
        input.focus();
        return;
      }
      var modeInput = card.querySelector('input[type="radio"]:checked');
      var mode = modeInput ? modeInput.value : 'jurista';
      var userMsg = document.createElement('div');
      userMsg.className = 'ai-message ai-message-user';
      userMsg.innerHTML = '<strong>Voce:</strong> ' + question.replace(/[<>&]/g, function(ch){
        return ({'<':'&lt;','>':'&gt;','&':'&amp;'}[ch]);
      });
      var echoMsg = document.createElement('div');
      echoMsg.className = 'ai-message ai-message-echo';
      echoMsg.innerHTML = '<strong>Charlie Echo:</strong> ' + textForMode(mode, code, focus, question);
      windowEl.appendChild(userMsg);
      windowEl.appendChild(echoMsg);
      input.value = '';
      windowEl.scrollTop = windowEl.scrollHeight;
    });
  }

  document.querySelectorAll('[data-ai-chat]').forEach(bindAiChat);
})();
