import { CATEGORIES } from './ExpenseForm';

function getCategoryColor(name) {
  const found = CATEGORIES.find((c) => c.value === name);
  return found ? found.color : '#888';
}

export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Build category breakdown
  const breakdown = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(breakdown).sort(
    ([, a], [, b]) => b - a
  );

  const maxCatAmount = sortedCategories.length > 0
    ? sortedCategories[0][1]
    : 1;

  return (
    <div className="card">
      <div className="card-label" style={{ marginBottom: 16 }}>
        <span>▲</span> Summary
      </div>

      {/* Total */}
      <div className="total-block">
        <p className="total-label">Total Spent</p>
        <p className="total-amount">
          ₹{total.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="total-count">
          {expenses.length === 0
            ? 'No expenses logged'
            : `${expenses.length} expense${expenses.length > 1 ? 's' : ''} logged`}
        </p>
      </div>

      {/* Category Breakdown */}
      {sortedCategories.length > 0 ? (
        <>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--mm-text-muted)',
              marginBottom: 14,
            }}
          >
            By Category
          </p>
          <div className="category-list">
            {sortedCategories.map(([cat, amount]) => {
              const color = getCategoryColor(cat);
              const pct = (amount / maxCatAmount) * 100;
              return (
                <div className="category-row" key={cat}>
                  <span
                    className="category-dot"
                    style={{ background: color }}
                  />
                  <span className="category-name">{cat}</span>
                  <div className="category-bar-wrap">
                    <div
                      className="category-bar"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="category-amount">
                    ₹{amount.toLocaleString('en-IN', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p
          style={{
            fontSize: 13,
            color: 'var(--mm-text-dim)',
            textAlign: 'center',
            padding: '16px 0',
          }}
        >
          Breakdown will appear here
        </p>
      )}
    </div>
  );
}
