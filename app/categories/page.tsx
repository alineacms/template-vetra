import {RichText} from 'alinea/ui'
import type {Metadata} from 'next'
import {cms} from '@/cms'
import {Category, CategoryList} from '@/cms/schema'
import {CategoryBadge} from '@/components/category-badge'

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.get({type: CategoryList})
  return {
    title: page.title
  }
}

export default async function CategoriesPage() {
  const page = await cms.get({type: CategoryList})
  const categories = await cms.find({type: Category})
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {page.title}
        </h1>
        <RichText
          doc={page.intro}
          p={
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" />
          }
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {categories.map(category => (
          <div
            key={category._id}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <CategoryBadge category={category} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {category.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {category.description}
            </p>
            <a
              href={category._url}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
            >
              Browse {category.title} posts →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
