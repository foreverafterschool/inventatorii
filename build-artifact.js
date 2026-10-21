/* Împachetează jocul în:
   1) inventatorii-un-fisier.html — document complet, de trimis pe email / pus pe stick
   2) fișierul pentru publicare ca Artifact (fără <html>/<head>/<body>, gazda le adaugă) */
const fs = require('fs');
const rd = f => fs.readFileSync(f, 'utf8');
const html = rd('index.html');

const body = html.split('<body>')[1].split('</body>')[0]
  .replace(/\s*<script src="[^"]+"><\/script>/g, '')
  .replace(/\s*<link rel="stylesheet" href="css\/style.css">/, '');

const css = rd('css/style.css');
const js = ['js/art.js', 'js/fx.js', 'js/levels-build.js', 'js/levels-fix.js', 'js/game.js', 'js/accounts.js', 'js/auth.js'].map(rd).join('\n\n');
const FONT = '<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap" rel="stylesheet">';
const END = '<' + '/script>';

const inner = `<title>Inventatorii</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${FONT}
<style>
${css}
</style>
${body}
<script>
${js}
${END}
`;

fs.writeFileSync('inventatorii-un-fisier.html',
  '<!DOCTYPE html>\n<html lang="ro">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  '</head>\n<body>\n' + inner + '</body>\n</html>\n', 'utf8');

const dir = process.argv[2];
if (dir) { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(dir + '/inventatorii.html', inner, 'utf8'); }
console.log('gata —', (inner.length / 1024).toFixed(0) + ' KB');
