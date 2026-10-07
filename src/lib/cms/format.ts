const LOCALE = 'sv-SE'

/** "24 mars 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })
}

/** "15 dec" */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' }).replace('.', '')
}
