import { categories } from '@/lib/posts';
import { CategoryBadge } from '@/components/category-badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories - Vetra',
  description: 'Browse blog posts by category.',
};

const categoryDescriptions = {
  Lifestyle: 'Discover insights on mindful living, personal growth, and finding balance in our modern world.',
  Design: 'Explore the principles, trends, and practices that shape beautiful and functional digital experiences.',
  Technology: 'Stay updated on emerging technologies and their impact on how we live, work, and connect.',
  Culture: 'Examine the cultural shifts and social dynamics that define our interconnected global society.',
  Ideas: 'Big thoughts, creative concepts, and innovative perspectives that challenge conventional thinking.'
};

export default function CategoriesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Categories
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore posts organized by topic and discover content that interests you most.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {Object.keys(categories).map((category) => (
          <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <CategoryBadge category={category} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {category}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {categoryDescriptions[category as keyof typeof categoryDescriptions]}
            </p>
            <a 
              href={`/categories/${category.toLowerCase()}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
            >
              Browse {category} posts →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}