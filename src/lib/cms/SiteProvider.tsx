import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { NAVIGATION_DEFAULTS, SITE_DEFAULTS } from '../../content/site'
import { buildFactValues, fillFacts } from './facts'
import { mergeDefined } from './merge'
import { normalizeNavigation } from './navigation'
import type { Navigation, SiteSettings } from './types'
import { useSanityQuery } from './useSanityQuery'

const SITE_QUERY = `{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    tagline, contactEmail, contactPhone, contactAddressLine1, contactAddressLine2,
    facebook, instagram, youtube, twitter,
    facts, membershipCta, stickyBanner, footer, notFound
  },
  "navigation": *[_type == "navigation" && _id == "navigation"][0]{ groups, footerColumns }
}`

interface SiteQueryResult {
  settings: Partial<SiteSettings> | null
  navigation: Partial<Navigation> | null
}

interface SiteContextValue {
  settings: SiteSettings
  navigation: Navigation
  /** Replace `{{members}}`-style tags in editor-written text. */
  fill: (text?: string | null) => string
}

const defaultValues = buildFactValues(SITE_DEFAULTS.facts)

const SiteContext = createContext<SiteContextValue>({
  settings: SITE_DEFAULTS,
  navigation: NAVIGATION_DEFAULTS,
  fill: (text) => fillFacts(text, defaultValues),
})

/**
 * Fetches the global site content (settings + navigation) once and shares it.
 * Renders immediately from typed defaults, then swaps in whatever Sanity has,
 * so the site chrome never goes blank if the CMS is slow or unreachable.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const { data } = useSanityQuery<SiteQueryResult>(SITE_QUERY)

  const value = useMemo<SiteContextValue>(() => {
    const settings = mergeDefined(SITE_DEFAULTS, data?.settings)
    const navigation = normalizeNavigation(mergeDefined(NAVIGATION_DEFAULTS, data?.navigation))
    const values = buildFactValues(settings.facts)
    return { settings, navigation, fill: (text) => fillFacts(text, values) }
  }, [data])

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  return useContext(SiteContext)
}
