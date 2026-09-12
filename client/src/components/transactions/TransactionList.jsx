import TransactionRow from "./TransactionRow";

export default function TransactionList({ transactions, onCategoryChange }) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        لا توجد معاملات.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 text-right font-medium">التاريخ</th>
            <th className="px-4 py-3 text-right font-medium">التاجر</th>
            <th className="px-4 py-3 text-right font-medium">التصنيف</th>
            <th className="px-4 py-3 text-left font-medium">المبلغ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <TransactionRow key={tx._id} transaction={tx} onCategoryChange={onCategoryChange} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
