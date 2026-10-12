import {defineField, defineType} from 'sanity'
import {ICON_OPTIONS} from '../blocks/options'

/** A card in a card grid: an icon card, or a card with a logo (for example a partner). */
export default defineType({
  name: 'card',
  title: 'Kort',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      options: {list: ICON_OPTIONS},
      description: 'Används av kort med ikon.',
    }),
    defineField({
      name: 'tone',
      title: 'Färg på ikonen',
      type: 'string',
      options: {
        list: [
          {title: 'Grön', value: 'green'},
          {title: 'Neutral (grå)', value: 'neutral'},
        ],
        layout: 'radio',
      },
      initialValue: 'green',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logotyp (ljust läge)',
      type: 'captionedImage',
      description: 'Används av kort med logotyp. Ska synas mot en ljus bakgrund.',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logotyp (mörkt läge)',
      type: 'captionedImage',
      description: 'Ska synas mot en mörk bakgrund. Om den saknas används logotypen för ljust läge.',
    }),
    defineField({
      name: 'link',
      title: 'Länk',
      type: 'link',
      description: 'Frivillig. Utan länk visas kortet utan klickyta.',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Länktext',
      type: 'string',
      description: 'Till exempel "Läs mer". Visas bara på kort med logotyp och länk.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
  },
})
