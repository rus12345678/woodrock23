import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInquiry } from '../../context/InquiryContext';
import { siteConfig } from '../../config/siteConfig';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openInquiry } = useInquiry();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Ландшафтный дизайн', path: '/design' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'Готовые решения', path: '/solutions' },
    { label: 'Как мы работаем', path: '/how-we-work' },
    { label: 'Контакты', path: '/contacts' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-neutral-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm tracking-tighter group-hover:bg-neutral-800 transition-colors">
              WR
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none group-hover:text-neutral-700 transition-colors">
                WOODROCK
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-medium mt-0.5">
                Landscape & Living
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-normal font-medium transition-colors relative py-1 ${
                    active
                      ? 'text-neutral-900 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contacts.phoneRaw}`}
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
              title="Позвонить нам"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>{siteConfig.contacts.phoneDisplay}</span>
            </a>

            <button
              onClick={() => openInquiry({ type: 'design' })}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Обсудить проект</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger & Quick CTA */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openInquiry({ type: 'design' })}
              className="sm:hidden px-3 py-1.5 bg-neutral-900 text-white text-[11px] font-medium rounded-full"
            >
              Обсудить
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-30 lg:hidden bg-white flex flex-col border-t border-neutral-100 animate-in slide-in-from-top duration-200">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
              Навигация
            </div>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 text-base font-medium rounded-lg px-3 transition-colors ${
                    active
                      ? 'bg-neutral-100 text-neutral-950 font-semibold'
                      : 'text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Связаться с нами
              </div>
              <a
                href={`tel:${siteConfig.contacts.phoneRaw}`}
                className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl text-sm font-semibold text-neutral-900"
              >
                <Phone className="w-4 h-4 text-neutral-600" />
                <span>{siteConfig.contacts.phoneDisplay}</span>
              </a>
              <div className="text-xs text-neutral-600">
                {siteConfig.contacts.workingHours}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-neutral-100 bg-neutral-50">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry({ type: 'design' });
              }}
              className="w-full py-3 bg-neutral-900 text-white font-medium text-sm rounded-xl text-center flex items-center justify-center gap-2"
            >
              <span>Обсудить проект</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
