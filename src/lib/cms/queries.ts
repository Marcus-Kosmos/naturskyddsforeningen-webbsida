// GROQ for news and events. Keep field lists in sync with studio/schemaTypes.
// Images always project hotspot and crop so editors' framing is honoured.
const IMG = `{ asset, alt, caption, hotspot, crop }`

const ARTICLE_CARD = `_id, title, "slug": slug.current, excerpt, publishedAt, category, featured, mainImage ${IMG}`

export const ARTICLES_QUERY = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) { ${ARTICLE_CARD} }`

export const LATEST_ARTICLES_QUERY = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...3] { ${ARTICLE_CARD} }`

// The author's e-mail is deliberately not projected.
export const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0]{
  ${ARTICLE_CARD}, body, seo,
  "author": author->{ name, role, photo ${IMG} }
}`

export const UPCOMING_EVENTS_QUERY = `*[_type == "event" && coalesce(endDate, startDate) >= now()] | order(startDate asc)[0...3]{
  _id, title, startDate, endDate, location, type, link
}`
