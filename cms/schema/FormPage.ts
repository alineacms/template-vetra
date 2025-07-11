import {Config, Field} from 'alinea'

function formFields() {
  return {
    label: Field.text('Label', {
      help: 'The label for the form field',
      width: 0.5
    }),
    name: Field.path('Name', {
      help: 'The name attribute for the form field',
      from: 'label',
      width: 0.5
    }),
    placeholder: Field.text('Placeholder', {
      help: 'Placeholder text for the form field'
    })
  }
}

const TextField = Config.type('Text field', {
  fields: formFields()
})

const EmailField = Config.type('Email field', {
  fields: formFields()
})

const Textarea = Config.type('Textarea', {
  fields: formFields()
})

export const FormPage = Config.document('Form', {
  fields: {
    description: Field.richText('Description', {
      help: 'A description of the form, displayed above the form fields.'
    }),
    formFields: Field.list('Fields', {
      schema: {
        TextField,
        EmailField,
        Textarea
      }
    }),
    submitText: Field.text('Submit Text', {
      help: 'The text for the submit button.',
      initialValue: 'Send Message'
    })
  }
})
