import { CATEGORIES } from './ExpenseForm';

const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Marketing: '📣',
  Utilities: '⚡',
  Shopping: '🛍️',
  Health: '💊',
  Other: '📌',
};

function getCategoryColor(categoryName) {
  const found = CATEGORIES.find((c) => c.value === categoryName);
  return found ? found.color : '#888';
}

export default function ExpenseList({ expenses, onDelete, filterCategory, onFilterChange }) {
  return (
    <div className="card">
      <div className="list-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-label" style={{ marginBottom: 0 }}>
            <span>◈</span> Expenses
          </div>
          {expenses.length > 0 && (
            <span className="expense-count-badge">{expenses.length}</span>
          )}
        </div>
        
        <div className="filter-wrapper">
          <select 
            className="form-select filter-select"
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🧾</div>
          <p className="empty-title">No expenses yet</p>
          <p className="empty-sub">Add your first expense using the form</p>
        </div>
      ) : (
        <div className="expense-grid">
          {expenses.map((exp) => {
            const color = getCategoryColor(exp.category);
            const icon = CATEGORY_ICONS[exp.category] || '📌';

            return (
              <div className="expense-item" key={exp.id}>
                <div
                  className="expense-icon"
                  style={{ background: `${color}18` }}
                >
                  {icon}
                </div>

                <div className="expense-info">
                  <div className="expense-name">{exp.name}</div>
                  <div className="expense-meta">
                    <span
                      style={{
                        color,
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    >
                      {exp.category}
                    </span>
                    <span className="expense-meta-dot" />
                    <span>{exp.date}</span>
                  </div>
                </div>

                <div className="expense-amount">
                  ₹{exp.amount.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(exp.id)}
                  aria-label={`Delete ${exp.name}`}
                  title="Remove"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 3.5h10M5.5 3.5V2.5h3v1M5 3.5l.5 8h3l.5-8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
