import article from './article'
import author from './author'
import siteSettings from './siteSettings'
import homePage from './homePage'
import navigation from './navigation'
import event from './event'
import featureSection from './blocks/featureSection'
import cardGridSection from './blocks/cardGridSection'
import statsSection from './blocks/statsSection'
import labelGuideSection from './blocks/labelGuideSection'
import newsEventsSection from './blocks/newsEventsSection'
import link from './objects/link'
import cta from './objects/cta'
import stat from './objects/stat'
import captionedImage from './objects/captionedImage'
import featureItem from './objects/featureItem'
import blockCta from './objects/blockCta'
import card from './objects/card'
import impactStat from './objects/impactStat'
import {navItem, navGroup, navColumn} from './objects/navigation'

export const schemaTypes = [
  // Documents
  article,
  author,
  homePage,
  siteSettings,
  navigation,
  event,
  // Shared objects
  link,
  cta,
  stat,
  navItem,
  navGroup,
  navColumn,
  captionedImage,
  featureItem,
  blockCta,
  card,
  impactStat,
  // Homepage sections
  featureSection,
  cardGridSection,
  statsSection,
  labelGuideSection,
  newsEventsSection,
]
