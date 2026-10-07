import {defineField, defineType} from 'sanity'

/** A headline number with a label, for example "270+" / "Lokalföreningar". */
export default defineType({
  name: 'stat',
  title: 'Nyckeltal',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Värde',
      type: 'string',
      description: 'Kan innehålla fakta-taggar, till exempel {{members}}, {{localAssociations}}, {{years}}. Se fliken Fakta i Webbplatsinställningar.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'label', title: 'Text', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
