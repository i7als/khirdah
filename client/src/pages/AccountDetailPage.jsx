import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAccount } from "../api/accountApi";
import { fetchTransactions, updateTransactionCategory } from "../api/transactionApi";
import TransactionList from "../components/transactions/TransactionList";

export default function AccountDetailPage() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccount(id)
      .then(setAccount)
      .catch((err) => setError(err.response?.data?.message || err.message));

    fetchTransactions({ accountId: id, limit: 100 })
      .then((data) => setTransactions(data.items))
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, [id]);

  async function handleCategoryChange(transactionId, newCategory) {
    const previous = transactions;
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === transactionId ? { ...tx, category: newCategory } : tx))
    );
    try {
      await updateTransactionCategory(transactionId, newCategory);
      toast.success("تم تحديث التصنيف");
    } catch (err) {
      setTransactions(previous);
      toast.error(err.response?.data?.message || err.message);
    }
  }

  const bankColor = account?.bank?.colorHex || "#2563eb";

  return (
    <div className="space-y-8">
      <Link to="/accounts" className="inline-block text-sm text-blue-600 hover:underline">
        ← رجوع للحسابات
      </Link>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {account && (
        <div
          style={{ borderInlineStart: `4px solid ${bankColor}` }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
            <p className="text-sm text-slate-500">{account.bank?.name}</p>
          </div>
          <p className="font-mono text-sm text-slate-400" dir="ltr">
            {account.accountNumberMasked}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-800" dir="ltr">
            {account.balance}{" "}
            <span className="text-base font-normal text-slate-500">{account.currency}</span>
          </p>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">المعاملات</h2>
        <TransactionList transactions={transactions} onCategoryChange={handleCategoryChange} />
      </div>
    </div>
  );
}
