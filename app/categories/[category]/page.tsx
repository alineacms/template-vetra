import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {cms} from '@/cms'
import {BlogPost, Category} from '@/cms/schema'
import {CategoryBadge} from '@/components/category-badge'
import {PostCard, postCardData} from '@/components/post-card'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const {category: slug} = await params
  const category = await cms.first({type: Category, path: slug})

  if (!category) notFound()

  return {
    title: category.title,
    description: `Browse all ${category.title} posts on Vetra.`
  }
}

export async function generateStaticParams() {
  const categories = await cms.find({type: Category})
  return categories.map(category => ({
    category: category._path
  }))
}

export default async function CategoryPage({params}: CategoryPageProps) {
  const {category: slug} = await params
  const category = await cms.first({type: Category, path: slug})
  if (!category) notFound()
  const posts = await cms.find({
    type: BlogPost,
    filter: {category: {has: {_entry: category._id}}},
    select: postCardData
  })

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <CategoryBadge category={category} />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {category.title}
        </h1>
        <div className="max-w-2xl mx-auto mt-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {category.description}
          </p>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this
          category
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts found in this category.
          </p>
        </div>
      )}
    </div>
  )
}
