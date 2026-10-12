import {defineField, defineType} from 'sanity'

/** A button or text link in a section. A link that leads nowhere is simply not shown. */
export default defineType({
  name: 'blockCta',
  title: 'Knapp / länk',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'link', title: 'Länk', type: 'link', validation: (rule) => rule.required()}),
    defineField({
      name: 'style',
      title: 'Utseende',
      type: 'string',
      options: {
        list: [
          {title: 'Knapp (grön)', value: 'primary'},
          {title: 'Knapp (kantad)', value: 'secondary'},
          {title: 'Textlänk med pil', value: 'text'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', style: 'style', linkType: 'link.linkType', path: 'link.path', url: 'link.url'},
    prepare({title, style, linkType, path, url}) {
      const target = linkType === 'external' ? url : linkType === 'action' ? 'Öppnar lokalföreningar' : path
      return {title, subtitle: `${style === 'text' ? 'Textlänk' : style === 'secondary' ? 'Kantad knapp' : 'Knapp'} → ${target ?? ''}`}
    },
  },
})
