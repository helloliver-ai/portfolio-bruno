import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import test from 'node:test'
import {hasLocalizedContent} from '../studio/schemaTypes/helpers.ts'

const require = createRequire(new URL('../studio/package.json', import.meta.url))
const {JSDOM} = require('jsdom')
const source = await readFile(new URL('../script.js', import.meta.url), 'utf8')
const fallback = JSON.parse(await readFile(new URL('../data/site-content.json', import.meta.url), 'utf8'))
const runtime = {sanityDataAttribute: ({path}) => path, sanityImageUrl: (image) => image?.asset ? 'https://cdn.sanity.io/test.jpg' : ''}

async function page(body = '<main id="project-root"></main>') {
  const dom = new JSDOM(`<!doctype html><html><body>${body}</body></html>`, {runScripts: 'outside-only', url: 'http://localhost/project?slug=test'})
  // Unit tests call the real rendering functions after the startup event has fired.
  await new Promise((resolve) => dom.window.addEventListener('load', resolve, {once: true}))
  dom.window.eval(source)
  return dom.window
}

test('PT-only, EN-only, and both validate; an empty text does not', () => {
  assert.equal(hasLocalizedContent({pt: {title: 'Olá'}}), true)
  assert.equal(hasLocalizedContent({en: {subtitle: 'Hello'}}), true)
  assert.equal(hasLocalizedContent({pt: {title: 'Olá'}, en: {title: 'Hello'}}), true)
  assert.equal(hasLocalizedContent({pt: {}, en: {}}), false)
})

test('text renders only populated languages and honors bounded editorial overrides', async () => {
  const w = await page()
  const pair = w.createSanityLocalizedText({pt: {}, en: {title: 'Hello', style: {color: 'black', italic: false, bold: false}}}, 'content', {_id: 'test'}, runtime)
  assert.equal(pair.children.length, 1)
  const article = pair.firstElementChild
  assert.equal(article.lang, 'en')
  for (const name of ['bilingual-text--en', 'cms-color-black', 'cms-upright', 'cms-regular']) assert(article.classList.contains(name))
  assert(article.querySelector('h2').classList.contains('cms-regular'))
  w.applyEditorialStyle(article, {color: '#123456', italic: 'false', bold: 'true'})
  assert(!article.className.includes('#123456'))
  const both = w.createSanityLocalizedText({pt: {body: [{_type: 'block', children: [{text: 'Olá', marks: ['strong', 'colorOrange']}]}]}, en: {title: 'Hello'}}, 'content', {_id: 'test'}, runtime)
  assert.equal(both.children.length, 2)
  assert.equal(both.firstElementChild.lang, 'pt-BR')
  assert(both.querySelector('strong .portable-colorOrange'))
  w.close()
})

test('credits remain collapsible; legacy documents work alongside independent PT and EN', async () => {
  const w = await page()
  const legacy = [{_key: 'old', label: 'Direção', value: 'Bruno', style: null}]
  const accordion = w.createCreditsAccordion(legacy, runtime, {_id: 'test', slug: 'test', creditsPt: null, creditsEn: [{_key: 'en', value: 'Direction', style: {color: 'white', bold: true}}]})
  const button = accordion.querySelector('button')
  const panel = accordion.querySelector('.project-credits-accordion__panel')
  assert.equal(button.textContent, 'Créditos completos / Full Credits↓')
  assert.equal(panel.children.length, 2)
  assert.equal(panel.firstElementChild.dataset.sanity, 'credits[_key=="old"]')
  assert.equal(panel.lastElementChild.lang, 'en')
  assert(panel.lastElementChild.classList.contains('cms-color-white'))
  assert.equal(panel.hidden, true)
  button.click()
  assert.equal(panel.hidden, false)
  assert.equal(button.getAttribute('aria-expanded'), 'true')
  button.click()
  assert.equal(panel.hidden, true)
  const englishOnly = w.createCreditsAccordion(legacy, runtime, {_id: 'test', creditsPt: [], creditsEn: [{value: 'English'}]})
  assert.equal(englishOnly.querySelectorAll('.project-cms-credit').length, 1)
  w.close()
})

test('alt is stable, bilingual fields stay independent, and decorative images stay empty', async () => {
  const w = await page()
  assert.equal(w.getPreferredImageAlt({decorative: true, alt: {pt: 'PT', en: 'EN'}}).text, '')
  assert.equal(w.getPreferredImageAlt({alt: {pt: 'PT', en: 'EN'}}).text, 'PT')
  assert.equal(w.getPreferredImageAlt({alt: {en: 'EN'}}).language, 'en')
  assert.equal(w.getPreferredImageAlt({alt: 'Legacy alt'}).text, 'Legacy alt')
  w.close()
})

test('About CMS controls contacts and array order, including empty lists; JSON is not overwritten', async () => {
  const w = await page('<main id="about-page"></main>')
  const content = structuredClone(fallback)
  w.mergeAboutContent(content, {
    contacts: {email: {label: 'Contato', value: 'design@example.com'}, whatsapp: {number: '+55 (31) 1234-5678'}, linkedin: {url: 'https://linkedin.com/in/example'}, behance: {url: 'https://behance.net/example'}},
    experience: [{company: 'Segunda', role: 'Designer', period: '2026'}, {company: 'Primeira', role: 'Designer', period: '2025'}],
    education: [{course: 'Design', school: 'Escola'}, {course: 'Direção de arte', school: 'Escola 2'}],
    experienceHeading: {pt: 'experiência', en: 'experience', enStyle: {italic: false}},
  })
  w.renderAbout(content.about, content.site)
  assert.deepEqual(Array.from(w.document.querySelectorAll('.experience-item__company'), (e) => e.textContent), ['Segunda', 'Primeira'])
  assert.equal(w.document.querySelectorAll('.about-education__course').length, 2)
  assert.equal(w.document.querySelector('.about-socials a').href, 'https://wa.me/553112345678')
  assert(Array.from(w.document.querySelectorAll('.about-socials a')).some((a) => a.href === 'mailto:design@example.com'))
  assert(w.document.querySelector('.section-heading .bilingual-text--en').classList.contains('cms-upright'))
  assert.equal(content.site.footer.email, 'design@example.com')
  assert.equal(fallback.site.footer.email, 'contato@olabruno.com')
  w.mergeAboutContent(content, {experience: [], education: []})
  w.renderAbout(content.about, content.site)
  assert.equal(w.document.querySelectorAll('.experience-item, .about-education__course').length, 0)
  w.close()
})

test('existing block types, Two Columns, Vimeo, captions, Portable Text, and reorder paths remain usable', async () => {
  const w = await page()
  const project = {_id: 'project', _type: 'project', title: 'Example', slug: 'test', credits: [{_key: 'credit', value: 'Bruno'}],
    cover: {decorative: true, image: {asset: {_ref: 'image-test'}}}, contentBlocks: [
      {_key: 'a', _type: 'twoColumns', left: {kind: 'text', text: {en: {title: 'English'}}}, right: {kind: 'empty'}},
      {_key: 'b', _type: 'vimeoBlock', vimeoUrl: 'https://vimeo.com/12345', muted: true, caption: {pt: 'Vídeo', en: 'Video'}},
      {_key: 'c', _type: 'textBlock', content: {pt: {title: 'Português'}}},
      {_key: 'd', _type: 'mediaBlock', media: {alt: {en: 'Image'}, image: {asset: {_ref: 'image-test'}}}},
      {_key: 'e', _type: 'spacerBlock', size: 'small'},
    ]}
  w.renderSanityProject(project, runtime)
  assert.equal(w.document.title, 'Example | Bruno Oliveira')
  assert.equal(w.document.querySelector('.project-content-blocks').dataset.sanityDragFlow, 'vertical')
  assert.equal(w.document.querySelectorAll('.project-content-blocks > *').length, 5)
  assert.equal(w.document.querySelector('iframe').src.includes('/12345?'), true)
  assert.equal(w.document.querySelector('figcaption').textContent, 'Vídeo / Video')
  assert.equal(w.document.querySelector('img').alt, '')
  assert.equal(w.document.querySelectorAll('.project-localized-text').length, 2)
  w.close()
})
