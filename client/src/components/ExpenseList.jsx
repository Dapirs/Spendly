import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add one above!</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ExpenseList;
