import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { getSolutionsForProduct, formatCategoryName, formatZoneName } from '../../utils/relations';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const linkedSolutions = getSolutionsForProduct(product.id);
  const primarySolution = linkedSolutions[0];

  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden flex flex-col hover:border-neutral-400/80 hover:shadow-card transition-all duration-300">
      {/* Image container */}
      <Link to={`/catalog/${product.id}`} className="relative aspect-[4/3] bg-neutral-100 overflow-hidden block">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category & Badge overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-[11px] font-semibold text-neutral-800 rounded-lg shadow-sm">
            {formatCategoryName(product.category)}
          </span>
          {product.badge && (
            <span className="px-2.5 py-1 bg-neutral-900/90 text-white text-[11px] font-medium rounded-lg shadow-sm">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <Link to={`/catalog/${product.id}`} className="block group-hover:text-neutral-600 transition-colors">
            <h3 className="font-semibold text-base text-neutral-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specs Snippet */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-neutral-600 block">{product.specs[0].label}:</span>
                <span className="font-medium text-neutral-800 truncate block">{product.specs[0].value}</span>
              </div>
              {product.specs[1] && (
                <div>
                  <span className="text-neutral-600 block">{product.specs[1].label}:</span>
                  <span className="font-medium text-neutral-800 truncate block">{product.specs[1].value}</span>
                </div>
              )}
            </div>
          )}

          {/* Zones badges */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.zones.slice(0, 3).map((zone) => (
              <span
                key={zone}
                className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px]"
              >
                {formatZoneName(zone)}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-5 pt-3 border-t border-neutral-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
              Стоимость
            </span>
            <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
              {product.price}
            </span>
          </div>

          {/* DUAL BIDIRECTIONAL ACTION: Посмотреть в готовом решении */}
          {primarySolution ? (
            <Link
              to={`/solutions/${primarySolution.id}`}
              className="w-full py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-xs font-semibold rounded-xl transition-colors flex items-center justify-between group/sol"
              title={`Посмотреть в пространстве: ${primarySolution.name}`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">В решении: {primarySolution.name}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-neutral-400 group-hover/sol:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <div className="text-[11px] text-neutral-600 italic py-1 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-neutral-400" />
              <span>Базовый элемент комплектации</span>
            </div>
          )}

          {/* Details CTA */}
          <Link
            to={`/catalog/${product.id}`}
            className="w-full py-2 px-3 border border-neutral-200 hover:border-neutral-900 text-neutral-800 hover:text-neutral-900 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <span>Подробнее о материале</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
