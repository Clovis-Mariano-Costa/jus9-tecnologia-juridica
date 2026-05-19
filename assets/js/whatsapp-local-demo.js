(function(){
  function parseWhatsApp(text){
    var lines = String(text || '').split(/\r?\n/);
    var messagePattern = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2})(?:\s+-|\s–)\s([^:]+):\s([\s\S]*)$/;
    var messages = [];
    var current = null;
    lines.forEach(function(line){
      var match = line.match(messagePattern);
      if(match){
        current = { date: match[1], time: match[2], sender: match[3].trim(), text: match[4] || '' };
        messages.push(current);
      } else if(current && line.trim()){
        current.text += '\n' + line;
      }
    });
    var senders = {};
    var attachments = 0;
    messages.forEach(function(message){
      senders[message.sender] = (senders[message.sender] || 0) + 1;
      if(/\.(opus|jpg|jpeg|png|webp|mp4|pdf|vcf)|anexado|omitted|mídia|media/i.test(message.text)) attachments++;
    });
    return { messages: messages.length, senders: senders, attachments: attachments };
  }

  document.addEventListener('change', function(event){
    var input = event.target.closest('[data-whatsapp-local-file]');
    if(!input || !input.files || !input.files[0]) return;
    var output = document.querySelector('[data-whatsapp-local-output]');
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(){
      var parsed = parseWhatsApp(reader.result);
      var senderList = Object.keys(parsed.senders).map(function(sender){
        return '<li><strong>' + sender.replace(/[&<>]/g, '') + '</strong>: ' + parsed.senders[sender] + ' mensagens</li>';
      }).join('');
      if(output){
        output.innerHTML = '<h3>Resumo local, sem upload</h3><p>Mensagens detectadas: <strong>' + parsed.messages + '</strong></p><p>Anexos ou mídias citadas: <strong>' + parsed.attachments + '</strong></p><ul>' + senderList + '</ul><p class="small">Este resumo ficou apenas no navegador. Não use dados reais no MVP público.</p>';
      }
    };
    reader.readAsText(file);
  });
})();
