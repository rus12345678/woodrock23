import React, { useState, useEffect } from 'react';
import type { InquiryFormData, InquiryType, InquiryRecord } from '../../types';
import { submitInquiry } from '../../config/siteConfig';
import { useInquiry } from '../../context/InquiryContext';
import { CheckCircle2, AlertCircle, Loader2, Info, ArrowRight } from 'lucide-react';

interface InquiryFormProps {
  initialType?: InquiryType;
  initialProductId?: string;
  initialProductName?: string;
  initialSolutionId?: string;
  initialSolutionName?: string;
  onSuccess?: () => void;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialType = 'general',
  initialProductId,
  initialProductName,
  initialSolutionId,
  initialSolutionName,
  onSuccess,
  className = '',
}) => {
  const { setLastSubmission, refreshDemoSubmissions } = useInquiry();

  const [type, setType] = useState<InquiryType>(initialType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [areaSize, setAreaSize] = useState('');
  const [comment, setComment] = useState('');
  const [agree, setAgree] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    isDemo: boolean;
    message: string;
    record?: InquiryRecord;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialType) setType(initialType);
  }, [initialType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!name.trim()) {
      setErrorMsg('Пожалуйста, укажите ваше имя');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Пожалуйста, укажите корректный номер телефона (минимум 10 цифр)');
      return;
    }
    if (!agree) {
      setErrorMsg('Необходимо согласие на обработку персональных данных');
      return;
    }

    const payload: InquiryFormData = {
      type,
      name: name.trim(),
      phone: phone.trim(),
      comment: comment.trim() || undefined,
      areaSize: type === 'design' && areaSize.trim() ? areaSize.trim() : undefined,
      productId: type === 'product' ? initialProductId : undefined,
      productName: type === 'product' ? initialProductName : undefined,
      solutionId: type === 'solution' ? initialSolutionId : undefined,
      solutionName: type === 'solution' ? initialSolutionName : undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await submitInquiry(payload);
      const record: InquiryRecord = {
        ...payload,
        id: res.recordId,
        createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setResult({
        success: true,
        isDemo: res.isDemo,
        message: res.message,
        record,
      });
      setLastSubmission(record);
      refreshDemoSubmissions();
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Произошла непредвиденная ошибка при отправке';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg(null);
    setName('');
    setPhone('');
    setAreaSize('');
    setComment('');
  };

  // SUCCESS STATE
  if (result?.success) {
    return (
      <div className={`p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200 text-center ${className}`}>
        <div className="w-14 h-14 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          {result.isDemo ? 'Заявка принята в демо-режиме' : 'Заявка успешно принята!'}
        </h3>
        <p className="text-sm text-neutral-600 mb-5 max-w-md mx-auto">
          {result.message}
        </p>

        {/* Payload context summary */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 text-left text-xs text-neutral-700 space-y-1.5 mb-6">
          <div className="font-semibold text-neutral-900 pb-1 border-b border-neutral-100 flex justify-between">
            <span>Номер обращения:</span>
            <span className="font-mono text-neutral-800">{result.record?.id}</span>
          </div>
          <div><span className="text-neutral-500">Клиент:</span> {result.record?.name} ({result.record?.phone})</div>
          {result.record?.productName && (
            <div><span className="text-neutral-500">Выбранный товар:</span> {result.record.productName}</div>
          )}
          {result.record?.solutionName && (
            <div><span className="text-neutral-500">Выбранное решение:</span> {result.record.solutionName}</div>
          )}
          {result.record?.areaSize && (
            <div><span className="text-neutral-500">Площадь участка:</span> {result.record.areaSize}</div>
          )}
          {result.record?.comment && (
            <div><span className="text-neutral-500">Комментарий:</span> {result.record.comment}</div>
          )}
        </div>

        {result.isDemo && (
          <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200 mb-5 text-left flex gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              <strong>Для разработчика:</strong> Чтобы заявки отправлялись в Telegram или CRM, откройте файл <code>src/config/siteConfig.ts</code>, установите <code>isDemoMode: false</code> и укажите URL обработчика.
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
        >
          Заполнить еще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Context Banner if triggered from Product or Solution */}
      {type === 'product' && initialProductName && (
        <div className="bg-neutral-100 p-3 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
          <div>
            <div className="text-neutral-500 uppercase tracking-wider text-[10px] font-semibold">Товар в заявке</div>
            <div className="font-medium text-neutral-900">{initialProductName}</div>
          </div>
          <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[11px] rounded-md">Комплектация</span>
        </div>
      )}

      {type === 'solution' && initialSolutionName && (
        <div className="bg-neutral-100 p-3 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
          <div>
            <div className="text-neutral-500 uppercase tracking-wider text-[10px] font-semibold">Готовое решение в заявке</div>
            <div className="font-medium text-neutral-900">{initialSolutionName}</div>
          </div>
          <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[11px] rounded-md">Готовое пространство</span>
        </div>
      )}

      {/* Inquiry Type Selector (if no prefilled context) */}
      {!initialProductName && !initialSolutionName && (
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">Тема обращения</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setType('design')}
              className={`py-2 px-3 rounded-lg border text-left transition-all ${
                type === 'design'
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              Проектирование участка
            </button>
            <button
              type="button"
              onClick={() => setType('general')}
              className={`py-2 px-3 rounded-lg border text-left transition-all ${
                type === 'general'
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              Подбор материалов / Консультация
            </button>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="inq-name" className="block text-xs font-medium text-neutral-700 mb-1">
          Ваше имя <span className="text-red-500">*</span>
        </label>
        <input
          id="inq-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Алексей"
          required
          className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="inq-phone" className="block text-xs font-medium text-neutral-700 mb-1">
          Номер телефона <span className="text-red-500">*</span>
        </label>
        <input
          id="inq-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          required
          className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
        />
      </div>

      {/* Plot Area Field (for design inquiry) */}
      {type === 'design' && (
        <div>
          <label htmlFor="inq-area" className="block text-xs font-medium text-neutral-700 mb-1">
            Площадь участка <span className="text-neutral-400 font-normal">(необязательно)</span>
          </label>
          <input
            id="inq-area"
            type="text"
            value={areaSize}
            onChange={(e) => setAreaSize(e.target.value)}
            placeholder="Например, 15 соток или 1500 м²"
            className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
          />
        </div>
      )}

      {/* Comment Field */}
      <div>
        <label htmlFor="inq-comment" className="block text-xs font-medium text-neutral-700 mb-1">
          Пожелания или вопрос <span className="text-neutral-400 font-normal">(необязательно)</span>
        </label>
        <textarea
          id="inq-comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Укажите локацию участка, предпочтительные зоны или удобное время для звонка..."
          className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors resize-none"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="inq-agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
        />
        <label htmlFor="inq-agree" className="text-xs text-neutral-500 leading-tight cursor-pointer">
          Соглашаюсь на обработку персональных данных и получение предварительного расчета
        </label>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Demo Mode Notice */}
      <div className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-[11px] text-neutral-600 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 shrink-0 text-neutral-500 mt-0.5" />
        <span>
          <strong>Демо-режим:</strong> Данные валидируются и сохраняются в демо-журнал. Тестовый режим WoodRock.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm rounded-xl transition-all shadow-subtle hover:shadow-card flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Формирование заявки...</span>
          </>
        ) : (
          <>
            <span>{type === 'design' ? 'Отправить заявку на проект' : type === 'product' ? 'Запросить расчет стоимости' : 'Отправить запрос'}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
