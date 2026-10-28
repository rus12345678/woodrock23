import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getAllSolutions } from '../utils/relations';
import { SolutionCard } from '../components/solution/SolutionCard';
import type { ZoneType } from '../types';
import { Sparkles, Filter, X } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allSolutions = getAllSolutions();

  const selectedZone = searchParams.get('zone') as ZoneType | null;

  const zoneFilters: { id: ZoneType | 'all'; label: string }[] = [
    { id: 'all', label: 'Все пространства' },
    { id: 'pool', label: 'Зона бассейна' },
    { id: 'bbq', label: 'Зона барбекю' },
    { id: 'patio', label: 'Патио' },
    { id: 'terrace', label: 'Терраса' },
    { id: 'pathways', label: 'Дорожки и мощение' },
  ];

  const handleZoneChange = (zone: ZoneType | 'all') => {
    const params = new URLSearchParams(searchParams);
    if (zone === 'all') {
      params.delete('zone');
    } else {
      params.set('zone', zone);
    }
    setSearchParams(params);
  };

  const filteredSolutions = useMemo(() => {
    if (!selectedZone) return allSolutions;
    return allSolutions.filter((s) => s.zoneType === selectedZone);
  }, [allSolutions, selectedZone]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Готовые решения' }]} />

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Комплексные концепции</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Готовые решения WoodRock
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            Архитектурно выверенные пространства для загородной жизни. Каждое решение объединяет мощение, мебель и оборудование в согласованную композицию с возможностью индивидуальной адаптации под ваш участок.
          </p>
        </div>
        <div className="text-xs text-neutral-600 whitespace-nowrap">
          Доступно: <strong className="text-neutral-900">{filteredSolutions.length}</strong> готовых зон
        </div>
      </div>

      {/* Filter Chips Bar (DJI style) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-medium text-neutral-600 shrink-0 flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5 text-neutral-400" />
          <span>Тип зоны:</span>
        </span>
        {zoneFilters.map((zf) => {
          const isActive = (!selectedZone && zf.id === 'all') || selectedZone === zf.id;
          return (
            <button
              key={zf.id}
              type="button"
              onClick={() => handleZoneChange(zf.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {zf.label}
            </button>
          );
        })}

        {selectedZone && (
          <button
            type="button"
            onClick={() => handleZoneChange('all')}
            className="text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-4 ml-2 shrink-0 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Сбросить</span>
          </button>
        )}
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredSolutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </div>
  );
};
