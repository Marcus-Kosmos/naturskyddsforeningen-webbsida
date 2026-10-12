import { useEffect, useState } from 'react'
import { client } from '../sanityClient'

type Params = Record<string, unknown>

interface QueryState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface Settled<T> {
  key: string
  data: T | null
  error: Error | null
}

// One in-flight/settled promise per query, so identical calls from several
// components (or React StrictMode's double effect) share a single request and
// revisiting a route doesn't re-fetch. Lives for the session; reload to refresh.
const cache = new Map<string, Promise<unknown>>()

// The values of the promises above once they have settled. A revisit (the
// browser's Back button, say) can then render with data on the very first
// pass: no spinner flash, and the browser can restore the scroll position.
const resolved = new Map<string, unknown>()

function fetchCached<T>(key: string, query: string, params: Params): Promise<T> {
  let promise = cache.get(key) as Promise<T> | undefined
  if (!promise) {
    promise = client.fetch<T>(query, params)
    cache.set(key, promise)
    promise.then(
      (data) => resolved.set(key, data),
      // Don't cache failures, so the next mount can retry.
      () => cache.delete(key),
    )
  }
  return promise
}

/**
 * Fetch a GROQ query from Sanity. Pass `null` as the query to skip fetching.
 * `data` stays `null` while loading and on error, so callers keep their
 * hardcoded fallbacks (`data?.title || 'Default'`) working unchanged.
 *
 * The result always belongs to the current query and params: when they change
 * (a new `:slug`, say) the hook reports `loading` again instead of handing back
 * the previous result.
 */
export function useSanityQuery<T>(query: string | null, params: Params = {}): QueryState<T> {
  const key = query ? query + JSON.stringify(params) : null
  const [settled, setSettled] = useState<Settled<T> | null>(null)

  useEffect(() => {
    if (key === null || query === null || resolved.has(key)) return

    let cancelled = false
    fetchCached<T>(key, query, params)
      .then((data) => {
        if (!cancelled) setSettled({ key, data, error: null })
      })
      .catch((error: Error) => {
        if (!cancelled) setSettled({ key, data: null, error })
      })

    return () => {
      cancelled = true
    }
    // `key` encodes both the query and its params.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  if (key === null) return { data: null, loading: false, error: null }
  if (resolved.has(key)) return { data: resolved.get(key) as T, loading: false, error: null }
  if (settled?.key === key) return { data: settled.data, loading: false, error: settled.error }
  return { data: null, loading: true, error: null }
}
