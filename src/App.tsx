import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './components/auth/LoginPage';
import TopNav from './components/layout/TopNav';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import CommercialPage from './pages/Commercial';
import ChantierPage from './pages/Chantier';
import DronePage from './pages/Drone';
import ReportingPage from './pages/Reporting';
import DocumentsPage from './pages/Documents';
import AnalyticsPage from './pages/Analytics';
import FinancePage from './pages/Finance';
import InvestorPage from './pages/Investor';
import PredictivePage from './pages/Predictive';
import WorkflowPage from './pages/Workflow';
import SettingsPage from './pages/Settings';

function AppContent() {
  const { logged, currentPage } = useApp();

  if (!logged) return <LoginPage />;

  const pageMap: Record<string, React.ReactNode> = {
    home: <HomePage />,
    dashboard: <DashboardPage />,
    commercial: <CommercialPage />,
    chantier: <ChantierPage />,
    drone: <DronePage />,
    reporting: <ReportingPage />,
    documents: <DocumentsPage />,
    analytics: <AnalyticsPage />,
    finance: <FinancePage />,
    investor: <InvestorPage />,
    predictive: <PredictivePage />,
    workflow: <WorkflowPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="min-h-screen bg-corporate-gray flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-auto">
        {pageMap[currentPage] ?? <HomePage />}
      </main>
      <footer className="bg-navy-dark border-t border-navy px-6 py-2" style={{ background: '#111827', borderColor: '#4B5563' }}>
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-2xs">
            BINA Platform v1.0 — Valoris Real Estate · Casablanca, Maroc
          </p>
          <p className="text-white/20 text-2xs">
            Données confidentielles — Usage interne uniquement
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
