import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/* Matches CSS category palette exactly */
const CATEGORY_COLORS = {
  Food:      '#00de7e',
  Transport: '#38b6ff',
  Shopping:  '#f5a623',
  Bills:     '#ff4d6d',
  Other:     '#9f7aea',
};

const FALLBACK_COLORS = ['#00de7e', '#38b6ff', '#f5a623', '#ff4d6d', '#9f7aea'];

const Chart = ({ filteredExpenses }) => {
  const totals = filteredExpenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  const data = Object.entries(totals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

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
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
            />
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
