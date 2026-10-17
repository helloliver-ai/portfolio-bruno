import {projectSharingQuery, sanityConfig} from '../studio/preview/sanity.shared.js'

export async function fetchSharingProject(slug, fetcher = fetch) {
  const url = new URL(`https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}`)
  url.searchParams.set('query', projectSharingQuery)
  url.searchParams.set('$slug', JSON.stringify(slug))
  url.searchParams.set('perspective', 'published')
  const response = await fetcher(url, {signal: AbortSignal.timeout(8000)})
  if (!response.ok) throw new Error(`Sanity sharing request failed: ${response.status}`)
  return (await response.json()).result
}

export function socialImageUrl(project) {
  const images = [project.seo?.shareImage, project.thumbnail?.image, project.cover?.image]
  for (const image of images) {
    let source = image?.asset?.url
    if (!source) {
      const match = image?.asset?._ref?.match(/^image-(.+)-(\d+x\d+)-([a-z0-9]+)$/)
      if (match) source = `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${match[1]}-${match[2]}.${match[3]}`
    }
    if (!source) continue
    const url = new URL(source)
    if (url.protocol !== 'https:') continue
    // JPEG instead of automatic AVIF/WebP negotiation for social crawlers.
    url.searchParams.set('w', '1200')
    url.searchParams.set('h', '630')
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('fm', 'jpg')
    url.searchParams.set('q', '80')
    return url.toString()
  }
  return ''
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]))
}

export function renderProjectSharingHtml(html, project, origin) {
  const canonical = new URL('/project', origin)
  canonical.searchParams.set('slug', project.slug)
  const title = `${project.title || 'Projeto'} | Bruno Oliveira`
  const projectType = typeof project.projectType === 'string' ? project.projectType
    : [project.projectType?.pt, project.projectType?.en].filter(Boolean).join(' / ')
  const description = project.seo?.metaDescription?.trim() || [project.title, project.client, projectType].filter(Boolean).join(' — ')
  const image = socialImageUrl(project)
  const tags = [
    ['property', 'og:title', title], ['property', 'og:description', description],
    ['property', 'og:url', canonical.href], ['property', 'og:type', 'website'],
    ['name', 'twitter:card', image ? 'summary_large_image' : 'summary'],
    ['name', 'twitter:title', title], ['name', 'twitter:description', description],
  ]
  if (image) tags.push(
    ['property', 'og:image', image], ['property', 'og:image:secure_url', image],
    ['property', 'og:image:type', 'image/jpeg'], ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'], ['property', 'og:image:alt', project.title || ''],
    ['name', 'twitter:image', image], ['name', 'twitter:image:alt', project.title || ''],
  )
  const social = [`<link rel="canonical" href="${escapeHtml(canonical.href)}">`,
    ...tags.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`)].join('\n  ')
  return html.replace(/<title>[^<]*<\/title>/i, () => `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/i, () => `<meta name="description" content="${escapeHtml(description)}">`)
    .replace('<!-- project-sharing -->', () => social)
}
