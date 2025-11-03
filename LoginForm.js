function LoginForm({ onLoginSuccess }) {
  try {
    const [selectedRole, setSelectedRole] = React.useState('admin');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const roles = [
      { id: 'admin', name: 'Admin', icon: 'shield', color: 'indigo' },
      { id: 'supervisor', name: 'Supervisor', icon: 'user-check', color: 'green' },
      { id: 'agent', name: 'Agent', icon: 'headphones', color: 'blue' },
      { id: 'client', name: 'Client', icon: 'briefcase', color: 'amber' }
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        const result = await login(username, password, selectedRole);
        if (result.success) {
          onLoginSuccess(selectedRole);
        } else {
          setError(result.message || 'Invalid credentials');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen p-4" data-name="login-form" data-file="components/LoginForm.js">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-color)] rounded-2xl mb-4">
              <div className="icon-bot text-3xl text-white"></div>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Assistly Care</h1>
            <p className="text-[var(--text-secondary)]">AI-Powered Customer Support Platform</p>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.id 
                      ? 'border-[var(--primary-color)] bg-indigo-50' 
                      : 'border-[var(--border-color)] hover:border-gray-300'
                  }`}
                >
                  <div className={`icon-${role.icon} text-2xl mb-2 ${
                    selectedRole === role.id ? 'text-[var(--primary-color)]' : 'text-gray-400'
                  }`}></div>
                  <div className="text-sm font-medium">{role.name}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-sm text-[var(--text-secondary)]">
            © 2025 Assistly Care. All rights reserved.
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}