import { useLanguage } from "../../context/LanguageContext";

export default function ConfirmDialog({ title, body, confirmLabel, onConfirm, onCancel }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{body}</p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 active:scale-95"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
