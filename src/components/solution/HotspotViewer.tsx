import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Solution } from '../../types';
import { getProductById, formatCategoryName } from '../../utils/relations';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface HotspotViewerProps {
  solution: Solution;
}

export const HotspotViewer: React.FC<HotspotViewerProps> = ({ solution }) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const activeHotspot = solution.hotspots?.find((h) => h.id === activeHotspotId);
  const activeProduct = activeHotspot ? getProductById(activeHotspot.productId) : null;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-neutral-900 shadow-premium border border-neutral-200">
      {/* Main Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
        <img
          src={solution.heroImage}
          alt={solution.name}
          className="w-full h-full object-cover select-none"
        />

        {/* Gradient vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Hotspots Info Hint */}
        {solution.hotspots && solution.hotspots.length > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Интерактивный вид: нажмите на точки для выбора товара</span>
            <span className="sm:hidden">Интерактивные точки</span>
          </div>
        )}

        {/* Interactive Hotspot Dots */}
        {solution.hotspots?.map((hs) => {
          const isActive = hs.id === activeHotspotId;
          return (
            <div
              key={hs.id}
              className="absolute z-20"
              style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <button
                type="button"
                onClick={() => setActiveHotspotId(isActive ? null : hs.id)}
                aria-label={hs.label}
                className="relative group p-2 focus:outline-none"
              >
                {/* Ripple ring */}
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-75" />

                {/* Inner dot */}
                <span
                  className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all shadow-lg ${
                    isActive
                      ? 'bg-neutral-900 border-white text-white scale-110'
                      : 'bg-white/90 border-neutral-900 text-neutral-900 hover:scale-110 hover:bg-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                </span>

                {/* Label Tooltip on hover */}
                <span className="hidden md:block absolute left-1/2 -bottom-7 -translate-x-1/2 whitespace-nowrap bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {hs.label}
                </span>
              </button>
            </div>
          );
        })}

        {/* Active Product Popover Box */}
        {activeProduct && activeHotspot && (
          <div
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-modal border border-neutral-200 animate-in fade-in slide-in-from-bottom-3 duration-200"
            role="dialog"
            aria-label="Информация об элементе"
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-medium rounded-md uppercase tracking-wide">
                {formatCategoryName(activeProduct.category)}
              </span>
              <button
                type="button"
                onClick={() => setActiveHotspotId(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900 rounded-lg transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                <img
                  src={activeProduct.images[0]}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-neutral-900 truncate">
                  {activeProduct.name}
                </h4>
                <p className="text-[11px] text-neutral-600 line-clamp-2 mt-0.5 leading-snug">
                  {activeProduct.shortDescription}
                </p>
                <div className="text-[11px] font-semibold text-neutral-900 mt-1">
                  {activeProduct.price}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-600">Входит в данное решение</span>
              <Link
                to={`/catalog/${activeProduct.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <span>В карточку товара</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
