// GROQ for news and events. Keep field lists in sync with studio/schemaTypes.
// Images always project hotspot and crop so editors' framing is honoured.
const IMG = `{ asset, alt, caption, hotspot, crop }`

// An article without a publishing date (Studio requires one, but an import might skip it)
// falls back to the day it was created, so it still sorts and prints a real date.
const PUBLISHED = `coalesce(publishedAt, _createdAt)`

const ARTICLE_CARD = `_id, title, "slug": slug.current, excerpt, "publishedAt": ${PUBLISHED}, category, featured, mainImage ${IMG}`

export const ARTICLES_QUERY = `*[_type == "article" && defined(slug.current)] | order(${PUBLISHED} desc) { ${ARTICLE_CARD} }`

export const LATEST_ARTICLES_QUERY = `*[_type == "article" && defined(slug.current)] | order(${PUBLISHED} desc)[0...3] { ${ARTICLE_CARD} }`

// The author's e-mail is deliberately not projected.
export const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0]{
  ${ARTICLE_CARD}, body, seo,
  "author": author->{ name, role, photo ${IMG} }
}`

export const UPCOMING_EVENTS_QUERY = `*[_type == "event" && coalesce(endDate, startDate) >= now()] | order(startDate asc)[0...3]{
  _id, title, startDate, endDate, location, type, link
}`
