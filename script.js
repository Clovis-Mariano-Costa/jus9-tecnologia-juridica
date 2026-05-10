// Jus 9 — scripts consolidados pré-Movimento 2
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
  if(email === 'demo@jus9tecnologia.com.br' && password === 'Jus9MVP#2026'){
    window.location.href = 'app-demo.html';
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


// v1.1 — validação do formulário de envio de obras gratuitas
(function(){
  function onlyDigits(value){ return (value || '').replace(/\D+/g, ''); }
  function formatCpf(value){
    var d = onlyDigits(value).slice(0,11);
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  function formatCep(value){
    var d = onlyDigits(value).slice(0,8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  }
  function validCpf(cpf){
    var str = onlyDigits(cpf);
    if(str.length !== 11 || /^(\d)\1+$/.test(str)) return false;
    var sum = 0, i, rem;
    for(i=1;i<=9;i++) sum += parseInt(str.substring(i-1,i),10) * (11 - i);
    rem = (sum * 10) % 11; if(rem === 10 || rem === 11) rem = 0;
    if(rem !== parseInt(str.substring(9,10),10)) return false;
    sum = 0;
    for(i=1;i<=10;i++) sum += parseInt(str.substring(i-1,i),10) * (12 - i);
    rem = (sum * 10) % 11; if(rem === 10 || rem === 11) rem = 0;
    return rem === parseInt(str.substring(10,11),10);
  }
  function setStatus(msg){
    var el = document.querySelector('[data-form-status]');
    if(el){ el.hidden = false; el.textContent = msg; }
  }
  function markInvalid(el, invalid){ if(el) el.classList.toggle('invalid', !!invalid); }

  var cpf = document.querySelector('[data-cpf]');
  if(cpf){
    cpf.addEventListener('input', function(){ cpf.value = formatCpf(cpf.value); markInvalid(cpf, cpf.value && !validCpf(cpf.value)); });
  }
  var cep = document.querySelector('[data-cep]');
  if(cep){
    cep.addEventListener('input', function(){ cep.value = formatCep(cep.value); });
    cep.addEventListener('blur', function(){
      var d = onlyDigits(cep.value);
      if(d.length !== 8) return;
      fetch('https://viacep.com.br/ws/' + d + '/json/').then(function(r){ return r.json(); }).then(function(data){
        if(data && !data.erro){
          var endereco = document.querySelector('[data-endereco]');
          var cidade = document.querySelector('[data-cidade]');
          var uf = document.querySelector('[data-uf]');
          if(endereco && !endereco.value) endereco.value = [data.logradouro, data.bairro].filter(Boolean).join(' - ');
          if(cidade && !cidade.value) cidade.value = data.localidade || '';
          if(uf && !uf.value) uf.value = data.uf || '';
        }
      }).catch(function(){ /* falha silenciosa: preenchimento manual continua possível */ });
    });
  }

  var form = document.getElementById('obraForm');
  if(!form) return;
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));
    var firstInvalid = null;
    required.forEach(function(el){
      var invalid = false;
      if(el.type === 'checkbox') invalid = !el.checked;
      else if(el.type === 'file') invalid = !el.files || !el.files.length;
      else invalid = !String(el.value || '').trim();
      if(el.type === 'email' && el.value) invalid = !el.checkValidity();
      markInvalid(el, invalid);
      if(invalid && !firstInvalid) firstInvalid = el;
    });
    if(cpf && !validCpf(cpf.value)){ markInvalid(cpf, true); firstInvalid = firstInvalid || cpf; }
    var percentual = form.querySelector('[data-percentual-amostra]');
    if(percentual){
      var pct = parseFloat(String(percentual.value || '').replace(',', '.'));
      var invalidPct = isNaN(pct) || pct < 0 || pct > 100;
      markInvalid(percentual, invalidPct);
      if(invalidPct) firstInvalid = firstInvalid || percentual;
    }
    var pdf = form.querySelector('[data-pdf]');
    var pdfInfo = 'PDF não anexado automaticamente pelo navegador. Anexar manualmente ao e-mail ou informar link privado.';
    if(pdf && pdf.files && pdf.files[0]){
      var file = pdf.files[0];
      if(file.type && file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)){
        markInvalid(pdf, true); firstInvalid = firstInvalid || pdf;
      }
      pdfInfo = 'Arquivo selecionado para conferência: ' + file.name + ' (' + Math.round(file.size/1024/1024*10)/10 + ' MB). Anexar manualmente ao e-mail, pois mailto não transmite arquivos.';
    }
    if(firstInvalid){
      firstInvalid.focus && firstInvalid.focus();
      setStatus('Revise os campos obrigatórios destacados antes de preparar o envio.');
      return false;
    }
    var data = new FormData(form);
    var linhas = [
      'Envio de obra para avaliação — Livros Gratuitos — Jus 9 Tecnologia Jurídica',
      '',
      'DADOS DO AUTOR',
      'Nome completo: ' + data.get('nome'),
      'Nome de autor: ' + (data.get('nomeAutor') || ''),
      'CPF: ' + data.get('cpf'),
      'Data de nascimento: ' + data.get('nascimento'),
      'CEP: ' + data.get('cep'),
      'Endereço: ' + data.get('endereco'),
      'Número / complemento: ' + (data.get('numeroComplemento') || ''),
      'Cidade/UF/País: ' + data.get('cidade') + ' / ' + data.get('uf') + ' / ' + data.get('pais'),
      'E-mail: ' + data.get('email'),
      'Telefone/WhatsApp: ' + data.get('telefone'),
      '',
      'DADOS DA OBRA',
      'Título: ' + data.get('titulo'),
      'Subtítulo: ' + (data.get('subtitulo') || ''),
      'Categoria/gênero: ' + data.get('categoria'),
      'Já foi publicada?: ' + data.get('publicada'),
      'Número aproximado de páginas: ' + (data.get('paginas') || ''),
      'ISBN: ' + (data.get('isbn') || ''),
      'Porcentagem autorizada para amostra gratuita pública: ' + data.get('percentualAmostra') + '%',
      'Orientação sobre a amostra gratuita: ' + (data.get('orientacaoAmostra') || ''),
      'Link para análise: ' + (data.get('linkPdf') || ''),
      'Descrição: ' + data.get('descricao'),
      'PDF: ' + pdfInfo,
      '',
      'DECLARAÇÕES',
      '- Declaro ser autor(a) da obra ou possuir autorização suficiente para disponibilizá-la gratuitamente.',
      '- Declaro que as informações prestadas são verdadeiras e estou ciente de que a falsidade de informações pode gerar responsabilidade civil e criminal.',
      '- Autorizo a Jus 9 Tecnologia Jurídica a avaliar a obra enviada.',
      '- Autorizo que, em caso de aprovação, a porcentagem indicada seja usada como referência para uma amostra gratuita pública, preferencialmente formada por páginas reais e fiéis, com início, meio e fim.',
      '- Em caso de aprovação, aceito tratar separadamente as condições de publicação da obra no portal Livros Gratuitos.',
      '- Estou ciente de que, se a obra for recusada, meus dados pessoais e o arquivo enviado poderão ser excluídos após a análise, conforme aviso inicial.'
    ];
    var subject = 'Envio de obra para avaliação — ' + data.get('titulo');
    var url = 'mailto:livros@aeonprimevo.com.br?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(linhas.join('\n'));
    setStatus('Formulário validado. O e-mail será aberto. Confira a mensagem e anexe o PDF manualmente caso não tenha informado link privado.');
    window.location.href = url;
    return false;
  });
})();
