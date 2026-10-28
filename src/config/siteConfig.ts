import type { ProductCategory, ZoneType, InquiryFormData } from '../types';

/**
 * =======================================================================
 * КОНФИГУРАЦИЯ САЙТА WOODROCK
 * =======================================================================
 * Здесь собраны все настраиваемые параметры сайта:
 * 1. Контакты и реквизиты компании (замените плейсхолдеры на реальные данные)
 * 2. Режим обработки заявок (демо-режим / подключение реального вебхука / CRM)
 * 3. Метаданные категорий и зон
 */

export const siteConfig = {
  brand: {
    name: 'WoodRock',
    tagline: 'От проекта до готового пространства',
    subtagline: 'Ландшафтный дизайн, архитектурные материалы, уличная мебель и оборудование — в единой концепции.',
    year: 2026,
  },

  /**
   * Контактные данные компании.
   * ТРЕБУЮТ ЗАПОЛНЕНИЯ РЕАЛЬНЫМИ ДАННЫМИ:
   */
  contacts: {
    phoneDisplay: '+7 (999) 000-00-00', // [Замените на телефон компании]
    phoneRaw: '+79990000000',
    email: 'info@woodrock-landscape.example', // [Замените на email компании]
    address: 'г. Москва, ул. Архитектурная, д. 10 (Шоурум и офис)', // [Замените на адрес]
    workingHours: 'Пн-Пт: 09:00 – 20:00, Сб-Вс: 10:00 – 18:00',
    telegram: 'https://t.me/woodrock_demo', // [Замените на реальный Telegram-канал/чат]
    whatsapp: 'https://wa.me/79990000000',  // [Замените на реальный WhatsApp]
  },

  /**
   * Настройки интеграции заявок.
   * В режиме demoMode=true заявки валидируются, сохраняются в localStorage браузера
   * и выводятся в консоль, с честным информированием пользователя о демо-режиме.
   *
   * Для подключения продакшена:
   * 1. Установите isDemoMode: false
   * 2. Укажите apiEndpoint (Telegram bot, AmoCRM / Bitrix24 webhook, Email service)
   */
  inquirySettings: {
    isDemoMode: true,
    apiEndpoint: '', // Например: 'https://api.woodrock.ru/leads' или вебхук Telegram
    telegramBotToken: '', // [Опционально: Bot token]
    telegramChatId: '',   // [Опционально: Chat ID]
  },

  /**
   * Категории каталога
   */
  categories: [
    {
      id: 'materials' as ProductCategory,
      title: 'Материалы',
      subtitle: 'Архитектурные плиты, гранит, клинкер и бордюры для долговечного мощения',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'furniture' as ProductCategory,
      title: 'Мебель',
      subtitle: 'Всепогодные лаунж-группы, обеденные комплекты и шезлонги из тика и алюминия',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'equipment' as ProductCategory,
      title: 'Оборудование',
      subtitle: 'Встраиваемые барбекю-модули, ландшафтное освещение и системы для бассейнов',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  /**
   * Зоны применения
   */
  zones: [
    {
      id: 'pool' as ZoneType,
      title: 'Зона бассейна',
      description: 'Антискользящее мощение, скрытые переливы, шезлонги и гидрооборудование',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'bbq' as ZoneType,
      title: 'Зона барбекю',
      description: 'Огнестойкие плиты, уличные кухни, грили и обеденные зоны на открытом воздухе',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'patio' as ZoneType,
      title: 'Патио',
      description: 'Уютные полузакрытые пространства с перголами, кострищами и лаунж-диванами',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'terrace' as ZoneType,
      title: 'Терраса',
      description: 'Естественное продолжение дома с террасной доской, мебелью и подсветкой ступеней',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'pathways' as ZoneType,
      title: 'Дорожки и мощение',
      description: 'Крупноформатные плиты, пошаговые дорожки в газоне и бордюрные решения',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    },
  ],
};

/**
 * Функция отправки заявки:
 * При подключении реального сервера отправляет запрос на siteConfig.inquirySettings.apiEndpoint.
 * В демо-режиме эмулирует задержку сети, сохраняет заявку в localStorage и возвращает результат.
 */
export async function submitInquiry(data: InquiryFormData): Promise<{ success: boolean; isDemo: boolean; message: string; recordId: string }> {
  const recordId = `WR-${Date.now().toString(36).toUpperCase()}`;

  if (siteConfig.inquirySettings.isDemoMode || !siteConfig.inquirySettings.apiEndpoint) {
    // Демо-режим: сохраняем в локальное хранилище для наглядности
    await new Promise((resolve) => setTimeout(resolve, 800)); // эмуляция сетевого вызова
    const existing: unknown[] = JSON.parse(localStorage.getItem('woodrock_demo_leads') || '[]');
    existing.unshift({ ...data, id: recordId, createdAt: new Date().toISOString() });
    localStorage.setItem('woodrock_demo_leads', JSON.stringify(existing));

    console.info(`[WoodRock Demo Mode] Заявка ${recordId} принята:`, data);
    return {
      success: true,
      isDemo: true,
      recordId,
      message: 'Заявка сформирована в демонстрационном режиме и сохранена локально. Серверный API не подключен.',
    };
  }

  // Продакшен обработчик:
  try {
    const res = await fetch(siteConfig.inquirySettings.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, recordId }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    return {
      success: true,
      isDemo: false,
      recordId,
      message: 'Ваша заявка успешно отправлена менеджеру WoodRock.',
    };
  } catch (err) {
    console.error('Ошибка отправки заявки:', err);
    throw new Error('Не удалось отправить заявку. Пожалуйста, свяжитесь с нами напрямую по телефону.');
  }
}
