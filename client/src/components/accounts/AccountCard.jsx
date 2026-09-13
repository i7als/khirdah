import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { translateBankName } from "../../i18n/translations";
import { formatNumber } from "../../utils/formatNumber";

export default function AccountCard({ account }) {
  const { lang } = useLanguage();
  const bankColor = account.bank?.colorHex || "#2563eb";

  return (
    <Link
      to={`/accounts/${account._id}`}
      style={{ borderInlineStart: `4px solid ${bankColor}` }}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-2 flex items-center gap-2">
        {account.bank?.logoUrl ? (
          <img src={account.bank.logoUrl} alt={account.bank.name} className="h-6 w-6 object-contain" />
        ) : (
          <span
            style={{ backgroundColor: bankColor }}
            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
          >
            {account.bank?.name?.[0]}
          </span>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {translateBankName(account.bank?.name, lang)}
        </p>
      </div>
      <p className="mb-4 font-mono text-sm text-slate-400 dark:text-slate-500" dir="ltr">
        {account.accountNumberMasked}
      </p>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100" dir="ltr">
        {formatNumber(account.balance)}{" "}
        <span className="text-base font-normal text-slate-500 dark:text-slate-400">
          {account.currency}
        </span>
      </p>
    </Link>
  );
}
