import { CATEGORIES } from "../../constants/categories";
import { useLanguage } from "../../context/LanguageContext";
import { translateCategory } from "../../i18n/translations";

export default function CategorySelect({ value, onChange, disabled }) {
  const { lang } = useLanguage();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
    >
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {translateCategory(cat, lang)}
        </option>
      ))}
    </select>
  );
}
