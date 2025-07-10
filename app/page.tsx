import Link from 'next/link'
import {cms} from '@/cms'
import {BlogPost, HomePage} from '@/cms/schema'
import {PostCard, postCardData} from '@/components/post-card'

export default async function Home() {
  const featured = await cms.get({
    type: HomePage,
    select: HomePage.featured.find({select: postCardData})
  })
  const posts = await cms.find({
    type: BlogPost,
    select: postCardData,
    id: {notIn: featured.map(post => post.id)},
    take: 3 * 4
  })
  return (
    <div className="space-y-20">
      {/* Featured Posts */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {featured.map(post => (
            <PostCard key={post.id} post={post} featured />
          ))}
        </div>
      </section>

      {/* Regular Posts Grid */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* All Posts Button */}
        <div className="text-center pt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
