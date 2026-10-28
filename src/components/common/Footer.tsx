import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { useInquiry } from '../../context/InquiryContext';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openInquiry } = useInquiry();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-neutral-900 font-bold text-sm tracking-tighter">
                WR
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                WOODROCK
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              От проекта до готового пространства. Проектирование ландшафта, архитектурные плиты мощения, уличная всепогодная мебель и оборудование.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openInquiry({ type: 'design' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 text-xs font-semibold rounded-full hover:bg-neutral-100 transition-colors"
              >
                <span>Заказать концепцию участка</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Nav: Pillars */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              Направления
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/design" className="hover:text-white transition-colors">
                  Ландшафтный дизайн
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=materials" className="hover:text-white transition-colors">
                  Архитектурные плиты
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=furniture" className="hover:text-white transition-colors">
                  Уличная мебель
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=equipment" className="hover:text-white transition-colors">
                  Оборудование и барбекю
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Готовые решения
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Company & Process */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              О сервисе
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/how-we-work" className="hover:text-white transition-colors">
                  Как мы работаем
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-white transition-colors">
                  Галерея пространств
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-white transition-colors">
                  Контакты и шоурум
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.contacts.phoneRaw}`} className="hover:text-white font-medium text-white transition-colors">
                  {siteConfig.contacts.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contacts.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contacts.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contacts.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer & Transparency Note */}
        <div className="py-6 border-b border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Демонстрационный сайт:</strong> Проекты, представленные в каталоге и решениях, носят демонстрационный и концептуальный характер.
            </span>
          </div>
          <div className="text-neutral-400">
            Настройки контактов и API: <code className="text-neutral-300 font-mono">src/config/siteConfig.ts</code>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {siteConfig.brand.year} {siteConfig.brand.name}. Все права защищены. Ландшафтная архитектура и комплектация.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 transition-colors">Политика конфиденциальности</span>
            <span className="hover:text-neutral-400 transition-colors">Условия комплектации</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
