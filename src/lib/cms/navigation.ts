import type { Navigation } from './types'

/**
 * Sanity omits empty arrays, so a group/column an editor has not filled in yet
 * arrives without its list. Drop anything unusable here, once, so components
 * can map over lists without guarding.
 */
export function normalizeNavigation(nav: Navigation): Navigation {
  const groups = (nav.groups ?? [])
    .filter((group) => group?.title)
    .map((group) => ({
      ...group,
      _key: group._key ?? group.title,
      items: (group.items ?? []).filter((item) => item?.label),
    }))
    .filter((group) => group.items.length > 0)

  const footerColumns = (nav.footerColumns ?? [])
    .filter((column) => column?.title)
    .map((column) => ({
      ...column,
      _key: column._key ?? column.title,
      links: (column.links ?? []).filter((link) => link?.label),
    }))
    .filter((column) => column.links.length > 0)

  return { groups, footerColumns }
}
