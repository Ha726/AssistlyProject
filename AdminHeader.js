function AdminHeader({ session }) {
  try {
    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="admin-header" data-file="components/AdminHeader.js">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-shield text-xl text-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">Admin Panel</h1>
                <p className="text-sm text-[var(--text-secondary)]">Welcome, {session.username}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <div className="icon-log-out text-lg"></div>
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('AdminHeader component error:', error);
    return null;
  }
}