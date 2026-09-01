import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import koMessages from "../constants/locales/ko";
import enMessages from "../constants/locales/en";
import { Messages } from "../constants/locales/types";

export type Locale = "ko" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const getLocaleMessages = (locale: Locale): Messages => {
  return locale === "en" ? enMessages : koMessages;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "ko" || savedLocale === "en")) {
      return savedLocale;
    }
    return navigator.language.startsWith("en") ? "en" : "ko";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = getLocaleMessages(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale는 LocaleProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
