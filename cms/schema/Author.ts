import {Config, Field} from 'alinea'

export const Author = Config.document('Author', {
  fields: {
    avatar: Field.image('Avatar'),
    bio: Field.richText('Bio', {
      help: 'A short biography of the author'
    })
  }
})
