/* ============================================================
   INVENTATORII — game.js
   Motorul jocului: stare, progres, ecrane, cele două moduri
   de joc (construcție și investigație), stele și insigne.
   ============================================================ */
window.startInventatorii = function (username) {
  'use strict';
  if (window.startInventatorii.started) return;
  window.startInventatorii.started = true;

  var ART = window.ART, FX = window.FX;

  /* ---------- scurtături ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ============================================================
     DIFICULTĂȚI
     Nu schimbă nivelele, ci cât ajutor primești în ele.
     ============================================================ */
  var MODES = {
    usor: {
      nume: 'Ușor', distractori: 2, indiciiFalse: 1,
      indiciuGratis: true, bonus: false, lantAjutat: true,
      desc: 'Mai puține piese de ales, indiciu oricând, fără întrebări bonus.'
    },
    mediu: {
      nume: 'Mediu', distractori: 3, indiciiFalse: 2,
      indiciuGratis: false, bonus: 'greu', lantAjutat: false,
      desc: 'Toate piesele, un indiciu costă o stea, bonus în capitolele grele.'
    },
    greu: {
      nume: 'Greu', distractori: 9, indiciiFalse: 9,
      indiciuGratis: false, bonus: true, lantAjutat: false,
      desc: 'Toate piesele și toate indiciile, întrebare bonus la fiecare nivel.'
    }
  };

  /* ============================================================
     STAREA JOCULUI (salvată în localStorage)
     ============================================================ */
  var KEY = 'inventatorii.v1.' + username;
  var S = {
    mod: 'mediu', sunet: true, voce: false, vocePref: '',
    prog: { build: {}, fix: {} },   // index nivel -> stele (1..3)
    album: [],                      // numele invențiilor construite
    insigne: []
  };

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (d && typeof d === 'object') {
        S.mod = MODES[d.mod] ? d.mod : 'mediu';
        S.sunet = d.sunet !== false;
        S.voce = !!d.voce;
        S.vocePref = d.vocePref || '';
        S.prog = d.prog && d.prog.build ? d.prog : { build: {}, fix: {} };
        S.album = d.album || [];
        S.insigne = d.insigne || [];
      }
    } catch (e) { }
  }

  /* ============================================================
     LUMILE ȘI CITIREA NIVELELOR
     ============================================================ */
  function parseQ(s) {
    if (!s) return null;
    var p = String(s).split('|');
    return { q: p[0], a: (p[1] || '').split(';'), c: parseInt(p[2], 10) || 0 };
  }

  var WORLDS = {
    build: {
      id: 'build', nume: 'Atelierul de invenții',
      sub: 'Primești o problemă → construiești soluția',
      data: window.LEVELS_BUILD,
      get: function (i) {
        var L = this.data.list[i];
        return {
          i: i, n: i + 1, world: 'build',
          scene: L[0], props: L[1].split(','), title: L[2], problem: L[3], name: L[4],
          ok: L[5].split(','), bad: L[6].split(','),
          roles: L[7].split('|').map(function (r) { var p = r.split('='); return { short: p[0], why: p[1] || p[0] }; }),
          why: L[8], quiz: parseQ(L[9])
        };
      }
    },
    fix: {
      id: 'fix', nume: 'Laboratorul de mistere',
      sub: 'Indicii → cauze în ordine → rezolvare',
      data: window.LEVELS_FIX,
      get: function (i) {
        var L = this.data.list[i];
        return {
          i: i, n: i + 1, world: 'fix',
          scene: L[0], props: L[1].split(','), title: L[2], story: L[3],
          clues: L[4].split('|').map(function (c) {
            var p = c.split('~');
            return { ic: p[0], t: p[1], good: p[2] === '1' };
          }),
          chain: L[5].split('|'),
          remediu: parseQ(L[6]), why: L[7], transfer: parseQ(L[8])
        };
      }
    }
  };

  function chapterOf(n) { return Math.floor((n - 1) / 10); }        // 0..9
  function chapterInfo(w, n) { return WORLDS[w].data.chapters[chapterOf(n)]; }
  function stars(w, i) { return S.prog[w][i] || 0; }
  function done(w, i) { return !!S.prog[w][i]; }
  function unlocked(w, i) { return i === 0 || done(w, i - 1) || !!S.prog[w][i]; }
  function totalStars() {
    var t = 0, w, k;
    for (w in S.prog) for (k in S.prog[w]) t += S.prog[w][k];
    return t;
  }
  function countDone(w) { var n = 0, k; for (k in S.prog[w]) n++; return n; }

  /* ---------- iconița reprezentativă a unui nivel ---------- */
  function levelIcon(w, i) {
    var L = WORLDS[w].get(i);
    return w === 'build' ? L.ok[0] : (L.clues.filter(function (c) { return c.good; })[0] || L.clues[0]).ic;
  }

  /* ============================================================
     INSIGNE
     ============================================================ */
  var BADGES = [
    { id: 'b1', t: 'Primul brevet', d: 'Ai construit prima invenție.', ic: '🏅', test: function () { return countDone('build') >= 1; } },
    { id: 'b10', t: 'Meșter iscusit', d: '10 invenții construite.', ic: '🔧', test: function () { return countDone('build') >= 10; } },
    { id: 'b50', t: 'Inginer-șef', d: '50 de invenții construite.', ic: '⚙️', test: function () { return countDone('build') >= 50; } },
    { id: 'b100', t: 'Mare Inventator', d: 'Toate cele 100 de invenții!', ic: '🏆', test: function () { return countDone('build') >= 100; } },
    { id: 'f1', t: 'Ochi ager', d: 'Ai dezlegat primul mister.', ic: '🔍', test: function () { return countDone('fix') >= 1; } },
    { id: 'f10', t: 'Detectiv', d: '10 mistere dezlegate.', ic: '🕵️', test: function () { return countDone('fix') >= 10; } },
    { id: 'f50', t: 'Savant curios', d: '50 de mistere dezlegate.', ic: '🔬', test: function () { return countDone('fix') >= 50; } },
    { id: 'f100', t: 'Mintea anului', d: 'Toate cele 100 de mistere!', ic: '🧠', test: function () { return countDone('fix') >= 100; } },
    { id: 'p10', t: 'Perfecționist', d: '10 nivele cu 3 stele.', ic: '⭐', test: function () { return perfect() >= 10; } },
    { id: 'p50', t: 'Fără greșeală', d: '50 de nivele cu 3 stele.', ic: '🌟', test: function () { return perfect() >= 50; } },
    { id: 's100', t: 'Colecționar de stele', d: '100 de stele adunate.', ic: '✨', test: function () { return totalStars() >= 100; } },
    { id: 's300', t: 'Cer înstelat', d: '300 de stele adunate.', ic: '🌌', test: function () { return totalStars() >= 300; } }
  ];
  function perfect() {
    var n = 0, w, k;
    for (w in S.prog) for (k in S.prog[w]) if (S.prog[w][k] === 3) n++;
    return n;
  }
  function checkBadges() {
    var noi = [];
    BADGES.forEach(function (b) {
      if (S.insigne.indexOf(b.id) < 0 && b.test()) { S.insigne.push(b.id); noi.push(b); }
    });
    return noi;
  }

  /* ============================================================
     NAVIGARE ÎNTRE ECRANE
     ============================================================ */
  var cur = 'menu';
  function nav(id) {
    FX.stopSpeak();
    hideHint();
    var s = document.querySelectorAll('.screen');
    for (var i = 0; i < s.length; i++) s[i].classList.remove('active');
    $('s-' + id).classList.add('active');
    cur = id;
    fit();
  }

  /* ============================================================
     TOTUL ÎNCAPE ÎN ECRAN
     Layoutul e construit pe înălțimea ferestrei, dar dacă un text
     lung întâlnește o fereastră foarte joasă, micșorăm proporțional
     ecranul în loc să apară bara de derulare.
     ============================================================ */
  var fitRAF = 0, fitT = 0;
  function applyFit() {
    var w = document.querySelector('.screen.active .wrap');
    if (!w) return;
    w.style.transform = ''; w.style.flex = ''; w.style.height = '';
    var have = w.clientHeight, need = w.scrollHeight;
    if (have < 80) return;   /* fereastră încă nemăsurată (filă ascunsă) */
    if (need > have + 2) {
      /* Tăierea (overflow) se aplică înaintea scalării, așa că nu e destul
         să micșorăm: lăsăm cutia să crească la înălțimea conținutului și
         abia apoi o scalăm înapoi exact cât intră pe ecran. */
      var k = Math.max(0.5, have / need);
      w.style.flex = 'none';
      w.style.height = need + 'px';
      w.style.transform = 'scale(' + k.toFixed(3) + ')';
    }
  }
  function fit() {
    cancelAnimationFrame(fitRAF); clearTimeout(fitT);
    /* două treceri: una imediat după așezarea în pagină și una după ce
       s-au încărcat fonturile și s-au așezat desenele */
    fitRAF = requestAnimationFrame(applyFit);
    fitT = setTimeout(applyFit, 140);
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  window.addEventListener('load', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  /* unele situații schimbă zona vizibilă fără eveniment de redimensionare
     (bara de adrese pe telefon, ferestre încadrate): urmărim direct cutia paginii */
  if (window.ResizeObserver) new ResizeObserver(fit).observe(document.documentElement);

  /* ============================================================
     MENIUL PRINCIPAL
     ============================================================ */
  function renderMenu() {
    $('menuHeroes').innerHTML =
      ART.character('ana', 'bucuros') + ART.character('bit', 'bucuros') + ART.character('rares', 'bucuros');

    $('artBuild').innerHTML = ART.svgWrap(
      '<g transform="translate(4 6) scale(0.85)">' + ART.I.roata_dintata() + '</g>' +
      '<g transform="translate(30 2) scale(0.7)">' + ART.I.bec() + '</g>' +
      '<g transform="translate(22 30) scale(0.8)">' + ART.I.surub() + '</g>', '0 0 96 76');
    $('artFix').innerHTML = ART.svgWrap(
      '<g transform="translate(4 4) scale(0.9)">' + ART.I.lupa() + '</g>' +
      '<g transform="translate(38 8) scale(0.7)">' + ART.I.pahar() + '</g>' +
      '<g transform="translate(26 34) scale(0.7)">' + ART.I.abur() + '</g>', '0 0 96 76');

    ['build', 'fix'].forEach(function (w) {
      var d = countDone(w), pct = Math.round(d / 100 * 100);
      $('badge' + (w === 'build' ? 'Build' : 'Fix')).textContent = d + ' / 100';
      $('pb' + (w === 'build' ? 'Build' : 'Fix')).style.width = pct + '%';
      var st = 0, k; for (k in S.prog[w]) st += S.prog[w][k];
      $('pt' + (w === 'build' ? 'Build' : 'Fix')).textContent =
        d === 0 ? '100 de nivele · 10 capitole' : d + ' rezolvate · ' + st + ' ★ adunate';
    });

    var btns = $('diffRow').children;
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('sel', btns[i].getAttribute('data-d') === S.mod);
    }
    $('btnSound').textContent = S.sunet ? '🔊' : '🔇';
    $('btnSound').classList.toggle('off', !S.sunet);
    $('btnVoice').classList.toggle('off', !S.voce);
    $('menuFoot').textContent =
      'Dificultate: ' + MODES[S.mod].nume + ' — ' + MODES[S.mod].desc;
  }

  /* ============================================================
     HARTA NIVELELOR — un capitol pe ecran, ca să nu fie nevoie de scroll
     ============================================================ */
  var world = 'build';
  var mapCh = { build: 0, fix: 0 };

  function firstOpenChapter(w) {
    for (var ci = 9; ci >= 0; ci--) if (unlocked(w, ci * 10)) return ci;
    return 0;
  }

  function renderMap(w, ci) {
    world = w;
    var W = WORLDS[w];
    if (ci === undefined) ci = mapCh[w];
    ci = Math.max(0, Math.min(9, ci));
    if (!unlocked(w, ci * 10)) ci = firstOpenChapter(w);
    mapCh[w] = ci;

    $('mapTitle').firstChild.nodeValue = W.nume;
    $('mapSub').textContent = W.sub + ' · dificultate ' + MODES[S.mod].nume;
    var st = 0, k; for (k in S.prog[w]) st += S.prog[w][k];
    $('mapStars').textContent = st;

    var ch = W.data.chapters[ci], gata = 0, i;
    for (i = ci * 10; i < ci * 10 + 10; i++) if (done(w, i)) gata++;

    var box = $('chapters');
    box.innerHTML =
      '<div class="chapbar">' +
      '<button class="arrow" id="chPrev" title="Capitolul anterior">‹</button>' +
      '<div class="mid">' +
      '<div class="cnum">Capitolul ' + (ci + 1) + ' din 10 · ' + gata + '/10 · ' +
      ['ușor', 'mediu', 'greu'][ch.dif - 1] + '</div>' +
      '<h3>' + esc(ch.t) + '</h3>' +
      '<p class="cdesc">' + esc(ch.d) + '</p>' +
      '</div>' +
      '<button class="arrow" id="chNext" title="Capitolul următor">›</button>' +
      '</div>' +
      '<div class="lvl-grid" id="lvlGrid"></div>' +
      '<div class="dots" id="dots"></div>';

    var grid = $('lvlGrid');
    for (i = ci * 10; i < ci * 10 + 10; i++) grid.appendChild(levelNode(w, i));

    var dots = $('dots');
    W.data.chapters.forEach(function (c, j) {
      var n = 0;
      for (var q = j * 10; q < j * 10 + 10; q++) if (done(w, q)) n++;
      var d = el('i', (j === ci ? 'on' : '') + (n === 10 ? ' full' : ''));
      d.title = 'Capitolul ' + (j + 1) + ': ' + c.t;
      d.onclick = function () { if (unlocked(w, j * 10)) { FX.sfx.click(); renderMap(w, j); } else FX.sfx.bad(); };
      dots.appendChild(d);
    });

    $('chPrev').disabled = ci === 0;
    $('chNext').disabled = ci === 9 || !unlocked(w, (ci + 1) * 10);
    $('chPrev').onclick = function () { FX.sfx.click(); renderMap(w, ci - 1); };
    $('chNext').onclick = function () { FX.sfx.click(); renderMap(w, ci + 1); };
  }

  function levelNode(w, i) {
    var L = WORLDS[w].data.list[i], s = stars(w, i), open = unlocked(w, i);
    var b = el('button', 'lvl' + (s === 3 ? ' perfect' : s ? ' done' : '') + (open ? '' : ' lock'));
    var starTxt = '';
    for (var k = 0; k < 3; k++) starTxt += k < s ? '<b>★</b>' : '★';
    b.innerHTML =
      '<div class="n">' + (i + 1) + '</div>' +
      '<div class="ico">' + (open ? ART.icon(levelIcon(w, i)) : '🔒') + '</div>' +
      '<div class="t">' + esc(open ? L[2] : 'Blocat') + '</div>' +
      '<div class="stars">' + starTxt + '</div>';
    b.onclick = function () {
      if (!open) { FX.sfx.bad(); FX.shake(b); return; }
      FX.sfx.open(); startLevel(w, i);
    };
    return b;
  }

  /* ============================================================
     ECRANUL DE JOC — comun
     ============================================================ */
  var G = null;   // starea nivelului curent

  function startLevel(w, i) {
    var L = WORLDS[w].get(i);
    var M = MODES[S.mod];
    var ch = chapterInfo(w, L.n);
    G = {
      w: w, i: i, L: L, M: M, ch: ch,
      greseli: 0, indiciiFolosite: 0, pas: 0
    };
    mapCh[w] = chapterOf(L.n);
    $('playTitle').firstChild.nodeValue = L.title;
    $('playSub').textContent = WORLDS[w].nume + ' · nivelul ' + L.n + ' · ' + ch.t;
    $('btnHint').classList.remove('hidden');
    nav('play');
    if (w === 'build') renderBuild(); else renderFix();
  }

  function speakCurrent() {
    var t = G ? (G.w === 'build' ? G.L.problem : G.L.story) : '';
    if (!t) return;
    FX.sfx.click();
    if (!FX.hasVoice()) {
      showHint(noVoiceShort(), '🗣️ Fără voce românească', 'normal');
      return;
    }
    FX.speak(t);
  }

  /* ============================================================
     VOCEA NARATORULUI
     Browserul citește cu vocile din sistem. Dacă nu există una
     românească, nu citim deloc (ar suna dezastruos) — explicăm cum se obține.
     ============================================================ */
  var inEdge = /Edg\//.test(navigator.userAgent);
  function noVoiceShort() {
    return inEdge
      ? 'Vocile românești din Edge se încarcă online: verifică internetul, apoi apasă din nou.'
      : 'Nu există o voce românească în acest browser. Deschide jocul în Microsoft Edge sau instalează vocea din Setări → Vorbire.';
  }
  function showVoiceHelp() {
    FX.sfx.open();
    showModal(
      ART.character('bit', 'normal') +
      '<h2>Nu am găsit o voce românească</h2>' +
      '<p class="q center">Browserul citește cu vocile instalate în calculator, iar aici sunt doar voci englezești — de aceea sună rău. Jocul nu citește cu ele.</p>' +
      '<div class="fact"><b>1. Cel mai simplu</b><br>' +
      (inEdge
        ? 'Ești deja în Edge: vocile „Andrei" și „Alina" se descarcă online. Verifică internetul, apoi apasă iar 🗣️.'
        : 'Deschide jocul în <b>Microsoft Edge</b>. Are vocile românești naturale „Andrei" și „Alina" fără nicio instalare (doar cu internet).') +
      '</div>' +
      '<div class="fact"><b>2. Pentru orice browser</b><br>Instalează vocea românească în Windows: <b>Setări → Timp și limbă → Vorbire → Gestionare voci → Adăugare voci → Română</b>, apoi repornește browserul.</div>' +
      '<div class="actions"><button class="btn" id="mOk">Am înțeles</button></div>'
    );
    $('mOk').onclick = function () { FX.sfx.click(); closeModal(); };
  }
  function renderVoiceSel() {
    var sel = $('voiceSel'), list = FX.voices();
    sel.innerHTML = '';
    list.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v.name;
      o.textContent = v.name.replace(/Microsoft |Google | - Romanian.*| \(Romania\)/g, '').replace(/Online \(Natural\)/, '(naturală)');
      if (v.name === FX.voiceName()) o.selected = true;
      sel.appendChild(o);
    });
    sel.classList.toggle('hidden', list.length < 2);
    $('btnVoice').title = list.length
      ? 'Citește textul cu voce tare (' + FX.voiceName().replace(/Microsoft |Google /, '') + ')'
      : 'Nu există voce românească — apasă pentru detalii';
    $('btnVoice').classList.toggle('novoice', !list.length);
  }

  /* stage: scenă + bula personajului */
  function setStage(who, text, mood) {
    $('stage').innerHTML =
      ART.scene(G.L.scene, G.L.props) +
      '<div class="speech">' + ART.character(who, mood || 'normal') +
      '<div class="bubble"><span class="who">' + (who === 'bit' ? 'Bit, robotul' : who === 'ana' ? 'Ana' : 'Rareș') +
      '</span>' + esc(text) + '</div></div>';
    $('stage').classList.add('anim');
    ART.settle($('stage').querySelector('svg.scene-svg'));   /* talpa pe sol, măsurat după desen */
    if (S.voce) FX.speak(text);
  }

  function stepsBar(n, cur, labels) {
    var h = '<div class="steps">';
    for (var i = 0; i < n; i++) h += '<div class="step' + (i < cur ? ' on' : i === cur ? ' cur' : '') + '"></div>';
    return h + '</div><div class="step-label">Pasul ' + (cur + 1) + ' din ' + n + ' · ' + labels[cur] + '</div>';
  }

  /* „Mergi înainte" — nimic nu avansează singur; copilul citește în ritmul lui */
  function goOn(fn, label) {
    var p = $('panel'), a = p.querySelector('.actions');
    if (!a) { a = el('div', 'actions'); p.appendChild(a); }
    a.innerHTML = '<button class="btn green" id="bGo">' + esc(label || 'Mergi înainte') + ' →</button>';
    $('bGo').onclick = function () { FX.sfx.click(); fn(); };
    $('bGo').focus();
  }

  function feedback(okType, title, text) {
    var fb = $('fb');
    if (!fb) return;
    fb.className = 'fb show ' + (okType ? 'ok' : 'no');
    fb.innerHTML = '<b>' + esc(title) + '</b>' + esc(text);
  }

  /* ============================================================
     MODUL 1 — ATELIERUL (construcție)
     ============================================================ */
  function renderBuild() {
    var L = G.L, M = G.M;
    setStage('bit', L.problem, 'gandeste');

    /* piesele din tavă: cele corecte + câți distractori permite dificultatea */
    var bad = L.bad.slice(0, Math.max(1, Math.min(M.distractori, L.bad.length)));
    G.tray = shuffle(L.ok.concat(bad));
    G.slots = [null, null, null];

    /* problema e deja în bula lui Bit, pe scenă — aici doar atelierul */
    var p = $('panel');
    p.innerHTML =
      '<div class="step-label">🔧 Alege ' + L.ok.length + ' piese și apasă „Construiește"</div>' +
      '<div class="slots" id="slots"></div>' +
      '<div class="tray" id="tray"></div>' +
      '<div class="fb" id="fb"></div>' +
      '<div class="actions">' +
      '<button class="btn ghost" id="bClear">↺ Golește</button>' +
      '<button class="btn green" id="bBuild">🔩 Construiește!</button>' +
      '</div>';
    $('bClear').onclick = function () {
      FX.sfx.click(); G.slots = [null, null, null]; drawBuild();
    };
    $('bBuild').onclick = tryBuild;
    drawBuild();
  }

  function drawBuild() {
    var slots = $('slots'), tray = $('tray');
    slots.innerHTML = ''; tray.innerHTML = '';

    G.slots.forEach(function (k, idx) {
      var s = el('div', 'slot' + (k ? ' filled' : ''));
      s.innerHTML = '<div class="box">' + (k ? ART.icon(k) : '<span class="ph">＋</span>') + '</div>' +
        '<div class="lab">' + (k ? esc(ART.label(k)) : 'piesa ' + (idx + 1)) + '</div>';
      s.setAttribute('data-slot', idx);
      s.onclick = function () {
        if (!G.slots[idx]) return;
        FX.sfx.drop(); G.slots[idx] = null; drawBuild();
      };
      slots.appendChild(s);
    });

    G.tray.forEach(function (k) {
      var used = G.slots.indexOf(k) >= 0;
      var b = el('button', 'part' + (used ? ' used' : ''));
      b.innerHTML = '<div class="ic">' + ART.icon(k) + '</div><div class="lab">' + esc(ART.label(k)) + '</div>';
      b.setAttribute('data-part', k);
      b.onclick = function () { placePart(k, b); };
      makeDraggable(b, k);
      tray.appendChild(b);
    });

    var full = G.slots.every(function (x) { return !!x; });
    $('bBuild').disabled = !full;
  }

  function placePart(k, node) {
    if (G.slots.indexOf(k) >= 0) return;
    var idx = G.slots.indexOf(null);
    if (idx < 0) { FX.sfx.bad(); return; }
    G.slots[idx] = k;
    FX.sfx.pick();
    if (node) FX.puff(node, 'rgba(255,201,60,.85)');
    drawBuild();
    describePart(k);
  }

  /* ce face piesa — informație neutră, ca să judece singur dacă ajută */
  function describePart(k) {
    var d = (window.LEVELS_BUILD.parts || {})[k];
    if (!d) return;
    var fb = $('fb');
    if (!fb) return;
    fb.className = 'fb info show';
    fb.innerHTML = '<span class="pi">' + ART.icon(k) + '</span><span><b>' + esc(ART.label(k)) + '</b> — ' + esc(d) + '.</span>';
    if (S.voce) FX.speak(ART.label(k) + ': ' + d + '.');
  }

  /* tragere cu degetul / mouse-ul (opțional, click-ul rămâne principal) */
  function makeDraggable(node, key) {
    var ghost = null, moved = false, startX = 0, startY = 0;
    node.addEventListener('pointerdown', function (e) {
      if (G.slots.indexOf(key) >= 0) return;
      moved = false; startX = e.clientX; startY = e.clientY;
      node.setPointerCapture(e.pointerId);
    });
    node.addEventListener('pointermove', function (e) {
      if (!node.hasPointerCapture || !node.hasPointerCapture(e.pointerId)) return;
      if (!moved && Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) < 8) return;
      if (!moved) {
        moved = true;
        node.classList.add('dragging');
        ghost = el('div', 'drag-ghost', ART.icon(key));
        document.body.appendChild(ghost);
      }
      ghost.style.left = e.clientX + 'px';
      ghost.style.top = e.clientY + 'px';
      var over = slotUnder(e.clientX, e.clientY);
      Array.prototype.forEach.call(document.querySelectorAll('.slot'), function (s) {
        s.classList.toggle('hot', s === over);
      });
    });
    node.addEventListener('pointerup', function (e) {
      if (!moved) return;
      node.classList.remove('dragging');
      if (ghost) { ghost.remove(); ghost = null; }
      var over = slotUnder(e.clientX, e.clientY);
      Array.prototype.forEach.call(document.querySelectorAll('.slot'), function (s) { s.classList.remove('hot'); });
      if (over) {
        var idx = +over.getAttribute('data-slot');
        var pus = !G.slots[idx] && G.slots.indexOf(key) < 0;
        if (pus) { G.slots[idx] = key; FX.sfx.pick(); }
      }
      drawBuild();
      if (over && pus) describePart(key);
    });
    node.addEventListener('pointercancel', function () {
      moved = false; node.classList.remove('dragging');
      if (ghost) { ghost.remove(); ghost = null; }
    });
  }
  function slotUnder(x, y) {
    var found = null;
    Array.prototype.forEach.call(document.querySelectorAll('.slot'), function (s) {
      var b = s.getBoundingClientRect();
      if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) found = s;
    });
    return found;
  }

  function tryBuild() {
    var ok = G.L.ok.slice().sort().join(','), mine = G.slots.slice().sort().join(',');
    if (ok === mine) {
      FX.sfx.build(); setTimeout(FX.sfx.whirr, 180);
      FX.confetti(40, $('bBuild'));
      revealInvention();
      return;
    }
    G.greseli++;
    FX.sfx.bad();
    FX.shake($('slots'));
    var gresite = G.slots.filter(function (k) { return G.L.ok.indexOf(k) < 0; });
    var slotNodes = document.querySelectorAll('.slot');
    G.slots.forEach(function (k, i) {
      if (k && G.L.ok.indexOf(k) < 0) slotNodes[i].classList.add('wrong');
    });
    var nume = gresite.map(function (k) { return ART.label(k); });
    feedback(false, 'Încă nu merge…',
      gresite.length === 1
        ? 'Piesa „' + nume[0] + '" nu ajută la problema asta. Scoate-o și încearcă alta.'
        : gresite.length > 1
          ? nume.length + ' piese nu se potrivesc: ' + nume.join(', ') + '. Gândește-te ce face fiecare.'
          : 'Piesele sunt bune, dar mai lipsește ceva. Verifică ce ai ales.');
  }

  function revealInvention() {
    var L = G.L;
    if (S.album.indexOf(L.name) < 0) S.album.push(L.name);

    var ic = L.ok.map(function (k) { return '<span class="inv-ic">' + ART.icon(k) + '</span>'; }).join('<span class="inv-plus">+</span>');
    var roles = L.ok.map(function (k, i) {
      var r = L.roles[i] || { short: '', why: '' };
      return '<li><span class="ri">' + ART.icon(k) + '</span><span class="why"><b>' + esc(ART.label(k)) + '</b> — ' + esc(r.why) + '</span></li>';
    }).join('');

    var p = $('panel');
    p.innerHTML =
      '<h3>✅ A funcționat!</h3>' +
      '<div class="invention">' +
      '<div class="inv-plate">' + ic + '</div>' +
      '<div class="inv-name">' + esc(L.name) + '</div>' +
      '<div class="inv-sub">brevet nr. ' + (100 + L.n) + ' · atelierul Inventatorilor</div>' +
      '</div>' +
      '<div class="step-label">🔎 De ce ajută fiecare piesă</div>' +
      '<ul class="roles">' + roles + '</ul>' +
      '<div class="fb ok show"><b>Ideea din spate</b>' + esc(L.why) + '</div>' +
      '<div class="actions"><button class="btn green" id="bNext">Mai departe →</button></div>';
    setStage('bit', 'Genial! ' + L.name + ' funcționează. Uite de ce ajută fiecare piesă.', 'bucuros');
    if (S.voce) {
      FX.speak(L.name + ' funcționează! ' + L.ok.map(function (k, i) { return (L.roles[i] || {}).why || ''; }).join(' ') + ' ' + L.why);
    }
    $('bNext').onclick = function () {
      FX.sfx.click();
      if (wantBonus() && G.L.quiz) askQuiz(G.L.quiz, 'Întrebare bonus', finishLevel);
      else finishLevel();
    };
  }

  function wantBonus() {
    var b = G.M.bonus;
    if (b === true) return true;
    if (b === 'greu') return G.ch.dif === 3;
    return false;
  }

  /* întrebare cu 3 variante, folosită și la bonus, și în misterele din laborator */
  function askQuiz(q, titlu, next) {
    var p = $('panel');
    p.innerHTML =
      '<h3>' + esc(titlu) + '</h3>' +
      '<p class="q">' + esc(q.q) + '</p>' +
      '<div class="opts" id="opts"></div>' +
      '<div class="fb" id="fb"></div>';
    var opts = $('opts');
    q.a.forEach(function (txt, i) {
      var b = el('button', 'opt');
      b.innerHTML = '<span class="k">' + 'ABC'[i] + '</span><span>' + esc(txt) + '</span>';
      b.onclick = function () {
        if (b.classList.contains('locked')) return;
        Array.prototype.forEach.call(opts.children, function (o) { o.classList.add('locked'); });
        if (i === q.c) {
          b.classList.add('ok'); FX.sfx.good();
          feedback(true, 'Exact!', 'Ai înțeles ideea, nu doar răspunsul.');
          goOn(next);
        } else {
          G.greseli++;
          b.classList.add('no'); FX.sfx.bad(); FX.shake(b);
          opts.children[q.c].classList.add('ok');
          feedback(false, 'Nu chiar', 'Răspunsul corect e ' + 'ABC'[q.c] + '. Ține minte pentru data viitoare!');
          goOn(next);
        }
      };
      opts.appendChild(b);
    });
    if (S.voce) FX.speak(q.q);
  }

  /* ============================================================
     MODUL 2 — LABORATORUL (investigație în 3–4 pași)
     ============================================================ */
  function renderFix() {
    var L = G.L, M = G.M;
    setStage('ana', L.story, 'gandeste');

    var bune = L.clues.filter(function (c) { return c.good; });
    var rele = L.clues.filter(function (c) { return !c.good; }).slice(0, M.indiciiFalse);
    G.clueSet = shuffle(bune.concat(rele));
    G.picked = [];
    G.chainOrder = [];
    G.chainSet = shuffle(L.chain);
    G.steps = ['Investighează', 'Explică', 'Repară'];
    if (useTransfer()) G.steps.push('Verifică');
    G.pas = 0;
    stepClues();
  }

  function useTransfer() {
    if (!G.L.transfer) return false;
    var b = G.M.bonus;
    if (b === true) return true;
    if (b === 'greu') return G.ch.dif === 3;
    return false;
  }

  /* --- Pasul 1: alegerea indiciilor --- */
  function stepClues() {
    var bune = G.clueSet.filter(function (c) { return c.good; }).length;
    var p = $('panel');
    p.innerHTML =
      stepsBar(G.steps.length, 0, G.steps) +
      '<h3>🔍 Ce are legătură?</h3>' +
      '<div class="clue-count">Alege cele <b>' + bune + '</b> indicii care explică ce s-a întâmplat. ' +
      '<span id="cnt">(0 alese)</span></div>' +
      '<div class="clues" id="clues"></div>' +
      '<div class="fb" id="fb"></div>' +
      '<div class="actions"><button class="btn" id="bClues" disabled>Gata cu indiciile →</button></div>';

    var box = $('clues');
    G.clueSet.forEach(function (c, i) {
      var b = el('button', 'clue');
      b.innerHTML = '<span class="mag">' + ART.icon(c.ic) + '</span><span>' + esc(c.t) + '</span>';
      b.onclick = function () {
        var at = G.picked.indexOf(i);
        if (at >= 0) { G.picked.splice(at, 1); b.classList.remove('sel'); FX.sfx.drop(); }
        else { G.picked.push(i); b.classList.add('sel'); FX.sfx.pick(); }
        $('cnt').textContent = '(' + G.picked.length + ' alese)';
        $('bClues').disabled = G.picked.length === 0;
      };
      box.appendChild(b);
    });

    $('bClues').onclick = function () {
      var gresit = G.picked.filter(function (i) { return !G.clueSet[i].good; });
      var lipsa = G.clueSet.filter(function (c, i) { return c.good && G.picked.indexOf(i) < 0; });
      if (gresit.length === 0 && lipsa.length === 0) {
        FX.sfx.good();
        Array.prototype.forEach.call(box.children, function (n, i) {
          n.classList.add(G.clueSet[i].good ? 'good' : 'bad'); n.classList.add('used');
        });
        feedback(true, 'Indicii bune!', 'Ai păstrat exact ce contează. Urmează: pune cauzele în ordine.');
        G.pas = 1;
        goOn(stepChain);
      } else {
        G.greseli++;
        FX.sfx.bad(); FX.shake(box);
        feedback(false, 'Mai uită-te o dată',
          gresit.length ? 'Un indiciu ales nu are legătură cu ce s-a întâmplat.'
            : 'Mai există un indiciu important pe care nu l-ai bifat.');
      }
    };
  }

  /* --- Pasul 2: lanțul cauzelor, în ordine --- */
  function stepChain() {
    var p = $('panel');
    var ajutor = G.M.lantAjutat;
    p.innerHTML =
      stepsBar(G.steps.length, 1, G.steps) +
      '<h3>🧩 De ce s-a întâmplat</h3>' +
      '<p class="q">Apasă cauzele în ordinea corectă: <b>ce a fost întâi</b>, ce a urmat, ce a ieșit la final.</p>' +
      (ajutor ? '<div class="clue-count">Sfat: începe cu ceea ce a existat înainte de toate.</div>' : '') +
      '<div class="opts" id="chain"></div>' +
      '<div class="fb" id="fb"></div>';
    var box = $('chain');
    G.chainOrder = [];
    G.chainSet.forEach(function (txt) {
      var b = el('button', 'opt');
      b.innerHTML = '<span class="k">?</span><span>' + esc(txt) + '</span>';
      b.onclick = function () {
        if (b.classList.contains('locked')) return;
        var poz = G.chainOrder.length;
        if (txt !== G.L.chain[poz]) {
          G.greseli++;
          FX.sfx.bad(); FX.shake(b);
          feedback(false, 'Nu în ordinea asta',
            poz === 0 ? 'Caută cauza care a existat prima, înainte ca ceva să se schimbe.'
              : 'Gândește-te ce s-a întâmplat imediat după: „' + G.L.chain[poz - 1] + '".');
          return;
        }
        G.chainOrder.push(txt);
        b.classList.add('ok', 'locked');
        b.querySelector('.k').textContent = poz + 1;
        FX.sfx.star(poz);
        if (G.chainOrder.length === G.L.chain.length) {
          feedback(true, 'Exact așa s-a întâmplat!', 'Cauzele se leagă una de alta, ca niște domino. Urmează: ce facem acum?');
          G.pas = 2;
          goOn(stepFix);
        }
      };
      box.appendChild(b);
    });
  }

  /* --- Pasul 3: rezolvarea --- */
  function stepFix() {
    var q = G.L.remediu, p = $('panel');
    p.innerHTML =
      stepsBar(G.steps.length, 2, G.steps) +
      '<h3>🛠️ Ce facem acum?</h3>' +
      '<p class="q">' + esc(q.q) + '</p>' +
      '<div class="opts" id="opts"></div>' +
      '<div class="fb" id="fb"></div>';
    var opts = $('opts');
    q.a.forEach(function (txt, i) {
      var b = el('button', 'opt');
      b.innerHTML = '<span class="k">' + 'ABC'[i] + '</span><span>' + esc(txt) + '</span>';
      b.onclick = function () {
        if (b.classList.contains('locked')) return;
        if (i === q.c) {
          Array.prototype.forEach.call(opts.children, function (o) { o.classList.add('locked'); });
          b.classList.add('ok'); FX.sfx.good(); FX.confetti(26, b);
          feedback(true, 'Rezolvat!', G.L.why);
          setStage('ana', 'Am înțeles! ' + G.L.why, 'bucuros');
          var next = function () {
            if (useTransfer()) { G.pas = 3; stepTransfer(); }
            else finishLevel();
          };
          goOn(next, useTransfer() ? 'Mergi înainte' : 'Am citit, mergi înainte');
        } else {
          G.greseli++;
          b.classList.add('no', 'locked'); FX.sfx.bad(); FX.shake(b);
          feedback(false, 'Asta nu rezolvă cauza', 'Uită-te din nou la lanțul cauzelor: ce anume trebuie oprit?');
        }
      };
      opts.appendChild(b);
    });
    if (S.voce) FX.speak(q.q);
  }

  /* --- Pasul 4 (opțional): transfer pe o situație nouă --- */
  function stepTransfer() {
    var q = G.L.transfer, p = $('panel');
    p.innerHTML = stepsBar(G.steps.length, 3, G.steps) +
      '<h3>🎓 Aceeași idee, altă situație</h3>' +
      '<p class="q">' + esc(q.q) + '</p>' +
      '<div class="opts" id="opts"></div>' +
      '<div class="fb" id="fb"></div>';
    var opts = $('opts');
    q.a.forEach(function (txt, i) {
      var b = el('button', 'opt');
      b.innerHTML = '<span class="k">' + 'ABC'[i] + '</span><span>' + esc(txt) + '</span>';
      b.onclick = function () {
        if (b.classList.contains('locked')) return;
        Array.prototype.forEach.call(opts.children, function (o) { o.classList.add('locked'); });
        if (i === q.c) {
          b.classList.add('ok'); FX.sfx.good();
          feedback(true, 'Ai înțeles cu adevărat!', 'Ideea funcționează și în alte locuri — asta înseamnă să înveți.');
          goOn(finishLevel);
        } else {
          G.greseli++;
          b.classList.add('no'); opts.children[q.c].classList.add('ok');
          FX.sfx.bad(); FX.shake(b);
          feedback(false, 'Aproape', 'Corect era ' + 'ABC'[q.c] + '. Recitește explicația și vei vedea de ce.');
          goOn(finishLevel);
        }
      };
      opts.appendChild(b);
    });
    if (S.voce) FX.speak(q.q);
  }

  /* ============================================================
     INDICIU (butonul 💡)
     ============================================================ */
  /* Indiciul e o fereastră temporară: apare la APĂSAREA butonului (nu la
     ridicarea degetului), stă 5 secunde cu o bară care se scurge și dispare
     singură, fără să schimbe nimic din scenă sau din panoul de joc. */
  var HINT_MS = 5000, hintEl = null, hintTimer = 0;

  function showHint(text, titlu, mood) {
    if (!hintEl) { hintEl = el('div', 'hint-pop'); document.body.appendChild(hintEl); }
    clearTimeout(hintTimer);
    hintEl.classList.remove('show');
    void hintEl.offsetWidth;                       /* repornește animația barei */
    hintEl.innerHTML =
      ART.character('bit', mood || 'gandeste') +
      '<div class="txt"><span class="who">' + esc(titlu || '💡 Indiciu de la Bit') + '</span>' + esc(text) + '</div>' +
      '<i class="bar"></i>';
    hintEl.classList.add('show');
    hintTimer = setTimeout(hideHint, HINT_MS);
    if (S.voce) FX.speak(text);
  }
  function hideHint() {
    clearTimeout(hintTimer);
    if (hintEl) hintEl.classList.remove('show');
  }

  function giveHint() {
    if (!G || cur !== 'play') return;
    if (!G.M.indiciuGratis && G.indiciiFolosite === 0 && G.greseli === 0 && S.mod === 'greu') {
      FX.sfx.bad();
      showHint('Încearcă întâi o dată singur. Indiciul apare după prima greșeală.', '🔒 La modul Greu…', 'normal');
      return;
    }
    G.indiciiFolosite++;
    FX.sfx.hint();
    var L = G.L, t;
    if (G.w === 'build') {
      var lipsa = L.ok.filter(function (k) { return G.slots.indexOf(k) < 0; });
      var k = lipsa[0] || L.ok[0];
      var rol = L.roles[L.ok.indexOf(k)];
      t = 'Ai nevoie de ceva care ' + (rol ? rol.short : 'ajută la problema asta').toLowerCase() + '.';
    } else if (G.pas === 0) {
      var bun = G.clueSet.filter(function (c) { return c.good; })[0];
      t = 'Un indiciu sigur folositor: „' + bun.t + '".';
    } else if (G.pas === 1) {
      t = 'Prima cauză din lanț este: „' + L.chain[0] + '".';
    } else {
      t = 'Gândește-te ce anume trebuie oprit ca lanțul să nu se mai repete.';
    }
    showHint(t);
  }

  /* ============================================================
     FINAL DE NIVEL — stele, insigne, fereastra de rezultat
     ============================================================ */
  function finishLevel() {
    hideHint();
    var s = 3;
    if (G.greseli >= 3) s = 1;
    else if (G.greseli > 0 || G.indiciiFolosite > 0) s = 2;
    if (G.greseli === 0 && G.indiciiFolosite === 0) s = 3;

    var vechi = stars(G.w, G.i);
    if (s > vechi) S.prog[G.w][G.i] = s;
    else if (!vechi) S.prog[G.w][G.i] = s;
    var noi = checkBadges();
    save();

    FX.sfx.win();
    FX.confetti(70);

    var L = G.L, urm = G.i + 1;
    var starHtml = '';
    for (var k = 0; k < 3; k++) starHtml += '<span class="' + (k < s ? 'on' : 'off') + '">★</span>';

    var badgeHtml = noi.length
      ? '<div class="badge-row">' + noi.map(function (b) {
        return '<span class="tag">' + b.ic + ' insignă nouă: ' + esc(b.t) + '</span>';
      }).join('') + '</div>' : '';

    showModal(
      ART.character(G.w === 'build' ? 'bit' : 'ana', 'bucuros') +
      '<h2>' + (s === 3 ? 'Perfect!' : s === 2 ? 'Bravo!' : 'Rezolvat!') + '</h2>' +
      '<div class="big-stars">' + starHtml + '</div>' +
      '<div class="fact"><b>' + esc(G.w === 'build' ? L.name : 'De ce s-a întâmplat') + '</b><br>' + esc(L.why) + '</div>' +
      badgeHtml +
      '<div class="actions">' +
      '<button class="btn ghost" id="mMap">Harta</button>' +
      (urm < 100 ? '<button class="btn green" id="mNext">Nivelul ' + (urm + 1) + ' →</button>' : '<button class="btn yellow" id="mNext">Vezi albumul</button>') +
      '</div>'
    );
    setTimeout(function () {
      var st = document.querySelectorAll('.big-stars .on');
      for (var i = 0; i < st.length; i++) (function (i) { setTimeout(function () { FX.sfx.star(i); }, i * 260); })(i);
    }, 260);

    $('mMap').onclick = function () { closeModal(); FX.sfx.click(); renderMap(G.w); nav('map'); };
    $('mNext').onclick = function () {
      closeModal(); FX.sfx.click();
      if (urm < 100) startLevel(G.w, urm);
      else { renderAlbum(); nav('album'); }
    };
  }

  /* ============================================================
     FERESTRE
     ============================================================ */
  function showModal(html) {
    $('modal').innerHTML = html;
    $('modalBg').classList.add('show');
  }
  function closeModal() { $('modalBg').classList.remove('show'); }

  function showHelp() {
    FX.sfx.open();
    showModal(
      '<h2>Cum se joacă</h2>' +
      '<ul class="help-list">' +
      '<li><b>🔧 Atelierul de invenții</b> — citești problema, alegi cele 3 piese potrivite din tavă (apeși pe ele sau le tragi în locașuri) și apeși <b>Construiește</b>.</li>' +
      '<li><b>🔍 Laboratorul de mistere</b> — 3 pași: alegi indiciile care contează, pui cauzele în ordinea în care s-au petrecut, apoi alegi rezolvarea. La Greu mai primești o întrebare de verificare.</li>' +
      '<li><b>★ Stelele</b> — 3 stele dacă rezolvi fără greșeli și fără indiciu, 2 dacă ai greșit o dată sau ai cerut ajutor, 1 dacă a fost mai greu.</li>' +
      '<li><b>💡 Butonul indiciu</b> — îți spune de ce ai nevoie, fără să îți dea răspunsul de-a gata.</li>' +
      '<li><b>🗣️ Butonul vorbește</b> — citește textul cu voce tare, dacă ești la început de clasa I.</li>' +
      '</ul>' +
      '<div class="actions"><button class="btn" id="mOk">Am înțeles</button></div>'
    );
    $('mOk').onclick = function () { FX.sfx.click(); closeModal(); };
  }

  /* ============================================================
     ALBUMUL
     ============================================================ */
  function renderAlbum() {
    $('albStars').textContent = totalStars();
    var b = $('albumBody');
    var inv = S.album.slice();
    var castigate = BADGES.filter(function (x) { return S.insigne.indexOf(x.id) >= 0; });

    var ultimele = inv.slice(-16).reverse(), restul = inv.length - ultimele.length;

    b.innerHTML =
      '<div class="album-grid">' +

      '<div class="panel">' +
      '<h3>🏅 Insigne (' + castigate.length + ' din ' + BADGES.length + ')</h3>' +
      '<div class="badges">' + BADGES.map(function (x) {
        var got = S.insigne.indexOf(x.id) >= 0;
        return '<div class="badge-card' + (got ? ' got' : '') + '"><div class="bic">' + (got ? x.ic : '🔒') + '</div>' +
          '<b>' + esc(x.t) + '</b><span>' + esc(x.d) + '</span></div>';
      }).join('') + '</div></div>' +

      '<div class="panel">' +
      '<h3>📔 Invențiile mele (' + inv.length + ' din 100)</h3>' +
      (inv.length
        ? '<div class="inv-list">' + ultimele.map(function (n) { return '<span class="tag">🔩 ' + esc(n) + '</span>'; }).join('') +
        (restul > 0 ? '<span class="tag">…și încă ' + restul + '</span>' : '') + '</div>'
        : '<p class="tiny" style="flex:1">Încă nicio invenție. Intră în Atelier și construiește prima!</p>') +
      '<p class="prog-text">Atelier ' + countDone('build') + '/100 · Laborator ' + countDone('fix') + '/100 · ' +
      perfect() + ' nivele perfecte · ' + totalStars() + ' ★</p>' +
      '<div class="actions"><button class="btn red" id="bReset">Șterge progresul</button></div>' +
      '</div></div>';

    $('bReset').onclick = function () {
      FX.sfx.open();
      showModal('<h2>Ștergi tot progresul?</h2><p class="q center">Se pierd toate stelele, invențiile și insignele. Nu se poate reveni.</p>' +
        '<div class="actions"><button class="btn ghost" id="nu">Nu, păstrează</button><button class="btn red" id="da">Da, șterge</button></div>');
      $('nu').onclick = function () { FX.sfx.click(); closeModal(); };
      $('da').onclick = function () {
        S.prog = { build: {}, fix: {} }; S.album = []; S.insigne = [];
        save(); closeModal(); renderAlbum(); renderMenu(); FX.sfx.bad();
      };
    };
  }

  /* ============================================================
     LEGĂTURI DE INTERFAȚĂ
     ============================================================ */
  function bind() {
    $('cardBuild').onclick = function () { FX.sfx.open(); renderMap('build'); nav('map'); };
    $('cardFix').onclick = function () { FX.sfx.open(); renderMap('fix'); nav('map'); };
    $('btnHelp').onclick = showHelp;
    $('btnAlbum').onclick = function () { FX.sfx.open(); renderAlbum(); nav('album'); };

    $('btnSound').onclick = function () {
      S.sunet = !S.sunet; FX.setSound(S.sunet); save(); renderMenu();
      if (S.sunet) FX.sfx.good();
    };
    $('btnVoice').onclick = function () {
      if (!S.voce && !FX.hasVoice()) { showVoiceHelp(); return; }
      S.voce = !S.voce; save(); renderMenu(); FX.sfx.click();
      if (S.voce) FX.speak('Bună! Eu sunt Bit. Hai să inventăm ceva împreună!'); else FX.stopSpeak();
    };
    $('voiceSel').onchange = function () {
      S.vocePref = this.value; FX.setVoice(S.vocePref); save(); renderVoiceSel();
      FX.speak('Bună! Acum citesc eu povestea.');
    };
    FX.setVoice(S.vocePref);
    FX.onVoices(renderVoiceSel);

    Array.prototype.forEach.call($('diffRow').children, function (b) {
      b.onclick = function () {
        S.mod = b.getAttribute('data-d'); save(); renderMenu(); FX.sfx.pick();
      };
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-nav]'), function (b) {
      b.onclick = function () { FX.sfx.click(); renderMenu(); nav(b.getAttribute('data-nav')); };
    });

    $('btnBack').onclick = function () { FX.sfx.click(); renderMap(world); nav('map'); };
    $('btnSay').onclick = speakCurrent;
    /* indiciul pornește din momentul apăsării (pointerdown), și pe touch, și
       cu mouse-ul; click-ul de după e ignorat, ca să nu apară de două ori —
       dar rămâne activ pentru tastatură (Enter/Spațiu nu trec prin pointerdown) */
    var hb = $('btnHint'), ultimaApasare = 0;
    hb.addEventListener('pointerdown', function () { ultimaApasare = Date.now(); giveHint(); });
    hb.addEventListener('click', function () { if (Date.now() - ultimaApasare > 800) giveHint(); });

    $('modalBg').onclick = function (e) { if (e.target === $('modalBg')) closeModal(); };

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); if (cur === 'play') { renderMap(world); nav('map'); } }
    });
  }

  /* ============================================================
     PORNIRE
     ============================================================ */
  load();
  FX.setSound(S.sunet);
  bind();
  renderMenu();

  /* orice schimbare de conținut declanșează o verificare de încadrare */
  var mo = new MutationObserver(fit);
  ['s-menu', 's-map', 's-play', 's-album'].forEach(function (id) {
    mo.observe($(id), { childList: true, subtree: true, characterData: true });
  });
  fit();

  /* mesaj de bun venit la prima rulare */
  var hasProgress = false;
  try { hasProgress = !!localStorage.getItem(KEY); } catch (e) { }
  if (!hasProgress) {
    setTimeout(function () {
      showModal(
        ART.character('bit', 'bucuros') +
        '<h2>Salut, inventatorule!</h2>' +
        '<p class="q center">Eu sunt Bit. Împreună cu Ana și Rareș avem 200 de provocări pentru tine: ' +
        '100 de invenții de construit și 100 de mistere de dezlegat.</p>' +
        '<div class="fact"><b>Alege-ți dificultatea</b><br>Poți schimba oricând din meniu: Ușor, Mediu sau Greu.</div>' +
        '<div class="actions"><button class="btn green" id="go">Începem!</button></div>'
      );
      $('go').onclick = function () { FX.sfx.win(); closeModal(); save(); };
    }, 500);
  }
};
