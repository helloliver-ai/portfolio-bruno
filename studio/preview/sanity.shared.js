export const sanityConfig = {
  projectId: 'uj669d76',
  dataset: 'production',
  apiVersion: '2026-10-01',
}

const imageProjection = `{..., asset->{_id, url, metadata{dimensions}}}`

export const aboutQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  contacts, experienceHeading, educationHeading, experience, education
}`

export const projectSharingQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, client, "slug": slug.current, projectType,
  seo{metaDescription, shareImage${imageProjection}},
  thumbnail{..., image${imageProjection}}, cover{..., image${imageProjection}}
}`

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
  credits[]{_key, label, value, style},
  creditsPt[]{_key, label, value, style},
  creditsEn[]{_key, label, value, style},
  seo{metaDescription, shareImage${imageProjection}},
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
    caption,
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
