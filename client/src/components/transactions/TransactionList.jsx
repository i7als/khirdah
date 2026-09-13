import { useLanguage } from "../../context/LanguageContext";
import { TableRowSkeleton } from "../common/Skeleton";
import EmptyState from "../common/EmptyState";
import TransactionRow from "./TransactionRow";

export default function TransactionList({
  transactions,
  onCategoryChange,
  loading,
  filtersActive,
  onClearFilters,
}) {
  const { t } = useLanguage();

  if (!loading && transactions.length === 0) {
    return filtersActive ? (
      <EmptyState
        title={t("accounts.noResultsTitle")}
        subtitle={t("accounts.noResultsSubtitle")}
        actionLabel={t("accounts.clearFilters")}
        onAction={onClearFilters}
      />
    ) : (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        {t("accounts.noTransactions")}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 text-start font-medium">{t("transactions.date")}</th>
            <th className="px-4 py-3 text-start font-medium">{t("transactions.merchant")}</th>
            <th className="px-4 py-3 text-start font-medium">{t("transactions.category")}</th>
            <th className="px-4 py-3 text-end font-medium">{t("transactions.amount")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} />)
            : transactions.map((tx) => (
                <TransactionRow key={tx._id} transaction={tx} onCategoryChange={onCategoryChange} />
              ))}
        </tbody>
      </table>
    </div>
  );
}
