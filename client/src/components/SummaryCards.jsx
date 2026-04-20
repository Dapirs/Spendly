import { useState } from 'react';
import calculateSummary from '../utils/calculateSummary';

const formatINR = (amount) =>
  `₹${Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const SummaryCards = ({ expenses, budgets = {}, onSetBudget }) => {
  const { total, count, topCategory } = calculateSummary(expenses);
  const [budgetInputs, setBudgetInputs] = useState({});

  const spendByCategory = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + Number(amount);
    return acc;
  }, {});

  const categories = Object.keys(spendByCategory).sort((a, b) => a.localeCompare(b));

  const overBudgetCount = categories.reduce((acc, category) => {
    const budget = Number(budgets[category]);
    if (budget > 0 && spendByCategory[category] > budget) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const topCategorySpend = topCategory ? spendByCategory[topCategory] || 0 : 0;
  const topCategoryBudget = topCategory ? Number(budgets[topCategory]) : 0;
  const hasTopBudget = topCategoryBudget > 0;
  const topCategoryPct = hasTopBudget
    ? Math.min((topCategorySpend / topCategoryBudget) * 100, 100)
    : 0;

  const handleBudgetSubmit = async (category) => {
    const rawAmount = budgetInputs[category];
    const amount = Number(rawAmount);

    if (!onSetBudget || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    await onSetBudget(category, amount);
    setBudgetInputs((prev) => ({ ...prev, [category]: '' }));
  };

  return (
    <>
      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-card__label">Total Spent</span>
          <span className="summary-card__value">
            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-card__label">Transactions</span>
          <span className="summary-card__value">{count}</span>
        </div>
        <div className="summary-card">
          <span className="summary-card__label">Top Category</span>
          <span className="summary-card__value">{topCategory ?? '—'}</span>
          {topCategory && hasTopBudget && (
            <>
              <span className="summary-card__meta">
                {formatINR(topCategorySpend)} / {formatINR(topCategoryBudget)}
              </span>
              <div className="summary-budget-progress" role="presentation">
                <div
                  className="summary-budget-progress__fill"
                  style={{ width: `${topCategoryPct}%` }}
                />
              </div>
            </>
          )}
        </div>
        <div className="summary-card">
          <span className="summary-card__label">Over Budget</span>
          <span className="summary-card__value">{overBudgetCount}</span>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="summary-budget-controls">
          {categories.map((category) => {
            const currentBudget = Number(budgets[category]);
            return (
              <div key={category} className="summary-budget-controls__row">
                <span className="summary-budget-controls__name">{category}</span>
                <span className="summary-budget-controls__spent">
                  {formatINR(spendByCategory[category])}
                  {currentBudget > 0 ? ` / ${formatINR(currentBudget)}` : ''}
                </span>
                <input
                  className="summary-budget-controls__input"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder={currentBudget > 0 ? String(currentBudget) : 'Budget'}
                  value={budgetInputs[category] ?? ''}
                  onChange={(e) =>
                    setBudgetInputs((prev) => ({ ...prev, [category]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      void handleBudgetSubmit(category);
                    }
                  }}
                />
                <button
                  type="button"
                  className="summary-budget-controls__button"
                  onClick={() => void handleBudgetSubmit(category)}
                >
                  Set Budget
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SummaryCards;
