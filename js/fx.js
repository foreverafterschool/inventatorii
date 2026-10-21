/* ============================================================
   INVENTATORII — fx.js
   Sunet sintetizat (WebAudio), particule, confetti, voce.
   Zero fișiere externe.
   ============================================================ */
(function (global) {
  'use strict';

  /* ---------------- SUNET ---------------- */
  var actx = null, master = null, on = true;
  function ctx() {
    if (!actx) {
      var AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      actx = new AC();
      master = actx.createGain();
      master.gain.value = 0.22;
      master.connect(actx.destination);
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone(freq, dur, type, when, vol, slideTo) {
    var a = ctx(); if (!a || !on) return;
    var t0 = a.currentTime + (when || 0);
    var o = a.createOscillator(), gn = a.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gn.gain.setValueAtTime(0.0001, t0);
    gn.gain.exponentialRampToValueAtTime(vol || 0.5, t0 + 0.012);
    gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(gn); gn.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }
  function noise(dur, vol, freq) {
    var a = ctx(); if (!a || !on) return;
    var len = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0), i;
    for (i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = a.createBufferSource(); src.buffer = buf;
    var f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq || 900;
    var gn = a.createGain(); gn.gain.value = vol || 0.3;
    src.connect(f); f.connect(gn); gn.connect(master); src.start();
  }
  var SFX = {
    click: function () { tone(520, 0.07, 'triangle', 0, 0.35); },
    pick: function () { tone(660, 0.08, 'triangle', 0, 0.4); tone(880, 0.07, 'sine', 0.05, 0.25); },
    drop: function () { tone(300, 0.12, 'sine', 0, 0.4, 220); },
    good: function () { tone(660, 0.1, 'sine', 0, 0.4); tone(880, 0.12, 'sine', 0.09, 0.4); tone(1180, 0.2, 'sine', 0.19, 0.35); },
    bad: function () { tone(220, 0.18, 'sawtooth', 0, 0.22, 150); },
    build: function () { noise(0.16, 0.18, 500); tone(180, 0.12, 'square', 0.05, 0.15); },
    whirr: function () { tone(140, 0.5, 'sawtooth', 0, 0.1, 320); },
    star: function (i) { tone(700 + i * 240, 0.22, 'sine', 0, 0.4); },
    win: function () {
      [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.22, 'triangle', i * 0.1, 0.4); });
      tone(1568, 0.5, 'sine', 0.44, 0.3);
    },
    open: function () { tone(420, 0.1, 'sine', 0, 0.3, 700); },
    hint: function () { tone(980, 0.09, 'sine', 0, 0.3); tone(1300, 0.12, 'sine', 0.08, 0.25); }
  };
  function setSound(v) { on = !!v; }
  function soundOn() { return on; }

  /* ---------------- MUZICĂ DE FUNDAL (arpegiu blând) ---------------- */
  var musicTimer = null, musicOn = false, step = 0;
  var CHORDS = [[262, 330, 392], [294, 349, 440], [220, 262, 330], [247, 311, 392]];
  function musicTick() {
    var a = ctx(); if (!a) return;
    var ch = CHORDS[Math.floor(step / 4) % CHORDS.length];
    var n = ch[step % 3] * (step % 8 > 5 ? 2 : 1);
    var t0 = a.currentTime, o = a.createOscillator(), gn = a.createGain();
    o.type = 'sine'; o.frequency.value = n;
    gn.gain.setValueAtTime(0.0001, t0);
    gn.gain.exponentialRampToValueAtTime(0.055, t0 + 0.06);
    gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
    o.connect(gn); gn.connect(master); o.start(t0); o.stop(t0 + 1);
    step++;
  }
  function setMusic(v) {
    musicOn = !!v;
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    if (musicOn) { ctx(); musicTick(); musicTimer = setInterval(musicTick, 420); }
  }
  function musicIsOn() { return musicOn; }

  /* ---------------- VOCE (citește textul pentru cei mici) ----------------
     Regula de aur: NU citim niciodată cu o voce care nu e românească —
     un text românesc citit de o voce englezească sună dezastruos. Dacă nu
     există voce românească, speak() întoarce false și jocul explică
     utilizatorului cum obține una (Edge o are gata, Windows o instalează).
     Când există, textul e pregătit ca să curgă natural: abrevieri
     desfăcute, simboluri citite, propoziții separate, ritm potrivit. */
  var voice = null, voiceList = [], voicePref = null, voiceCbs = [];

  /* cât de bună e o voce pentru română (−1 = nu e românească) */
  function voiceScore(v) {
    var n = (v.name || '') + ' ' + (v.voiceURI || '');
    if (!(/^ro([-_]|$)/i.test(v.lang || '') || /rom[aâ]n/i.test(n))) return -1;
    var s = 100;
    if (/natural|neural/i.test(n)) s += 60;   /* vocile neurale (Edge) sunt cele mai fluente */
    if (/online/i.test(n)) s += 10;
    if (/google/i.test(n)) s += 20;
    if (/andrei|alina|emil|ioana/i.test(n)) s += 5;
    return s;
  }
  function refreshVoices() {
    if (!global.speechSynthesis) return;
    var vs = [];
    try { vs = global.speechSynthesis.getVoices() || []; } catch (e) { }
    voiceList = vs.filter(function (v) { return voiceScore(v) >= 0; })
      .sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
    voice = null;
    if (voicePref) voice = voiceList.filter(function (v) { return v.name === voicePref; })[0] || null;
    if (!voice) voice = voiceList[0] || null;
    voiceCbs.forEach(function (f) { try { f(voiceList); } catch (e) { } });
  }
  if (global.speechSynthesis) {
    try { global.speechSynthesis.addEventListener('voiceschanged', refreshVoices); }
    catch (e) { global.speechSynthesis.onvoiceschanged = refreshVoices; }
    refreshVoices();
    setTimeout(refreshVoices, 300);
    setTimeout(refreshVoices, 1500);
  }
  function hasVoice() { if (!voice) refreshVoices(); return !!voice; }
  function voices() { return voiceList.map(function (v) { return { name: v.name, lang: v.lang, local: !!v.localService }; }); }
  function voiceName() { return voice ? voice.name : ''; }
  function setVoice(name) { voicePref = name || null; refreshVoices(); }
  function onVoices(f) { voiceCbs.push(f); if (voiceList.length) f(voiceList); }

  /* pregătește textul pentru citire fluentă în română */
  function prepare(t, natural) {
    t = String(t)
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, ' ')       /* emoji */
      .replace(/[„“”"«»]/g, '')
      .replace(/…/g, '. ')
      .replace(/\s*→\s*/g, ', apoi ')
      .replace(/\s*·\s*/g, ', ')
      .replace(/\s*—\s*/g, ', ')
      .replace(/(\d)\s*[–-]\s*(\d)/g, '$1 până la $2')                          /* 30–36 → 30 până la 36 */
      .replace(/−\s*(\d)/g, 'minus $1')
      .replace(/\+\s*(\d)/g, 'plus $1')
      .replace(/(\d)\s*°\s*C\b/g, '$1 grade Celsius')
      .replace(/(\d)\s*°/g, '$1 grade')
      .replace(/(\d)\s*%/g, '$1 la sută')
      .replace(/(\d)\s*km\/h\b/gi, '$1 kilometri pe oră')
      .replace(/(\d)\s*km\b/gi, '$1 kilometri')
      .replace(/(\d)\s*cm\b/gi, '$1 centimetri')
      .replace(/(\d)\s*mm\b/gi, '$1 milimetri')
      .replace(/(\d)\s*kg\b/gi, '$1 kilograme')
      .replace(/(\d)\s*m\b/g, '$1 metri')
      .replace(/(\d)\s*l\b/g, '$1 litri')
      .replace(/\bnr\.\s*/gi, 'numărul ')
      .replace(/\bex\.\s*/gi, 'de exemplu ')
      .replace(/\bcca\.\s*/gi, 'circa ')
      .replace(/\betc\.?/gi, 'și așa mai departe')
      .replace(/\bLED\b/g, 'led')
      .replace(/\bGPS\b/g, 'gepees')
      .replace(/\s+/g, ' ').trim();
    /* vocile vechi (SAPI) au fost antrenate cu sedilă, nu cu virgulă dedesubt */
    if (!natural) t = t.replace(/ș/g, 'ş').replace(/ț/g, 'ţ').replace(/Ș/g, 'Ş').replace(/Ț/g, 'Ţ');
    return t;
  }
  /* împarte în propoziții: vocile citesc mai natural bucăți scurte, iar
     Chrome întrerupe textele lungi la ~15 secunde */
  function sentences(t) {
    var out = [], m = t.match(/[^.!?]+[.!?]+["]?|[^.!?]+$/g) || [t], buf = '';
    m.forEach(function (s) {
      s = s.trim(); if (!s) return;
      if ((buf + ' ' + s).length > 180 && buf) { out.push(buf); buf = s; } else buf = buf ? buf + ' ' + s : s;
    });
    if (buf) out.push(buf);
    return out;
  }

  var speakGen = 0;
  function speak(text) {
    if (!global.speechSynthesis || !text) return false;
    if (!hasVoice()) return false;
    var natural = /natural|neural|google/i.test(voice.name);
    var gen = ++speakGen, parts = sentences(prepare(text, natural));
    try { global.speechSynthesis.cancel(); } catch (e) { }
    /* Chrome pierde uneori un enunț rostit imediat după cancel(): mică pauză */
    setTimeout(function () {
      if (gen !== speakGen) return;
      parts.forEach(function (p) {
        var u = new SpeechSynthesisUtterance(p);
        try { u.voice = voice; } catch (e) { }
        u.lang = voice.lang || 'ro-RO';
        u.rate = natural ? 1.0 : 0.9; u.pitch = 1.0; u.volume = 1;
        try { global.speechSynthesis.speak(u); } catch (e) { }
      });
    }, 60);
    return true;
  }
  function stopSpeak() { speakGen++; try { global.speechSynthesis.cancel(); } catch (e) { } }

  /* ---------------- PARTICULE ---------------- */
  var cv = null, cx = null, parts = [], raf = null;
  function ensureCanvas() {
    if (cv) return;
    cv = document.createElement('canvas');
    cv.id = 'fxcanvas';
    document.body.appendChild(cv);
    cx = cv.getContext('2d');
    resize();
    global.addEventListener('resize', resize);
  }
  function resize() {
    if (!cv) return;
    var d = global.devicePixelRatio || 1;
    cv.width = innerWidth * d; cv.height = innerHeight * d;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    cx.setTransform(d, 0, 0, d, 0, 0);
  }
  function loop() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = parts.length - 1; i >= 0; i--) {
      var q = parts[i];
      q.vy += q.g; q.x += q.vx; q.y += q.vy; q.vx *= 0.995; q.life--;
      q.rot += q.vr;
      if (q.life <= 0 || q.y > innerHeight + 60) { parts.splice(i, 1); continue; }
      cx.save();
      cx.globalAlpha = Math.max(0, Math.min(1, q.life / 40));
      cx.translate(q.x, q.y); cx.rotate(q.rot);
      cx.fillStyle = q.c;
      if (q.shape === 'circle') { cx.beginPath(); cx.arc(0, 0, q.s, 0, 6.283); cx.fill(); }
      else if (q.shape === 'star') {
        cx.beginPath();
        for (var k = 0; k < 10; k++) {
          var rr = k % 2 ? q.s * 0.45 : q.s, a = k * Math.PI / 5 - Math.PI / 2;
          if (k) cx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); else cx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
        }
        cx.closePath(); cx.fill();
      } else cx.fillRect(-q.s, -q.s * 0.6, q.s * 2, q.s * 1.2);
      cx.restore();
    }
    if (parts.length) raf = requestAnimationFrame(loop);
    else { raf = null; cx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function push(list) {
    ensureCanvas();
    parts = parts.concat(list);
    if (parts.length > 700) parts = parts.slice(-700);
    if (!raf) raf = requestAnimationFrame(loop);
  }
  var COLORS = ['#ffc93c', '#ff8a3d', '#2f9ee0', '#1fc2a7', '#ef5b52', '#9b6dff', '#5cc45f', '#ff85bd'];
  function confetti(n, originEl) {
    var x = innerWidth / 2, y = innerHeight * 0.3;
    if (originEl && originEl.getBoundingClientRect) {
      var b = originEl.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2;
    }
    var list = [], i;
    for (i = 0; i < (n || 90); i++) {
      var a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 9;
      list.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, g: 0.22,
        s: 3 + Math.random() * 6, c: COLORS[(Math.random() * COLORS.length) | 0],
        life: 60 + Math.random() * 50, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        shape: Math.random() < 0.25 ? 'star' : (Math.random() < 0.5 ? 'circle' : 'rect')
      });
    }
    push(list);
  }
  function sparkle(el, color, n) {
    if (!el || !el.getBoundingClientRect) return;
    var b = el.getBoundingClientRect(), list = [], i;
    for (i = 0; i < (n || 18); i++) {
      var a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 4;
      list.push({
        x: b.left + b.width * Math.random(), y: b.top + b.height * Math.random(),
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5, g: 0.08,
        s: 2 + Math.random() * 3.5, c: color || '#ffc93c',
        life: 32 + Math.random() * 26, rot: 0, vr: 0.2, shape: 'star'
      });
    }
    push(list);
  }
  function puff(el, color) {
    if (!el) return;
    var b = el.getBoundingClientRect(), list = [], i;
    for (i = 0; i < 16; i++) {
      var a = Math.random() * Math.PI * 2;
      list.push({
        x: b.left + b.width / 2, y: b.top + b.height / 2,
        vx: Math.cos(a) * (1 + Math.random() * 3), vy: Math.sin(a) * (1 + Math.random() * 3) - 1,
        g: -0.02, s: 5 + Math.random() * 8, c: color || 'rgba(200,215,225,.8)',
        life: 28 + Math.random() * 20, rot: 0, vr: 0.05, shape: 'circle'
      });
    }
    push(list);
  }
  function shake(el, cls) {
    if (!el) return;
    el.classList.remove(cls || 'shake');
    void el.offsetWidth;
    el.classList.add(cls || 'shake');
  }

  global.FX = {
    sfx: SFX, setSound: setSound, soundOn: soundOn,
    setMusic: setMusic, musicIsOn: musicIsOn,
    speak: speak, stopSpeak: stopSpeak, hasVoice: hasVoice, voices: voices,
    voiceName: voiceName, setVoice: setVoice, onVoices: onVoices,
    confetti: confetti, sparkle: sparkle, puff: puff, shake: shake
  };
})(window);
