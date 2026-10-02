import imageUrlBuilder from '@sanity/image-url'
import {createDataAttribute, enableVisualEditing} from '@sanity/visual-editing'

const config = {
  projectId: 'uj669d76',
  dataset: 'production',
  baseUrl: 'http://127.0.0.1:3333',
}

const imageBuilder = imageUrlBuilder({
  projectId: config.projectId,
  dataset: config.dataset,
})

export function sanityDataAttribute({id, type = 'project', path}) {
  return createDataAttribute({...config, id, type, path}).toString()
}

export function sanityImageUrl(image, {width, height} = {}) {
  if (!image?.asset) return ''

  let builder = imageBuilder.image(image).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder.url()
}

export function startVisualEditing() {
  return enableVisualEditing()
}
