import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {SINGLETONS, structure} from './structure'

export default defineConfig({
  name: 'naturskyddsforeningen',
  title: 'Naturskyddsföreningen',

  projectId: 'nmtsuoja',
  dataset: 'production',

  plugins: [structureTool({structure}), media(), visionTool()],

  schema: {
    types: schemaTypes,
    // No "new document" template for singletons.
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    // Hide singletons from the global "create new" menu.
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global' ? prev.filter((option) => !SINGLETONS.includes(option.templateId)) : prev,
    // Singletons can be edited and published, but not deleted, duplicated or unpublished.
    actions: (prev, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
})
