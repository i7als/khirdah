export default function BankList({ banks, onSelect }) {
  if (banks.length === 0) {
    return <p className="text-sm text-slate-500">لا توجد بنوك متاحة حاليًا.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {banks.map((bank) => (
        <button
          key={bank._id}
          onClick={() => onSelect(bank)}
          style={{ borderTop: `4px solid ${bank.colorHex}` }}
          className="rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="font-medium text-slate-800">{bank.name}</span>
        </button>
      ))}
    </div>
  );
}
