import { getAllAuthors } from '@/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authors - Vetra',
  description: 'Meet the writers and contributors of Vetra.',
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Authors
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Meet the talented writers and contributors who make Vetra possible.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <Link 
            key={author.slug} 
            href={`/authors/${author.slug}`}
            className="group"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center space-y-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
              <Image
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover mx-auto flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {author.postCount} {author.postCount === 1 ? 'post' : 'posts'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}