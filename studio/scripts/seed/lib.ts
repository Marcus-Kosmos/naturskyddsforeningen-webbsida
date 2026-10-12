import {readFile} from 'node:fs/promises'
import path from 'node:path'
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

/**
 * Create a published document only if it doesn't exist yet. The factory runs
 * lazily, so expensive work (image uploads) is skipped on re-runs.
 */
export async function createOnce(
  ctx: SeedContext,
  id: string,
  build: () => Promise<SanityDoc> | SanityDoc,
): Promise<'created' | 'unchanged'> {
  if (id.includes('.')) throw new Error(`Id "${id}" contains a dot and would be private`)
  if (await ctx.client.getDocument(id)) return 'unchanged'
  if (ctx.dryRun) return 'created'
  const doc = await build()
  if (doc._id !== id) throw new Error(`Factory returned _id "${doc._id}", expected "${id}"`)
  await ctx.client.create(doc)
  return 'created'
}

/**
 * Fetch an image and upload it as a Sanity asset. Sanity de-duplicates by
 * content hash, so uploading the same photo twice returns the same asset.
 * Returns an image field value ready to embed in a document.
 */
export async function uploadImage(
  ctx: SeedContext,
  url: string,
  fields: {alt?: string; caption?: string} = {},
) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Could not fetch ${url}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const filename = new URL(url).pathname.split('/').pop() ?? 'image'
  const asset = await ctx.client.assets.upload('image', buffer, {
    filename: `${filename}.jpg`,
    contentType: response.headers.get('content-type') ?? 'image/jpeg',
  })
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, ...fields}
}

/** Full-size Unsplash photo URL for an id like "photo-1641119580222-3e90f9a11287". */
export const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=2000&q=85&fm=jpg&fit=max`

/** Deterministic keys for Portable Text children. */
export function keyMaker(prefix: string) {
  let n = 0
  return () => `${prefix}-${++n}`
}

/**
 * Upload a file from the repo's public/ folder as a Sanity image asset (deduplicated by hash).
 * `relativePath` is relative to public/, for example "images/logos/sveriges-natur-dark.png".
 * Run seeds from studio/ (as the docs say) so ../public resolves. Returns null if the file is gone.
 */
export async function uploadPublicImage(
  ctx: SeedContext,
  relativePath: string,
  fields: {alt?: string; caption?: string} = {},
  type: 'image' | 'captionedImage' = 'captionedImage',
) {
  const file = path.resolve(process.cwd(), '..', 'public', relativePath)
  let buffer: Buffer
  try {
    buffer = await readFile(file)
  } catch {
    // These images now live in Sanity; a fresh dataset just gets none until they are uploaded in Studio.
    console.warn(`  (skipped ${relativePath}: no longer in the repo)`)
    return null
  }
  const asset = await ctx.client.assets.upload('image', buffer, {filename: path.basename(file)})
  return {_type: type, asset: {_type: 'reference', _ref: asset._id}, ...fields}
}
