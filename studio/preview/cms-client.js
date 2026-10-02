import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

import {projectQuery, projectsQuery, sanityConfig} from './sanity.shared.js'

const client = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: 'published',
  stega: false,
})

const imageBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
})

export function sanityDataAttribute() {
  return ''
}

export function sanityImageUrl(image, {width, height} = {}) {
  if (!image?.asset) return ''

  let builder = imageBuilder.image(image).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder.url()
}

export async function fetchPublishedProjects() {
  return client.fetch(projectsQuery, {}, {cache: 'no-store'})
}

export async function fetchPublishedProject(slug) {
  return client.fetch(projectQuery, {slug}, {cache: 'no-store'})
}
