import {defineField, defineType} from 'sanity'

const FACT_TAGS =
  'Tillgängliga taggar: {{members}}, {{localAssociations}}, {{years}}, {{braMiljovalProducts}}, {{magazineIssues}}, {{year}}.'

export default defineType({
  name: 'siteSettings',
  title: 'Webbplatsinställningar',
  type: 'document',
  // Singleton (id "siteSettings"); see structure.ts and sanity.config.ts.
  groups: [
    {name: 'contact', title: 'Kontakt'},
    {name: 'social', title: 'Sociala medier'},
    {name: 'facts', title: 'Fakta'},
    {name: 'membership', title: 'Medlemskap'},
    {name: 'banner', title: 'Banner'},
    {name: 'footer', title: 'Sidfot'},
    {name: 'notFound', title: 'Sidan hittades inte'},
  ],
  fields: [
    defineField({
      name: 'tagline',
      title: 'Beskrivning (sidfot)',
      type: 'string',
      description: 'Kort text som visas under logotypen i sidfoten.',
      initialValue: 'Sveriges största miljöorganisation sedan 1909.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-postadress',
      type: 'string',
      group: 'contact',
      initialValue: 'info@naturskyddsforeningen.se',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefonnummer',
      type: 'string',
      group: 'contact',
      initialValue: '08-702 65 00',
    }),
    defineField({
      name: 'contactAddressLine1',
      title: 'Postadress (rad 1)',
      type: 'string',
      group: 'contact',
      initialValue: 'Box 4625',
    }),
    defineField({
      name: 'contactAddressLine2',
      title: 'Postadress (rad 2)',
      type: 'string',
      group: 'contact',
      initialValue: '116 91 Stockholm',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook-länk',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram-länk',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube-länk',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X-länk',
      type: 'url',
      group: 'social',
    }),

    // ── Fakta ────────────────────────────────────────────────
    defineField({
      name: 'facts',
      title: 'Fakta om föreningen',
      type: 'object',
      group: 'facts',
      description:
        'Siffror som används på flera ställen. Ändra här så uppdateras de överallt. I texter skriver du till exempel {{members}} för att visa medlemsantalet.',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'members',
          title: 'Antal medlemmar',
          type: 'string',
          description: 'Taggen {{members}}. Skriv med mellanrum som tusentalsavgränsare, till exempel 226 000.',
        }),
        defineField({
          name: 'localAssociations',
          title: 'Antal lokalföreningar',
          type: 'string',
          description: 'Taggen {{localAssociations}}.',
        }),
        defineField({
          name: 'foundedYear',
          title: 'Grundat år',
          type: 'number',
          description: 'Används för att räkna ut antal år, taggen {{years}}.',
          validation: (rule) => rule.integer().min(1800).max(2100),
        }),
        defineField({
          name: 'braMiljovalProducts',
          title: 'Antal Bra Miljöval-produkter',
          type: 'string',
          description: 'Taggen {{braMiljovalProducts}}.',
        }),
        defineField({
          name: 'magazineIssuesPerYear',
          title: 'Nummer per år (Sveriges Natur)',
          type: 'number',
          description: 'Taggen {{magazineIssues}}.',
          validation: (rule) => rule.integer().min(1).max(52),
        }),
      ],
    }),

    // ── Medlemskap ───────────────────────────────────────────
    defineField({
      name: 'membershipCta',
      title: 'Medlemsruta ("Bli medlem idag")',
      type: 'object',
      group: 'membership',
      description: `Den gröna rutan som visas längst ned på de flesta sidor. ${FACT_TAGS}`,
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Rubrik', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        defineField({
          name: 'benefits',
          title: 'Fördelar',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Visas som en bockad lista.',
        }),
        defineField({name: 'primaryCta', title: 'Primär knapp', type: 'cta'}),
        defineField({name: 'secondaryCta', title: 'Sekundär knapp', type: 'cta'}),
        defineField({
          name: 'stats',
          title: 'Nyckeltal',
          type: 'array',
          of: [{type: 'stat'}],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),

    // ── Banner ───────────────────────────────────────────────
    defineField({
      name: 'stickyBanner',
      title: 'Banner längst ned ("Bli medlem idag!")',
      type: 'object',
      group: 'banner',
      description: 'Visas längst ned på skärmen när besökaren har scrollat en bit. Besökaren kan stänga den.',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'enabled',
          title: 'Visa bannern',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({name: 'headline', title: 'Rubrik', type: 'string'}),
        defineField({name: 'subline', title: 'Underrubrik', type: 'string', description: 'Döljs på små skärmar.'}),
        defineField({name: 'buttonLabel', title: 'Knapptext', type: 'string'}),
        defineField({name: 'link', title: 'Knappens länk', type: 'link'}),
        defineField({
          name: 'showAfterPx',
          title: 'Visa efter scroll (pixlar)',
          type: 'number',
          initialValue: 800,
          validation: (rule) => rule.integer().min(0).max(5000),
        }),
      ],
    }),

    // ── Sidfot ───────────────────────────────────────────────
    defineField({
      name: 'footer',
      title: 'Sidfot',
      type: 'object',
      group: 'footer',
      description: `Texter i sidfoten. Länkkolumnerna redigeras under "Navigation & sidfot". ${FACT_TAGS}`,
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'copyright',
          title: 'Upphovsrättsrad',
          type: 'string',
          description: 'Till exempel "© {{year}} Naturskyddsföreningen".',
        }),
        defineField({name: 'orgNumber', title: 'Organisationsnummer', type: 'string'}),
        defineField({name: 'associationsHeading', title: 'Lokalförening: rubrik', type: 'string'}),
        defineField({name: 'associationsText', title: 'Lokalförening: text', type: 'string'}),
        defineField({name: 'associationsButton', title: 'Lokalförening: knapptext', type: 'string'}),
        defineField({
          name: 'legalLinks',
          title: 'Juridiska länkar',
          type: 'array',
          of: [{type: 'cta'}],
          description: 'Till exempel integritetspolicy och cookies. Visas längst ned i sidfoten.',
        }),
      ],
    }),

    // ── Sidan hittades inte ──────────────────────────────────
    defineField({
      name: 'notFound',
      title: 'Sidan hittades inte (404)',
      type: 'object',
      group: 'notFound',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Rubrik', type: 'string'}),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        defineField({name: 'primaryCta', title: 'Primär knapp', type: 'cta'}),
        defineField({name: 'secondaryCta', title: 'Sekundär knapp', type: 'cta'}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Webbplatsinställningar'}
    },
  },
})
