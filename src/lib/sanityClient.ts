import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'nmtsuoja',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  // The CDN is on by default, in production and in dev. It serves edits made in Studio after a
  // minute or two. To see an edit at once while developing, set VITE_SANITY_USE_CDN=false in
  // .env.local (the live API checks the project's CORS origin list, which includes localhost:3000).
  useCdn: import.meta.env.VITE_SANITY_USE_CDN !== 'false',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
