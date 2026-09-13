import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BuildingIcon, WalletIcon, ScaleIcon } from "../components/icons";

const actions = [
  {
    to: "/connect-bank",
    title: "ربط حساب بنكي",
    subtitle: "أضف حسابًا جديدًا (محاكاة)",
    Icon: BuildingIcon,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    to: "/accounts",
    title: "حساباتي",
    subtitle: "عرض الأرصدة والمعاملات",
    Icon: WalletIcon,
    iconBg: "bg-green-50 text-green-600",
  },
  {
    to: "/analysis",
    title: "تحليل الإنفاق",
    subtitle: "إحصائيات ورسوم بيانية",
    Icon: ScaleIcon,
    iconBg: "bg-amber-50 text-amber-600",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          مرحبًا، {user?.name}
        </h1>
        <p className="mt-1 text-slate-500">{user?.email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map(({ to, title, subtitle, Icon, iconBg }) => (
          <Link
            key={to}
            to={to}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
              <Icon className="h-6 w-6" />
            </span>
            <p className="mb-1 text-lg font-semibold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
