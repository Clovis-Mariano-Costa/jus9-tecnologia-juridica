(function () {
  'use strict';

  var form = document.querySelector('[data-daj-intake-form]');
  if (!form) return;

  var saveButton = form.querySelector('[data-save-daj]');
  var analysisButton = form.querySelector('[data-send-daj-analysis]');
  var statusBox = form.querySelector('[data-daj-save-status]');
  var dajNumber = document.querySelector('[data-daj-number]');
  var dajState = document.querySelector('[data-daj-state]');
  var cpfInput = form.elements.cpf;
  var pendingIdempotencyKey = '';

  function value(name) {
    var control = form.elements[name];
    return control ? String(control.value || '').trim() : '';
  }

  function fileCount(name) {
    var control = form.elements[name];
    return control && control.files ? control.files.length : 0;
  }

  function createIdempotencyKey() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return 'daj-intake-' + window.crypto.randomUUID();
    }
    var random = Math.random().toString(36).slice(2);
    return 'daj-intake-' + Date.now().toString(36) + '-' + random;
  }

  function setStatus(message, state) {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.dataset.state = state || 'info';
    statusBox.textContent = message;
  }

  function errorMessage(data, status) {
    var error = data && data.error;
    if (status === 401) return 'Sessao obrigatoria. Entre com um perfil autorizado antes de criar o DAJ.';
    if (status === 403) return 'Seu perfil nao possui permissao para criar ou atualizar DAJ.';
    if (error === 'cpf_invalido') return 'CPF invalido. Confira o numero completo; a Jus 9 nao completa nem deduz documentos.';
    if (error === 'nome_parte_obrigatorio') return 'Informe o nome completo da parte.';
    if (error === 'indice_cpf_exato_configuracao_pendente') return 'Indice exato de CPF indisponivel. O DAJ nao foi salvo parcialmente.';
    if (error === 'idempotency_key_reutilizada_com_payload_diferente') return 'A operacao anterior ficou inconclusiva. Reenvie o formulario para iniciar uma nova gravacao segura.';
    if (error === 'daj_registry_configuracao_pendente') return 'Cadastro oficial de DAJ ainda nao esta configurado.';
    return 'Nao foi possivel salvar o DAJ. Nenhum resultado foi presumido.';
  }

  function payload() {
    var savedDajId = String(form.dataset.savedDajId || '').trim();
    return {
      dajId: savedDajId,
      partyName: value('partyName'),
      cpf: value('cpf'),
      contact: value('contact'),
      area: value('area'),
      urgency: value('urgency'),
      attentionReason: value('attentionReason'),
      secrecyLevel: value('secrecyLevel'),
      caseSummary: value('caseSummary'),
      documentsMentioned: value('documentsMentioned'),
      attachmentsPendingCount: fileCount('documents') + fileCount('media') + fileCount('recordingConsent'),
      title: savedDajId ? '' : 'Atendimento inicial governado'
    };
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var isUpdate = Boolean(form.dataset.savedDajId);
    if (!pendingIdempotencyKey) pendingIdempotencyKey = createIdempotencyKey();
    if (saveButton) saveButton.disabled = true;
    setStatus(isUpdate ? 'Atualizando DAJ...' : 'Criando DAJ e indexando a parte...', 'loading');

    try {
      var response = await fetch('/api/dajs', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': pendingIdempotencyKey
        },
        body: JSON.stringify(payload())
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok || !data.item || !data.item.id) {
        if (response.status < 500) pendingIdempotencyKey = '';
        setStatus(errorMessage(data, response.status), 'error');
        return;
      }

      form.dataset.savedDajId = data.item.id;
      form.dataset.dajSaved = 'true';
      pendingIdempotencyKey = '';
      if (dajNumber) dajNumber.textContent = data.item.id;
      if (dajState) dajState.textContent = data.item.status || 'em triagem';
      if (analysisButton) analysisButton.disabled = false;
      if (saveButton) saveButton.textContent = 'Atualizar atendimento';
      if (cpfInput) {
        cpfInput.value = '';
        cpfInput.required = false;
        cpfInput.placeholder = 'CPF ja indexado; preencha apenas para corrigir';
      }

      var pendingAttachments = Number(payload().attachmentsPendingCount || 0);
      var suffix = pendingAttachments
        ? ' Os anexos selecionados continuam locais e ainda nao foram gravados.'
        : '';
      setStatus(data.item.id + ' salvo. Nome indexado e CPF protegido por correspondencia exata.' + suffix, 'success');
    } catch (_) {
      setStatus('Falha de comunicacao. Tente novamente; a mesma chave segura sera reutilizada para evitar DAJ duplicado.', 'error');
    } finally {
      if (saveButton) saveButton.disabled = false;
    }
  });
})();
