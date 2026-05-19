(function(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }

  var promptEvent = null;
  window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    promptEvent = event;
    document.querySelectorAll('[data-install-app]').forEach(function(button){
      button.hidden = false;
      button.disabled = false;
    });
  });

  document.addEventListener('click', function(event){
    var button = event.target.closest('[data-install-app]');
    if(!button) return;
    if(!promptEvent){
      button.textContent = 'Use Adicionar a tela inicial no navegador';
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.finally(function(){
      promptEvent = null;
      button.hidden = true;
    });
  });
})();
