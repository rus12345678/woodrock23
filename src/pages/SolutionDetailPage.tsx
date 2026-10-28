import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getSolutionById, getProductsGroupedForSolution, formatZoneName } from '../utils/relations';
import { useInquiry } from '../context/InquiryContext';
import { HotspotViewer } from '../components/solution/HotspotViewer';
import { ProductCard } from '../components/product/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  Clock,
  Layers,
  Share2,
} from 'lucide-react';

export const SolutionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openInquiry } = useInquiry();

  const solution = id ? getSolutionById(id) : undefined;
  const [activeTab, setActiveTab] = useState<'all' | 'materials' | 'furniture' | 'equipment'>('all');
  const [copied, setCopied] = useState(false);

  if (!solution) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Решение не найдено</h2>
        <p className="text-sm text-neutral-600 mb-6">Возможно, проект был перемещен или ссылка устарела.</p>
        <Link
          to="/solutions"
          className="px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-semibold"
        >
          Вернуться к готовым решениям
        </Link>
      </div>
    );
  }

  const groupedProducts = getProductsGroupedForSolution(solution);
  const totalProductsCount = solution.productIds.length;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayedProducts = () => {
    switch (activeTab) {
      case 'materials':
        return groupedProducts.materials;
      case 'furniture':
        return groupedProducts.furniture;
      case 'equipment':
        return groupedProducts.equipment;
      default:
        return [
          ...groupedProducts.materials,
          ...groupedProducts.furniture,
          ...groupedProducts.equipment,
        ];
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Готовые решения', path: '/solutions' },
          { label: formatZoneName(solution.zoneType), path: `/solutions?zone=${solution.zoneType}` },
          { label: solution.name },
        ]}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-neutral-100 text-neutral-900 text-xs font-semibold rounded-lg">
              {formatZoneName(solution.zoneType)}
            </span>
            {solution.badge && (
              <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-lg">
                {solution.badge}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            {solution.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            {solution.subtitle}
          </p>
        </div>

        {/* Share and quick stats */}
        <div className="flex items-center gap-4 text-xs text-neutral-600">
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-2 border border-neutral-200 rounded-xl hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Скопировано' : 'Поделиться'}</span>
          </button>
        </div>
      </div>

      {/* Hero Interactive Hotspots View */}
      <section className="space-y-4">
        <HotspotViewer solution={solution} />

        {/* Context metadata cards below image */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
            <Maximize2 className="w-5 h-5 text-neutral-400" />
            <div>
              <span className="text-[11px] text-neutral-600 block">Площадь решения:</span>
              <strong className="text-sm font-semibold text-neutral-900">{solution.meta.area}</strong>
            </div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
            <Clock className="w-5 h-5 text-neutral-400" />
            <div>
              <span className="text-[11px] text-neutral-600 block">Срок комплектации:</span>
              <strong className="text-sm font-semibold text-neutral-900">{solution.meta.timeline}</strong>
            </div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-neutral-400" />
            <div>
              <span className="text-[11px] text-neutral-600 block">Архитектурный стиль:</span>
              <strong className="text-sm font-semibold text-neutral-900">{solution.meta.style}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Description and CTAs */}
      <section className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block">
            Архитектурная концепция
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            {solution.concept}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {solution.description}
          </p>
        </div>

        {/* Action Buttons: Хочу похожее решение & Подобрать под мой участок */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-sm space-y-3">
          <div className="text-sm font-bold text-neutral-900 mb-1">
            Заинтересовало это пространство?
          </div>
          <p className="text-xs text-neutral-600 mb-4">
            Мы адаптируем планировку под конфигурацию вашего участка и рассчитаем точную смету материалов.
          </p>

          <button
            type="button"
            onClick={() =>
              openInquiry({
                type: 'solution',
                solutionId: solution.id,
                solutionName: solution.name,
                comment: 'Хочу похожее решение',
              })
            }
            className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Хочу похожее решение</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              openInquiry({
                type: 'solution',
                solutionId: solution.id,
                solutionName: solution.name,
                comment: 'Подобрать под мой участок (с адаптацией размеров)',
              })
            }
            className="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-neutral-900 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Подобрать под мой участок</span>
          </button>
        </div>
      </section>

      {/* CORE BIDIRECTIONAL SECTION: «ЧТО ИСПОЛЬЗОВАНО В ЭТОМ РЕШЕНИИ» */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg mb-2">
              <Layers className="w-3.5 h-3.5 text-neutral-600" />
              <span>Состав комплектации</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Что использовано в этом решении
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Все элементы спецификации — реальные позиции каталога WoodRock. Нажмите на любой товар, чтобы изучить подробные характеристики или запросить расчет.
            </p>
          </div>

          {/* Subcategory Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Все товары ({totalProductsCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('materials')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Материалы ({groupedProducts.materials.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('furniture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'furniture'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Мебель ({groupedProducts.furniture.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('equipment')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'equipment'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Оборудование ({groupedProducts.equipment.length})
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Solution Gallery */}
      {solution.gallery.length > 1 && (
        <section className="space-y-4 pt-6 border-t border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900">
            Дополнительные ракурсы пространства
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {solution.gallery.map((img, idx) => (
              <div key={img} className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={img}
                  alt={`${solution.name} ракурс ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
