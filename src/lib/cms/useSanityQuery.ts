import { useEffect, useState } from 'react'
import { client } from '../sanityClient'

type Params = Record<string, unknown>

interface QueryState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

// One in-flight/settled promise per query, so identical calls from several
// components (or React StrictMode's double effect) share a single request and
// revisiting a route doesn't re-fetch. Lives for the session; reload to refresh.
const cache = new Map<string, Promise<unknown>>()

function fetchCached<T>(key: string, query: string, params: Params): Promise<T> {
  let promise = cache.get(key) as Promise<T> | undefined
  if (!promise) {
    promise = client.fetch<T>(query, params)
    cache.set(key, promise)
    // Don't cache failures, so the next mount can retry.
    promise.catch(() => cache.delete(key))
  }
  return promise
}

/**
 * Fetch a GROQ query from Sanity. Pass `null` as the query to skip fetching.
 * `data` stays `null` while loading and on error, so callers keep their
 * hardcoded fallbacks (`data?.title || 'Default'`) working unchanged.
 */
export function useSanityQuery<T>(query: string | null, params: Params = {}): QueryState<T> {
  const key = query ? query + JSON.stringify(params) : null
  const [state, setState] = useState<QueryState<T>>({ data: null, loading: key !== null, error: null })

  useEffect(() => {
    if (key === null || query === null) {
      setState({ data: null, loading: false, error: null })
      return
    }

    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetchCached<T>(key, query, params)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error })
      })

    return () => {
      cancelled = true
    }
    // `key` encodes both the query and its params.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return state
}
