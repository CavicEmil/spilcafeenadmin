import { loadUser } from '../utils/auth';
import Login from '../components/Login';

export default function Landing() {
  const user = loadUser();

  return (
    <div className="max-w-md mx-auto">
      {user ? (
        <div className="bg-primary-grey p-8 rounded-lg text-center">
          <h2 className="text-primary-red text-header font-semibold mb-4">
            Welcome, {user.username}!
          </h2>
          <p className="text-primary-black">
            You are now logged in to the Spilcafeen admin panel.
          </p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}