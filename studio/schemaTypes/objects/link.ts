import {defineField, defineType} from 'sanity'

/**
 * A link to a page on this site, to an external address, or an action on the
 * site (opening the list of local associations).
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
          {title: 'Öppna listan över lokalföreningar', value: 'action'},
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
      description:
        'Sidans adress på webbplatsen, till exempel /klimat eller /nyheter. Måste börja med /. Till ett avsnitt på startsidan: /#ankare.',
      hidden: ({parent}) => parent?.linkType === 'external' || parent?.linkType === 'action',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string} | undefined
          if (parent?.linkType === 'external' || parent?.linkType === 'action') return true
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
      name: 'action',
      title: 'Åtgärd',
      type: 'string',
      options: {list: [{title: 'Öppna listan över lokalföreningar', value: 'openAssociations'}]},
      initialValue: 'openAssociations',
      hidden: ({parent}) => parent?.linkType !== 'action',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string} | undefined
          return parent?.linkType === 'action' && !value ? 'Välj en åtgärd' : true
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
      if (linkType === 'action') return {title: 'Öppna lokalföreningar', subtitle: 'Åtgärd'}
      return {
        title: linkType === 'external' ? url : path,
        subtitle: linkType === 'external' ? 'Extern länk' : 'Sida på webbplatsen',
      }
    },
  },
})
