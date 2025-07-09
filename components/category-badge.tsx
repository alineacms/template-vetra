import { categories } from '@/lib/posts';

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const getCategoryColor = (category: string, isDark: boolean = false) => {
    const colors = {
      Lifestyle: isDark ? '#FFB380' : '#E67E22',
      Design: isDark ? '#85C1E9' : '#3498DB', 
      Technology: isDark ? '#A9DFBF' : '#27AE60',
      Culture: isDark ? '#D7BDE2' : '#8E44AD',
      Ideas: isDark ? '#F7DC6F' : '#F39C12',
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };
  
  return (
    <>
      <span
        className="inline-flex items-center text-xs font-medium uppercase tracking-wide dark:hidden"
        style={{ color: getCategoryColor(category, false) }}
      >
        {category}
      </span>
      <span
        className="hidden dark:inline-flex items-center text-xs font-medium uppercase tracking-wide"
        style={{ color: getCategoryColor(category, true) }}
      >
        {category}
      </span>
    </>
  );
}