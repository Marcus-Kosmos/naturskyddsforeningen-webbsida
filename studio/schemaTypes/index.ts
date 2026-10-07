import article from './article'
import author from './author'
import siteSettings from './siteSettings'
import homePage from './homePage'
import navigation from './navigation'
import link from './objects/link'
import cta from './objects/cta'
import stat from './objects/stat'
import {navItem, navGroup, navColumn} from './objects/navigation'

export const schemaTypes = [
  // Documents
  article,
  author,
  homePage,
  siteSettings,
  navigation,
  // Shared objects
  link,
  cta,
  stat,
  navItem,
  navGroup,
  navColumn,
]
