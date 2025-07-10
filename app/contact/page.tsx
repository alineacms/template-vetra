import {cms} from '@/cms'
import {FormPage} from '@/cms/schema'
import {Form} from '../form'

export default async function ContactPage() {
  const form = await cms.get({
    type: FormPage,
    path: 'contact'
  })

  async function handleSubmit(formData: FormData) {
    'use server'
    console.log(Object.fromEntries(formData.entries()))
  }

  return <Form form={form} action={handleSubmit} />
}
