import { useLanguage } from "../../context/LanguageContext";
import { WalletIcon } from "../icons";
import EmptyState from "../common/EmptyState";
import AccountCard from "./AccountCard";

export default function AccountList({ accounts }) {
  const { t } = useLanguage();

  if (accounts.length === 0) {
    return (
      <EmptyState
        icon={WalletIcon}
        title={t("accounts.noAccountsTitle")}
        subtitle={t("accounts.noAccountsSubtitle")}
        actionLabel={t("accounts.noAccountsCta")}
        actionTo="/connect-bank"
      />
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
