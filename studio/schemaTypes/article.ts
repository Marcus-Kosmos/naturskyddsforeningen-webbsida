import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Skribent',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'excerpt',
      title: 'Ingress',
      description: 'Kort sammanfattning som visas i nyhetslistan.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Bild',
      description: 'Artikelbild. Rekommenderat format: liggande, minst 1200×675 px (16:9). Bilden beskärs automatiskt i nyhetslistan.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativtext',
          type: 'string',
          description: 'Beskriv bilden för skärmläsare.',
        }),
        defineField({
          name: 'caption',
          title: 'Bildtext',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Klimat', value: 'Klimat'},
          {title: 'Biologisk mångfald', value: 'Biologisk mångfald'},
          {title: 'Hav och vatten', value: 'Hav och vatten'},
          {title: 'Skog', value: 'Skog'},
          {title: 'Politik', value: 'Politik'},
          {title: 'Kampanj', value: 'Kampanj'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Utvald artikel',
      description: 'Utvalda artiklar visas större i toppen av nyhetssidan.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publiceringsdatum',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Brödtext',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Rubrik 2', value: 'h2'},
            {title: 'Rubrik 3', value: 'h3'},
            {title: 'Rubrik 4', value: 'h4'},
            {title: 'Citat', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Fet', value: 'strong'},
              {title: 'Kursiv', value: 'em'},
              {title: 'Understruken', value: 'underline'},
              {title: 'Genomstruken', value: 'strike-through'},
              {title: 'Kod', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Länk',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({allowRelative: true, scheme: ['https', 'http', 'mailto']}),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Öppna i ny flik',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alternativtext'},
            {name: 'caption', type: 'string', title: 'Bildtext'},
          ],
        },
        {
          name: 'callout',
          title: 'Faktaruta',
          type: 'object',
          fields: [
            {name: 'heading', type: 'string', title: 'Rubrik'},
            {name: 'text', type: 'text', title: 'Text', rows: 4},
          ],
          preview: {
            select: {title: 'heading', subtitle: 'text'},
          },
        },
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta-titel',
          type: 'string',
          description: 'Lämna tom för att använda artikelns titel. Max 60 tecken.',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta-beskrivning',
          type: 'text',
          rows: 2,
          description: 'Lämna tom för att använda ingressen. Max 160 tecken.',
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Publiceringsdatum, nyast',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
