import { useLanguage } from "../../context/LanguageContext";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {t("accounts.pagePrev")}
      </button>
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {t("accounts.pageOf", { page, totalPages })}
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {t("accounts.pageNext")}
      </button>
    </div>
  );
}
