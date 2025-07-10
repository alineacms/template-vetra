import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {cms} from '@/cms'
import {Author, AuthorList, BlogPost} from '@/cms/schema'

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.get({type: AuthorList})
  return {
    title: page.title,
    description: page.intro
  }
}

export default async function AuthorsPage() {
  const page = await cms.get({type: AuthorList})
  const authors = await cms.find({type: Author})
  const postAuthors = await cms.find({type: BlogPost, select: BlogPost.author})

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {page.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {page.intro}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map(author => {
          const postCount = postAuthors.filter(
            link => link._entry === author._id
          ).length
          return (
            <Link key={author._id} href={author._url} className="group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center space-y-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                {author.avatar && (
                  <Image
                    src={author.avatar.src}
                    alt={author.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover mx-auto flex-shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {author.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
