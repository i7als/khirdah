import AccountCard from "./AccountCard";

export default function AccountList({ accounts }) {
  if (accounts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        لا توجد حسابات مرتبطة بعد.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard key={account._id} account={account} />
      ))}
    </div>
  );
}
