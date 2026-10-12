import {defineField, defineType} from 'sanity'
import {ICON_OPTIONS} from '../blocks/options'

/** A number that counts up when it scrolls into view, with an icon and a short description. */
export default defineType({
  name: 'impactStat',
  title: 'Resultat',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Ikon', type: 'string', options: {list: ICON_OPTIONS}}),
    defineField({
      name: 'value',
      title: 'Värde',
      type: 'string',
      description:
        'Till exempel 350+, 45 000 eller {{members}} (hämtas från Webbplatsinställningar > Fakta). Talet räknas upp när avsnittet visas.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'label', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Beskrivning', type: 'string'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
