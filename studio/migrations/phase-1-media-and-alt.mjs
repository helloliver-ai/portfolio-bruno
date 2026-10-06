import {writeFile} from 'node:fs/promises'

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-01'})
const dryRun = process.argv.includes('--dry-run')
const backupPath = '/private/tmp/portfolio-phase-1-projects-backup.json'

function localizeAlt(alt) {
  if (!alt || typeof alt !== 'string') return alt
  return {_type: 'localizedAltText', pt: alt, en: alt}
}

function migrateAccessibleImage(media) {
  if (!media) return media
  return {...media, alt: localizeAlt(media.alt)}
}

function migrateColumn(column) {
  if (!column) return column
  return column.kind === 'image'
    ? {...column, image: migrateAccessibleImage(column.image)}
    : column
}

function migrateBlock(block) {
  if (block?._type === 'fullWidthMedia' || block?._type === 'wideMedia') {
    return {
      ...block,
      _type: 'mediaBlock',
      layout: block._type === 'fullWidthMedia' ? 'fullWidth' : 'wide',
      media: migrateAccessibleImage(block.media),
    }
  }
  if (block?._type === 'mediaBlock') {
    return {...block, media: migrateAccessibleImage(block.media)}
  }
  if (block?._type === 'twoColumns') {
    return {...block, left: migrateColumn(block.left), right: migrateColumn(block.right)}
  }
  return block
}

const projects = await client.fetch('*[_type == "project"]{_id, cover, thumbnail, heroLayout, contentBlocks}')
await writeFile(backupPath, JSON.stringify(projects, null, 2), {mode: 0o600})

const changes = projects.map((project) => {
  const next = {
    cover: migrateAccessibleImage(project.cover),
    thumbnail: migrateAccessibleImage(project.thumbnail),
    heroLayout: project.heroLayout || 'wide',
    contentBlocks: (project.contentBlocks || []).map(migrateBlock),
  }
  return {id: project._id, next}
})

if (!dryRun) {
  let transaction = client.transaction()
  changes.forEach(({id, next}) => {
    transaction = transaction.patch(id, (patch) => patch.set(next))
  })
  if (changes.length) await transaction.commit({tag: 'portfolio.phase-1-schema-migration'})
}

console.log(JSON.stringify({dryRun, projects: changes.length, backupPath}, null, 2))
