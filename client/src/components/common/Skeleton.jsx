export function SkeletonBox({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 ${className}`} />;
}

export function BankListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <SkeletonBox className="h-9 w-9 shrink-0 rounded-full" />
      <SkeletonBox className="h-4 w-2/3" />
    </div>
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <SkeletonBox className="mb-3 h-5 w-2/3" />
      <SkeletonBox className="mb-4 h-4 w-1/3" />
      <SkeletonBox className="h-7 w-1/2" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-3">
        <SkeletonBox className="h-9 w-9 rounded-full" />
        <SkeletonBox className="h-4 w-24" />
      </div>
      <SkeletonBox className="h-8 w-32" />
    </div>
  );
}

export function ChartSkeleton() {
  return <SkeletonBox className="h-[300px] w-full" />;
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-4 py-3">
        <SkeletonBox className="h-4 w-20" />
      </td>
      <td className="px-4 py-3">
        <SkeletonBox className="h-4 w-28" />
      </td>
      <td className="px-4 py-3">
        <SkeletonBox className="h-7 w-28" />
      </td>
      <td className="px-4 py-3">
        <SkeletonBox className="ms-auto h-4 w-16" />
      </td>
    </tr>
  );
}
