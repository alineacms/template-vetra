import {Config, Field} from 'alinea'

// Generic page
export const Page = Config.document('Page', {
  fields: {
    intro: Field.text('Introduction', {
      help: 'A brief introduction to the page',
      multiline: true
    }),
    content: Field.richText('Content', {
      help: 'The main content of the page'
    })
  }
})
