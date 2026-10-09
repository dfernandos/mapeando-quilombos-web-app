const USERS_KEY = 'localAuth:users';
const SESSION_KEY = 'localAuth:session';
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

const DEFAULT_ADMIN = {
  email: process.env.REACT_APP_LOCAL_ADMIN_EMAIL || 'admin@local.dev',
  password: process.env.REACT_APP_LOCAL_ADMIN_PASSWORD || 'admin123',
};

const listeners = new Set();

const readUsers = () => {
  const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  return { [DEFAULT_ADMIN.email]: DEFAULT_ADMIN.password, ...stored };
};

const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const base64Url = (value) =>
  btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

// jwtDecode in useAuth needs a JWT-shaped token; the local backend profile does not verify it.
const buildToken = (email) => {
  const now = Math.floor(Date.now() / 1000);
  return `${base64Url({ alg: 'none', typ: 'JWT' })}.${base64Url({
    email,
    sub: email,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  })}.local`;
};

const buildUser = (email) => ({
  uid: email,
  email,
  getIdToken: async () => buildToken(email),
});

const authError = (code, message) => Object.assign(new Error(message), { code });

const auth = {
  currentUser: null,

  onAuthStateChanged(callback) {
    listeners.add(callback);
    setTimeout(() => listeners.has(callback) && callback(auth.currentUser), 0);
    return () => listeners.delete(callback);
  },

  async signInWithEmailAndPassword(email, password) {
    if (readUsers()[email] !== password) {
      throw authError('auth/wrong-password', 'Invalid email or password');
    }
    setCurrentUser(email);
    return { user: auth.currentUser };
  },

  async createUserWithEmailAndPassword(email, password) {
    const users = readUsers();
    if (users[email]) {
      throw authError('auth/email-already-in-use', 'Email already in use');
    }
    writeUsers({ ...users, [email]: password });
    return { user: buildUser(email) };
  },

  async sendPasswordResetEmail() {},

  async signOut() {
    setCurrentUser(null);
  },
};

function setCurrentUser(email) {
  auth.currentUser = email ? buildUser(email) : null;
  if (email) {
    localStorage.setItem(SESSION_KEY, email);
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  listeners.forEach((listener) => listener(auth.currentUser));
}

const savedSession = localStorage.getItem(SESSION_KEY);
if (savedSession) {
  auth.currentUser = buildUser(savedSession);
}

export default auth;
