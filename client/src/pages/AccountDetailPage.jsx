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

  return (
    <div>
      <Link to="/accounts" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← رجوع للحسابات
      </Link>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {account && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="text-sm text-slate-500">{account.bank?.name}</p>
          <p className="font-mono text-sm text-slate-400" dir="ltr">
            {account.accountNumberMasked}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-800" dir="ltr">
            {account.balance}{" "}
            <span className="text-base font-normal text-slate-500">{account.currency}</span>
          </p>
        </div>
      )}

      <h2 className="mb-3 text-lg font-semibold text-slate-800">المعاملات</h2>
      <TransactionList transactions={transactions} onCategoryChange={handleCategoryChange} />
    </div>
  );
}
