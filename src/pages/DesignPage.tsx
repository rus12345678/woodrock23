import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useInquiry } from '../context/InquiryContext';
import { designTiers } from '../data/process';
import { InquiryForm } from '../components/forms/InquiryForm';
import {
  Compass,
  Layers,
  FileCheck2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const DesignPage: React.FC = () => {
  const { openInquiry } = useInquiry();

  const drawingsExamples = [
    {
      title: 'План мощения и поштучная раскладка плит',
      category: 'Рабочая документация',
      description: 'Исключает перерасход дорогих материалов. Строители укладывают плиты строго по координатной сетке с заданными швами.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: '3D-визуализации высокого разрешения (4K)',
      category: 'Фотореалистичные рендеры',
      description: 'Вы видите, как гармонируют оттенки плит, фактура дерева и освещение в сумерках еще до начала земляных работ.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Схема вертикальной планировки и скрытого дренажа',
      category: 'Инженерные узлы',
      description: 'Расчет уклонов, отметок высот ступеней и привязка скрытых лотков SlotDrain к чаше бассейна и террасе.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Ведомость комплектации WoodRock',
      category: 'Спецификация',
      description: 'Прямая связь чертежей со складскими позициями плит, мебели и гриль-зон. Никаких артикулов, которых нет в наличии.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Ландшафтный дизайн' }]} />

      {/* Hero: Clean, architectural, honest */}
      <section className="relative rounded-3xl bg-neutral-900 text-white overflow-hidden p-8 sm:p-14 lg:p-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80"
            alt="Ландшафтный проект WoodRock"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-neutral-300">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Инженерный подход к ландшафту</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
            Ландшафтный дизайн, привязанный к реальности
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Мы не рисуем абстрактные картинки. Каждый проект WoodRock разрабатывается с учетом реальных высотных отметок, состава грунтов и точных размеров материалов из нашего каталога.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => openInquiry({ type: 'design' })}
              className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Обсудить мой участок</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#drawings"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center justify-center gap-2"
            >
              <span>Примеры чертежей и рендеров</span>
            </a>
          </div>
        </div>
      </section>

      {/* Honest Disclaimer Banner (No false promises) */}
      <section className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Честный регламент без скрытых условий:</strong>
          Мы не обещаем «бесплатный проект за 2 дня» или фиксированные сроки без выезда на участок и изучения геоподосновы. Стоимость и сроки проектирования рассчитываются строго индивидуально после уточнения площади, перепада высот и пожеланий по функциональным зонам.
        </div>
      </section>

      {/* The Core Synergy: Design -> Supply -> Solutions */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-2">
            Связанная экосистема
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Связь проекта с материалами и мебелью
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Почему проект от WoodRock выгоднее разрозненных подрядчиков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Точная геометрия мощения
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Мы заранее знаем размеры наших архитектурных плит (800×800, 1200×600) и проектируем дорожки без хаотичной подрезки. Это снижает отходы камня с типовых 20% до 4%.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Согласованная комплектация
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              В проекте закладываются реальные габариты диванов Linea, шезлонгов Aero и гриль-станций FireCraft. Вам не придется подбирать аналоги с риском, что мебель не поместится.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Скрытая инженерия
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Точки подключения ландшафтных светильников Ray и скрытых водоотводных лотков SlotDrain закладываются до заливки бетона, сохраняя монолитный минимализм.
            </p>
          </div>
        </div>
      </section>

      {/* Blueprint Drawings & 3D Render Gallery */}
      <section id="drawings" className="space-y-6 pt-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-1">
            Состав документации
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Примеры чертежей и визуализаций
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            Комплект рабочей документации, по которому любая квалифицированная строительная бригада безошибочно реализует объект.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drawingsExamples.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col hover:shadow-card hover:border-neutral-300 transition-all"
            >
              <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-[11px] font-semibold text-neutral-800 rounded-lg shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Tiers */}
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-1">
            Форматы работы
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Варианты проектных решений
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 border flex flex-col justify-between ${
                tier.badge
                  ? 'bg-neutral-900 text-white border-neutral-800 shadow-premium'
                  : 'bg-white text-neutral-900 border-neutral-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold tracking-tight">
                    {tier.name}
                  </h3>
                  {tier.badge && (
                    <span className="px-3 py-1 bg-white text-neutral-900 text-xs font-semibold rounded-full">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className={`text-xs mb-3 font-medium ${tier.badge ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {tier.target}
                </div>
                <p className={`text-xs leading-relaxed mb-6 ${tier.badge ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {tier.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-neutral-200/20 mb-8">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${tier.badge ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Что входит в состав:
                  </div>
                  {tier.composition.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.badge ? 'text-white' : 'text-neutral-900'}`} />
                      <span className={tier.badge ? 'text-neutral-300' : 'text-neutral-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openInquiry({ type: 'design', comment: `Интересует формат: ${tier.name}` })}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  tier.badge
                    ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <span>Выбрать этот формат</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Inquiry Form for Design */}
      <section className="bg-neutral-50 rounded-3xl border border-neutral-200 p-8 sm:p-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block mb-1">
            Старт работы
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Обсудить проектирование участка
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
            Оставьте заявку с примерной площадью участка. Мы свяжемся с вами, чтобы согласовать дату консультации и выезда.
          </p>
        </div>
        <InquiryForm initialType="design" />
      </section>
    </div>
  );
};
