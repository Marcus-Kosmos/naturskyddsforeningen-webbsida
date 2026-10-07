import type { CmsLinkData } from './types'

export interface ResolvedLink {
  href: string
  external: boolean
  newTab: boolean
}

// Studio validates these too, but content can also be written through the API,
// so never render anything that isn't a site path or a plain web/mail/phone link.
const SAFE_EXTERNAL = /^(https?:|mailto:|tel:)/i

export function resolveLink(link?: CmsLinkData): ResolvedLink | null {
  if (!link) return null
  if (link.linkType === 'external') {
    return link.url && SAFE_EXTERNAL.test(link.url.trim())
      ? { href: link.url.trim(), external: true, newTab: !!link.newTab }
      : null
  }
  return link.path && link.path.startsWith('/') && !link.path.startsWith('//')
    ? { href: link.path, external: false, newTab: false }
    : null
}
