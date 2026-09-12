import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAccounts } from "../api/accountApi";
import AccountList from "../components/accounts/AccountList";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts()
      .then(setAccounts)
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">حساباتي</h1>
        <Link
          to="/connect-bank"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
        >
          + ربط حساب جديد
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <AccountList accounts={accounts} />
    </div>
  );
}
