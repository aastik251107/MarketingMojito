import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';
import ThemeToggle from './components/ThemeToggle';
import logoDark from './assets/logo-dark.png';
import logoWhite from './assets/logo-white.png';

// Seed data so the app looks populated on first load
const SEED_EXPENSES = [
  { id: 1, name: 'Meta Ads Campaign', amount: 4500.00, category: 'Marketing', date: '01 Jun 2025' },
  { id: 2, name: 'Team Lunch', amount: 1240.00, category: 'Food', date: '02 Jun 2025' },
  { id: 3, name: 'Mumbai Flight', amount: 6800.00, category: 'Travel', date: '03 Jun 2025' },
  { id: 4, name: 'Internet Bill', amount: 999.00, category: 'Utilities', date: '04 Jun 2025' },
];

const STORAGE_KEY = 'mm-expenses';

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore corrupt data */ }
    return SEED_EXPENSES;
  });

  const [filterCategory, setFilterCategory] = useState('All');

  // Persist to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app-wrapper">
      {/* ── Header ─────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <a href="https://marketingmojito.com" target="_blank" rel="noopener noreferrer" className="header-logo">
            <img src={logoDark} alt="Marketing Mojito" className="header-logo-img logo-for-light" />
            <img src={logoWhite} alt="Marketing Mojito" className="header-logo-img logo-for-dark" />
          </a>
          <div className="header-actions">
            <span className="header-tag">Expense Tracker</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────── */}
      <main className="app-main">
        <div className="page-hero">
          <h1>Track Every <em>Rupee.</em></h1>
          <p>Log expenses, view category breakdowns, and convert to any currency — live.</p>
        </div>

        <div className="app-grid">
          {/* Left column — sticky form + converter */}
          <aside className="left-col">
            <ExpenseForm onAdd={handleAdd} />
            <CurrencyConverter totalINR={total} />
          </aside>

          {/* Right column — summary + list */}
          <section className="right-col">
            <SummaryPanel expenses={expenses} />
            <ExpenseList 
              expenses={filteredExpenses} 
              onDelete={handleDelete}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
            />
          </section>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="app-footer">
        Built for{' '}
        <a href="https://marketingmojito.com" target="_blank" rel="noopener noreferrer">
          Marketing Mojito
        </a>{' '}
        · Web Developer Intern Assignment · Exchange rates via{' '}
        <a href="https://www.frankfurter.app" target="_blank" rel="noopener noreferrer">
          Frankfurter API
        </a>
      </footer>
    </div>
  );
}
