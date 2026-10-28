import {defineField, defineType} from 'sanity'
import {BACKGROUND_TITLES, sectionBasics} from './options'

export default defineType({
  name: 'labelGuideSection',
  title: 'Märkningsguide',
  type: 'object',
  description:
    'Den sökbara guiden till miljömärkningar. Här redigerar du texterna runt guiden; själva märkningarna flyttas till Studio i ett senare steg.',
  fields: [
    defineField({name: 'eyebrow', title: 'Etikett', type: 'string'}),
    defineField({name: 'heading', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Text', type: 'text', rows: 3}),
    defineField({
      name: 'infoHeading',
      title: 'Rubrik för förklaringsrutan',
      type: 'string',
      description: 'Rutan längst ned i guiden, till exempel "Hur använder jag guiden?".',
    }),
    defineField({
      name: 'infoItems',
      title: 'Förklaringar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'labelInfoItem',
          title: 'Förklaring',
          fields: [
            defineField({
              name: 'status',
              title: 'Typ av märkning',
              type: 'string',
              options: {
                list: [
                  {title: 'Rekommenderade', value: 'recommended'},
                  {title: 'Med begränsningar', value: 'limited'},
                  {title: 'Inte tillräckliga', value: 'insufficient'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'label', title: 'Fet text', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Text', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'text'}},
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    ...sectionBasics(),
  ],
  preview: {
    select: {title: 'heading', background: 'background'},
    prepare: ({title, background}) => ({title, subtitle: `Märkningsguide · ${BACKGROUND_TITLES[background] ?? ''}`}),
  },
})
