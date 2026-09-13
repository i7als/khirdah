import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAccount } from "../api/accountApi";
import { fetchTransactions, updateTransactionCategory } from "../api/transactionApi";
import { useLanguage } from "../context/LanguageContext";
import { translateApiMessage, translateBankName } from "../i18n/translations";
import TransactionList from "../components/transactions/TransactionList";

export default function AccountDetailPage() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccount(id)
      .then(setAccount)
      .catch((err) => setError(translateApiMessage(err.response?.data?.message, lang) || err.message));

    fetchTransactions({ accountId: id, limit: 100 })
      .then((data) => setTransactions(data.items))
      .catch((err) => setError(translateApiMessage(err.response?.data?.message, lang) || err.message));
  }, [id, lang]);

  async function handleCategoryChange(transactionId, newCategory) {
    const previous = transactions;
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === transactionId ? { ...tx, category: newCategory } : tx))
    );
    try {
      await updateTransactionCategory(transactionId, newCategory);
      toast.success(t("accounts.categoryUpdated"));
    } catch (err) {
      setTransactions(previous);
      toast.error(translateApiMessage(err.response?.data?.message, lang) || err.message);
    }
  }

  const bankColor = account?.bank?.colorHex || "#2563eb";

  return (
    <div className="space-y-8">
      <Link to="/accounts" className="inline-block text-sm text-blue-600 hover:underline dark:text-blue-400">
        {t("accounts.backToAccounts")}
      </Link>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {account && (
        <div
          style={{ borderInlineStart: `4px solid ${bankColor}` }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-2 flex items-center gap-2">
            {account.bank?.logoUrl ? (
              <img
                src={account.bank.logoUrl}
                alt={account.bank.name}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <span
                style={{ backgroundColor: bankColor }}
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              >
                {account.bank?.name?.[0]}
              </span>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {translateBankName(account.bank?.name, lang)}
            </p>
          </div>
          <p className="font-mono text-sm text-slate-400 dark:text-slate-500" dir="ltr">
            {account.accountNumberMasked}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100" dir="ltr">
            {account.balance}{" "}
            <span className="text-base font-normal text-slate-500 dark:text-slate-400">
              {account.currency}
            </span>
          </p>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t("accounts.transactions")}
        </h2>
        <TransactionList transactions={transactions} onCategoryChange={handleCategoryChange} />
      </div>
    </div>
  );
}
