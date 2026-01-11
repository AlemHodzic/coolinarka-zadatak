import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const recipes = [
  {
    slug: 'sarma',
    title: 'Sarma',
    lead: 'Tradicionalna sarma od kiselog kupusa punjena mljevenim mesom i rižom, savršena za hladne zimske dane.',
    imageId: '/recipes/sarma/hero.jpg',
    prepTime: 180,
    servings: 8,
    difficulty: 'HARD',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['tradicionalno', 'zimsko', 'meso', 'kiseli kupus']),
    ingredients: JSON.stringify([
      { name: 'Kiseli kupus', quantity: '1', unit: 'glavica' },
      { name: 'Mljeveno meso (juneće)', quantity: '500', unit: 'g' },
      { name: 'Riža', quantity: '150', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Češnjak', quantity: '4', unit: 'režnja' },
      { name: 'Crvena paprika', quantity: '2', unit: 'žlice' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Sušena rebarca', quantity: '300', unit: 'g' },
      { name: 'Lovorov list', quantity: '2', unit: 'kom' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Oprati listove kiselog kupusa i ukloniti debele dijelove.' },
      { order: 2, instruction: 'Pomiješati mljeveno meso s rižom, sitno nasjeckanim lukom, češnjakom, paprikom, soli i paprom.' },
      { order: 3, instruction: 'Na svaki list staviti žlicu nadijeva i zamotati u rolicu.' },
      { order: 4, instruction: 'U veliki lonac na dno staviti nasjeckani kupus i sušena rebarca.' },
      { order: 5, instruction: 'Slagati sarme u lonac, dodati lovorov list i preliti vodom.' },
      { order: 6, instruction: 'Kuhati na laganoj vatri 2-3 sata dok meso ne omekša.' }
    ])
  },
  {
    slug: 'cevapi',
    title: 'Ćevapi',
    lead: 'Sočni bosanski ćevapi od miješanog mljevenog mesa, posluženi u lepinja kruhu sa lukom i kajmakom.',
    imageId: '/recipes/cevapi/hero.jpg',
    prepTime: 45,
    servings: 4,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'GRILLING',
    tags: JSON.stringify(['bosansko', 'roštilj', 'meso', 'tradicionalno']),
    ingredients: JSON.stringify([
      { name: 'Mljevena junetina', quantity: '400', unit: 'g' },
      { name: 'Mljevena janjetina', quantity: '200', unit: 'g' },
      { name: 'Češnjak', quantity: '4', unit: 'režnja' },
      { name: 'Soda bikarbona', quantity: '1/2', unit: 'žličice' },
      { name: 'Sol', quantity: '1', unit: 'žličica' },
      { name: 'Crni papar', quantity: '1/2', unit: 'žličice' },
      { name: 'Lepinje', quantity: '4', unit: 'kom' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Kajmak', quantity: '100', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Pomiješati mljeveno meso s usitnjenim češnjakom, sodom bikarbonom, soli i paprom.' },
      { order: 2, instruction: 'Dobro izmijesiti rukama i ostaviti u hladnjaku minimalno 2 sata.' },
      { order: 3, instruction: 'Oblikovati ćevape u obliku malih valjaka dužine oko 8 cm.' },
      { order: 4, instruction: 'Peći na vrućem roštilju ili tavi 3-4 minute sa svake strane.' },
      { order: 5, instruction: 'Poslužiti u toplim lepinjama s narezanim lukom i kajmakom.' }
    ])
  },
  {
    slug: 'burek',
    title: 'Burek s mesom',
    lead: 'Hrskavi burek od domaćih jufki punjen sočnim mljevenim mesom i lukom, pečen do zlatne boje.',
    imageId: '/recipes/burek/hero.jpg',
    prepTime: 120,
    servings: 8,
    difficulty: 'HARD',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['bosansko', 'tradicionalno', 'pecivo', 'meso']),
    ingredients: JSON.stringify([
      { name: 'Brašno', quantity: '500', unit: 'g' },
      { name: 'Voda', quantity: '250', unit: 'ml' },
      { name: 'Sol', quantity: '1', unit: 'žličica' },
      { name: 'Ulje', quantity: '3', unit: 'žlice' },
      { name: 'Mljeveno meso', quantity: '500', unit: 'g' },
      { name: 'Luk', quantity: '3', unit: 'kom' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Ulje za mazanje', quantity: '100', unit: 'ml' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Zamijesiti tijesto od brašna, vode, soli i ulja. Ostaviti da odstoji 30 minuta.' },
      { order: 2, instruction: 'Podijeliti tijesto na 6 dijelova i svaki razvući u tanku jufku.' },
      { order: 3, instruction: 'Pripremiti nadjev od mljevenog mesa s lukom, soli i paprom.' },
      { order: 4, instruction: 'Svaku jufku premazati uljem i rasporediti nadjev.' },
      { order: 5, instruction: 'Zamotati u rolicu i slagati u nauljeni pleh u obliku spirale.' },
      { order: 6, instruction: 'Premazati uljem i peći na 200°C oko 45 minuta do zlatne boje.' }
    ])
  },
  {
    slug: 'palacinke',
    title: 'Palačinke s Nutellom',
    lead: 'Tanke i mekane palačinke premazane Nutellom, savršen desert za cijelu obitelj.',
    imageId: '/recipes/palacinke/hero.jpg',
    prepTime: 30,
    servings: 6,
    difficulty: 'EASY',
    mealGroup: 'DESSERT',
    prepMethod: 'FRYING',
    tags: JSON.stringify(['desert', 'brzo', 'nutella', 'djeca']),
    ingredients: JSON.stringify([
      { name: 'Brašno', quantity: '200', unit: 'g' },
      { name: 'Mlijeko', quantity: '400', unit: 'ml' },
      { name: 'Jaja', quantity: '2', unit: 'kom' },
      { name: 'Šećer', quantity: '2', unit: 'žlice' },
      { name: 'Sol', quantity: '1', unit: 'prstohvat' },
      { name: 'Ulje', quantity: '2', unit: 'žlice' },
      { name: 'Nutella', quantity: '200', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Pomiješati brašno, mlijeko, jaja, šećer i sol u glatku smjesu bez grudica.' },
      { order: 2, instruction: 'Dodati ulje i dobro promiješati. Ostaviti 10 minuta da odstoji.' },
      { order: 3, instruction: 'Zagrijati tavu i nauljiti tankim slojem.' },
      { order: 4, instruction: 'Uliti tanki sloj tijesta i peći dok ne porumeni s obje strane.' },
      { order: 5, instruction: 'Svaku palačinku premazati Nutellom i saviti u trokut ili rolicu.' }
    ])
  },
  {
    slug: 'cokoladna-torta',
    title: 'Čokoladna torta',
    lead: 'Bogata i kremasta čokoladna torta s ganache prelivom, idealna za posebne prilike.',
    imageId: '/recipes/cokoladna-torta/hero.jpg',
    prepTime: 90,
    servings: 12,
    difficulty: 'MEDIUM',
    mealGroup: 'DESSERT',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['desert', 'čokolada', 'torta', 'svečano']),
    ingredients: JSON.stringify([
      { name: 'Tamna čokolada', quantity: '200', unit: 'g' },
      { name: 'Maslac', quantity: '200', unit: 'g' },
      { name: 'Šećer', quantity: '200', unit: 'g' },
      { name: 'Jaja', quantity: '4', unit: 'kom' },
      { name: 'Brašno', quantity: '100', unit: 'g' },
      { name: 'Kakao', quantity: '50', unit: 'g' },
      { name: 'Prašak za pecivo', quantity: '1', unit: 'žličica' },
      { name: 'Slatko vrhnje', quantity: '200', unit: 'ml' },
      { name: 'Čokolada za preljev', quantity: '150', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Otopiti čokoladu s maslacem na pari.' },
      { order: 2, instruction: 'Umutiti jaja sa šećerom do pjenaste smjese.' },
      { order: 3, instruction: 'Dodati otopljenu čokoladu, brašno pomiješano s kakaom i praškom za pecivo.' },
      { order: 4, instruction: 'Izliti u kalup i peći na 180°C oko 35-40 minuta.' },
      { order: 5, instruction: 'Za ganache zagrijati vrhnje i preliti preko nasječene čokolade. Promiješati.' },
      { order: 6, instruction: 'Ohlađenu tortu preliti ganacheom i ohladiti prije posluživanja.' }
    ])
  },
  {
    slug: 'bosanski-lonac',
    title: 'Bosanski lonac',
    lead: 'Tradicionalno jelo od raznih vrsta mesa i povrća, polako kuhano u glinenom loncu.',
    imageId: '/recipes/bosanski-lonac/hero.jpg',
    prepTime: 240,
    servings: 8,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['tradicionalno', 'bosansko', 'meso', 'povrće']),
    ingredients: JSON.stringify([
      { name: 'Juneće meso', quantity: '300', unit: 'g' },
      { name: 'Janjeće meso', quantity: '300', unit: 'g' },
      { name: 'Piletina', quantity: '300', unit: 'g' },
      { name: 'Krumpir', quantity: '500', unit: 'g' },
      { name: 'Mrkva', quantity: '3', unit: 'kom' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Paprika', quantity: '2', unit: 'kom' },
      { name: 'Rajčica', quantity: '3', unit: 'kom' },
      { name: 'Bijelo vino', quantity: '200', unit: 'ml' },
      { name: 'Češnjak', quantity: '4', unit: 'režnja' },
      { name: 'Lovorov list, sol, papar', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Narezati meso na veće komade i povrće na kolutove.' },
      { order: 2, instruction: 'U glineni lonac slagati slojeve mesa i povrća.' },
      { order: 3, instruction: 'Dodati češnjak, lovorov list, sol, papar i vino.' },
      { order: 4, instruction: 'Zatvoriti lonac poklopcem i zapečatiti tijestom.' },
      { order: 5, instruction: 'Peći u pećnici na 160°C 3-4 sata.' },
      { order: 6, instruction: 'Otvoriti lonac tek pred posluživanje.' }
    ])
  },
  {
    slug: 'juha-od-rajcice',
    title: 'Kremasta juha od rajčice',
    lead: 'Baršunasta kremasta juha od svježih rajčica začinjena bosiljkom, savršena za lagani obrok.',
    imageId: '/recipes/juha-od-rajcice/hero.jpg',
    prepTime: 45,
    servings: 4,
    difficulty: 'EASY',
    mealGroup: 'SOUP',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['juha', 'vegetarijansko', 'lagano', 'rajčica']),
    ingredients: JSON.stringify([
      { name: 'Zrele rajčice', quantity: '1', unit: 'kg' },
      { name: 'Luk', quantity: '1', unit: 'kom' },
      { name: 'Češnjak', quantity: '3', unit: 'režnja' },
      { name: 'Maslinovo ulje', quantity: '3', unit: 'žlice' },
      { name: 'Pileća temeljac', quantity: '500', unit: 'ml' },
      { name: 'Slatko vrhnje', quantity: '100', unit: 'ml' },
      { name: 'Svježi bosiljak', quantity: '1', unit: 'svežanj' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Narezati rajčice na četvrtine, luk i češnjak sitno nasjeckati.' },
      { order: 2, instruction: 'Na maslinovom ulju prodinstati luk i češnjak dok ne omekšaju.' },
      { order: 3, instruction: 'Dodati rajčice i dinstati 10 minuta.' },
      { order: 4, instruction: 'Dodati temeljac i kuhati 20 minuta.' },
      { order: 5, instruction: 'Blenderom izmiksati do glatke kreme.' },
      { order: 6, instruction: 'Dodati vrhnje, bosiljak, sol i papar. Poslužiti toplo.' }
    ])
  },
  {
    slug: 'shopska-salata',
    title: 'Šopska salata',
    lead: 'Osvježavajuća balkanska salata od svježeg povrća s naribenim sirom, idealna kao prilog ili lagani obrok.',
    imageId: '/recipes/shopska-salata/hero.jpg',
    prepTime: 15,
    servings: 4,
    difficulty: 'EASY',
    mealGroup: 'SALAD',
    prepMethod: 'RAW',
    tags: JSON.stringify(['salata', 'svježe', 'balkansko', 'zdravo']),
    ingredients: JSON.stringify([
      { name: 'Rajčice', quantity: '4', unit: 'kom' },
      { name: 'Krastavci', quantity: '2', unit: 'kom' },
      { name: 'Paprika', quantity: '2', unit: 'kom' },
      { name: 'Luk', quantity: '1', unit: 'kom' },
      { name: 'Feta sir', quantity: '200', unit: 'g' },
      { name: 'Maslinovo ulje', quantity: '4', unit: 'žlice' },
      { name: 'Sol', quantity: '', unit: 'po ukusu' },
      { name: 'Peršin', quantity: '1', unit: 'svežanj' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Narezati rajčice, krastavce i papriku na kockice.' },
      { order: 2, instruction: 'Luk narezati na tanke polukolute.' },
      { order: 3, instruction: 'Sve povrće staviti u zdjelu i posoliti.' },
      { order: 4, instruction: 'Preliti maslinovim uljem i lagano promiješati.' },
      { order: 5, instruction: 'Na vrh naribati feta sir i posuti nasjeckanim peršinom.' }
    ])
  },
  {
    slug: 'klepe',
    title: 'Klepe',
    lead: 'Bosanski ravioli punjeni mljevenim mesom, posluženi s jogurtom i češnjakom - jelo koje će vas osvojiti.',
    imageId: '/recipes/klepe/hero.jpg',
    prepTime: 90,
    servings: 6,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['bosansko', 'tradicionalno', 'meso', 'tjestenina']),
    ingredients: JSON.stringify([
      { name: 'Brašno', quantity: '400', unit: 'g' },
      { name: 'Jaja', quantity: '2', unit: 'kom' },
      { name: 'Voda', quantity: '150', unit: 'ml' },
      { name: 'Sol', quantity: '1', unit: 'žličica' },
      { name: 'Mljevena junetina', quantity: '400', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Kiselo vrhnje', quantity: '300', unit: 'g' },
      { name: 'Češnjak', quantity: '4', unit: 'režnja' },
      { name: 'Maslac', quantity: '50', unit: 'g' },
      { name: 'Crvena paprika', quantity: '1', unit: 'žličica' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Zamijesiti tijesto od brašna, jaja, vode i soli. Ostaviti 30 minuta.' },
      { order: 2, instruction: 'Pripremiti nadjev od mljevenog mesa, luka, soli i papra.' },
      { order: 3, instruction: 'Razvući tijesto tanko i rezati na kvadratiće 5x5 cm.' },
      { order: 4, instruction: 'Na svaki kvadratić staviti nadjev i zatvoriti u trokut.' },
      { order: 5, instruction: 'Kuhati u slanoj vodi 10-15 minuta dok ne isplivaju.' },
      { order: 6, instruction: 'Poslužiti s kiselim vrhnjem začinjenim češnjakom i prelivom od maslaca s paprikom.' }
    ])
  },
  {
    slug: 'tufahije',
    title: 'Tufahije',
    lead: 'Tradicionalni bosanski desert - pečene jabuke punjene orasima u slatkom sirupu od šećera.',
    imageId: '/recipes/tufahije/hero.jpg',
    prepTime: 60,
    servings: 6,
    difficulty: 'MEDIUM',
    mealGroup: 'DESSERT',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['desert', 'bosansko', 'tradicionalno', 'jabuke']),
    ingredients: JSON.stringify([
      { name: 'Jabuke (kisele)', quantity: '6', unit: 'kom' },
      { name: 'Orasi', quantity: '200', unit: 'g' },
      { name: 'Šećer', quantity: '400', unit: 'g' },
      { name: 'Voda', quantity: '500', unit: 'ml' },
      { name: 'Limunov sok', quantity: '2', unit: 'žlice' },
      { name: 'Slatko vrhnje', quantity: '200', unit: 'ml' },
      { name: 'Vanilin šećer', quantity: '1', unit: 'vrećica' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Oguliti jabuke i izvaditi sredinu, ostavljajući dno.' },
      { order: 2, instruction: 'Skuhati sirup od šećera i vode, dodati limunov sok.' },
      { order: 3, instruction: 'Kuhati jabuke u sirupu 15-20 minuta dok ne omekšaju.' },
      { order: 4, instruction: 'Izvaditi jabuke i napuniti mljevenim orasima.' },
      { order: 5, instruction: 'Preliti sirupom i ohladiti.' },
      { order: 6, instruction: 'Poslužiti sa šlagom od slatkog vrhnja.' }
    ])
  },
  {
    slug: 'begova-corba',
    title: 'Begova čorba',
    lead: 'Kremasta pileća čorba s povrćem i okruglicama - jedno od najpoznatijih bosanskih jela.',
    imageId: '/recipes/begova-corba/hero.jpg',
    prepTime: 90,
    servings: 8,
    difficulty: 'MEDIUM',
    mealGroup: 'SOUP',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['juha', 'bosansko', 'tradicionalno', 'piletina']),
    ingredients: JSON.stringify([
      { name: 'Piletina', quantity: '1', unit: 'kg' },
      { name: 'Mrkva', quantity: '2', unit: 'kom' },
      { name: 'Celer', quantity: '1', unit: 'korijen' },
      { name: 'Krumpir', quantity: '3', unit: 'kom' },
      { name: 'Okra (bamija)', quantity: '200', unit: 'g' },
      { name: 'Kiselo vrhnje', quantity: '200', unit: 'g' },
      { name: 'Brašno', quantity: '2', unit: 'žlice' },
      { name: 'Jaje', quantity: '1', unit: 'kom' },
      { name: 'Peršin', quantity: '1', unit: 'svežanj' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Skuhati piletinu s mrkvom i celerom, dobiti bistru juhu.' },
      { order: 2, instruction: 'Izvaditi piletinu, ocijediti meso i narezati na komade.' },
      { order: 3, instruction: 'U juhu dodati narezani krumpir i okru, kuhati 20 minuta.' },
      { order: 4, instruction: 'Napraviti zapršku od brašna i dodati u juhu.' },
      { order: 5, instruction: 'Umutiti kiselo vrhnje s jajetom i polako dodati u juhu.' },
      { order: 6, instruction: 'Vratiti meso u juhu, začiniti i poslužiti s peršinom.' }
    ])
  },
  {
    slug: 'pita-zeljanica',
    title: 'Pita zeljanica',
    lead: 'Tradicionalna bosanska pita od tankih jufki punjena špinatom i sirom - savršena za sve prilike.',
    imageId: '/recipes/pita-zeljanica/hero.jpg',
    prepTime: 90,
    servings: 8,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['bosansko', 'vegetarijansko', 'pita', 'sir']),
    ingredients: JSON.stringify([
      { name: 'Jufke (gotove ili domaće)', quantity: '6', unit: 'kom' },
      { name: 'Špinat', quantity: '500', unit: 'g' },
      { name: 'Svježi sir', quantity: '400', unit: 'g' },
      { name: 'Feta sir', quantity: '200', unit: 'g' },
      { name: 'Jaja', quantity: '3', unit: 'kom' },
      { name: 'Ulje', quantity: '100', unit: 'ml' },
      { name: 'Jogurt', quantity: '200', unit: 'g' },
      { name: 'Sol', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Oprati i blanširati špinat, ocijediti i sitno nasjeckati.' },
      { order: 2, instruction: 'Pomiješati špinat sa svježim sirom, fetom i 2 jaja.' },
      { order: 3, instruction: 'Svaku jufku premazati uljem i staviti nadjev.' },
      { order: 4, instruction: 'Zamotati u rolice i slagati u nauljeni pleh u obliku spirale.' },
      { order: 5, instruction: 'Umutiti jogurt s jajima i preliti preko pite.' },
      { order: 6, instruction: 'Peći na 180°C oko 40 minuta dok ne porumeni.' }
    ])
  },
  {
    slug: 'raznjici',
    title: 'Ražnjići',
    lead: 'Sočni komadi junetine na štapiću, marinirani i pečeni na roštilju - omiljeno balkansko jelo.',
    imageId: '/recipes/raznjici/hero.jpg',
    prepTime: 40,
    servings: 4,
    difficulty: 'EASY',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'GRILLING',
    tags: JSON.stringify(['roštilj', 'meso', 'junece', 'brzo']),
    ingredients: JSON.stringify([
      { name: 'Juneci vrat', quantity: '600', unit: 'g' },
      { name: 'Luk', quantity: '1', unit: 'kom' },
      { name: 'Ulje', quantity: '3', unit: 'žlice' },
      { name: 'Crvena paprika', quantity: '1', unit: 'žličica' },
      { name: 'Češnjak', quantity: '3', unit: 'režnja' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Lepinje', quantity: '4', unit: 'kom' },
      { name: 'Ajvar', quantity: '100', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Narezati meso na kockice 3x3 cm.' },
      { order: 2, instruction: 'Marinirati meso u ulju, paprici, češnjaku i začinima minimalno 2 sata.' },
      { order: 3, instruction: 'Nataknuti meso na štapiće za ražnjiće.' },
      { order: 4, instruction: 'Peći na vrućem roštilju 10-15 minuta, okrećući povremeno.' },
      { order: 5, instruction: 'Poslužiti s lepinjama, ajvarom i nasjeckanim lukom.' }
    ])
  },
  {
    slug: 'bamija',
    title: 'Bamija s janjetinom',
    lead: 'Tradicionalno jelo od okre i janjetine u gustom umaku od rajčice - okusi Orijenta na vašem stolu.',
    imageId: '/recipes/bamija/hero.jpg',
    prepTime: 90,
    servings: 6,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['tradicionalno', 'janjetina', 'povrće', 'bosansko']),
    ingredients: JSON.stringify([
      { name: 'Janjetina', quantity: '500', unit: 'g' },
      { name: 'Bamija (okra)', quantity: '400', unit: 'g' },
      { name: 'Rajčice', quantity: '400', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Češnjak', quantity: '4', unit: 'režnja' },
      { name: 'Ulje', quantity: '4', unit: 'žlice' },
      { name: 'Limunov sok', quantity: '2', unit: 'žlice' },
      { name: 'Sol, papar, peršin', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Oprati bamiju i potopiti u vodu s limunovim sokom 30 minuta.' },
      { order: 2, instruction: 'Narezati janjetinu na komade i popržiti na ulju.' },
      { order: 3, instruction: 'Dodati narezani luk i češnjak, pirjati dok ne omekša.' },
      { order: 4, instruction: 'Dodati narezane rajčice i kuhati 20 minuta.' },
      { order: 5, instruction: 'Dodati ocijeđenu bamiju i kuhati još 30 minuta na laganoj vatri.' },
      { order: 6, instruction: 'Poslužiti vruće, posuto svježim peršinom.' }
    ])
  },
  {
    slug: 'japrak',
    title: 'Japrak',
    lead: 'Lisnati japrak od lišća vinove loze punjen rižom i mesom - ukus Mediterana i Balkana.',
    imageId: '/recipes/japrak/hero.jpg',
    prepTime: 120,
    servings: 6,
    difficulty: 'HARD',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['tradicionalno', 'meso', 'riža', 'mediteransko']),
    ingredients: JSON.stringify([
      { name: 'Lišće vinove loze', quantity: '50', unit: 'listova' },
      { name: 'Mljeveno meso', quantity: '400', unit: 'g' },
      { name: 'Riža', quantity: '150', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Peršin', quantity: '1', unit: 'svežanj' },
      { name: 'Menta', quantity: '1', unit: 'žlica' },
      { name: 'Limunov sok', quantity: '3', unit: 'žlice' },
      { name: 'Maslinovo ulje', quantity: '4', unit: 'žlice' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Blanširati listove vinove loze u kipućoj vodi 2 minute.' },
      { order: 2, instruction: 'Pomiješati meso, rižu, sitno nasjeckani luk, peršin i mentu.' },
      { order: 3, instruction: 'Začiniti nadjev soli, paprom i 1 žlicom limunovog soka.' },
      { order: 4, instruction: 'Na svaki list staviti žlicu nadijeva i zamotati čvrsto.' },
      { order: 5, instruction: 'Slagati u lonac, preliti vodom, uljem i limunovim sokom.' },
      { order: 6, instruction: 'Kuhati na laganoj vatri 60-70 minuta dok riža ne omekša.' }
    ])
  },
  {
    slug: 'hurmasice',
    title: 'Hurmašice',
    lead: 'Tradicionalni bosanski kolačići natopljeni slatkim sirupom - savršeni uz kafu.',
    imageId: '/recipes/hurmasice/hero.jpg',
    prepTime: 60,
    servings: 24,
    difficulty: 'MEDIUM',
    mealGroup: 'DESSERT',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['desert', 'bosansko', 'tradicionalno', 'kolači']),
    ingredients: JSON.stringify([
      { name: 'Brašno', quantity: '500', unit: 'g' },
      { name: 'Margarin', quantity: '250', unit: 'g' },
      { name: 'Jaja', quantity: '3', unit: 'kom' },
      { name: 'Šećer u prahu', quantity: '100', unit: 'g' },
      { name: 'Prašak za pecivo', quantity: '1', unit: 'vrećica' },
      { name: 'Šećer za sirup', quantity: '400', unit: 'g' },
      { name: 'Voda za sirup', quantity: '300', unit: 'ml' },
      { name: 'Limunov sok', quantity: '1', unit: 'žlica' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Umutiti margarin sa šećerom, dodati jaja jedno po jedno.' },
      { order: 2, instruction: 'Dodati brašno pomiješano s praškom za pecivo i zamijesiti meko tijesto.' },
      { order: 3, instruction: 'Oblikovati male valjčiće i poredati na pleh.' },
      { order: 4, instruction: 'Peći na 180°C oko 20-25 minuta dok ne porumene.' },
      { order: 5, instruction: 'Skuhati sirup od šećera, vode i limunovog soka.' },
      { order: 6, instruction: 'Vruće hurmašice preliti vrućim sirupom i ostaviti da upiju.' }
    ])
  },
  {
    slug: 'baklava',
    title: 'Baklava',
    lead: 'Slojevita baklava od tankih kora s orasima i sirupom - kraljica orijentalnih kolača.',
    imageId: '/recipes/baklava/hero.jpg',
    prepTime: 90,
    servings: 24,
    difficulty: 'HARD',
    mealGroup: 'DESSERT',
    prepMethod: 'BAKING',
    tags: JSON.stringify(['desert', 'orasi', 'tradicionalno', 'svečano']),
    ingredients: JSON.stringify([
      { name: 'Kore za baklave', quantity: '500', unit: 'g' },
      { name: 'Orasi (mljeveni)', quantity: '400', unit: 'g' },
      { name: 'Maslac (topljeni)', quantity: '250', unit: 'g' },
      { name: 'Šećer', quantity: '500', unit: 'g' },
      { name: 'Voda', quantity: '400', unit: 'ml' },
      { name: 'Limunov sok', quantity: '2', unit: 'žlice' },
      { name: 'Cimet', quantity: '1', unit: 'žličica' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Svaku koru premazati otopljenim maslacem.' },
      { order: 2, instruction: 'Slagati 5 kora, posuti mješavinom oraha i cimeta.' },
      { order: 3, instruction: 'Ponavljati slojeve dok se ne potroše sve kore.' },
      { order: 4, instruction: 'Izrezati na rombove i peći na 180°C oko 40 minuta.' },
      { order: 5, instruction: 'Skuhati sirup od šećera, vode i limunovog soka.' },
      { order: 6, instruction: 'Vruću baklavu preliti hladnim sirupom i ostaviti preko noći.' }
    ])
  },
  {
    slug: 'pilav',
    title: 'Pilav s janjetinom',
    lead: 'Mirisni pilav od riže s komadima janjetine i povrćem - jelo dostojno sultana.',
    imageId: '/recipes/pilav/hero.jpg',
    prepTime: 75,
    servings: 6,
    difficulty: 'MEDIUM',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['riža', 'janjetina', 'tradicionalno', 'orijentalno']),
    ingredients: JSON.stringify([
      { name: 'Riža (basmati)', quantity: '400', unit: 'g' },
      { name: 'Janjetina', quantity: '500', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Mrkva', quantity: '2', unit: 'kom' },
      { name: 'Maslac', quantity: '50', unit: 'g' },
      { name: 'Pileći temeljac', quantity: '600', unit: 'ml' },
      { name: 'Kumin', quantity: '1', unit: 'žličica' },
      { name: 'Kurkuma', quantity: '1/2', unit: 'žličice' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Bademi', quantity: '50', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Oprati rižu i namočiti u vodi 30 minuta.' },
      { order: 2, instruction: 'Popržiti janjetinu na maslacu dok ne porumeni.' },
      { order: 3, instruction: 'Dodati luk i mrkvu, pirjati 5 minuta.' },
      { order: 4, instruction: 'Dodati začine, ocijeđenu rižu i pržiti 2 minute.' },
      { order: 5, instruction: 'Preliti temeljcem, poklopiti i kuhati na laganoj vatri 20 minuta.' },
      { order: 6, instruction: 'Ostaviti poklopljeno 10 minuta, ukrašiti prženim bademima.' }
    ])
  },
  {
    slug: 'grah',
    title: 'Bosanski grah',
    lead: 'Gusti grah s suhim mesom i povrćem, tradicionalno jelo koje grije dušu.',
    imageId: '/recipes/grah/hero.jpg',
    prepTime: 180,
    servings: 8,
    difficulty: 'EASY',
    mealGroup: 'MAIN_DISH',
    prepMethod: 'COOKING',
    tags: JSON.stringify(['grah', 'tradicionalno', 'zimsko', 'meso']),
    ingredients: JSON.stringify([
      { name: 'Bijeli grah', quantity: '500', unit: 'g' },
      { name: 'Suha rebarca', quantity: '300', unit: 'g' },
      { name: 'Kobasica', quantity: '200', unit: 'g' },
      { name: 'Luk', quantity: '2', unit: 'kom' },
      { name: 'Mrkva', quantity: '2', unit: 'kom' },
      { name: 'Crvena paprika', quantity: '2', unit: 'žlice' },
      { name: 'Lovorov list', quantity: '2', unit: 'kom' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Ulje', quantity: '3', unit: 'žlice' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Namočiti grah preko noći u hladnoj vodi.' },
      { order: 2, instruction: 'Skuhati grah s rebrarcima u svježoj vodi dok ne omekša.' },
      { order: 3, instruction: 'Na ulju prodinstati luk i mrkvu, dodati papriku.' },
      { order: 4, instruction: 'Dodati zaprršku u grah zajedno s kobasicom i lovorovim listom.' },
      { order: 5, instruction: 'Kuhati još 30 minuta dok se sve ne sjedini.' },
      { order: 6, instruction: 'Poslužiti vruće sa svježim kruhom.' }
    ])
  },
  {
    slug: 'kajgana-sa-sirom',
    title: 'Kajgana sa sirom',
    lead: 'Puhasta kajgana sa svježim sirom i lukom - savršeni balkanski doručak koji daje energiju za cijeli dan.',
    imageId: '/recipes/kajgana/hero.jpg',
    prepTime: 15,
    servings: 2,
    difficulty: 'EASY',
    mealGroup: 'APPETIZER',
    prepMethod: 'FRYING',
    tags: JSON.stringify(['doručak', 'jaja', 'brzo', 'sir']),
    ingredients: JSON.stringify([
      { name: 'Jaja', quantity: '4', unit: 'kom' },
      { name: 'Svježi sir', quantity: '100', unit: 'g' },
      { name: 'Mladi luk', quantity: '2', unit: 'stabljike' },
      { name: 'Maslac', quantity: '30', unit: 'g' },
      { name: 'Mlijeko', quantity: '2', unit: 'žlice' },
      { name: 'Sol i papar', quantity: '', unit: 'po ukusu' },
      { name: 'Peršin', quantity: '1', unit: 'žlica' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Umutiti jaja s mlijekom, soli i paprom.' },
      { order: 2, instruction: 'Otopiti maslac u tavi na srednjoj vatri.' },
      { order: 3, instruction: 'Uliti jaja i miješati dok se ne počnu zgušnjavati.' },
      { order: 4, instruction: 'Dodati izmrvljeni svježi sir i nasjeckani luk.' },
      { order: 5, instruction: 'Lagano miješati dok jaja ne postanu puhasta ali još vlažna.' },
      { order: 6, instruction: 'Poslužiti odmah, posuto peršinom, uz svježi kruh.' }
    ])
  },
  {
    slug: 'ustipci',
    title: 'Ustipci',
    lead: 'Puhasti uštipci - tradicionalni balkanski prženi kruhići savršeni za doručak ili užinu.',
    imageId: '/recipes/ustipci/hero.jpg',
    prepTime: 45,
    servings: 6,
    difficulty: 'EASY',
    mealGroup: 'BREAD',
    prepMethod: 'FRYING',
    tags: JSON.stringify(['doručak', 'kruh', 'tradicionalno', 'brzo']),
    ingredients: JSON.stringify([
      { name: 'Brašno', quantity: '500', unit: 'g' },
      { name: 'Kvasac', quantity: '7', unit: 'g' },
      { name: 'Topla voda', quantity: '300', unit: 'ml' },
      { name: 'Sol', quantity: '1', unit: 'žličica' },
      { name: 'Šećer', quantity: '1', unit: 'žličica' },
      { name: 'Ulje za prženje', quantity: '500', unit: 'ml' },
      { name: 'Kajmak', quantity: '200', unit: 'g' }
    ]),
    steps: JSON.stringify([
      { order: 1, instruction: 'Otopiti kvasac u toploj vodi sa šećerom, ostaviti 10 minuta.' },
      { order: 2, instruction: 'Pomiješati brašno i sol, dodati aktivirani kvasac.' },
      { order: 3, instruction: 'Zamijesiti meko, ljepljivo tijesto i ostaviti da naraste 30 minuta.' },
      { order: 4, instruction: 'Zagrijati ulje za duboko prženje.' },
      { order: 5, instruction: 'Mokrim rukama uzimati komade tijesta i pržiti dok ne porumene.' },
      { order: 6, instruction: 'Cijediti na papirnatom ubrusu i poslužiti vruće s kajmakom.' }
    ])
  }
]

async function main() {
  console.log('🌱 Seeding database...')
  
  // Delete existing recipes to ensure fresh data with correct imageId paths
  const existingCount = await prisma.recipe.count()
  if (existingCount > 0) {
    console.log(`  🗑️ Clearing ${existingCount} existing recipes...`)
    await prisma.recipe.deleteMany()
  }
  
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: { slug: recipe.slug },
      update: recipe,
      create: recipe
    })
    console.log(`  ✓ ${recipe.title}`)
  }
  
  console.log(`\n✅ Seeding complete! ${recipes.length} recipes added.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
