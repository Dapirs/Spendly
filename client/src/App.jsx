import { useState, useEffect } from 'react';
import { getExpenses, addExpense, deleteExpense } from './services/api';
import SummaryCards from './components/SummaryCards';
import CategoryFilter from './components/CategoryFilter';
import Chart from './components/Chart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    getExpenses()
      .then(setExpenses)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (data) => {
    const newExpense = await addExpense(data);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const categories = [...new Set(expenses.map((e) => e.category))];

  const filteredExpenses = activeCategory
    ? expenses.filter((e) => e.category === activeCategory)
    : expenses;

  if (loading) {
    return <div className="loading">Loading expenses…</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spendly</h1>
        <p className="app-subtitle">Track your spending, simply.</p>
      </header>

      <main className="app-main">
        <SummaryCards expenses={expenses} />

        <section className="section">
          <h2 className="section-title">Spending by Category</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
          <Chart filteredExpenses={filteredExpenses} />
        </section>

        <section className="section">
          <h2 className="section-title">Add Expense</h2>
          <ExpenseForm onAdd={handleAdd} />
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
