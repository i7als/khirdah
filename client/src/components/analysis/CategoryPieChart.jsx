import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS } from "../../constants/categories";

export default function CategoryPieChart({ data }) {
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">لا توجد بيانات كافية.</p>;
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
              fill={CATEGORY_COLORS[entry.category] || "#898781"}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${value} KWD`}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontFamily: "Tajawal" }}
        />
        <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 13 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
