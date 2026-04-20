import calculateSummary from '../utils/calculateSummary';

const SummaryCards = ({ expenses }) => {
  const { total, count, topCategory } = calculateSummary(expenses);

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <span className="summary-card__label">Total Spent</span>
        <span className="summary-card__value">${total.toFixed(2)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-card__label">Transactions</span>
        <span className="summary-card__value">{count}</span>
      </div>
      <div className="summary-card">
        <span className="summary-card__label">Top Category</span>
        <span className="summary-card__value">{topCategory ?? '—'}</span>
      </div>
    </div>
  );
};

export default SummaryCards;
