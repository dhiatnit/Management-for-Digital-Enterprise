import { StepIndicator } from "./StepIndicator";
import { useI18n } from "../../i18n";
import { Button } from "../ui";

export const Header = ({ currentStep }) => {
  const { t, lang, toggleLanguage } = useI18n();

  return (
    <header className="w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-second)]">VALUE INTELLIGENCE</h1>
            <span className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest font-mono mt-1">{t.header.platform}</span>
          </div>
          <div className="flex-1 w-full max-w-xl flex items-center gap-4">
            <StepIndicator currentStep={currentStep} />
            <Button variant="secondary" onClick={toggleLanguage} className="!px-3 !py-2 !text-xs">
              {lang.toUpperCase()} → {t.header.switch}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
