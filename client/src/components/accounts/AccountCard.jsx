import { Link } from "react-router-dom";

export default function AccountCard({ account }) {
  return (
    <Link
      to={`/accounts/${account._id}`}
      style={{ borderInlineStart: `4px solid ${account.bank?.colorHex || "#2563eb"}` }}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="mb-1 text-sm text-slate-500">{account.bank?.name}</p>
      <p className="mb-3 font-mono text-sm text-slate-400" dir="ltr">
        {account.accountNumberMasked}
      </p>
      <p className="text-2xl font-bold text-slate-800" dir="ltr">
        {account.balance} <span className="text-base font-normal text-slate-500">{account.currency}</span>
      </p>
    </Link>
  );
}
