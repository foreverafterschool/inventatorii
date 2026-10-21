/* ============================================================
   INVENTATORII — levels-build.js
   ATELIERUL DE INVENȚII · 100 de nivele
   Copilul primește o problemă, alege piesele potrivite
   și construiește invenția.

   Format rând:
   [ scena, propsScena, titlu, problema, numeInventie,
     pieseCorecte, pieseGresite, roluri, deCe, intrebareBonus? ]

   • pieseCorecte / pieseGresite  — chei din biblioteca ART.I, separate cu virgulă
   • roluri  — la ce folosește fiecare piesă corectă, în aceeași ordine, separate cu |
   • intrebareBonus — 'întrebare|varianta A;varianta B;varianta C|indexCorect'
     (apare la dificultatea Greu; la Mediu doar în capitolele grele)
   ============================================================ */
window.LEVELS_BUILD = {

  chapters: [
    { t: 'Acasă, la treabă', d: 'Probleme mici din casă, rezolvate isteț.', dif: 1, ic: 'scara' },
    { t: 'Grădina năzdrăvană', d: 'Plante, apă și musafiri nepoftiți.', dif: 1, ic: 'floare' },
    { t: 'Școala inventatorilor', d: 'Invenții pentru clasă, hol și curtea școlii.', dif: 1, ic: 'carte' },
    { t: 'Prieteni cu blană și pene', d: 'Construiește pentru animale.', dif: 2, ic: 'caine' },
    { t: 'Apă, ploaie și vânt', d: 'Îmblânzește vremea cu idei bune.', dif: 2, ic: 'ploaie' },
    { t: 'Mașinării care mișcă', d: 'Roți, pârghii și scripeți la lucru.', dif: 2, ic: 'roata_dintata' },
    { t: 'Lumină și energie', d: 'Soare, becuri, oglinzi și curent.', dif: 2, ic: 'bec' },
    { t: 'Planeta curată', d: 'Invenții care salvează apa și reduc gunoiul.', dif: 3, ic: 'planta' },
    { t: 'Joacă și sport', d: 'Terenul de joacă are nevoie de tine.', dif: 3, ic: 'minge' },
    { t: 'Spre stele', d: 'Roboți, rachete și baze pe alte lumi.', dif: 3, ic: 'racheta' }
  ],

  list: [
    /* ---------- 1. ACASĂ, LA TREABĂ ---------- */
    ['camera', 'raft,cana', 'Borcanul de sus', 'Borcanul cu fursecuri stă pe raftul de sus. Ana întinde mâna, se ridică pe vârfuri… tot nu ajunge. Și nu are voie să se urce pe scaun.', 'Culegătorul de rafturi',
      'scara,carlig,cos', 'cui,gheata,balon', 'Te ridică în siguranță=Scara te ridică sigur până la raftul de sus, fără să te urci pe scaun.|Îți lungește brațul=Cârligul îți lungește brațul și trage borcanul spre tine, de pe raft.|Prinde borcanul, ca să nu cadă=Coșul prinde borcanul dacă scapă, ca să nu se spargă pe jos.',
      'Nu ai crescut, dar ai devenit mai înalt: scara adaugă înălțime, iar cârligul adaugă braț.'],

    ['camera', 'usa,vant', 'Ușa care se trântește', 'Când deschizi fereastra, curentul trântește ușa camerei. Bum! Toată casa tresare, iar rama ușii a început să crape.', 'Opritorul de ușă',
      'arc,sfoara,burete', 'bec,seminte,magnet', 'Trage ușa încet înapoi=Arcul trage ușa înapoi încet, în loc să o lase să zboare în toc.|Leagă ușa de perete=Sfoara leagă arcul de perete, ca ușa să nu poată fugi mai departe de el.|Primește lovitura, moale=Buretele primește lovitura și o înmoaie: fără bufnitură, fără ramă crăpată.',
      'Buretele întinde lovitura pe mai mult timp. Aceeași forță, împrăștiată, nu mai face zgomot și nu mai sparge nimic.'],

    ['camera', 'pat,cutie', 'Papucii dispăruți', 'În fiecare dimineață, papucii sunt în alt loc: unul sub pat, altul în hol. Ana pierde cinci minute bune înainte de școală.', 'Cutia cu despărțitoare',
      'cutie,carton,lipici', 'foc,peste,ceas', 'Casa papucilor=Cutia e locul fix al papucilor: seara îi pui, dimineața îi găsești.|Desparte fiecare pereche=Cartonul face despărțitoare, ca fiecare pereche să aibă căsuța ei.|Prinde despărțitoarele=Lipiciul ține despărțitoarele drepte, ca să nu se dărâme la prima folosire.',
      'Când fiecare lucru are un loc al lui, nu mai trebuie să ții minte unde l-ai pus. Se numește organizare.'],

    ['bucatarie', 'cana,masa', 'Laptele vărsat', 'Rareș toarnă lapte din sticla mare în cana lui. Jumătate ajunge pe masă, pentru că gura cănii e mult prea mică.', 'Pâlnia fără stropi',
      'palnie,cana,tava', 'magnet,minge,foc', 'Strânge lichidul spre gaură=Pâlnia are gura largă și strânge tot laptele într-un fir subțire, ușor de nimerit.|Primește laptele=Cana primește firul de lapte exact în gura ei mică, fără stropi pe masă.|Prinde stropii scăpați=Tava de dedesubt prinde puținele picături scăpate, ca masa să rămână curată.',
      'Pâlnia are gura largă și gâtul îngust: adună tot lichidul într-un fir subțire, ușor de nimerit.'],

    ['camera_noapte', 'raft,scaun', 'Drumul spre baie, noaptea', 'Noaptea e beznă pe hol. Dacă aprinzi lumina mare, trezești toată casa. Dacă nu o aprinzi, te lovești de dulap.', 'Lumina care te simte',
      'senzor,bec,baterie', 'oala,panza,sfoara', 'Simte că vine cineva=Senzorul simte când treci prin hol și aprinde lumina doar atunci.|Face lumină blândă=Becul mic dă exact atâta lumină cât să vezi drumul, fără să trezești casa.|Dă energie=Bateria alimentează lampa noaptea, fără fire trase prin hol.',
      'Senzorul e o santinelă: când te apropii, închide circuitul și becul se aprinde singur, doar cât e nevoie.'],

    ['camera', 'pat,ceas', 'Somnul greu', 'Rareș nu aude deloc alarma telefonului. A întârziat de trei ori la școală săptămâna asta.', 'Deșteptătorul vesel',
      'ceas,sonerie,baterie', 'umbrela,sita,rock', 'Măsoară timpul=Ceasul numără timpul și știe exact când e ora de trezire.|Face zgomot puternic=Soneria face un zgomot puternic, pe care Rareș nu-l mai poate ignora.|Dă energie=Bateria dă curent ceasului și soneriei toată noaptea.',
      'Ceasul numără secundele, iar la ora potrivită trimite curent spre sonerie. Timpul devine sunet.'],

    ['camera', 'raft,carte', 'Cărțile care cad', 'Raftul e înclinat puțin și cărțile alunecă până cad pe podea. Una a căzut chiar pe pisică.', 'Raftul cu opritor',
      'lemn,cui,suport', 'apa,balon,pisica', 'Bara care oprește alunecarea=Scândura pusă pe margine oprește cărțile să alunece de pe raft.|Prinde bara de raft=Cuiul fixează bara de raft, ca să nu cadă odată cu cărțile.|Susține raftul drept=Suportul ține raftul drept, ca să nu mai fie înclinat deloc.',
      'O margine de doi centimetri oprește alunecarea: cărțile se sprijină în ea în loc să plece la vale.'],

    ['scoala', 'scaun,carte', 'Ghiozdanul de plumb', 'Ghiozdanul lui Rareș cântărește cât un pepene. Până la etajul trei, brațele îi amorțesc.', 'Ghiozdanul pe roți',
      'roata,axa,sfoara', 'bec,floare,capac', 'Se rostogolește ușor=Roțile duc greutatea ghiozdanului pe jos, în loc de pe umerii tăi.|Ține roțile la locul lor=Axul ține roțile la locul lor și le lasă să se învârtă liber.|Îl tragi după tine=Sfoara e mânerul de tras: ghiozdanul merge după tine ca un cărucior.',
      'Roata schimbă frecarea de alunecare cu una de rostogolire. De aceea trage de zece ori mai ușor.'],

    ['camera', 'fereastra,gheata', 'Frigul de la geam', 'Iarna, lângă fereastră e mult mai frig decât în restul camerei. Se simte un firicel de aer rece pe la margini.', 'Izolatorul de fereastră',
      'folie,banda_adeziva,panza', 'pahar,motoras,seminte', 'Oprește curentul de aer=Folia acoperă crăpăturile ramei și oprește firicelul de aer rece.|Lipește folia etanș=Banda adezivă lipește folia etanș, fără nicio gaură pe unde să intre frigul.|Astupă pragul de jos=Pânza rulată astupă pragul de jos, pe unde se strecoară cel mai mult aer.',
      'Căldura nu „iese" prin sticlă: fuge prin crăpături. Închizi crăpăturile, oprești pierderea.'],

    ['camera', 'usa,masa', 'Cheile rătăcite', 'În fiecare dimineață, mama întreabă: „Unde sunt cheile?" Uneori sunt în geantă, alteori pe frigider.', 'Panoul cu chei',
      'carlig,lemn,surub', 'gheata,peste,tub', 'Ține cheile agățate=Cârligul ține cheile la vedere, în același loc de fiecare dată.|Panoul de perete=Scândura e panoul de care agăți cârligele, chiar lângă ușă.|Fixează panoul=Șurubul prinde panoul în perete, ca să nu cadă cu tot cu chei.',
      'Un obiect care are un „acasă" nu se mai pierde niciodată. Invenția rezolvă un obicei, nu un lucru.'],

    /* ---------- 2. GRĂDINA NĂZDRĂVANĂ ---------- */
    ['gradina', 'floare,ghiveci', 'Vacanța de două săptămâni', 'Familia pleacă la mare 14 zile. Florile din balcon nu rezistă nici cinci zile fără apă.', 'Udătorul cu picătura',
      'sticla,sfoara,ghiveci', 'bec,magnet,toba', 'Rezervorul de apă=Sticla plină e rezervorul de apă care ține două săptămâni.|Duce apa picătură cu picătură=Sfoara suge apa din sticlă și o duce picătură cu picătură în pământ.|Primește apa la rădăcină=Ghiveciul primește apa chiar la rădăcină, unde planta are nevoie de ea.',
      'Sfoara suge apa ca un fitil și o predă încet pământului. Fenomenul se numește capilaritate.'],

    ['gradina', 'seminte,pasare', 'Ospățul păsărilor', 'Rareș a semănat ridichi. A doua zi, semințele dispăruseră, iar pe pământ erau urme de ciocuri.', 'Cortul pentru semințe',
      'plasa,lemn,cui', 'pahar,ceas,gheata', 'Bariera de deasupra=Plasa lasă lumina și ploaia să treacă, dar oprește ciocul păsărilor.|Stâlpii care o ridică=Bețele de lemn ridică plasa deasupra pământului, ca un cort mic.|Fixează plasa în pământ=Cuiele fixează plasa în pământ, ca vântul să nu o ridice.',
      'Plasa lasă să treacă lumina, aerul și ploaia — dar nu și ciocul păsărilor.'],

    ['gradina', 'rock,copac', 'Muntele de pământ', 'Un morman de pământ trebuie mutat în celălalt capăt al grădinii. Cu găleata, ar dura toată ziua.', 'Roaba ușoară',
      'roata,lemn,suport', 'bec,sare,floare', 'Duce greutatea în locul tău=Roata duce greutatea pământului, ca tu să nu o cari în brațe.|Cutia de transport=Cutia de lemn ține mult mai mult pământ decât o găleată.|Mânerele de împins=Mânerele te lasă să împingi și să ridici doar o parte mică din greutate.',
      'Roaba e o pârghie: greutatea stă lângă roată, iar tu ridici doar o mică parte din ea.'],

    ['ploios', 'ploaie,galeata', 'Ploaia care se pierde', 'Plouă torențial. Toată apa curge de pe acoperiș direct în canal, iar mâine grădina va fi iar uscată.', 'Colectorul de ploaie',
      'jgheab,galeata,capac', 'minge,oglinda,furnica', 'Adună apa de pe acoperiș=Jgheabul adună apa de pe tot acoperișul și o duce într-un singur loc.|Depozitul de apă=Găleata mare păstrează apa strânsă pentru zilele uscate.|Ține frunzele și țânțarii afară=Capacul ține frunzele și țânțarii afară, ca apa să rămână curată.',
      'De pe un acoperiș mic se strâng zeci de litri la o singură ploaie. Apă gratuită pentru toată vara.'],

    ['gradina', 'planta,soare', 'Când ud florile?', 'Ana udă florile în fiecare zi, „ca să fie sigură". Unele au început să se ofilească — de prea multă apă.', 'Semaforul plantelor',
      'senzor,bec,baterie', 'parghie,cana,nor', 'Simte umezeala din pământ=Senzorul înfipt în pământ simte dacă e uscat sau încă umed.|Se aprinde când e uscat=Becul se aprinde doar când pământul e uscat: atunci e timpul de udat.|Alimentează senzorul=Bateria ține senzorul treaz, fără priză lângă ghiveci.',
      'Pământul umed lasă curentul să treacă mai ușor decât cel uscat. Senzorul măsoară exact această diferență.'],

    ['gradina', 'seminte,gheata', 'Semințele care dorm', 'E martie. Semințele au fost puse acum trei săptămâni și încă nu a răsărit nimic. Nopțile sunt reci.', 'Sera de buzunar',
      'cutie,folie,termometru', 'sonerie,peste,magnet', 'Adăpostul semințelor=Cutia adăpostește semințele de vânt și de frigul nopții.|Ține căldura înăuntru=Folia lasă soarele să intre, dar nu lasă căldura să iasă, ca o seră.|Verifici temperatura=Termometrul îți arată dacă înăuntru e destul de cald pentru răsărit.',
      'Folia lasă razele soarelui să intre, dar nu lasă căldura să iasă. Este efectul de seră, în miniatură.'],

    ['gradina', 'planta,apa', 'Musafirii de noapte', 'În fiecare dimineață, frunzele de salată au găuri. Pe pământ sunt dâre lucioase: melcii au dat petrecere.', 'Gardul pentru salată',
      'sita,lemn,cui', 'bec,balon,ceas', 'Bariera aspră=Sita e o barieră aspră pe care melcii nu pot să se cațere.|Rama gardului=Rama de lemn ține sita dreaptă, de jur împrejurul salatei.|Fixează sita=Cuiele prind sita de ramă, fără spații pe unde să treacă melcii.',
      'Melcii se deplasează lipindu-se de suprafețe netede. O margine ridicată și zgrunțuroasă îi întoarce din drum.'],

    ['gradina', 'galeata,floare', 'Balconul de la etajul trei', 'Florile sunt la capătul balconului lung. Ana cară găleata înainte și înapoi de zece ori.', 'Furtunul dirijat',
      'tub,palnie,robinet', 'carte,gheata,minge', 'Duce apa la distanță=Furtunul duce apa până la florile din capătul balconului, fără drumuri cu găleata.|Umpli ușor tubul=Pâlnia te lasă să torni ușor apa în capătul furtunului.|Oprești apa exact când vrei=Robinetul oprește apa exact când florile au primit destul.',
      'Apa curge singură la vale prin tub. Nu ai nevoie de pompă — doar de o găleată ținută mai sus.'],

    ['gradina', 'copac,vant', 'Pomul care se îndoaie', 'Prunul plantat în toamnă s-a aplecat rău după furtună. Dacă rămâne așa, va crește strâmb toată viața.', 'Suportul pentru pom',
      'lemn,sfoara,panza', 'bec,farfurie,gheata', 'Stâlpul care ține direcția=Stâlpul de lemn înfipt lângă pom îl ține pe direcția dreaptă.|Leagă pomul de stâlp=Sfoara leagă tulpina de stâlp, ca vântul să nu o mai aplece.|Protejează scoarța de frecare=Pânza pusă între sfoară și tulpină nu lasă scoarța să se rănească.',
      'Legătura trebuie să fie moale și puțin largă: pomul crește în grosime și o sfoară strânsă l-ar tăia.'],

    ['gradina', 'cutie,planta', 'Grămada care miroase', 'Resturile de la bucătărie au fost aruncate într-un colț al grădinii. Acum miros urât și atrag muște.', 'Compostorul fără miros',
      'cutie,capac,sita', 'telefon,prisma,minge', 'Vasul pentru resturi=Cutia ține resturile la un loc, nu împrăștiate prin grădină.|Închide mirosul=Capacul închide mirosul înăuntru și ține muștele afară.|Lasă aerul să circule=Sita lasă aerul să circule: cu aer, resturile devin pământ, nu miros.',
      'Resturile au nevoie de aer ca să se transforme în pământ bun. Fără aer se strică altfel și miros urât.'],

    /* ---------- 3. ȘCOALA INVENTATORILOR ---------- */
    ['scoala', 'masa,carte', 'Creioanele fugare', 'Banca e ușor înclinată. Creioanele se rostogolesc și cad pe jos de zeci de ori pe zi.', 'Suportul de creioane',
      'cutie,carton,lipici', 'apa,magnet,nor', 'Corpul suportului=Cutia ține creioanele vertical, iar așa nu se mai pot rostogoli.|Despărțitoarele dinăuntru=Despărțitoarele de carton dau fiecărui creion locul lui.|Prinde totul la un loc=Lipiciul prinde despărțitoarele de cutie, ca să nu se desfacă.',
      'Un creion rotund se rostogolește la cea mai mică înclinare. Pus vertical, nu mai are unde să plece.'],

    ['scoala', 'clopotel,minge', 'Clopoțelul nevăzut', 'În curtea mare, la fotbal, nimeni nu aude clopoțelul. Jumătate de clasă întârzie la fiecare pauză.', 'Clopoțelul care ajunge departe',
      'difuzor,fir,baterie', 'pahar,gheata,seminte', 'Trimite sunetul departe=Difuzorul trimite sunetul clopoțelului până în capătul curții.|Duce semnalul din clădire=Firul duce semnalul clopoțelului din clădire până la difuzor.|Dă energie=Bateria alimentează difuzorul acolo unde nu e priză.',
      'Difuzorul transformă curentul electric în vibrații ale aerului — adică exact în ceea ce urechea numește sunet.'],

    ['scoala', 'usa,scaun', 'Holul blocat', 'Ghiozdanele stau grămadă pe jos, în fața clasei. Copiii se împiedică, iar femeia de serviciu nu poate mătura.', 'Cuierul din hol',
      'carlig,lemn,surub', 'minge,oala,ploaie', 'Agață ghiozdanele=Cârligele țin ghiozdanele agățate, nu grămadă pe jos.|Bara de perete=Bara de lemn ține toate cârligele pe un rând, la înălțimea copiilor.|Fixează bara solid=Șuruburile prind bara solid în perete, ca să țină zeci de ghiozdane.',
      'Peretele e spațiu gratuit. Când urci lucrurile pe verticală, podeaua rămâne liberă pentru oameni.'],

    ['scoala', 'fereastra,soare', 'Tabla orbitoare', 'După ora 11, soarele intră pe geam și lovește exact tabla. Din primele bănci nu se mai vede nimic.', 'Perdeaua reglabilă',
      'panza,sfoara,carlig', 'bec,peste,roata', 'Filtrează lumina puternică=Pânza filtrează raza puternică de soare înainte să ajungă la tablă.|O tragi într-o parte=Sfoara te lasă să tragi perdeaua doar cât e nevoie, la ora potrivită.|Susține perdeaua sus=Cârligele țin perdeaua sus, deasupra ferestrei.',
      'Nu întunecăm toată clasa: oprim doar razele care lovesc direct tabla. Soluția bună e cea potrivită.'],

    ['scoala', 'carte,masa', 'Anunțurile care cad', 'Orarul lipit cu scotch cade de pe perete la fiecare două zile, iar pionezele sunt interzise în clasă.', 'Panoul magnetic',
      'magnet,folie,lemn', 'sare,floare,tub', 'Ține hârtia apăsată=Magnetul apasă hârtia pe panou și o ține, fără găuri sau pioneze.|Fața metalică a panoului=Folia de metal e fața panoului, de care magnetul se poate lipi.|Rama de susținere=Rama de lemn ține folia întinsă și panoul pe perete.',
      'Magnetul se lipește de metal și prinde hârtia la mijloc — fără găuri, fără vârfuri ascuțite.'],

    ['scoala', 'toba,carte', 'Gălăgia de la ora de desen', 'La lucrul în echipă, clasa devine tot mai zgomotoasă. Doamna trebuie să strige ca să se facă auzită.', 'Semaforul de zgomot',
      'microfon,bec,baterie', 'scara,gheata,cos', 'Ascultă cât de tare e=Microfonul ascultă cât de tare e zgomotul din clasă.|Se face roșu la depășire=Becul se face roșu când e prea tare: toată clasa vede semnalul.|Alimentează totul=Bateria ține semaforul pornit toată ora.',
      'Microfonul măsoară cât de puternic vibrează aerul. Când depășește limita, becul avertizează fără să țipe nimeni.'],

    ['ploios', 'usa,ploaie', 'Podeaua alunecoasă', 'În zilele cu ploaie, intrarea școlii devine o patinoar. Cineva a alunecat deja.', 'Ștergătorul de la ușă',
      'burete,tava,carton', 'bec,racheta,albina', 'Absoarbe apa de pe tălpi=Buretele suge apa de pe tălpi înainte să ajungă pe gresie.|Strânge apa scursă=Tava strânge apa scursă din burete, ca să nu curgă pe jos.|Suportul de dedesubt=Cartonul de dedesubt ține buretele întins și îl împiedică să alunece.',
      'Buretele are mii de găurele. Apa intră în ele prin capilaritate și rămâne acolo, nu pe gresie.'],

    ['scoala', 'sticla,masa', 'Sticlele identice', 'Toată clasa are aceleași sticle de apă de la excursie. La fiecare pauză e scandal: „E a mea!"', 'Eticheta cu nume',
      'carton,banda_adeziva,rigla', 'gheata,magnet,peste', 'Eticheta cu numele=Eticheta de carton spune al cui e fiecare sticlă, dintr-o privire.|Prinde eticheta pe sticlă=Banda adezivă prinde eticheta de sticlă, ca să nu cadă la spălat.|Trasezi drept și citeț=Rigla te ajută să tai etichetele drepte și la fel de mari.',
      'Eticheta e cea mai ieftină invenție din lume și rezolvă confuzia dintre 25 de obiecte identice.'],

    ['scoala', 'bicicleta,lemn', 'Bicicletele căzute', 'Bicicletele sunt sprijinite de gard. Când cade una, cad toate, ca la domino.', 'Suportul de biciclete',
      'lemn,cui,suport', 'bec,oala,nor', 'Locașul pentru roata din față=Scândurile fac locașuri în care roata din față stă dreaptă.|Fixează scândurile=Cuiele prind scândurile între ele, ca suportul să nu se desfacă.|Ține construcția în picioare=Suportul ține toată construcția în picioare, chiar și cu zece biciclete.',
      'Bicicleta stă în echilibru doar dacă roata din față e ținută pe direcție. Restul vine de la sine.'],

    ['terenjoaca', 'minge,copac', 'Mingile din tufe', 'La fiecare pauză, două-trei mingi zboară în tufele de la marginea terenului. Nimeni nu le mai scoate.', 'Prinzătorul de mingi',
      'plasa,sfoara,carlig', 'sare,bec,termometru', 'Oprește mingea din zbor=Plasa oprește mingea înainte să ajungă în tufe.|O tragi înapoi=Sfoara te lasă să tragi plasa înapoi și să iei mingea fără să te apleci.|Agață plasa sus=Cârligele agață plasa sus pe gard, la înălțimea mingilor.',
      'E mult mai ușor să oprești mingea decât să o cauți. Inventatorii buni rezolvă problema înainte să apară.'],

    /* ---------- 4. PRIETENI CU BLANĂ ȘI PENE ---------- */
    ['ferma', 'pisica,farfurie', 'Bolul călător', 'Când mănâncă, pisica împinge bolul prin toată bucătăria. Ajunge sub masă și varsă apa pe drum.', 'Bolul care stă pe loc',
      'burete,tava,lipici', 'bec,racheta,prisma', 'Talpa antiderapantă=Buretele de sub bol se agață de gresie și nu lasă bolul să alunece.|Prinde stropii=Tava prinde apa vărsată, dacă pisica tot împinge puțin.|Lipește buretele de fund=Lipiciul prinde buretele de fundul bolului, ca să nu se desfacă.',
      'Buretele mărește frecarea: se agață de gresie în loc să alunece pe ea.',
      'Pe ce suprafață alunecă bolul cel mai ușor?|Gresie udă;Covor;Iarbă|0'],

    ['ploios', 'caine,ploaie', 'Câinele în ploaie', 'Rex stă în curte. Când plouă, se ghemuiește lângă gard, ud până la piele, pentru că nu are unde să intre.', 'Cușca cu acoperiș',
      'lemn,folie,cui', 'pahar,magnet,seminte', 'Pereții adăpostului=Scândurile fac pereții care opresc vântul și ploaia dintr-o parte.|Acoperișul care nu lasă apa=Folia pe acoperișul înclinat trimite apa în lături, nu înăuntru.|Prinde acoperișul=Cuiele prind acoperișul și pereții solid, ca furtuna să nu-i ia.',
      'Un acoperiș înclinat trimite apa în lături. Dacă ar fi drept, apa s-ar aduna deasupra și ar picura înăuntru.'],

    ['ferma', 'pasare,gheata', 'Apa înghețată a păsărilor', 'Iarna, vasul cu apă pentru păsări îngheață până la prânz. Păsările vin, ciugulesc gheața și pleacă însetate.', 'Adăpătoarea de iarnă',
      'galeata,folie,oglinda', 'toba,furnica,sina', 'Vasul cu apă=Găleata ține multă apă, care îngheață mai greu decât un vas mic.|Ține căldura în jurul vasului=Folia înfășurată în jurul găleții păstrează căldura strânsă peste zi.|Trimite razele soarelui în apă=Oglinda trimite razele soarelui direct în apă și o încălzește puțin.',
      'Lumina reflectată și un vas ferit de vânt pot ține apa cu câteva grade peste zero. Uneori e exact cât trebuie.',
      'Ce îngheață mai greu?|Apa multă dintr-un vas mare;O picătură pe geam;Apa dintr-o lingură|0'],

    ['camera', 'cutie,roata', 'Hamsterul plictisit', 'Hamsterul Bolt stă toată ziua într-un colț al cuștii. Se îngrașă și doarme prea mult.', 'Roata de alergare',
      'roata,axa,suport', 'bec,sare,umbrela', 'Pista care se învârte=Roata e pista pe care hamsterul poate alerga kilometri, stând în cușcă.|Punctul de rotire=Axul lasă roata să se învârtă ușor, de la primul pas.|Ține roata ridicată=Suportul ține roata ridicată, ca să nu se frece de podeaua cuștii.',
      'Roata se rotește în jurul axului cu foarte puțină frecare, așa că pornește de la un singur pas mic.'],

    ['ferma', 'furnica,farfurie', 'Furnicile la masă', 'Furnicile au descoperit castronul lui Rex. Merg în șir, una după alta, de la gard până la mâncare.', 'Insula anti-furnici',
      'tava,apa,farfurie', 'bec,sina,prisma', 'Șanțul de jur împrejur=Tava mare face un șanț de jur împrejurul castronului.|Bariera pe care nu o trec=Apa din șanț e bariera: furnicile nu pot trece peste ea.|Mâncarea, la mijlocul insulei=Farfuria cu mâncare stă la mijloc, ca o insulă la care nu ajung.',
      'Furnicile merg pe uscat, urmând urma de miros lăsată de surate. Un inel de apă rupe drumul lor invizibil.',
      'Cum se orientează furnicile pe drum?|După urma de miros lăsată de altele;După hartă;După Soare|0'],

    ['laborator', 'peste,apa', 'Peștii de la suprafață', 'Peștii din acvariu stau tot timpul lipiți de suprafața apei și înghit aer. Apa e limpede, dar ceva nu e în regulă.', 'Pompa de aer',
      'pompa,tub,baterie', 'carte,gheata,cos', 'Împinge aer în apă=Pompa împinge aer în apă, iar bulele aduc oxigenul de care au nevoie peștii.|Duce aerul până jos=Tubul duce aerul de la pompă până pe fundul acvariului.|Alimentează pompa=Bateria ține pompa pornită tot timpul, chiar și noaptea.',
      'Bulele agită suprafața, iar acolo apa ia oxigen din aer. Peștii respiră oxigenul dizolvat, nu apa.'],

    ['camera', 'fereastra,pasare', 'Bufnitura în geam', 'De trei ori luna asta, câte o pasăre s-a lovit de geamul mare al livingului.', 'Semnele de pe geam',
      'folie,carton,banda_adeziva', 'pompa,rock,ceas', 'Siluetele lipite=Siluetele lipite fac geamul vizibil: pasărea vede că acolo e ceva.|Din ce le decupezi=Cartonul e materialul din care decupezi siluetele de păsări.|Le prinzi pe sticlă=Banda adezivă prinde siluetele de sticlă, fără să lase urme.',
      'Pasărea nu vede sticla: vede cerul și copacii reflectați în ea. Semnele fac geamul vizibil.',
      'De ce nu văd păsările geamul?|Pentru că oglindește cerul;Pentru că e prea mic;Pentru că e cald|0'],

    ['ferma', 'plasa,copac', 'Evadatul cu urechi lungi', 'Iepurele a scăpat de două ori din țarc. O dată a sărit peste gard, o dată a săpat pe sub el.', 'Țarcul înalt',
      'plasa,lemn,cui', 'bec,cana,luna', 'Gardul care nu se rupe=Plasa e un gard înalt, peste care iepurele nu poate sări.|Stâlpii de susținere=Stâlpii de lemn țin plasa întinsă și dreaptă.|Fixează plasa, inclusiv jos=Cuiele prind plasa și de partea îngropată, ca să nu poată săpa pe sub ea.',
      'Iepurii sar sus și sapă adânc. Un gard bun trebuie îngropat câțiva centimetri, nu doar înălțat.'],

    ['camera', 'pisica,scaun', 'Canapeaua zgâriată', 'Pisica a transformat colțul canapelei în ghem de ață. Nu ajută nici să o cerți.', 'Stâlpul de zgâriat',
      'sfoara,lemn,lipici', 'bec,minge,ploaie', 'Suprafața aspră de zgâriat=Sfoara aspră e exact ce caută pisica pentru gheare, în locul canapelei.|Stâlpul vertical=Stâlpul de lemn dă pisicii un loc înalt, pe care se poate întinde.|Fixează sfoara răsucită=Lipiciul ține sfoara înfășurată strâns pe stâlp.',
      'Pisicile nu strică din răutate: își ascut ghearele. Dacă le dai un loc mai bun, îl aleg singure pe el.'],

    ['strada', 'caine,sfoara', 'Câinele care trage', 'Rex trage tare de lesă când vede alt câine. Mâna te doare, iar el tușește pentru că îl strânge zgarda.', 'Lesa elastică',
      'arc,sfoara,carlig', 'pahar,senzor,sare', 'Amortizează smuciturile=Arcul se întinde la smucitură și o transformă într-o tragere blândă.|Legătura până la zgardă=Sfoara face legătura dintre arc și zgarda lui Rex.|Prinde de zgardă=Cârligul prinde lesa de zgardă, ca să nu scape câinele.',
      'Arcul întinde forța pe mai mult timp, așa că smucitura bruscă devine o tragere blândă.',
      'Ce face arcul cu o smucitură?|O întinde pe mai mult timp;O face mai puternică;O oprește instantaneu|0'],

    /* ---------- 5. APĂ, PLOAIE ȘI VÂNT ---------- */
    ['ploios', 'ploaie,panza', 'Rufele prinse de ploaie', 'Rufele stau întinse în curte de dimineață. La prânz începe o ploaie scurtă și trebuie luate toate, ude leoarcă.', 'Acoperișul de rufe',
      'folie,sfoara,lemn', 'bec,peste,magnet', 'Acoperă de sus=Folia pusă deasupra oprește picăturile, dar lasă aerul să treacă.|Sârma pe care stau rufele=Sfoara e sârma pe care întinzi rufele, la adăpost.|Stâlpii care ridică totul=Stâlpii de lemn țin folia ridicată deasupra rufelor.',
      'Rufele se usucă de la aerul care trece printre ele, nu de la soare. Le ții la aer, dar la adăpost de picături.'],

    ['rau', 'apa,galeata', 'Apa tulbure', 'În tabără, apa din pârâu are frunze, nisip și e gălbuie. Nu poate fi folosită nici măcar la spălat pe mâini.', 'Filtrul de apă',
      'palnie,filtru,sita', 'bec,racheta,toba', 'Îndreaptă apa spre filtru=Pâlnia îndreaptă toată apa prin filtru, fără să curgă pe lângă.|Reține particulele fine=Filtrul reține particulele fine care fac apa gălbuie.|Oprește frunzele și pietricelele=Sita oprește frunzele și nisipul, înainte ca apa să ajungă la filtru.',
      'Filtrarea scoate mizeria, dar nu și microbii. Apa filtrată tot trebuie fiartă înainte de băut.',
      'Ce NU scoate un filtru simplu din apă?|Microbii;Nisipul;Frunzele|0'],

    ['gradina', 'ploaie,pahar', 'Cât a plouat, de fapt?', 'Bunicul spune „a plouat bine", vecinul spune „abia a stropit". Cine are dreptate? Nimeni nu a măsurat.', 'Pluviometrul',
      'pahar,rigla,suport', 'magnet,foc,roata', 'Adună ploaia=Paharul cu pereți drepți adună ploaia, ca să o poți măsura.|Măsoară înălțimea apei=Rigla arată câți milimetri de apă s-au strâns: atâta a plouat.|Îl ține drept și nemișcat=Suportul ține paharul drept și nemișcat, ca vântul să nu-l răstoarne.',
      'Meteorologii spun „20 de litri pe metru pătrat" — adică exact înălțimea apei strânse în vasul tău.'],

    ['ploios', 'ghiveci,vant', 'Vântul răsturnat', 'După noaptea cu furtună, trei ghivece înalte de pe balcon erau pe jos, sparte. Cele scunde au rămas în picioare.', 'Ancora pentru ghivece',
      'greutate,sfoara,ghiveci', 'bec,pisica,prisma', 'Coboară centrul de greutate=Greutatea pusă pe fundul ghiveciului îl face greu jos și greu de răsturnat.|Leagă de balustradă=Sfoara leagă ghiveciul de balustradă, pentru zilele cu furtună.|Vasul plantei=Ghiveciul lat e mai stabil decât unul înalt și subțire.',
      'Un obiect se răstoarnă greu dacă e greu jos și ușor sus. Vântul împinge partea de sus, dar baza îl ține.',
      'Ce se răstoarnă mai greu?|Un vas greu la bază;Un vas înalt și gol;Un vas ușor|0'],

    ['munte', 'vant,copac', 'Din ce parte bate vântul?', 'Bunicul vrea să știe dinainte dacă vine ploaia. „Uită-te de unde bate vântul", spune el. Dar cum se vede asta?', 'Girueta',
      'panza,sfoara,suport', 'gheata,carte,pompa', 'Suprafața pe care o împinge vântul=Pânza e partea lată pe care vântul o împinge și o întoarce.|Se rotește liber=Sfoara lasă girueta să se rotească liber, după cum bate vântul.|Stâlpul pe care se învârte=Stâlpul o ține sus, în bătaia vântului, unde e mai ușor de citit.',
      'Partea lată e împinsă de vânt și fuge în spate. Vârful subțire rămâne să arate de unde vine vântul.'],

    ['munte', 'gheata,lemn', 'Poteca înzăpezită', 'A nins toată noaptea. Poteca de la poartă la stradă are zăpadă până la genunchi.', 'Plugul de zăpadă',
      'lemn,sfoara,roata', 'bec,peste,floare', 'Lama care împinge zăpada=Scândura pusă oblic împinge zăpada într-o parte, ca un plug.|O tragi după tine=Sfoara te lasă să tragi plugul după tine, cu tot corpul.|Alunecă ușor pe teren=Roata îl face să alunece ușor pe zăpadă, în loc să se împotmolească.',
      'Lama pusă oblic împinge zăpada într-o parte, nu în față. Așa nu se mai adună grămadă în fața ta.'],

    ['gradina', 'apa,rock', 'Băltoacele veșnice', 'După ploaie, în curte rămân băltoace câte trei zile. Pământul e tare ca piatra și apa nu intră deloc.', 'Drenajul curții',
      'tub,rock,sita', 'bec,minge,ceas', 'Duce apa mai jos=Tubul îngropat duce apa din curte mai jos, unde se poate scurge.|Stratul prin care se scurge=Pietrele lasă apa să treacă printre ele și să intre în pământ.|Oprește frunzele care ar înfunda=Sita oprește frunzele, ca să nu înfunde tubul.',
      'Apa curge printre pietre ca printr-un labirint plin de goluri, apoi intră liniștită în pământ.'],

    ['rau', 'apa,soare', 'Apa de la râu la grădină', 'Grădina e la 20 de metri de râu, dar cu 2 metri mai sus. Cu găleata, e o corvoadă zilnică.', 'Pompa solară',
      'pompa,panou_solar,tub', 'toba,gheata,carlig', 'Ridică apa=Pompa ridică apa cei doi metri până la grădină.|Îi dă energie de la Soare=Panoul solar dă pompei energie fix când e soare și plantele vor apă.|Conduce apa la plante=Tubul duce apa pompată până la fiecare rând de legume.',
      'Soarele dă cea mai multă energie exact în zilele în care plantele au nevoie de cea mai multă apă.',
      'Când merge cel mai bine o pompă solară?|Într-o zi senină de vară;Noaptea;Într-o zi cu ceață|0'],

    ['camera_noapte', 'bec,ceas', 'Pană de curent', 'Furtuna a doborât un stâlp. Casa e în beznă, iar telefoanele sunt aproape descărcate.', 'Lanterna de urgență',
      'baterie,bec,intrerupator', 'sare,elice,planta', 'Energia păstrată dinainte=Bateria are energie pusă deoparte, pentru când nu mai vine curent.|Face lumina=Becul transformă energia bateriei în lumina de care ai nevoie.|Pornește doar când ai nevoie=Întrerupătorul pornește lanterna doar când e nevoie, ca bateria să țină mult.',
      'Bateria e energie „la conservă": o strângi când ai curent și o folosești când nu mai ai.'],

    ['gradina', 'ploaie,planta', 'Grindina', 'Vara trecută, o grindină de zece minute a făcut praf toate roșiile. Anul acesta se anunță la fel.', 'Plasa anti-grindină',
      'plasa,sfoara,lemn', 'bec,peste,cana', 'Sparge și încetinește boabele=Plasa încetinește boabele de gheață, care nu mai rup frunzele.|Ține plasa întinsă=Sfoara ține plasa bine întinsă deasupra roșiilor.|Stâlpii de susținere=Stâlpii ridică plasa sus, ca să nu atingă plantele.',
      'Plasa nu oprește gheața, ci o încetinește. Un bob încetinit lovește frunza fără să o rupă.'],

    /* ---------- 6. MAȘINĂRII CARE MIȘCĂ ---------- */
    ['atelier', 'cutie,masinuta', 'Lada în camion', 'Lada cu unelte cântărește 40 de kilograme și trebuie urcată în camion. Doi oameni nu reușesc să o ridice drept.', 'Rampa de încărcare',
      'rampa,roata,sfoara', 'bec,sare,floare', 'Urci pe pantă, nu drept în sus=Rampa te lasă să urci lada pe pantă, cu mult mai puțină forță.|Reduce frecarea=Roțile de sub ladă înlocuiesc frecarea grea cu rostogolirea ușoară.|Tragi lada în sus=Sfoara te lasă să tragi lada pe rampă, cu tot corpul.',
      'Pe o rampă lungă urci aceeași greutate cu forță mult mai mică — în schimb parcurgi un drum mai lung.',
      'Cum e mai ușor de urcat o ladă?|Pe o rampă lungă;Ridicată drept în sus;Pe o rampă foarte scurtă|0'],

    ['ferma', 'galeata,apa', 'Găleata din fântână', 'Fântâna are 8 metri. Găleata plină cântărește cât un copil, iar bunica nu o mai poate trage.', 'Scripetele',
      'scripete,sfoara,galeata', 'bec,prisma,pisica', 'Schimbă direcția forței=Scripetele schimbă direcția: tragi în jos, iar găleata urcă.|Trece peste roată=Sfoara trece peste scripete și duce forța ta până la găleată.|Vasul care urcă apa=Găleata e vasul care aduce apa din fântână la suprafață.',
      'Cu un scripete tragi în jos ca să ridici în sus. Iar în jos poți folosi și greutatea corpului tău.'],

    ['ferma', 'usa,roata', 'Ușa hambarului', 'Ușa mare de lemn s-a lăsat și acum se freacă de pământ. Trebuie trasă cu amândouă mâinile.', 'Ușa pe șine',
      'sina,roata,carlig', 'bec,sare,nor', 'Ghidajul de sus=Șina de sus e drumul neted pe care rulează ușa.|Rulează pe șină=Roțile lasă ușa să alunece pe șină, fără să se frece de pământ.|Ține ușa suspendată=Cârligele țin ușa agățată de roți, ridicată de la sol.',
      'Dacă ușa atârnă pe roți, nu mai atinge pământul: aluneci pe metal, în loc să freci lemnul de pietriș.'],

    ['gradina', 'rock,lemn', 'Piatra din drum', 'În mijlocul aleii e o piatră cât o roată de mașină. Trei copii împing de ea și nu se clintește.', 'Pârghia',
      'parghie,rock,lemn', 'bec,apa,telefon', 'Bara lungă cu care apeși=Bara lungă îți înmulțește forța: apeși ușor, piatra se ridică.|Punctul de sprijin=Piatra mică de sprijin e punctul în jurul căruia se rotește bara.|Talpa care nu se afundă=Scândura pusă sub sprijin nu îl lasă să se afunde în pământ.',
      'Cu cât punctul de sprijin e mai aproape de piatră, cu atât ridici mai ușor. Arhimede promitea că mișcă Pământul.',
      'Unde pui punctul de sprijin ca să ridici cel mai ușor?|Aproape de piatră;Exact la mijloc;Aproape de mâna ta|0'],

    ['atelier', 'masinuta,roata', 'Mașinuța fără viață', 'Mașinuța de lemn merge doar dacă o împingi. Rareș vrea una care pleacă singură la apăsarea unui buton.', 'Mașinuța automată',
      'motoras,baterie,roata', 'pahar,floare,sita', 'Învârte roțile=Motorașul transformă curentul în învârtire pentru roți.|Dă curent motorului=Bateria dă motorașului curentul de care are nevoie.|Împing mașina înainte=Roțile transformă învârtirea motorului în mers înainte.',
      'Motorul transformă energia electrică în mișcare de rotație. Roțile transformă rotația în deplasare.'],

    ['ferma', 'vant,copac', 'Făina fără curent', 'La cabana din deal nu ajunge curentul, dar bate vânt aproape zilnic. Grâul trebuie măcinat cumva.', 'Moara de vânt',
      'elice,roata_dintata,suport', 'bec,peste,gheata', 'Prinde vântul=Elicea prinde vântul și se învârte odată cu el.|Transmite mișcarea mai departe=Roata dințată duce învârtirea de la elice la piatra de măcinat.|Ține totul sus, în bătaia vântului=Suportul înalt ține elicea sus, unde vântul bate cel mai tare.',
      'Vântul este aer în mișcare. Orice mișcare poate fi prinsă și transformată în rotație folositoare.'],

    ['rau', 'apa,roata_apa', 'Energie de la râu', 'Râul curge zi și noapte, la doi pași de atelier. Toată acea mișcare se pierde degeaba.', 'Moara de apă',
      'roata_apa,roata_dintata,axa', 'bec,sare,minge', 'O învârte apa care cade=Roata de apă e învârtită de apa care curge peste ea.|Transmite forța=Roata dințată transmite învârtirea la mașina care are nevoie de ea.|Leagă roțile între ele=Axul leagă roțile între ele, ca să se învârtă împreună.',
      'Apa care coboară are energie. Roata i-o ia și o transformă în învârtire, fără să consume nimic.'],

    ['strada', 'masinuta,rampa', 'Căruciorul scăpat', 'Căruciorul cu marfă a luat-o singur la vale pe stradă. Noroc că l-a prins cineva la timp.', 'Frâna de mână',
      'parghie,sfoara,burete', 'bec,seminte,nor', 'Mânerul pe care apeși=Mânerul e o pârghie: apeși ușor, iar frâna strânge tare.|Trage sabotul de frână=Sfoara trage sabotul de frână când apeși mânerul.|Freacă roata și o oprește=Buretele se freacă de roată și o oprește, transformând mișcarea în căldură.',
      'Frâna transformă mișcarea în căldură, prin frecare. De aceea frânele bicicletei se încing la vale.',
      'În ce se transformă mișcarea când frânezi?|În căldură;În lumină;În apă|0'],

    ['ferma', 'usa,greutate', 'Poarta lăsată deschisă', 'Toată lumea uită poarta deschisă, iar găinile ies în drum. Nu ajută nici biletul „Închide poarta!".', 'Poarta care se închide singură',
      'arc,sfoara,greutate', 'bec,pahar,albina', 'Trage poarta înapoi=Arcul trage poarta înapoi de fiecare dată când e lăsată deschisă.|Leagă greutatea de poartă=Sfoara leagă poarta de greutate, peste un cârlig.|Coboară și închide=Greutatea cade mereu în jos și închide poarta singură, fără să obosească.',
      'Greutatea cade mereu în jos: o forță gratuită, care nu obosește și nu uită niciodată.'],

    ['scoala', 'panza,suport', 'Steagul din vârf', 'Steagul trebuie ridicat în vârful catargului de 6 metri. Nimeni nu se urcă acolo în fiecare dimineață.', 'Catargul cu scripete',
      'scripete,sfoara,panza', 'bec,gheata,furnica', 'Roata din vârf=Scripetele din vârf lasă sfoara să alunece ușor sus și jos.|Bucla de sfoară fără capăt=Sfoara închisă în buclă ridică steagul când tragi de jos.|Steagul care urcă=Pânza e steagul prins de sfoară, care urcă până în vârf.',
      'Cu un scripete în vârf, ridici steagul stând jos, cu picioarele pe pământ. Nu mai urci deloc.'],

    /* ---------- 7. LUMINĂ ȘI ENERGIE ---------- */
    ['munte', 'soare,bec', 'Cabana fără curent', 'La cabana din munți nu ajunge rețeaua electrică. Seara se stă cu lumânări, ceea ce e periculos.', 'Lampa solară',
      'panou_solar,baterie,bec', 'oala,sfoara,pisica', 'Transformă lumina în curent=Panoul solar transformă lumina zilei în curent electric.|Păstrează energia pentru seară=Bateria păstrează curentul strâns peste zi, pentru seară.|Luminează camera=Becul luminează cabana din energia bateriei, fără lumânări.',
      'Ziua încarci, noaptea folosești. Bateria e pușculița în care strângi energie pentru mai târziu.'],

    ['plaja', 'soare,oala', 'Mâncare caldă fără foc', 'În tabără e interzis focul din cauza secetei. Totuși, toată lumea vrea ceva cald la prânz.', 'Cuptorul solar',
      'oglinda,cutie,folie', 'bec,plasa,peste', 'Adună razele într-un punct=Oglinzile adună razele soarelui într-un singur loc fierbinte.|Camera în care se gătește=Cutia e cuptorul în care stă mâncarea, în punctul cel mai cald.|Ține căldura înăuntru=Folia din interior ține căldura înăuntru, ca mâncarea să se facă.',
      'Oglinzile aduc razele din toate părțile într-un singur loc. Acolo, temperatura poate depăși 100 de grade.',
      'Ce culoare se încălzește cel mai repede la soare?|Negru;Alb;Argintiu|0'],

    ['noapte', 'bicicleta,luna', 'Bicicleta invizibilă', 'Rareș vine de la antrenament pe întuneric. Bateriile lanternei se termină exact când e nevoie de ea.', 'Dinamul de bicicletă',
      'motoras,bec,fir', 'sare,cos,planta', 'Învârtit de roată, produce curent=Motorașul învârtit de roată produce curent: e un dinam.|Luminează drumul=Becul luminează drumul din curentul făcut de pedalat.|Duce curentul la bec=Firul duce curentul de la dinam până la bec.',
      'Un motoraș învârtit produce curent electric. Este exact același aparat, folosit invers.',
      'Când luminează becul dinamului?|Când pedalezi;Când stai pe loc;Doar ziua|0'],

    ['camera', 'fereastra,oglinda', 'Camera întunecoasă', 'Camera din spate are o singură fereastră mică, spre nord. Chiar și la prânz trebuie aprins becul.', 'Tunelul de lumină',
      'oglinda,tub,lentila', 'bec,foc,minge', 'Trimite lumina mai departe=Oglinda prinde lumina de afară și o trimite prin tub, în cameră.|Drumul pe care merge lumina=Tubul lucios e drumul pe care lumina merge de la acoperiș până jos.|Împrăștie lumina în cameră=Lentila împrăștie lumina în toată camera, nu doar într-un punct.',
      'Lumina merge în linie dreaptă, dar poate fi „îndoită" de la o oglindă la alta, ca o minge care ricoșează.'],

    ['laborator', 'lupa,carte', 'Prea mic pentru ochi', 'Ana a găsit o insectă minusculă pe frunză. Vrea să-i vadă picioarele, dar ochiul nu distinge nimic.', 'Microscopul de buzunar',
      'lupa,tub,suport', 'sare,roata,ploaie', 'Mărește imaginea=Lupa mărește imaginea insectei de câteva ori.|Ține distanța potrivită=Tubul ține lupa la distanța potrivită de insectă, ca imaginea să fie clară.|Stă perfect nemișcat=Suportul ține totul nemișcat, ca să vezi picioarele fără să tremure.',
      'Lentila îndoaie razele de lumină astfel încât ochiul tău crede că obiectul e mult mai mare decât e.'],

    ['noapte', 'bec,stea', 'Mesaje peste curte', 'Ana și Rareș locuiesc în case vecine. Seara nu mai au voie să iasă, dar vor să-și spună noapte bună.', 'Telegraful luminos',
      'bec,baterie,intrerupator', 'cana,plasa,rock', 'Semnalul care se vede de departe=Becul e semnalul luminos care se vede din casa vecină.|Energia=Bateria alimentează becul fără să ai nevoie de priză la geam.|Faci puncte și linii=Întrerupătorul face clipiri scurte și lungi: literele alfabetului Morse.',
      'Un bec care clipește scurt și lung poate transmite orice mesaj. Așa funcționează alfabetul Morse.'],

    ['laborator', 'prisma,soare', 'Curcubeu la comandă', 'Ana a văzut un curcubeu după ploaie și vrea să facă unul în camera ei, oricând, fără ploaie.', 'Fabrica de curcubeie',
      'prisma,oglinda,pahar', 'cui,plasa,robot', 'Desparte lumina în culori=Prisma desparte lumina albă în toate culorile curcubeului.|Trimite raza pe perete=Oglinda trimite raza de soare pe perete, unde se vede curcubeul.|Apa care îndoaie și ea lumina=Paharul cu apă îndoaie și el lumina, exact ca picăturile de ploaie.',
      'Lumina albă e un amestec de culori. Prisma le desparte pentru că fiecare culoare se îndoaie altfel.',
      'Din ce e făcută lumina albă?|Din toate culorile amestecate;Numai din alb;Din alb și negru|0'],

    ['gradina', 'soare,rigla', 'Ora fără ceas', 'În tabără, telefoanele se predau dimineața. Nimeni nu știe cât e ceasul până sună clopotul de masă.', 'Ceasul solar',
      'rigla,suport,lemn', 'bec,peste,tub', 'Bățul care face umbră=Rigla înfiptă drept face umbra care se mută odată cu soarele.|Îl ține perfect drept=Suportul ține rigla perfect dreaptă, altfel ora ar fi greșită.|Cadranul cu ore desenate=Scândura e cadranul pe care desenezi unde cade umbra la fiecare oră.',
      'Umbra se rotește pentru că Pământul se rotește. Direcția ei îți spune ora, dacă ai marcat-o dinainte.'],

    ['gradina', 'bec,soare', 'Aleea pe întuneric', 'Aleea spre poartă nu are lumină. Cine intră seara în curte se împiedică de trepte.', 'Felinarul inteligent',
      'panou_solar,senzor,bec', 'oala,sina,albina', 'Încarcă bateria peste zi=Panoul solar încarcă felinarul peste zi, fără curent de la rețea.|Simte când se întunecă=Senzorul simte când se lasă seara și pornește lumina singur.|Se aprinde singur, seara=Becul luminează treptele exact când cineva vine acasă pe întuneric.',
      'Panoul solar produce curent, dar poate și să „simtă" câtă lumină e afară. Aceeași piesă, două utilizări.'],

    ['munte', 'telefon,soare', 'Telefonul descărcat', 'În a doua zi de drumeție, telefonul cu harta are 4% baterie. Priza cea mai apropiată e la 30 de kilometri.', 'Încărcătorul solar',
      'panou_solar,fir,baterie', 'gheata,minge,cana', 'Culege energia soarelui=Panoul solar culege energia soarelui de pe munte, unde nu e priză.|Duce curentul=Firul duce curentul de la panou în baterie și apoi în telefon.|Păstrează energia strânsă=Bateria strânge energia, ca să încarci telefonul și când se înnorează.',
      'Un panou cât o carte poate încărca un telefon într-o zi însorită. Energia era acolo — trebuia doar culeasă.',
      'Ce pățește un panou solar acoperit de praf?|Produce mai puțin curent;Produce mai mult;Nu se schimbă nimic|0'],

    /* ---------- 8. PLANETA CURATĂ ---------- */
    ['strada', 'cutie,carton', 'Gunoiul amestecat', 'În bloc există un singur tomberon. Hârtia, plasticul și resturile ajung împreună — și nimic nu se mai poate recicla.', 'Stația de sortare',
      'cutie,carton,banda_adeziva', 'bec,peste,roata', 'Recipientele separate=Cutiile separate țin hârtia, plasticul și resturile fiecare la locul ei.|Semnele colorate=Semnele de carton, colorate, arată dintr-o privire ce merge unde.|Le prinzi bine, la vedere=Banda adezivă prinde semnele pe cutii, la vedere.',
      'Reciclarea începe cu separarea. Odată amestecate, hârtia udă de resturi nu mai poate fi refolosită.',
      'Unde merge o sticlă de plastic goală?|La plastic;La hârtie;La resturi alimentare|0'],

    ['gradina', 'sticla,planta', 'Munții de sticle', 'După petrecerea din curte au rămas 30 de sticle de plastic. Ana refuză să le arunce pe toate.', 'Ghivecele din sticle',
      'sticla,seminte,apa', 'bec,magnet,sina', 'Devine ghiveci=Sticla tăiată în două devine un ghiveci care nu mai ajunge la gunoi.|Se plantează înăuntru=Semințele plantate în sticlă fac din ea o plantă vie.|Le uzi cu puțină apă=Apa dă semințelor ce le trebuie ca să răsară.',
      'O sticlă aruncată stă sute de ani în natură. Aceeași sticlă, tăiată în două, ține o plantă un an întreg.',
      'Cât rezistă plasticul în natură?|Sute de ani;Câteva zile;Cam un an|0'],

    ['scoala', 'carte,galeata', 'Coșul plin de hârtie', 'La sfârșitul zilei, coșul clasei e plin de foi scrise pe o singură parte.', 'Hârtia refăcută',
      'carte,sita,galeata', 'bec,gheata,elice', 'Hârtia veche, materia primă=Foile vechi sunt materia primă: fibre bune, care pot fi folosite din nou.|Scoate foaia nouă din apă=Sita scoate din apă un strat subțire de pastă, care se usucă în foaie nouă.|Vasul cu pastă de hârtie=Găleata e vasul în care înmoi și amesteci hârtia veche cu apă.',
      'Hârtia e făcută din fibre de lemn. Le înmoi, le amesteci și le usuci din nou — și ai o foaie nouă.',
      'Din ce e făcută hârtia?|Din fibre de lemn;Din plastic;Din nisip|0'],

    ['gradina', 'cutie,planta', 'Cojile aruncate', 'Zilnic, la gunoi ajung coji de cartofi, frunze de salată și zaț de cafea. Un sac întreg pe săptămână.', 'Compostorul',
      'cutie,sita,apa', 'bec,racheta,oglinda', 'Vasul în care se transformă=Cutia ține resturile la un loc, cât se transformă în pământ.|Aerisirea=Sita lasă aerul să intre: fără aer, resturile nu devin compost.|Umezeala potrivită=Puțină apă ține grămada umedă, exact cât le place viețuitoarelor care o descompun.',
      'Resturi + aer + umezeală = pământ negru și bogat, în câteva luni. Natura reciclează de milioane de ani.',
      'Ce NU se pune la compost?|Punga de plastic;Coaja de măr;Frunzele uscate|0'],

    ['bucatarie', 'galeata,apa', 'Apa aruncată', 'Apa în care s-au spălat legumele se duce direct pe scurgere. Zece litri, în fiecare zi.', 'A doua viață a apei',
      'galeata,filtru,tub', 'bec,sare,ceas', 'Strânge apa folosită=Găleata strânge apa de la clătit, în loc să o lași pe scurgere.|Reține resturile=Filtrul reține resturile de legume, ca apa să fie bună pentru flori.|O duce la plante=Tubul duce apa filtrată direct la plante.',
      'Nu tot ce e „folosit" e murdar. Apa de la clătit legume e perfect bună pentru flori.',
      'Ce apă poți da la flori?|Apa în care ai clătit legume;Apa cu detergent;Apa cu ulei|0'],

    ['camera', 'panza,cutie', 'Hainele rămase mici', 'Trei tricouri și doi blugi nu-i mai vin lui Rareș. Sunt încă bune, dar nu-i mai încap nici în dulap.', 'Atelierul de haine noi',
      'panza,banda_adeziva,rigla', 'bec,pompa,luna', 'Materialul de bază=Pânza din hainele vechi e materialul pentru lucrurile noi.|Prinde bucățile=Banda adezivă prinde bucățile până le coși sau le lipești definitiv.|Măsori înainte să tai=Rigla te ajută să măsori și să tai drept, fără să strici materialul.',
      'Un tricou devine sacoșă, un blug devine penar. Se numește „upcycling": lucrul vechi devine ceva mai bun.',
      'Ce e mai bine pentru planetă?|Să transformi hainele vechi;Să le arunci imediat;Să cumperi mereu altele|0'],

    ['atelier', 'cutie,magnet', 'Metalul din gunoi', 'În lada de reciclare sunt amestecate cutii de conserve, doze de aluminiu și plastic. Sortarea manuală durează ore.', 'Separatorul magnetic',
      'magnet,banda,cutie', 'bec,floare,gheata', 'Trage doar fierul=Magnetul trage cutiile de fier și le desparte de plastic și aluminiu.|Aduce gunoiul prin fața magnetului=Banda rulantă aduce gunoiul prin fața magnetului, bucată cu bucată.|Colectează metalul separat=Cutia strânge metalul separat, gata de reciclat.',
      'Magnetul atrage fierul, dar nu aluminiul, plasticul sau sticla. Diferența dintre materiale face sortarea automată.',
      'Ce atrage magnetul?|Fierul;Plasticul;Sticla|0'],

    ['terenjoaca', 'roata,copac', 'Anvelopa uitată', 'În spatele garajului stă de doi ani o anvelopă veche. Ocupă loc și adună apă de ploaie.', 'Leagănul din anvelopă',
      'roata,sfoara,copac', 'bec,sare,peste', 'Scaunul leagănului=Anvelopa devine scaunul leagănului, în loc să adune apă în spatele garajului.|Îl ține agățat=Sfoara groasă ține anvelopa agățată și te lasă să te legeni.|Creanga puternică de sus=Creanga puternică a copacului ține leagănul și copilul din el.',
      'Înainte să arunci un obiect, întreabă-te: „ce altceva ar putea fi?" Cele mai bune invenții pleacă de la întrebarea asta.',
      'Care e cea mai bună soluție pentru un obiect vechi?|Să-i găsești altă folosință;Să-l arunci;Să-l îngropi|0'],

    ['strada', 'plasa,vant', 'Pungile zburătoare', 'Vântul poartă pungi prin tot parcul. Se agață în copaci și ajung până în râu.', 'Capcana de pungi',
      'plasa,lemn,cos', 'bec,prisma,ceas', 'Oprește pungile din zbor=Plasa înaltă prinde pungile din zbor, înainte să ajungă în râu.|Rama care ține plasa=Rama de lemn ține plasa întinsă în bătaia vântului.|Aduni ce ai prins=Coșul strânge pungile prinse, ca să le duci la reciclare.',
      'O pungă ușoară poate zbura kilometri. Cel mai bine e să nu ajungă niciodată acolo.',
      'Ce se întâmplă cu o pungă ajunsă în râu?|Poate ajunge în mare;Se topește în câteva zile;Devine hrană bună|0'],

    ['camera', 'robinet,ceas', 'Dușul nesfârșit', 'Rareș cântă la duș. Când iese, au trecut 15 minute și apa caldă s-a terminat pentru toată casa.', 'Ceasul de duș',
      'clepsidra,robinet,sonerie', 'bec,minge,plasa', 'Măsoară minutele=Clepsidra măsoară cele patru minute de duș, fără ceas ud.|Oprești apa la timp=Robinetul oprește apa exact când se termină nisipul.|Te anunță când e gata=Soneria te anunță că timpul s-a scurs, chiar dacă ai ochii plini de șampon.',
      'Un duș de 4 minute în loc de 10 economisește peste 60 de litri de apă. În fiecare zi, de fiecare persoană.',
      'Cât consumă un duș de 10 minute?|Peste 100 de litri;Cam 10 litri;Cam 1 litru|0'],

    /* ---------- 9. JOACĂ ȘI SPORT ---------- */
    ['terenjoaca', 'minge,plasa', 'Mingea peste gard', 'La fiecare gol ratat, mingea zboară peste gard, în curtea vecinului. Vecinul nu mai e amuzat.', 'Plasa de poartă',
      'plasa,sfoara,lemn', 'bec,oala,gheata', 'Oprește mingea=Plasa se întinde puțin și oprește mingea fără să o trimită înapoi.|Întinde plasa=Sfoara ține plasa întinsă între stâlpi.|Stâlpii porții=Stâlpii de lemn țin plasa sus, în spatele porții.',
      'Plasa se întinde puțin la impact și fură din energia mingii, în loc să i-o dea înapoi ca un perete.',
      'De ce nu sare mingea înapoi din plasă?|Plasa se întinde și ia din energie;Plasa e grea;Mingea se dezumflă|0'],

    ['terenjoaca', 'carton,minge', 'Scorul uitat', 'La mijlocul meciului, o echipă zice 5–3, cealaltă zice 4–4. Meciul se termină cu ceartă, nu cu victorie.', 'Tabela de scor',
      'carton,rigla,carlig', 'bec,apa,peste', 'Cifrele mari=Cartoanele cu cifre arată scorul oricui, în orice moment.|Trasezi casetele drepte=Rigla te ajută să tai casetele drepte, ca cifrele să se schimbe ușor.|O agăți la vedere=Cârligele țin tabela agățată de gard, la vedere pentru toți.',
      'Un joc corect are nevoie de reguli clare și de un scor pe care îl văd toți, tot timpul.'],

    ['camera', 'bicicleta,usa', 'Bicicleta din hol', 'Bicicleta stă în holul îngust. Toată lumea se lovește de ghidon, iar pedala a rupt tapetul.', 'Suportul de perete',
      'carlig,surub,lemn', 'bec,sare,nor', 'Susține roata=Cârligul ține bicicleta agățată de roată, pe verticală.|Prinde solid în perete=Șuruburile prind cârligul solid în perete, ca să țină greutatea.|Împarte greutatea pe suprafață mare=Scândura pusă sub cârlig împarte greutatea pe perete, fără să rupă tapetul.',
      'Pusă vertical, o bicicletă ocupă de trei ori mai puțin loc. Spațiul nu s-a mărit — s-a folosit mai bine.'],

    ['strada', 'roata,rampa', 'Skateboardul fără frână', 'Pe panta de lângă bloc, skateboardul ia viteză și singura frânare e să sari de pe el.', 'Frâna de skate',
      'burete,surub,lemn', 'bec,planta,cana', 'Freacă asfaltul=Buretele de cauciuc se freacă de asfalt și încetinește placa.|Fixează frâna de placă=Șuruburile prind frâna de placă, ca să nu sară la viteză.|Talpa pe care apeși=Bucata de lemn e talpa pe care apeși cu piciorul ca să frânezi.',
      'Frecarea nu e mereu dușmanul: fără ea nu ai putea nici să mergi, nici să te oprești, nici să stai pe loc.',
      'Ce te oprește când frânezi?|Frecarea;Vântul;Culoarea plăcii|0'],

    ['noapte', 'minge,luna', 'Joacă după apus', 'Vara se întunecă la 9 seara, dar copiii tot vor să joace. Mingea neagră devine invizibilă.', 'Mingea luminoasă',
      'bec,baterie,banda_adeziva', 'sare,plasa,oglinda', 'Lumina dinăuntru=Becul dinăuntru face mingea vizibilă de departe, pe întuneric.|Energia=Bateria mică alimentează becul din minge.|Fixează becul, să nu zdrăngăne=Banda adezivă fixează becul și bateria, ca să nu zdrăngăne la lovitură.',
      'Lumina în mișcare se vede de foarte departe. De aceea bicicliștii au lumini care clipesc, nu doar reflectorizante.'],

    ['terenjoaca', 'leagan,sfoara', 'Leagănul care scârțâie', 'Leagănul din parc scârțâie oribil, iar o frânghie e roasă pe jumătate.', 'Reparația leagănului',
      'surub,sfoara,suport', 'bec,peste,magnet', 'Strânge tot ce s-a slăbit=Șuruburile strânse opresc piesele slăbite să se mai frece și să scârțâie.|Înlocuiește frânghia tocită=Sfoara nouă înlocuiește frânghia roasă, înainte să se rupă.|Întărește bara de sus=Suportul întărit ține bara de sus, ca leagănul să fie sigur.',
      'Scârțâitul e un semnal, nu o ciudățenie: două piese se freacă acolo unde nu ar trebui.',
      'Ce înseamnă un scârțâit la un leagăn?|Ceva se freacă sau s-a slăbit;Că e nou;Că e proaspăt vopsit|0'],

    ['atelier', 'masinuta,rampa', 'Cursa de mașinuțe', 'Toți copiii de pe scară au mașinuțe, dar nu au unde să se întreacă. Pe covor, toate merg strâmb.', 'Pista de curse',
      'jgheab,lemn,clepsidra', 'bec,peste,magnet', 'Traseul mașinuțelor=Jgheabul e pista care ține mașinuțele pe drum drept.|Panta de start=Scândura înclinată e panta de start, de unde iau viteză.|Măsori timpul fiecăruia=Clepsidra măsoară timpul fiecărei mașinuțe, ca să știi cine a câștigat.',
      'Cu cât panta de start e mai înaltă, cu atât mașinuța strânge mai multă viteză la coborâre.',
      'De unde ia viteză mașinuța pe pistă?|Din înălțimea de la start;Din culoarea ei;Din greutatea pistei|0'],

    ['terenjoaca', 'minge,suport', 'Coșul prea sus', 'Coșul de baschet e la înălțimea celor mari. Cei mici nu nimeresc niciodată și renunță după cinci minute.', 'Coșul reglabil',
      'lemn,surub,rigla', 'bec,sare,furnica', 'Stâlpul cu găuri din loc în loc=Stâlpul cu găuri lasă coșul să urce sau să coboare.|Fixezi la înălțimea aleasă=Șurubul fixează coșul la înălțimea aleasă pentru fiecare copil.|Măsori corect fiecare treaptă=Rigla marchează treptele de înălțime egale, ca să fie corect pentru toți.',
      'O invenție bună se potrivește omului. Nu omul trebuie să se potrivească invenției.'],

    ['noapte', 'fluier,copac', 'De-a v-ați ascunselea pe întuneric', 'În tabără, jocul de seară devine periculos: nimeni nu mai știe unde e celălalt, iar pădurea e aproape.', 'Semnalizatorul de joc',
      'fluier,bec,baterie', 'cana,magnet,planta', 'Semnalul care se aude=Fluierul se aude de departe, chiar dacă nu se vede nimic.|Semnalul care se vede=Becul care clipește arată unde ești, fără să strigi.|Energia=Bateria alimentează becul toată seara.',
      'Când nu poți vedea, auzul devine cel mai bun simț. De aceea navele folosesc sirene pe ceață.'],

    ['camera', 'cutie,rigla', 'Turnul care se prăbușește', 'Turnul de cuburi al lui Rareș cade mereu la al șaptelea etaj, mereu în aceeași parte.', 'Turnul care nu cade',
      'lemn,rigla,greutate', 'bec,peste,tub', 'Baza largă=Scândura lată de la bază ține turnul mult mai stabil.|Verifici că e perfect drept=Rigla verifică dacă fiecare etaj e drept, înainte să pui altul.|Îngreunează baza=Greutatea pusă jos coboară centrul turnului și nu-l lasă să se răstoarne.',
      'Un turn stă în picioare cât timp greutatea lui „cade" în interiorul bazei. Când iese din bază, se răstoarnă.',
      'Ce turn stă cel mai bine?|Cu baza lată și greu jos;Înalt și subțire;Greu la vârf|0'],

    /* ---------- 10. SPRE STELE ---------- */
    ['spatiu', 'robot,rock', 'Roverul pe pietre', 'Roverul se blochează la fiecare piatră de 10 centimetri. Zona interesantă e plină de bolovani.', 'Roverul cu suspensie',
      'roata,arc,motoras', 'pahar,floare,sonerie', 'Trec peste obstacole=Roțile mari trec peste pietre în loc să se blocheze în ele.|Amortizează hopurile=Arcurile lasă fiecare roată să urce pe piatră fără să zguduie tot roverul.|Îl pune în mișcare=Motorașul învârte roțile și duce roverul înainte.',
      'Arcurile lasă fiecare roată să urce singură pe piatră, fără ca tot roverul să se zguduie.',
      'De ce are roverul roți mari?|Trec mai ușor peste pietre;Arată mai bine;Sunt mai ieftine|0'],

    ['spatiu', 'racheta,parasuta', 'Aterizarea dură', 'Capsula cu instrumente cade prea repede. La ultima încercare, s-a spart la contactul cu solul.', 'Modulul de aterizare',
      'parasuta,arc,sfoara', 'bec,sare,pisica', 'Frânează căderea=Parașuta se lovește de mult aer și frânează căderea capsulei.|Preia lovitura finală=Arcurile de pe picioare preiau ultima lovitură, la atingerea solului.|Leagă parașuta de capsulă=Sfoara leagă parașuta de capsulă, ca să o țină în timpul coborârii.',
      'Parașuta mărește suprafața, iar aerul o încetinește. Pe Marte, unde aerul e rar, nu ajunge singură.',
      'De ce frânează parașuta?|Se lovește de mult aer;Pentru că e grea;Pentru că e colorată|0'],

    ['spatiu', 'robot,apa', 'Apa de pe stație', 'Fiecare litru de apă adus de pe Pământ costă enorm. Echipajul are nevoie de apă în fiecare zi, luni întregi.', 'Reciclatorul de apă',
      'filtru,tub,galeata', 'bec,minge,copac', 'Curăță apa folosită=Filtrul curăță apa folosită, ca să poată fi băută din nou.|O transportă prin stație=Tuburile duc apa prin stație, de la filtru la rezervor.|Rezervorul curat=Rezervorul păstrează apa curată pentru echipaj.',
      'Pe Stația Spațială aproape toată apa e refolosită — inclusiv aburul din respirația echipajului.',
      'De ce se reciclează apa în spațiu?|E foarte scump să o duci acolo;E mai gustoasă;Ca să fie mai grea stația|0'],

    ['spatiu', 'panou_solar,robot', 'Panourile prăfuite', 'După furtuna de praf, roverul primește pe jumătate mai puțină energie. Bateriile nu se mai încarcă până seara.', 'Peria automată',
      'motoras,panza,baterie', 'gheata,peste,palnie', 'Mișcă peria=Motorașul mișcă peria pe panou, fără ca cineva să iasă afară.|Șterge praful de pe panou=Pânza moale șterge praful fără să zgârie panoul.|Dă energie mecanismului=Bateria dă energie motorașului cât timp panoul e încă prăfuit.',
      'Praful marțian a oprit mai mulți roboți decât orice defecțiune tehnică.',
      'Ce pățește un panou solar prăfuit?|Primește mai puțină lumină;Se încarcă mai repede;Nu se schimbă nimic|0'],

    ['spatiu', 'robot,stea', 'Vești de pe Marte', 'Roverul măsoară temperatura și vântul, dar datele rămân în memorie. Nimeni de pe Pământ nu le vede.', 'Stația de date',
      'senzor,fir,baterie', 'oala,minge,floare', 'Măsoară ce se întâmplă=Senzorul măsoară temperatura și vântul de pe Marte.|Duce semnalul la antenă=Firul duce măsurătorile de la senzor la antena care le trimite spre Pământ.|Alimentează stația=Bateria ține stația pornită și în nopțile lungi marțiene.',
      'Un semnal de pe Marte ajunge la noi în 3 până la 22 de minute. De aceea roverul trebuie să se descurce singur.',
      'Cât face un semnal de la Marte până la Pământ?|Minute bune;O secundă;O zi întreagă|0'],

    ['spatiu', 'planta,bec', 'Salată pe orbită', 'Echipajul mănâncă doar conserve de patru luni. Vor să crească salată verde la bord.', 'Sera spațială',
      'ghiveci,bec,pompa', 'sare,roata,toba', 'Ține rădăcinile la locul lor=Ghiveciul ține rădăcinile la locul lor, ca să nu plutească prin stație.|Lumina care înlocuiește Soarele=Becul special dă plantelor lumina pe care Soarele nu o aduce la bord.|Împinge apa la rădăcini=Pompa împinge apa la rădăcini, pentru că fără gravitație ea nu curge în jos.',
      'Fără gravitație, apa nu curge în jos: rămâne lipită în bile. Trebuie împinsă cu o pompă spre rădăcini.',
      'De ce e nevoie de pompă în spațiu?|Apa nu curge în jos fără gravitație;Apa e prea rece;Plantele beau mai mult|0'],

    ['spatiu', 'plasa,racheta', 'Gunoiul de pe orbită', 'În jurul Pământului se învârt mii de bucăți de sateliți vechi. Una singură poate găuri o navă.', 'Colectorul orbital',
      'plasa,magnet,motoras', 'bec,pahar,floare', 'Prinde bucățile mari=Plasa prinde bucățile mari de sateliți vechi.|Adună fragmentele de metal=Magnetul adună fragmentele mici de metal, greu de prins altfel.|Manevrează colectorul=Motorașul manevrează colectorul pe orbită, spre fiecare bucată.',
      'Un șurub pe orbită se mișcă de zece ori mai repede decât un glonț. De aceea și cel mai mic obiect e periculos.',
      'De ce e periculos un șurub pe orbită?|Merge cu viteză uriașă;E ruginit;E prea mare|0'],

    ['spatiu', 'robot,luna', 'Robotul rătăcit', 'Robotul de explorare a pornit spre crater și nu a mai găsit drumul înapoi la bază. Nu există GPS pe Lună.', 'Navigatorul',
      'senzor,ceas,baterie', 'cana,plasa,floare', 'Vede obstacolele=Senzorul vede pietrele și craterele din drum.|Ține socoteala drumului parcurs=Ceasul ține socoteala cât a mers robotul în fiecare direcție, ca să afle unde e.|Îl alimentează=Bateria ține navigatorul pornit tot drumul.',
      'Dacă știi cât ai mers și în ce direcție, poți afla unde ești, chiar și fără hartă. Se numește navigație inerțială.'],

    ['spatiu', 'robot,cutie', 'Uneltele plutitoare', 'Astronautul lasă șurubelnița din mână pentru o secundă. Când se întoarce, ea a plecat în capătul modulului.', 'Trusa magnetică',
      'magnet,cutie,banda_adeziva', 'bec,apa,planta', 'Ține uneltele lipite=Magnetul ține uneltele lipite, ca să nu plece plutind prin modul.|Le adăpostește=Cutia adăpostește uneltele mici, ordonate, la locul lor.|Fixează trusa de perete=Banda adezivă fixează trusa de perete, în imponderabilitate.',
      'În imponderabilitate, un obiect lăsat din mână pleacă în călătorie și nu se oprește până nu lovește ceva.',
      'De ce plutesc obiectele pe stație?|Cad încontinuu în jurul Pământului;Nu au deloc greutate;Sunt prea ușoare|0'],

    ['spatiu', 'luna,gheata', 'Noaptea lunară', 'Pe Lună, noaptea ține două săptămâni și temperatura scade sub minus 170 de grade. Bateriile îngheață.', 'Scutul termic al bazei',
      'folie,carton,panou_solar', 'minge,peste,sfoara', 'Reflectă și păstrează căldura=Folia lucioasă reflectă și păstrează căldura în bază, noaptea.|Stratul izolator gros=Stratul gros de carton izolează pereții de gerul de minus 170 de grade.|Produce energie cât e zi=Panoul solar face energie cât e zi, pentru încălzirea celor două săptămâni de noapte.',
      'Pe Lună sunt +120°C ziua și −170°C noaptea. Izolația e diferența dintre o bază care funcționează și una înghețată.',
      'De ce e nevoie de izolație pe Lună?|Din cauza diferenței uriașe de temperatură;Din cauza ploii;Din cauza vântului|0']
  ]
};

/* ============================================================
   CE FACE FIECARE PIESĂ — descriere neutră, arătată când copilul
   pune piesa în locaș. Nu spune dacă e alegerea bună: îi dă doar
   informația de care are nevoie ca să judece singur.
   ============================================================ */
window.LEVELS_BUILD.parts = {
  albina: 'o insectă care zboară din floare în floare și face miere',
  apa: 'lichidul care curge, udă, răcește și dizolvă multe lucruri',
  arc: 'o spirală de metal care se întinde sau se strânge și revine singură la loc',
  axa: 'bara pe care se învârt roțile, ținându-le la locul lor',
  balon: 'o pungă ușoară umplută cu aer sau gaz, care poate pluti',
  banda: 'o curea lungă care se mișcă și duce obiectele dintr-un loc în altul',
  banda_adeziva: 'o panglică lipicioasă care prinde repede lucruri ușoare',
  baterie: 'o rezervă de curent electric, fără priză',
  bec: 'face lumină când trece curent prin el',
  burete: 'moale și plin de găurele: absoarbe apa și amortizează loviturile',
  cana: 'un vas cu toartă din care bei',
  capac: 'închide un vas, ca să nu intre nimic și să nu iasă nimic',
  carlig: 'o bucată de metal îndoită, de care poți agăța sau cu care poți prinde ceva',
  carte: 'foi de hârtie legate, adică multă hârtie',
  carton: 'hârtie groasă, ușor de tăiat și de îndoit',
  ceas: 'măsoară timpul și poate anunța o oră anume',
  clepsidra: 'nisip care curge dintr-o parte în alta într-un timp fix',
  copac: 'are crengi puternice și umbră deasă',
  cos: 'un vas împletit în care pui sau prinzi lucruri',
  cui: 'bătut cu ciocanul, prinde două bucăți de lemn între ele',
  cutie: 'un spațiu închis în care ții lucruri la un loc',
  difuzor: 'transformă curentul electric în sunet puternic',
  elice: 'pale care se învârt când bate vântul sau împing aerul',
  farfurie: 'un vas plat în care pui mâncarea',
  filtru: 'lasă lichidul să treacă, dar oprește particulele mici',
  fir: 'duce curentul de la un aparat la altul',
  floare: 'o plantă care are nevoie de lumină, apă și pământ',
  fluier: 'face un sunet ascuțit, care se aude de departe',
  foc: 'dă căldură și lumină, dar poate fi periculos',
  folie: 'o foaie subțire care oprește apa și aerul și reflectă căldura',
  furnica: 'o insectă mică ce merge în șir, după miros',
  galeata: 'un vas mare cu toartă, pentru apă sau pământ',
  gheata: 'apă înghețată: foarte rece și alunecoasă',
  ghiveci: 'vasul cu pământ în care crește o plantă',
  greutate: 'un obiect greu care trage în jos și ține lucrurile pe loc',
  intrerupator: 'pornește sau oprește curentul dintr-un circuit',
  jgheab: 'un canal deschis prin care curge apa sau alunecă obiectele',
  lemn: 'scândură tare, ușor de tăiat și de bătut în cuie',
  lentila: 'o bucată de sticlă bombată care îndoaie lumina',
  lipici: 'prinde două suprafețe una de alta, după ce se usucă',
  luna: 'se vede noaptea pe cer și luminează slab',
  lupa: 'o lentilă cu mâner, care mărește lucrurile mici',
  magnet: 'atrage fierul și oțelul, dar nu plasticul sau aluminiul',
  microfon: 'prinde sunetele și le transformă în semnal electric',
  minge: 'rotundă: sare și se rostogolește',
  motoras: 'transformă curentul în învârtire — sau învârtirea în curent',
  nor: 'vapori de apă adunați pe cer, din care poate ploua',
  oala: 'vas de metal în care fierbi mâncare',
  oglinda: 'reflectă lumina și o trimite în altă direcție',
  pahar: 'un vas transparent, de obicei drept, pentru lichide',
  palnie: 'gură largă și gât îngust, ca să torni fără să verși',
  panou_solar: 'transformă lumina soarelui în curent electric',
  panza: 'material moale și subțire, din care se fac haine sau perdele',
  parasuta: 'o pânză mare care frânează căderea prin aer',
  parghie: 'o bară lungă care, sprijinită pe ceva, înmulțește forța',
  peste: 'trăiește în apă și respiră oxigenul din ea',
  pisica: 'iubește locurile calde și își ascute ghearele',
  planta: 'crește spre lumină și bea apă prin rădăcini',
  plasa: 'sfori împletite cu găuri: oprește obiectele, dar lasă aerul',
  ploaie: 'picături de apă care cad din nori',
  pompa: 'împinge apa sau aerul dintr-un loc în altul',
  prisma: 'o bucată de sticlă care desparte lumina în culori',
  racheta: 'zboară împingând gaze fierbinți în jos',
  rampa: 'o suprafață înclinată pe care urci mai ușor decât drept în sus',
  rigla: 'măsoară lungimi și te ajută să tragi linii drepte',
  roata: 'se rostogolește și face mișcarea mult mai ușoară',
  roata_apa: 'e învârtită de apa care curge peste ea',
  roata_dintata: 'transmite învârtirea de la o roată la alta',
  robinet: 'deschide sau închide curgerea apei',
  robot: 'o mașină care face singură ce e programată',
  rock: 'grea, tare și nu se mișcă ușor',
  sare: 'se dizolvă în apă și topește gheața',
  scara: 'te ridică la înălțime, treaptă cu treaptă',
  scripete: 'o roată cu șanț peste care trece o sfoară, ca să ridici mai ușor',
  seminte: 'din ele răsar plante, dacă au apă și căldură',
  senzor: 'simte ceva — lumină, mișcare, umezeală — și dă un semnal',
  sfoara: 'leagă, trage sau ține lucruri la un loc',
  sina: 'o cale netedă pe care rulează roțile',
  sita: 'o plasă fină care lasă aerul și apa, dar oprește bucățile',
  sonerie: 'face un sunet puternic când primește curent',
  sticla: 'un vas transparent cu gât, de obicei din plastic',
  suport: 'ține un obiect ridicat sau drept',
  surub: 'prinde piese strâns, fără să se slăbească ușor',
  tava: 'un vas plat cu margini, care strânge ce se scurge',
  telefon: 'comunică la distanță, dar are nevoie de baterie',
  termometru: 'arată cât de cald sau de frig e',
  toba: 'face zgomot puternic când o lovești',
  tub: 'furtun care duce apa sau aerul dintr-un loc în altul',
  umbrela: 'te apără de ploaie sau de soare'
};
