"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionaries } from "./dictionaries";

type Language = "en" | "ar";
type Dictionary = typeof dictionaries.en;

interface LanguageContextType {
  language: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
    if (storedLang === "en" || storedLang === "ar") {
      setLanguage(storedLang);
      document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = storedLang;
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
