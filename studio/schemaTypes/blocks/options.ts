import {defineField} from 'sanity'

/**
 * Icons editors can pick for items, cards and stats. The frontend maps each
 * key to a lucide icon (src/lib/cms/icons.tsx): keep the two lists in sync.
 */
export const ICON_OPTIONS = [
  {title: 'Löv', value: 'leaf'},
  {title: 'Träd', value: 'trees'},
  {title: 'Gran', value: 'tree-pine'},
  {title: 'Fjäll', value: 'mountain'},
  {title: 'Fågel', value: 'bird'},
  {title: 'Termometer', value: 'thermometer'},
  {title: 'Vind', value: 'wind'},
  {title: 'Vattendroppar', value: 'droplets'},
  {title: 'Shoppingpåse', value: 'shopping-bag'},
  {title: 'Glödlampa', value: 'lightbulb'},
  {title: 'Återvinning', value: 'recycle'},
  {title: 'Utmärkelse', value: 'award'},
  {title: 'Sköld', value: 'shield'},
  {title: 'Sköld med bock', value: 'shield-check'},
  {title: 'Människor', value: 'users'},
  {title: 'Hjärta', value: 'heart'},
  {title: 'Måltavla', value: 'target'},
  {title: 'Pratbubbla', value: 'message-circle'},
  {title: 'Kalender', value: 'calendar'},
  {title: 'Jordglob', value: 'globe'},
  {title: 'Bok', value: 'book-open'},
  {title: 'Kartnål', value: 'map-pin'},
]

export const BACKGROUND_OPTIONS = [
  {title: 'Vit', value: 'white'},
  {title: 'Dämpad (grå i ljust läge)', value: 'muted'},
  {title: 'Ljusgrå', value: 'soft'},
  {title: 'Ingen (sidans bakgrund)', value: 'plain'},
]

/** Fields every homepage section starts with. */
export const sectionBasics = (defaultBackground = 'white') => [
  defineField({
    name: 'anchor',
    title: 'Ankare',
    type: 'string',
    description:
      'Gör det möjligt att länka direkt till avsnittet, till exempel "klimat" ger adressen /#klimat. Små bokstäver, siffror och bindestreck.',
    validation: (rule) =>
      rule.custom((value) =>
        !value || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)
          ? true
          : 'Använd bara små bokstäver (a–z), siffror och bindestreck, till exempel "bra-miljoval".',
      ),
  }),
  defineField({
    name: 'background',
    title: 'Bakgrund',
    type: 'string',
    description: 'Växla mellan vit och dämpad bakgrund så att avsnitten skiljer sig åt.',
    options: {list: BACKGROUND_OPTIONS, layout: 'radio'},
    initialValue: defaultBackground,
    validation: (rule) => rule.required(),
  }),
]

export const BACKGROUND_TITLES: Record<string, string> = Object.fromEntries(
  BACKGROUND_OPTIONS.map((option) => [option.value, option.title]),
)
