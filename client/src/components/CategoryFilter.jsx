const getBarColor = (ratio) => {
  if (ratio >= 0.9) return '#ef4444';
  if (ratio >= 0.7) return '#f59e0b';
  return '#10b981';
};

const formatINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

const CategoryFilter = ({
  categories,
  activeCategory,
  onFilterChange,
  budgets = {},
  expenses = [],
}) => {
  // Pre-compute spend per category once
  const spendMap = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  return (
    <div className="category-filter">
      {/* "All" pill — no budget bar */}
      <button
        className={`pill${activeCategory === null ? ' pill--active' : ''}`}
        onClick={() => onFilterChange(null)}
      >
        All
      </button>

      {categories.map((cat) => {
        const budget = budgets[cat];
        const spent = spendMap[cat] || 0;
        const spentNum = Number(spent);
        const budgetNum = Number(budget);
        const hasBudget = Number.isFinite(budgetNum) && budgetNum > 0;
        const ratio = hasBudget ? spentNum / budgetNum : 0;
        const pct = hasBudget ? Math.min(ratio * 100, 100) : 0;
        const barColor = getBarColor(ratio);

        return (
          <div key={cat} className="pill-wrap">
            <button
              className={`pill${activeCategory === cat ? ' pill--active' : ''}`}
              onClick={() => onFilterChange(cat)}
            >
              {cat}
            </button>

            {hasBudget && (
              <div className="budget-bar-wrap">
                <div className="budget-bar-track">
                  <div
                    className="budget-bar-fill"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </div>
                <span className="budget-bar-label">
                  {formatINR(spentNum)} / {formatINR(budgetNum)}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
