import {fetchSharingProject, renderProjectSharingHtml} from '../lib/project-sharing.mjs'

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const slug = url.searchParams.get('slug')
  if (!['GET', 'HEAD'].includes(context.request.method) || !['/project', '/project.html'].includes(url.pathname) || !slug) return context.next()
  // Static-file validators cannot describe metadata that changes in Sanity.
  const requestHeaders = new Headers(context.request.headers)
  requestHeaders.delete('if-none-match')
  requestHeaders.delete('if-modified-since')
  const response = await context.next(new Request(context.request, {headers: requestHeaders}))
  if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return response
  const fallback = response.clone()

  try {
    const project = await fetchSharingProject(slug)
    if (!project) return response
    const html = renderProjectSharingHtml(await response.text(), project,
      context.env.SITE_URL || 'https://portfolio-bruno.pages.dev')
    const headers = new Headers(response.headers)
    headers.delete('content-length')
    headers.delete('etag')
    headers.delete('last-modified')
    headers.delete('content-encoding')
    headers.set('Cache-Control', 'no-store')
    return new Response(context.request.method === 'HEAD' ? null : html, {status: response.status, headers})
  } catch (error) {
    console.error('Unable to load project sharing metadata.', error)
    // Do not let crawlers cache a successful response without project metadata.
    const headers = new Headers(fallback.headers)
    headers.set('Retry-After', '60')
    headers.set('Cache-Control', 'no-store')
    // Browsers can still render the existing frontend/fallback from this HTML.
    return new Response(fallback.body, {status: 503, headers})
  }
}
