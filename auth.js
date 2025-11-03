async function login(username, password, role) {
  try {
    // Admin credentials check
    if (role === 'admin' && username === 'assistcareadmin' && password === 'admin.poiuytrewq') {
      const session = {
        userId: 'admin-001',
        username: username,
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('assistly_session', JSON.stringify(session));
      return { success: true };
    }

    // Check database for other roles
    const userType = `user:${role}`;
    const users = await trickleListObjects(userType, 100, true);
    
    const user = users.items.find(u => 
      u.objectData.username === username && u.objectData.password === password
    );

    if (user) {
      const session = {
        userId: user.objectId,
        username: user.objectData.username,
        role: role,
        name: user.objectData.name,
        email: user.objectData.email,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('assistly_session', JSON.stringify(session));
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

function logout() {
  localStorage.removeItem('assistly_session');
  window.location.href = 'index.html';
}

function getSession() {
  const sessionStr = localStorage.getItem('assistly_session');
  if (sessionStr) {
    try {
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function requireAuth(allowedRoles = []) {
  const session = getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    window.location.href = 'index.html';
    return null;
  }
  
  return session;
}