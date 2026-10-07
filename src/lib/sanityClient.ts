import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'nmtsuoja',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  // Keep the CDN on everywhere: the non-CDN API enforces the project's CORS origin
  // list and rejects localhost / preview URLs. Edits in Studio show up within ~60s.
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
