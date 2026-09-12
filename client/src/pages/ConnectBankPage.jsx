import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBanks, connectBank } from "../api/bankApi";
import BankList from "../components/banks/BankList";
import ConnectBankForm from "../components/banks/ConnectBankForm";

export default function ConnectBankPage() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanks()
      .then(setBanks)
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  async function handleSubmit(payload) {
    setError(null);
    setSubmitting(true);
    try {
      const data = await connectBank(payload);
      setResult(data);
      setSelectedBank(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">ربط حساب بنكي</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {!selectedBank && !result && (
        <>
          <p className="mb-3 text-sm text-slate-500">اختر بنكًا لبدء المحاكاة:</p>
          <BankList banks={banks} onSelect={setSelectedBank} />
        </>
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
        <div className="max-w-sm rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="mb-2 font-semibold text-green-800">تم الربط بنجاح</h2>
          <p className="mb-3 text-sm text-green-700">
            رصيد الحساب الجديد: <span dir="ltr">{result.account.balance} {result.account.currency}</span>{" "}
            — تمت إضافة {result.transactionCount} معاملة.
          </p>
          <Link to="/accounts" className="text-sm font-medium text-blue-600 hover:underline">
            عرض حساباتي ←
          </Link>
        </div>
      )}
    </div>
  );
}
