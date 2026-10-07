import type { Facts } from './types'

export type FactValues = Record<string, string>

/** Values behind the `{{tags}}` editors can use in text, derived from siteSettings.facts. */
export function buildFactValues(facts: Facts, now: Date = new Date()): FactValues {
  const year = now.getFullYear()
  return {
    members: facts.members ?? '',
    localAssociations: facts.localAssociations ?? '',
    years: facts.foundedYear ? String(year - facts.foundedYear) : '',
    braMiljovalProducts: facts.braMiljovalProducts ?? '',
    magazineIssues: facts.magazineIssuesPerYear != null ? String(facts.magazineIssuesPerYear) : '',
    year: String(year),
  }
}

const TAG = /\{\{\s*(\w+)\s*\}\}/g

/** Replace `{{tag}}` in a string. Unknown tags are left as written (and warned about in dev). */
export function fillFacts(text: string | undefined | null, values: FactValues): string {
  if (!text) return ''
  return text.replace(TAG, (match, name: string) => {
    if (Object.prototype.hasOwnProperty.call(values, name)) return values[name]
    if (import.meta.env.DEV) console.warn(`Unknown fact tag ${match}`)
    return match
  })
}
