import type {Infer} from 'alinea'
import {RichText} from 'alinea/ui'
import type {FormPage} from '@/cms/schema'

interface FormProps {
  action: (formData: FormData) => void
  form: Infer<typeof FormPage>
}

export async function Form({action, form}: FormProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {form.title}
        </h1>

        <RichText
          doc={form.description}
          p={
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" />
          }
        />
      </section>

      <div className="max-w-2xl mx-auto">
        <form action={action} className="space-y-6">
          {form.formFields.map(field => {
            return (
              <div key={field._id}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {field.label}
                </label>
                {field._type === 'Textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field._type === 'EmailField' ? 'email' : 'text'}
                    id={field.name}
                    name={field.name}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            )
          })}

          <button
            type="submit"
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            {form.submitText}
          </button>
        </form>
      </div>
    </div>
  )
}
