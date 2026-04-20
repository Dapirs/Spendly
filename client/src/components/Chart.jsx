import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

const Chart = ({ filteredExpenses }) => {
  const data = Object.entries(
    filteredExpenses.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + Number(amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));

  if (data.length === 0) {
    return <p className="empty-state">No data to display yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
