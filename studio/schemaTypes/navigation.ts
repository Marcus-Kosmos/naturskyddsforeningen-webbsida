import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation & sidfot',
  type: 'document',
  // Singleton: created once (id "navigation"); see structure.ts and sanity.config.ts.
  groups: [
    {name: 'header', title: 'Huvudmeny', default: true},
    {name: 'footer', title: 'Sidfot'},
  ],
  fields: [
    defineField({
      name: 'groups',
      title: 'Huvudmeny',
      type: 'array',
      group: 'header',
      description: 'Menyn högst upp på sidan. Varje grupp blir en rullgardinsmeny.',
      of: [{type: 'navGroup'}],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Länkkolumner i sidfoten',
      type: 'array',
      group: 'footer',
      of: [{type: 'navColumn'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Navigation & sidfot'}
    },
  },
})
