import { motion } from "framer-motion";
import { KpiCard } from "../dashboard/KpiCard";
import { RadarChart } from "../dashboard/RadarChart";
import { ScoreBar } from "../dashboard/ScoreBar";
import { ActionCard } from "../dashboard/ActionCard";
import { Button } from "../ui";
import { useI18n } from "../../i18n";

export const Step4Dashboard = ({ result, onReset }) => {
  const { lang } = useI18n();
  if (!result) return null;

  const {
    estimated_value,
    value_min,
    value_max,
    multiple_used,
    value_gap_pct,
    gap_absolute,
    scores,
    benchmarks,
    gaps_vs_benchmark,
    quality_score,
    risk_index,
    top3_actions,
  } = result;

  const radarData = [
    { capital: "Financial", actual: scores.financial, benchmark: benchmarks.financial },
    { capital: "Technological", actual: scores.technological, benchmark: benchmarks.technological },
    { capital: "Human & Org.", actual: scores.human, benchmark: benchmarks.human },
    { capital: "Relational", actual: scores.relational, benchmark: benchmarks.relational },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-6"
    >
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title={lang === "it" ? "VALORE STIMATO" : "ESTIMATED VALUE"}
          value={`€ ${(estimated_value / 1000000).toFixed(2)}M`}
          subtitle={`${lang === "it" ? "Range" : "Range"}: € ${(value_min / 1000000).toFixed(2)}M - € ${(value_max / 1000000).toFixed(2)}M`}
          footer={`${lang === "it" ? "Multiplo" : "Multiple"}: ${multiple_used}x EBITDA`}
          delay={0.1}
          variant="primary"
        />
        
        <KpiCard
          title={lang === "it" ? "VALUE GAP" : "VALUE GAP"}
          value={`+${value_gap_pct.toFixed(1)}%`}
          subtitle={lang === "it" ? `€ ${(gap_absolute / 1000000).toFixed(2)}M potenziale` : `€ ${(gap_absolute / 1000000).toFixed(2)}M potential`}
          footer={<div className="w-full bg-[var(--color-bg-base)] h-1.5 rounded-full mt-2 overflow-hidden"><div className="h-full bg-[var(--color-accent-second)] w-3/4" /></div>}
          delay={0.2}
          variant="secondary"
        />

        <KpiCard
          title={lang === "it" ? "QUALITY SCORE" : "QUALITY SCORE"}
          value={`${quality_score} / 100`}
          subtitle={quality_score >= 50 ? (lang === "it" ? "In linea/sopra media" : "In line/above average") : (lang === "it" ? "Sotto la media di settore" : "Below industry average")}
          delay={0.3}
          variant="primary"
        />

        <KpiCard
          title={lang === "it" ? "INDICE DI RISCHIO" : "RISK INDEX"}
          value={risk_index.label}
          subtitle={lang === "it" ? "Basato su SQF e gap" : "Based on SQF and gap"}
          delay={0.4}
          variant={risk_index.label === "LOW" ? "secondary" : risk_index.label === "MEDIUM" ? "warning" : "danger"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:col-span-1 bg-[var(--color-bg-elevated)] p-6 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] flex flex-col items-center justify-center"
        >
          <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] w-full text-left mb-4">{lang === "it" ? "Radar 4 Capitali" : "4-Capital Radar"}</h3>
          <RadarChart data={radarData} />
        </motion.div>

        {/* Priority Actions */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-display text-lg font-bold text-[var(--color-text-primary)]"
          >
            {lang === "it" ? "Top 3 Azioni Prioritarie" : "Top 3 Priority Actions"}
          </motion.h3>
          <div className="flex flex-col gap-4">
            {top3_actions.map((action, idx) => (
              <ActionCard key={idx} index={idx + 1} action={action} delay={0.7 + idx * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Score Breakdown Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-[var(--color-bg-elevated)] p-6 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]"
      >
        <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] mb-6">{lang === "it" ? "Dettaglio Score vs Benchmark" : "Score Breakdown vs Benchmark"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <ScoreBar capital="Financial Capital" actual={scores.financial} benchmark={benchmarks.financial} gap={gaps_vs_benchmark.financial} />
          <ScoreBar capital="Technological Capital" actual={scores.technological} benchmark={benchmarks.technological} gap={gaps_vs_benchmark.technological} />
          <ScoreBar capital="Human & Org. Capital" actual={scores.human} benchmark={benchmarks.human} gap={gaps_vs_benchmark.human} />
          <ScoreBar capital="Relational Capital" actual={scores.relational} benchmark={benchmarks.relational} gap={gaps_vs_benchmark.relational} />
        </div>
      </motion.div>

      <div className="flex justify-center mt-6">
        <Button onClick={onReset} variant="secondary">{lang === "it" ? "Nuova Analisi" : "New Analysis"}</Button>
      </div>
    </motion.div>
  );
};
