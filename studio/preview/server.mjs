import {randomUUID} from 'node:crypto'
import {readFile, stat} from 'node:fs/promises'
import {createServer} from 'node:http'
import {extname, resolve, sep} from 'node:path'

import {createClient} from '@sanity/client'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

import {projectQuery, sanityConfig} from './sanity.shared.js'

const HOST = '127.0.0.1'
const PORT = 8080
const ORIGIN = `http://${HOST}:${PORT}`
const ROOT = resolve(import.meta.dirname, '../..')
const TOKEN = process.env.SANITY_API_READ_TOKEN
const SESSION_COOKIE = 'portfolio-preview-session'
const SESSION_TTL_MS = 60 * 60 * 1000

if (!TOKEN) {
  throw new Error('SANITY_API_READ_TOKEN is required. Copy .env.example to .env.local and add a viewer token.')
}

const client = createClient({
  ...sanityConfig,
  useCdn: false,
  token: TOKEN,
  perspective: 'drafts',
  stega: {
    enabled: true,
    studioUrl: 'http://127.0.0.1:3333',
  },
})

const sessions = new Map()

function parseCookies(request) {
  const header = request.headers.cookie || ''
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=')
        return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))]
      }),
  )
}

function getSession(request) {
  const cookies = parseCookies(request)
  const id = cookies[SESSION_COOKIE]
  const expiresAt = sessions.get(id)
  if (!id || !expiresAt || expiresAt < Date.now()) {
    if (id) sessions.delete(id)
    return null
  }
  return {id, perspective: cookies[perspectiveCookieName] || 'drafts'}
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(data))
}

async function enableDraftMode(request, response) {
  const requestUrl = new URL(request.url, ORIGIN)
  const validation = await validatePreviewUrl(client, requestUrl.toString())
  if (!validation.isValid) {
    sendJson(response, 401, {error: 'Invalid or expired preview secret.'})
    return
  }

  const target = new URL(validation.redirectTo || '/project.html', ORIGIN)
  if (target.origin !== ORIGIN) {
    sendJson(response, 400, {error: 'The preview redirect must stay on the local preview origin.'})
    return
  }

  target.searchParams.set('sanity-preview', '1')
  const requestedPerspective = validation.studioPreviewPerspective || 'drafts'
  const perspective = Array.isArray(requestedPerspective)
    ? requestedPerspective.join(',')
    : requestedPerspective
  const sessionId = randomUUID()
  sessions.set(sessionId, Date.now() + SESSION_TTL_MS)

  response.writeHead(307, {
    Location: target.toString(),
    'Cache-Control': 'no-store',
    'Set-Cookie': [
      `${SESSION_COOKIE}=${encodeURIComponent(sessionId)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=3600`,
      `${perspectiveCookieName}=${encodeURIComponent(perspective)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=3600`,
    ],
  })
  response.end()
}

function disableDraftMode(response) {
  response.writeHead(307, {
    Location: '/project.html',
    'Cache-Control': 'no-store',
    'Set-Cookie': [
      `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
      `${perspectiveCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
    ],
  })
  response.end()
}

async function serveProject(request, response, requestUrl) {
  const session = getSession(request)
  if (!session) {
    sendJson(response, 401, {error: 'Open this page through the Sanity Presentation tool to enable draft preview.'})
    return
  }

  const slug = requestUrl.searchParams.get('slug') || 'cms-schema-validation-test'
  const perspective = session.perspective.includes(',')
    ? session.perspective.split(',')
    : session.perspective
  const project = await client
    .withConfig({perspective, useCdn: false})
    .fetch(projectQuery, {slug})

  if (!project) {
    sendJson(response, 404, {error: `No Sanity project was found for slug “${slug}”.`})
    return
  }

  sendJson(response, 200, {project})
}

function streamProjectEvents(request, response) {
  if (!getSession(request)) {
    sendJson(response, 401, {error: 'Draft preview session required.'})
    return
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive',
  })
  response.write('event: ready\ndata: {}\n\n')

  const subscription = client
    .listen('*[_type == "project"]', {}, {includeResult: false, visibility: 'query'})
    .subscribe({
      next: () => response.write(`event: project\ndata: ${JSON.stringify({at: Date.now()})}\n\n`),
      error: (error) => response.write(`event: error\ndata: ${JSON.stringify({message: error.message})}\n\n`),
    })
  const heartbeat = setInterval(() => response.write(': heartbeat\n\n'), 20_000)
  request.on('close', () => {
    clearInterval(heartbeat)
    subscription.unsubscribe()
  })
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

async function serveStatic(response, pathname) {
  const requestedPath = pathname === '/' ? '/index.html' : pathname
  const absolutePath = resolve(ROOT, `.${decodeURIComponent(requestedPath)}`)
  const isInsideRoot = absolutePath === ROOT || absolutePath.startsWith(`${ROOT}${sep}`)
  const relativePath = absolutePath.slice(ROOT.length + 1)
  const isPrivate = relativePath.startsWith('studio/') || relativePath.startsWith('.')
  if (!isInsideRoot || isPrivate) {
    sendJson(response, 404, {error: 'Not found.'})
    return
  }

  try {
    const fileStat = await stat(absolutePath)
    if (!fileStat.isFile()) throw new Error('Not a file')
    const content = await readFile(absolutePath)
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(absolutePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    })
    response.end(content)
  } catch {
    sendJson(response, 404, {error: 'Not found.'})
  }
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, ORIGIN)
    if (requestUrl.pathname === '/api/draft-mode/enable') return await enableDraftMode(request, response)
    if (requestUrl.pathname === '/api/draft-mode/disable') return disableDraftMode(response)
    if (requestUrl.pathname === '/api/preview/project') return await serveProject(request, response, requestUrl)
    if (requestUrl.pathname === '/api/preview/events') return streamProjectEvents(request, response)
    return await serveStatic(response, requestUrl.pathname)
  } catch (error) {
    console.error(error)
    sendJson(response, 500, {error: 'Local preview server error.'})
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Portfolio preview ready at ${ORIGIN}`)
})
