const getBarColor = (pct) => {
  if (pct >= 90) return 'bar--danger';
  if (pct >= 70) return 'bar--warning';
  return 'bar--safe';
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
        const spent  = spendMap[cat] || 0;
        const hasBudget = budget != null && budget > 0;
        const pct    = hasBudget ? Math.min((spent / budget) * 100, 100) : 0;
        const barCls = hasBudget ? getBarColor(pct) : '';

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
                    className={`budget-bar-fill ${barCls}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="budget-bar-label">
                  {formatINR(spent)} / {formatINR(budget)}
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
