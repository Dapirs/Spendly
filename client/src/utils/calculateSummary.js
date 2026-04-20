/**
 * Calculates a summary from an array of expense objects.
 * @param {Array<{ amount: number, category: string }>} expenses
 * @returns {{ total: number, count: number, topCategory: string | null }}
 */
const calculateSummary = (expenses) => {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const count = expenses.length;

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] >= categoryTotals[b] ? a : b
        )
      : null;

  return { total, count, topCategory };
};

export default calculateSummary;
