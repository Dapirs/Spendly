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
    <div className="expense-form-wrap">
      <form className="expense-form" onSubmit={handleSubmit}>

        {/* Row 1 — Description */}
        <div className="field field--description">
          <label htmlFor="description">What did you spend on?</label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Swiggy order, Uber ride…"
            autoComplete="off"
            required
          />
        </div>

        {/* Row 2 — Amount / Category / Date */}
        <div className="form-row">
          <div className="field field--amount">
            <label htmlFor="amount">Amount</label>
            <span className="amount-prefix">₹</span>
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

          <div className="field">
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

          <div className="field">
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
        </div>

        <button type="submit" className="btn-submit">
          + Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
