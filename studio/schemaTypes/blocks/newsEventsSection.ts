import {defineField, defineType} from 'sanity'
import {BACKGROUND_TITLES, sectionBasics} from './options'

export default defineType({
  name: 'newsEventsSection',
  title: 'Nyheter och kalender',
  type: 'object',
  description: 'De senaste artiklarna och de närmaste aktiviteterna. Innehållet hämtas från Artiklar och Evenemang.',
  fields: [
    defineField({name: 'newsHeading', title: 'Rubrik för nyheter', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'newsLink',
      title: 'Länk till alla nyheter',
      type: 'blockCta',
      description: 'Visas bredvid rubriken, till exempel "Se alla". Länkens utseende används inte.',
    }),
    defineField({
      name: 'newsCount',
      title: 'Antal nyheter',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.required().integer().min(1).max(6),
    }),
    defineField({name: 'eventsHeading', title: 'Rubrik för kalendern', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'eventsCount',
      title: 'Antal aktiviteter',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.required().integer().min(1).max(6),
    }),
    ...sectionBasics(),
  ],
  preview: {
    select: {title: 'newsHeading', subtitle: 'eventsHeading', background: 'background'},
    prepare: ({title, subtitle, background}) => ({
      title: `${title} + ${subtitle}`,
      subtitle: `Nyheter och kalender · ${BACKGROUND_TITLES[background] ?? ''}`,
    }),
  },
})
