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
    return <p>لا توجد بيانات كافية.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#16a34a" name="دخل" />
        <Bar dataKey="expense" fill="#dc2626" name="مصروف" />
      </BarChart>
    </ResponsiveContainer>
  );
}
