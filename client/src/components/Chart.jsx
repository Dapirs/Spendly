import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLOR_PALETTE = [
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
];

const Chart = ({ filteredExpenses }) => {
  const totals = filteredExpenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  const data = Object.entries(totals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  const uniqueCategories = Object.keys(totals).sort((a, b) => a.localeCompare(b));
  const categoryColorMap = uniqueCategories.reduce((acc, category, index) => {
    acc[category] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    return acc;
  }, {});

  if (data.length === 0) {
    return <p className="empty-state">Add expenses to see the breakdown.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={290}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={72}
          outerRadius={108}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={categoryColorMap[entry.name]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
          }
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
