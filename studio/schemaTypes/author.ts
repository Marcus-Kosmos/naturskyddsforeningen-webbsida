import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Skribent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Roll / Titel',
      type: 'string',
      description: 'T.ex. "Klimatexpert" eller "Kommunikationsansvarig"',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      title: 'Kort bio',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      description: 'Obs: webbplatsens data är offentlig. Skriv bara in en adress som får vara synlig för alla; den visas inte på webbplatsen men kan läsas via API:et.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
