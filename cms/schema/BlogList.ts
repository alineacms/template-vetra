import {Config, Field} from 'alinea'
import {BlogPost} from './BlogPost'

export const BlogList = Config.document('BlogList', {
  contains: [BlogPost],
  orderChildrenBy: {desc: BlogPost.date},
  fields: {
    intro: Field.richText('Introduction', {
      help: 'A brief introduction to the blog section.'
    })
  }
})
