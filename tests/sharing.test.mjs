import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import test from 'node:test'
import {fetchSharingProject, renderProjectSharingHtml, socialImageUrl} from '../lib/project-sharing.mjs'
import {onRequest} from '../functions/_middleware.js'

const require = createRequire(new URL('../studio/package.json', import.meta.url))
const {JSDOM} = require('jsdom')
const template = await readFile(new URL('../project.html', import.meta.url), 'utf8')
const image = (hash) => ({asset: {_ref: `image-${hash}-1600x1600-jpg`}})
const project = {slug: 'example', title: 'Design & "arte" <script>', client: 'Cliente', seo: {metaDescription: 'Descrição & detalhes', shareImage: image('share')}, thumbnail: {image: image('thumbnail')}, cover: {image: image('cover')}}

test('sharing image resolves shareImage, thumbnail, then cover as an absolute JPEG', () => {
  assert(socialImageUrl(project).includes('/share-'))
  assert(socialImageUrl({...project, seo: null}).includes('/thumbnail-'))
  assert(socialImageUrl({...project, seo: null, thumbnail: null}).includes('/cover-'))
  const url = new URL(socialImageUrl(project))
  assert.equal(url.protocol, 'https:')
  for (const [key, value] of [['w', '1200'], ['h', '630'], ['fm', 'jpg']]) assert.equal(url.searchParams.get(key), value)
  assert.equal(socialImageUrl({}), '')
})

test('crawlers get project metadata in raw HTML, with escaping and canonical cleanup', () => {
  const dom = new JSDOM(renderProjectSharingHtml(template, project, 'https://portfolio-bruno.pages.dev'))
  const doc = dom.window.document
  assert.equal(doc.title, `${project.title} | Bruno Oliveira`)
  assert.equal(doc.querySelectorAll('title').length, 1)
  assert.equal(doc.querySelector('meta[property="og:description"]').content, project.seo.metaDescription)
  assert.equal(doc.querySelector('meta[name="description"]').content, project.seo.metaDescription)
  assert.equal(doc.querySelector('meta[property="og:type"]').content, 'website')
  assert.equal(doc.querySelector('meta[name="twitter:card"]').content, 'summary_large_image')
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://portfolio-bruno.pages.dev/project?slug=example')
  assert.equal(doc.querySelector('meta[property="og:url"]').content, doc.querySelector('link[rel="canonical"]').href)
  assert.deepEqual([...doc.querySelectorAll('script')].map((script) => script.getAttribute('src')), ['page-ready.js', 'script.js'])
  dom.window.close()
})

test('published query carries the slug safely and never uses a private token', async () => {
  const slug = 'quoted "slug"'
  await fetchSharingProject(slug, async (url, options) => {
    assert.equal(url.searchParams.get('perspective'), 'published')
    assert.equal(JSON.parse(url.searchParams.get('$slug')), slug)
    assert.equal(options.headers, undefined)
    return Response.json({result: project})
  })
})

test('Pages middleware returns metadata on GET, keeps redirects/assets intact, and signals source failures', async (t) => {
  const errorLog = t.mock.method(console, 'error', () => {})
  const original = globalThis.fetch
  globalThis.fetch = async () => Response.json({result: project})
  try {
    const context = {request: new Request('https://portfolio-bruno.pages.dev/project?slug=example&cms=1', {headers: {'if-none-match': 'stale', 'if-modified-since': 'yesterday'}}), env: {}, next: async (request) => {
      assert.equal(request.headers.get('if-none-match'), null)
      assert.equal(request.headers.get('if-modified-since'), null)
      return new Response(template, {headers: {'Content-Type': 'text/html', etag: 'stale', 'last-modified': 'yesterday'}})
    }}
    const response = await onRequest(context)
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('etag'), null)
    assert.equal(response.headers.get('last-modified'), null)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    assert((await response.text()).includes('og:image'))
    const redirect = new Response(null, {status: 301, headers: {location: '/project?slug=example'}})
    assert.equal(await onRequest({...context, next: async () => redirect}), redirect)
    const asset = new Response('css', {headers: {'content-type': 'text/css'}})
    assert.equal(await onRequest({...context, request: new Request('https://portfolio-bruno.pages.dev/style.css'), next: async () => asset}), asset)
    globalThis.fetch = async () => new Response('', {status: 500})
    const failure = await onRequest(context)
    assert.equal(failure.status, 503)
    assert.equal(failure.headers.get('retry-after'), '60')
    assert((await failure.text()).includes('id="project-root"'))
    assert.equal(errorLog.mock.calls.length, 1)
  } finally {
    globalThis.fetch = original
  }
})
