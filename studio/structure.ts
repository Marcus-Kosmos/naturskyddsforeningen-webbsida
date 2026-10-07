import type {StructureBuilder} from 'sanity/structure'

/**
 * Document types that exist exactly once, under a fixed _id equal to the type
 * name. The frontend queries them by that id. They are hidden from the global
 * "create" menu and cannot be deleted or duplicated (see sanity.config.ts).
 */
export const SINGLETONS = ['homePage', 'siteSettings', 'navigation']

const singleton = (S: StructureBuilder, type: string, title: string, panelTitle: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(panelTitle))

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Innehåll')
    .items([
      // ── Sidor ──────────────────────────────────────────
      singleton(S, 'homePage', 'Startsida', 'Startsida – hjältesektionen'),
      singleton(S, 'navigation', 'Navigation & sidfot', 'Huvudmeny och sidfotens länkar'),
      singleton(S, 'siteSettings', 'Webbplatsinställningar', 'Kontakt, fakta, medlemsruta och mer'),
      S.divider(),
      // ── Nyheter ────────────────────────────────────────
      S.listItem()
        .title('Artiklar')
        .schemaType('article')
        .child(
          S.documentList()
            .title('Alla artiklar')
            .filter('_type == "article"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Utvalda artiklar')
        .schemaType('article')
        .child(
          S.documentList()
            .title('Utvalda artiklar')
            .filter('_type == "article" && featured == true')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.divider(),
      // ── Skribenter ─────────────────────────────────────
      S.listItem()
        .title('Skribenter')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Skribenter')),
    ])
