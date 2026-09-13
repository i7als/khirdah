import { useLanguage } from "../../context/LanguageContext";
import AccountCard from "./AccountCard";

export default function AccountList({ accounts }) {
  const { t } = useLanguage();

  if (accounts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        {t("accounts.noAccounts")}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard key={account._id} account={account} />
      ))}
    </div>
  );
}
