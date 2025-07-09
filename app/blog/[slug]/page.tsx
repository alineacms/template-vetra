import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { CategoryBadge } from '@/components/category-badge';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Vetra',
    };
  }

  return {
    title: `${post.title} - Vetra`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <CategoryBadge category={post.category} />
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.excerpt}
        </p>
        
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
              href={`/authors/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {post.author.name}
            </Link>
            <span>•</span>
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </header>

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

      <div 
        className="prose prose-lg max-w-none dark:prose-invert 
          prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed prose-li:text-lg
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 
          prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
          prose-h1:mb-8 prose-h2:mb-6 prose-h3:mb-5 prose-h4:mb-4
          prose-h1:mt-16 prose-h2:mt-14 prose-h3:mt-12 prose-h4:mt-10
          first:prose-h1:mt-0 first:prose-h2:mt-0 first:prose-h3:mt-0 first:prose-h4:mt-0"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}