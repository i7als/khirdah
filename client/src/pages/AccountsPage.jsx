import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAccounts } from "../api/accountApi";
import { useLanguage } from "../context/LanguageContext";
import { translateApiMessage } from "../i18n/translations";
import AccountList from "../components/accounts/AccountList";

export default function AccountsPage() {
  const { t, lang } = useLanguage();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts()
      .then(setAccounts)
      .catch((err) => setError(translateApiMessage(err.response?.data?.message, lang) || err.message));
  }, [lang]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl dark:text-slate-100">
          {t("accounts.title")}
        </h1>
        <Link
          to="/connect-bank"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
        >
          {t("accounts.addNew")}
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <AccountList accounts={accounts} />
    </div>
  );
}
