import {type Infer, Query} from 'alinea'
import {imageBlurUrl} from 'alinea/ui'
import Image from 'next/image'
import Link from 'next/link'
import {Author, BlogPost, Category} from '@/cms/schema'
import {formatDate} from '@/lib/utils'
import {CategoryBadge} from './category-badge'

export const postCardData = {
  id: Query.id,
  url: Query.url,
  date: BlogPost.date,
  title: BlogPost.title,
  image: BlogPost.image,
  category: BlogPost.category.first({
    type: Category
  }),
  author: BlogPost.author.first({
    type: Author,
    select: {
      url: Query.url,
      name: Author.title,
      avatar: Author.avatar
    }
  })
}

interface PostCardProps {
  post: Infer<typeof postCardData>
  featured?: boolean
}

export function PostCard({post, featured = false}: PostCardProps) {
  const {url, date, image, title, category, author} = post
  return (
    <article className="group">
      {image && (
        <Link href={url}>
          <div
            className={`relative ${featured ? 'h-64 md:h-64' : 'h-64 md:h-64'} overflow-hidden rounded-lg mb-4`}
          >
            <Image
              src={image.src}
              placeholder="blur"
              blurDataURL={imageBlurUrl(image)}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, 66vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
          </div>
        </Link>
      )}

      <div className="space-y-3">
        {category && <CategoryBadge category={category} />}

        <Link href={url}>
          <h2
            className={`text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}
          >
            {title}
          </h2>
        </Link>

        {author && (
          <div className="flex items-center space-x-3 pt-2">
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href={author.url}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {author.name}
              </Link>

              {date && (
                <>
                  <span>•</span>
                  <time>{formatDate(date)}</time>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
