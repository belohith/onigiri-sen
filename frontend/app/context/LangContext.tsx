"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ja";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, ja: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (en: string, ja: string) => (lang === "en" ? en : ja);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}