import React from 'react';
import { Link } from 'react-router-dom';
import type { Solution } from '../../types';
import { formatZoneName } from '../../utils/relations';
import { ArrowRight, Layers, Clock, Maximize2 } from 'lucide-react';

interface SolutionCardProps {
  solution: Solution;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  return (
    <div className="group bg-white rounded-3xl border border-neutral-200/90 overflow-hidden flex flex-col hover:shadow-card hover:border-neutral-400/80 transition-all duration-300">
      {/* Visual Header */}
      <Link to={`/solutions/${solution.id}`} className="relative aspect-[16/10] bg-neutral-100 overflow-hidden block">
        <img
          src={solution.heroImage}
          alt={solution.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-xs font-semibold text-neutral-900 rounded-xl shadow-sm">
            {formatZoneName(solution.zoneType)}
          </span>
          {solution.badge && (
            <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-xl shadow-sm">
              {solution.badge}
            </span>
          )}
        </div>

        {/* Count of items used */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs rounded-xl">
            <Layers className="w-3.5 h-3.5" />
            <span>В решении: {solution.productIds.length} товаров</span>
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/solutions/${solution.id}`}>
            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors tracking-tight">
              {solution.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
            {solution.subtitle}
          </p>

          {/* Meta specs */}
          <div className="mt-4 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs text-neutral-600">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Площадь: <strong className="text-neutral-900 font-semibold">{solution.meta.area}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Срок: <strong className="text-neutral-900 font-semibold">{solution.meta.timeline}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-neutral-100">
          <Link
            to={`/solutions/${solution.id}`}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-xl transition-all flex items-center justify-between group/btn cursor-pointer"
          >
            <span>Смотреть состав решения и фото</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
