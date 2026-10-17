import {defineConfig} from 'sanity'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemaTypes'

const previewOrigin = 'http://127.0.0.1:8080'
const pilotSlug = 'cms-schema-validation-test'

const mainDocuments = defineDocuments([
  {
    route: '/project.html',
    type: 'project',
  },
])

const locations = {
  project: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (document) => ({
      locations: [
        {
          title: document?.title || 'Project preview',
          href: `/project.html?slug=${document?.slug || pilotSlug}&sanity-preview=1`,
        },
      ],
    }),
  }),
}

export default defineConfig({
  name: 'portfolio-bruno',
  title: 'Portfolio Bruno CMS',
  projectId: 'uj669d76',
  dataset: 'production',
  plugins: [
    structureTool({structure: (S) => S.list().title('Portfolio Bruno CMS').items([
      S.listItem().title('About & contact').id('aboutPage').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'aboutPage'),
    ])}),
    presentationTool({
      title: 'Portfolio preview',
      previewUrl: {
        initial: `${previewOrigin}/project.html?slug=${pilotSlug}&sanity-preview=1`,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [previewOrigin],
      resolve: {
        mainDocuments,
        locations,
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => option.templateId !== 'aboutPage'),
    actions: (actions, context) => context.schemaType === 'aboutPage'
      ? actions.filter((action) => action.action !== 'duplicate') : actions,
  },
})
