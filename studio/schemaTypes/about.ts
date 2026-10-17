import {defineArrayMember, defineField, defineType} from 'sanity'
import fallback from '../../data/site-content.json'

export const aboutContact = defineType({
  name: 'aboutContact', title: 'Contact link', type: 'object',
  fields: [
    defineField({name: 'label', title: 'Visible label', type: 'string'}),
    defineField({name: 'url', title: 'Destination URL', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
  ],
})

export const whatsappContact = defineType({
  ...aboutContact, name: 'whatsappContact', title: 'WhatsApp link',
  fields: [
    ...aboutContact.fields,
    defineField({name: 'number', title: 'WhatsApp number', type: 'string', description: 'International number including country code. Used when no URL is set.', validation: (Rule) => Rule.regex(/^\+?[\d\s()-]+$/, {name: 'international phone number'})}),
  ],
})

export const experienceEntry = defineType({
  name: 'experienceEntry', title: 'Experiência (PT)', type: 'object',
  fields: [
    defineField({name: 'company', title: 'Empresa', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Cargo', type: 'string'}),
    defineField({name: 'period', title: 'Período', type: 'string'}),
    defineField({name: 'url', title: 'Link da empresa', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
  ],
  preview: {select: {title: 'company', subtitle: 'role'}},
})

export const educationEntry = defineType({
  name: 'educationEntry', title: 'Educação (PT)', type: 'object',
  fields: [
    defineField({name: 'course', title: 'Curso', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'school', title: 'Instituição', type: 'string'}),
  ],
  preview: {select: {title: 'course', subtitle: 'school'}},
})

export const aboutPage = defineType({
  name: 'aboutPage', title: 'About & contact', type: 'document',
  initialValue: {
    contacts: {
      email: {label: fallback.about.contact.email, socialLabel: 'e-mail', value: fallback.about.contact.email},
      whatsapp: {label: 'WhatsApp'}, linkedin: {label: 'LinkedIn'}, behance: {label: 'Behance'},
    },
    experienceHeading: {pt: fallback.about.experience.title, en: fallback.about.experience.translation},
    educationHeading: {pt: fallback.about.education.title, en: fallback.about.education.translation},
    experience: fallback.about.experience.entries.map((entry, index) => ({...entry, _type: 'experienceEntry', _key: `experience-${index}`})),
    education: fallback.about.education.entries.map((entry, index) => ({...entry, _type: 'educationEntry', _key: `education-${index}`})),
  },
  fields: [
    defineField({name: 'contacts', title: 'Contatos e links', type: 'object', fields: [
      defineField({name: 'email', title: 'E-mail', type: 'object', fields: [
        defineField({name: 'label', title: 'E-mail visível', type: 'string'}),
        defineField({name: 'socialLabel', title: 'Label na lista de contatos', type: 'string'}),
        defineField({name: 'value', title: 'Endereço de e-mail (mailto)', type: 'string', validation: (Rule) => Rule.email()}),
      ]}),
      defineField({name: 'whatsapp', title: 'WhatsApp', type: 'whatsappContact'}),
      defineField({name: 'linkedin', title: 'LinkedIn', type: 'aboutContact'}),
      defineField({name: 'behance', title: 'Behance', type: 'aboutContact'}),
    ]}),
    defineField({name: 'experienceHeading', title: 'Heading experiência / experience', type: 'localizedString'}),
    defineField({name: 'experience', title: 'Experiências (somente PT)', type: 'array', of: [defineArrayMember({type: 'experienceEntry'})], description: 'Drag entries to reorder. Content and order only; layout is controlled by the website.'}),
    defineField({name: 'educationHeading', title: 'Heading educação / education', type: 'localizedString'}),
    defineField({name: 'education', title: 'Educação (somente PT)', type: 'array', of: [defineArrayMember({type: 'educationEntry'})], description: 'Drag entries to reorder. Content and order only; layout is controlled by the website.'}),
  ],
  preview: {prepare: () => ({title: 'About & contact'})},
})
