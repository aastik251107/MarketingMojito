import { useState, useEffect } from 'react';

const CURRENCIES = [
  { code: 'USD', label: '🇺🇸 USD' },
  { code: 'EUR', label: '🇪🇺 EUR' },
  { code: 'GBP', label: '🇬🇧 GBP' },
  { code: 'AED', label: '🇦🇪 AED' },
  { code: 'JPY', label: '🇯🇵 JPY' },
  { code: 'SGD', label: '🇸🇬 SGD' },
  { code: 'AUD', label: '🇦🇺 AUD' },
  { code: 'CAD', label: '🇨🇦 CAD' },
];

const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', AED: 'د.إ',
  JPY: '¥', SGD: 'S$', AUD: 'A$', CAD: 'C$',
};

// Cache rates to avoid redundant API calls
const rateCache = {};

export default function CurrencyConverter({ totalINR }) {
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const cacheKey = `INR_${targetCurrency}`;

    // Use cached rate if available (within 5 minutes)
    if (rateCache[cacheKey] && Date.now() - rateCache[cacheKey].ts < 300_000) {
      setRate(rateCache[cacheKey].rate);
      setLastUpdated(rateCache[cacheKey].updatedAt);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `https://api.frankfurter.dev/v1/latest?from=INR&to=${targetCurrency}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const r = data.rates[targetCurrency];
        const ts = Date.now();
        const updatedAt = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit',
        });
        rateCache[cacheKey] = { rate: r, ts, updatedAt };
        setRate(r);
        setLastUpdated(updatedAt);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Could not fetch live rates. Showing cached data if available.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [targetCurrency]);

  const converted = rate !== null ? totalINR * rate : null;
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || targetCurrency + ' ';

  return (
    <div className="card">
      <div className="card-label" style={{ marginBottom: 16 }}>
        <span>⇄</span> Currency Converter
      </div>

      {/* Loading / Error banners */}
      {loading && (
        <div className="api-status loading">
          <span className="spinner" />
          Fetching live exchange rate…
        </div>
      )}
      {error && !loading && (
        <div className="api-status error">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      {/* Currency selector */}
      <div className="converter-row">
        <div style={{ flex: 1 }}>
          <p className="form-label" style={{ marginBottom: 6 }}>Convert total to</p>
          <select
            className="form-select"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            aria-label="Select target currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      <div className="converted-result">
        <div>
          <p className="converted-label">
            ₹{totalINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })} INR =
          </p>
          <p className="converted-value">
            {converted !== null && !loading
              ? `${symbol}${converted.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : loading
              ? '—'
              : '—'}
          </p>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(255,224,61,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {targetCurrency === 'USD' ? '💵' :
           targetCurrency === 'EUR' ? '💶' :
           targetCurrency === 'GBP' ? '💷' : '💱'}
        </div>
      </div>

      {rate !== null && !loading && (
        <p className="rate-info">
          1 INR = {rate.toFixed(6)} {targetCurrency}
          {lastUpdated && ` · Updated ${lastUpdated}`}
        </p>
      )}
    </div>
  );
}
