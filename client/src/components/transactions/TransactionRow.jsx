import { useLanguage } from "../../context/LanguageContext";
import CategorySelect from "./CategorySelect";

export default function TransactionRow({ transaction, onCategoryChange }) {
  const { lang } = useLanguage();

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">
        {new Date(transaction.date).toLocaleDateString(lang === "ar" ? "ar-KW" : "en-GB")}
      </td>
      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
        {transaction.merchant}
      </td>
      <td className="px-4 py-3">
        <CategorySelect
          value={transaction.category}
          onChange={(newCategory) => onCategoryChange(transaction._id, newCategory)}
        />
      </td>
      <td
        dir="ltr"
        className={`px-4 py-3 text-end font-medium ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount} {transaction.currency}
      </td>
    </tr>
  );
}
