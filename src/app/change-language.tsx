"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function ChangeLanguage() {
  const { setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("zh")}>
          中文
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ja")}>
          日本語
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ko")}>
          한국어
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("yue")}>
          粵語
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fr")}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("de")}>
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("it")}>
          Italiano
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pt")}>
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("nl")}>
          Nederlands
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("sv")}>
          Svenska
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("no")}>
          Norsk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("da")}>
          Dansk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fi")}>
          Suomi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("el")}>
          Ελληνικά
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pl")}>
          Polski
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ro")}>
          Română
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hu")}>
          Magyar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("tr")}>
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("cy")}>
          Cymraeg
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("he")}>
          עברית
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")}>
          हिन्दी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("id")}>
          Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("cs")}>
          Čeština
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("vi")}>
          Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("uk")}>
          Українська
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
