import {Config, Field} from 'alinea'

export const BlogPost = Config.document('BlogPost', {
  fields: {
    date: Field.date('Date'),
    author: Field.entry('Author', {
      condition: {_type: 'Author'},
      width: 0.5
    }),
    category: Field.entry('Category', {
      condition: {_type: 'Category'},
      width: 0.5
    }),
    image: Field.image('Image'),
    intro: Field.text('Introduction', {
      help: 'A brief introduction to the post.',
      multiline: true
    }),
    content: Field.richText('Content', {
      help: 'The main content of the post.'
    })
  }
})
