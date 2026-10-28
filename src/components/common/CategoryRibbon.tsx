import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Layers, Armchair, Flame, Waves, Sparkles, LayoutGrid } from 'lucide-react';

interface RibbonItem {
  label: string;
  sub: string;
  path: string;
  icon: React.ElementType;
}

const ribbonItems: RibbonItem[] = [
  { label: 'Все решения', sub: 'Обзор', path: '/solutions', icon: LayoutGrid },
  { label: 'Проектирование', sub: 'Чертежи и 3D', path: '/design', icon: Compass },
  { label: 'Материалы', sub: 'Плиты и камень', path: '/catalog?cat=materials', icon: Layers },
  { label: 'Уличная мебель', sub: 'Лаунж и обеды', path: '/catalog?cat=furniture', icon: Armchair },
  { label: 'Оборудование', sub: 'Грили и свет', path: '/catalog?cat=equipment', icon: Flame },
  { label: 'Зоны бассейнов', sub: 'Мощение и вода', path: '/solutions?zone=pool', icon: Waves },
  { label: 'Патио и террасы', sub: 'Кострища и отдых', path: '/solutions?zone=patio', icon: Sparkles },
];

export const CategoryRibbon: React.FC = () => {
  const location = useLocation();
  const currentUrl = `${location.pathname}${location.search}`;

  return (
    <div className="w-full bg-neutral-50/80 border-b border-neutral-200/60 py-3 backdrop-blur-sm sticky top-[61px] sm:top-[69px] z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {ribbonItems.map((item) => {
            const isActive = currentUrl === item.path || (item.path !== '/' && currentUrl.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs transition-all duration-200 border ${
                  isActive
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm font-medium'
                    : 'bg-white border-neutral-200/80 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100/60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-medium">{item.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {item.sub}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
