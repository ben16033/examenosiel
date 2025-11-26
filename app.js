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
            <p className="text-gray-600 mb-4">Lo sentimos, ocurrió un error inesperado.</p>
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

function App() {
  try {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);

    React.useEffect(() => {
      const user = checkSession();
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
    }, []);

    const handleLoginSuccess = (user) => {
      setIsLoggedIn(true);
      setCurrentUser(user);
      window.location.href = 'dashboard.html';
    };

    return (
      <div className="min-h-screen relative" data-name="app" data-file="app.js">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: 'url(https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1920&q=80)'}}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);