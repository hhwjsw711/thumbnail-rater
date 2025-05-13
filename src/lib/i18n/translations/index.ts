import { en } from './en';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';
import { es } from './es';
import { fr } from './fr';
import { ru } from './ru';
import { it } from './it';
import { pt } from './pt';
import { de } from './de';
import { id } from './id';
import { ar } from './ar';
import { yue } from './yue';
import { da } from './da';
import { nl } from './nl';
import { fi } from './fi';
import { el } from './el';
import { he } from './he';
import { hi } from './hi';
import { hu } from './hu';
import { no } from './no';
import { pl } from './pl';
import { ro } from './ro';
import { sv } from './sv';
import { tr } from './tr';
import { cy } from './cy';
import { cs } from './cs';
import { vi } from './vi';
import { uk } from './uk';
import type { Language, TranslationKey, TranslationType } from './types';

export type { Language, TranslationKey, TranslationType };

export const translations = {
  en,
  zh,
  ja,
  ko,
  es,
  fr,
  ru,
  it,
  pt,
  de,
  id,
  ar,
  yue,
  da,
  nl,
  fi,
  el,
  he,
  hi,
  hu,
  no,
  pl,
  ro,
  sv,
  tr,
  cy,
  cs,
  vi,
  uk
} as const;

// 用于类型检查，确保所有语言都有相同的键
type TranslationsType = typeof en;
const checkTranslations: Record<Language, TranslationsType> = translations;