import {getCliClient} from 'sanity/cli'

export type SanityClient = ReturnType<typeof getCliClient>

export interface SeedContext {
  client: SanityClient
  dryRun: boolean
}

export function createContext(): SeedContext {
  return {
    // useCdn off: writes and read-after-write checks must hit the live API.
    client: getCliClient({apiVersion: '2024-01-01'}).withConfig({useCdn: false}),
    dryRun: process.argv.includes('--dry-run'),
  }
}

export function onlyModules(): string[] | null {
  const arg = process.argv.find((a) => a.startsWith('--only='))
  return arg ? arg.replace('--only=', '').split(',').filter(Boolean) : null
}

type SanityDoc = {_id: string; _type: string; [key: string]: unknown}

/**
 * Create a published document if it doesn't exist, otherwise fill in only the
 * top-level fields that are still missing. Never overwrites editor changes.
 * Ids must not contain dots (those are private in Sanity).
 */
export async function ensureDocument(ctx: SeedContext, doc: SanityDoc): Promise<'created' | 'filled' | 'unchanged'> {
  if (doc._id.includes('.')) throw new Error(`Id "${doc._id}" contains a dot and would be private`)

  const existing = await ctx.client.getDocument(doc._id)
  const {_id, _type, ...fields} = doc

  if (!existing) {
    if (ctx.dryRun) return 'created'
    await ctx.client.create(doc)
    return 'created'
  }

  const missing = Object.keys(fields).filter((key) => existing[key] === undefined || existing[key] === null)
  if (missing.length === 0) return 'unchanged'
  if (ctx.dryRun) return 'filled'
  await ctx.client
    .patch(_id)
    .setIfMissing(Object.fromEntries(missing.map((key) => [key, fields[key]])))
    .commit()
  return 'filled'
}

/** A stable `_key` from a label, for array members. */
export const keyFrom = (value: string, index = 0) =>
  `${value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-${index}`
