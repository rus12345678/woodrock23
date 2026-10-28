import React from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import { getAllSolutions, getAllProducts } from '../utils/relations';
import { processSteps } from '../data/process';
import { SolutionCard } from '../components/solution/SolutionCard';
import { ProductCard } from '../components/product/ProductCard';
import { InquiryForm } from '../components/forms/InquiryForm';
import {
  ArrowRight,
  Compass,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openInquiry } = useInquiry();
  const featuredSolutions = getAllSolutions().slice(0, 3);
  const featuredProducts = getAllProducts().slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION (DJI style: large, clean, premium presentation) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
        {/* Background Image with subtle gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Современный загородный участок WoodRock"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Subtle Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-neutral-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Экосистема загородного пространства WoodRock</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-white max-w-4xl mx-auto">
            От проекта до готового пространства
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Ландшафтный дизайн, материалы, мебель и оборудование — в единой концепции WoodRock.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/solutions"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Смотреть готовые решения</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openInquiry({ type: 'design' })}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-semibold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Заказать проект</span>
              <Compass className="w-4 h-4 text-neutral-300" />
            </button>
          </div>

          {/* Quick value props ribbon */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div>
              <div className="text-xs text-neutral-400">Проектирование</div>
              <div className="text-sm font-semibold text-white mt-0.5">Чертежи и 4K 3D</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Материалы</div>
              <div className="text-sm font-semibold text-white mt-0.5">Плиты и гранит</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Мебель</div>
              <div className="text-sm font-semibold text-white mt-0.5">Всепогодный лаунж</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Комплектация</div>
              <div className="text-sm font-semibold text-white mt-0.5">В едином стиле</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS (Проектирование, Комплектация, Готовые решения) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-2">
            Архитектура сервиса
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Три направления — один результат
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3">
            Мы объединили инженерное проектирование, поставку премиальных материалов и сборку готовых зон отдыха без посредников.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="group bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 flex flex-col justify-between hover:bg-white hover:shadow-card hover:border-neutral-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1">
                Направление 01
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Ландшафтный дизайн
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Разработка генерального плана, вертикальной планировки, поштучной раскладки плит мощения и фотореалистичных визуализаций 4K.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Точные инженерные чертежи</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Фотореалистичные 3D-рендеры</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Привязка к складским позициям</span>
                </li>
              </ul>
            </div>
            <Link
              to="/design"
              className="inline-flex items-center justify-between w-full py-3 px-4 bg-white border border-neutral-200 group-hover:border-neutral-900 rounded-xl text-xs font-semibold text-neutral-900 transition-colors"
            >
              <span>Подробнее о проектировании</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="group bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 flex flex-col justify-between hover:bg-white hover:shadow-card hover:border-neutral-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1">
                Направление 02
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Комплектация
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Собственная линейка архитектурных плит высокой прочности, всепогодная мебель из тика и алюминия, а также профессиональное оборудование.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Архитектурные плиты и гранит</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Лаунж-группы и шезлонги</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Грили и ландшафтный свет</span>
                </li>
              </ul>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-between w-full py-3 px-4 bg-white border border-neutral-200 group-hover:border-neutral-900 rounded-xl text-xs font-semibold text-neutral-900 transition-colors"
            >
              <span>Перейти в каталог товаров</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="group bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 flex flex-col justify-between hover:bg-white hover:shadow-card hover:border-neutral-300 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1">
                Направление 03
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Готовые решения
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Продуманные зоны отдыха «под ключ»: бассейны, уличные кухни-барбекю, террасы и садовые дорожки с взаимной связью всех элементов.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Согласованная колористика и эргономика</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Интерактивный состав элементов</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Быстрый расчет под ваш метраж</span>
                </li>
              </ul>
            </div>
            <Link
              to="/solutions"
              className="inline-flex items-center justify-between w-full py-3 px-4 bg-white border border-neutral-200 group-hover:border-neutral-900 rounded-xl text-xs font-semibold text-neutral-900 transition-colors"
            >
              <span>Смотреть готовые пространства</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED READY SOLUTIONS (Готовые пространства) */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-2">
                Готовые пространства
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Как материалы оживают в проектах
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl">
                Выберите готовую концепцию и изучите примененные материалы, мебель и освещение с возможностью индивидуальной адаптации.
              </p>
            </div>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              <span>Все 5 готовых решений</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Подборка материалов, мебели и оборудования) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-2">
              Каталог комплектации
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Материалы, мебель и оборудование
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl">
              Каждый товар можно не просто изучить по характеристикам, но и сразу увидеть в составе реализованного пространства.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            <span>Смотреть полный каталог</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. HOW WE WORK BLOCK */}
      <section className="bg-neutral-950 text-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block mb-2">
              Прозрачный процесс
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Как мы работаем
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
              От первого выезда на участок до расстановки шезлонгов: 4 этапа без срывов сроков и непредвиденных переделок.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-neutral-400 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
                  Срок: <span className="text-neutral-200 font-medium">{step.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/how-we-work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-xs font-semibold rounded-full hover:bg-neutral-100 transition-colors"
            >
              <span>Подробный регламент работы и состав проекта</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION & SPECIALIST CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-3xl border border-neutral-200 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block">
              Экспертный диалог
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Не знаете, с чего начать благоустройство?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
              Наш ландшафтный архитектор изучит форму участка, перепады высот и стиль вашего дома. Мы подскажем, какие зоны логично совместить, и покажем образцы плит и мебели в нашем шоуруме.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                <span>Честная оценка без навязывания лишних работ</span>
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
                <span>Точный расчет под ваш бюджет</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-sm">
            <h4 className="text-base font-bold text-neutral-900 mb-1">
              Заявка на консультацию
            </h4>
            <p className="text-xs text-neutral-600 mb-4">
              Оставьте контактные данные — мы перезвоним в течение рабочего дня.
            </p>
            <InquiryForm initialType="general" />
          </div>
        </div>
      </section>
    </div>
  );
};
