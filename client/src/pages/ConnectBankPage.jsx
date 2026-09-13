import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchBanks, connectBank } from "../api/bankApi";
import { useLanguage } from "../context/LanguageContext";
import { translateApiMessage } from "../i18n/translations";
import BankList from "../components/banks/BankList";
import ConnectBankForm from "../components/banks/ConnectBankForm";

export default function ConnectBankPage() {
  const { t, lang } = useLanguage();
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetchBanks()
      .then(setBanks)
      .catch((err) => setLoadError(translateApiMessage(err.response?.data?.message, lang) || err.message));
  }, [lang]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      const data = await connectBank(payload);
      setResult(data);
      setSelectedBank(null);
      toast.success(t("connectBank.successToast", { count: data.transactionCount }));
    } catch (err) {
      toast.error(translateApiMessage(err.response?.data?.message, lang) || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl dark:text-slate-100">
        {t("connectBank.title")}
      </h1>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}

      {!selectedBank && !result && (
        <div className="space-y-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("connectBank.chooseBank")}</p>
          <BankList banks={banks} onSelect={setSelectedBank} />
        </div>
      )}

      {selectedBank && (
        <ConnectBankForm
          bank={selectedBank}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedBank(null)}
          submitting={submitting}
        />
      )}

      {result && (
        <div className="max-w-sm rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30">
          <h2 className="mb-2 font-semibold text-green-800 dark:text-green-400">
            {t("connectBank.successTitle")}
          </h2>
          <p className="mb-3 text-sm text-green-700 dark:text-green-500">
            {t("connectBank.newBalance")}{" "}
            <span dir="ltr">
              {result.account.balance} {result.account.currency}
            </span>{" "}
            {t("connectBank.transactionsAdded", { count: result.transactionCount })}
          </p>
          <Link to="/accounts" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            {t("connectBank.viewAccounts")}
          </Link>
        </div>
      )}
    </div>
  );
}
