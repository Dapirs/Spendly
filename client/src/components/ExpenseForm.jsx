import { useState } from 'react';

const EMPTY = { description: '', amount: '', category: '', date: '' };
const NEW_CATEGORY_SENTINEL = '__new__';

const ExpenseForm = ({ onAdd, categories, onAddCategory }) => {
  const [form, setForm] = useState({ ...EMPTY, category: categories[0] ?? '' });
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category' && value === NEW_CATEGORY_SENTINEL) {
      setAddingCategory(true);
      setNewCategoryName('');
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    await onAddCategory(trimmed);
    setForm((prev) => ({ ...prev, category: trimmed }));
    setAddingCategory(false);
    setNewCategoryName('');
  };

  const handleCancelCategory = () => {
    setAddingCategory(false);
    setNewCategoryName('');
  };

  const handleNewCategoryKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleConfirmCategory(); }
    if (e.key === 'Escape') handleCancelCategory();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ ...EMPTY, category: categories[0] ?? '' });
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
            {addingCategory ? (
              <div className="new-category-inline">
                <input
                  autoFocus
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={handleNewCategoryKeyDown}
                  placeholder="Category name…"
                  className="new-category-input"
                />
                <button
                  type="button"
                  className="btn-confirm-category"
                  onClick={handleConfirmCategory}
                  disabled={!newCategoryName.trim()}
                >
                  ✓
                </button>
                <button
                  type="button"
                  className="btn-cancel-category"
                  onClick={handleCancelCategory}
                >
                  ✕
                </button>
              </div>
            ) : (
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option disabled>──────────</option>
                <option value={NEW_CATEGORY_SENTINEL}>+ New Category</option>
              </select>
            )}
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
