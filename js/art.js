/* ============================================================
   INVENTATORII — art.js
   Bibliotecă de grafică vectorială (SVG desenat din cod).
   Nu folosim imagini externe: totul e generat, deci jocul
   pornește instant, offline, dintr-un dublu-click.
   ============================================================ */
(function (global) {
  'use strict';

  /* ---------- Paletă ---------- */
  var P = {
    ink: '#25313d', ink2: '#3d4f5e', line: '#1d2730',
    wood: '#cd9155', wood2: '#a86c35', wood3: '#e8b982',
    metal: '#a9bac6', metal2: '#7d909e', metal3: '#e2ecf2',
    blue: '#2f9ee0', blue2: '#1a6cb0', blue3: '#9ad6f7',
    teal: '#1fc2a7', teal2: '#0e9382',
    green: '#5cc45f', green2: '#379a3d', green3: '#b6e8a5',
    yellow: '#ffc93c', yellow2: '#e8a716',
    orange: '#ff8a3d', orange2: '#e2661c',
    red: '#ef5b52', red2: '#c93b33',
    purple: '#9b6dff', purple2: '#6f45cc',
    pink: '#ff85bd',
    white: '#ffffff', cream: '#fff4e2', shade: 'rgba(0,0,0,.14)',
    glass: 'rgba(255,255,255,.55)', sky: '#bfe8ff'
  };

  /* ---------- Micro-DSL pentru SVG ---------- */
  function c(x, y, r, f, extra) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (extra || '') + '/>'; }
  function e(x, y, rx, ry, f, extra) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (extra || '') + '/>'; }
  function r(x, y, w, h, f, rd, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rd === undefined ? 4 : rd) + '" fill="' + f + '"' + (extra || '') + '/>'; }
  function p(d, f, extra) { return '<path d="' + d + '" fill="' + f + '"' + (extra || '') + '/>'; }
  function s(d, col, w, extra) { return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '/>'; }
  function ln(x1, y1, x2, y2, col, w) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="' + (w || 4) + '" stroke-linecap="round"/>'; }
  function g(inner, tr) { return '<g' + (tr ? ' transform="' + tr + '"' : '') + '>' + inner + '</g>'; }
  function poly(pts, f, extra) { return '<polygon points="' + pts + '" fill="' + f + '"' + (extra || '') + '/>'; }

  /* Roată dințată reutilizabilă */
  function gear(cx, cy, R, teeth, col, col2) {
    var d = '', i, a, r1 = R, r2 = R * 0.76, step = Math.PI / teeth;
    for (i = 0; i < teeth * 2; i++) {
      a = i * step - Math.PI / 2;
      var rr = (i % 2 === 0) ? r1 : r2;
      d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1);
    }
    return p(d + 'Z', col) + c(cx, cy, R * 0.3, col2 || P.cream);
  }

  /* ============================================================
     ICOANE — vocabularul de piese și obiecte al jocului.
     Fiecare icoană e desenată într-un sistem 0..64.
     Cheia se folosește în fișierele de nivele.
     ============================================================ */
  var I = {};

  /* — mecanică — */
  I.roata = function () { return c(32, 32, 23, P.ink) + c(32, 32, 15, P.metal3) + c(32, 32, 6, P.metal2); };
  I.roata_dintata = function () { return gear(32, 32, 24, 9, P.metal2, P.cream) + c(32, 32, 5, P.ink2); };
  I.axa = function () { return r(6, 27, 52, 10, P.metal2, 5) + c(12, 32, 8, P.ink) + c(52, 32, 8, P.ink); };
  I.scripete = function () { return c(32, 24, 15, P.metal2) + c(32, 24, 6, P.cream) + s('M18 24 L18 52 M46 24 L46 52', P.wood2, 5) + r(24, 50, 16, 9, P.wood, 3); };
  I.sfoara = function () { return s('M8 14 C24 6 22 30 34 26 C48 21 42 52 56 48', P.wood3, 6); };
  I.parghie = function () { return p('M6 44 L58 22 L58 30 L6 52 Z', P.wood) + poly('32,34 22,54 42,54', P.ink2); };
  I.rampa = function () { return p('M6 52 L56 18 L56 52 Z', P.wood) + s('M8 50 L54 20', P.wood3, 4); };
  I.arc = function () { return s('M32 8 C10 14 54 20 32 26 C10 32 54 38 32 44 C10 50 54 54 32 58', P.metal2, 5); };
  I.surub = function () { return p('M22 6 H42 L38 20 H26 Z', P.metal2) + s('M32 20 L32 56', P.metal, 8) + s('M26 28 L38 32 M26 38 L38 42', P.metal2, 3); };
  I.banda = function () { return r(4, 26, 56, 16, P.ink2, 8) + c(16, 34, 6, P.metal3) + c(32, 34, 6, P.metal3) + c(48, 34, 6, P.metal3); };
  I.manivela = function () { return c(24, 34, 8, P.metal2) + s('M24 34 L44 18 L52 24', P.ink2, 6) + c(52, 24, 5, P.red); };
  I.elice = function () { var b = ''; for (var i = 0; i < 3; i++) b += g(e(32, 16, 6, 15, i === 0 ? P.blue : P.blue3), 'rotate(' + (i * 120) + ' 32 32)'); return b + c(32, 32, 6, P.ink2); };
  I.suport = function () { return r(26, 8, 12, 40, P.metal2, 3) + p('M10 56 L54 56 L46 44 L18 44 Z', P.ink2); };
  I.carlig = function () { return s('M32 6 L32 26', P.metal2, 6) + s('M32 26 C48 30 48 52 32 52 C22 52 20 44 24 40', P.metal2, 6); };
  I.greutate = function () { return p('M14 22 H50 L56 56 H8 Z', P.ink2) + s('M24 22 C24 10 40 10 40 22', P.metal, 5) + '<text x="32" y="48" font-size="18" font-family="Arial" fill="' + P.cream + '" text-anchor="middle">kg</text>'; };
  I.plutitor = function () { return c(32, 34, 20, P.red) + p('M12 34 A20 20 0 0 0 52 34 Z', P.white) + r(28, 6, 8, 12, P.metal2, 3); };
  I.magnet = function () { return p('M14 52 V32 A18 18 0 0 1 50 32 V52 H38 V32 A6 6 0 0 0 26 32 V52 Z', P.red) + r(14, 44, 12, 10, P.metal3, 2) + r(38, 44, 12, 10, P.metal3, 2); };
  I.balon = function () { return e(32, 26, 18, 21, P.red) + e(26, 20, 5, 7, 'rgba(255,255,255,.5)') + p('M28 46 L36 46 L32 52 Z', P.red2) + s('M32 52 C40 56 24 58 32 62', P.ink2, 2); };
  I.panza = function () { return p('M10 12 C24 20 40 20 54 12 L54 48 C40 56 24 56 10 48 Z', P.blue3) + s('M10 30 C24 38 40 38 54 30', P.blue, 3); };
  I.palnie = function () { return p('M8 12 H56 L38 36 V52 H26 V36 Z', P.metal) + r(26, 48, 12, 10, P.metal2, 2); };
  I.tub = function () { return s('M10 50 C10 20 30 44 34 24 C38 8 54 12 54 30', P.teal, 9) + c(10, 50, 5, P.teal2) + c(54, 30, 5, P.teal2); };
  I.robinet = function () { return r(12, 40, 12, 18, P.metal2, 3) + s('M18 40 V22 H44 V32', P.metal2, 9) + c(18, 18, 7, P.blue) + c(44, 40, 3, P.blue3); };
  I.sita = function () { return c(32, 32, 22, P.metal2) + c(32, 32, 17, P.metal3) + s('M18 26 H46 M18 34 H46 M18 42 H46 M24 18 V46 M32 16 V48 M40 18 V46', P.metal2, 2); };
  I.filtru = function () { return p('M12 12 H52 L36 40 V54 H28 V40 Z', P.cream) + p('M18 18 H46 L38 32 H26 Z', P.blue3) + s('M20 46 H44', P.blue, 2); };
  I.burete = function () { return r(8, 18, 48, 30, P.yellow, 8) + c(20, 28, 3, P.yellow2) + c(34, 36, 4, P.yellow2) + c(46, 26, 3, P.yellow2) + c(26, 42, 2.5, P.yellow2); };
  I.plasa = function () { return c(32, 30, 20, 'none', ' stroke="' + P.teal2 + '" stroke-width="3"') + s('M14 24 H50 M14 34 H50 M22 12 V48 M32 10 V50 M42 12 V48', P.teal, 2) + s('M32 50 V58', P.wood, 5); };
  I.galeata = function () { return p('M12 22 H52 L46 56 H18 Z', P.metal) + r(10, 16, 44, 8, P.metal2, 4) + s('M14 20 C20 2 44 2 50 20', P.ink2, 3); };
  I.cutie = function () { return p('M8 22 L32 12 L56 22 L32 32 Z', P.wood3) + p('M8 22 L32 32 L32 56 L8 44 Z', P.wood) + p('M56 22 L32 32 L32 56 L56 44 Z', P.wood2); };
  I.capac = function () { return e(32, 30, 24, 9, P.metal) + r(8, 30, 48, 8, P.metal2, 2) + e(32, 38, 24, 8, P.metal2) + r(28, 14, 8, 12, P.ink2, 3); };
  I.tava = function () { return e(32, 38, 26, 10, P.metal2) + e(32, 34, 26, 10, P.metal3) + e(32, 34, 18, 6, P.metal); };
  I.jgheab = function () { return p('M4 18 L26 40 L60 40 L60 50 L22 50 L0 26 Z', P.metal2) + s('M8 24 L28 44', P.blue3, 3); };
  I.scara = function () { return s('M18 8 V58 M46 8 V58', P.wood2, 5) + s('M18 18 H46 M18 30 H46 M18 42 H46 M18 54 H46', P.wood, 5); };
  I.punte = function () { return r(6, 30, 52, 8, P.wood, 3) + s('M6 34 C20 14 44 14 58 34', P.wood2, 4) + ln(20, 22, 20, 32, P.wood2, 3) + ln(44, 22, 44, 32, P.wood2, 3); };
  I.tobogan = function () { return s('M12 10 C12 40 34 34 34 54', P.orange, 10) + s('M34 54 H56', P.orange2, 10) + s('M14 14 C14 38 30 34 30 50', P.yellow, 3); };
  I.cos = function () { return p('M12 20 H52 L46 54 H18 Z', P.wood) + s('M16 30 H48 M18 40 H46', P.wood2, 3) + s('M16 20 C22 4 42 4 48 20', P.wood2, 4); };
  I.roata_apa = function () { var b = c(32, 32, 22, P.wood2), i; for (i = 0; i < 8; i++) b += g(r(30, 6, 8, 14, P.wood3, 2), 'rotate(' + i * 45 + ' 32 32)'); return b + c(32, 32, 8, P.ink2); };
  I.pompa = function () { return r(16, 26, 32, 28, P.metal2, 5) + r(28, 6, 8, 22, P.metal, 3) + r(20, 2, 24, 8, P.red, 3) + c(50, 40, 6, P.blue); };
  I.resort = I.arc;

  /* — electricitate & lumină — */
  I.bec = function () { return c(32, 26, 17, P.yellow3 || '#ffe08a') + c(32, 26, 12, P.yellow) + r(25, 40, 14, 6, P.metal2, 2) + r(26, 46, 12, 8, P.metal, 2) + s('M32 4 V10 M12 12 L16 16 M52 12 L48 16', P.yellow2, 3); };
  I.baterie = function () { return r(10, 20, 44, 26, P.green, 5) + r(54, 28, 6, 10, P.metal2, 2) + '<text x="24" y="40" font-size="20" font-family="Arial" fill="' + P.white + '">+</text>' + '<text x="40" y="39" font-size="20" font-family="Arial" fill="' + P.white + '">-</text>'; };
  I.fir = function () { return s('M6 40 C18 40 18 22 30 22 C42 22 42 44 54 44', P.red, 6) + c(6, 40, 4, P.metal2) + c(54, 44, 4, P.metal2); };
  I.intrerupator = function () { return r(10, 22, 44, 24, P.cream, 6) + c(24, 34, 7, P.ink2) + s('M24 34 L42 24', P.ink2, 5) + c(44, 22, 4, P.green); };
  I.panou_solar = function () { return r(8, 14, 48, 32, P.blue2, 3) + s('M24 14 V46 M40 14 V46 M8 30 H56', P.blue3, 2) + r(28, 46, 8, 12, P.metal2, 2); };
  I.motoras = function () { return r(14, 20, 30, 26, P.metal2, 5) + c(29, 33, 8, P.metal3) + r(44, 29, 14, 8, P.ink2, 3) + s('M18 20 V12 M40 20 V12', P.red, 3); };
  I.ventilator = function () { var b = '', i; for (i = 0; i < 4; i++) b += g(p('M32 30 C22 26 22 10 32 12 C42 10 42 26 32 30 Z', P.blue3), 'rotate(' + i * 90 + ' 32 30)'); return b + c(32, 30, 6, P.ink2) + r(24, 50, 16, 8, P.metal2, 3); };
  I.sonerie = function () { return p('M32 8 C44 8 48 20 48 34 L52 44 H12 L16 34 C16 20 20 8 32 8 Z', P.yellow) + c(32, 50, 6, P.yellow2) + c(32, 6, 4, P.ink2); };
  I.difuzor = function () { return r(12, 14, 26, 36, P.ink2, 5) + c(25, 32, 9, P.metal2) + s('M44 22 C52 28 52 36 44 42 M50 16 C62 26 62 38 50 48', P.blue, 3); };
  I.microfon = function () { return r(24, 8, 16, 28, P.ink2, 8) + s('M16 30 C16 46 48 46 48 30', P.metal2, 4) + s('M32 44 V56 M22 56 H42', P.metal2, 4); };
  I.oglinda = function () { return e(32, 30, 20, 24, P.metal2) + e(32, 30, 15, 19, P.blue3) + p('M22 44 L40 16 L44 20 L26 46 Z', 'rgba(255,255,255,.55)'); };
  I.lupa = function () { return c(26, 26, 17, P.blue3) + c(26, 26, 17, 'none', ' stroke="' + P.metal2 + '" stroke-width="5"') + s('M38 38 L56 56', P.wood2, 8); };
  I.lentila = function () { return p('M32 6 C50 20 50 44 32 58 C14 44 14 20 32 6 Z', P.blue3) + s('M26 18 C22 28 22 36 26 46', P.white, 3); };
  I.prisma = function () { return poly('32,8 58,52 6,52', 'rgba(155,220,255,.75)') + s('M8 50 L28 30', P.white, 3) + s('M36 34 L58 44', P.red, 2) + s('M36 38 L58 48', P.yellow, 2) + s('M36 42 L58 52', P.teal, 2); };
  I.lampa = function () { return p('M14 30 L32 8 L50 30 Z', P.red) + s('M32 30 V48', P.metal2, 4) + e(32, 52, 14, 5, P.ink2) + c(32, 34, 5, P.yellow); };
  I.lumanare = function () { return r(24, 22, 16, 32, P.cream, 4) + s('M32 22 V16', P.ink2, 2) + p('M32 4 C38 10 38 18 32 18 C26 18 26 10 32 4 Z', P.orange) + p('M32 8 C35 12 35 16 32 16 C29 16 29 12 32 8 Z', P.yellow); };
  I.senzor = function () { return r(10, 22, 34, 22, P.ink2, 5) + c(22, 33, 6, P.green) + s('M48 22 C58 28 58 38 48 44', P.green, 3); };

  /* — măsurare — */
  I.termometru = function () { return r(26, 6, 12, 38, P.metal3, 6) + c(32, 48, 10, P.red) + r(29, 22, 6, 26, P.red, 3) + s('M40 14 H48 M40 22 H46 M40 30 H48', P.ink2, 2); };
  I.ceas = function () { return c(32, 34, 22, P.cream) + c(32, 34, 22, 'none', ' stroke="' + P.ink2 + '" stroke-width="4"') + s('M32 34 V20 M32 34 L44 40', P.ink, 3) + r(28, 6, 8, 8, P.metal2, 2); };
  I.cantar = function () { return p('M10 54 H54 L48 30 H16 Z', P.metal) + c(32, 22, 12, P.cream) + s('M32 22 L38 14', P.red, 3); };
  I.balanta = function () { return s('M32 12 V50', P.metal2, 5) + s('M10 18 H54', P.metal2, 5) + poly('20,52 44,52 32,36', P.ink2) + s('M10 18 L4 32 H16 Z', P.metal, 2) + p('M4 32 H16 L10 40 Z', P.metal) + p('M48 32 H60 L54 40 Z', P.metal); };
  I.rigla = function () { return r(4, 24, 56, 16, P.yellow, 3) + s('M14 24 V34 M24 24 V30 M34 24 V34 M44 24 V30 M54 24 V34', P.ink2, 2); };
  I.clepsidra = function () { return s('M14 8 H50 M14 56 H50', P.wood2, 5) + p('M18 10 H46 L34 32 L46 54 H18 L30 32 Z', 'rgba(200,235,255,.7)') + p('M20 12 H44 L33 30 Z', P.yellow) + p('M22 52 H42 L32 40 Z', P.yellow); };
  I.carte = function () { return p('M8 12 C18 8 28 10 32 14 V54 C28 50 18 48 8 52 Z', P.blue) + p('M56 12 C46 8 36 10 32 14 V54 C36 50 46 48 56 52 Z', P.blue2) + s('M32 14 V54', P.cream, 2); };

  /* — natură & mediu — */
  I.apa = function () { return p('M32 6 C46 24 52 32 52 40 A20 20 0 0 1 12 40 C12 32 18 24 32 6 Z', P.blue) + p('M24 40 C24 48 28 52 34 53 C26 54 18 48 18 40 Z', P.blue3); };
  I.gheata = function () { return s('M32 6 V58 M10 18 L54 46 M54 18 L10 46', P.blue3, 5) + s('M32 16 L24 10 M32 16 L40 10 M32 48 L24 54 M32 48 L40 54', P.white, 3); };
  I.foc = function () { return p('M32 4 C44 18 52 26 52 38 A20 20 0 0 1 12 38 C12 26 22 22 24 12 C30 18 28 26 34 26 C38 22 34 12 32 4 Z', P.orange) + p('M32 30 C40 38 42 42 42 46 A10 10 0 0 1 22 46 C22 40 30 38 32 30 Z', P.yellow); };
  I.abur = function () {
    var a = 'M20 50 C10 40 30 36 20 26 C12 18 26 12 22 6', b = 'M40 52 C30 42 50 38 40 28 C32 20 46 14 42 8';
    return s(a + ' ' + b, 'rgba(120,150,170,.35)', 9) + s(a, 'rgba(210,230,242,.95)', 6) + s(b, 'rgba(210,230,242,.8)', 6);
  };
  I.sare = function () { return p('M18 20 H46 L44 56 H20 Z', P.metal3) + r(20, 10, 24, 10, P.blue, 3) + c(28, 15, 2, P.white) + c(36, 15, 2, P.white) + c(32, 12, 2, P.white); };
  I.soare = function () { var b = c(32, 32, 15, P.yellow), i; for (i = 0; i < 8; i++) b += g(ln(32, 12, 32, 4, P.yellow2, 4), 'rotate(' + i * 45 + ' 32 32)'); return b + c(32, 32, 11, '#ffe27a'); };
  I.nor = function () { return p('M16 46 A12 12 0 0 1 18 24 A14 14 0 0 1 44 20 A11 11 0 0 1 50 46 Z', P.white) + p('M16 46 H50 A11 11 0 0 0 50 44 H16 Z', '#e2edf5'); };
  I.vant = function () {
    /* contur alb dedesubt, ca vântul să se vadă și pe munte, și pe cer */
    var d = 'M6 20 H38 A7 7 0 1 0 32 12 M6 34 H46 A7 7 0 1 1 40 44 M10 48 H30';
    return s(d, 'rgba(255,255,255,.9)', 9) + s(d, P.metal2, 5);
  };
  I.ploaie = function () { return p('M14 34 A11 11 0 0 1 18 16 A13 13 0 0 1 42 14 A10 10 0 0 1 46 34 Z', P.metal) + s('M20 42 L16 54 M32 42 L28 54 M44 42 L40 54', P.blue, 4); };
  I.luna = function () { return p('M40 6 A26 26 0 1 0 40 58 A22 22 0 0 1 40 6 Z', '#ffe9a8') + c(34, 22, 4, '#f2d78d') + c(28, 38, 5, '#f2d78d'); };
  I.stea = function () { return poly('32,6 39,24 58,26 44,38 48,56 32,46 16,56 20,38 6,26 25,24', P.yellow); };
  I.planta = function () { return s('M32 58 V26', P.green2, 5) + p('M32 32 C18 32 12 22 12 14 C24 14 32 22 32 32 Z', P.green) + p('M32 30 C46 30 52 20 52 12 C40 12 32 20 32 30 Z', P.green3); };
  I.copac = function () { return r(28, 36, 8, 22, P.wood2, 3) + c(32, 24, 18, P.green2) + c(20, 30, 12, P.green) + c(44, 30, 12, P.green) + c(32, 18, 11, P.green3); };
  I.floare = function () { var b = '', i; for (i = 0; i < 6; i++) b += g(e(32, 18, 7, 11, P.pink), 'rotate(' + i * 60 + ' 32 30)'); return s('M32 34 V58', P.green2, 4) + b + c(32, 30, 7, P.yellow); };
  I.seminte = function () { return e(22, 30, 6, 9, P.wood2, ' transform="rotate(-20 22 30)"') + e(38, 26, 6, 9, P.wood, ' transform="rotate(15 38 26)"') + e(32, 44, 6, 9, P.wood2, ' transform="rotate(40 32 44)"'); };
  I.ghiveci = function () { return p('M14 26 H50 L44 56 H20 Z', P.orange2) + r(10, 18, 44, 10, P.orange, 3) + s('M32 18 V8', P.green2, 4) + c(28, 6, 5, P.green) + c(38, 8, 5, P.green3); };
  I.rock = function () { return p('M8 52 L18 26 L34 18 L52 30 L58 52 Z', P.metal2) + p('M18 26 L34 18 L36 34 Z', P.metal); };

  /* — viețuitoare — */
  I.pisica = function () { return poly('14,26 18,10 30,20', P.metal2) + poly('50,26 46,10 34,20', P.metal2) + e(32, 34, 20, 17, P.metal) + c(25, 32, 3, P.ink) + c(39, 32, 3, P.ink) + p('M29 39 H35 L32 43 Z', P.pink) + s('M12 34 H24 M12 40 H24 M40 34 H52 M40 40 H52', P.white, 2); };
  I.caine = function () { return e(20, 24, 7, 13, P.wood2) + e(44, 24, 7, 13, P.wood2) + e(32, 36, 19, 16, P.wood3) + c(26, 34, 3, P.ink) + c(38, 34, 3, P.ink) + e(32, 44, 6, 5, P.ink) + s('M32 48 V52', P.ink2, 2); };
  I.pasare = function () { return e(30, 34, 17, 14, P.blue) + c(44, 24, 9, P.blue2) + poly('52,24 62,27 52,30', P.orange) + c(46, 22, 2.5, P.white) + p('M18 32 C24 26 34 30 30 40 Z', P.blue3) + s('M26 48 V56 M34 48 V56', P.orange2, 3); };
  I.peste = function () { return e(30, 32, 20, 13, P.orange) + poly('48,32 60,22 60,42', P.orange2) + c(20, 29, 3, P.ink) + p('M28 20 C32 26 36 26 38 22 Z', P.yellow); };
  I.albina = function () { return e(30, 34, 17, 12, P.yellow) + s('M24 24 V44 M32 23 V45 M40 26 V42', P.ink2, 4) + e(24, 20, 11, 7, 'rgba(255,255,255,.7)', ' transform="rotate(-20 24 20)"') + c(46, 30, 3, P.ink) + s('M14 30 L8 24 M18 26 L14 18', P.ink2, 2); };
  I.furnica = function () { return c(18, 34, 7, P.ink2) + c(31, 34, 6, P.ink2) + e(46, 34, 10, 8, P.ink2) + s('M14 28 L8 20 M20 28 L18 18', P.ink2, 2) + s('M30 40 L26 50 M34 40 L38 50 M42 40 L44 50', P.ink2, 2); };
  I.robot = function () { return r(16, 20, 32, 28, P.metal2, 7) + r(22, 27, 20, 12, P.ink, 5) + c(28, 33, 3, P.teal) + c(36, 33, 3, P.teal) + s('M32 20 V12', P.metal2, 3) + c(32, 9, 4, P.red) + r(10, 28, 6, 14, P.metal, 3) + r(48, 28, 6, 14, P.metal, 3) + r(22, 48, 8, 8, P.ink2, 2) + r(34, 48, 8, 8, P.ink2, 2); };

  /* — obiecte de casă & jucării — */
  I.minge = function () { return c(32, 32, 22, P.white) + p('M32 10 A22 22 0 0 1 54 32 L32 32 Z', P.red) + p('M32 54 A22 22 0 0 1 10 32 L32 32 Z', P.blue) + c(32, 32, 22, 'none', ' stroke="' + P.ink2 + '" stroke-width="3"'); };
  I.bicicleta = function () { return c(16, 42, 12, 'none', ' stroke="' + P.ink2 + '" stroke-width="4"') + c(48, 42, 12, 'none', ' stroke="' + P.ink2 + '" stroke-width="4"') + s('M16 42 L30 42 L38 24 L48 42 M30 42 L38 24 M38 24 H46', P.red, 4); };
  I.masinuta = function () { return p('M8 40 L14 26 H40 L52 40 Z', P.red) + r(18, 28, 16, 10, P.blue3, 2) + c(20, 44, 8, P.ink) + c(44, 44, 8, P.ink) + c(20, 44, 3, P.metal3) + c(44, 44, 3, P.metal3); };
  I.barca = function () { return p('M6 38 H58 L48 52 H16 Z', P.wood) + s('M32 38 V10', P.wood2, 4) + p('M32 12 L52 32 H32 Z', P.white) + p('M32 14 L14 32 H32 Z', P.red); };
  I.racheta = function () { return p('M32 4 C44 16 44 32 40 44 H24 C20 32 20 16 32 4 Z', P.metal3) + c(32, 22, 7, P.blue) + p('M24 36 L12 52 L24 46 Z', P.red) + p('M40 36 L52 52 L40 46 Z', P.red) + p('M28 46 H36 L32 60 Z', P.orange); };
  I.zmeu = function () { return poly('32,4 54,30 32,56 10,30', P.purple) + s('M32 4 V56 M10 30 H54', 'rgba(255,255,255,.6)', 2) + s('M32 56 C40 60 24 62 32 64', P.pink, 3); };
  I.umbrela = function () { return p('M6 32 A26 26 0 0 1 58 32 Z', P.red) + s('M6 32 C12 26 18 38 24 32 C30 26 34 38 42 32 C48 26 52 38 58 32', P.red2, 2) + s('M32 32 V52 C32 58 24 58 24 52', P.ink2, 4); };
  I.vela = function () { return s('M18 56 V8', P.wood2, 5) + p('M20 10 C44 20 46 36 42 48 H20 Z', P.cream) + s('M24 18 C36 26 38 36 36 44', P.blue3, 2); };
  I.parasuta = function () { return p('M6 28 A26 26 0 0 1 58 28 Z', P.orange) + s('M6 28 L28 50 M32 28 L28 50 M58 28 L36 50 M32 28 L36 50', P.wood3, 2) + r(24, 48, 16, 10, P.wood, 3); };
  I.cana = function () { return p('M14 16 H44 L40 52 H18 Z', P.white) + s('M44 22 C56 22 56 40 44 40', P.white, 6) + p('M16 24 H42 L40 48 H18 Z', P.orange); };
  I.farfurie = function () { return e(32, 36, 26, 12, P.white) + e(32, 34, 26, 11, P.metal3) + e(32, 33, 16, 6, P.white); };
  I.lingura = function () { return e(24, 18, 10, 13, P.metal3) + e(24, 18, 6, 9, P.metal) + s('M28 28 L46 54', P.metal2, 6); };
  I.oala = function () { return p('M12 22 H52 L48 52 H16 Z', P.metal2) + r(8, 16, 48, 8, P.metal, 4) + s('M4 24 H10 M54 24 H60', P.ink2, 5) + e(32, 20, 20, 4, P.blue3); };
  I.frigider = function () { return r(14, 6, 36, 52, P.metal3, 6) + s('M14 26 H50', P.metal2, 3) + r(40, 14, 4, 8, P.metal2, 2) + r(40, 32, 4, 8, P.metal2, 2); };
  I.aragaz = function () { return r(10, 22, 44, 34, P.metal2, 5) + c(22, 32, 6, P.ink) + c(42, 32, 6, P.ink) + r(18, 42, 28, 10, P.ink2, 3) + c(22, 32, 3, P.orange); };
  I.raft = function () { return r(8, 14, 48, 6, P.wood, 2) + r(8, 34, 48, 6, P.wood, 2) + r(8, 50, 48, 6, P.wood2, 2) + r(10, 6, 8, 8, P.red, 2) + r(24, 4, 8, 10, P.blue, 2) + r(38, 26, 8, 8, P.green, 2); };
  I.masa = function () { return r(6, 22, 52, 8, P.wood, 3) + r(12, 30, 6, 26, P.wood2, 2) + r(46, 30, 6, 26, P.wood2, 2); };
  I.scaun = function () { return r(14, 30, 36, 7, P.wood, 3) + r(14, 8, 7, 24, P.wood2, 3) + r(16, 37, 6, 20, P.wood2, 2) + r(42, 37, 6, 20, P.wood2, 2); };
  I.pat = function () { return r(6, 30, 52, 14, P.blue, 4) + r(6, 20, 12, 24, P.wood, 3) + r(46, 26, 12, 18, P.wood, 3) + e(24, 30, 10, 5, P.white); };
  I.usa = function () { return r(12, 6, 40, 52, P.wood, 4) + r(18, 12, 28, 40, P.wood2, 3) + c(42, 34, 3, P.yellow); };
  I.fereastra = function () { return r(8, 8, 48, 44, P.blue3, 4) + s('M32 8 V52 M8 30 H56', P.white, 5) + r(8, 8, 48, 44, 'none', 4, ' stroke="' + P.wood + '" stroke-width="5"'); };
  I.sticla = function () { return p('M26 6 H38 V18 L44 28 V54 H20 V28 L26 18 Z', 'rgba(160,225,255,.75)') + p('M22 34 H42 V52 H22 Z', P.blue) + r(24, 2, 16, 6, P.red, 2); };
  I.pahar = function () { return p('M18 12 H46 L42 54 H22 Z', 'rgba(180,230,255,.55)') + p('M20 30 H44 L42 54 H22 Z', P.blue3) + e(32, 30, 12, 3, P.blue); };
  I.telefon = function () { return r(18, 6, 28, 52, P.ink2, 6) + r(21, 12, 22, 38, P.blue3, 3) + c(32, 54, 3, P.metal2); };
  I.fluier = function () { return p('M8 26 H40 A10 10 0 0 1 40 46 H8 Z', P.metal2) + c(34, 36, 4, P.ink) + s('M46 30 C54 34 54 38 46 42', P.blue3, 3); };
  I.toba = function () { return e(32, 22, 22, 8, P.cream) + p('M10 22 V42 A22 8 0 0 0 54 42 V22 Z', P.red) + s('M14 26 L24 40 M32 24 V44 M50 26 L40 40', P.cream, 3); };
  I.chitara = function () { return c(28, 40, 17, P.wood) + c(44, 30, 12, P.wood) + c(28, 40, 6, P.ink2) + s('M50 22 L60 8', P.wood2, 6) + s('M46 24 L58 10', P.cream, 2); };
  I.clopotel = function () { return p('M32 10 C44 10 46 24 46 42 H18 C18 24 20 10 32 10 Z', P.yellow) + e(32, 44, 16, 5, P.yellow2) + c(32, 50, 5, P.wood2) + c(32, 8, 4, P.metal2); };
  I.leagan = function () { return s('M10 8 H54', P.wood2, 5) + ln(20, 8, 20, 40, P.metal2, 3) + ln(44, 8, 44, 40, P.metal2, 3) + r(14, 40, 36, 8, P.wood, 3); };
  I.balansoar = function () { return poly('32,28 20,48 44,48', P.ink2) + p('M6 30 L58 22 L58 30 L6 38 Z', P.wood) + c(10, 30, 5, P.red) + c(54, 22, 5, P.blue); };
  I.lemn = function () { return r(6, 22, 52, 20, P.wood, 3) + s('M12 28 C24 32 36 24 52 30', P.wood2, 2) + s('M12 36 C26 38 40 32 52 36', P.wood2, 2); };
  I.carton = function () { return p('M10 18 H54 V50 H10 Z', P.wood3) + s('M10 26 H54 M10 34 H54 M10 42 H54', P.wood, 2); };
  I.folie = function () { return p('M10 12 C22 18 30 8 42 14 C50 18 54 12 58 14 V50 C50 46 44 54 34 50 C22 45 16 52 10 48 Z', 'rgba(190,230,255,.65)') + s('M18 20 C26 26 34 20 44 26', P.white, 2); };
  I.lipici = function () { return p('M24 14 H40 V22 L46 30 V54 H18 V30 L24 22 Z', P.cream) + r(18, 34, 28, 14, P.orange, 2) + r(28, 4, 8, 10, P.red, 2); };
  I.banda_adeziva = function () { return c(32, 32, 22, P.yellow) + c(32, 32, 10, P.cream) + p('M50 26 L62 30 L62 38 L50 42 Z', 'rgba(255,220,120,.8)'); };
  I.cui = function () { return e(32, 10, 12, 5, P.metal2) + p('M27 12 H37 L33 56 H31 Z', P.metal); };
  I.sina = function () { return s('M14 6 V58 M50 6 V58', P.metal2, 5) + s('M8 18 H56 M8 34 H56 M8 50 H56', P.wood2, 6); };

  /* Etichete în română pentru fiecare piesă */
  var LBL = {
    roata: 'Roată', roata_dintata: 'Roată dințată', axa: 'Ax', scripete: 'Scripete', sfoara: 'Sfoară',
    parghie: 'Pârghie', rampa: 'Rampă', arc: 'Arc', surub: 'Șurub', banda: 'Bandă rulantă',
    manivela: 'Manivelă', elice: 'Elice', suport: 'Suport', carlig: 'Cârlig', greutate: 'Greutate',
    plutitor: 'Plutitor', magnet: 'Magnet', balon: 'Balon', panza: 'Pânză', palnie: 'Pâlnie',
    tub: 'Furtun', robinet: 'Robinet', sita: 'Sită', filtru: 'Filtru', burete: 'Burete', plasa: 'Plasă',
    galeata: 'Găleată', cutie: 'Cutie', capac: 'Capac', tava: 'Tavă', jgheab: 'Jgheab', scara: 'Scară',
    punte: 'Punte', tobogan: 'Tobogan', cos: 'Coș', roata_apa: 'Roată de apă', pompa: 'Pompă',
    bec: 'Bec', baterie: 'Baterie', fir: 'Fir electric', intrerupator: 'Întrerupător',
    panou_solar: 'Panou solar', motoras: 'Motoraș', ventilator: 'Ventilator', sonerie: 'Sonerie',
    difuzor: 'Difuzor', microfon: 'Microfon', oglinda: 'Oglindă', lupa: 'Lupă', lentila: 'Lentilă',
    prisma: 'Prismă', lampa: 'Lampă', lumanare: 'Lumânare', senzor: 'Senzor',
    termometru: 'Termometru', ceas: 'Ceas', cantar: 'Cântar', balanta: 'Balanță', rigla: 'Riglă',
    clepsidra: 'Clepsidră', carte: 'Carte', apa: 'Apă', gheata: 'Gheață', foc: 'Flacără', abur: 'Abur',
    sare: 'Sare', soare: 'Soare', nor: 'Nor', vant: 'Vânt', ploaie: 'Ploaie', luna: 'Lună', stea: 'Stea',
    planta: 'Plantă', copac: 'Copac', floare: 'Floare', seminte: 'Semințe', ghiveci: 'Ghiveci',
    rock: 'Piatră', pisica: 'Pisică', caine: 'Câine', pasare: 'Pasăre', peste: 'Pește', albina: 'Albină',
    furnica: 'Furnică', robot: 'Robot', minge: 'Minge', bicicleta: 'Bicicletă', masinuta: 'Mașinuță',
    barca: 'Barcă', racheta: 'Rachetă', zmeu: 'Zmeu', umbrela: 'Umbrelă', vela: 'Velă',
    parasuta: 'Parașută', cana: 'Cană', farfurie: 'Farfurie', lingura: 'Lingură', oala: 'Oală',
    frigider: 'Frigider', aragaz: 'Aragaz', raft: 'Raft', masa: 'Masă', scaun: 'Scaun', pat: 'Pat',
    usa: 'Ușă', fereastra: 'Fereastră', sticla: 'Sticlă', pahar: 'Pahar', telefon: 'Telefon',
    fluier: 'Fluier', toba: 'Tobă', chitara: 'Chitară', clopotel: 'Clopoțel', leagan: 'Leagăn',
    balansoar: 'Balansoar', lemn: 'Scândură', carton: 'Carton', folie: 'Folie', lipici: 'Lipici',
    banda_adeziva: 'Bandă adezivă', cui: 'Cui', sina: 'Șină', resort: 'Resort'
  };

  /* ============================================================
     SCENE — fundaluri stratificate
     ============================================================ */
  var SC = {};
  /* număr pseudo-aleator, dar mereu același pentru același i: stelele stau
     împrăștiate natural, nu aliniate pe coloane, și nu se mută între randări */
  function rnd(i) { var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function sky(c1, c2) {
    return '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect x="0" y="0" width="400" height="240" fill="url(#sky)"/>';
  }
  function floor(y, col, col2) {
    return r(0, y, 400, 240 - y, col, 0) + r(0, y, 400, 6, col2, 0);
  }
  function hills(y, col) { return p('M0 ' + y + ' C60 ' + (y - 40) + ' 110 ' + (y - 10) + ' 170 ' + (y - 28) + ' C240 ' + (y - 50) + ' 300 ' + (y - 5) + ' 400 ' + (y - 24) + ' V240 H0 Z', col); }

  SC.atelier = function () {
    return r(0, 0, 400, 240, '#f6e3c6', 0) + r(0, 0, 400, 160, '#efd7b4', 0) +
      s('M0 40 H400 M0 90 H400', '#e3c69b', 3) +
      g(I.raft(), 'translate(20 20) scale(1.2)') + g(I.raft(), 'translate(300 20) scale(1.2)') +
      floor(168, '#c98f56', '#a86c35') +
      g(I.masa(), 'translate(140 120) scale(1.9)');
  };
  SC.bucatarie = function () {
    return r(0, 0, 400, 240, '#eaf4f7', 0) + r(0, 100, 400, 140, '#dcebf0', 0) +
      s('M0 24 H400 M0 62 H400 M60 0 V100 M180 0 V100 M300 0 V100', '#cfe2e9', 3) +
      g(I.frigider(), 'translate(310 60) scale(1.7)') + g(I.aragaz(), 'translate(30 96) scale(1.6)') +
      floor(176, '#bcd2da', '#9db6c0');
  };
  SC.gradina = function () {
    return sky('#a9e2ff', '#dff5ff') + c(340, 46, 26, '#ffd964') + hills(170, '#8fd47a') +
      g(I.copac(), 'translate(20 60) scale(1.7)') + g(I.copac(), 'translate(320 84) scale(1.2)') +
      floor(196, '#69bb5c', '#4f9c46') + g(I.floare(), 'translate(120 186) scale(.8)') + g(I.floare(), 'translate(250 190) scale(.7)');
  };
  SC.scoala = function () {
    return sky('#bfe8ff', '#e8f7ff') + r(30, 46, 150, 130, '#f6d2a0', 4) + poly('20,50 190,50 105,14', '#e07a5a') +
      r(80, 110, 44, 66, '#b9764a', 3) + r(46, 70, 30, 26, '#a9dcf5', 3) + r(140, 70, 30, 26, '#a9dcf5', 3) +
      floor(176, '#a8b6bd', '#8b9ba3') + g(I.copac(), 'translate(300 90) scale(1.5)');
  };
  SC.strada = function () {
    return sky('#c6ecff', '#eef9ff') + r(20, 40, 90, 120, '#e9c9a3', 4) + r(130, 20, 80, 140, '#cfd8e0', 4) +
      r(230, 56, 100, 104, '#f2d0b6', 4) + r(40, 60, 24, 24, '#8fd0ef', 3) + r(150, 44, 22, 22, '#8fd0ef', 3) +
      r(258, 76, 24, 24, '#8fd0ef', 3) + floor(160, '#6b7780', '#59636b') +
      s('M0 200 H60 M100 200 H160 M200 200 H260 M300 200 H360', '#ffe9a8', 5);
  };
  SC.rau = function () {
    return sky('#a9e2ff', '#e2f7ff') + hills(150, '#7fc98f') + r(0, 150, 400, 90, '#4fb7e8', 0) +
      s('M0 170 C60 164 90 178 150 172 C220 165 260 180 400 172', '#9adcf7', 4) +
      s('M0 200 C80 194 120 208 200 202 C280 196 320 210 400 204', '#9adcf7', 4) +
      g(I.copac(), 'translate(300 60) scale(1.4)');
  };
  SC.padure = function () {
    return sky('#bfeaff', '#e6f8e8') + hills(160, '#4f9c46') +
      g(I.copac(), 'translate(10 70) scale(1.8)') + g(I.copac(), 'translate(120 90) scale(1.4)') +
      g(I.copac(), 'translate(240 60) scale(2)') + g(I.copac(), 'translate(330 96) scale(1.3)') +
      floor(196, '#5fae52', '#47903e');
  };
  SC.spatiu = function () {
    var b = r(0, 0, 400, 240, '#141a35', 0), i, x, y;
    for (i = 0; i < 46; i++) { x = rnd(i * 2) * 396; y = rnd(i * 2 + 1) * 232; b += c(x + 2, y + 2, (i % 3) ? 1.4 : 2.4, i % 4 ? '#ffffff' : '#ffe27a'); }
    return b + c(70, 60, 30, '#7f88d8') + c(62, 52, 8, '#6a72c0') + c(82, 70, 6, '#6a72c0') +
      e(320, 170, 60, 18, '#3a2f6b') + c(320, 160, 34, '#c98a6b') + c(310, 152, 8, '#b3745a');
  };
  SC.laborator = function () {
    return r(0, 0, 400, 240, '#eef2f7', 0) + r(0, 120, 400, 120, '#e2e9f2', 0) +
      s('M0 30 H400', '#d6def0', 3) + r(280, 26, 100, 90, '#dbe7f2', 4) + s('M280 56 H380 M280 86 H380', '#c4d3e2', 3) +
      floor(180, '#cbd6e2', '#adbccc') + g(I.lupa(), 'translate(24 30) scale(1.1)');
  };
  SC.camera = function () {
    return r(0, 0, 400, 240, '#fdeee0', 0) + r(0, 0, 400, 170, '#f7e0cd', 0) +
      s('M40 0 V170 M120 0 V170 M200 0 V170 M280 0 V170 M360 0 V170', '#f0d3ba', 2) +
      g(I.fereastra(), 'translate(250 26) scale(1.6)') + floor(170, '#d2a473', '#b3844f') +
      g(I.pat(), 'translate(20 96) scale(1.7)');
  };
  SC.plaja = function () {
    return sky('#a9e2ff', '#e6f8ff') + c(60, 44, 22, '#ffd964') + r(0, 130, 400, 46, '#4fb7e8', 0) +
      s('M0 146 C60 140 90 154 150 148 C220 141 260 156 400 148', '#9adcf7', 4) +
      floor(172, '#f2dda8', '#e0c684') + g(I.barca(), 'translate(280 110) scale(1.3)');
  };
  SC.munte = function () {
    return sky('#a9dcff', '#e8f6ff') + poly('40,180 130,44 220,180', '#8fa3b0') + poly('130,44 160,88 100,88', '#ffffff') +
      poly('180,180 280,70 380,180', '#7d919e') + poly('280,70 305,108 255,108', '#ffffff') +
      floor(176, '#8fbf7f', '#6ea25e');
  };
  SC.ferma = function () {
    return sky('#c6ecff', '#eef9ff') + r(220, 60, 140, 110, '#e0705f', 4) + poly('210,64 370,64 290,20', '#a8483c') +
      r(270, 110, 40, 60, '#8b3a30', 3) + hills(170, '#93d47f') + floor(190, '#6fbb5c', '#529c46') +
      g(I.copac(), 'translate(20 78) scale(1.5)');
  };
  SC.noapte = function () {
    var b = r(0, 0, 400, 240, '#1e2a4a', 0), i;
    for (i = 0; i < 34; i++) b += c(rnd(100 + i * 2) * 392 + 4, rnd(101 + i * 2) * 140 + 6, i % 3 ? 1.3 : 2.2, '#ffffff');
    return b + g(I.luna(), 'translate(300 16) scale(1.3)') + hills(180, '#26355c') + floor(200, '#1b2742', '#141d33');
  };
  SC.camera_noapte = function () {
    /* aceeași cameră, dar pe întuneric: perete albăstrui, geam cu lună, ușă și podea de lemn */
    var i, st = '';
    for (i = 0; i < 6; i++) st += c(268 + rnd(300 + i) * 66, 44 + rnd(320 + i) * 50, 1.2, '#ffffff');
    return r(0, 0, 400, 240, '#2a3352', 0) + r(0, 0, 400, 170, '#333d60', 0) +
      s('M40 0 V170 M120 0 V170 M200 0 V170 M280 0 V170 M360 0 V170', '#3b4669', 2) +
      r(250, 26, 102, 102, '#8a6b45', 8) + r(258, 34, 86, 86, '#1b2340', 4) + st +
      c(322, 62, 14, '#f5e6a3') + c(328, 57, 12, '#1b2340') +
      s('M301 34 V120 M258 77 H344', '#8a6b45', 5) +
      g(I.usa(), 'translate(40 62) scale(1.75)') +
      floor(170, '#5a4332', '#463326') + r(0, 170, 400, 70, 'rgba(0,0,0,.12)', 0);
  };
  SC.ploios = function () {
    var b = sky('#8fa8bb', '#c8d9e4'), i;
    for (i = 0; i < 26; i++) b += ln((i * 71) % 396, (i * 37) % 120, (i * 71) % 396 - 6, (i * 37) % 120 + 18, 'rgba(255,255,255,.55)', 2);
    return b + g(I.nor(), 'translate(30 6) scale(1.6)') + g(I.nor(), 'translate(240 0) scale(1.9)') +
      floor(180, '#7f9aa8', '#68818e');
  };
  SC.terenjoaca = function () {
    return sky('#bfe8ff', '#eaf8ff') + g(I.tobogan(), 'translate(240 80) scale(1.8)') +
      g(I.leagan(), 'translate(30 70) scale(1.9)') + floor(190, '#e6c88f', '#cba96d');
  };
  SC.pod = function () {
    return sky('#bfe8ff', '#eef9ff') + r(0, 170, 400, 70, '#4fb7e8', 0) +
      s('M20 170 C120 90 280 90 380 170', '#c98f56', 10) + r(0, 158, 400, 12, '#a86c35', 2) +
      ln(90, 128, 90, 158, '#a86c35', 5) + ln(200, 108, 200, 158, '#a86c35', 5) + ln(310, 128, 310, 158, '#a86c35', 5);
  };
  SC.magazin = function () {
    return r(0, 0, 400, 240, '#fff2e0', 0) + r(0, 0, 400, 40, '#ef8a5a', 0) +
      s('M0 40 H400', '#d86f42', 4) + g(I.raft(), 'translate(20 60) scale(2)') + g(I.raft(), 'translate(260 60) scale(2)') +
      floor(190, '#e0d3c0', '#c3b39c');
  };
  SC.gara = function () {
    return sky('#c6ecff', '#eef9ff') + r(0, 60, 400, 60, '#c9d6de', 0) + s('M0 120 H400', '#a8b8c2', 4) +
      floor(150, '#9fadb5', '#83919a') + g(I.sina(), 'translate(0 170) scale(3) rotate(90 32 32)');
  };

  var SCENE_KEYS = Object.keys(SC);

  /* ============================================================
     PERSONAJE — Ana, Rareș și robotul Bit
     ============================================================ */
  function kid(skin, hair, shirt, hairStyle, mood) {
    var eyes, mouth;
    if (mood === 'gandeste') {
      eyes = c(26, 30, 2.6, P.ink) + c(38, 30, 2.6, P.ink) + s('M22 24 L30 22 M42 22 L34 24', P.ink2, 2);
      mouth = s('M28 40 H36', P.ink2, 2.5);
    } else if (mood === 'trist') {
      eyes = c(26, 31, 3, P.ink) + c(38, 31, 3, P.ink);
      mouth = s('M27 42 C30 38 34 38 37 42', P.ink2, 2.5);
    } else if (mood === 'bucuros') {
      eyes = s('M22 30 C25 26 29 26 31 30', P.ink, 3) + s('M33 30 C36 26 40 26 42 30', P.ink, 3);
      mouth = p('M25 37 H39 C39 45 25 45 25 37 Z', P.ink) + p('M28 42 H36 C35 45 29 45 28 42 Z', P.pink);
    } else {
      eyes = c(26, 30, 3.2, P.ink) + c(38, 30, 3.2, P.ink) + c(27, 29, 1.1, P.white) + c(39, 29, 1.1, P.white);
      mouth = s('M27 39 C30 43 34 43 37 39', P.ink2, 2.5);
    }
    var hairSvg = hairStyle === 'lung'
      ? p('M14 30 C12 10 52 10 50 30 C50 44 46 46 46 34 C40 22 24 22 18 34 C18 46 14 44 14 30 Z', hair) + e(16, 42, 6, 12, hair) + e(48, 42, 6, 12, hair)
      : p('M14 30 C12 10 52 10 50 30 C46 22 42 20 32 20 C22 20 18 24 14 30 Z', hair);
    return c(32, 32, 20, skin) + hairSvg + eyes + mouth + c(24, 37, 3.5, 'rgba(255,140,140,.35)') + c(40, 37, 3.5, 'rgba(255,140,140,.35)') +
      p('M12 62 C12 50 22 46 32 46 C42 46 52 50 52 62 Z', shirt) + c(32, 50, 4, P.white);
  }
  var CH = {
    ana: function (mood) { return kid('#f6d0b0', '#8a4b2a', P.teal, 'lung', mood); },
    rares: function (mood) { return kid('#e9bd93', '#2f2a26', P.orange, 'scurt', mood); },
    bit: function (mood) {
      var eye = mood === 'bucuros' ? s('M20 30 C24 24 30 24 33 30', P.teal, 3.5) + s('M37 30 C40 24 46 24 49 30', P.teal, 3.5)
        : mood === 'gandeste' ? c(26, 31, 3.4, P.teal) + c(40, 29, 3.4, P.teal)
          : c(26, 30, 4, P.teal) + c(40, 30, 4, P.teal);
      return s('M32 12 V6', P.metal2, 3) + c(32, 5, 3.5, P.orange) +
        r(12, 14, 40, 32, P.metal3, 12) + r(17, 22, 30, 16, P.ink, 8) + eye +
        r(6, 26, 6, 14, P.metal2, 3) + r(52, 26, 6, 14, P.metal2, 3) +
        r(18, 46, 28, 12, P.metal2, 5) + c(32, 52, 3, P.orange);
    }
  };

  /* ---------- Ajutoare de randare ---------- */
  function svgWrap(inner, vb, cls) {
    return '<svg viewBox="' + (vb || '0 0 64 64') + '" class="' + (cls || '') + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }
  function icon(key, cls) {
    var f = I[key];
    return svgWrap(f ? f() : c(32, 32, 20, P.metal2), '0 0 64 64', 'ic ' + (cls || ''));
  }
  function label(key) { return LBL[key] || key; }
  function character(who, mood, cls) { return svgWrap((CH[who] || CH.bit)(mood || 'normal'), '0 0 64 66', 'ch ' + (cls || '')); }

  /* ============================================================
     Scenă completă: fundal + obiecte așezate CU SENS
     • fiecare scenă are o linie de sol și o zonă de podea liberă
       (fără mobila desenată în fundal);
     • obiectele obișnuite stau cu talpa exact pe sol — poziția se
       MĂSOARĂ după desen (settle), nu se presupune;
     • ce zboară de felul lui stă pe cer, obiectele de perete stau la
       înălțime de perete, în spațiu totul plutește;
     • ce e deja în fundal (patul din cameră, frigiderul, luna) nu se
       mai desenează o dată;
     • mărimile sunt apropiate de realitate: o cană e mică, un pat e mare.
     ============================================================ */
  var GROUND = {
    atelier: 168, bucatarie: 176, gradina: 196, scoala: 176, strada: 160, rau: 150,
    padure: 196, spatiu: null, laborator: 180, camera: 170, camera_noapte: 170, plaja: 172,
    munte: 176, ferma: 190, noapte: 200, ploios: 180, terenjoaca: 190, pod: 158, magazin: 190, gara: 150
  };
  /* podeaua liberă (x), fără mobila din fundal; [perete liber] pentru obiectele agățate */
  var FREE = {
    atelier: [[40, 125], [275, 360]], bucatarie: [[150, 300]], camera: [[160, 370]], camera_noapte: [[150, 370]],
    laborator: [[110, 370]], magazin: [[158, 252]], terenjoaca: [[150, 240]], scoala: [[40, 280]],
    gradina: [[135, 305]], plaja: [[30, 250]], ferma: [[120, 340]], rau: [[40, 270]]
  };
  var WALLFREE = { camera: [140, 230], camera_noapte: [150, 235], atelier: [130, 270], laborator: [110, 260], magazin: [160, 250] };
  var SCENE_HAS = {
    gradina: ['soare', 'floare', 'copac'], plaja: ['soare', 'barca'], noapte: ['luna'], scoala: ['copac'],
    rau: ['copac'], terenjoaca: ['leagan', 'tobogan'], laborator: ['lupa'], camera: ['fereastra', 'pat'],
    camera_noapte: ['fereastra', 'luna', 'usa', 'stea'], atelier: ['raft', 'masa'], bucatarie: ['frigider', 'aragaz'],
    gara: ['sina'], padure: ['copac'], ferma: ['copac'], magazin: ['raft'], ploios: ['nor', 'ploaie']
  };
  var SKY = { soare: 1, luna: 1, stea: 1, nor: 1, ploaie: 1, pasare: 1, zmeu: 1, balon: 1, parasuta: 1, racheta: 1 };
  var MID = { vant: 1, albina: 1, abur: 1, elice: 1 };
  var WALL = { fereastra: 1, raft: 1, ceas: 1, oglinda: 1, bec: 1, lampa: 1, sonerie: 1, intrerupator: 1,
    senzor: 1, difuzor: 1, termometru: 1, panou_solar: 1, clopotel: 1 };
  /* cât de mare e obiectul față de o cutie obișnuită (1 = mărime medie) */
  var SIZE = {
    cana: .6, pahar: .6, lingura: .5, farfurie: .6, sare: .5, cui: .45, surub: .45, lipici: .55, banda_adeziva: .55,
    bec: .6, baterie: .55, magnet: .6, telefon: .6, ceas: .6, fluier: .5, rigla: .6, lupa: .6, seminte: .5, carte: .6,
    clepsidra: .6, termometru: .6, senzor: .55, intrerupator: .5, fir: .6, sticla: .65, capac: .5, minge: .7,
    albina: .5, furnica: .45, peste: .6, pasare: .65, floare: .7, ghiveci: .75, oala: .75, gheata: .6, foc: .7,
    carton: .8, cutie: .8, galeata: .8, cos: .8, tava: .7, umbrela: .9, balon: .8, zmeu: .9,
    pat: 1.35, masa: 1.25, frigider: 1.4, aragaz: 1.3, usa: 1.4, scara: 1.4, leagan: 1.4, tobogan: 1.4,
    masinuta: 1.2, bicicleta: 1.25, barca: 1.3, racheta: 1.3, copac: 1.6, robot: 1.1, roata_apa: 1.3,
    scaun: 1.05, raft: 1.15, panou_solar: 1.1, plasa: 1.1, sina: 1.2, punte: 1.3, rampa: 1.2
  };

  /* împarte obiectele pe intervalele libere, cu mărimile lor, fără să se suprapună */
  function layoutRow(items, ranges, base) {
    var out = [];
    if (!items.length) return out;
    var groups = (ranges.length > 1 && items.length > 1) ? ranges
      : [ranges.reduce(function (a, b) { return (b[1] - b[0]) > (a[1] - a[0]) ? b : a; })];
    var per = Math.ceil(items.length / groups.length), idx = 0;
    groups.forEach(function (rg) {
      var chunk = items.slice(idx, idx + per); idx += per;
      if (!chunk.length) return;
      var W = rg[1] - rg[0], gap = 12;
      var widths = chunk.map(function (k) { return 64 * base * (SIZE[k] || 1); });
      var need = widths.reduce(function (a, b) { return a + b; }, 0) + gap * (chunk.length - 1);
      var f = need > W ? W / need : 1;                      /* prea strâmt: micșorăm proporțional */
      var total = need * f, x = rg[0] + (W - total) / 2;
      chunk.forEach(function (k, j) {
        var w = Math.min(widths[j] * f, 64 * 1.75);          /* nimic mai mare de 1,75× */
        out.push({ k: k, x: x + w / 2, sc: w / 64 });
        x += w + gap * f;
      });
    });
    return out;
  }
  function place(o, y, anchor, cls) {
    /* transformare provizorie (talpa la ~58 din 64); settle() o corectează după desenul real */
    var ty = anchor === 'bottom' ? y - 58 * o.sc : y - 32 * o.sc;
    return '<g class="prop ' + cls + '" data-x="' + o.x.toFixed(1) + '" data-y="' + y + '" data-sc="' + o.sc.toFixed(3) +
      '" data-anchor="' + anchor + '" transform="translate(' + (o.x - 32 * o.sc).toFixed(1) + ' ' + ty.toFixed(1) +
      ') scale(' + o.sc.toFixed(3) + ')">' + I[o.k]() + '</g>';
  }
  /* ce ocupă fundalul pe cer (soarele din grădină, luna din noapte, norii) */
  var SKYOCC = { gradina: [[310, 370]], plaja: [[34, 86]], noapte: [[296, 386]], ploios: [[26, 136], [236, 366]], spatiu: [[36, 104]] };

  /* intervalele libere dintre cele ocupate, în [lo, hi] */
  function gaps(occ, lo, hi) {
    var segs = occ.slice().sort(function (a, b) { return a[0] - b[0]; }), out = [], cur = lo;
    segs.forEach(function (sg) { if (sg[0] > cur) out.push([cur, sg[0]]); cur = Math.max(cur, sg[1]); });
    if (hi > cur) out.push([cur, hi]);
    return out;
  }
  function widest(list, fallback) {
    var best = null;
    list.forEach(function (g) { if (!best || g[1] - g[0] > best[1] - best[0]) best = g; });
    return best || fallback;
  }
  function complement(free, lo, hi) {
    var occ = [], cur = lo;
    free.slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (f) { if (f[0] > cur) occ.push([cur, f[0]]); cur = f[1]; });
    if (cur < hi) occ.push([cur, hi]);
    return occ;
  }

  function scene(key, props) {
    var bg = (SC[key] || SC.atelier)();
    var ground = GROUND[key] === undefined ? 176 : GROUND[key];
    var has = SCENE_HAS[key] || [];
    var list = (props || []).filter(function (k, i, a) { return I[k] && has.indexOf(k) < 0 && a.indexOf(k) === i; });
    var inner = '';

    if (ground === null) {                                   /* spațiu: totul plutește */
      layoutRow(list, [[120, 330]], 1.2).forEach(function (o, i) {
        inner += place(o, 130 + (i % 2) * 26, 'center', 'sky prop' + i);
      });
      return svgWrap(bg + inner, '0 0 400 240', 'scene-svg');
    }

    var sky = list.filter(function (k) { return SKY[k]; });
    var mid = list.filter(function (k) { return MID[k]; });
    var wall = list.filter(function (k) { return WALL[k]; });
    var floorItems = list.filter(function (k) { return !SKY[k] && !MID[k] && !WALL[k]; });
    var occ = (FREE[key] ? complement(FREE[key], 20, 380) : []);      /* mobila din fundal */
    var occTall = [];                                                 /* ce urcă până spre cer */

    /* 1. obiectele de jos, cu talpa pe sol; dacă sunt și obiecte de perete,
          podeaua liberă începe după zona lor, ca un scaun înalt să nu intre în raft */
    var base = floorItems.length === 1 ? 1.5 : floorItems.length === 2 ? 1.35 : 1.2;
    var fr = FREE[key] || [[50, 350]];
    if (wall.length && WALLFREE[key] && fr.length === 1) {
      var lo = Math.max(fr[0][0], WALLFREE[key][1] + 12);
      if (fr[0][1] - lo >= 110) fr = [[lo, fr[0][1]]];
    }
    layoutRow(floorItems, fr, base).forEach(function (o, i) {
      inner += place(o, ground + 4, 'bottom', 'prop' + i);
      var w = 64 * o.sc;
      occ.push([o.x - w / 2, o.x + w / 2]);
      if (ground + 4 - 62 * o.sc < 125) occTall.push([o.x - w / 2, o.x + w / 2]);
    });

    /* 2. obiectele de perete, la înălțime de perete, în golul rămas liber */
    var wz = WALLFREE[key] || [40, 360];
    var wr = widest(gaps(occ, wz[0], wz[1]), wz);
    if (wr[1] - wr[0] < 50) wr = wz;
    layoutRow(wall, [wr], 1.05).forEach(function (o, i) {
      inner += place(o, ground - 62, 'center', 'wall prop' + (floorItems.length + i));
      var w = 64 * o.sc; occ.push([o.x - w / 2, o.x + w / 2]);
    });

    /* 3. cerul: în golul cel mai larg dintre obiectele înalte și ce e deja pe cer */
    if (sky.length) {
      var gsky = widest(gaps(occTall.concat(SKYOCC[key] || []), 40, 360), [110, 290]);
      layoutRow(sky, [gsky], 1.05).forEach(function (o, i) {
        inner += place(o, 62, 'center', 'sky prop' + i);
      });
    }

    /* 4. aerul (vânt, abur, albină): în golul cel mai larg de deasupra solului;
          dacă nu e loc, sus, aproape de cer */
    if (mid.length) {
      var gmid = widest(gaps(occ, 30, 370), null);
      var needW = mid.reduce(function (a, k) { return a + 64 * (SIZE[k] || 1); }, 0) + 12 * (mid.length - 1);
      if (gmid && gmid[1] - gmid[0] >= needW * 0.8) {
        layoutRow(mid, [gmid], 1.0).forEach(function (o, i) { inner += place(o, ground - 56, 'center', 'sky prop' + i); });
      } else {
        var gtop = widest(gaps(occTall.concat(SKYOCC[key] || []), 40, 360), [140, 260]);
        layoutRow(mid, [gtop], 0.95).forEach(function (o, i) { inner += place(o, 100, 'center', 'sky prop' + i); });
      }
    }
    return svgWrap(bg + inner, '0 0 400 240', 'scene-svg');
  }

  /* După ce scena e în pagină: măsurăm fiecare obiect și îl așezăm exact —
     talpa pe sol pentru cele de jos, centrul la înălțimea cerută pentru restul. */
  function settle(svg) {
    if (!svg || !svg.querySelectorAll) return;
    var props = svg.querySelectorAll('g.prop[data-anchor]'), i;
    for (i = 0; i < props.length; i++) {
      var gEl = props[i], bb;
      try { bb = gEl.getBBox(); } catch (e) { continue; }
      if (!bb || !bb.width) continue;
      var sc = parseFloat(gEl.getAttribute('data-sc')), x = parseFloat(gEl.getAttribute('data-x')), y = parseFloat(gEl.getAttribute('data-y'));
      var tx = x - (bb.x + bb.width / 2) * sc;
      var ty = gEl.getAttribute('data-anchor') === 'bottom' ? y - (bb.y + bb.height) * sc : y - (bb.y + bb.height / 2) * sc;
      gEl.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + sc + ')');
    }
  }

  global.ART = {
    P: P, I: I, LBL: LBL, SC: SC, SCENE_KEYS: SCENE_KEYS, CH: CH,
    icon: icon, label: label, character: character, scene: scene, settle: settle, svgWrap: svgWrap,
    gear: gear, has: function (k) { return !!I[k]; }
  };
})(window);
