const ExpenseItem = ({ expense, onDelete }) => {
  const { id, description, amount, category, date } = expense;

  return (
    <div className="expense-item">
      <div className="expense-item__info">
        <span className="expense-item__description">{description}</span>
        <span className={`expense-item__category category--${category.toLowerCase()}`}>
          {category}
        </span>
        <span className="expense-item__date">{date}</span>
      </div>
      <div className="expense-item__right">
        <span className="expense-item__amount">${Number(amount).toFixed(2)}</span>
        <button
          className="btn-delete"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${description}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
