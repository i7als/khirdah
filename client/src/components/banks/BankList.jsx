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
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          {bank.logoUrl ? (
            <img src={bank.logoUrl} alt={bank.name} className="h-9 w-9 shrink-0 object-contain" />
          ) : (
            <span
              style={{ backgroundColor: bank.colorHex }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            >
              {bank.name[0]}
            </span>
          )}
          <span className="font-medium text-slate-800">{bank.name}</span>
        </button>
      ))}
    </div>
  );
}
