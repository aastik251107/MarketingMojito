import { useState } from 'react';

const CATEGORIES = [
  { value: 'Food', label: '🍔 Food', color: '#FF8C42' },
  { value: 'Travel', label: '✈️ Travel', color: '#4ECDC4' },
  { value: 'Marketing', label: '📣 Marketing', color: '#7BC63E' },
  { value: 'Utilities', label: '⚡ Utilities', color: '#FFE03D' },
  { value: 'Shopping', label: '🛍️ Shopping', color: '#C77DFF' },
  { value: 'Health', label: '💊 Health', color: '#FF6B9D' },
  { value: 'Other', label: '📌 Other', color: '#888' },
];

export { CATEGORIES };

export default function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [touched, setTouched] = useState({});

  const isValid = name.trim().length > 0 && parseFloat(amount) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, amount: true });
    if (!isValid) return;

    onAdd({
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      }),
    });

    setName('');
    setAmount('');
    setCategory('Food');
    setTouched({});
  };

  return (
    <div className="card">
      <div className="card-label">
        <span>✦</span> New Expense
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="expense-name">
            Expense Name
          </label>
          <input
            id="expense-name"
            type="text"
            className="form-input"
            placeholder="e.g. Team Lunch, Meta Ads…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            maxLength={60}
            autoComplete="off"
          />
          {touched.name && !name.trim() && (
            <span style={{ fontSize: 11, color: 'var(--mm-red)', marginTop: 2 }}>
              Name is required
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="expense-amount">
            Amount (₹)
          </label>
          <div className="amount-wrapper">
            <span className="currency-prefix">₹</span>
            <input
              id="expense-amount"
              type="number"
              className="form-input with-prefix"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, amount: true }))}
              min="0.01"
              step="0.01"
            />
          </div>
          {touched.amount && !(parseFloat(amount) > 0) && (
            <span style={{ fontSize: 11, color: 'var(--mm-red)', marginTop: 2 }}>
              Enter a valid amount
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="expense-category">
            Category
          </label>
          <select
            id="expense-category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isValid && Object.keys(touched).length > 0}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Add Expense
        </button>
      </form>
    </div>
  );
}
