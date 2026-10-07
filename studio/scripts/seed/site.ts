import {NAVIGATION_DEFAULTS, SITE_DEFAULTS} from '../../../src/content/site'
import type {CmsLinkData, Cta} from '../../../src/lib/cms/types'
import {ensureDocument, keyFrom, type SeedContext} from './lib'

const link = (l?: CmsLinkData) => (l ? {_type: 'link', linkType: l.linkType ?? 'internal', path: l.path, url: l.url} : undefined)

const cta = (c: Cta, index = 0) => ({
  _type: 'cta',
  _key: c._key ?? keyFrom(c.label, index),
  label: c.label,
  link: link(c.link),
})

/** siteSettings + navigation: the global site chrome. */
export async function seedSite(ctx: SeedContext) {
  const s = SITE_DEFAULTS

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    tagline: s.tagline,
    contactEmail: s.contactEmail,
    contactPhone: s.contactPhone,
    contactAddressLine1: s.contactAddressLine1,
    contactAddressLine2: s.contactAddressLine2,
    facts: s.facts,
    membershipCta: {
      heading: s.membershipCta.heading,
      text: s.membershipCta.text,
      benefits: s.membershipCta.benefits,
      primaryCta: cta(s.membershipCta.primaryCta),
      secondaryCta: cta(s.membershipCta.secondaryCta),
      stats: s.membershipCta.stats.map((stat, i) => ({
        _type: 'stat',
        _key: keyFrom(stat.label, i),
        value: stat.value,
        label: stat.label,
      })),
    },
    stickyBanner: {...s.stickyBanner, link: link(s.stickyBanner.link)},
    footer: {...s.footer, legalLinks: s.footer.legalLinks.map(cta)},
    notFound: {
      heading: s.notFound.heading,
      text: s.notFound.text,
      primaryCta: cta(s.notFound.primaryCta),
      secondaryCta: cta(s.notFound.secondaryCta),
    },
  }

  const navigation = {
    _id: 'navigation',
    _type: 'navigation',
    groups: NAVIGATION_DEFAULTS.groups.map((group) => ({
      _type: 'navGroup',
      _key: group._key,
      title: group.title,
      variant: group.variant ?? 'default',
      items: group.items.map((item, i) => ({
        _type: 'navItem',
        _key: item._key ?? keyFrom(item.label, i),
        label: item.label,
        link: link(item.link),
        highlight: !!item.highlight,
      })),
    })),
    footerColumns: NAVIGATION_DEFAULTS.footerColumns.map((column) => ({
      _type: 'navColumn',
      _key: column._key,
      title: column.title,
      links: column.links.map(cta),
    })),
  }

  const results = {
    siteSettings: await ensureDocument(ctx, siteSettings),
    navigation: await ensureDocument(ctx, navigation),
  }
  console.log('  siteSettings:', results.siteSettings, '| navigation:', results.navigation)
}
