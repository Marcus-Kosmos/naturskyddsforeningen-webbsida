import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Webbplatsinställningar',
  type: 'document',
  // Singleton — prevent creating more than one
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'contact', title: 'Kontakt'},
    {name: 'social', title: 'Sociala medier'},
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
  ],
})
