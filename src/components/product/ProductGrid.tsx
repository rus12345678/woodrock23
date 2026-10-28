import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-neutral-50 rounded-3xl border border-dashed border-neutral-300 p-8">
        <PackageOpen className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
        <h4 className="text-base font-semibold text-neutral-900 mb-1">
          Товары не найдены
        </h4>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-5">
          По выбранным фильтрам или поисковому запросу ничего не найдено. Попробуйте сбросить параметры.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-full hover:bg-neutral-800 transition-colors"
          >
            Сбросить все фильтры
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
