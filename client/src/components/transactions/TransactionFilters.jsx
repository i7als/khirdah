import { CATEGORIES } from "../../constants/categories";
import { useLanguage } from "../../context/LanguageContext";
import { translateCategory } from "../../i18n/translations";
import { SearchIcon } from "../icons";

const TYPE_OPTIONS = [
  { key: "", labelKey: "transactions.allTypes" },
  { key: "income", labelKey: "analysis.income" },
  { key: "expense", labelKey: "analysis.expense" },
];

export default function TransactionFilters({ filters, onChange }) {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <SearchIcon className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 start-3" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t("transactions.searchPlaceholder")}
          className="w-full rounded-xl border border-slate-300 bg-white py-2 ps-9 pe-3 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="">{t("transactions.allCategories")}</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {translateCategory(cat, lang)}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1">
        {TYPE_OPTIONS.map(({ key, labelKey }) => (
          <button
            key={key || "all"}
            onClick={() => onChange({ ...filters, type: key })}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
              filters.type === key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
