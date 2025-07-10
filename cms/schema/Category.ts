import {Config, Field} from 'alinea'

export const Category = Config.document('Category', {
  fields: {
    description: Field.text('Description', {
      multiline: true,
      help: 'A short description of the category'
    }),
    theme: Field.object('Theme', {
      fields: {
        colorLight: Field.text('Light color', {
          help: 'The text color of the category in light mode (e.g. #E67E22)',
          width: 0.5
        }),
        colorDark: Field.text('Dark color', {
          help: 'The text color of the category in dark mode (e.g. #FFB380)',
          width: 0.5
        })
      }
    })
  }
})
