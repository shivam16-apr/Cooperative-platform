# SevaPulse Admin Dashboard 🇮🇳

> **Bharat's On-Demand Services & Operations Management Platform**  
> Built for Smart India Hackathon (SIH) & scalable municipal / enterprise service operations.

---

## 📌 Features & Modules

- **📊 Central Overview & Operations Center**:
  - Real-time KPI counters (Active Technicians, Bookings, Completed Jobs, Gross Revenue).
  - Interactive Revenue & Job fulfillment charts powered by Chart.js.
  - Broadcast team motivation messages & send appreciation bonuses (Mithai tips).
  - Quick CSV report generation.

- **👷 Technician / Worker Roster**:
  - Track live availability (`Active`, `On Duty`, `Offline`).
  - Send direct praise & shabaashi tips with automated ledger updates.
  - Onboard new verified service professionals.

- **👥 Customer Directory**:
  - Customer profiles, tier classifications (Gold, Silver, Platinum), and booking history.
  - Integrated WhatsApp & call shortcuts for instant communication.

- **📅 Bookings Management**:
  - Full lifecycle tracking: `Pending` ➔ `Confirmed` ➔ `In Progress` ➔ `Completed`.
  - Manual booking creation with instant worker assignment and payment invoice generation.

- **💳 Payments & Invoicing**:
  - Digital transaction logs (UPI / PhonePe / GPay / NetBanking / Cash).
  - Modal invoice preview and exportable billing data (CSV).

- **🛡️ Grievance & Complaint Redressal**:
  - Transparent grievance ticket handling with resolution workflows and apology vouchers.

- **📈 Visual Analytics & Reports**:
  - Service volume breakdowns, regional heatmaps, and financial analytics.

- **⚙️ Settings & Security**:
  - Dark Mode & Light Mode support.
  - Quick-lock session overlay with PIN authentication simulation.
  - LocalStorage persistence for all mock databases.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Bundler & Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Chart.js](https://www.chartjs.org/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Open a terminal in this directory:
   ```bash
   cd "D:\Documents\SIH\Admin Dashboard Frontend\Admin Dashboard Frontend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

You can run the app using any of the following methods:

#### Option A: Quick Double-Click (Windows)
Double-click `start.bat` in the project root. It will verify dependencies and launch Vite automatically.

#### Option B: Terminal Command
```bash
npm run dev
```
> The dashboard will start locally at **`http://localhost:3000`** (or next available port).

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and minifies the code for production into the `dist/` folder |
| `npm run preview` | Locally serves the production build from `dist/` for testing |

---

## 📁 Directory Structure

```text
├── .vscode/               # Editor configurations
├── public/                # Static assets (favicons, icons)
├── src/
│   ├── components/        # UI Views & Sections
│   │   ├── Modals/        # Action dialogs (Add Worker, Add Booking, Invoice, etc.)
│   │   ├── BookingsView.jsx
│   │   ├── ComplaintsView.jsx
│   │   ├── CustomersView.jsx
│   │   ├── Header.jsx
│   │   ├── OverviewView.jsx
│   │   ├── PaymentsView.jsx
│   │   ├── ReportsView.jsx
│   │   ├── SettingsView.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Toast.jsx
│   │   └── WorkersView.jsx
│   ├── data/
│   │   └── mockData.js    # Seed data (workers, bookings, payments, complaints)
│   ├── App.jsx            # State management, routing, & application shell
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind CSS base & custom utilities
├── .env.example           # Environment template
├── .gitignore             # Git ignored files & directories
├── index.html             # HTML entry template
├── package.json           # Project manifest & dependencies
├── postcss.config.js      # PostCSS configuration
├── start.bat              # 1-click Windows runner
├── start.sh               # 1-click Linux/macOS runner
├── tailwind.config.js     # Tailwind CSS theme configurations
└── vite.config.js         # Vite configuration (port 3000)
```
