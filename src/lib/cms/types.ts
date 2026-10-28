import type { PortableTextProps } from '@portabletext/react'

// Hand-written types mirroring the Sanity schema (studio/schemaTypes).
// `vite build` does not type-check, so keep these in sync by hand.

export interface CmsLinkData {
  linkType?: 'internal' | 'external' | 'action'
  path?: string
  url?: string
  newTab?: boolean
  /** For `linkType: 'action'`: something the site does instead of navigating. */
  action?: 'openAssociations'
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

export interface CmsImageData {
  asset?: { _ref: string }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface ArticleCard {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  category: string
  featured?: boolean
  mainImage?: CmsImageData
}

export interface ArticleFull extends ArticleCard {
  body?: PortableTextProps['value']
  seo?: { metaTitle?: string; metaDescription?: string }
  author?: { name: string; role?: string; photo?: CmsImageData }
}

export interface EventItem {
  _id: string
  title: string
  startDate: string
  endDate?: string
  location?: string
  type?: string
  link?: CmsLinkData
}

// ── Homepage ──────────────────────────────────────────────────────────────

export type BlockBackground = 'white' | 'muted' | 'soft' | 'plain'

interface BlockBase {
  _key: string
  /** Becomes the element id, so `/#anchor` links to the section. */
  anchor?: string
  background?: BlockBackground
}

export interface FeatureItemData {
  _key?: string
  icon?: string
  title?: string
  text?: string
}

export interface BlockCta {
  _key?: string
  label: string
  link?: CmsLinkData
  style?: 'primary' | 'secondary' | 'text'
}

export interface FeatureBlock extends BlockBase {
  _type: 'featureSection'
  layout?: 'split' | 'stacked'
  mediaSide?: 'left' | 'right'
  mediaFirstOnMobile?: boolean
  eyebrow?: string
  eyebrowIcon?: string
  eyebrowImage?: CmsImageData
  heading: string
  body?: string
  images?: CmsImageData[]
  itemsHeading?: string
  itemsStyle?: 'list' | 'cards' | 'tiles' | 'bullets'
  items?: FeatureItemData[]
  stats?: Stat[]
  showEvents?: boolean
  eventsHeading?: string
  links?: BlockCta[]
  showShare?: boolean
}

export interface CardData {
  _key?: string
  title: string
  text?: string
  icon?: string
  tone?: 'green' | 'neutral'
  logoLight?: CmsImageData
  logoDark?: CmsImageData
  link?: CmsLinkData
  linkLabel?: string
}

export interface CardGridBlock extends BlockBase {
  _type: 'cardGridSection'
  variant?: 'icons' | 'logos'
  eyebrow?: string
  heading?: string
  body?: string
  cards?: CardData[]
}

export interface ImpactStatData {
  _key?: string
  icon?: string
  value: string
  label: string
  description?: string
}

export interface StatsBlock extends BlockBase {
  _type: 'statsSection'
  heading: string
  body?: string
  stats?: ImpactStatData[]
}

export interface LabelGuideBlock extends BlockBase {
  _type: 'labelGuideSection'
  eyebrow?: string
  heading: string
  body?: string
  infoHeading?: string
  infoItems?: Array<{ _key?: string; status: 'recommended' | 'limited' | 'insufficient'; label: string; text?: string }>
}

export interface NewsEventsBlock extends BlockBase {
  _type: 'newsEventsSection'
  newsHeading: string
  newsLink?: BlockCta
  newsCount?: number
  eventsHeading: string
  eventsCount?: number
}

export type HomeBlock = FeatureBlock | CardGridBlock | StatsBlock | LabelGuideBlock | NewsEventsBlock

export interface HomeData {
  heroHeading: string
  heroSubheading?: string
  heroPrimaryBtn?: string
  heroSecondaryBtn?: string
  heroPrimaryLink?: CmsLinkData
  heroSecondaryLink?: CmsLinkData
  heroImages?: CmsImageData[]
  seo?: { metaTitle?: string; metaDescription?: string }
  sections?: HomeBlock[]
}
