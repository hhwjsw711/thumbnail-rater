import { getRequestConfig } from 'next-intl/server';
import { translations } from '@/lib/i18n/translations';

export default getRequestConfig(async ({ locale }) => {
  const messages = translations[locale as keyof typeof translations];
  return {
    messages: Object.entries(messages).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'function' ? value({}) : value;
      return acc;
    }, {} as Record<string, string>)
  };
}); 