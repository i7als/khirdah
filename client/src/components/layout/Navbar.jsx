import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import Wordmark from "./Wordmark";
import { SunIcon, MoonIcon, GlobeIcon } from "../icons";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
    isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="min-w-0 shrink">
            <Wordmark className="text-3xl sm:text-4xl md:text-5xl" />
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleLanguage}
              aria-label="toggle language"
              className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <GlobeIcon className="h-4 w-4" />
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="toggle theme"
              className="rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <span className="hidden text-sm text-slate-500 sm:inline dark:text-slate-400">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-95 dark:hover:bg-red-950/40"
            >
              {t("nav.logout")}
            </button>
          </div>
        </div>
        <nav className="mt-3 flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkClass} end>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/accounts" className={navLinkClass}>
            {t("nav.accounts")}
          </NavLink>
          <NavLink to="/analysis" className={navLinkClass}>
            {t("nav.analysis")}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
