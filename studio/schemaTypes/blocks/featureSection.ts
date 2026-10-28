import {defineField, defineType} from 'sanity'
import {BACKGROUND_TITLES, ICON_OPTIONS, sectionBasics} from './options'

const isStacked = (context: {parent?: unknown}) => (context.parent as {layout?: string} | undefined)?.layout === 'stacked'

export default defineType({
  name: 'featureSection',
  title: 'Textavsnitt med bild',
  type: 'object',
  description:
    'Rubrik, text och bild, med valfria punkter, knappar, nyckeltal och kommande aktiviteter. Används för de flesta avsnitt på startsidan.',
  groups: [
    {name: 'text', title: 'Text', default: true},
    {name: 'media', title: 'Bild'},
    {name: 'items', title: 'Punkter'},
    {name: 'links', title: 'Knappar'},
    {name: 'layout', title: 'Utseende'},
  ],
  fields: [
    // ── Text ───────────────────────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Etikett',
      type: 'string',
      group: 'text',
      description: 'Liten etikett ovanför rubriken, till exempel "Klimatkris".',
    }),
    defineField({
      name: 'eyebrowIcon',
      title: 'Ikon bredvid etiketten',
      type: 'string',
      group: 'text',
      options: {list: ICON_OPTIONS},
      description: 'Frivillig. Visas i en grön cirkel.',
    }),
    defineField({
      name: 'eyebrowImage',
      title: 'Logotyp bredvid etiketten',
      type: 'captionedImage',
      group: 'text',
      description: 'Frivillig, till exempel tidningens logotyp. Bildtexten används inte.',
    }),
    defineField({
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      group: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'text',
      rows: 5,
      group: 'text',
      description:
        'Lämna en tom rad mellan stycken. Kan innehålla fakta-taggar, till exempel {{localAssociations}} (se Webbplatsinställningar > Fakta).',
    }),

    // ── Bild ───────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      group: 'media',
      of: [{type: 'captionedImage'}],
      description:
        'En bild visas som den är, flera bilder visas som ett bildspel. Rekommenderat: liggande bilder, minst 1200 px breda.',
      validation: (rule) => rule.max(8),
    }),

    // ── Punkter ────────────────────────────────────────────
    defineField({
      name: 'itemsHeading',
      title: 'Rubrik för punkterna',
      type: 'string',
      group: 'items',
      description: 'Visas ovanför punkterna i den stora rutan, till exempel "Vårt klimatarbete".',
      hidden: (context) => !isStacked(context),
    }),
    defineField({
      name: 'itemsStyle',
      title: 'Utseende på punkterna',
      type: 'string',
      group: 'items',
      options: {
        list: [
          {title: 'Lista med ikoner', value: 'list'},
          {title: 'Vita kort', value: 'cards'},
          {title: 'Rutnät med två kolumner', value: 'tiles'},
          {title: 'Enkla punkter (bara text)', value: 'bullets'},
        ],
      },
      initialValue: 'list',
      hidden: isStacked,
    }),
    defineField({
      name: 'items',
      title: 'Punkter',
      type: 'array',
      group: 'items',
      of: [{type: 'featureItem'}],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'stats',
      title: 'Nyckeltal',
      type: 'array',
      group: 'items',
      of: [{type: 'stat'}],
      description: 'Visas som rutor under bilden, upp till fyra.',
      validation: (rule) => rule.max(4),
      hidden: (context) => !isStacked(context),
    }),
    defineField({
      name: 'showEvents',
      title: 'Visa kommande aktiviteter',
      type: 'boolean',
      group: 'items',
      description:
        'Visar de närmaste kommande aktiviteterna som är markerade som "Lokalt evenemang" under Evenemang.',
      initialValue: false,
    }),
    defineField({
      name: 'eventsHeading',
      title: 'Rubrik för aktiviteterna',
      type: 'string',
      group: 'items',
      hidden: ({parent}) => !parent?.showEvents,
    }),

    // ── Knappar ────────────────────────────────────────────
    defineField({
      name: 'links',
      title: 'Knappar och länkar',
      type: 'array',
      group: 'links',
      of: [{type: 'blockCta'}],
      description: 'Länkar som saknar mål visas inte.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'showShare',
      title: 'Visa delningsknappar',
      type: 'boolean',
      group: 'links',
      description: 'Delar en länk direkt till det här avsnittet. Kräver ett ankare.',
      initialValue: false,
    }),

    // ── Utseende ───────────────────────────────────────────
    ...sectionBasics().map((field) => ({...field, group: 'layout'})),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Text och bild bredvid varandra', value: 'split'},
          {title: 'Rubrik överst, bild i full bredd, punkter i ruta', value: 'stacked'},
        ],
        layout: 'radio',
      },
      initialValue: 'split',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaSide',
      title: 'Bildens plats',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Höger', value: 'right'},
          {title: 'Vänster', value: 'left'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: isStacked,
    }),
    defineField({
      name: 'mediaFirstOnMobile',
      title: 'Visa bilden först på mobil',
      type: 'boolean',
      group: 'layout',
      description: 'Som standard kommer texten först på små skärmar.',
      initialValue: false,
      hidden: isStacked,
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow', background: 'background', media: 'images.0'},
    prepare: ({title, subtitle, background, media}) => ({
      title,
      subtitle: [subtitle, BACKGROUND_TITLES[background]].filter(Boolean).join(' · '),
      media,
    }),
  },
})
