import {RichText} from 'alinea/ui'
import {cms} from '@/cms'
import {Page} from '@/cms/schema'

interface GenericPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false
export async function generateStaticParams() {
  const pages = await cms.find({type: Page})
  return pages.map(page => ({
    slug: page._path
  }))
}

export default async function GenericPage({params}: GenericPageProps) {
  const {slug} = await params
  const page = await cms.get({type: Page, path: slug})
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {page.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {page.intro}
        </p>
      </section>

      <div className="pt-10 space-y-8">
        <RichText
          doc={page.content}
          h1={
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" />
          }
          h2={
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white" />
          }
          p={<p className="text-gray-700 dark:text-gray-300 max-w-2xl" />}
          ul={<ul className="list-disc px-5" />}
          li={<li className="text-gray-700 dark:text-gray-300 py-1" />}
        />
      </div>
    </div>
  )
}
