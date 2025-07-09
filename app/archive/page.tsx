import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive - Vetra',
  description: 'Browse all blog posts chronologically.',
};

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Archive
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse all posts chronologically and discover content across all categories.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
        </div>
      )}
    </div>
  );
}