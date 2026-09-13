import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { BuildingIcon, WalletIcon, ScaleIcon } from "../components/icons";

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const actions = [
    {
      to: "/connect-bank",
      title: t("dashboard.connectBankTitle"),
      subtitle: t("dashboard.connectBankSubtitle"),
      Icon: BuildingIcon,
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      to: "/accounts",
      title: t("dashboard.accountsTitle"),
      subtitle: t("dashboard.accountsSubtitle"),
      Icon: WalletIcon,
      iconBg: "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    },
    {
      to: "/analysis",
      title: t("dashboard.analysisTitle"),
      subtitle: t("dashboard.analysisSubtitle"),
      Icon: ScaleIcon,
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl dark:text-slate-100">
          {t("dashboard.welcome", { name: user?.name })}
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{user?.email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map(({ to, title, subtitle, Icon, iconBg }) => (
          <Link
            key={to}
            to={to}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
              <Icon className="h-6 w-6" />
            </span>
            <p className="mb-1 text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
