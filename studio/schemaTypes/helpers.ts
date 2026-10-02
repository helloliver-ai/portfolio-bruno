export const VIMEO_URL_MESSAGE = 'Use a vimeo.com or player.vimeo.com URL.'

export function isVimeoUrl(value?: string) {
  if (!value) return false

  try {
    const hostname = new URL(value).hostname.toLowerCase()
    return hostname === 'vimeo.com' || hostname === 'www.vimeo.com' || hostname === 'player.vimeo.com'
  } catch {
    return false
  }
}

export function hasLocalizedContent(value: unknown) {
  const content = value as {
    pt?: {title?: string; subtitle?: string; body?: unknown[]}
    en?: {title?: string; subtitle?: string; body?: unknown[]}
  }

  const hasText = (locale?: {title?: string; subtitle?: string; body?: unknown[]}) =>
    Boolean(locale?.title?.trim() || locale?.subtitle?.trim() || locale?.body?.length)

  return hasText(content?.pt) && hasText(content?.en)
}

export function vimeoId(value?: string) {
  if (!value) return ''

  try {
    return new URL(value).pathname.split('/').filter(Boolean).pop() || value
  } catch {
    return value
  }
}

export function imageName(value?: string) {
  if (!value) return 'image'
  return value.replace(/^image-/, '').split('-').slice(0, -1).join('-') || 'image'
}

export function plainText(value?: Array<{children?: Array<{text?: string}>}>) {
  return value?.flatMap((block) => block.children?.map((child) => child.text || '') || []).join(' ').trim() || ''
}
