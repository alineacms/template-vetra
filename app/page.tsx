import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts.slice(2);

  return (
    <div className="space-y-20">
      {/* Featured Posts */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} featured={true} />
          ))}
        </div>
      </section>

      {/* Regular Posts Grid */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        
        {/* All Posts Button */}
        <div className="text-center pt-12">
          <Link 
            href="/archive"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}