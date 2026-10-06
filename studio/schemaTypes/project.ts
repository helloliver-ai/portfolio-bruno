import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'info', title: 'Project info', default: true},
    {name: 'composition', title: 'Page composition'},
    {name: 'seo', title: 'Search & sharing'},
  ],
  fields: [
    defineField({name: 'title', title: 'Project title', type: 'string', group: 'info', validation: (Rule) => Rule.required().max(120)}),
    defineField({name: 'client', title: 'Client', type: 'string', group: 'info', validation: (Rule) => Rule.max(120)}),
    defineField({name: 'projectType', title: 'Project type', type: 'localizedString', group: 'info', validation: (Rule) => Rule.required()}),
    defineField({name: 'year', title: 'Year', type: 'string', group: 'info', validation: (Rule) => Rule.max(20).custom((value) => !value || !/[\r\n]/.test(value) || 'Use a single-line year value.')}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'info', options: {source: 'title', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'cover', title: 'Project cover', type: 'accessibleImage', group: 'info', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'heroLayout',
      title: 'Project hero layout',
      type: 'string',
      group: 'composition',
      initialValue: 'wide',
      options: {
        list: [
          {title: 'Wide', value: 'wide'},
          {title: 'Full width', value: 'fullWidth'},
          {title: 'Two columns — image left / empty right', value: 'halfLeft'},
          {title: 'Two columns — empty left / image right', value: 'halfRight'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'thumbnail', title: 'Work thumbnail', type: 'optionalAccessibleImage', group: 'info', description: 'Optional. The future website falls back to Project cover.',}),
    defineField({name: 'credits', title: 'Credits', type: 'array', group: 'info', of: [defineArrayMember({type: 'credit'})]}),
    defineField({name: 'workOrder', title: 'Work order', type: 'number', group: 'info', description: 'Use 10, 20, 30… to leave room for future insertions.', validation: (Rule) => Rule.required().integer().positive()}),
    defineField({
      name: 'contentBlocks',
      title: 'Content blocks',
      type: 'array',
      group: 'composition',
      of: [
        defineArrayMember({type: 'mediaBlock'}),
        defineArrayMember({type: 'textBlock'}),
        defineArrayMember({type: 'twoColumns'}),
        defineArrayMember({type: 'vimeoBlock'}),
        defineArrayMember({type: 'spacerBlock'}),
      ],
      validation: (Rule) =>
        Rule.required().custom((value) =>
          Array.isArray(value) && value.some((block) => block?._type !== 'spacerBlock')
            ? true
            : 'Add at least one content block that is not a Spacer.',
        ),
    }),
    defineField({name: 'seo', title: 'Search & sharing', type: 'projectSeo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', client: 'client', typePt: 'projectType.pt', typeEn: 'projectType.en', year: 'year', media: 'thumbnail.image'},
    prepare({title, client, typePt, typeEn, year, media}) {
      const details = [client, typePt || typeEn, year].filter(Boolean).join(' · ')
      return {title: title || 'Untitled project', subtitle: details || 'Project', media}
    },
  },
})
