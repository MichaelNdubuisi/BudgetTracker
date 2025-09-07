import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"];

function CategoryPieChart({ transactions, darkMode }) {
  const catTotals = {};
  transactions.forEach(tx => {
    if (tx.type === "expense") catTotals[tx.category] = (catTotals[tx.category] || 0) + tx.amount;
  });

  const data = Object.entries(catTotals).map(([name, value]) => ({ name, value }));
  if (data.length === 0)
    return <p className={`text-center italic mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No expenses to display.</p>;

  return (
    <>
      <h3 className={`font-semibold text-xl mb-4 text-center fade-in ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}
            labelLine={false}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke={darkMode ? "#374151" : "#E5E7EB"} strokeWidth={2} />)}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`₦${value.toLocaleString()}`, name]}
            contentStyle={{
              borderRadius: "8px",
              borderColor: darkMode ? "#6366F1" : "#4F46E5",
              backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
              color: darkMode ? "#E5E7EB" : "#374151"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default CategoryPieChart;
