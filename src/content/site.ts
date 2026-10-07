// Typed defaults for the global site chrome. They mirror what the seed script
// writes to Sanity, so the site looks the same before and after seeding and
// still renders if the CMS is unreachable.
//
// Keep this file free of React/DOM imports: studio/scripts/seed imports it.
import type { Navigation, SiteSettings } from '../lib/cms/types'

const internal = (path: string) => ({ linkType: 'internal' as const, path })

export const SITE_DEFAULTS: SiteSettings = {
  tagline: 'Sveriges största miljöorganisation sedan 1909.',
  contactEmail: 'info@naturskyddsforeningen.se',
  contactPhone: '08-702 65 00',
  contactAddressLine1: 'Box 4625',
  contactAddressLine2: '116 91 Stockholm',

  // Placeholder values: the site used to contradict itself (members 250 000 /
  // 226 000 / 200 000+, associations 300 / 270+, issues 10 / 4). Confirm in Studio.
  facts: {
    members: '226 000',
    localAssociations: '270',
    foundedYear: 1909,
    braMiljovalProducts: '6 000',
    magazineIssuesPerYear: 4,
  },

  membershipCta: {
    heading: 'Bli medlem idag',
    text: 'Som medlem stödjer du vårt arbete för en levande natur och hållbar framtid. Tillsammans är vi starkare.',
    benefits: [
      'Tidningen Sveriges Natur – {{magazineIssues}} nummer/år',
      'Tillgång till alla lokalföreningar',
      'Rabatt på Bra Miljöval-produkter',
      'Delta i våra nätverk och kampanjer',
    ],
    primaryCta: { label: 'Bli medlem', link: internal('/bli-medlem') },
    secondaryCta: { label: 'Läs mer om medlemskapet', link: internal('/bli-medlem') },
    stats: [
      { value: '{{members}}', label: 'Medlemmar' },
      { value: '{{localAssociations}}+', label: 'Lokalföreningar' },
      { value: '{{years}} år', label: 'Av naturskydd' },
      { value: '{{braMiljovalProducts}}+', label: 'Bra Miljöval-produkter' },
    ],
  },

  stickyBanner: {
    enabled: true,
    headline: 'Bli medlem idag!',
    subline: 'Stöd vårt arbete för en hållbar framtid',
    buttonLabel: 'Bli medlem',
    link: internal('/bli-medlem'),
    showAfterPx: 800,
  },

  footer: {
    copyright: '© {{year}} Naturskyddsföreningen.',
    orgNumber: '802003-1855',
    associationsHeading: 'Hitta din lokalförening',
    associationsText: 'Vi finns i alla Sveriges län. Engagera dig lokalt!',
    associationsButton: 'Välj ditt län',
    // The old footer had two dead anchors (#integritet, #cookies). Add real
    // pages here once they exist.
    legalLinks: [],
  },

  notFound: {
    heading: 'Sidan hittades inte',
    text: 'Sidan du letar efter verkar inte existera. Den kan ha flyttats eller tagits bort.',
    primaryCta: { label: 'Gå till startsidan', link: internal('/') },
    secondaryCta: { label: 'Senaste nyheter', link: internal('/nyheter') },
  },
}

// Only links that go somewhere meaningful. Entries that used to point at an
// unrelated page (Natursnokarna, Press, Butik, …) are left out until their
// pages exist.
export const NAVIGATION_DEFAULTS: Navigation = {
  groups: [
    {
      _key: 'learn',
      title: 'Lär dig mer',
      variant: 'default',
      items: [
        { _key: 'biologisk-mangfald', label: 'Biologisk mångfald', link: internal('/biologisk-mangfald') },
        { _key: 'hav-och-vatten', label: 'Hav och vatten', link: internal('/hav-och-vatten') },
        { _key: 'hallbar-konsumtion', label: 'Hållbar konsumtion', link: internal('/hallbar-konsumtion') },
        { _key: 'klimat', label: 'Klimat och energi', link: internal('/klimat') },
        { _key: 'jordbruk-och-mat', label: 'Jordbruk och mat', link: internal('/jordbruk-och-mat') },
        { _key: 'skog-och-mark', label: 'Skog och mark', link: internal('/skog-och-mark') },
      ],
    },
    {
      _key: 'engage',
      title: 'Engagera dig',
      variant: 'default',
      items: [
        { _key: 'engagera-dig', label: 'Engagera dig', link: internal('/engagera-dig') },
        { _key: 'nyheter', label: 'Nyheter', link: internal('/nyheter') },
        { _key: 'bli-medlem', label: 'Bli medlem', link: internal('/bli-medlem') },
      ],
    },
    {
      _key: 'about',
      title: 'Om oss',
      variant: 'default',
      items: [{ _key: 'om-foreningen', label: 'Om föreningen', link: internal('/om-foreningen') }],
    },
    {
      _key: 'support',
      title: 'Stöd oss',
      variant: 'cta',
      items: [{ _key: 'bli-medlem', label: 'Bli medlem', link: internal('/bli-medlem'), highlight: true }],
    },
  ],
  footerColumns: [
    {
      _key: 'quick',
      title: 'Snabblänkar',
      links: [
        { _key: 'om-foreningen', label: 'Om föreningen', link: internal('/om-foreningen') },
        { _key: 'nyheter', label: 'Nyheter', link: internal('/nyheter') },
        { _key: 'bli-medlem', label: 'Bli medlem', link: internal('/bli-medlem') },
        { _key: 'klimat', label: 'Klimat och energi', link: internal('/klimat') },
        { _key: 'biologisk-mangfald', label: 'Biologisk mångfald', link: internal('/biologisk-mangfald') },
      ],
    },
    {
      _key: 'resources',
      title: 'Resurser',
      links: [
        { _key: 'hav-och-vatten', label: 'Hav och vatten', link: internal('/hav-och-vatten') },
        { _key: 'skog-och-mark', label: 'Skog och mark', link: internal('/skog-och-mark') },
        { _key: 'hallbar-konsumtion', label: 'Hållbar konsumtion', link: internal('/hallbar-konsumtion') },
        { _key: 'jordbruk-och-mat', label: 'Jordbruk och mat', link: internal('/jordbruk-och-mat') },
      ],
    },
  ],
}
