import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchBanks, connectBank } from "../api/bankApi";
import BankList from "../components/banks/BankList";
import ConnectBankForm from "../components/banks/ConnectBankForm";

export default function ConnectBankPage() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetchBanks()
      .then(setBanks)
      .catch((err) => setLoadError(err.response?.data?.message || err.message));
  }, []);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      const data = await connectBank(payload);
      setResult(data);
      setSelectedBank(null);
      toast.success(`تم الربط بنجاح — تمت إضافة ${data.transactionCount} معاملة`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
        ربط حساب بنكي
      </h1>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}

      {!selectedBank && !result && (
        <div className="space-y-3">
          <p className="text-sm text-slate-500">اختر بنكًا لبدء المحاكاة:</p>
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
        <div className="max-w-sm rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-2 font-semibold text-green-800">تم الربط بنجاح</h2>
          <p className="mb-3 text-sm text-green-700">
            رصيد الحساب الجديد:{" "}
            <span dir="ltr">
              {result.account.balance} {result.account.currency}
            </span>{" "}
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
