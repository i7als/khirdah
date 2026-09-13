import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAccount, deleteAccount } from "../api/accountApi";
import { fetchTransactions, updateTransactionCategory } from "../api/transactionApi";
import { useLanguage } from "../context/LanguageContext";
import { translateApiMessage, translateBankName } from "../i18n/translations";
import { formatNumber } from "../utils/formatNumber";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilters from "../components/transactions/TransactionFilters";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { SkeletonBox } from "../components/common/Skeleton";

const EMPTY_FILTERS = { search: "", category: "", type: "" };

export default function AccountDetailPage() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  useEffect(() => {
    setLoading(true);
    fetchAccount(id)
      .then(setAccount)
      .catch((err) => setError(translateApiMessage(err.response?.data?.message, lang) || err.message))
      .finally(() => setLoading(false));
  }, [id, lang]);

  useEffect(() => {
    setTxLoading(true);
    const timeout = setTimeout(() => {
      fetchTransactions({ accountId: id, limit: 100, ...filters })
        .then((txData) => setTransactions(txData.items))
        .catch((err) => setError(translateApiMessage(err.response?.data?.message, lang) || err.message))
        .finally(() => setTxLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [id, lang, filters]);

  const filtersActive = !!(filters.search || filters.category || filters.type);

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

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAccount(id);
      toast.success(t("accounts.disconnected"));
      navigate("/accounts");
    } catch (err) {
      toast.error(translateApiMessage(err.response?.data?.message, lang) || err.message);
      setDeleting(false);
      setConfirmingDelete(false);
    }
  }

  const bankColor = account?.bank?.colorHex || "#2563eb";

  return (
    <div className="space-y-8">
      <Link to="/accounts" className="inline-block text-sm text-blue-600 hover:underline dark:text-blue-400">
        {t("accounts.backToAccounts")}
      </Link>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SkeletonBox className="mb-2 h-4 w-1/3" />
          <SkeletonBox className="mb-4 h-4 w-1/4" />
          <SkeletonBox className="h-9 w-1/2" />
        </div>
      )}

      {!loading && account && (
        <div
          style={{ borderInlineStart: `4px solid ${bankColor}` }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            <button
              onClick={() => setConfirmingDelete(true)}
              className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-95 dark:border-red-900 dark:hover:bg-red-950/40"
            >
              {t("accounts.disconnect")}
            </button>
          </div>
          <p className="font-mono text-sm text-slate-400 dark:text-slate-500" dir="ltr">
            {account.accountNumberMasked}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100" dir="ltr">
            {formatNumber(account.balance)}{" "}
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
        <TransactionFilters filters={filters} onChange={setFilters} />
        <TransactionList
          transactions={transactions}
          onCategoryChange={handleCategoryChange}
          loading={txLoading}
          filtersActive={filtersActive}
          onClearFilters={() => setFilters(EMPTY_FILTERS)}
        />
      </div>

      {confirmingDelete && (
        <ConfirmDialog
          title={t("accounts.disconnectTitle")}
          body={t("accounts.disconnectBody")}
          confirmLabel={deleting ? "..." : t("accounts.disconnect")}
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
