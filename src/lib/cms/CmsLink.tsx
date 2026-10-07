import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { resolveLink } from './resolveLink'
import type { CmsLinkData } from './types'

interface CmsLinkProps {
  link?: CmsLinkData
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** A router `<Link>` for internal paths, a plain `<a>` for external URLs. */
export function CmsLink({ link, className, onClick, children }: CmsLinkProps) {
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
