(function () {
  'use strict';

  var form = document.querySelector('[data-daj-intake-form]');
  if (!form) return;

  var saveButton = form.querySelector('[data-save-daj]');
  var analysisButton = form.querySelector('[data-send-daj-analysis]');
  var deleteButton = form.querySelector('[data-delete-test-daj]');
  var statusBox = form.querySelector('[data-daj-save-status]');
  var dajNumber = document.querySelector('[data-daj-number]');
  var dajState = document.querySelector('[data-daj-state]');
  var loginLink = document.querySelector('[data-daj-login-link]');
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
    if (status === 401) return 'Sessao obrigatoria. Entre com um perfil autorizado para acessar o DAJ.';
    if (status === 403) return 'Seu perfil nao possui permissao para esta operacao no DAJ.';
    if (error === 'cpf_invalido') return 'CPF invalido. Confira o numero completo; a Jus 9 nao completa nem deduz documentos.';
    if (error === 'nome_parte_obrigatorio') return 'Informe o nome completo da parte.';
    if (error === 'indice_cpf_exato_configuracao_pendente') return 'Indice exato de CPF indisponivel. O DAJ nao foi salvo parcialmente.';
    if (error === 'idempotency_key_reutilizada_com_payload_diferente') return 'A operacao anterior ficou inconclusiva. Reenvie o formulario para iniciar uma nova gravacao segura.';
    if (error === 'operacao_daj_removida') return 'Este DAJ ficticio ja foi encerrado e nao pode ser recriado pela mesma operacao.';
    if (error === 'exclusao_restrita_a_daj_de_homologacao') return 'Esta limpeza existe somente para DAJs ficticios marcados como homologacao.';
    if (error === 'daj_nao_encontrado') return 'DAJ nao encontrado na memoria oficial. Nenhum dado foi presumido.';
    if (error === 'daj_registry_configuracao_pendente') return 'Cadastro oficial de DAJ ainda nao esta configurado.';
    return 'Nao foi possivel concluir a operacao. Nenhum resultado foi presumido.';
  }

  function currentDajId() {
    return String(form.dataset.savedDajId || '').trim();
  }

  function setControl(name, newValue) {
    var control = form.elements[name];
    if (!control || newValue === undefined || newValue === null || String(newValue) === '') return;
    control.value = String(newValue);
  }

  function updateLoginLink() {
    if (!loginLink) return;
    var returnTo = window.location.pathname + window.location.search;
    loginLink.href = '/auth/google/start?return_to=' + encodeURIComponent(returnTo);
  }

  function setResumeUrl(dajId) {
    var url = new URL(window.location.href);
    if (dajId) url.searchParams.set('dajId', dajId);
    else url.searchParams.delete('dajId');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    updateLoginLink();
  }

  function showSavedItem(item) {
    var operational = item.operational || {};
    form.dataset.savedDajId = item.id;
    form.dataset.dajSaved = 'true';
    if (dajNumber) dajNumber.textContent = item.id;
    if (dajState) dajState.textContent = item.status || 'em triagem';
    if (analysisButton) analysisButton.disabled = false;
    if (saveButton) saveButton.textContent = 'Atualizar atendimento';
    if (deleteButton) deleteButton.hidden = item.testMode !== true;
    setControl('partyName', item.partyName);
    setControl('contact', operational.contact);
    setControl('area', operational.area);
    setControl('urgency', operational.urgency);
    setControl('attentionReason', operational.attentionReason);
    setControl('secrecyLevel', operational.secrecyLevel);
    setControl('caseSummary', operational.caseSummary);
    setControl('documentsMentioned', operational.documentsMentioned);
    if (cpfInput) {
      cpfInput.value = '';
      cpfInput.required = false;
      cpfInput.placeholder = item.cpfIndexed
        ? 'CPF ja indexado; preencha apenas para corrigir'
        : 'CPF opcional na atualizacao';
    }
  }

  function payload() {
    var savedDajId = currentDajId();
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
      title: savedDajId ? '' : 'Atendimento inicial governado',
      testMode: true,
      environment: 'homologacao'
    };
  }

  async function resumeDajFromUrl() {
    var dajId = new URL(window.location.href).searchParams.get('dajId') || '';
    if (!/^DAJ-\d{4}-\d{4}$/i.test(dajId)) return;
    setStatus('Retomando DAJ de homologacao...', 'loading');
    try {
      var response = await fetch('/api/dajs?dajId=' + encodeURIComponent(dajId), {
        credentials: 'include'
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok || !data.item) {
        setStatus(errorMessage(data, response.status), 'error');
        return;
      }
      showSavedItem(data.item);
      setStatus(data.item.id + ' retomado da memoria oficial. O CPF integral nao foi recarregado.', 'success');
    } catch (_) {
      setStatus('Nao foi possivel retomar o DAJ. Nenhum dado local foi presumido.', 'error');
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var isUpdate = Boolean(currentDajId());
    if (!pendingIdempotencyKey) pendingIdempotencyKey = createIdempotencyKey();
    if (saveButton) saveButton.disabled = true;
    setStatus(isUpdate ? 'Atualizando DAJ...' : 'Criando DAJ ficticio e indexando a parte...', 'loading');

    try {
      var requestPayload = payload();
      var response = await fetch('/api/dajs', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': pendingIdempotencyKey
        },
        body: JSON.stringify(requestPayload)
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.ok || !data.item || !data.item.id) {
        if (response.status < 500) pendingIdempotencyKey = '';
        setStatus(errorMessage(data, response.status), 'error');
        return;
      }

      showSavedItem(data.item);
      setResumeUrl(data.item.id);
      pendingIdempotencyKey = '';
      var suffix = Number(requestPayload.attachmentsPendingCount || 0)
        ? ' Os anexos selecionados continuam locais e ainda nao foram gravados.'
        : '';
      setStatus(data.item.id + ' salvo em homologacao. Nome indexado e CPF protegido por correspondencia exata.' + suffix, 'success');
    } catch (_) {
      setStatus('Falha de comunicacao. Tente novamente; a mesma chave segura sera reutilizada para evitar DAJ duplicado.', 'error');
    } finally {
      if (saveButton) saveButton.disabled = false;
    }
  });

  if (deleteButton) {
    deleteButton.addEventListener('click', async function () {
      var dajId = currentDajId();
      if (!/^DAJ-\d{4}-\d{4}$/.test(dajId)) return;
      if (!window.confirm('Remover somente o DAJ ficticio ' + dajId + ' desta homologacao?')) return;
      deleteButton.disabled = true;
      if (saveButton) saveButton.disabled = true;
      setStatus('Removendo DAJ ficticio e preservando auditoria minima...', 'loading');
      try {
        var response = await fetch('/api/dajs?dajId=' + encodeURIComponent(dajId), {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reason: 'Encerramento da homologacao reversivel pelo usuario autenticado.',
            confirmation: 'EXCLUIR TESTE ' + dajId
          })
        });
        var data = await response.json().catch(function () { return {}; });
        if (!response.ok || !data.ok) {
          setStatus(errorMessage(data, response.status), 'error');
          return;
        }
        form.reset();
        delete form.dataset.savedDajId;
        delete form.dataset.dajSaved;
        pendingIdempotencyKey = '';
        if (dajNumber) dajNumber.textContent = 'sera gerado ao salvar';
        if (dajState) dajState.textContent = 'triagem inicial';
        if (analysisButton) analysisButton.disabled = true;
        if (saveButton) saveButton.textContent = 'Salvar atendimento e criar DAJ';
        if (cpfInput) {
          cpfInput.required = true;
          cpfInput.placeholder = '000.000.000-00';
        }
        deleteButton.hidden = true;
        setResumeUrl('');
        setStatus(dajId + ' removido. Apenas tombstone e auditoria sem dados da parte foram preservados.', 'success');
      } catch (_) {
        setStatus('Falha de comunicacao durante a limpeza. Consulte novamente o DAJ antes de repetir.', 'error');
      } finally {
        deleteButton.disabled = false;
        if (saveButton) saveButton.disabled = false;
      }
    });
  }

  updateLoginLink();
  resumeDajFromUrl();
})();
