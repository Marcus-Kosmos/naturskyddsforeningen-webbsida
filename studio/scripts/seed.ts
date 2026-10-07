/**
 * Seed Sanity with the content that used to be hardcoded in the frontend.
 *
 *   cd studio
 *   npx sanity exec scripts/seed.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed.ts --with-user-token
 *   npx sanity exec scripts/seed.ts --with-user-token -- --only=site
 *
 * Requires `npx sanity login`. Safe to re-run: existing content is never overwritten.
 */
import {createContext, onlyModules} from './seed/lib'
import {seedSite} from './seed/site'

const MODULES: Record<string, (ctx: ReturnType<typeof createContext>) => Promise<void>> = {
  site: seedSite,
}

async function main() {
  const ctx = createContext()
  const only = onlyModules()
  const names = Object.keys(MODULES).filter((name) => !only || only.includes(name))

  console.log(`${ctx.dryRun ? '[dry run] ' : ''}Seeding: ${names.join(', ')}`)
  for (const name of names) {
    console.log(`→ ${name}`)
    await MODULES[name](ctx)
  }
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
