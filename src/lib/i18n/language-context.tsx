"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import type { Language } from './translations/types'
import { en } from './translations/en'
import { zh } from './translations/zh'
import { ja } from './translations/ja'
import { ko } from './translations/ko'
import { yue } from './translations/yue'
import { es } from './translations/es'
import { fr } from './translations/fr'
import { de } from './translations/de'
import { it } from './translations/it'
import { pt } from './translations/pt'
import { ru } from './translations/ru'
import { nl } from './translations/nl'
import { sv } from './translations/sv'
import { no } from './translations/no'
import { da } from './translations/da'
import { fi } from './translations/fi'
import { el } from './translations/el'
import { pl } from './translations/pl'
import { ro } from './translations/ro'
import { hu } from './translations/hu'
import { tr } from './translations/tr'
import { cy } from './translations/cy'
import { ar } from './translations/ar'
import { he } from './translations/he'
import { hi } from './translations/hi'
import { id } from './translations/id'
import { cs } from './translations/cs'
import { vi } from './translations/vi'
import { uk } from './translations/uk'

import type { Locale as DateFnsLocale } from "date-fns";
import { enUS as enUSLocale } from 'date-fns/locale';
import { arSA as arSALocale } from 'date-fns/locale/ar-SA';
import { cs as csLocale } from 'date-fns/locale/cs';
import { cy as cyLocale } from 'date-fns/locale/cy';
import { da as daLocale } from 'date-fns/locale/da';
import { de as deLocale } from 'date-fns/locale/de';
import { el as elLocale } from 'date-fns/locale/el';
import { es as esLocale } from 'date-fns/locale/es';
import { fi as fiLocale } from 'date-fns/locale/fi';
import { fr as frLocale } from 'date-fns/locale/fr';
import { he as heLocale } from 'date-fns/locale/he';
import { hi as hiLocale } from 'date-fns/locale/hi';
import { hu as huLocale } from 'date-fns/locale/hu';
import { id as idLocale } from 'date-fns/locale/id';
import { it as itLocale } from 'date-fns/locale/it';
import { ja as jaLocale } from 'date-fns/locale/ja';
import { ko as koLocale } from 'date-fns/locale/ko';
import { nb as nbLocale } from 'date-fns/locale/nb';
import { nl as nlLocale } from 'date-fns/locale/nl';
import { pl as plLocale } from 'date-fns/locale/pl';
import { pt as ptLocale } from 'date-fns/locale/pt';
import { ro as roLocale } from 'date-fns/locale/ro';
import { ru as ruLocale } from 'date-fns/locale/ru';
import { sv as svLocale } from 'date-fns/locale/sv';
import { tr as trLocale } from 'date-fns/locale/tr';
import { uk as ukLocale } from 'date-fns/locale/uk';
import { vi as viLocale } from 'date-fns/locale/vi';
import { zhCN as zhCNLocale } from 'date-fns/locale/zh-CN';
import { zhHK as zhHKLocale } from 'date-fns/locale/zh-HK';

const translations = {
  en, zh, ja, ko, yue, es, fr, de, it, pt, ru, nl, sv, no, da,
  fi, el, pl, ro, hu, tr, cy, ar, he, hi, id, cs, vi, uk,
} as const;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dateFnsLocale: DateFnsLocale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const appLangToDateFnsObject: Record<string, DateFnsLocale | undefined> = {
  en: enUSLocale,
  zh: zhCNLocale,
  ja: jaLocale,
  ko: koLocale,
  es: esLocale,
  fr: frLocale,
  de: deLocale,
  it: itLocale,
  pt: ptLocale,
  ru: ruLocale,
  nl: nlLocale,
  sv: svLocale,
  no: nbLocale,
  da: daLocale,
  fi: fiLocale,
  el: elLocale,
  pl: plLocale,
  ro: roLocale,
  hu: huLocale,
  tr: trLocale,
  cy: cyLocale,
  ar: arSALocale,
  he: heLocale,
  hi: hiLocale,
  id: idLocale,
  cs: csLocale,
  vi: viLocale,
  uk: ukLocale,
  yue: zhHKLocale,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [dateFnsLocale, setDateFnsLocale] = useState<DateFnsLocale>(enUSLocale);;

  // 初始化时从本地存储读取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language | null;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    console.log(`[LanguageProvider] Language changed to: ${language}`);
    const selectedLocaleObject = appLangToDateFnsObject[language];

    if (selectedLocaleObject) {
      setDateFnsLocale(selectedLocaleObject);
      console.log(`[LanguageProvider] Successfully set date-fns locale for: ${language}`);
    } else {
      console.warn(`[LanguageProvider] No date-fns locale object found for app language: ${language}. Falling back to en-US.`);
      setDateFnsLocale(enUSLocale);
    }
  }, [language]);

  // 当语言改变时，保存到本地存储
  const handleSetLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('preferred-language', lang);
    } else {
      console.warn(`[LanguageProvider] Attempted to set unsupported language: ${lang}`);
    }
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    // 确保语言存在于translations中，如果不存在则使用英语作为回退
    const currentTranslations = translations[language] || translations.en;
    const translation = currentTranslations[key as keyof typeof currentTranslations];
    if (typeof translation === 'function') {
      // 确保translation是一个可调用的函数类型，并传递参数
      return (translation as (params: Record<string, string | number>) => string)(params || {});
    }
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, value]) => str.replace(`{${paramKey}}`, String(value)),
        String(translation)
      );
    }
    return String(translation);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dateFnsLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}