import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translateCategory } from "../i18n/translations";
import { fetchAccounts } from "../api/accountApi";
import { fetchTransactions } from "../api/transactionApi";
import { formatNumber } from "../utils/formatNumber";
import { BuildingIcon, WalletIcon, ScaleIcon } from "../components/icons";
import { StatCardSkeleton, SkeletonBox } from "../components/common/Skeleton";
import EmptyState from "../components/common/EmptyState";

export default function DashboardPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [accounts, setAccounts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAccounts(), fetchTransactions({ limit: 5 })])
      .then(([accountsData, txData]) => {
        setAccounts(accountsData);
        setRecentTransactions(txData.items);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl dark:text-slate-100">
          {t("dashboard.welcome", { name: user?.name })}
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{user?.email}</p>
      </div>

      {!loading && accounts.length === 0 ? (
        <EmptyState
          icon={WalletIcon}
          title={t("dashboard.emptyTitle")}
          subtitle={t("dashboard.emptySubtitle")}
          actionLabel={t("dashboard.emptyCta")}
          actionTo="/connect-bank"
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {loading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                      <ScaleIcon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
                      {t("dashboard.totalBalance")}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100" dir="ltr">
                    {formatNumber(totalBalance)}{" "}
                    <span className="text-base font-normal text-slate-400">KWD</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                      <WalletIcon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
                      {t("dashboard.linkedAccounts")}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{accounts.length}</p>
                </div>
              </>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t("dashboard.recentTransactions")}
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {loading ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <SkeletonBox className="h-4 w-1/3" />
                      <SkeletonBox className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentTransactions.map((tx) => (
                    <div key={tx._id} className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800 dark:text-slate-100">
                          {tx.merchant}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {translateCategory(tx.category, lang)} ·{" "}
                          {new Date(tx.date).toLocaleDateString(lang === "ar" ? "ar-KW" : "en-GB")}
                        </p>
                      </div>
                      <p
                        dir="ltr"
                        className={`shrink-0 font-medium ${
                          tx.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatNumber(tx.amount)} {tx.currency}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-slate-100 p-3 text-center dark:border-slate-800">
                <Link
                  to="/accounts"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t("dashboard.viewAllAccounts")}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t("dashboard.quickActions")}
        </h2>
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
    </div>
  );
}
