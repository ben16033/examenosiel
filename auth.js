const USERS_KEY = 'system_users';
const SESSION_KEY = 'current_session';

async function initializeUsers() {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const defaultUsers = [
      { id: '1', username: 'super1', password: 'super123', role: 'superusuario', name: 'Super Usuario 1', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', username: 'super2', password: 'super123', role: 'superusuario', name: 'Super Usuario 2', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', username: 'admin1', password: 'admin123', role: 'administrador', name: 'Administrador 1', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '4', username: 'admin2', password: 'admin123', role: 'administrador', name: 'Administrador 2', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', username: 'user1', password: 'user123', role: 'usuario', name: 'Usuario 1', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '6', username: 'user2', password: 'user123', role: 'usuario', name: 'Usuario 2', avatar: 'https://i.pravatar.cc/150?img=6' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

async function loginUser(username, password) {
  await initializeUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const session = { ...user, loginTime: new Date().toISOString() };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

function checkSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

function requireAuth() {
  const user = checkSession();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}