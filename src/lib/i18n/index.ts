import { useTranslations } from 'next-intl';

export function t(key: string, params?: Record<string, any>) {
  return useTranslations()(key, params);
} 