import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-800">مرحبًا، {user?.name}</h1>
      <p className="mb-6 text-slate-500">{user?.email}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/connect-bank" className={cardClass}>
          <p className="mb-1 text-lg font-semibold text-blue-600">ربط حساب بنكي</p>
          <p className="text-sm text-slate-500">أضف حسابًا جديدًا (محاكاة)</p>
        </Link>
        <Link to="/accounts" className={cardClass}>
          <p className="mb-1 text-lg font-semibold text-blue-600">حساباتي</p>
          <p className="text-sm text-slate-500">عرض الأرصدة والمعاملات</p>
        </Link>
        <Link to="/analysis" className={cardClass}>
          <p className="mb-1 text-lg font-semibold text-blue-600">تحليل الإنفاق</p>
          <p className="text-sm text-slate-500">إحصائيات ورسوم بيانية</p>
        </Link>
      </div>
    </div>
  );
}
