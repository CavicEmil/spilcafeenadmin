import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyPassword, saveUser, loadUser } from '../utils/auth';
import { adminUser } from '../data/credentials';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username !== adminUser.username) {
        setError('User not found.');
        return;
      }
      const isValid = await verifyPassword(
        password,
        adminUser.salt,
        adminUser.hashedPassword
      );
      if (isValid) {
        saveUser(adminUser);
        navigate('/dashboard')
      } else {
        setError('Invalid password.');
      }
    } catch (err) {
      setError('Login failed. See console for details.');
      console.error(err);
    }
  };

  return (
    <div className="bg-secondary-grey p-8 rounded-lg max-w-sm mx-auto mt-12">
      <h1 className="text-primary-red text-header font-semibold mb-4">Spilcafeen Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-primary-black mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-primary-red rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-black mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-primary-red rounded"
            required
          />
        </div>
        {error && <p className="text-primary-red mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary-red text-primary-white py-2 rounded hover:bg-opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}