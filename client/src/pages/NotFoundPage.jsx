import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center dark:bg-slate-950">
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">404</p>
      <p className="text-slate-500 dark:text-slate-400">{t("notFound.message")}</p>
      <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
        {t("notFound.backHome")}
      </Link>
    </div>
  );
}
