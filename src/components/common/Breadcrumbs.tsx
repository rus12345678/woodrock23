import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Хлебные крошки" className="py-3 text-xs text-neutral-500 overflow-x-auto no-scrollbar whitespace-nowrap">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link to="/" className="text-neutral-400 hover:text-neutral-900 flex items-center transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Главная</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
              <li>
                {item.path && !isLast ? (
                  <Link to={item.path} className="hover:text-neutral-900 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-900 font-medium">{item.label}</span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
