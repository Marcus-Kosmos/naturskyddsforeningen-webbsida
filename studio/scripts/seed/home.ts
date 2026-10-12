import {createOnce, ensureDocument, keyFrom, unsplash, uploadImage, uploadPublicImage, type SeedContext} from './lib'

// The homepage sections as they used to be hardcoded in the frontend, as blocks.
//
// A few deliberate differences from the old hardcoded page:
//  - numbers that the site used to contradict itself on are fact tags ({{members}} and so on)
//  - buttons that pointed nowhere ("#nara-dig") now point at a real page or section, or are left out
//  - carousels that repeated the same photo, or showed a photo that didn't match its caption, use fewer, matching slides

type Obj = Record<string, unknown>

const internal = (path: string) => ({_type: 'link', linkType: 'internal', path})
const action = {_type: 'link', linkType: 'action', action: 'openAssociations'}

function cta(label: string, link: Obj, style: 'primary' | 'secondary' | 'text') {
  return {_type: 'blockCta', _key: keyFrom(label), label, link, style}
}

function items(list: Array<{icon?: string; title?: string; text?: string}>) {
  return list.map((item, index) => ({_type: 'featureItem', _key: keyFrom(item.title ?? item.text ?? 'punkt', index), ...item}))
}

const PHOTOS = {
  fox: unsplash('photo-1641119580222-3e90f9a11287'),
  forest: unsplash('photo-1669399201888-ceaa45b683ee'),
  meadow: unsplash('photo-1686333330383-be7ba34e9fb8'),
  glacier: unsplash('photo-1549598685-0058b114c9d6'),
  industry: unsplash('photo-1516937941344-00b4e0337589'),
  shopping: unsplash('photo-1582803824122-f25becf36ad8'),
  spices: unsplash('photo-1759141936083-d10203b4d4f6'),
  protest: unsplash('photo-1552799446-159ba9523315'),
  volunteers: unsplash('photo-1758599668178-d9716bbda9d5'),
  hiking: unsplash('photo-1683044414176-0e0d42b6fddf'),
}

export async function seedHome(ctx: SeedContext) {
  const existing = await ctx.client.getDocument('homePage')
  const hasSections = Array.isArray(existing?.sections) && existing.sections.length > 0

  // Upload only when the sections are actually going to be written.
  const upload = async (url: string, alt: string, caption?: string) => ({
    ...(await uploadImage(ctx, url, {alt, ...(caption ? {caption} : {})})),
    _type: 'captionedImage',
    _key: keyFrom(alt),
  })
  const local = async (path: string, alt: string) => {
    const image = await uploadPublicImage(ctx, path, {alt})
    return image ? {...image, _key: keyFrom(alt)} : undefined
  }

  let sections: Obj[] = []
  if (!hasSections && !ctx.dryRun) {
    sections = [
      // 1. Shortcuts
      {
        _type: 'cardGridSection',
        _key: 'genvagar',
        variant: 'icons',
        background: 'soft',
        cards: [
          {_type: 'card', _key: 'klimat-natur', icon: 'leaf', tone: 'green', title: 'Klimat & natur', text: 'Vi kämpar för att stoppa klimatkrisen och bevara biologisk mångfald.', link: internal('/klimat')},
          {_type: 'card', _key: 'engagemang', icon: 'users', tone: 'neutral', title: 'Engagemang', text: 'Anslut dig till våra lokalföreningar och gör skillnad i ditt närområde.', link: internal('/engagera-dig')},
          {_type: 'card', _key: 'hallbarhet', icon: 'heart', tone: 'neutral', title: 'Hållbarhet', text: 'Lär dig om hållbar konsumtion och hur du kan leva mer miljövänligt.', link: internal('/hallbar-konsumtion')},
          {_type: 'card', _key: 'globalt-arbete', icon: 'globe', tone: 'green', title: 'Globalt arbete', text: 'Vårt arbete sträcker sig över gränser för en hållbar planet.'},
        ],
      },

      // 2. Biodiversity
      {
        _type: 'featureSection',
        _key: 'biologisk-mangfald',
        anchor: 'biologisk-mangfald',
        layout: 'split',
        mediaSide: 'right',
        background: 'white',
        heading: 'Biologisk mångfald',
        body: 'Sveriges natur är hem åt tusentals arter. Men många är hotade på grund av habitatförlust, klimatförändringar och mänsklig påverkan. Vi arbetar för att skydda den biologiska mångfalden och säkerställa att kommande generationer får uppleva en levande natur.',
        itemsStyle: 'list',
        items: items([
          {icon: 'trees', title: 'Skydda skogen', text: 'Vi kämpar för att bevara gamla skogar och stoppa avverkning av värdefull natur.'},
          {icon: 'mountain', title: 'Fjällnära områden', text: 'Arbete för att säkerställa att fjällområden och deras unika djurliv bevaras för kommande generationer.'},
          {icon: 'bird', title: 'Hotade arter', text: 'Kampanjer för att skydda hotade arter och deras livsmiljöer över hela Sverige.'},
        ]),
        links: [cta('Läs mer om vårt naturskyddsarbete', internal('/biologisk-mangfald'), 'text')],
        showShare: true,
        images: [
          await upload(PHOTOS.fox, 'Fjällräv i svensk fjällnatur', 'Fjällräven är en av Sveriges mest hotade arter'),
          await upload(PHOTOS.forest, 'Skog och sjöar i svensk natur', 'Vi arbetar för att bevara skogar och vattendrag för kommande generationer'),
          await upload(PHOTOS.meadow, 'Vilda blommor längs vägkant', 'Bevarande av pollinatörer och vilda växter är avgörande för den biologiska mångfalden'),
        ],
      },

      // 3. Climate
      {
        _type: 'featureSection',
        _key: 'klimat',
        anchor: 'klimat',
        layout: 'stacked',
        background: 'muted',
        eyebrow: 'Klimatkris',
        heading: 'Klimatet kräver akuta åtgärder',
        body: 'Klimatförändringarna är vår tids största utmaning. Glaciärer smälter, havsytan stiger och extremväder blir vanligare. Men det finns hopp – om vi agerar nu.',
        images: [
          await upload(PHOTOS.glacier, 'Smältande glaciär', 'Glaciärer världen över smälter i alarmande takt'),
          await upload(PHOTOS.industry, 'Industrianläggning vid vattendrag', 'Industrins klimatpåverkan kräver omställning till hållbara lösningar'),
        ],
        stats: [
          {_type: 'stat', _key: 'temperatur', value: '+1.2°C', label: 'Temperaturökning i Sverige sedan 1900'},
          {_type: 'stat', _key: 'mal-2030', value: '2030', label: 'Målet: Minska utsläppen med 63%'},
          {_type: 'stat', _key: 'arktis', value: '80%', label: 'Av isarna i Arktis har smält sedan 1979'},
        ],
        itemsHeading: 'Vårt klimatarbete',
        items: items([
          {icon: 'thermometer', title: 'Påverka politiker', text: 'Vi driver klimatfrågan i riksdag, EU och globalt.'},
          {icon: 'wind', title: 'Förnybar energi', text: 'Kämpar för 100% förnybar el och hållbara transporter.'},
          {icon: 'droplets', title: 'Granska företag', text: 'Håller företag ansvariga för sina klimatutsläpp.'},
        ]),
        links: [cta('Läs mer om vårt klimatarbete', internal('/klimat'), 'text')],
        showShare: true,
      },

      // 4. Sustainable consumption
      {
        _type: 'featureSection',
        _key: 'hallbar-konsumtion',
        anchor: 'hallbar-konsumtion',
        layout: 'split',
        mediaSide: 'left',
        background: 'white',
        eyebrow: 'Hållbar konsumtion',
        heading: 'Smartare val för en bättre framtid',
        body: 'Våra konsumtionsval påverkar klimatet, naturen och människors liv över hela världen. Genom att konsumera smartare kan vi göra verklig skillnad.',
        itemsStyle: 'list',
        items: items([
          {icon: 'shopping-bag', title: 'Välj hållbart', text: 'Köp secondhand, laga och ta hand om det du har. Kvalitet över kvantitet.'},
          {icon: 'lightbulb', title: 'Tänk långsiktigt', text: 'Välj produkter som håller längre och kan repareras. Bra för plånbok och miljö.'},
          {icon: 'recycle', title: 'Cirkulär ekonomi', text: 'Stöd företag som arbetar med återvinning och hållbara material.'},
        ]),
        links: [cta('Läs mer om hållbar konsumtion', internal('/hallbar-konsumtion'), 'text')],
        images: [await upload(PHOTOS.shopping, 'Hållbar konsumtion')],
      },

      // 5. Bra Miljöval
      {
        _type: 'featureSection',
        _key: 'bra-miljoval',
        anchor: 'bra-miljoval',
        layout: 'split',
        mediaSide: 'right',
        mediaFirstOnMobile: true,
        background: 'muted',
        eyebrowIcon: 'leaf',
        eyebrow: 'Bra Miljöval',
        heading: 'Välj rätt – enkelt och säkert',
        body: 'Bra Miljöval är Naturskyddsföreningens miljömärkning som hjälper dig att göra bättre val i butiken. Märkningen finns på allt från mat och kläder till rengöringsprodukter och papper.',
        itemsStyle: 'cards',
        items: items([
          {icon: 'award', title: 'Certifierade produkter', text: 'Över {{braMiljovalProducts}} produkter som uppfyller höga miljökrav.'},
          {icon: 'leaf', title: 'Hållbart jordbruk', text: 'Ekologiska livsmedel som är bra för både dig och planeten.'},
          {icon: 'shield-check', title: 'Offentlig kontroll', text: 'Oberoende granskare säkerställer att märkningen hålls.'},
        ]),
        links: [cta('Läs om kriterierna', internal('/#markningsguide'), 'secondary')],
        showShare: true,
        images: [await upload(PHOTOS.spices, 'Ekologiska kryddor och ingredienser', 'Ekologiska ingredienser är bättre för miljön')],
      },

      // 6. Label guide
      {
        _type: 'labelGuideSection',
        _key: 'markningsguide',
        anchor: 'markningsguide',
        background: 'white',
        eyebrow: 'Märkningsguide',
        heading: 'Navigera bland miljömärkningarna',
        body: 'Det finns hundratals miljömärkningar. Vi har granskat dem och visar vilka du kan lita på.',
        infoHeading: 'Hur använder jag guiden?',
        infoItems: [
          {_type: 'labelInfoItem', _key: 'rekommenderade', status: 'recommended', label: 'Rekommenderade', text: 'Märkningar som uppfyller höga miljökrav'},
          {_type: 'labelInfoItem', _key: 'begransningar', status: 'limited', label: 'Med begränsningar', text: 'Märkningar som är bättre än inget men har vissa brister'},
          {_type: 'labelInfoItem', _key: 'otillrackliga', status: 'insufficient', label: 'Inte tillräckliga', text: 'Märkningar som inte lever upp till miljökrav'},
        ],
      },

      // 7. Engagement
      {
        _type: 'featureSection',
        _key: 'engagemang',
        anchor: 'engagemang',
        layout: 'split',
        mediaSide: 'right',
        background: 'white',
        eyebrow: 'Engagemang',
        heading: 'Tillsammans är vi starkare',
        body: 'Vår styrka ligger i våra medlemmar. Från skolelever till pensionärer, från stadsbor till landsbygdsboende – alla kan bidra till en bättre miljö. Oavsett om du vill vara aktiv i en lokalförening, delta i kampanjer, eller bara hålla dig uppdaterad, finns det en plats för dig hos oss.',
        itemsStyle: 'tiles',
        items: items([
          {icon: 'users', title: 'Lokalföreningar', text: 'Över {{localAssociations}} lokalföreningar runt om i Sverige där du kan göra konkret skillnad.'},
          {icon: 'target', title: 'Kampanjer', text: 'Delta i våra kampanjer för att påverka beslutsfattare och skydda naturen.'},
          {icon: 'message-circle', title: 'Nätverk', text: 'Anslut dig till tematiska nätverk och träffa andra engagerade medlemmar.'},
          {icon: 'heart', title: 'Volontärarbete', text: 'Bidra med din tid och kompetens i vårt arbete för miljön.'},
        ]),
        links: [cta('Hitta din lokalförening', action, 'primary')],
        images: [
          await upload(PHOTOS.protest, 'Aktivister som demonstrerar för klimaträttvisa', 'Tillsammans kämpar vi för klimaträttvisa och en hållbar framtid'),
          await upload(PHOTOS.volunteers, 'Volontärer som inventerar biologisk mångfald', 'Engagerade medlemmar gör skillnad varje dag'),
        ],
      },

      // 8. Local activities
      {
        _type: 'featureSection',
        _key: 'nara-dig',
        anchor: 'nara-dig',
        layout: 'split',
        mediaSide: 'left',
        background: 'white',
        eyebrow: 'Nära dig',
        heading: 'Upptäck naturen tillsammans',
        body: 'Våra {{localAssociations}}+ lokalföreningar arrangerar aktiviteter för alla åldrar – från naturvandringar och fågelinventeringar till workshops och föreläsningar. Oavsett var i Sverige du bor finns det möjligheter att engagera dig lokalt.',
        showEvents: true,
        eventsHeading: 'Kommande aktiviteter',
        links: [
          cta('Se alla aktiviteter', internal('/#kalender'), 'primary'),
          cta('Hitta din lokalförening', action, 'secondary'),
        ],
        images: [
          await upload(PHOTOS.hiking, 'Vintervandring i snötäckt skog', 'Våra lokalföreningar arrangerar aktiviteter året runt'),
          await upload(PHOTOS.forest, 'Vinterskog med snötäckta träd', 'Upptäck naturen tillsammans med engagerade naturvänner'),
        ],
      },

      // 9. Impact in numbers
      {
        _type: 'statsSection',
        _key: 'vart-arbete',
        anchor: 'vart-arbete',
        background: 'plain',
        heading: 'Vår påverkan',
        body: 'Tillsammans gör vi skillnad för naturen och klimatet. Här är några resultat av vårt arbete.',
        stats: [
          {_type: 'impactStat', _key: 'medlemmar', icon: 'users', value: '{{members}}', label: 'Medlemmar', description: 'Sveriges största miljöorganisation'},
          {_type: 'impactStat', _key: 'skyddade-omraden', icon: 'shield', value: '350+', label: 'Skyddade områden', description: 'Nationalparker och naturreservat'},
          {_type: 'impactStat', _key: 'hektar', icon: 'tree-pine', value: '45 000', label: 'Hektar natur', description: 'Bevarad för kommande generationer'},
          {_type: 'impactStat', _key: 'ar', icon: 'calendar', value: '{{years}}', label: 'År av arbete', description: 'Sedan 1909'},
        ],
      },

      // 10. Magazine
      {
        _type: 'featureSection',
        _key: 'sveriges-natur',
        anchor: 'sveriges-natur',
        layout: 'split',
        mediaSide: 'right',
        background: 'muted',
        eyebrowImage: await local('images/logos/sveriges-natur-dark.png', 'Sveriges Natur'),
        heading: 'Medlemstidningen med reportage som gör skillnad',
        body: 'Som medlem får du Sveriges Natur, Skandinaviens ledande miljötidskrift, hem i brevlådan {{magazineIssues}} gånger per år. Djupgående reportage, vackra naturbilder och inspirerande berättelser om människor som gör skillnad.',
        itemsStyle: 'bullets',
        items: items([
          {text: 'Granskande journalistik om klimat, natur och miljö'},
          {text: 'Naturfoto i världsklass från svenska och internationella fotografer'},
          {text: 'Tips och guider för ett mer hållbart liv'},
        ]),
        links: [cta('Bli medlem', internal('/bli-medlem'), 'primary')],
        images: [await local('images/magazine/magazine-cover.png', 'Sveriges Natur tidningar')].filter(Boolean),
      },

      // 11. Partners
      {
        _type: 'cardGridSection',
        _key: 'samarbeten',
        anchor: 'samarbeten',
        variant: 'logos',
        background: 'muted',
        eyebrow: 'Samarbeten',
        heading: 'Tillsammans för naturen',
        body: 'Vi samarbetar med andra organisationer för att stärka naturskyddsarbetet i Sverige och globalt.',
        cards: [
          {
            _type: 'card',
            _key: 'sveriges-natur',
            title: 'Sveriges Natur',
            text: 'Vår medlemstidning som når ut till hundratusentals läsare varje månad.',
            logoLight: await local('images/logos/sveriges-natur-light.png', 'Sveriges Natur'),
            logoDark: await local('images/logos/sveriges-natur-dark.png', 'Sveriges Natur'),
            linkLabel: 'Läs mer',
          },
          {
            _type: 'card',
            _key: 'faltbiologerna',
            title: 'Fältbiologerna',
            text: 'Ungdomsorganisation som arbetar för naturskydd och biologisk mångfald.',
            logoLight: await local('images/logos/faltbiologerna-light.png', 'Fältbiologerna'),
            logoDark: await local('images/logos/faltbiologerna-dark.png', 'Fältbiologerna'),
            linkLabel: 'Läs mer',
          },
        ],
      },

      // 12. News and calendar
      {
        _type: 'newsEventsSection',
        _key: 'kalender',
        anchor: 'kalender',
        background: 'white',
        newsHeading: 'Just nu',
        newsLink: cta('Se alla', internal('/nyheter'), 'text'),
        newsCount: 3,
        eventsHeading: 'Kalendarium',
        eventsCount: 3,
      },
    ]
  }

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    heroPrimaryLink: internal('/bli-medlem'),
    heroSecondaryLink: internal('/om-foreningen'),
    seo: {
      _type: 'object',
      metaDescription:
        'Naturskyddsföreningen är Sveriges största miljöorganisation. Läs om vårt arbete för klimatet och naturen, och bli medlem.',
    },
    ...(sections.length > 0 || ctx.dryRun ? {sections} : {}),
  }
  const result = await ensureDocument(ctx, homePage)
  console.log(`  homePage: ${result}${hasSections ? ' (sections already present, left untouched)' : ''}`)

  // Activities arranged by local associations, for the "Nära dig" section.
  const day = 24 * 60 * 60 * 1000
  const localEvents = [
    {slug: 'vintervandring-i-tyresta', title: 'Vintervandring i Tyresta', daysFromNow: 5, hour: 10, location: 'Stockholm', type: 'Utflykt'},
    {slug: 'klimatworkshop-i-goteborg', title: 'Klimatworkshop', daysFromNow: 8, hour: 17, location: 'Göteborg', type: 'Workshop'},
    {slug: 'fagelinventering-i-malmo', title: 'Fågelinventering', daysFromNow: 11, hour: 8, location: 'Malmö', type: 'Inventering'},
  ]
  for (const event of localEvents) {
    const start = new Date(Date.now() + event.daysFromNow * day)
    start.setUTCHours(event.hour, 0, 0, 0)
    const status = await createOnce(ctx, `event-${event.slug}`, () => ({
      _id: `event-${event.slug}`,
      _type: 'event',
      title: event.title,
      startDate: start.toISOString(),
      location: event.location,
      type: event.type,
      local: true,
    }))
    console.log(`  event-${event.slug}: ${status}`)
  }
}
