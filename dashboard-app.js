class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function DashboardApp() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    React.useEffect(() => {
      const user = requireAuth();
      setCurrentUser(user);
    }, []);

    if (!currentUser) return null;

    return (
      <div className="min-h-screen bg-gray-50" data-name="dashboard-app" data-file="dashboard-app.js">
        <Topbar user={currentUser} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} userRole={currentUser.role} />
          <main className={`flex-1 p-6 pt-24 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel de Control</h1>
              <DashboardCards />
              <DashboardChart />
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);