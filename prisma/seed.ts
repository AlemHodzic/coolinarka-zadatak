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
  }
]

async function main() {
  // Check if database already has recipes (skip seeding on subsequent builds)
  const existingCount = await prisma.recipe.count()
  if (existingCount > 0) {
    console.log(`✅ Database already has ${existingCount} recipes. Skipping seed.`)
    return
  }

  console.log('🌱 Seeding database...')
  
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: { slug: recipe.slug },
      update: recipe,
      create: recipe
    })
    console.log(`  ✓ ${recipe.title}`)
  }
  
  console.log('\n✅ Seeding complete! 8 recipes added.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
