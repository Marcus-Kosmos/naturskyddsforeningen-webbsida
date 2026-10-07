import {defineField, defineType} from 'sanity'

/**
 * A link to a page on this site or to an external address.
 * (Page references are added once pages are managed in Studio.)
 */
export default defineType({
  name: 'link',
  title: 'Länk',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Typ av länk',
      type: 'string',
      options: {
        list: [
          {title: 'Sida på webbplatsen', value: 'internal'},
          {title: 'Extern webbadress', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Sökväg',
      type: 'string',
      description: 'Sidans adress på webbplatsen, till exempel /klimat eller /nyheter. Måste börja med /.',
      hidden: ({parent}) => parent?.linkType === 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string} | undefined
          if (parent?.linkType === 'external') return true
          if (!value) return 'Ange en sökväg'
          if (!value.startsWith('/') || value.startsWith('//')) return 'Sökvägen måste börja med ett enkelt /'
          return true
        }),
    }),
    defineField({
      name: 'url',
      title: 'Webbadress',
      type: 'url',
      description: 'Hela adressen, till exempel https://www.example.com.',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({scheme: ['https', 'http', 'mailto', 'tel']}).custom((value, context) => {
          const parent = context.parent as {linkType?: string} | undefined
          if (parent?.linkType === 'external' && !value) return 'Ange en webbadress'
          return true
        }),
    }),
    defineField({
      name: 'newTab',
      title: 'Öppna i ny flik',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {linkType: 'linkType', path: 'path', url: 'url'},
    prepare({linkType, path, url}) {
      return {
        title: linkType === 'external' ? url : path,
        subtitle: linkType === 'external' ? 'Extern länk' : 'Sida på webbplatsen',
      }
    },
  },
})
