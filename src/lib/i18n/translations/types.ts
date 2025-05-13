import { en } from './en';

export type Language = 
  | 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'ru' | 'it' | 'pt' | 'de' 
  | 'id' | 'ar' | 'yue' | 'da' | 'nl' | 'fi' | 'el' | 'he' | 'hi' | 'hu'
  | 'no' | 'pl' | 'ro' | 'sv' | 'tr' | 'cy' | 'cs' | 'uk' | 'vi';

export type TranslationValue = string | ((params: Record<string, any>) => string);

export type TranslationType = {
  [key: string]: TranslationValue;
};

export type Translations = typeof en;

export type TranslationKey = keyof typeof en;