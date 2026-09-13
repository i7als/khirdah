import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  actionTo,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Icon className="h-7 w-7" />
        </span>
      )}
      <div>
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {(actionLabel || secondaryLabel) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {actionLabel &&
            (actionTo ? (
              <Link
                to={actionTo}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
              >
                {actionLabel}
              </Link>
            ) : (
              <button
                onClick={onAction}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
              >
                {actionLabel}
              </button>
            ))}
          {secondaryLabel && (
            <button
              onClick={onSecondaryAction}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
