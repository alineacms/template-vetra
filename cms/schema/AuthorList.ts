import {Config, Field} from 'alinea'
import {Author} from './Author'

export const AuthorList = Config.document('AuthorList', {
  contains: [Author],
  fields: {
    intro: Field.text('Introduction', {
      help: 'A brief introduction to the authors section.',
      multiline: true
    })
  }
})
