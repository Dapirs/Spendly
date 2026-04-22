import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

const BUDGET_BAR_COLOR = '#334155';
const OVER_BUDGET_COLOR = '#ef4444';

const formatINR = (value) =>
  `₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload;
  if (!data) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <p>{label}</p>
      <p>Spent: {formatINR(data.spent)}</p>
      {data.hasBudget && <p>Budget: {formatINR(data.budget)}</p>}
    </div>
  );
};

const Chart = ({ expenses = [], budgets = {} }) => {
  const totals = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  const categories = Object.keys(totals).sort((a, b) => a.localeCompare(b));
  const categoryColorMap = categories.reduce((acc, category, index) => {
    acc[category] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    return acc;
  }, {});

  const data = categories.map((category) => {
    const spent = Number(totals[category] || 0);
    const budgetNum = Number(budgets[category]);
    const hasBudget = Number.isFinite(budgetNum) && budgetNum > 0;

    return {
      category,
      spent: parseFloat(spent.toFixed(2)),
      budget: hasBudget ? parseFloat(budgetNum.toFixed(2)) : undefined,
      hasBudget,
      spentColor:
        hasBudget && spent > budgetNum ? OVER_BUDGET_COLOR : categoryColorMap[category],
    };
  });

  if (data.length === 0) {
    return <p className="empty-state">Add expenses to see the breakdown.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barGap={8}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Bar dataKey="spent" name="Spent" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={`spent-${entry.category}`} fill={entry.spentColor} />
          ))}
        </Bar>

        <Bar
          dataKey="budget"
          name="Budget"
          fill={BUDGET_BAR_COLOR}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
