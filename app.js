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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
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
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
      const session = getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserRole(session.role);
      }
    }, []);

    const handleLoginSuccess = (role) => {
      setIsLoggedIn(true);
      setUserRole(role);
      
      // Redirect to appropriate dashboard
      switch(role) {
        case 'admin':
          window.location.href = 'admin.html';
          break;
        case 'supervisor':
          window.location.href = 'supervisor.html';
          break;
        case 'agent':
          window.location.href = 'agent.html';
          break;
        case 'client':
          window.location.href = 'client.html';
          break;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50" data-name="app" data-file="app.js">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
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