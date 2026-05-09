# Submission Note: Marketing Mojito Expense Tracker

## Project Overview
I built a high-fidelity, production-ready Expense Tracker designed specifically to align with the **Marketing Mojito** brand aesthetic. The application is more than just a simple logging tool; it’s a visually immersive experience that features a responsive design, a sophisticated light/dark theme engine, and real-time financial utility. Key functional components include category-based filtering, persistent data storage via LocalStorage, and a live currency conversion system.

## Technical Details
The application is built using **React 18** and **Vite**. For the currency conversion feature, I utilized the **Frankfurter API**. This API provides reliable, real-time foreign exchange rates, allowing users to instantly see their total spending in multiple global currencies like USD and EUR. The styling is authored in **Vanilla CSS** to ensure maximum performance and total control over the design system, utilizing CSS variables to handle the complex transitions between theme modes and the animated background gradient meshes.

## Challenges Faced
The primary challenge was balancing the brand's "airy" and minimalist aesthetic with the data-heavy nature of a financial tracker. I solved this by using a fluid grid system and modular cards that provide visual "breathing room." Additionally, I encountered CORS and 301 redirect issues with the legacy Frankfurter API endpoint; I successfully resolved this by migrating the implementation to the modern `api.frankfurter.dev` v1 endpoint.

## Future Improvements
With more time, I would focus on three key areas:
1.  **Data Visualization:** Integrating a library like Recharts to provide interactive pie charts and spending trend graphs.
2.  **Cloud Persistence:** Migrating from LocalStorage to a backend like Supabase or Firebase to enable user authentication and cross-device syncing.
3.  **Advanced Exports:** Adding a feature to export monthly expense summaries as PDF or CSV files for professional accounting use.
