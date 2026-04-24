import { createContext, useContext, useMemo, useState } from "react";

const I18nContext = createContext(null);

const translations = {
  it: {
    header: { platform: "Piattaforma", switch: "EN" },
    steps: ["Profilo", "Bilancio", "Quiz", "Dashboard"],
    app: {
      loadDemo: "Carica Demo",
      back: "Indietro",
      next: "Avanti",
      analyze: "Analizza",
      loadingTitle: "Analisi in corso...",
      loading: "Caricamento...",
      phases: ["Normalizzazione dati", "Scoring 4 capitali", "Valutazione finale"],
    },
  },
  en: {
    header: { platform: "Platform", switch: "IT" },
    steps: ["Profile", "Financials", "Quiz", "Dashboard"],
    app: {
      loadDemo: "Load Demo",
      back: "Back",
      next: "Next",
      analyze: "Analyze",
      loadingTitle: "Analysis in progress...",
      loading: "Loading...",
      phases: ["Data normalization", "4-capital scoring", "Final valuation"],
    },
  },
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState("it");
  const toggleLanguage = () => setLang((prev) => (prev === "it" ? "en" : "it"));

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLanguage,
      t: translations[lang],
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
};
