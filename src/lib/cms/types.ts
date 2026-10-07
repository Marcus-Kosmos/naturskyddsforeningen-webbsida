// Hand-written types mirroring the Sanity schema (studio/schemaTypes).
// `vite build` does not type-check, so keep these in sync by hand.

export interface CmsLinkData {
  linkType?: 'internal' | 'external'
  path?: string
  url?: string
  newTab?: boolean
}

export interface Cta {
  _key?: string
  label: string
  link?: CmsLinkData
}

export interface Stat {
  _key?: string
  value: string
  label: string
}

export interface NavItem {
  _key?: string
  label: string
  link?: CmsLinkData
  highlight?: boolean
}

export interface NavGroup {
  _key: string
  title: string
  variant?: 'default' | 'cta'
  items: NavItem[]
}

export interface NavColumn {
  _key: string
  title: string
  links: Cta[]
}

export interface Navigation {
  groups: NavGroup[]
  footerColumns: NavColumn[]
}

export interface Facts {
  members?: string
  localAssociations?: string
  foundedYear?: number
  braMiljovalProducts?: string
  magazineIssuesPerYear?: number
}

export interface SiteSettings {
  tagline: string
  contactEmail: string
  contactPhone: string
  contactAddressLine1: string
  contactAddressLine2: string
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string
  facts: Facts
  membershipCta: {
    heading: string
    text: string
    benefits: string[]
    primaryCta: Cta
    secondaryCta: Cta
    stats: Stat[]
  }
  stickyBanner: {
    enabled: boolean
    headline: string
    subline: string
    buttonLabel: string
    link: CmsLinkData
    showAfterPx: number
  }
  footer: {
    copyright: string
    orgNumber: string
    associationsHeading: string
    associationsText: string
    associationsButton: string
    legalLinks: Cta[]
  }
  notFound: {
    heading: string
    text: string
    primaryCta: Cta
    secondaryCta: Cta
  }
}
