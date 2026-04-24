import { Controller } from "react-hook-form";
import { Input, Select } from "../ui";
import { Briefcase, Building2, Cpu, Cross, ShoppingCart, Activity, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n";

const SECTOR_OPTIONS = [
  { value: "Tecnologia/SaaS", label: "Tecnologia/SaaS", icon: <Cpu size={16} /> },
  { value: "Servizi B2B", label: "Servizi B2B", icon: <Briefcase size={16} /> },
  { value: "Manifatturiero", label: "Manifatturiero", icon: <Building2 size={16} /> },
  { value: "Healthcare", label: "Healthcare", icon: <Cross size={16} /> },
  { value: "Retail/GDO", label: "Retail/GDO", icon: <ShoppingCart size={16} /> },
  { value: "Edilizia/Immobiliare", label: "Edilizia/Immobiliare", icon: <Activity size={16} /> },
  { value: "Altro", label: "Altro", icon: <LayoutGrid size={16} /> },
];

export const Step1Profile = ({ register, control, errors }) => {
  const { lang } = useI18n();
  const lifecycleOptions = lang === "it" ? ["Startup", "Crescita", "Maturità", "Declino"] : ["Startup", "Growth", "Maturity", "Decline"];
  const objectiveOptions = lang === "it"
    ? ["Crescita organica", "Ricerca investitori", "Preparazione exit/vendita", "Passaggio generazionale", "Stabilità"]
    : ["Organic growth", "Investor fundraising", "Exit/sale preparation", "Generational transition", "Stability"];
  const horizonOptions = lang === "it" ? ["1–2 anni", "3–5 anni", "5+ anni"] : ["1–2 years", "3–5 years", "5+ years"];
  const assetOptions = lang === "it"
    ? ["Brevetti/IP", "Marchio registrato", "Software proprietario", "Contratti pluriennali"]
    : ["Patents/IP", "Registered trademark", "Proprietary software", "Multi-year contracts"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-[var(--color-bg-elevated)] p-8 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-second)]" />
      
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">{lang === "it" ? "Profilo Aziendale" : "Company Profile"}</h2>
        <p className="text-[var(--color-text-secondary)] text-sm">{lang === "it" ? "Inserisci i dati anagrafici e di contesto strategico per inquadrare il modello valutativo." : "Enter company and strategic context data to frame the valuation model."}</p>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          label={lang === "it" ? "NOME AZIENDA" : "COMPANY NAME"}
          placeholder={lang === "it" ? "es. Tecno Srl" : "e.g. Tecno Ltd"}
          error={errors.companyName}
          {...register("companyName", { required: lang === "it" ? "Il nome azienda è obbligatorio" : "Company name is required" })}
        />

        <Controller
          name="sector"
          control={control}
          rules={{ required: lang === "it" ? "Seleziona un settore" : "Select a sector" }}
          render={({ field }) => (
            <Select
              label={lang === "it" ? "SETTORE" : "SECTOR"}
              placeholder={lang === "it" ? "Seleziona settore..." : "Select sector..."}
              options={SECTOR_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.sector}
            />
          )}
        />

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">{lang === "it" ? "FASE CICLO DI VITA" : "LIFECYCLE STAGE"}</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {lifecycleOptions.map((lifecycle) => (
              <label key={lifecycle} className="relative cursor-pointer">
                <input
                  type="radio"
                  value={lifecycle}
                  className="peer sr-only"
                  {...register("lifecycle", { required: lang === "it" ? "Seleziona la fase del ciclo di vita" : "Select the lifecycle stage" })}
                />
                <div className="w-full py-3 px-4 text-center rounded-[6px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] transition-all peer-checked:border-[var(--color-accent-primary)] peer-checked:bg-[var(--color-accent-primary)]/10 peer-checked:text-[var(--color-accent-primary)] peer-checked:shadow-[var(--shadow-glow-primary)] hover:border-[var(--color-border-active)]">
                  <span className="text-sm font-medium">{lifecycle}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.lifecycle && <span className="text-[var(--color-accent-danger)] text-xs">{errors.lifecycle.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">{lang === "it" ? "OBIETTIVO DELL'IMPRENDITORE" : "ENTREPRENEUR OBJECTIVE"}</label>
          <div className="flex flex-col gap-2">
            {objectiveOptions.map((obj) => (
              <label key={obj} className="relative cursor-pointer group flex items-center p-4 rounded-[6px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-active)] transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      value={obj}
                      className="peer sr-only"
                      {...register("objective", { required: lang === "it" ? "Seleziona un obiettivo" : "Select an objective" })}
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border-subtle)] peer-checked:border-[var(--color-accent-primary)] transition-colors" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-accent-primary)] opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[var(--color-text-primary)] font-medium text-sm transition-colors group-hover:text-[var(--color-accent-primary)]">{obj}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.objective && <span className="text-[var(--color-accent-danger)] text-xs">{errors.objective.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">{lang === "it" ? "ORIZZONTE TEMPORALE" : "TIME HORIZON"}</label>
          <div className="flex rounded-[6px] border border-[var(--color-border-subtle)] overflow-hidden bg-[var(--color-bg-surface)]">
            {horizonOptions.map((horizon) => (
              <label key={horizon} className="flex-1 relative cursor-pointer group">
                <input
                  type="radio"
                  value={horizon}
                  className="peer sr-only"
                  {...register("horizon", { required: lang === "it" ? "Seleziona l'orizzonte temporale" : "Select a time horizon" })}
                />
                <div className="w-full py-3 text-center border-r border-[var(--color-border-subtle)] last:border-r-0 peer-checked:bg-[var(--color-accent-primary)]/20 peer-checked:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-subtle)]">
                  <span className="text-sm font-medium">{horizon}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.horizon && <span className="text-[var(--color-accent-danger)] text-xs">{errors.horizon.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">{lang === "it" ? "ASSET DISTINTIVI (MULTICHECK)" : "DISTINCTIVE ASSETS (MULTI-CHECK)"}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-[var(--color-border-subtle)] rounded-[6px] bg-[var(--color-bg-surface)]">
            {assetOptions.map((asset) => (
              <label key={asset} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    value={asset}
                    className="peer sr-only"
                    {...register("assets")}
                  />
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[var(--color-border-subtle)] peer-checked:border-[var(--color-accent-primary)] peer-checked:bg-[var(--color-accent-primary)] transition-colors flex items-center justify-center">
                    <svg className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{asset}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
