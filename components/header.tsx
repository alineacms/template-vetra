'use client';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
export function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <span className="text-xl font-bold tracking-tight">Vetra</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/about') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              About
            </Link>
            <Link 
              href="/archive" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/archive') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              Archive
            </Link>
            <Link 
              href="/categories" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/categories') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              Categories
            </Link>
            <Link 
              href="/authors" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/authors') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              Authors
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm transition-all duration-200 font-medium px-3 py-2 rounded-lg ${
                isActive('/contact') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
              }`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}