import {RichText} from 'alinea/ui'
import type {Metadata} from 'next'
import {cms} from '@/cms'
import {BlogList, BlogPost} from '@/cms/schema'
import {PostCard, postCardData} from '@/components/post-card'

export const metadata: Metadata = {
  title: 'Archive - Vetra',
  description: 'Browse all blog posts chronologically.'
}

export default async function BlogListPage({
  searchParams
}: {
  searchParams: Promise<{page: string | undefined}>
}) {
  const params = await searchParams
  const page = await cms.get({type: BlogList})
  const perPage = 3 * 4
  const currentPage = Number(params.page) || 0
  const posts = await cms.find({
    type: BlogPost,
    select: postCardData,
    take: perPage,
    skip: currentPage * perPage,
    orderBy: {desc: BlogPost.date}
  })
  // Get total count for pagination
  const totalPosts = await cms.count({type: BlogPost})
  const totalPages = Math.ceil(totalPosts / perPage)
  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <a
            href={`?page=${currentPage - 1}`}
            className={`px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200${currentPage === 0 ? ' opacity-50 pointer-events-none' : ''}`}
            aria-disabled={currentPage === 0}
            tabIndex={currentPage === 0 ? -1 : 0}
          >
            Previous
          </a>
          <span className="px-4 py-2 text-gray-600 dark:text-gray-300">
            Page {currentPage + 1} of {totalPages}
          </span>
          <a
            href={`?page=${currentPage + 1}`}
            className={`px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200${currentPage >= totalPages - 1 ? ' opacity-50 pointer-events-none' : ''}`}
            aria-disabled={currentPage >= totalPages - 1}
            tabIndex={currentPage >= totalPages - 1 ? -1 : 0}
          >
            Next
          </a>
        </div>
      )}
    </div>
  )
}
