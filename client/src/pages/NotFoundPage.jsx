import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-3xl font-bold text-slate-800">404</p>
      <p className="text-slate-500">الصفحة غير موجودة.</p>
      <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
        رجوع للوحة التحكم
      </Link>
    </div>
  );
}
