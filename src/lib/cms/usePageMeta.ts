import { useEffect } from 'react'

const SITE_NAME = 'Naturskyddsföreningen'

interface PageMeta {
  title?: string
  description?: string
}

function setMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  const existed = !!el
  const previous = el?.getAttribute('content') ?? null
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return () => {
    if (!el) return
    if (!existed) el.remove()
    else if (previous !== null) el.setAttribute('content', previous)
  }
}

const named = (name: string) => () => {
  const el = document.createElement('meta')
  el.setAttribute('name', name)
  return el
}
const property = (prop: string) => () => {
  const el = document.createElement('meta')
  el.setAttribute('property', prop)
  return el
}

/**
 * Set the document title and description for the current page and restore the
 * defaults from index.html when leaving it. Social crawlers don't run scripts,
 * so this only affects browsers and search engines that render JavaScript.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title
    const fullTitle = title ? `${title} – ${SITE_NAME}` : previousTitle
    document.title = fullTitle

    const undo: Array<() => void> = [
      setMeta('meta[property="og:title"]', property('og:title'), fullTitle),
    ]
    if (description) {
      undo.push(
        setMeta('meta[name="description"]', named('description'), description),
        setMeta('meta[property="og:description"]', property('og:description'), description),
      )
    }

    return () => {
      document.title = previousTitle
      undo.forEach((fn) => fn())
    }
  }, [title, description])
}
