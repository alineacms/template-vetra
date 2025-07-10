import {Config, Field} from 'alinea'

export const HomePage = Config.document('Homepage', {
  fields: {
    path: Field.path('Path', {
      hidden: true
    }),
    featured: Field.entry.multiple('Featured posts', {})
  }
})
