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

export default function IncomeExpenseTrendChart({ data }) {
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">لا توجد بيانات كافية.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontFamily: "Tajawal", fontSize: 12, fill: "#898781" }} />
        <YAxis tick={{ fontFamily: "Tajawal", fontSize: 12, fill: "#898781" }} />
        <Tooltip
          formatter={(value) => `${value} KWD`}
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontFamily: "Tajawal" }}
        />
        <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 13 }} />
        <Bar dataKey="income" fill="#0ca30c" name="دخل" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" fill="#d03b3b" name="مصروف" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
