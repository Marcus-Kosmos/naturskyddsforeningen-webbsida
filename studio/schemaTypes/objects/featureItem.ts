import {defineField, defineType} from 'sanity'
import {ICON_OPTIONS} from '../blocks/options'

/** One point in a list of what an organisation does, tips, benefits and so on. */
export default defineType({
  name: 'featureItem',
  title: 'Punkt',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      options: {list: ICON_OPTIONS},
      description: 'Frivillig. Visas inte i läsläge.',
    }),
    defineField({name: 'title', title: 'Rubrik', type: 'string'}),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2,
      description: 'Kan innehålla fakta-taggar, till exempel {{localAssociations}}.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const item = value as {title?: string; text?: string} | undefined
      return item?.title || item?.text ? true : 'Fyll i en rubrik eller en text.'
    }),
  preview: {
    select: {title: 'title', subtitle: 'text'},
    prepare: ({title, subtitle}) => ({title: title || subtitle, subtitle: title ? subtitle : undefined}),
  },
})
