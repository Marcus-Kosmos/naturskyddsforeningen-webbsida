import {defineField, defineType} from 'sanity'
import {BACKGROUND_TITLES, sectionBasics} from './options'

export default defineType({
  name: 'cardGridSection',
  title: 'Kortrutnät',
  type: 'object',
  description: 'En rad med kort, antingen med ikon (genvägar) eller med logotyp (samarbetspartners).',
  groups: [
    {name: 'text', title: 'Text', default: true},
    {name: 'cards', title: 'Kort'},
    {name: 'layout', title: 'Utseende'},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Etikett', type: 'string', group: 'text'}),
    defineField({
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      group: 'text',
      description: 'Frivillig. Utan rubrik visas bara korten.',
    }),
    defineField({name: 'body', title: 'Text', type: 'text', rows: 3, group: 'text'}),
    defineField({
      name: 'cards',
      title: 'Kort',
      type: 'array',
      group: 'cards',
      of: [{type: 'card'}],
      validation: (rule) => rule.required().min(1).max(8),
    }),
    ...sectionBasics('soft').map((field) => ({...field, group: 'layout'})),
    defineField({
      name: 'variant',
      title: 'Typ av kort',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Kort med ikon', value: 'icons'},
          {title: 'Kort med logotyp', value: 'logos'},
        ],
        layout: 'radio',
      },
      initialValue: 'icons',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', cards: 'cards', variant: 'variant', background: 'background'},
    prepare: ({title, cards, variant, background}) => ({
      title: title || (variant === 'logos' ? 'Kort med logotyp' : 'Kort med ikon'),
      subtitle: `${cards?.length ?? 0} kort · ${BACKGROUND_TITLES[background] ?? ''}`,
    }),
  },
})
