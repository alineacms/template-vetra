import {RichText} from 'alinea/ui'
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {cms} from '@/cms'
import {BlogPost} from '@/cms/schema'
import {CategoryBadge} from '@/components/category-badge'
import {postCardData} from '@/components/post-card'
import {formatDate} from '@/lib/utils'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params
  const post = await cms.first({
    type: BlogPost,
    path: slug
  })

  if (!post) notFound()

  return {
    title: post.title,
    description: post.intro,
    openGraph: {
      title: post.title,
      description: post.intro,
      type: 'article',
      publishedTime: post.date,
      images: post.image && [
        {
          url: post.image.src,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.intro,
      images: post.image && [post.image.src]
    }
  }
}

export async function generateStaticParams() {
  const posts = await cms.find({type: BlogPost})
  return posts.map(post => ({
    slug: post.path
  }))
}

export default async function BlogPostPage({params}: BlogPostPageProps) {
  const {slug} = await params
  const post = await cms.first({
    type: BlogPost,
    path: slug,
    select: {
      ...postCardData,
      intro: BlogPost.intro,
      content: BlogPost.content
    }
  })

  if (!post) notFound()

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        {post.category && <CategoryBadge category={post.category} />}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.intro}
        </p>

        {post.author && (
          <div className="flex items-center space-x-3 pt-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Link
                href={post.author.url}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {post.author.name}
              </Link>
              {post.date && (
                <>
                  <span>•</span>
                  <time>{formatDate(post.date)}</time>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {post.image && (
        <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
      )}

      <div className="pt-10 space-y-8">
        <RichText
          doc={post.content}
          h1={
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" />
          }
          h2={
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white" />
          }
          p={
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl" />
          }
          ul={<ul className="list-disc px-5" />}
          li={<li className="text-gray-700 dark:text-gray-300 py-1" />}
        />
      </div>
    </article>
  )
}
