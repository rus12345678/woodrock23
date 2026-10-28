import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { InquiryForm } from '../components/forms/InquiryForm';
import { useInquiry } from '../context/InquiryContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  FileCode,
  Trash2,
  Info,
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { demoSubmissions, clearDemoSubmissions } = useInquiry();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Контакты' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600 block">
          Связь с нами
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Контакты и шоурум WoodRock
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          Приглашаем познакомиться с образцами архитектурных плит, фактурами термодерева и уличной мебелью вживую.
        </p>
      </div>

      {/* Grid: Contacts Info + Lead Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/90 space-y-6">
            <h3 className="text-lg font-bold text-neutral-900">
              Прямая связь
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Телефон офиса и консультаций:</span>
                  <a
                    href={`tel:${siteConfig.contacts.phoneRaw}`}
                    className="font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    {siteConfig.contacts.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Электронная почта:</span>
                  <a
                    href={`mailto:${siteConfig.contacts.email}`}
                    className="font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    {siteConfig.contacts.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Адрес шоурума:</span>
                  <span className="font-semibold text-neutral-900">
                    {siteConfig.contacts.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">График работы:</span>
                  <span className="font-medium text-neutral-800">
                    {siteConfig.contacts.workingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Messengers */}
            <div className="pt-4 border-t border-neutral-200/80 space-y-2">
              <span className="text-xs font-semibold text-neutral-700 block">
                Мессенджеры:
              </span>
              <div className="flex gap-2">
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
                <a
                  href={siteConfig.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-medium rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Dev configuration guide card */}
          <div className="p-5 bg-neutral-100 rounded-2xl border border-neutral-300/80 text-xs text-neutral-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <FileCode className="w-4 h-4 text-neutral-700" />
              <span>Где настроить контакты компании:</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Все телефоны, адреса, почта и ссылки на мессенджеры задаются в одном файле:
              <br />
              <code className="text-neutral-900 font-mono font-semibold bg-white px-1.5 py-0.5 rounded border border-neutral-200 mt-1 inline-block">
                src/config/siteConfig.ts
              </code>
            </p>
          </div>
        </div>

        {/* Right: In-Page Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Напишите нам
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Заполните поля ниже — мы свяжемся с вами и ответим на все вопросы.
            </p>
          </div>
          <InquiryForm initialType="general" />
        </div>
      </div>

      {/* Demo Submissions Viewer (so user/tester can see submitted inquiries in localStorage) */}
      <section className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-neutral-600" />
              <span>Журнал обращений (Демонстрационный режим)</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Все заявки, отправленные во время тестирования сайта, сохраняются в браузере (localStorage)
            </p>
          </div>
          {demoSubmissions.length > 0 && (
            <button
              type="button"
              onClick={clearDemoSubmissions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Очистить журнал</span>
            </button>
          )}
        </div>

        {demoSubmissions.length === 0 ? (
          <div className="py-6 text-center text-xs text-neutral-400 bg-white rounded-2xl border border-neutral-200">
            Журнал пока пуст. Отправьте тестовую заявку с любой страницы сайта, чтобы увидеть ее здесь.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl p-4 border border-neutral-200 text-xs text-neutral-700 space-y-1.5 shadow-subtle"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 pb-1 border-b border-neutral-100">
                  <span className="font-semibold text-neutral-900">{sub.id}</span>
                  <span>{sub.createdAt}</span>
                </div>
                <div><span className="text-neutral-500">Имя:</span> <strong>{sub.name}</strong></div>
                <div><span className="text-neutral-500">Телефон:</span> {sub.phone}</div>
                <div>
                  <span className="text-neutral-500">Тип:</span>{' '}
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-[10px] font-semibold text-neutral-800">
                    {sub.type === 'design' ? 'Проектирование' : sub.type === 'product' ? 'Товар' : sub.type === 'solution' ? 'Решение' : 'Общая консультация'}
                  </span>
                </div>
                {sub.productName && (
                  <div><span className="text-neutral-500">Товар:</span> {sub.productName}</div>
                )}
                {sub.solutionName && (
                  <div><span className="text-neutral-500">Решение:</span> {sub.solutionName}</div>
                )}
                {sub.areaSize && (
                  <div><span className="text-neutral-500">Площадь:</span> {sub.areaSize}</div>
                )}
                {sub.comment && (
                  <div className="pt-1 text-neutral-600 italic">«{sub.comment}»</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
