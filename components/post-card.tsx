import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { CategoryBadge } from './category-badge';
import { PostMetadata } from '@/lib/posts';

interface PostCardProps {
  post: PostMetadata;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className={`relative ${featured ? 'h-80 md:h-96' : 'h-64 md:h-80'} overflow-hidden rounded-lg mb-4`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          />
        </div>
      </Link>
      
      <div className="space-y-3">
        <CategoryBadge category={post.category} />
        
        <Link href={`/blog/${post.slug}`}>
          <h2 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}>
            {post.title}
          </h2>
        </Link>
        
        <div className="flex items-center space-x-3 pt-2">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link 
              href={`/authors/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {post.author.name}
            </Link>
            <span>•</span>
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </div>
    </article>
  );
}