import {Config, Field} from 'alinea'
import {Category} from './Category'

export const CategoryList = Config.document('CategoryList', {
  contains: [Category],
  fields: {
    intro: Field.richText('Introduction', {
      help: 'A brief introduction to the categories section.'
    })
  }
})
