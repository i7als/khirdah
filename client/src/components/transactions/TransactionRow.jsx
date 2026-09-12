import CategorySelect from "./CategorySelect";

export default function TransactionRow({ transaction, onCategoryChange }) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
        {new Date(transaction.date).toLocaleDateString("ar-KW")}
      </td>
      <td className="px-4 py-3 font-medium text-slate-800">{transaction.merchant}</td>
      <td className="px-4 py-3">
        <CategorySelect
          value={transaction.category}
          onChange={(newCategory) => onCategoryChange(transaction._id, newCategory)}
        />
      </td>
      <td
        dir="ltr"
        className={`px-4 py-3 text-left font-medium ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount} {transaction.currency}
      </td>
    </tr>
  );
}
