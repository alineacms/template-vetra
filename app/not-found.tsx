import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Vetra',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8 py-16">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
      
      <div className="space-y-4">
        <Link 
          href="/"
          className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Go Back Home
        </Link>
        
        <div className="flex justify-center space-x-4 text-sm">
          <Link 
            href="/archive"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Browse Archive
          </Link>
          <span className="text-gray-400">•</span>
          <Link 
            href="/contact"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}