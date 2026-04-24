import { Slider, QualitativeScale } from "../ui";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { useI18n } from "../../i18n";

export const Step3Questionnaire = ({ control, errors, watch }) => {
  const { lang } = useI18n();
  // Mock calculations for real-time preview
  const recurring = parseFloat(watch("recurringRevenue")) || 0;
  const concentration = parseFloat(watch("clientConcentration")) || 0;
  const founderDep = parseFloat(watch("founderDependency")) || 3;
  const management = parseFloat(watch("managementStructure")) || 3;
  const clientPortfolio = parseFloat(watch("clientPortfolio")) || 3;

  // Simple normalization mocks for the preview bars
  const normConcentration = concentration > 70 ? 0.1 : concentration > 50 ? 0.3 : concentration > 35 ? 0.5 : concentration > 20 ? 0.8 : 1.0;
  const normRecurring = recurring < 10 ? 0.1 : recurring < 25 ? 0.3 : recurring < 50 ? 0.6 : recurring < 75 ? 0.8 : 1.0;
  
  // Financial rough estimate without EBITDA/CAGR for preview speed
  // Actual formula has ebitda and cagr but we mock it here roughly
  const finScore = (0.25 * normRecurring + 0.20 * normConcentration + 0.30) / 0.75;
  
  // Human rough estimate
  const normFounderDep = (5 - founderDep) / 4;
  const normMgmt = (management - 1) / 4;
  const normPortfolio = (clientPortfolio - 1) / 4;
  const humScore = 0.40 * normFounderDep + 0.35 * normMgmt + 0.25 * normPortfolio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8"
    >
      {/* Left Column: Quantitative */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-[var(--color-bg-elevated)] p-8 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col gap-8 h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-second)]" />
          
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">{lang === "it" ? "Dati Dichiarati Quantitativi" : "Declared Quantitative Data"}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm">{lang === "it" ? "Indicatori finanziari stimati." : "Estimated financial indicators."}</p>
          </div>

          <div className="flex flex-col gap-8">
            <Controller
              name="recurringRevenue"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  label={lang === "it" ? "% Ricavi Ricorrenti" : "% Recurring Revenue"}
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="clientConcentration"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  label={lang === "it" ? "Concentrazione Top-3 Clienti %" : "Top-3 Client Concentration %"}
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="mt-auto bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border-subtle)] shadow-inner flex flex-col gap-4">
            <h3 className="font-mono text-sm tracking-widest text-[var(--color-text-secondary)]">{lang === "it" ? "ANTEPRIMA PUNTEGGI LIVE" : "LIVE SCORE PREVIEW"}</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[var(--color-text-primary)]">Financial Focus</span>
                  <span className="font-mono text-[var(--color-accent-second)]">{finScore.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--color-accent-second)]" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${finScore * 100}%` }} 
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[var(--color-text-primary)]">Human & Org Focus</span>
                  <span className="font-mono text-[var(--color-accent-primary)]">{humScore.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--color-accent-primary)]" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${humScore * 100}%` }} 
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Qualitative Scales */}
      <div className="flex-[1.5] bg-[var(--color-bg-surface)] p-8 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-6">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">{lang === "it" ? "Valutazione Qualitativa" : "Qualitative Assessment"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="founderDependency"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "1. Dipendenza dal Fondatore" : "1. Founder Dependency"}
                minLabel={lang === "it" ? "Autonoma" : "Autonomous"}
                maxLabel={lang === "it" ? "Dipendente" : "Dependent"}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="managementStructure"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "2. Struttura Manageriale" : "2. Management Structure"}
                minLabel={lang === "it" ? "Assente" : "Absent"}
                maxLabel={lang === "it" ? "Completo" : "Complete"}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="digitalMaturity"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "3. Maturità Digitale" : "3. Digital Maturity"}
                minLabel="Carta/Excel"
                maxLabel="Digitale"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="clientPortfolio"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "4. Qualità Portfolio Clienti" : "4. Client Portfolio Quality"}
                minLabel={lang === "it" ? "Dominanti" : "Concentrated"}
                maxLabel={lang === "it" ? "Fidelizzato" : "Loyal"}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="scalability"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "5. Scalabilità del Modello" : "5. Model Scalability"}
                minLabel="Costi prop."
                maxLabel="Scalabile"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="networkStrength"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={lang === "it" ? "6. Forza della Rete" : "6. Network Strength"}
                minLabel={lang === "it" ? "Nessuna rete" : "No network"}
                maxLabel={lang === "it" ? "Solido ecosistema" : "Strong ecosystem"}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </motion.div>
  );
};
