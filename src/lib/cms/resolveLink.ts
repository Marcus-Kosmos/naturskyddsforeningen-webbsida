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
  if (!link || link.linkType === 'action') return null
  if (link.linkType === 'external') {
    return link.url && SAFE_EXTERNAL.test(link.url.trim())
      ? { href: link.url.trim(), external: true, newTab: !!link.newTab }
      : null
  }
  return link.path && link.path.startsWith('/') && !link.path.startsWith('//')
    ? { href: link.path, external: false, newTab: false }
    : null
}

/** True if the link leads somewhere: a page, an address or a known site action. Used to leave out dead buttons. */
export function isUsableLink(link?: CmsLinkData): boolean {
  if (link?.linkType === 'action') return link.action === 'openAssociations'
  return resolveLink(link) !== null
}
