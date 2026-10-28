import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { getAllProducts, formatCategoryName, formatZoneName } from '../utils/relations';
import type { ProductCategory, ZoneType } from '../types';
import { Search, Filter, X, Layers, Armchair, Flame, Sparkles } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = getAllProducts();

  const selectedCategory = searchParams.get('cat') as ProductCategory | null;
  const selectedZone = searchParams.get('zone') as ZoneType | null;
  const searchQuery = searchParams.get('q') || '';

  const categories: { id: ProductCategory | 'all'; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'Все товары', icon: Sparkles },
    { id: 'materials', label: 'Материалы и плиты', icon: Layers },
    { id: 'furniture', label: 'Уличная мебель', icon: Armchair },
    { id: 'equipment', label: 'Оборудование и свет', icon: Flame },
  ];

  const zones: { id: ZoneType; label: string }[] = [
    { id: 'pool', label: 'Бассейн' },
    { id: 'bbq', label: 'Барбекю' },
    { id: 'patio', label: 'Патио' },
    { id: 'terrace', label: 'Терраса' },
    { id: 'pathways', label: 'Дорожки' },
  ];

  const handleCategoryChange = (cat: ProductCategory | 'all') => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', cat);
    }
    setSearchParams(params);
  };

  const handleZoneChange = (zone: ZoneType) => {
    const params = new URLSearchParams(searchParams);
    if (selectedZone === zone) {
      params.delete('zone');
    } else {
      params.set('zone', zone);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (q: string) => {
    const params = new URLSearchParams(searchParams);
    if (!q.trim()) {
      params.delete('q');
    } else {
      params.set('q', q);
    }
    setSearchParams(params);
  };

  const handleResetAll = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      // Zone filter
      if (selectedZone && !p.zones.includes(selectedZone)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.shortDescription.toLowerCase().includes(query) || p.fullDescription.toLowerCase().includes(query);
        const matchSpec = p.specs.some((s) => s.value.toLowerCase().includes(query) || s.label.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchSpec) {
          return false;
        }
      }
      return true;
    });
  }, [allProducts, selectedCategory, selectedZone, searchQuery]);

  const hasActiveFilters = Boolean(selectedCategory || selectedZone || searchQuery.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Каталог комплектации' }]} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-1">
            Комплектация WoodRock
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Каталог материалов, мебели и оборудования
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Все товары отобраны по критериям всепогодности, точной геометрии и эстетической сочетаемости в современных ландшафтных проектах.
          </p>
        </div>
        <div className="text-xs text-neutral-600 whitespace-nowrap">
          Показано: <strong className="text-neutral-900">{filteredProducts.length}</strong> из {allProducts.length} позиций
        </div>
      </div>

      {/* Control bar: Categories tabs & Search */}
      <div className="space-y-4">
        {/* Categories Tab Bar (DJI style) */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = (!selectedCategory && cat.id === 'all') || selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters and Search row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Zone filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-medium text-neutral-600 shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Зона:</span>
            </span>
            {zones.map((zone) => {
              const isActive = selectedZone === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => handleZoneChange(zone.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white font-medium shadow-sm'
                      : 'bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Поиск по названию, материалу..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Badges Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-neutral-600">Активные фильтры:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md font-medium">
                {formatCategoryName(selectedCategory)}
                <button type="button" onClick={() => handleCategoryChange('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedZone && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md font-medium">
                {formatZoneName(selectedZone)}
                <button type="button" onClick={() => handleZoneChange(selectedZone)} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md font-medium">
                «{searchQuery}»
                <button type="button" onClick={() => handleSearchChange('')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-4 ml-2 cursor-pointer"
            >
              Сбросить все
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} onResetFilters={handleResetAll} />
    </div>
  );
};
