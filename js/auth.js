/* Barieră simplă pentru GitHub Pages; verificarea în browser poate fi ocolită.
   Aceasta nu înlocuiește autentificarea și autorizarea pe server. */
(function () {
  'use strict';
  var SESSION_KEY = 'inventatorii.session.v1';
  var SESSION_MS = 8 * 60 * 60 * 1000;
  var accounts = window.INVENTATORII_ACCOUNTS;
  var form = document.getElementById('loginForm');
  var userInput = document.getElementById('loginUser');
  var passwordInput = document.getElementById('loginPassword');
  var error = document.getElementById('loginError');
  var submit = document.getElementById('loginSubmit');
  var activeSession = null;
  var busy = false;

  function hasAccount(username) {
    return typeof username === 'string' && Object.prototype.hasOwnProperty.call(accounts.users, username);
  }

  function readSession() {
    try {
      var session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
      if (session && hasAccount(session.username) && Number.isFinite(session.expires) &&
          session.expires > Date.now() && session.expires <= Date.now() + SESSION_MS) return session;
    } catch (e) { }
    return null;
  }

  function logout() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) { }
    document.getElementById('gameRoot').hidden = true;
    document.getElementById('gameRoot').setAttribute('inert', '');
    if (window.FX) window.FX.stopSpeak();
    window.location.reload();
  }

  function enter(session) {
    activeSession = session;
    passwordInput.value = '';
    document.getElementById('currentUser').textContent = session.username;
    document.getElementById('loginWall').hidden = true;
    document.getElementById('gameRoot').hidden = false;
    document.getElementById('gameRoot').removeAttribute('inert');
    window.startInventatorii(session.username);
    document.getElementById('cardBuild').focus();
    setTimeout(logout, Math.max(0, session.expires - Date.now()));
  }

  function fromHex(hex) {
    return Uint8Array.from(hex.match(/.{2}/g), function (byte) { return parseInt(byte, 16); });
  }

  async function verify(username, password) {
    // Aceeași derivare și pentru utilizatorii inexistenți.
    var account = hasAccount(username) ? accounts.users[username] : accounts.users.user01;
    var key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    var bits = await crypto.subtle.deriveBits({
      name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(account.salt), iterations: accounts.iterations
    }, key, 256);
    var actual = new Uint8Array(bits), expected = fromHex(account.hash), difference = 0;
    for (var i = 0; i < expected.length; i++) difference |= actual[i] ^ expected[i];
    return hasAccount(username) && difference === 0;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (busy) return;
    error.textContent = '';
    var username = userInput.value.trim().toLowerCase();
    var password = passwordInput.value;
    if (!username || !password) {
      error.textContent = 'Completează utilizatorul și parola.';
      return;
    }
    if (!window.crypto || !window.crypto.subtle) {
      error.textContent = 'Deschide jocul prin HTTPS sau pe localhost, într-un browser actualizat.';
      return;
    }
    busy = true;
    submit.disabled = true;
    submit.textContent = 'Se verifică…';
    try {
      if (!await verify(username, password)) {
        error.textContent = 'Utilizator sau parolă incorectă. Încearcă din nou.';
        passwordInput.value = '';
        passwordInput.focus();
        return;
      }
      var session = { username: username, expires: Date.now() + SESSION_MS };
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { }
      enter(session);
    } catch (e) {
      error.textContent = 'Nu am putut porni jocul. Reîncarcă pagina și încearcă din nou.';
    } finally {
      busy = false;
      submit.disabled = false;
      submit.textContent = 'Intră în joc →';
    }
  });

  document.getElementById('togglePassword').addEventListener('click', function () {
    var show = passwordInput.type === 'password';
    passwordInput.type = show ? 'text' : 'password';
    this.textContent = show ? 'Ascunde' : 'Arată';
    this.setAttribute('aria-label', show ? 'Ascunde parola' : 'Arată parola');
    this.setAttribute('aria-pressed', String(show));
  });
  document.getElementById('btnLogout').addEventListener('click', logout);
  function checkExpiry() { if (activeSession && activeSession.expires <= Date.now()) logout(); }
  window.addEventListener('pageshow', checkExpiry);
  document.addEventListener('visibilitychange', checkExpiry);
  var saved = readSession();
  if (saved) enter(saved);
  else userInput.focus();
})();
