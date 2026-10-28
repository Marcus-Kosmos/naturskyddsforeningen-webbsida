import {defineField, defineType} from 'sanity'
import {BACKGROUND_TITLES, sectionBasics} from './options'

export default defineType({
  name: 'statsSection',
  title: 'Resultat i siffror',
  type: 'object',
  description: 'Rubrik och fyra rutor med tal som räknas upp när de kommer i bild.',
  fields: [
    defineField({name: 'heading', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Text', type: 'text', rows: 3}),
    defineField({
      name: 'stats',
      title: 'Resultat',
      type: 'array',
      of: [{type: 'impactStat'}],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    ...sectionBasics('plain'),
  ],
  preview: {
    select: {title: 'heading', stats: 'stats', background: 'background'},
    prepare: ({title, stats, background}) => ({
      title,
      subtitle: `${stats?.length ?? 0} resultat · ${BACKGROUND_TITLES[background] ?? ''}`,
    }),
  },
})
