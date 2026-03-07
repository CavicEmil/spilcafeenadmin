async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  return Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify password
async function verifyPassword(inputPassword, storedSalt, storedHashedPassword) {
  const salt = new Uint8Array(storedSalt.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const hashedInput = await hashPassword(inputPassword, salt);
  return hashedInput === storedHashedPassword;
}

// Save user to localStorage
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Load user from localStorage
function loadUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// Logout (clear localStorage)
function logout() {
  localStorage.removeItem('user');
}

export { hashPassword, verifyPassword, saveUser, loadUser, logout };