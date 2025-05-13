"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

// 添加语言名称映射
const LANGUAGE_NAMES = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  yue: '粵語',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  el: 'Ελληνικά',
  pl: 'Polski',
  ro: 'Română',
  hu: 'Magyar',
  tr: 'Türkçe',
  cy: 'Cymraeg',
  he: 'עברית',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  cs: 'Čeština',
  vi: 'Tiếng Việt',
  uk: 'Українська'
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[90px] md:w-[120px] h-8 md:h-10 text-xs md:text-sm border-primary/10 bg-background/60 backdrop-blur focus:ring-0 focus:ring-offset-0 shadow-none">
        <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
        <SelectValue>
          {LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className="w-[90px] md:w-[120px] bg-background/95 border-primary/10"
        align="end"
        side="bottom"
        avoidCollisions={false}
      >
        <div className="max-h-[40vh] overflow-y-auto">
          <SelectItem value="en" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">English</SelectItem>
          <SelectItem value="zh" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">中文</SelectItem>
          <SelectItem value="ja" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">日本語</SelectItem>
          <SelectItem value="ko" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">한국어</SelectItem>
          <SelectItem value="yue" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">粵語</SelectItem>
          <SelectItem value="es" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Español</SelectItem>
          <SelectItem value="fr" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Français</SelectItem>
          <SelectItem value="de" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Deutsch</SelectItem>
          <SelectItem value="it" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Italiano</SelectItem>
          <SelectItem value="pt" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Português</SelectItem>
          <SelectItem value="nl" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Nederlands</SelectItem>
          <SelectItem value="sv" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Svenska</SelectItem>
          <SelectItem value="no" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Norsk</SelectItem>
          <SelectItem value="da" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Dansk</SelectItem>
          <SelectItem value="fi" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Suomi</SelectItem>
          <SelectItem value="el" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Ελληνικά</SelectItem>
          <SelectItem value="pl" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Polski</SelectItem>
          <SelectItem value="ro" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Română</SelectItem>
          <SelectItem value="hu" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Magyar</SelectItem>
          <SelectItem value="tr" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Türkçe</SelectItem>
          <SelectItem value="cy" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Cymraeg</SelectItem>
          <SelectItem value="he" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">עברית</SelectItem>
          <SelectItem value="hi" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">हिन्दी</SelectItem>
          <SelectItem value="id" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Bahasa Indonesia</SelectItem>
          <SelectItem value="cs" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Čeština</SelectItem>
          <SelectItem value="vi" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Tiếng Việt</SelectItem>
          <SelectItem value="uk" className="py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm focus:bg-primary/5 cursor-pointer">Українська</SelectItem>
        </div>
      </SelectContent>
    </Select>
  );
}
