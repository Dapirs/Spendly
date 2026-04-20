import { useState, useEffect } from 'react';
import {
  getExpenses, addExpense, deleteExpense,
  getCategories, addCategory,
  getBudgets, setBudget,
} from './services/api';
import SummaryCards from './components/SummaryCards';
import CategoryFilter from './components/CategoryFilter';
import Chart from './components/Chart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [expenses, setExpenses]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets]       = useState({});
  const [loading, setLoading]       = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  // Parallel fetch on mount
  useEffect(() => {
    Promise.all([getExpenses(), getCategories(), getBudgets()])
      .then(([exp, cats, bud]) => {
        setExpenses(exp);
        setCategories(cats);
        setBudgets(bud);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Expense handlers ──────────────────────────────────────────
  const handleAdd = async (data) => {
    const newExpense = await addExpense(data);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Category handler ──────────────────────────────────────────
  const handleAddCategory = async (name) => {
    const updated = await addCategory(name);
    setCategories(updated);
  };

  // ── Budget handler ────────────────────────────────────────────
  const handleSetBudget = async (category, amount) => {
    const updated = await setBudget(category, amount);
    setBudgets(updated);
  };

  // ── Derived ───────────────────────────────────────────────────
  const filteredExpenses = activeCategory
    ? expenses.filter((e) => e.category === activeCategory)
    : expenses;

  if (loading) {
    return <div className="loading">Loading your data…</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spend<span>ly</span></h1>
        <p className="app-subtitle">Personal finance dashboard</p>
      </header>

      <main className="app-main">
        <SummaryCards
          expenses={expenses}
          budgets={budgets}
          onSetBudget={handleSetBudget}
        />

        <section className="section">
          <h2 className="section-title">Spending by Category</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
            budgets={budgets}
            onSetBudget={handleSetBudget}
            expenses={expenses}
          />
          <Chart filteredExpenses={filteredExpenses} />
        </section>

        <section className="section">
          <h2 className="section-title">Add Expense</h2>
          <ExpenseForm
            onAdd={handleAdd}
            categories={categories}
            onAddCategory={handleAddCategory}
          />
        </section>

        <section className="section">
          <h2 className="section-title">
            Expenses {activeCategory ? `· ${activeCategory}` : ''}
          </h2>
          <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
};

export default App;
