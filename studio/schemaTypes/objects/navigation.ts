import {defineField, defineType} from 'sanity'

/** One entry in a dropdown menu. */
export const navItem = defineType({
  name: 'navItem',
  title: 'Menyval',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'link', title: 'Länk', type: 'link', validation: (rule) => rule.required()}),
    defineField({
      name: 'highlight',
      title: 'Framhäv',
      type: 'boolean',
      description: 'Visas med fetstil i menyn.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label', linkType: 'link.linkType', path: 'link.path', url: 'link.url'},
    prepare({title, linkType, path, url}) {
      return {title, subtitle: linkType === 'external' ? url : path}
    },
  },
})

/** A top-level menu item with a dropdown. */
export const navGroup = defineType({
  name: 'navGroup',
  title: 'Menygrupp',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'variant',
      title: 'Utseende',
      type: 'string',
      options: {
        list: [
          {title: 'Vanlig', value: 'default'},
          {title: 'Knapp (grön, till exempel "Stöd oss")', value: 'cta'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'items',
      title: 'Menyval',
      type: 'array',
      of: [{type: 'navItem'}],
      validation: (rule) => rule.required().min(1).error('Lägg till minst ett menyval'),
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items', variant: 'variant'},
    prepare({title, items, variant}) {
      const count = Array.isArray(items) ? items.length : 0
      return {title, subtitle: `${count} menyval${variant === 'cta' ? ' · knapp' : ''}`}
    },
  },
})

/** A column of links in the footer. */
export const navColumn = defineType({
  name: 'navColumn',
  title: 'Sidfotskolumn',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'links',
      title: 'Länkar',
      type: 'array',
      of: [{type: 'cta'}],
      validation: (rule) => rule.required().min(1).error('Lägg till minst en länk'),
    }),
  ],
  preview: {
    select: {title: 'title', links: 'links'},
    prepare({title, links}) {
      return {title, subtitle: `${Array.isArray(links) ? links.length : 0} länkar`}
    },
  },
})
