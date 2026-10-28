import React, { useEffect } from 'react';
import { useInquiry } from '../../context/InquiryContext';
import { InquiryForm } from '../forms/InquiryForm';
import { X } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { isOpen, closeInquiry, options } = useInquiry();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeInquiry();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeInquiry]);

  if (!isOpen) return null;

  const getTitle = () => {
    if (options.type === 'product' && options.productName) {
      return `Запрос расчета: ${options.productName}`;
    }
    if (options.type === 'solution' && options.solutionName) {
      return `Комплектация решения: ${options.solutionName}`;
    }
    if (options.type === 'design') {
      return 'Заявка на ландшафтное проектирование';
    }
    return 'Обсудить проект с архитектором';
  };

  const getSubtitle = () => {
    if (options.type === 'product') {
      return 'Специалист WoodRock подготовит расчет объемов и спецификацию с учетом особенностей вашего участка.';
    }
    if (options.type === 'solution') {
      return 'Рассчитаем стоимость материалов, мебели и оборудования для данного пространства под ваши размеры.';
    }
    if (options.type === 'design') {
      return 'Обсудим концепцию, зонирование и сформируем поэтапный план проектирования.';
    }
    return 'Ответим на вопросы по материалам, срокам реализации и поможем составить концепт.';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeInquiry();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-modal overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-neutral-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100 flex items-start justify-between">
          <div className="pr-4">
            <h2 id="modal-headline" className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              {getTitle()}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-snug">
              {getSubtitle()}
            </p>
          </div>
          <button
            type="button"
            onClick={closeInquiry}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Закрыть модальное окно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <InquiryForm
            initialType={options.type}
            initialProductId={options.productId}
            initialProductName={options.productName}
            initialSolutionId={options.solutionId}
            initialSolutionName={options.solutionName}
            onSuccess={() => {
              // Can optionally auto-close after a few seconds
            }}
          />
        </div>
      </div>
    </div>
  );
};
