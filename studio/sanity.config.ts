import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'naturskyddsforeningen',
  title: 'Naturskyddsföreningen',

  projectId: 'nmtsuoja',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innehåll')
          .items([
            // ── Sidor ──────────────────────────────────────────
            S.listItem()
              .title('Startsida')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Startsida – hjältesektionen')
              ),
            S.listItem()
              .title('Webbplatsinställningar')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Kontakt & sociala medier')
              ),
            S.divider(),
            // ── Nyheter ────────────────────────────────────────
            S.listItem()
              .title('Artiklar')
              .schemaType('article')
              .child(
                S.documentList()
                  .title('Alla artiklar')
                  .filter('_type == "article"')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.listItem()
              .title('Utvalda artiklar')
              .schemaType('article')
              .child(
                S.documentList()
                  .title('Utvalda artiklar')
                  .filter('_type == "article" && featured == true')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.divider(),
            // ── Skribenter ─────────────────────────────────────
            S.listItem()
              .title('Skribenter')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Skribenter')),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
