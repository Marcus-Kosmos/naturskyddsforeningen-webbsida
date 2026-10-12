import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Startsida',
  type: 'document',
  // Singleton (id "homePage"); see structure.ts and sanity.config.ts.
  groups: [
    {name: 'hero', title: 'Hjältesektionen'},
    {name: 'sections', title: 'Avsnitt'},
    {name: 'seo', title: 'Sökmotorer'},
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Rubrik',
      type: 'string',
      group: 'hero',
      description: 'Stor rubrik mitt i hjältesektionen.',
      initialValue: 'Tillsammans skapar vi en hållbar framtid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Underrubrik',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Vi arbetar för att skydda naturens mångfald, stoppa klimatkrisen och skapa ett rättvist samhälle. Gör skillnad idag.',
    }),
    defineField({
      name: 'heroPrimaryBtn',
      title: 'Primär knapp – text',
      type: 'string',
      group: 'hero',
      initialValue: 'Bli medlem',
    }),
    defineField({
      name: 'heroSecondaryBtn',
      title: 'Sekundär knapp – text',
      type: 'string',
      group: 'hero',
      initialValue: 'Läs mer om föreningen',
    }),
    defineField({
      name: 'heroPrimaryLink',
      title: 'Primär knapp – länk',
      type: 'link',
      group: 'hero',
      description: 'Utan länk visas ingen primär knapp.',
    }),
    defineField({
      name: 'heroSecondaryLink',
      title: 'Sekundär knapp – länk',
      type: 'link',
      group: 'hero',
      description: 'Utan länk visas ingen sekundär knapp.',
    }),
    defineField({
      name: 'heroImages',
      title: 'Bildkarusell',
      description:
        'Bilder som växlar i bakgrunden. Ladda upp 2–4 bilder för bäst effekt. ' +
        'Rekommenderat format: liggande (landskap), minst 1920×1080 px, 16:9. ' +
        'Undvik bilder med viktig information nära kanterna – bilden beskärs på mobil.',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt-text',
              description: 'Beskriv bilden för skärmläsare.',
            },
          ],
          validation: (Rule: any) =>
            Rule.custom(async (value: any, context: any) => {
              if (!value?.asset?._ref) return true; // no image uploaded yet
              try {
                const meta = await context.getClient({apiVersion: '2024-01-01'}).fetch(
                  `*[_id == $ref][0].metadata.dimensions`,
                  {ref: value.asset._ref},
                )
                if (!meta) return true; // metadata not yet available
                if (meta.width < 1920) {
                  return `Bilden är ${meta.width}px bred – minst 1920px krävs för bäst kvalitet.`
                }
                if (meta.height < 1080) {
                  return `Bilden är ${meta.height}px hög – minst 1080px krävs för bäst kvalitet.`
                }
                const ratio = meta.width / meta.height
                if (ratio < 1.5) {
                  return `Bilden verkar vara stående (${meta.width}×${meta.height}). Använd en liggande bild (16:9) för hjältesektionen.`
                }
              } catch {
                return true; // network error — don't block the editor
              }
              return true
            }),
        },
      ],
      validation: (Rule) => Rule.min(1).max(6).error('Lägg till minst 1 och max 6 bilder.'),
    }),
    defineField({
      name: 'sections',
      title: 'Avsnitt på startsidan',
      type: 'array',
      group: 'sections',
      description:
        'Avsnitten visas i den här ordningen, under hjältesektionen och ovanför medlemsrutan. Dra i handtaget för att ändra ordning.',
      of: [
        {type: 'featureSection'},
        {type: 'cardGridSection'},
        {type: 'statsSection'},
        {type: 'labelGuideSection'},
        {type: 'newsEventsSection'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Sökmotorer och delning',
      type: 'object',
      group: 'seo',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Sidtitel',
          type: 'string',
          description: 'Visas i webbläsarfliken. "– Naturskyddsföreningen" läggs till automatiskt. Utan titel används standardtiteln.',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Beskrivning',
          type: 'text',
          rows: 3,
          description: 'Kort beskrivning som sökmotorer kan visa, helst under 160 tecken.',
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Startsida'}),
  },
})
