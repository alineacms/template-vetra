import type {Infer} from 'alinea'
import type {Category} from '@/cms/schema'

interface CategoryBadgeProps {
  category: Infer<typeof Category>
}

export function CategoryBadge({category}: CategoryBadgeProps) {
  return (
    <>
      <span
        className="inline-flex items-center text-xs font-medium uppercase tracking-wide dark:hidden"
        style={{color: category.theme.colorLight}}
      >
        {category.title}
      </span>
      <span
        className="hidden dark:inline-flex items-center text-xs font-medium uppercase tracking-wide"
        style={{color: category.theme.colorDark}}
      >
        {category.title}
      </span>
    </>
  )
}
