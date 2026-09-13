import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS, CATEGORY_COLORS_DARK } from "../../constants/categories";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translateCategory } from "../../i18n/translations";
import { formatNumber } from "../../utils/formatNumber";

export default function CategoryPieChart({ data }) {
  const { theme } = useTheme();
  const { t, lang } = useLanguage();
  const colors = theme === "dark" ? CATEGORY_COLORS_DARK : CATEGORY_COLORS;

  if (data.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("analysis.notEnoughData")}
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          label
        >
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={colors[entry.category] || "#898781"}
              stroke={theme === "dark" ? "#0f172a" : "#fff"}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${formatNumber(value)} KWD`, translateCategory(name, lang)]}
          contentStyle={{
            borderRadius: 12,
            border: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
            background: theme === "dark" ? "#1e293b" : "#fff",
            color: theme === "dark" ? "#f1f5f9" : "#0f172a",
            fontFamily: "Tajawal",
          }}
        />
        <Legend
          formatter={(value) => translateCategory(value, lang)}
          wrapperStyle={{ fontFamily: "Tajawal", fontSize: 13, color: theme === "dark" ? "#cbd5e1" : undefined }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
