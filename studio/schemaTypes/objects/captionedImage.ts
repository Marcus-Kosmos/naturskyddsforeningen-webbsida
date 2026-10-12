import {defineField, defineType} from 'sanity'

/** An image with alt text for screen readers and an optional caption. */
export default defineType({
  name: 'captionedImage',
  title: 'Bild',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternativtext',
      type: 'string',
      description: 'Beskriv vad bilden visar, för den som inte ser den.',
      validation: (rule) => rule.required().error('Beskriv bilden för skärmläsare.'),
    }),
    defineField({name: 'caption', title: 'Bildtext', type: 'string', description: 'Visas under bilden. Frivillig.'}),
  ],
})
