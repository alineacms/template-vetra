import {RichText} from 'alinea/ui'
import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {cms} from '@/cms'
import {Author, BlogPost} from '@/cms/schema'
import {PostCard, postCardData} from '@/components/post-card'

interface AuthorPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params
}: AuthorPageProps): Promise<Metadata> {
  const {slug} = await params
  const author = await cms.first({type: Author, path: slug})
  if (!author) notFound()
  return {
    title: `${author.title}`,
    description: `Read all posts by ${author.title}.`
  }
}

export async function generateStaticParams() {
  const authors = await cms.find({type: Author})
  return authors.map(author => ({
    slug: author.path
  }))
}

export default async function AuthorPage({params}: AuthorPageProps) {
  const {slug} = await params
  const author = await cms.first({type: Author, path: slug})
  if (!author) notFound()
  const posts = await cms.find({
    type: BlogPost,
    filter: {author: {has: {_entry: author._id}}},
    select: postCardData
  })
  return (
    <div className="space-y-8">
      <section className="text-center space-y-6">
        {author.avatar && (
          <Image
            src={author.avatar.src}
            alt={author.title}
            width={120}
            height={120}
            className="w-30 h-30 rounded-full object-cover mx-auto flex-shrink-0"
          />
        )}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {author.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
          <div className="max-w-2xl mx-auto mt-6">
            <RichText
              doc={author.bio}
              p={
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed" />
              }
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
