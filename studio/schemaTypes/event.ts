import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Evenemang',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Startar',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Slutar',
      type: 'datetime',
      description: 'Valfritt. Lämna tomt för evenemang som bara har en starttid.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const start = (context.document as {startDate?: string} | undefined)?.startDate
          if (value && start && new Date(value) < new Date(start)) return 'Måste vara efter starttiden'
          return true
        }),
    }),
    defineField({
      name: 'location',
      title: 'Plats',
      type: 'string',
      description: 'Till exempel "Tyresta nationalpark", "Online" eller en ort.',
    }),
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: ['Utflykt', 'Workshop', 'Inventering', 'Webbinarium', 'Föredrag', 'Annat'],
      },
    }),
    defineField({
      name: 'local',
      title: 'Lokalt evenemang',
      description: 'Arrangeras av en lokalförening. Endast lokala evenemang visas i avsnitten "Nära dig" på startsidan.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Mer information',
      description: 'Valfri länk, till exempel till anmälan.',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'title', startDate: 'startDate', location: 'location'},
    prepare({title, startDate, location}) {
      const date = startDate
        ? new Date(startDate).toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'})
        : 'Inget datum'
      return {title, subtitle: [date, location].filter(Boolean).join(' · ')}
    },
  },
  orderings: [
    {title: 'Startdatum, kommande först', name: 'startDateAsc', by: [{field: 'startDate', direction: 'asc'}]},
    {title: 'Startdatum, senaste först', name: 'startDateDesc', by: [{field: 'startDate', direction: 'desc'}]},
  ],
})
