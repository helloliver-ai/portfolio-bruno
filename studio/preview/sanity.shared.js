export const sanityConfig = {
  projectId: 'uj669d76',
  dataset: 'production',
  apiVersion: '2026-10-01',
}

const imageProjection = `{..., asset->{_id, url, metadata{dimensions}}}`

export const projectsQuery = `*[_type == "project"]|order(workOrder asc){
  _id,
  _type,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  workOrder,
  thumbnail{..., image${imageProjection}},
  cover{..., image${imageProjection}}
}`

export const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  _rev,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  heroLayout,
  cover{..., image${imageProjection}},
  credits[]{_key, label, value},
  workOrder,
  contentBlocks[]{
    _key,
    _type,
    placement,
    layout,
    size,
    vimeoUrl,
    autoplay,
    loop,
    muted,
    content,
    media{..., image${imageProjection}},
    left{
      kind,
      text,
      image{..., image${imageProjection}},
      vimeo
    },
    right{
      kind,
      text,
      image{..., image${imageProjection}},
      vimeo
    }
  }
}`
