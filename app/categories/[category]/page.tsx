import { getAllPosts, categories } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { CategoryBadge } from '@/components/category-badge';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  if (!categories[categoryName as keyof typeof categories]) {
    return {
      title: 'Category Not Found - Vetra',
    };
  }

  return {
    title: `${categoryName} - Vetra`,
    description: `Browse all ${categoryName.toLowerCase()} posts on Vetra.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  if (!categories[categoryName as keyof typeof categories]) {
    notFound();
  }

  const posts = getAllPosts().filter(post => post.category === categoryName);

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <CategoryBadge category={categoryName} />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {categoryName}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}