import {defineField, defineType} from 'sanity'

import {hasLocalizedContent, imageName, isVimeoUrl, plainText, VIMEO_URL_MESSAGE, vimeoId} from './helpers'

const localizedTextFields = [
  defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.max(160)}),
  defineField({name: 'subtitle', title: 'Subtitle', type: 'string', validation: (Rule) => Rule.max(240)}),
  defineField({
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Black', value: 'colorBlack'},
            {title: 'White', value: 'colorWhite'},
            {title: 'Orange', value: 'colorOrange'},
          ],
          annotations: [
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [defineField({name: 'href', title: 'URL', type: 'url', validation: (Rule) => Rule.required()})],
            },
          ],
        },
      },
    ],
  }),
]

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Portuguese and English text',
  type: 'object',
  fields: [
    defineField({name: 'pt', title: 'Portuguese (PT)', type: 'string', validation: (Rule) => Rule.max(240)}),
    defineField({name: 'en', title: 'English (EN)', type: 'string', validation: (Rule) => Rule.max(240)}),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true
      return value.pt?.trim() && value.en?.trim() ? true : 'Fill in both Portuguese and English.'
    }),
})

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Portuguese and English text block',
  type: 'object',
  fields: [
    defineField({name: 'pt', title: 'Portuguese (PT)', type: 'object', fields: localizedTextFields}),
    defineField({name: 'en', title: 'English (EN)', type: 'object', fields: localizedTextFields}),
  ],
  validation: (Rule) =>
    Rule.custom((value) =>
      hasLocalizedContent(value)
        ? true
        : 'Add at least a title, subtitle, or body in both Portuguese and English.',
    ),
})

export const localizedAltText = defineType({
  name: 'localizedAltText',
  title: 'Alternative text in Portuguese and English',
  type: 'object',
  fields: [
    defineField({name: 'pt', title: 'Alt text PT', type: 'string', validation: (Rule) => Rule.max(240)}),
    defineField({name: 'en', title: 'Alt text EN', type: 'string', validation: (Rule) => Rule.max(240)}),
  ],
})

function validateLocalizedAlt(value: unknown, context: {parent?: {decorative?: boolean; image?: {asset?: unknown}}}, optional = false) {
  const parent = context.parent || {}
  if (optional && !parent.image?.asset) return true
  if (parent.decorative) return true
  if (typeof value === 'string' && value.trim()) return true
  const alt = value as {pt?: string; en?: string} | undefined
  return alt?.pt?.trim() && alt?.en?.trim()
    ? true
    : 'Add alternative text in Portuguese and English, or mark the image as decorative.'
}

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Accessible image',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'localizedAltText',
      description: 'Required in Portuguese and English unless this image is decorative.',
      hidden: ({parent}) => Boolean(parent?.decorative),
      validation: (Rule) => Rule.custom((value, context) => validateLocalizedAlt(value, context)),
    }),
  ],
  preview: {
    select: {altPt: 'alt.pt', altEn: 'alt.en', media: 'image', decorative: 'decorative'},
    prepare({altPt, altEn, media, decorative}) {
      return {title: altPt || altEn || (decorative ? 'Decorative image' : 'Image'), subtitle: decorative ? 'Decorative' : 'Accessible image', media}
    },
  },
})

export const optionalAccessibleImage = defineType({
  name: 'optionalAccessibleImage',
  title: 'Optional accessible image',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'localizedAltText',
      description: 'Required in Portuguese and English when an image is set, unless it is decorative.',
      hidden: ({parent}) => Boolean(parent?.decorative),
      validation: (Rule) => Rule.custom((value, context) => validateLocalizedAlt(value, context, true)),
    }),
  ],
  preview: {
    select: {altPt: 'alt.pt', altEn: 'alt.en', media: 'image', decorative: 'decorative'},
    prepare({altPt, altEn, media, decorative}) {
      return {title: altPt || altEn || (decorative ? 'Decorative image' : 'Image'), subtitle: decorative ? 'Decorative' : 'Accessible image', media}
    },
  },
})

export const credit = defineType({
  name: 'credit',
  title: 'Credit',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Role / label', type: 'string'}),
    defineField({name: 'value', title: 'Name / value', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {label: 'label', title: 'value'},
    prepare({label, title}) {
      return {title: label ? `${label} — ${title || ''}` : title || 'Credit'}
    },
  },
})

export const projectSeo = defineType({
  name: 'projectSeo',
  title: 'Search & sharing',
  type: 'object',
  fields: [
    defineField({name: 'metaDescription', title: 'Search description', type: 'text', rows: 3, validation: (Rule) => Rule.max(160)}),
    defineField({name: 'shareImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}}),
  ],
})

export const fullWidthMedia = defineType({
  name: 'fullWidthMedia',
  title: 'Full Width Media',
  type: 'object',
  fields: [defineField({name: 'media', title: 'Image', type: 'accessibleImage', validation: (Rule) => Rule.required()})],
  preview: {
    select: {assetRef: 'media.image.asset._ref', media: 'media.image'},
    prepare({assetRef, media}) {
      return {title: `Full Width Media — ${imageName(assetRef)}`, media}
    },
  },
})

export const wideMedia = defineType({
  name: 'wideMedia',
  title: 'Wide Media',
  type: 'object',
  fields: [defineField({name: 'media', title: 'Image', type: 'accessibleImage', validation: (Rule) => Rule.required()})],
  preview: {
    select: {assetRef: 'media.image.asset._ref', media: 'media.image'},
    prepare({assetRef, media}) {
      return {title: `Wide Media — ${imageName(assetRef)}`, media}
    },
  },
})

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({name: 'media', title: 'Image', type: 'accessibleImage', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'layout',
      title: 'Image layout',
      type: 'string',
      initialValue: 'wide',
      options: {
        list: [
          {title: 'Full width', value: 'fullWidth'},
          {title: 'Wide', value: 'wide'},
          {title: 'Half — left', value: 'halfLeft'},
          {title: 'Half — right', value: 'halfRight'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {layout: 'layout', altPt: 'media.alt.pt', altEn: 'media.alt.en', media: 'media.image'},
    prepare({layout, altPt, altEn, media}) {
      const labels: Record<string, string> = {fullWidth: 'Full Width', wide: 'Wide', halfLeft: 'Half — left', halfRight: 'Half — right'}
      return {title: `Media — ${labels[layout] || 'Wide'} — ${altPt || altEn || 'image'}`, media}
    },
  },
})

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({name: 'content', title: 'Portuguese and English text', type: 'localizedBlockContent', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'placement',
      title: 'Text width',
      type: 'string',
      initialValue: 'wide',
      options: {
        list: [
          {title: 'Wide', value: 'wide'},
          {title: 'Half — left', value: 'halfLeft'},
          {title: 'Half — right', value: 'halfRight'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'content.pt.title', subtitle: 'content.pt.subtitle', body: 'content.pt.body'},
    prepare({title, subtitle, body}) {
      const firstText = title || subtitle || plainText(body).slice(0, 80) || 'Add Portuguese text'
      return {title: `Text — PT: ${firstText}`}
    },
  },
})

const vimeoFields = [
  defineField({
    name: 'vimeoUrl',
    title: 'Vimeo URL',
    type: 'url',
    validation: (Rule) => Rule.required().custom((value) => isVimeoUrl(value) || VIMEO_URL_MESSAGE),
  }),
  defineField({name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false}),
  defineField({name: 'loop', title: 'Loop', type: 'boolean', initialValue: false}),
  defineField({name: 'muted', title: 'Muted', type: 'boolean', initialValue: false}),
]

const optionalVimeoFields = [
  defineField({
    name: 'vimeoUrl',
    title: 'Vimeo URL',
    type: 'url',
    validation: (Rule) => Rule.custom((value) => !value || isVimeoUrl(value) || VIMEO_URL_MESSAGE),
  }),
  defineField({name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false}),
  defineField({name: 'loop', title: 'Loop', type: 'boolean', initialValue: false}),
  defineField({name: 'muted', title: 'Muted', type: 'boolean', initialValue: false}),
]

function validateVimeoSettings(value: {autoplay?: boolean; muted?: boolean} | undefined) {
  return value?.autoplay && !value?.muted ? 'Autoplay requires Muted to be enabled.' : true
}

export const columnVimeo = defineType({
  name: 'columnVimeo',
  title: 'Vimeo video',
  type: 'object',
  fields: vimeoFields,
  validation: (Rule) => Rule.custom(validateVimeoSettings),
  preview: {
    select: {url: 'vimeoUrl'},
    prepare({url}) {
      return {title: `Vimeo — ${vimeoId(url) || 'Add URL'}`}
    },
  },
})

export const optionalColumnVimeo = defineType({
  name: 'optionalColumnVimeo',
  title: 'Vimeo video',
  type: 'object',
  fields: optionalVimeoFields,
  validation: (Rule) => Rule.custom(validateVimeoSettings),
  preview: {
    select: {url: 'vimeoUrl'},
    prepare({url}) {
      return {title: `Vimeo — ${vimeoId(url) || 'Add URL'}`}
    },
  },
})

export const columnContent = defineType({
  name: 'columnContent',
  title: 'Column content',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Content type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Text', value: 'text'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Empty', value: 'empty'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'optionalAccessibleImage',
      hidden: ({parent}) => parent?.kind !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.parent?.kind !== 'image' || value?.image?.asset ? true : 'Add an image.',
        ),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localizedBlockContent',
      hidden: ({parent}) => parent?.kind !== 'text',
      validation: (Rule) => Rule.custom((value, context) => context.parent?.kind !== 'text' || value ? true : 'Add text in both languages.'),
    }),
    defineField({
      name: 'vimeo',
      title: 'Vimeo video',
      type: 'optionalColumnVimeo',
      hidden: ({parent}) => parent?.kind !== 'vimeo',
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.parent?.kind !== 'vimeo' || value?.vimeoUrl ? true : 'Add a Vimeo URL.',
        ),
    }),
  ],
  preview: {
    select: {kind: 'kind', image: 'image.image', text: 'text.pt.title', url: 'vimeo.vimeoUrl'},
    prepare({kind, image, text, url}) {
      const label = kind ? kind.charAt(0).toUpperCase() + kind.slice(1) : 'Choose content'
      return {title: kind === 'text' && text ? `Text — ${text}` : kind === 'vimeo' ? `Vimeo — ${vimeoId(url)}` : label, media: image}
    },
  },
})

export const twoColumns = defineType({
  name: 'twoColumns',
  title: 'Two Columns',
  type: 'object',
  fields: [
    defineField({name: 'left', title: 'Left column', type: 'columnContent', validation: (Rule) => Rule.required()}),
    defineField({name: 'right', title: 'Right column', type: 'columnContent', validation: (Rule) => Rule.required()}),
  ],
  validation: (Rule) =>
    Rule.custom((value) =>
      value?.left?.kind === 'empty' && value?.right?.kind === 'empty'
        ? 'At least one column must contain image, text, or Vimeo.'
        : true,
    ),
  preview: {
    select: {left: 'left.kind', right: 'right.kind'},
    prepare({left, right}) {
      const label = (value?: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Choose content')
      return {title: `Two Columns — ${label(left)} + ${label(right)}`}
    },
  },
})

export const vimeoBlock = defineType({
  name: 'vimeoBlock',
  title: 'Vimeo',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Video width',
      type: 'string',
      initialValue: 'wide',
      options: {
        list: [
          {title: 'Full width', value: 'fullWidth'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    ...vimeoFields,
  ],
  validation: (Rule) => Rule.custom(validateVimeoSettings),
  preview: {
    select: {layout: 'layout', url: 'vimeoUrl'},
    prepare({layout, url}) {
      const label = layout === 'fullWidth' ? 'Full Width' : 'Wide'
      return {title: `Vimeo — ${label} — ${vimeoId(url) || 'Add URL'}`}
    },
  },
})

export const spacerBlock = defineType({
  name: 'spacerBlock',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Space size',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Extra large', value: 'extraLarge'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {size: 'size'},
    prepare({size}) {
      const labels: Record<string, string> = {small: 'Small', medium: 'Medium', large: 'Large', extraLarge: 'Extra Large'}
      return {title: `Spacer — ${labels[size] || 'Medium'}`}
    },
  },
})
