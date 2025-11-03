function UserManagement() {
  try {
    const [userType, setUserType] = React.useState('client');
    const [users, setUsers] = React.useState([]);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
      name: '', email: '', phone: '', username: '', password: ''
    });

    const loadUsers = async () => {
      setLoading(true);
      try {
        const result = await trickleListObjects(`user:${userType}`, 100, true);
        setUsers(result.items);
      } catch (error) {
        console.error('Load users error:', error);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      loadUsers();
    }, [userType]);

    const handleAddUser = async (e) => {
      e.preventDefault();
      try {
        await trickleCreateObject(`user:${userType}`, formData);
        setShowAddModal(false);
        setFormData({ name: '', email: '', phone: '', username: '', password: '' });
        loadUsers();
      } catch (error) {
        console.error('Add user error:', error);
      }
    };

    const handleDeleteUser = async (userId) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await trickleDeleteObject(`user:${userType}`, userId);
          loadUsers();
        } catch (error) {
          console.error('Delete user error:', error);
        }
      }
    };

    return (
      <div className="card" data-name="user-management" data-file="components/UserManagement.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            Add User
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          {['client', 'agent', 'supervisor'].map(type => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                userType === type 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}s
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center py-8 text-[var(--text-secondary)]">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-center py-8 text-[var(--text-secondary)]">No {userType}s found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.objectId} className="border-t">
                    <td className="px-4 py-3">{user.objectData.name}</td>
                    <td className="px-4 py-3">{user.objectData.email}</td>
                    <td className="px-4 py-3">{user.objectData.username}</td>
                    <td className="px-4 py-3">{user.objectData.phone}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteUser(user.objectId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Add {userType}</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="input-field"
                  required
                />
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">Add</button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 bg-gray-200 rounded-lg flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('UserManagement component error:', error);
    return null;
  }
}