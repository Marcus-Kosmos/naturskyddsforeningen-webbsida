import {defineField, defineType} from 'sanity'

/** A button or text link: a label and where it goes. */
export default defineType({
  name: 'cta',
  title: 'Knapp / länk',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'link', title: 'Länk', type: 'link', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'label', linkType: 'link.linkType', path: 'link.path', url: 'link.url'},
    prepare({title, linkType, path, url}) {
      return {title, subtitle: linkType === 'external' ? url : path}
    },
  },
})
