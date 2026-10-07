const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Overlay CMS data on typed defaults, field by field: anything the editor left
 * empty (null, undefined, '' or an empty list) keeps its default.
 */
export function mergeDefined<T>(defaults: T, override: unknown): T {
  if (override === null || override === undefined || override === '') return defaults

  if (Array.isArray(defaults)) {
    return (Array.isArray(override) && override.length > 0 ? override : defaults) as T
  }

  if (isPlainObject(defaults) && isPlainObject(override)) {
    const merged: Record<string, unknown> = { ...defaults }
    for (const key of Object.keys(override)) {
      merged[key] = key in defaults ? mergeDefined(defaults[key], override[key]) : override[key]
    }
    return merged as T
  }

  return override as T
}
