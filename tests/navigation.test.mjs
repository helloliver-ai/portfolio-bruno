import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import test from 'node:test'

const require = createRequire(new URL('../studio/package.json', import.meta.url))
const {JSDOM} = require('jsdom')
const source = await readFile(new URL('../script.js', import.meta.url), 'utf8')

async function page(path = '/index.html') {
  const dom = new JSDOM('<header></header><main></main><footer></footer>', {runScripts: 'outside-only', url: `http://localhost${path}`})
  await new Promise((resolve) => dom.window.addEventListener('load', resolve, {once: true}))
  dom.window.eval(source)
  return dom.window
}

test('all documents ship the complete accessible header before any CMS or JavaScript runs', async () => {
  for (const [file, current] of [['index.html', 'home'], ['work.html', 'work'], ['about.html', 'about+contact'], ['project.html', 'work']]) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
    const dom = new JSDOM(html)
    const nav = dom.window.document.querySelector('#site-header nav[aria-label="Navegação principal"]')
    assert(nav, file)
    assert.deepEqual([...nav.querySelectorAll('a')].map((a) => a.textContent), ['home', 'work', 'about+contact'])
    assert.deepEqual([...nav.querySelectorAll('a')].map((a) => a.getAttribute('href')), ['index.html', 'work.html', 'about.html'])
    assert.equal(nav.querySelector('[aria-current="page"]').textContent, current)
    dom.window.close()
  }
})

test('resolving site content reuses the visible header and its links instead of rebuilding it', async () => {
  const w = await page('/work.html')
  const html = await readFile(new URL('../work.html', import.meta.url), 'utf8')
  const staticDoc = new JSDOM(html)
  const header = w.document.querySelector('header')
  header.id = 'site-header'
  header.innerHTML = staticDoc.window.document.querySelector('#site-header').innerHTML
  w.document.body.dataset.page = 'work'
  const nav = header.firstElementChild
  const links = [...nav.children]
  const content = JSON.parse(await readFile(new URL('../data/site-content.json', import.meta.url), 'utf8'))
  w.renderHeader(content.site)
  assert.equal(header.firstElementChild, nav)
  assert.deepEqual([...nav.children], links)
  assert.equal(nav.querySelector('[aria-current="page"]').textContent, 'work')
  staticDoc.window.close()
  w.close()
})

test('single snaps follow the principal order, direct projects, and the inverse project return', async () => {
  const w = await page()
  for (const [from, to, direction] of [
    ['/', '/work.html', 1], ['/work', '/about.html', 1], ['/about', '/work', -1],
    ['/work', '/', -1], ['/about', '/', -1], ['/', '/project?slug=a', 1], ['/work', '/project?slug=a', 1],
  ]) assert.equal(w.pageDirection(from, to), direction)
  assert.equal(w.pageDirection('/project?slug=a', '/work', {from: '/work', direction: 1}), -1)
  w.close()
})

test('modified clicks, external links, anchors, downloads, and blank targets keep native behavior', async () => {
  const w = await page('/work.html?cms=1')
  w.installPageNavigation()
  const cases = [
    {href: '/about', ctrlKey: true}, {href: '/about', metaKey: true}, {href: '/about', button: 1},
    {href: 'mailto:hello@example.com'}, {href: 'https://example.com'}, {href: '#section'},
    {href: '/about', target: '_blank'}, {href: '/about', download: ''},
  ]
  for (const item of cases) {
    const a = w.document.createElement('a')
    for (const key of ['href', 'target', 'download']) if (key in item) a.setAttribute(key, item[key])
    w.document.body.append(a)
    const event = new w.MouseEvent('click', {bubbles: true, cancelable: true, ...item})
    let intercepted
    w.document.addEventListener('click', (e) => { intercepted = e.defaultPrevented; e.preventDefault() }, {once: true})
    a.dispatchEvent(event)
    assert.equal(intercepted, false, JSON.stringify(item))
    a.remove()
  }
  assert.equal(w.document.documentElement.classList.contains('is-page-leaving'), false)
  w.close()
})

test('internal navigation records metadata only; reduced motion navigates without an animation delay', async () => {
  const w = await page('/work.html')
  w.matchMedia = () => ({matches: true})
  w.installPageNavigation()
  const delays = []
  w.setTimeout = (_, delay) => { delays.push(delay); return 1 }
  const a = w.document.createElement('a')
  a.href = '/about.html'
  w.document.body.append(a)
  const event = new w.MouseEvent('click', {bubbles: true, cancelable: true})
  a.dispatchEvent(event)
  assert.equal(event.defaultPrevented, true)
  assert.deepEqual(delays, [0])
  const record = JSON.parse(w.sessionStorage.getItem('portfolio-navigation'))
  assert.equal(record.direction, 1)
  assert.equal(record.from, '/work.html')
  assert.equal(record.to, '/about.html')
  assert.deepEqual(Object.keys(record).sort(), ['at', 'direction', 'from', 'index', 'to'])
  w.close()
})

test('an unresponsive source times out and a late result cannot complete its awaited render', async () => {
  const w = await page()
  let finish
  let rendered = false
  const source = new Promise((resolve) => { finish = resolve })
  const render = (async () => { await w.withDeadline(source, 5); rendered = true })()
  await assert.rejects(render, /Tempo limite/)
  finish('late CMS content')
  await Promise.resolve()
  assert.equal(rendered, false)
  w.close()
})

test('bfcache restoration removes the leaving state and derives the reverse direction', async () => {
  const w = await page('/work.html')
  w.installPageNavigation()
  w.document.documentElement.classList.add('is-page-leaving')
  w.sessionStorage.setItem('portfolio-position', JSON.stringify({index: 1}))
  w.dispatchEvent(new w.PageTransitionEvent('pageshow', {persisted: true}))
  assert.equal(w.document.documentElement.classList.contains('is-page-leaving'), false)
  assert.equal(w.document.documentElement.style.getPropertyValue('--page-direction'), '-1')
  assert.equal(w.document.documentElement.dataset.pageState, undefined)
  w.close()
})
