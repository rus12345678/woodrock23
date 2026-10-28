import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { processSteps } from '../data/process';
import { useInquiry } from '../context/InquiryContext';
import {
  CheckCircle2,
  ShieldCheck,
  Compass,
  Layers,
} from 'lucide-react';

export const HowWeWorkPage: React.FC = () => {
  const { openInquiry } = useInquiry();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Как мы работаем' }]} />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block">
          Регламент взаимодействия
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Как WoodRock ведет проект от чертежа до газона
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          Единая ответственность одного подрядчика. Мы исключаем классический конфликт между ландшафтным дизайнером, поставщиками плит и строителями.
        </p>
      </div>

      {/* Step by step timeline */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden"
            >
              {/* Number and Step label */}
              <div className="lg:col-span-3 space-y-2">
                <span className="text-4xl sm:text-5xl font-mono font-bold text-neutral-300">
                  {step.step}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {step.title}
                </h3>
                <div className="text-xs text-neutral-600 font-medium">
                  {step.subtitle}
                </div>
                <div className="pt-2 text-xs text-neutral-700">
                  Ориентир по сроку: <strong className="text-neutral-900">{step.duration}</strong>
                </div>
              </div>

              {/* Description and Deliverables */}
              <div className="lg:col-span-9 space-y-4 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-4 lg:pt-0 lg:pl-8">
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-neutral-900 block mb-2.5">
                    Результат этапа (что получает заказчик):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-xl text-xs text-neutral-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Guarantees & Realism */}
      <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block">
            Инженерные стандарты
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Почему наш подход исключает переделки
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-white">
              Сквозной контроль геометрии
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Толщина швов мощения (3–4 мм) строго контролируется пластиковыми крестиками и калибраторами. Никаких «гуляющих» диагоналей.
            </p>
          </div>

          <div className="p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60 space-y-2">
            <Compass className="w-6 h-6 text-sky-400 mb-2" />
            <h4 className="text-sm font-bold text-white">
              Правильные уклоны разуклонки
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Вода от осадков направляется в скрытые лотки SlotDrain с расчетным уклоном не менее 1.5%. Лужи на террасах исключены физически.
            </p>
          </div>

          <div className="p-6 bg-neutral-800/60 rounded-2xl border border-neutral-700/60 space-y-2">
            <Layers className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="text-sm font-bold text-white">
              Складская точность поставок
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Плиты, бордюры и ступени доставляются на объект одной партией одного тона обжига (batch-номер), гарантируя цветовую однородность.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            Готовы обсудить концепцию вашего участка?
          </div>
          <button
            type="button"
            onClick={() => openInquiry({ type: 'design' })}
            className="px-6 py-3 bg-white text-neutral-900 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Начать с консультации архитектора
          </button>
        </div>
      </section>
    </div>
  );
};
