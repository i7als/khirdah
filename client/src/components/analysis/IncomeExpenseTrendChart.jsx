import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function IncomeExpenseTrendChart({ data }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const gridColor = theme === "dark" ? "#334155" : "#e1e0d9";
  const tickColor = theme === "dark" ? "#94a3b8" : "#898781";

  if (data.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("analysis.notEnoughData")}
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={{ fontFamily: "Tajawal", fontSize: 12, fill: tickColor }} />
        <YAxis tick={{ fontFamily: "Tajawal", fontSize: 12, fill: tickColor }} />
        <Tooltip
          formatter={(value) => `${value} KWD`}
          contentStyle={{
            borderRadius: 12,
            border: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
            background: theme === "dark" ? "#1e293b" : "#fff",
            color: theme === "dark" ? "#f1f5f9" : "#0f172a",
            fontFamily: "Tajawal",
          }}
        />
        <Legend
          wrapperStyle={{ fontFamily: "Tajawal", fontSize: 13, color: theme === "dark" ? "#cbd5e1" : undefined }}
        />
        <Bar dataKey="income" fill="#0ca30c" name={t("analysis.income")} radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" fill="#d03b3b" name={t("analysis.expense")} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
