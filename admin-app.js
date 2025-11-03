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
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminApp() {
  try {
    const session = requireAuth(['admin']);
    const [activeTab, setActiveTab] = React.useState('users');

    if (!session) return null;

    return (
      <div className="min-h-screen bg-[var(--bg-color)]" data-name="admin-app" data-file="admin-app.js">
        <AdminHeader session={session} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex gap-4 border-b border-[var(--border-color)]">
              {['users', 'reports', 'chatbots', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium capitalize transition-colors ${
                    activeTab === tab 
                      ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'reports' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Supervisor Reports</h2>
              <p className="text-[var(--text-secondary)]">Reports functionality coming soon...</p>
            </div>
          )}
          {activeTab === 'chatbots' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Chatbot Management</h2>
              <p className="text-[var(--text-secondary)]">Chatbot management coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
              <p className="text-[var(--text-secondary)]">Analytics coming soon...</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AdminApp />
  </ErrorBoundary>
);