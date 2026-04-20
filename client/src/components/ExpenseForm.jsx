import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const EMPTY = { description: '', amount: '', category: 'Food', date: '' };

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: Number(form.amount) });
    setForm(EMPTY);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Groceries"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
