import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getProductById, getSolutionsForProduct, getRelatedProducts, formatCategoryName, formatZoneName } from '../utils/relations';
import { useInquiry } from '../context/InquiryContext';
import { SolutionCard } from '../components/solution/SolutionCard';
import { ProductCard } from '../components/product/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openInquiry } = useInquiry();

  const product = id ? getProductById(id) : undefined;
  const linkedSolutions = product ? getSolutionsForProduct(product.id) : [];
  const relatedProducts = product ? getRelatedProducts(product, 3) : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Товар не найден</h2>
        <p className="text-sm text-neutral-600 mb-6">Возможно, позиция была перемещена или ссылка устарела.</p>
        <Link
          to="/catalog"
          className="px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-semibold"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Каталог', path: '/catalog' },
          { label: formatCategoryName(product.category), path: `/catalog?cat=${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Main Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900/90 text-white text-xs font-semibold rounded-xl backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category tag & Share */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg uppercase tracking-wider">
                {formatCategoryName(product.category)}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
                title="Скопировать ссылку"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Ссылка скопирована' : 'Поделиться'}</span>
              </button>
            </div>

            {/* Product Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
              {product.subtitle}
            </p>

            {/* Price Tag */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-600 block font-semibold">
                  Условия поставки
                </span>
                <span className="text-base font-bold text-neutral-900">
                  {product.price}
                </span>
              </div>
              <span className="text-[11px] text-neutral-600 max-w-[160px] text-right">
                Расчет под ваш метраж и проект с учетом подрезки
              </span>
            </div>

            {/* Application Zones */}
            <div>
              <span className="text-xs font-semibold text-neutral-700 block mb-2">
                Рекомендованные зоны применения:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.zones.map((zone) => (
                  <span
                    key={zone}
                    className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium"
                  >
                    {formatZoneName(zone)}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-neutral-700 block mb-1">
                Описание:
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-neutral-200">
            {/* Primary CTA: Запросить расчет */}
            <button
              type="button"
              onClick={() =>
                openInquiry({
                  type: 'product',
                  productId: product.id,
                  productName: product.name,
                })
              }
              className="w-full py-4 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Запросить расчет стоимости</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* SECONDARY PROMINENT CTA: Scroll or Jump to Ready Solution */}
            {linkedSolutions.length > 0 && (
              <a
                href="#ready-solutions"
                className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Посмотреть в готовом решении ({linkedSolutions.length})</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {product.specs && product.specs.length > 0 && (
        <section className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200/80">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-6">
            Технические характеристики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between py-2.5 border-b border-neutral-200 text-xs sm:text-sm"
              >
                <span className="text-neutral-500">{spec.label}</span>
                <span className="font-semibold text-neutral-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CRITICAL SECTION: «КАК ВЫГЛЯДИТ В ГОТОВОМ ПРОСТРАНСТВЕ» */}
      <section id="ready-solutions" className="space-y-6 pt-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Двусторонняя связь</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Как этот товар выглядит в готовом пространстве
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
              Товар <strong>«{product.name}»</strong> применен в следующих архитектурных решениях WoodRock. Нажмите на карточку, чтобы изучить планировку, окружение и полный состав зоны.
            </p>
          </div>
        </div>

        {linkedSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-200 text-center text-xs text-neutral-500">
            Этот товар доступен для индивидуального подбора в ваш проект ландшафта.
          </div>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900">
              Сочетается с этим материалом
            </h3>
            <Link to="/catalog" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
              <span>Весь каталог</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
