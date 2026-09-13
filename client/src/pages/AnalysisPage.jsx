import { useEffect, useState } from "react";
import { fetchSummary, fetchByCategory, fetchTrend } from "../api/analysisApi";
import CategoryPieChart from "../components/analysis/CategoryPieChart";
import IncomeExpenseTrendChart from "../components/analysis/IncomeExpenseTrendChart";
import { TrendingUpIcon, TrendingDownIcon, ScaleIcon } from "../components/icons";

const statCards = [
  {
    key: "totalIncome",
    label: "إجمالي الدخل",
    Icon: TrendingUpIcon,
    iconBg: "bg-green-50 text-green-600",
    valueColor: "text-green-600",
  },
  {
    key: "totalExpense",
    label: "إجمالي المصروف",
    Icon: TrendingDownIcon,
    iconBg: "bg-red-50 text-red-600",
    valueColor: "text-red-600",
  },
  {
    key: "net",
    label: "الصافي",
    Icon: ScaleIcon,
    iconBg: "bg-blue-50 text-blue-600",
    valueColor: null,
  },
];

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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
        تحليل الإنفاق
      </h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {summary && (
        <div className="grid gap-4 sm:grid-cols-3">
          {statCards.map(({ key, label, Icon, iconBg, valueColor }) => {
            const value = summary[key];
            const color = valueColor || (value >= 0 ? "text-green-600" : "text-red-600");
            return (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-medium tracking-wide text-slate-500">{label}</p>
                </div>
                <p className={`text-3xl font-bold ${color}`} dir="ltr">
                  {value} <span className="text-base font-normal text-slate-400">KWD</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">المصروفات حسب التصنيف</h2>
          <CategoryPieChart data={byCategory} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">الدخل والمصروف الشهري</h2>
          <IncomeExpenseTrendChart data={trend} />
        </div>
      </div>
    </div>
  );
}
