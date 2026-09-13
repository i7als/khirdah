import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LANG_KEY = "khirdah_lang";

const LanguageContext = createContext(null);

function getInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === "en" || stored === "ar" ? stored : "ar";
}

function resolve(dict, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  function toggleLanguage() {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }

  function t(key, vars) {
    const template = resolve(translations[lang], key) ?? key;
    if (!vars) return template;
    return Object.entries(vars).reduce(
      (str, [name, value]) => str.replaceAll(`{${name}}`, value),
      template
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
