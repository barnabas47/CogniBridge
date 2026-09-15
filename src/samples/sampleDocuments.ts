import type { CognitiveAnalysis } from '../types';

export interface SampleDocItem {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  icon: string;
  sampleInput: string;
  analysis: CognitiveAnalysis;
}

export const SAMPLE_DOCUMENTS: SampleDocItem[] = [
  {
    id: 'sample-tax-notice',
    title: 'Hivatalos NAV Értesítés / Fizetési Felszólítás',
    categoryName: 'Hivatal & Adóügy',
    description: 'Bonyolult jogi hivatkozásokkal teli fizetési értesítő 8 napos határidővel.',
    icon: 'FileWarning',
    sampleInput: `Nemzeti Adó- és Vámhivatal Észak-budapesti Adó- és Vámigazgatósága
Iktatószám: 4829103/2026/NAV-EB
Tárgy: Értesítés adófolyószámla egyenlegről és végrehajtási eljárás megindításának kilátásba helyezéséről.

Tisztelt Adózó!
Tájékoztatjuk, hogy az Art. 68. § (2) bekezdése és a Vhr. 14. § alapján lefolytatott egyenlegvizsgálat megállapította, hogy az Ön adófolyószámláján 2026. szeptember hóval bezárólag mindösszesen 14.500,- Ft (azaz Tizennégyezer-ötszáz forint) összegű lejárt esedékességű személyi jövedelemadó tartozás és késedelmi pótlék mutatkozik.

Felhívjuk figyelmét, hogy a tartozás megfizetésének elmulasztása esetén a NAV az Art. 210. § értelmében hatósági átutalási megbízást ad ki vagy inkasszót foganatosít az Ön pénzforgalmi számlája ellen.
Fizetési kötelezettségének a Magyar Államkincstárnál vezetett 10032000-01076019 számú NAV Személyi jövedelemadó számlára történő banki átutalással vagy mellékelt készpénzátutalási megbízáson (sárga csekk) tehet eleget a jelen határozat kézhezvételétől számított 8 naptári napon belül.

Amennyiben a fizetési kötelezettség egy összegben történő teljesítése aránytalanul súlyos terhet róna a megélhetésére, az Air. 198. § alapján méltányossági alapon automatikus részletfizetési kérelmet (FAM kérelem) terjeszthet elő elektronikus úton az Ügyfélkapun keresztül.`,
    analysis: {
      id: 'sample-tax-analysis',
      createdAt: new Date().toISOString(),
      documentTitle: 'NAV Fizetési Felszólítás (14.500 Ft)',
      category: 'tax_legal',
      urgency: 'urgent',
      urgencyReason: '8 napos határidő van a 14.500 Ft befizetésére, különben hatósági levonás (inkasszó) következik.',
      tenWordSummary: 'Befizetési kötelezettséged van: 14.500 Ft a NAV-nak 8 napon belül.',
      easyToReadText: `Ez egy hivatalos felszólítás a Nemzeti Adó- és Vámhivataltól (NAV).

A lényeg nagyon egyszerű:
1. Az adószámládon 14.500 Ft elmaradás van a személyi jövedelemadóból.
2. Ezt a pénzt a levél kézhezvételétől számított 8 napon belül be kell fizetned.
3. Ha most nem tudod kifizetni, kérhetsz részletfizetést is az Ügyfélkapun.
4. Ha nem fizetsz és nem kérsz részletfizetést, a NAV levonhatja a bankszámládról a pénzt.

Ne ess pánikba! Az összeg nem rendkívül nagy, és a levélben megadott számlaszámra átutalással 2 perc alatt elintézheted.`,
      keyEntities: [
        { label: 'Fizetendő összeg', value: '14.500 Ft', type: 'money', isUrgent: true },
        { label: 'Fizetési határidő', value: 'Kézhezvételtől 8 nap', type: 'deadline', isUrgent: true },
        { label: 'NAV Cél bankszámlaszám', value: '10032000-01076019', type: 'account', isUrgent: false },
        { label: 'Hivatkozási Iktatószám', value: '4829103/2026/NAV-EB', type: 'reference', isUrgent: false },
        { label: 'Közlemény rovatba', value: 'Adóazonosító jeled + 4829103', type: 'reference', isUrgent: false }
      ],
      jargonDictionary: [
        {
          term: 'Lejárt esedékességű',
          plainExplanation: 'Olyan tartozás, amelynek a fizetési határideje már korábban letelt.',
          analogy: 'Olyan, mint egy könyvtári könyv, amit a határidő lejárta után még nem vittél vissza.',
          doesItAffectMe: 'Igen, emiatt kell most mielőbb rendezni a pénzt.'
        },
        {
          term: 'Hatósági átutalási megbízás (Inkasszó)',
          plainExplanation: 'A hatóság közvetlenül a bankodtól kéri el a pénzt a bankszámládról.',
          analogy: 'A bankod automatikusan levonja az összeget a számládról és elküldi a NAV-nak.',
          doesItAffectMe: 'Csak akkor érint, ha 8 napon belül nem fizeted be és nem kérsz részletfizetést.'
        },
        {
          term: 'FAM Kérelem (Méltányossági részletfizetés)',
          plainExplanation: 'Egy egyszerű online nyomtatvány, amiben megkéred a NAV-ot, hogy havi kis részletekben fizethesd be az összeget.',
          analogy: 'Olyan, mint amikor megbeszéled a főbérlővel, hogy két részletben adod oda a lakbért.',
          doesItAffectMe: 'Ha most nincs 14.500 Ft a számládon, ezzel elkerülheted a büntetést.'
        }
      ],
      microActions: [
        {
          id: 'step-1',
          title: 'Nyisd meg a banki mobilalkalmazásodat',
          detailedGuide: 'Lépj be a megszokott banki applikációdba a telefonodon vagy a számítógépen.',
          estimatedMinutes: 1,
          isCompleted: false,
          category: 'preparation',
          substeps: [
            'Nyisd meg a banki alkalmazást a telefonodon',
            'Lépj be ujjlenyomattal vagy jelszóval',
            'Kattints az "Új utalás" gombra'
          ]
        },
        {
          id: 'step-2',
          title: 'Másold be az adatokat és indíts 14.500 Ft utalást',
          detailedGuide: 'Kedvezményezett: NAV SZJA számla. Számlaszám: 10032000-01076019. Közlemény: Az adóazonosító jeled.',
          estimatedMinutes: 2,
          isCompleted: false,
          category: 'action',
          substeps: [
            'Másold ki a fenti számlaszámot az 1-kattintásos gombbal',
            'Írd be az összeget: 14500',
            'A közleménybe írd be a 10 jegyű adóazonosító jeledet'
          ]
        },
        {
          id: 'step-3',
          title: 'Mentsd el a bizonylatot és lélegezz fel!',
          detailedGuide: 'Készíts egy képernyőfotót vagy mentsd el a PDF igazolást a sikeres tranzakcióról.',
          estimatedMinutes: 1,
          isCompleted: false,
          category: 'verification',
          substeps: [
            'Mentsd el a banki visszaigazolást',
            'Kész vagy! Megszűnt a bírságveszély.'
          ]
        }
      ],
      replyTemplates: [
        {
          id: 'reply-paid',
          label: 'Igazolás küldése befizetésről',
          tone: 'Hivatalos & Tájékoztató',
          subject: 'Befizetés igazolása - Iktatószám: 4829103/2026/NAV-EB',
          body: `Tisztelt NAV Ügyintéző!

Hivatkozva a 4829103/2026/NAV-EB iktatószámú fizetési felszólításra, ezúton tájékoztatom Önöket, hogy a megállapított 14.500 Ft összegű tartozást a mai napon banki átutalással teljesítettem a 10032000-01076019 számú számlára.

Kérem a befizetés jóváírását és a nyilvántartás rendezését.

Tisztelettel,`
        },
        {
          id: 'reply-installment',
          label: 'Részletfizetési kérelem jelzése',
          tone: 'Kérelem & Méltányossági',
          subject: 'Részletfizetési szándék bejelentése - Iktatószám: 4829103/2026/NAV-EB',
          body: `Tisztelt Nemzeti Adó- és Vámhivatal!

A 4829103/2026/NAV-EB iktatószámú megkeresésükre hivatkozva tisztelettel kérem, hogy a 14.500 Ft összegű tartozásomra 3 havi részletfizetést engedélyezzenek az Air. 198. § alapján, tekintettel átmeneti likviditási nehézségeimre.

A hivatalos FAM nyomtatványt az Ügyfélkapun keresztül is benyújtom.

Köszönettel,`
        }
      ]
    }
  },
  {
    id: 'sample-medical-report',
    title: 'Bonyolult Orvosi Lelet & Laboreredmény',
    categoryName: 'Egészségügy',
    description: 'Nehezen értelmezhető latin orvosi szakkifejezésekkel teli vérkép és szakorvosi vélemény.',
    icon: 'Activity',
    sampleInput: `Szent János Kórház - Belgyógyászati Szakambulancia
Páciens lelet: Ambuláns lap és laboratóriumi panel kiértékelés.
Dátum: 2026.09.10.

Anamnézis és Státusz:
A páciens intermittáló epigastrialis diszkomfortról és postprandialis meteorizmusról számol be. Fizikális vizsgálat: Has puha, betapintható, hepatosplenomegalia nem észlelhető. Perisztaltika megtartott.

Laboratóriumi lelet összefoglaló:
- Szérum glükóz: 5.4 mmol/L (Referencia: 3.9 - 6.0) [Normál]
- ASAT (GOT): 24 U/L (Ref: < 35) [Normál]
- ALAT (GPT): 22 U/L (Ref: < 35) [Normál]
- TSH: 2.15 mIU/L (Ref: 0.4 - 4.0) [Euthyreosis]
- Szérum ferritin: 14 ug/L (Referencia: 30 - 300 ug/L) [Lényeges vashiány / Sideropenia]
- Hemoglobin: 118 g/L (Referencia: 120 - 160 g/L) [Enyhe mikrociter anaemia gyanú]

Vélemény és Terápiás javaslat:
Komoly szervi patológia vagy malignitásra utaló jel nem igazolódott. A gasztrointesztinális panaszok funkcionális diszpepsziának felelnek meg.
Sideropenia miatt per os vaspótlás javasolt: napi 1x Sorbifer Durules 100 mg tabletta étkezés előtt, C-vitamin kíséretében, 3 hónapon keresztül.
Kontroll laborvizsgálat (szérum ferritin + vérkép) 3 hónap múlva esedékes.`,
    analysis: {
      id: 'sample-med-analysis',
      createdAt: new Date().toISOString(),
      documentTitle: 'Belgyógyászati Lelet: Enyhe Vashiány',
      category: 'medical',
      urgency: 'calm',
      urgencyReason: 'Megnyugodhatsz: semmilyen súlyos betegség nem igazolódott. Csupán vaspótlásra és 3 hónap múlva vérvételre van szükség.',
      tenWordSummary: 'Nincs súlyos baj. Enyhe vashiányod van, napi 1 vastabletta kell.',
      easyToReadText: `A leleted alapvetően jó híreket tartalmaz. 

Íme a legfontosabb dolgok egyszerűen elmagyarázva:
1. **Nincs komoly szervi bajod:** A májad, a pajzsmirigyed és a vércukrod teljesen normális.
2. **Enyhe vashiány:** A szervezetedben a vasraktárak kicsit kimerültek (emiatt lehetsz néha fáradékony).
3. **Mi a teendő?** Napi 1 szem vastablettát (Sorbifer Durules) kell bevenned 3 hónapig, étkezés előtt egy pohár vízzel vagy narancslével (a C-vitamin segíti a felszívódást).
4. **Kontroll:** 3 hónap múlva vissza kell menned egy egyszerű vérvételre.`,
      keyEntities: [
        { label: 'Fő diagnózis', value: 'Enyhe vashiány (Sideropenia)', type: 'reference', isUrgent: false },
        { label: 'Javasolt gyógyszer', value: 'Sorbifer Durules (napi 1x étkezés előtt)', type: 'contact', isUrgent: false },
        { label: 'Kúra időtartama', value: '3 hónap', type: 'deadline', isUrgent: false },
        { label: 'Következő kontroll vérvétel', value: '2026. december (3 hónap múlva)', type: 'deadline', isUrgent: false }
      ],
      jargonDictionary: [
        {
          term: 'Sideropenia (Vashiány)',
          plainExplanation: 'A testedben a vas szintje alacsonyabb a normálisnál.',
          analogy: 'Olyan, mint amikor az autóban kigyullad a tartalék üzemanyagszint-jelző: még megy a motor, de ideje tankolni.',
          doesItAffectMe: 'Igen, emiatt kell vastablettát szedned.'
        },
        {
          term: 'Postprandialis meteorizmus',
          plainExplanation: 'Étkezés utáni puffadás vagy teltségérzet a hasban.',
          analogy: 'Egyszerű haspuffadás ebéd után.',
          doesItAffectMe: 'Nem veszélyes, kímélő étrenddel javul.'
        },
        {
          term: 'Euthyreosis',
          plainExplanation: 'A pajzsmirigyed tökéletesen és egészségesen működik.',
          analogy: 'Minden zöldre váltott a műszerfalon.',
          doesItAffectMe: 'Jó hír, nincs vele teendőd.'
        }
      ],
      microActions: [
        {
          id: 'med-step-1',
          title: 'Váltsd ki a vastablettát a patikában',
          detailedGuide: 'Kérd a Sorbifer Durules tablettát a gyógyszertárban a felírt e-receptedre a TAJ kártyáddal.',
          estimatedMinutes: 15,
          isCompleted: false,
          category: 'preparation',
          substeps: [
            'Keresd meg a legközelebbi gyógyszertárat',
            'Vidd magaddal a személyidet és a TAJ kártyádat',
            'Kérj hozzá C-vitamint is a jobb felszívódásért'
          ]
        },
        {
          id: 'med-step-2',
          title: 'Állíts be egy napi emlékeztetőt a telefonodon',
          detailedGuide: 'Vegyél be napi 1 tablettát reggeli előtt egy nagy pohár vízzel.',
          estimatedMinutes: 2,
          isCompleted: false,
          category: 'action',
          substeps: [
            'Állíts be egy reggeli ébresztőt a telefonodon "Vastabletta bevétele" névvel',
            'Tedd a dobozt a fogkeféd mellé, hogy ne felejtsd el'
          ]
        },
        {
          id: 'med-step-3',
          title: 'Írd be a naptáradba a 3 hónapos kontrollt',
          detailedGuide: 'Mentsd el a kontroll időpontot 3 hónap múlvára a háziorvosodhoz vérvételre.',
          estimatedMinutes: 2,
          isCompleted: false,
          category: 'verification',
          substeps: [
            'Használd a CogniBridge naptár exportját 1 kattintással',
            'Állíts be egy emlékeztetőt 1 héttel a kontroll előtt'
          ]
        }
      ],
      replyTemplates: [
        {
          id: 'reply-med-dr',
          label: 'Kérdés a kezelőorvosnak',
          tone: 'Udvarias kérdés',
          subject: 'Kérdés a Sorbifer kúra kapcsán - [Páciens neve]',
          body: `Tisztelt Doktornő / Doktor Úr!

Köszönöm a részletes leletet és a kivizsgálást. A javasolt Sorbifer Durules vaspótlást a mai napon megkezdtem.
Szeretném megkérdezni, hogy a kontroll vérvételre a háziorvosomnál kérjek beutalót a 3. hónap végén, vagy Önöknél jelentkezzek újra?

Tisztelettel és köszönettel,`
        }
      ]
    }
  },
  {
    id: 'sample-university-syllabus',
    title: 'Egyetemi Tárgykövetelmény & Vizsgaszabályzat',
    categoryName: 'Oktatás',
    description: 'Többoldalas, bonyolult egyetemi követelményrendszer pontszámokkal és pótlási feltételekkel.',
    icon: 'GraduationCap',
    sampleInput: `Budapesti Műszaki Egyetem - Villamosmérnöki és Informatikai Kar
Tantárgyi követelmény és féléves ütemterv (2026/27 őszi félév)
Tantárgy kódja: VIAUMA01 - Algoritmuselmélet és Adatszerkezetek (5 kredit)

Aláírás megszerzésének és a vizsgára bocsátásnak a feltételei:
A félév során 2 db zárthelyi dolgozat (ZH1 és ZH2) kerül megírásra. A zárthelyik egyenként 50-50 pontosak.
Az aláírás feltétele mindkét zárthelyi dolgozat egyenkénti sikeres, minimum 40%-os (20 pont) teljesítése, valamint a laborgyakorlatok legalább 70%-án való aktív részvétel (legfeljebb 2 igazolatlan hiányzás megengedett).
Pótlási lehetőségek:
A szorgalmi időszak utolsó hetében 1 db pótzárthelyi (PZH) írható, melyen az egyik sikertelen ZH javítható.
Amennyiben a hallgató a szorgalmi időszak végéig sem éri el az aláírás feltételeit, a vizsgaidőszak első hetében különeljárási díj megfizetése mellett 1 db pót-pótzárthelyit (PPZH) kísérelhet meg.

Értékelés és félévközi jegy számítása:
A féléves jegy a két zárthelyi összegéből (max 100 pont) adódik:
- 0 - 39 pont: Elégtelen (1)
- 40 - 54 pont: Elégséges (2)
- 55 - 69 pont: Közepes (3)
- 70 - 84 pont: Jó (4)
- 85 - 100 pont: Jeles (5)`,
    analysis: {
      id: 'sample-edu-analysis',
      createdAt: new Date().toISOString(),
      documentTitle: 'Algoritmuselmélet Tárgykövetelmények (5 kredit)',
      category: 'education',
      urgency: 'moderate',
      urgencyReason: 'Folyamatos féléves figyelmet igényel: 2 ZH megírása legalább 20-20 ponttal, és max 2 hiányzás a laborokról.',
      tenWordSummary: '2 ZH-t kell legalább 20 pontra megírnod, max 2 hiányzás.',
      easyToReadText: `Ez az Algoritmuselmélet tantárgy féléves szabályzata.

Íme a lényeg, hogy biztosan meglegyen a tárgyad:
1. **Zárthelyik (ZH-k):** 2 db ZH lesz, mindkettőből legalább **20 pontot** (40%) el kell érned.
2. **Hiányzások:** A laborokról legfeljebb **2 alkalommal** hiányozhatsz a félévben.
3. **Pótlás:** Ha egy ZH nem sikerül, a szorgalmi időszak végén van 1 ingyenes pót-ZH. Ha az sem sikerül, a vizsgaidőszakban van még egy utolsó esély (külön díjért).
4. **Jegyek:** Ha mindkét ZH-d megvan, a pontjaik összeadódnak (40 ponttól már megvan a kettes).`,
      keyEntities: [
        { label: 'Minimum pontszám ZH-nként', value: '20 pont / 50 pont', type: 'reference', isUrgent: false },
        { label: 'Maximális megengedett hiányzás', value: 'Maximum 2 labor', type: 'deadline', isUrgent: true },
        { label: 'Ketteshez (átmenéshez) kell', value: 'Összesen legalább 40 pont', type: 'money', isUrgent: false },
        { label: 'Kredit érték', value: '5 kredit', type: 'reference', isUrgent: false }
      ],
      jargonDictionary: [
        {
          term: 'Aláírás (Félévaláírás)',
          plainExplanation: 'Az igazolás, hogy a félév során elvégezted az alapkövetelményeket.',
          analogy: 'Olyan, mint a belépőjegy a vizsgára.',
          doesItAffectMe: 'Kötelező megszerezni, különben nem kaphatsz jegyet.'
        },
        {
          term: 'Pót-Pót ZH (PPZH)',
          plainExplanation: 'A legutolsó javítási lehetőség a vizsgaidőszak legelején.',
          analogy: 'Mentőöv, de fizetni kell érte egy különeljárási díjat.',
          doesItAffectMe: 'Csak akkor kell rá gondolni, ha a rendes és a pót ZH sem sikerült.'
        }
      ],
      microActions: [
        {
          id: 'edu-step-1',
          title: 'Írd be a naptáradba a 2 ZH pontos időpontját',
          detailedGuide: 'Nézd meg a féléves ütemtervben a két ZH hetét és állíts be tanulási emlékeztetőket 1 héttel előtte.',
          estimatedMinutes: 5,
          isCompleted: false,
          category: 'preparation',
          substeps: [
            'Nézd meg a Neptunban vagy Moodle-ben a ZH időpontokat',
            'Állíts be egy naptár bejegyzést a felkészüléshez'
          ]
        },
        {
          id: 'edu-step-2',
          title: 'Készíts egy jelenléti pipáló listát a laborokhoz',
          detailedGuide: 'Tartsd számon a laborokat, hogy véletlenül se lépd át a megengedett 2 hiányzást.',
          estimatedMinutes: 2,
          isCompleted: false,
          category: 'action'
        }
      ],
      replyTemplates: [
        {
          id: 'reply-edu-prof',
          label: 'Igazolás kérése hiányzás miatt',
          tone: 'Udvarias diák-tanár kommunikáció',
          subject: 'VIAUMA01 - Laboratóriumi hiányzás jelzése és pótlási kérdés',
          body: `Tisztelt Oktató Úr / Tanárnő!

A VIAUMA01 kódú Algoritmuselmélet kurzus hallgatójaként tisztelettel jelezni szeretném, hogy orvosi indok miatt nem tudtam részt venni a tegnapi laborgyakorlaton.
A hivatalos orvosi igazolást mellékelten csatolom. Szeretném megkérdezni, hogy van-e lehetőség a laborfeladatok önálló pótlására egy másik laborcsoportban?

Tisztelettel,`
        }
      ]
    }
  }
];
