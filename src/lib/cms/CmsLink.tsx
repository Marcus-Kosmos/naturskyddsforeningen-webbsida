import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAssociations } from './AssociationsProvider'
import { resolveLink } from './resolveLink'
import type { CmsLinkData } from './types'

interface CmsLinkProps {
  link?: CmsLinkData
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** A router `<Link>` for internal paths, a plain `<a>` for external URLs, a `<button>` for site actions. */
export function CmsLink({ link, className, onClick, children }: CmsLinkProps) {
  const associations = useAssociations()
  if (link?.linkType === 'action') {
    if (link.action !== 'openAssociations') return <span className={className}>{children}</span>
    return (
      <button
        type="button"
        // A button doesn't inherit what a link gets for free: the pointer, left-aligned text and, when
        // the caller lays it out as a block (menus, cards), the full width.
        className={`cursor-pointer text-left ${/(^|\s)block(\s|$)/.test(className ?? '') ? 'w-full' : ''} ${className ?? ''}`}
        onClick={() => {
          associations.open()
          onClick?.()
        }}
      >
        {children}
      </button>
    )
  }

  const resolved = resolveLink(link)
  if (!resolved) return <span className={className}>{children}</span>

  if (resolved.external) {
    return (
      <a
        href={resolved.href}
        className={className}
        onClick={onClick}
        {...(resolved.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={resolved.href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
