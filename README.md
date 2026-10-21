# Inventatorii

Joc educativ în limba română pentru copii de **clasele I–IV**, cu **200 de nivele**:
100 de probleme de rezolvat prin construcție și 100 de mistere de explicat prin investigație.

Rulează într-un browser obișnuit, **offline**, fără instalare și fără internet
(singura resursă externă este fontul; fără el jocul arată bine în continuare).

Totul încape într-un singur ecran: **nu există derulare nicăieri**, nici pe telefon,
nici pe laptop. Harta arată un capitol o dată (cu săgeți între capitole), textele și
desenele se dimensionează după înălțimea ferestrei, iar dacă o fereastră e neobișnuit
de joasă, jocul se micșorează singur, proporțional, ca să rămână tot vizibil.

---

## Acces cu utilizator și parolă

Jocul afișează mai întâi un formular de autentificare. Pentru Forever Afterschool
sunt configurate 36 de conturi: `user01`–`user30`, `teacher01`–`teacher05` și `admin`,
cu parolele din lista de conturi furnizată separat de administrator.
Toate conturile au acces la același joc. Conturile se administrează din panoul
`/admin` (vezi mai jos). Nu există înregistrare publică. Utilizatorul nu diferențiază literele mari de cele
mici; parola trebuie introdusă exact.

- „Ieși din cont” închide sesiunea fără să șteargă progresul.
- Sesiunea se păstrează la reîncărcare în aceeași filă, maximum 8 ore, folosind
  `sessionStorage`. Dacă browserul blochează stocarea, login-ul funcționează doar
  până la reîncărcare.
- Progresul rămâne în browser, separat pentru fiecare cont, în chei precum
  `inventatorii.v1.user01`. Nu se sincronizează între dispozitive (doar resetările
  cerute din panoul admin ajung pe toate dispozitivele).
- Progresul anonim anterior (`inventatorii.v1`) este păstrat, dar nu este atribuit
  automat niciunui cont.
- Ambele variante, `index.html` și `inventatorii-un-fisier.html`, includ login-ul.

**Limitare acceptată pentru GitHub Pages:** aceasta este o barieră simplă în
browser, nu autentificare pe server. Codul, verificatorii parolelor și conținutul
jocului sunt publice; cineva cu cunoștințe tehnice poate ocoli verificarea.
Parolele sunt stocate ca verificatori PBKDF2-SHA-256, cu salt aleatoriu individual
și 210.000 de iterații, fără parole în clar în repo. Hash-urile nu fac această
barieră imposibil de ocolit și nu protejează parole scurte împotriva încercărilor
offline. Pentru acces securizat este necesar un backend.

Verificarea parolelor folosește Web Crypto: publică prin HTTPS (GitHub Pages) sau
rulează pe `localhost`. Deschiderea locală prin `file://` depinde de suportul
browserului pentru Web Crypto în acest context. Dacă lipsește, formularul afișează
instrucțiuni pentru HTTPS/localhost.

Fișierele pentru login sunt `js/auth.js`, `accounts.json` (lista activă de conturi)
și `js/accounts.js` (lista inițială, folosită doar ca rezervă). După orice modificare
a fișierelor din `js/`, rulează `node build-artifact.js` pentru a actualiza și
versiunea într-un singur fișier.

### Panoul de administrare (`/admin`)

Adresa: https://foreverafterschool.github.io/inventatorii/admin/

Intrarea se face cu utilizatorul `admin` și parola panoului (comunicată separat, aceeași
pentru toate cele trei jocuri și diferită de parola contului `admin` din joc). Panoul permite:

- **adăugarea** unui cont (utilizator și parolă, cu buton care generează parola);
- **ștergerea** unui cont: nu se mai poate intra cu el de pe niciun dispozitiv;
- **resetarea progresului** unui cont: progresul se șterge pe toate dispozitivele.

Nu există server sau bază de date. Lista de conturi stă în `accounts.json`, în
repository. Panoul modifică fișierul prin API-ul GitHub (fiecare acțiune e un
commit pe `main`), GitHub Pages îl republică în 1–2 minute, iar jocul îl citește
la fiecare pornire. O resetare pune pe cont un marcaj `reset` (data resetării);
când jocul vede un marcaj nou, șterge o singură dată progresul local al contului,
pe fiecare dispozitiv. Un cont nou primește și el marcajul, ca să pornească de la
zero chiar dacă numele a mai fost folosit. Modificările se aplică la următoarea
deschidere sau reîncărcare a jocului.

Pentru a salva în repository, panoul folosește o cheie de acces GitHub (token cu
drept de scriere pe cele trei repository-uri), păstrată în `admin/key.json` criptată
cu parola panoului (AES-256-GCM, cheie derivată cu PBKDF2-SHA-256, 1.000.000 de
iterații). Parola nu apare în repository. Când tokenul expiră sau parola se schimbă,
`admin/key.json` trebuie regenerat (același fișier în toate cele trei repository-uri).
Fișierul criptat este public, deci siguranța depinde de lungimea parolei: o parolă
scurtă poate fi ghicită offline cu suficient efort. Dacă bănuiești asta, revocă
tokenul pe GitHub și generează altul.

Dacă `accounts.json` nu poate fi citit (de exemplu `inventatorii-un-fisier.html`
deschis de pe stick, prin `file://`), jocul folosește lista inițială din
`js/accounts.js`, fără modificările din panou. Pentru dezvoltatori: panoul face
commit-uri direct pe `main`, deci rulează `git pull` înainte de a lucra în
repository.

---

## Cum pornești jocul

**Varianta 1 — dublu-click.** Deschide `index.html` cu browserul (Chrome, Edge, Firefox).

**Varianta 2 — un singur fișier.** `inventatorii-un-fisier.html` conține tot jocul
(grafică, sunet, cele 200 de nivele) într-un singur fișier de ~245 KB: îl poți pune
pe un stick, îl poți trimite pe e-mail sau încărca pe orice site.

**Varianta 3 — server local** (recomandată dacă vrei să modifici fișierele):

```bash
python -m http.server 8777
```

apoi deschizi `http://localhost:8777`.

---

## Cele două lumi

### 🔧 Atelierul de invenții — 100 de nivele

Copilul primește o problemă concretă („florile se usucă în vacanță", „mingea zboară
peste gard", „roverul se blochează în pietre"), alege **3 piese** din tava atelierului
și le pune în locașuri (prin click sau prin tragere cu degetul). Dacă alegerea e bună,
invenția se asamblează și primește un **brevet** cu numele ei, plus explicația rolului
fiecărei piese și principiul științific din spate.

Cele 10 capitole: Acasă · Grădina · Școala · Animale · Apă și vânt · Mașinării ·
Lumină și energie · Planeta curată · Joacă și sport · Spre stele.

### 🔍 Laboratorul de mistere — 100 de nivele

Aici nu e de ajuns să ghicești explicația. Fiecare mister are **3–4 pași**:

1. **Investighează** — alegi, dintre 4–6 observații, doar indiciile care contează
   (restul sunt adevărate, dar irelevante — exact ca în realitate).
2. **Explică** — pui cauzele în **ordinea** în care s-au petrecut, ca un lanț de domino.
3. **Repară** — alegi intervenția care oprește cauza, nu efectul.
4. **Verifică** — la dificultatea Greu apare o întrebare de *transfer*: aceeași idee,
   altă situație. Aici se vede dacă a înțeles sau doar a memorat.

Cele 10 capitole: Bucătărie · Casă · Grădină · Vreme · Școală · Animale și plante ·
Apă, gheață și abur · Lumină, umbre și sunet · Forțe și mișcare · Energie.

---

## Dificultăți

Aceleași nivele, alt sprijin — așa că frații de vârste diferite pot juca același conținut.

| | Ușor | Mediu | Greu |
|---|---|---|---|
| Piese în tavă | 3 corecte + 2 greșite | + 3 greșite | toate |
| Indicii false | 1 | 2 | toate |
| Butonul 💡 | oricând | costă o stea | doar după o greșeală |
| Întrebare bonus / transfer | nu | în capitolele grele | la fiecare nivel |

**Stele:** 3 fără nicio greșeală și fără indiciu · 2 cu o greșeală sau cu indiciu ·
1 dacă a fost mai greu. Progresul, invențiile și cele 12 insigne se salvează în browser
(`localStorage`), deci se păstrează după închiderea jocului.

---

## Structura proiectului

```
index.html               ecranele (meniu, hartă, joc, album)
accounts.json            lista de conturi (modificată din panoul admin)
admin/index.html         panoul de administrare (/admin)
css/style.css            tema vizuală, animațiile, layoutul responsiv
js/art.js                ~130 de icoane, 19 scene și 3 personaje, desenate în SVG din cod
js/fx.js                 sunete (Web Audio), confetti, citire cu voce tare
js/levels-build.js       cele 100 de nivele de construcție
js/levels-fix.js         cele 100 de mistere
js/game.js               motorul: stare, progres, cele două moduri de joc, stele, insigne
                         (tot aici stă și funcția fit(), care garantează încadrarea în ecran)
build-artifact.js        împachetează totul în inventatorii-un-fisier.html
```

Nu există imagini: toată grafica e generată din cod, deci jocul pornește instant și
nu se strică dacă muți folderul.

---

## Cum adaugi nivele noi

**Invenție** — un rând nou în `js/levels-build.js`:

```js
['gradina', 'floare,ghiveci', 'Titlul nivelului',
  'Problema, în 1–2 fraze.',
  'Numele invenției',
  'scara,carlig,cos',            // piesele corecte (chei din js/art.js)
  'cui,gheata,balon',            // piesele care nu se potrivesc
  'Rol scurt=De ce ajută piesa 1 aici.|Rol scurt=De ce ajută piesa 2.|Rol scurt=De ce ajută piesa 3.',
  'Explicația științifică, pe limba copilului.',
  'Întrebare bonus?|Varianta A;Varianta B;Varianta C|0'],   // opțional
```

**Mister** — un rând nou în `js/levels-fix.js`:

```js
['bucatarie', 'pahar,soare', 'Titlul misterului',
  'Ce s-a întâmplat, cu detalii care par nevinovate.',
  'soare~Indiciu care contează~1|pisica~Indiciu irelevant~0|…',
  'Prima cauză|A doua cauză|A treia cauză',
  'Cum rezolvi?|Varianta A;Varianta B;Varianta C|0',
  'De ce s-a întâmplat, explicat simplu.',
  'Aceeași idee, altă situație?|A;B;C|0'],                  // opțional
```

Cheile pieselor și ale scenelor sunt cele definite în `js/art.js` (`ART.I` și `ART.SC`);
`ART.LBL` conține denumirea lor în română. Capitolele se formează automat din câte
10 nivele consecutive.

Rolul scurt e folosit de butonul 💡 (indiciu fără să dea numele piesei), iar
explicația completă apare în brevet, după construcție, câte una pentru fiecare piesă.
Dacă folosești o piesă nouă, adaugă-i și o descriere neutră în
`LEVELS_BUILD.parts` (tot în `js/levels-build.js`): ea apare când copilul pune piesa
în locaș și îi spune *ce face* piesa, nu dacă e alegerea bună.

**Scenele.** `ART.scene(scena, props)` așază obiectele cu sens, iar `ART.settle(svg)`,
apelat după ce scena e în pagină, **măsoară desenul fiecărui obiect** și îi pune talpa
exact pe linia de sol a scenei (`GROUND` în `js/art.js`). Obiectele ocolesc mobila din
fundal (`FREE`), cele care zboară (soare, nori, păsări, baloane) merg pe cer, cele de
perete (raft, ceas, bec) stau la înălțime de perete, în golul liber, iar în spațiu totul
plutește. Ce e deja în fundal (patul din cameră, frigiderul, luna) nu se mai desenează
o dată, iar mărimile sunt apropiate de realitate (`SIZE`): o cană e mică, un pat e mare.
Pentru problemele din casă care se petrec noaptea există scena `camera_noapte`.

După modificări, reconstruiește fișierul unic cu:

```bash
node build-artifact.js
```

---

## Vocea naratorului

Butonul 🗣️ citește textul cu voce tare (util în clasa I). Jocul folosește vocile
instalate în calculator și **citește numai cu o voce românească** — dacă nu găsește
una, nu citește deloc (un text românesc citit de o voce englezească sună dezastruos)
și îți arată cum o obții:

- **Cel mai simplu:** deschide jocul în **Microsoft Edge**, care are vocile românești
  naturale „Andrei" și „Alina" fără nicio instalare (au nevoie de internet).
- **Pentru orice browser:** instalează vocea românească în Windows —
  *Setări → Timp și limbă → Vorbire → Gestionare voci → Adăugare voci → Română* —
  apoi repornește browserul.

Când există mai multe voci românești, în meniu apare un selector din care alegi
naratorul preferat. Textul e pregătit înainte de citire ca să curgă natural:
abrevierile sunt desfăcute (20 cm → „douăzeci de centimetri", −5 °C → „minus cinci
grade Celsius"), simbolurile și emoji-urile sunt eliminate, iar textul e citit pe
propoziții, cu ritm potrivit fiecărui tip de voce.

## Accesibilitate

- Ținte de click mari, contrast bun, navigare cu tastatura (`Tab`, `Enter`, `Esc`).
- Fără derulare: pe orice ecran, tot ce trebuie apăsat e vizibil de la bun început.
- Respectă setarea „mișcare redusă" din sistemul de operare.
- Funcționează pe telefon și tabletă, nu doar pe calculator.
