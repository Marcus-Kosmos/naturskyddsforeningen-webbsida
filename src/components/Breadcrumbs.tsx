import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50 reading:bg-gray-100 border-b border-gray-200 dark:border-slate-700 reading:border-gray-300"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm flex-wrap font-bold">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
              aria-label="Hem"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>

          {/* Breadcrumb items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            // Skip the home item since we render it above
            if (item.href === '/') return null;

            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                {isLast ? (
                  <span
                    className="text-gray-900 dark:text-white reading:text-gray-900"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
