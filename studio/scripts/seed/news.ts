import {createOnce, keyMaker, unsplash, uploadImage, type SeedContext} from './lib'

// Illustrative demo articles. The headlines and ingresses are the ones the news
// page used to hardcode; the bodies are short placeholders for editors to replace.

const AUTHOR_ID = 'author-redaktionen'

const IMAGES = {
  fox: unsplash('photo-1641119580222-3e90f9a11287'),
  industry: unsplash('photo-1516937941344-00b4e0337589'),
  forest: unsplash('photo-1669399201888-ceaa45b683ee'),
  sea: unsplash('photo-1440020143730-090579c4d53c'),
  cleanup: unsplash('photo-1758599668178-d9716bbda9d5'),
  meadow: unsplash('photo-1686333330383-be7ba34e9fb8'),
}

type Body = Array<Record<string, unknown>>

function builder(slug: string) {
  const key = keyMaker(slug)
  const span = (text: string, marks: string[] = []) => ({_type: 'span', _key: key(), text, marks})
  const block = (text: string, style = 'normal') => ({
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [span(text)],
  })
  const bullet = (text: string) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [span(text)],
  })
  const callout = (heading: string, text: string) => ({_type: 'callout', _key: key(), heading, text})
  /** A paragraph where `linkText` links to `href`. */
  const withLink = (before: string, linkText: string, href: string, after: string) => {
    const markKey = key()
    return {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [{_type: 'link', _key: markKey, href, blank: false}],
      children: [span(before), span(linkText, [markKey]), span(after)],
    }
  }
  return {block, bullet, callout, withLink, h2: (t: string) => block(t, 'h2')}
}

interface ArticleSeed {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  featured: boolean
  image: string
  alt: string
  body: () => Body
}

const ARTICLES: ArticleSeed[] = [
  {
    slug: 'ny-rapport-fjallraven-hotas-av-varmare-vintrar',
    title: 'Ny rapport: Fjällräven hotas av varmare vintrar',
    excerpt:
      'En ny studie visar att fjällrävens reproduktion minskar kraftigt i takt med att snötäcket krymper. Naturskyddsföreningen kräver åtgärder.',
    category: 'Biologisk mångfald',
    publishedAt: '2026-03-24T08:00:00Z',
    featured: true,
    image: IMAGES.fox,
    alt: 'En vit fjällräv springer mot kameran i snön',
    body: () => {
      const b = builder('fjallraven')
      return [
        b.block('Fjällräven är en av Sveriges mest hotade däggdjursarter, och dess framtid hänger nära ihop med vinterns snö. Nu visar en ny studie att situationen försämras när vintrarna blir varmare.'),
        b.block('Snötäcket skyddar de bon där fjällrävens valpar föds upp, och det påverkar också tillgången på byten. När snön ligger kortare tid på året minskar förutsättningarna för att få fram nya kullar.'),
        b.h2('Vad kräver Naturskyddsföreningen?'),
        b.bullet('Kraftfulla utsläppsminskningar, så att klimatförändringarna bromsas.'),
        b.bullet('Fortsatta insatser för att skydda fjällräven och dess livsmiljöer.'),
        b.bullet('Ett starkare skydd av känsliga fjällmiljöer mot slitage och exploatering.'),
        b.callout('Fakta: fjällräv', 'Fjällräven lever i fjällen ovanför trädgränsen och är väl anpassad för kyla och snö. I Sverige finns den kvar i en liten, utsatt stam.'),
      ]
    },
  },
  {
    slug: 'sverige-missar-klimatmalen-vi-kraver-krafttag',
    title: 'Sverige missar klimatmålen – vi kräver krafttag',
    excerpt:
      'Naturvårdsverkets senaste rapport visar att utsläppen inte minskar i den takt som krävs. Föreningen uppmanar regeringen att agera nu.',
    category: 'Klimat',
    publishedAt: '2026-03-20T08:00:00Z',
    featured: true,
    image: IMAGES.industry,
    alt: 'Industrianläggning med rykande skorstenar under en mulen himmel',
    body: () => {
      const b = builder('klimatmalen')
      return [
        b.block('Utsläppen i Sverige minskar, men inte i den takt som krävs för att nå de klimatmål som riksdagen har beslutat om. Det visar Naturvårdsverkets senaste rapport.'),
        b.block('Naturskyddsföreningen uppmanar regeringen att agera nu. Varje år utan tillräckliga åtgärder gör omställningen svårare och dyrare, och det är framtida generationer som får bära konsekvenserna.'),
        b.h2('Så kan utsläppen minska snabbare'),
        b.bullet('Gör det enklare och billigare att resa och transportera utan fossila bränslen.'),
        b.bullet('Fasa ut fossila bränslen i industrin med tydliga och långsiktiga spelregler.'),
        b.bullet('Bygg ut förnybar energi och satsa på energieffektivisering.'),
        b.withLink('Du kan också bidra: ', 'bli medlem', '/bli-medlem', ' och var med och driva på för ett klimatpolitiskt krafttag.'),
      ]
    },
  },
  {
    slug: 'seger-i-ratten-skyddsvard-skog-raddad-i-dalarna',
    title: 'Seger i rätten: Skyddsvärd skog räddad i Dalarna',
    excerpt:
      'Efter ett långt juridiskt arbete har Mark- och miljödomstolen stoppat avverkning av 40 hektar gammalskog i Dalarna.',
    category: 'Skog',
    publishedAt: '2026-03-15T08:00:00Z',
    featured: false,
    image: IMAGES.forest,
    alt: 'En väg genom snötäckt barrskog',
    body: () => {
      const b = builder('dalarna')
      return [
        b.block('Efter ett långt juridiskt arbete har Mark- och miljödomstolen stoppat avverkning av 40 hektar gammalskog i Dalarna. Beskedet är en viktig seger för skogens natur.'),
        b.block('Gammal skog är hem åt många arter som är beroende av död ved, gamla träd och en lång, obruten skogshistoria. När sådana miljöer försvinner är de svåra att ersätta.'),
        b.h2('Därför spelar domen roll'),
        b.block('Domen visar att skyddsvärd skog kan försvaras med lagens hjälp, och att det lönar sig att granska planerade avverkningar. Föreningen fortsätter bevaka skogens värden över hela landet.'),
        b.callout('Fakta: gammal skog', 'Skogar som fått växa i lång tid utan större ingrepp har ofta en särskilt rik mångfald av lavar, svampar, insekter och fåglar.'),
      ]
    },
  },
  {
    slug: 'ostersjon-nya-data-visar-forbattrad-syresituation',
    title: 'Östersjön: Nya data visar förbättrad syresituation',
    excerpt:
      'Trots utmaningarna visar årets mätningar att syresättningen i delar av Östersjön har förbättrats. Men läget är fortfarande allvarligt.',
    category: 'Hav och vatten',
    publishedAt: '2026-03-12T08:00:00Z',
    featured: false,
    image: IMAGES.sea,
    alt: 'Solljus silar ner under vattenytan i havet',
    body: () => {
      const b = builder('ostersjon')
      return [
        b.block('Årets mätningar visar att syresättningen har förbättrats i delar av Östersjön. Det är glädjande, men läget är fortfarande allvarligt och förbättringen kan inte tas för given.'),
        b.block('Östersjön är ett känsligt innanhav som påverkas starkt av näringsämnen från land. Minskade utsläpp av kväve och fosfor är avgörande för att havets bottnar ska kunna återhämta sig.'),
        b.callout('Fakta: syrebrist', 'När för mycket näring når havet växer algerna till. När de bryts ner förbrukas syre, och bottnarna kan bli helt utan syre. Då försvinner bottenlevande djur.'),
        b.block('Naturskyddsföreningen fortsätter att kräva minskade utsläpp från jordbruk, avlopp och industri.'),
      ]
    },
  },
  {
    slug: 'kampanj-minska-plast-i-naturen',
    title: 'Kampanj: Minska plast i naturen',
    excerpt:
      'Vår nya kampanj samlar frivilliga runt om i Sverige för att städa naturområden och påverka politiker att skärpa plastlagstiftningen.',
    category: 'Kampanj',
    publishedAt: '2026-03-08T08:00:00Z',
    featured: false,
    image: IMAGES.cleanup,
    alt: 'Frivilliga plockar skräp i en skog',
    body: () => {
      const b = builder('plastkampanj')
      return [
        b.block('Vår nya kampanj samlar frivilliga runt om i Sverige för att städa naturområden. Samtidigt vill vi påverka politikerna att skärpa lagstiftningen, så att mindre plast hamnar i naturen från början.'),
        b.block('Att plocka skräp gör skillnad på platsen, men för att lösa problemet i grunden behövs bättre regler för tillverkning, användning och återvinning av plast.'),
        b.withLink('Vill du vara med? Läs mer om hur du kan ', 'engagera dig', '/engagera-dig', ' i en lokalförening eller kampanj nära dig.'),
      ]
    },
  },
  {
    slug: 'riksdagen-rostar-om-naturvardsbudgeten',
    title: 'Riksdagen röstar om naturvårdsbudgeten',
    excerpt:
      'I veckan behandlar riksdagen ett motionspaket om naturvård. Vi uppmanar ledamöterna att prioritera natur framför kortsiktiga ekonomiska intressen.',
    category: 'Politik',
    publishedAt: '2026-03-05T08:00:00Z',
    featured: false,
    image: IMAGES.meadow,
    alt: 'En blommande äng med vilda blommor',
    body: () => {
      const b = builder('naturvardsbudget')
      return [
        b.block('I veckan behandlar riksdagen ett motionspaket om naturvård. Naturskyddsföreningen uppmanar ledamöterna att prioritera natur framför kortsiktiga ekonomiska intressen.'),
        b.h2('Därför spelar anslagen roll'),
        b.block('Skydd av värdefull natur, skötsel av skyddade områden och återställning av skadade miljöer kräver långsiktig och förutsägbar finansiering. Utan det blir målen om en rik natur svåra att nå.'),
        b.block('Vi följer omröstningen och återkommer med en sammanfattning av utfallet.'),
      ]
    },
  },
]

interface EventSeed {
  slug: string
  title: string
  daysFromNow: number
  hour: number
  location: string
  type: string
  local: boolean
}

const EVENTS: EventSeed[] = [
  {slug: 'naturfotografering-i-tyresta', title: 'Naturfotografering i Tyresta', daysFromNow: 9, hour: 9, location: 'Stockholm', type: 'Utflykt', local: true},
  {slug: 'webbinarium-hallbar-konsumtion', title: 'Webbinarium: Hållbar konsumtion', daysFromNow: 14, hour: 18, location: 'Online', type: 'Webbinarium', local: false},
  {slug: 'vintervandring-i-abisko', title: 'Vintervandring i Abisko', daysFromNow: 21, hour: 10, location: 'Norrbotten', type: 'Utflykt', local: true},
]

export async function seedNews(ctx: SeedContext) {
  const out: string[] = []

  out.push(
    `author: ${await createOnce(ctx, AUTHOR_ID, () => ({
      _id: AUTHOR_ID,
      _type: 'author',
      name: 'Naturskyddsföreningens redaktion',
      role: 'Redaktion',
    }))}`,
  )

  for (const a of ARTICLES) {
    const id = `article-${a.slug}`
    const result = await createOnce(ctx, id, async () => ({
      _id: id,
      _type: 'article',
      title: a.title,
      slug: {_type: 'slug', current: a.slug},
      author: {_type: 'reference', _ref: AUTHOR_ID},
      excerpt: a.excerpt,
      category: a.category,
      featured: a.featured,
      publishedAt: a.publishedAt,
      mainImage: await uploadImage(ctx, a.image, {alt: a.alt}),
      body: a.body(),
    }))
    out.push(`${a.slug}: ${result}`)
  }

  const now = Date.now()
  for (const e of EVENTS) {
    const start = new Date(now + e.daysFromNow * 86_400_000)
    start.setUTCHours(e.hour, 0, 0, 0)
    const id = `event-${e.slug}`
    out.push(
      `${e.slug}: ${await createOnce(ctx, id, () => ({
        _id: id,
        _type: 'event',
        title: e.title,
        startDate: start.toISOString(),
        location: e.location,
        type: e.type,
        local: e.local,
      }))}`,
    )
  }

  out.forEach((line) => console.log('  ' + line))
}
