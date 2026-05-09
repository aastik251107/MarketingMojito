# Marketing Mojito - Expense Tracker

A modern, high-fidelity expense tracking application built with React and Vite, featuring a premium design aesthetic inspired by Marketing Mojito.

## Features

- Marketing Mojito Aesthetic: Clean, airy UI with Poppins typography, rounded components, and custom green branding.
- Dynamic Backgrounds: Sophisticated pure CSS backgrounds with animated gradient mesh effects and dot grid patterns.
- Real-time Currency Conversion: Convert your total expenses to USD, EUR, and more using live rates from the Frankfurter API.
- Theme Toggle: Seamless switching between Light and Dark modes with system preference detection and persistence.
- Persistence: All your expenses are saved locally in your browser so they survive page refreshes.
- Category Filtering: Filter your expense list by category (Food, Travel, Marketing, etc.) with real-time count badges.
- Fully Responsive: Optimized for desktop, tablet, and mobile devices.

## Project Structure

```text
expense-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── logo-dark.png
│   │   └── logo-white.png
│   ├── components/
│   │   ├── CurrencyConverter.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── SummaryPanel.jsx
│   │   └── ThemeToggle.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Tech Stack

- Framework: React 18
- Build Tool: Vite
- Styling: Vanilla CSS (CSS Variables, Flexbox, Grid)
- API: Frankfurter API (Currency conversion)
- Deployment: Vercel

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```
The optimized build will be generated in the dist folder.

---

Built for Marketing Mojito - Web Developer Intern Assignment
