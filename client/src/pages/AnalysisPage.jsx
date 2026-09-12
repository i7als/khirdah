import { useEffect, useState } from "react";
import { fetchSummary, fetchByCategory, fetchTrend } from "../api/analysisApi";
import CategoryPieChart from "../components/analysis/CategoryPieChart";
import IncomeExpenseTrendChart from "../components/analysis/IncomeExpenseTrendChart";

export default function AnalysisPage() {
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState([]);
  const [trend, setTrend] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchSummary(), fetchByCategory(), fetchTrend(6)])
      .then(([s, c, t]) => {
        setSummary(s);
        setByCategory(c);
        setTrend(t);
      })
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">تحليل الإنفاق</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {summary && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="mb-1 text-sm text-slate-500">إجمالي الدخل</p>
            <p className="text-2xl font-bold text-green-600" dir="ltr">
              {summary.totalIncome} KWD
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="mb-1 text-sm text-slate-500">إجمالي المصروف</p>
            <p className="text-2xl font-bold text-red-600" dir="ltr">
              {summary.totalExpense} KWD
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="mb-1 text-sm text-slate-500">الصافي</p>
            <p
              className={`text-2xl font-bold ${summary.net >= 0 ? "text-green-600" : "text-red-600"}`}
              dir="ltr"
            >
              {summary.net} KWD
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">المصروفات حسب التصنيف</h2>
          <CategoryPieChart data={byCategory} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">الدخل والمصروف الشهري</h2>
          <IncomeExpenseTrendChart data={trend} />
        </div>
      </div>
    </div>
  );
}
