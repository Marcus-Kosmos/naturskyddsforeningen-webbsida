const LOCALE = 'sv-SE'

/** A usable Date, or null for a missing or unparseable value (the CMS can hand back null). */
function toDate(iso?: string | null): Date | null {
  if (!iso) return null
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

/** "24 mars 2026" */
export function formatDate(iso?: string | null): string {
  return toDate(iso)?.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' }) ?? ''
}

/** "15 dec" */
export function formatShortDate(iso?: string | null): string {
  return toDate(iso)?.toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' }).replace('.', '') ?? ''
}
